#!/bin/bash

# Build the frontend for Netlify
echo "Building frontend for Netlify deployment..."

# Use Vite to build the client
npx vite build --outDir=dist

# Create a simple index.js file in the dist directory for Netlify
cat > dist/_redirects << EOL
/*    /index.html   200
EOL

echo "Build completed!"