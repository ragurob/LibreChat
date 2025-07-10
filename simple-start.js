
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting LibreChat API Server with MongoDB Atlas...');

// Ensure data directory exists (even though we're using Atlas, some local files might be needed)
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data', { recursive: true });
}

// Set environment variables
process.env.NODE_ENV = 'development';
process.env.HOST = '0.0.0.0';
process.env.PORT = '3080';

console.log('Connecting to MongoDB Atlas...');

// Start the API server using the npm script
const apiServer = spawn('npm', ['run', 'backend:dev'], {
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
