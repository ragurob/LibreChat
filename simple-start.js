const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting LibreChat for Replit...');

// Ensure data directory exists
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data', { recursive: true });
}

// Set environment variables for Replit
process.env.NODE_ENV = 'production';
process.env.HOST = '0.0.0.0';
process.env.PORT = '5000';
process.env.TRUST_PROXY = '1';

// Set Replit-specific domains if available
if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
  const replitDomain = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  process.env.DOMAIN_CLIENT = replitDomain;
  process.env.DOMAIN_SERVER = replitDomain;
}

console.log('Environment configured for Replit');
console.log(`Host: ${process.env.HOST}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Domain: ${process.env.DOMAIN_CLIENT}`);

// Start the API server directly
console.log('Starting LibreChat API server...');
const apiServer = spawn('node', ['api/server/index.js'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
});

apiServer.on('error', (err) => {
  console.error('Failed to start API server:', err);
});

apiServer.on('exit', (code) => {
  console.log(`API server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  apiServer.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  apiServer.kill('SIGTERM');
});