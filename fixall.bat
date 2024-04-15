@echo off

echo fixing main
start yarn install
timeout 3 > NUL

echo fixing front
cd .\apps\frontend\
start yarn install
timeout 3 > NUL

echo fixing back
cd ../..
cd .\apps\backend\
start yarn install
timeout 3 > NUL

echo fixing all
cd ../..
start yarn fix