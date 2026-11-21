@echo off
chcp 65001 >nul
title IONOS Deployment...

set "DEPLOY_PS1="
if exist "%~dp0..\_tools\deploy.ps1" set "DEPLOY_PS1=%~dp0..\_tools\deploy.ps1"
if exist "%~dp0..\..\..\tools\deploy.ps1" set "DEPLOY_PS1=%~dp0..\..\..\tools\deploy.ps1"
if exist "%~dp0_tools\deploy.ps1" set "DEPLOY_PS1=%~dp0_tools\deploy.ps1"
if not defined DEPLOY_PS1 if exist "C:\antigravity\_tools\deploy.ps1" set "DEPLOY_PS1=C:\antigravity\_tools\deploy.ps1"

if not defined DEPLOY_PS1 (
    echo.
    echo [FEHLER] deploy.ps1 wurde nicht gefunden!
    echo Bitte stellen Sie sicher, dass der Ordner _tools vorhanden ist.
    echo.
    pause
    exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%DEPLOY_PS1%" -ProjectDir "%~dp0."
echo.
pause
