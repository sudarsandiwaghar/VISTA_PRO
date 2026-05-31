# VISTA - Visual Intelligence Surveillance for Tracking and Analysis

AI-based Smart Surveillance System with React frontend and FastAPI backend.

## Currently Running (Local)

Both servers are started on your machine:

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

**Admin login:** `admin` / `admin123`

To restart later, double-click `start.bat` in the project root.

## Quick Deploy (Docker — requires Docker Desktop)

```bash
docker compose up --build -d
```

Open **http://localhost** — Admin login: `admin` / `admin123`

## Manual Setup

### Backend

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Features

- **Dashboard** — Configurable stats and charts
- **CCTV Monitoring** — 5-10 camera grid with status indicators
- **Analytics** — Recharts graphs (admin-editable)
- **Tracking** — Event history, heatmap, timeline
- **Reports** — Video upload, YOLO/HOG tracking, PDF + video export
- **Admin Panel** — Single admin controls all settings
- **Dark/Light Mode** — Glassmorphism UI

## Admin Configuration

Login at `/login` then go to `/admin` to configure:
- Camera count (5-10), names, locations, status
- Dashboard statistics and chart data
- Analytics graph values
- Team members
- Tracking events and alerts

## Environment Variables

| Variable | Default |
|----------|---------|
| SECRET_KEY | vista-secret-key-change-in-production |
| ADMIN_USERNAME | admin |
| ADMIN_PASSWORD | admin123 |
| DATABASE_URL | sqlite:///./vista.db |

## Production Notes

1. Change `SECRET_KEY` and `ADMIN_PASSWORD` in docker-compose.yml
2. YOLO model downloads automatically on first video processing
3. Video uploads limited by nginx `client_max_body_size` (500M)

## Project Structure

```
MOT_CURSOR/
├── backend/          # FastAPI + OpenCV + YOLO
├── frontend/         # React + Vite + Tailwind
├── docker-compose.yml
└── README.md
```

## Team

- D. Sudarsan — Project Lead
