#!/bin/bash

# Install dependencies
npm install

# Start the server with PM2
pm2 start src/index.js --name "twitter-backend"

# Save PM2 process list
pm2 save

echo "Backend deployment completed!" 