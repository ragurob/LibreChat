
const express = require('express');
const path = require('path');
const fs = require('fs');

console.log('Starting LibreChat for Replit...');

// Environment configuration for Replit
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.PORT = process.env.PORT || '5000';

// Set Replit-specific domains if not already set
if (process.env.REPLIT_SLUG && process.env.REPLIT_OWNER && !process.env.DOMAIN_SERVER) {
  const replitDomain = `https://${process.env.REPLIT_SLUG}.${process.env.REPLIT_OWNER}.repl.co`;
  process.env.DOMAIN_SERVER = replitDomain;
  process.env.DOMAIN_CLIENT = replitDomain;
}

console.log('Environment configured for Replit');
console.log(`Host: ${process.env.HOST}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Domain: ${process.env.DOMAIN_SERVER || 'Not set'}`);

// Check if client build exists
const clientBuildPath = path.join(__dirname, 'client', 'dist');
const clientBuildExists = fs.existsSync(clientBuildPath);

if (!clientBuildExists) {
  console.warn('Client build not found. You may need to build the frontend first.');
  console.warn('Run: cd client && npm run build');
}

// Import and start the API server
console.log('Starting LibreChat API server...');

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
async function startServer() {
  try {
    // Import the main server
    require('./api/server/index.js');
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('API server exited with code 1');
    process.exit(1);
  }
}

startServer();
