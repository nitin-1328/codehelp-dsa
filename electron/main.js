import { app, BrowserWindow } from 'electron';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
let serverProcess = null;

// Function to start the embedded backend server
function startServer() {
  const serverPath = path.join(__dirname, '..', 'server', 'index.js');
  serverProcess = fork(serverPath, [], {
    env: { ...process.env, PORT: '5000' },
    stdio: 'ignore'
  });

  serverProcess.on('error', (err) => {
    console.error('Server process error:', err);
  });
}

// Function to check if server is reachable
async function waitForServer(url, timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // Wait 150ms before retrying
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  return false;
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    title: 'CodeHelp - DSA Preparation Platform',
    backgroundColor: '#0d0d12',
    autoHideMenuBar: true,
    show: false, // Show gracefully once loaded
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Start server and wait for readiness
  startServer();
  await waitForServer('http://localhost:5000/api/progress');

  // Load local web application
  mainWindow.loadURL('http://localhost:5000');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Clean shutdown when window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

// Quit process and stop server when all windows are closed
app.on('window-all-closed', () => {
  if (serverProcess) {
    try {
      serverProcess.kill('SIGTERM');
    } catch (e) {}
  }
  app.quit();
});

app.on('before-quit', () => {
  if (serverProcess) {
    try {
      serverProcess.kill('SIGTERM');
    } catch (e) {}
  }
});
