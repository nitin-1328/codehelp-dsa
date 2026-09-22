@echo off
title CodeHelp DSA Preparation Platform
cd /d "%~dp0"
echo =======================================================
echo   CodeHelp DSA Platform - Local Desktop Server
echo =======================================================
echo.
echo Starting app at http://localhost:5000 ...
start http://localhost:5000
node server/index.js
pause
