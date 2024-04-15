@echo off
echo Killing all node.js instances
taskkill /F /IM node.exe /T
timeout 3 > NUL
echo Done