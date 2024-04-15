printf "Fixing project"

yarn install
sleep 3

cd ./apps/frontend/
yarn install
sleep 3
cd ../..

cd ./apps/backend/
yarn install
sleep 3
cd ../..

yarn fix
sleep 3

printf "Done"