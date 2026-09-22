import { spawn } from 'child_process';
import path from 'path';

console.log('🚀 Starting CodeHelp Local App...');

const server = spawn('node', ['server/index.js'], { stdio: 'inherit', shell: true });
const client = spawn('npm', ['--prefix', 'client', 'run', 'dev'], { stdio: 'inherit', shell: true });

process.on('SIGINT', () => {
  server.kill();
  client.kill();
  process.exit();
});
