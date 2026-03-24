@echo off
cd /d "%~dp0"

call node\npm.cmd install
node\node.exe --env-file=.env main.js
