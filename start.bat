@echo off
echo Starting VISTA Backend...
start "VISTA Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\uvicorn app.main:app --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak >nul
echo Starting VISTA Frontend...
start "VISTA Frontend" cmd /k "cd /d %~dp0frontend && npm run dev -- --host 0.0.0.0 --port 5173"
echo.
echo VISTA is running!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo Admin:    admin / admin123
pause
