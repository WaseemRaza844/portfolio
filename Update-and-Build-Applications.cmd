@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Update-and-Build-Applications.ps1"
echo.
echo Press any key to close this window.
pause >nul
endlocal
