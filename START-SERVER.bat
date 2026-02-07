@echo off
echo ========================================
echo   EcoAction - Local Web Server
echo ========================================
echo.
echo Menjalankan server...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
