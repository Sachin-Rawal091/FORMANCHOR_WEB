# FormPilot Web Showcase (Excellent Edition)

A premium marketing + legal website showcase for the **FormPilot** Chrome Extension. It features a responsive, dark-glassmorphic frontend built with React & TypeScript, and a lightweight, rate-limited FastAPI backend integrated with MongoDB.

---

## Folder Structure

```text
Formpilot_Template/
├── docker-compose.yml       # Orchestrates FastAPI + MongoDB container services
├── README.md                # General setup and execution guidelines
│
├── frontend/                # React + TS + Vite (Static Landing Page)
│   ├── public/              # Preloaded media (demo.mp4, demo.gif), sitemap, and robots.txt
│   └── src/                 # Component-based modular pages (Home, About, Install, FAQ, Contact)
│
└── backend/                 # FastAPI REST API (stores contact forms)
    ├── Dockerfile           # Python container configuration
    ├── main.py              # API routes & rate-limiting middleware
    ├── database.py          # MongoDB Async Motor client
    └── models.py            # Pydantic schema validations
```

---

## Getting Started

You can run the project locally using either **Docker Compose** (recommended for testing backend form storage) or by launching the frontend and backend **individually**.

### Method 1: Running with Docker Compose (Recommended)

This compiles the FastAPI app and spins up a MongoDB container automatically.

1. Ensure you have **Docker** and **Docker Desktop** installed and running on your machine.
2. In your terminal, navigate to the root directory `Formpilot_Template/` and run:
   ```bash
   docker-compose up --build
   ```
3. The FastAPI server will start and bind to `http://localhost:8000`.
4. In a separate terminal tab, navigate to the `frontend/` folder to launch the web client:
   ```bash
   cd frontend
   npm run dev
   ```
5. Open your browser and navigate to the local Vite server (typically `http://localhost:3000` or `http://localhost:5173`). Go to the **Contact** page and submit a message; it will write directly to your local MongoDB container database!

---

### Method 2: Running Individually (Without Docker)

If you prefer to run the backend and database manually:

#### 1. Start MongoDB
Ensure a MongoDB instance is running locally on your machine at `mongodb://localhost:27017`.

#### 2. Start the Backend API
1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Set up a Python virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Uvicorn server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

#### 3. Start the Frontend
1. Open a new terminal tab and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install node packages:
   ```bash
   npm install
   ```
3. Launch Vite developer server:
   ```bash
   npm run dev
   ```

---

## Static Production Deployment

If you want to host only the frontend landing page (for example, on GitHub Pages, Netlify, or Vercel) for free:

1. Inside `frontend/`, compile the React app:
   ```bash
   npm run build
   ```
2. This generates a compiled, optimized static bundle in the `frontend/dist/` folder.
3. You can upload or deploy the contents of `frontend/dist/` directly to any static web host. Since the client router is a **Hash Router** (`#/`, `#/about`), page refreshes and direct bookmarks will work out-of-the-box on GitHub Pages without requiring any 404 redirection hacks.
