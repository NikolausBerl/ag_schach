@echo off
chcp 65001 >nul
title IONOS Deployment...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\antigravity\_tools\deploy.ps1" -ProjectDir "%~dp0."
echo.
pause
