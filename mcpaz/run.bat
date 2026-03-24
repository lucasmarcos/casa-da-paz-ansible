@echo off
cd /d "%~dp0"

node\node.exe --env-file=.env main.js
