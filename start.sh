echo "===== Start MANDALAND ====="

cd database
npm install
echo "[Start database server] Listen on port 4001"
npm start&

cd ../backend
npm install
echo "[Start backend server] Listen on port 4000"
npm start&

cd ../client-web
npm install
echo "[Start client-web server] Listen on port 3000"
npm start&
cd ..