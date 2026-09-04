@echo off
title ADHAN Schedule App Server
echo ===================================================
echo   Starting ADHAN Schedule Server on Port 8000
echo ===================================================
echo.
cd /d "%~dp0"

echo Opening browser at http://localhost:8000 ...
start http://localhost:8000

echo Starting Python Server...
python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Python not found or server stopped.
    echo Trying py launcher...
    py server.py
)

pause
