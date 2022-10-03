echo "Running command"

# Install dependencies
npm install

cd ./3xr_types && npm install && npm link

cd ../ && npm link 3xr/types

# Build the app
npm run build

echo "done"

