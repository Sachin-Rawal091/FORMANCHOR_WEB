#!/usr/bin/env python3
"""
Visual Diff Tool for Website Cloning Verification.

Captures full-page screenshots of two target URLs at one or more viewports
and generates a pixel-diff image plus a similarity score per viewport.

Usage:
    python visual_diff.py --url1 "https://original-target.com" \\
        --url2 "http://localhost:5173" \\
        --output-dir "./visual-diff-results"

Requires:
    pip install playwright pillow numpy
    playwright install chromium
"""

import os
import sys
import argparse


def check_dependencies():
    """Verify required libraries are available; print friendly setup help if missing."""
    missing = []
    try:
        import playwright  # noqa: F401
    except ImportError:
        missing.append("playwright")
    try:
        import PIL  # noqa: F401
    except ImportError:
        missing.append("pillow (PIL)")
    try:
        import numpy  # noqa: F401
    except ImportError:
        missing.append("numpy")

    if missing:
        print(f"[-] Error: Missing required dependencies: {', '.join(missing)}")
        print("[*] Please run:")
        print("    pip install playwright pillow numpy")
        print("    playwright install chromium")
        sys.exit(1)


def parse_viewport(vp_str):
    """Parse a 'WIDTHxHEIGHT' string into a {'width':.., 'height':..} dict."""
    try:
        parts = vp_str.lower().split("x")
        if len(parts) != 2:
            raise ValueError()
        return {"width": int(parts[0]), "height": int(parts[1])}
    except Exception:
        raise argparse.ArgumentTypeError(
            f"Invalid viewport format: '{vp_str}'. Must be WidthxHeight (e.g., 1920x1080)."
        )


def capture_screenshots(url1, url2, output_dir, viewports, wait_time):
    """Use Playwright to capture full-page screenshots of both URLs at each configured viewport."""
    from playwright.sync_api import sync_playwright

    print("[*] Launching browser to capture screenshots...")
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for vp_name, vp_dims in viewports.items():
            print(f"[*] Processing viewport: {vp_name} ({vp_dims['width']}x{vp_dims['height']})")
            context = browser.new_context(viewport=vp_dims, device_scale_factor=1)

            for label, url in (("url1", url1), ("url2", url2)):
                page = context.new_page()
                print(f"    Navigating to {label}: {url}")
                try:
                    page.goto(url, wait_until="load")
                    page.wait_for_timeout(wait_time)
                    path = os.path.join(output_dir, f"{vp_name}_{label}.png")
                    page.screenshot(path=path, full_page=True)
                    results[f"{vp_name}_{label}"] = path
                except Exception as e:
                    print(f"[-] Error capturing {label} at {vp_name}: {e}")
                    results[f"{vp_name}_{label}"] = None
                finally:
                    page.close()

            context.close()

        browser.close()

    return results


def compare_images(img1_path, img2_path, diff_path, threshold):
    """
    Compare two images with a vectorized per-channel threshold diff.
    Generates a diff image (original, dimmed, with mismatched pixels marked red)
    and returns (similarity_percent, differing_pixel_count).
    """
    from PIL import Image
    import numpy as np

    img1 = Image.open(img1_path).convert("RGB")
    img2 = Image.open(img2_path).convert("RGB")

    w1, h1 = img1.size
    w2, h2 = img2.size
    max_w, max_h = max(w1, w2), max(h1, h2)

    if (w1, h1) != (w2, h2):
        print(f"    [!] Warning: dimensions differ — original {w1}x{h1}px vs clone {w2}x{h2}px.")
        print(f"        Padding both to {max_w}x{max_h}px for comparison (this itself may indicate layout drift).")
        padded1 = Image.new("RGB", (max_w, max_h), (240, 240, 240))
        padded1.paste(img1, (0, 0))
        img1 = padded1
        padded2 = Image.new("RGB", (max_w, max_h), (240, 240, 240))
        padded2.paste(img2, (0, 0))
        img2 = padded2

    arr1 = np.asarray(img1, dtype=np.int16)
    arr2 = np.asarray(img2, dtype=np.int16)

    # Per-channel absolute difference, vectorized (no Python-level pixel loop).
    diff = np.abs(arr1 - arr2)
    mismatch_mask = np.any(diff > threshold, axis=2)  # True where any channel exceeds threshold

    total_pixels = max_w * max_h
    differing_pixels = int(mismatch_mask.sum())
    matching_pixels = total_pixels - differing_pixels
    similarity = (matching_pixels / total_pixels) * 100

    # Build the diff visualization: dimmed original with mismatches marked red.
    dimmed = (arr1 * 0.6).astype(np.uint8)
    diff_rgb = dimmed.copy()
    diff_rgb[mismatch_mask] = [255, 0, 0]

    Image.fromarray(diff_rgb, mode="RGB").save(diff_path)

    return similarity, differing_pixels


def main():
    check_dependencies()

    parser = argparse.ArgumentParser(description="Automated Playwright visual diff tool.")
    parser.add_argument("--url1", required=True, help="Original/target website URL")
    parser.add_argument("--url2", required=True, help="Cloned website URL")
    parser.add_argument("--output-dir", default="./visual_diff_results", help="Directory to save diff files")
    parser.add_argument("--threshold", type=int, default=30, help="Per-channel pixel diff threshold, 0-255 (default: 30)")
    parser.add_argument("--wait", type=int, default=1500, help="Milliseconds to settle layout before screenshot (default: 1500)")
    parser.add_argument(
        "--viewports",
        default="desktop=1920x1080,tablet=768x1024,mobile=375x812",
        help="Comma-separated Name=WidthxHeight specs (default: desktop=1920x1080,tablet=768x1024,mobile=375x812)",
    )
    args = parser.parse_args()

    viewports = {}
    try:
        for vp_item in args.viewports.split(","):
            name, dims = vp_item.split("=")
            viewports[name.strip()] = parse_viewport(dims.strip())
    except Exception as e:
        print(f"[-] Error parsing --viewports: {e}")
        sys.exit(1)

    os.makedirs(args.output_dir, exist_ok=True)

    print("[*] Comparing:")
    print(f"    URL 1 (target): {args.url1}")
    print(f"    URL 2 (clone):  {args.url2}")
    print(f"    Output folder:  {os.path.abspath(args.output_dir)}")
    print(f"    Threshold:      {args.threshold}")
    print(f"    Settle delay:   {args.wait}ms\n")

    screenshots = capture_screenshots(args.url1, args.url2, args.output_dir, viewports, args.wait)

    print("\n[*] Comparing screenshots...")
    for vp_name in viewports:
        img1_path = screenshots.get(f"{vp_name}_url1")
        img2_path = screenshots.get(f"{vp_name}_url2")

        if not img1_path or not img2_path:
            print(f"[-] Skipping {vp_name}: screenshot capture failed.")
            continue

        diff_path = os.path.join(args.output_dir, f"{vp_name}_diff.png")
        print(f"[*] Analysing viewport '{vp_name}'...")
        try:
            similarity, diff_count = compare_images(img1_path, img2_path, diff_path, args.threshold)
            print(f"    [+] Similarity: {similarity:.2f}%")
            print(f"    [+] Differing pixels: {diff_count}")
            print(f"    [+] Diff image saved: {diff_path}")
        except Exception as e:
            print(f"[-] Error comparing {vp_name}: {e}")

    print("\n[+] Visual diff complete.")


if __name__ == "__main__":
    main()