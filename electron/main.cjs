const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow = null;
let serverProcess = null;

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

function checkServerReady(callback) {
  const req = http.get('http://localhost:5000/api/progress', (res) => {
    if (res.statusCode === 200) {
      callback();
    } else {
      setTimeout(() => checkServerReady(callback), 150);
    }
  });

  req.on('error', () => {
    setTimeout(() => checkServerReady(callback), 150);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 700,
    title: 'CodeHelp - DSA Preparation Platform',
    backgroundColor: '#0d0d12',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  startServer();

  checkServerReady(() => {
    if (mainWindow) {
      mainWindow.loadURL('http://localhost:5000');
      mainWindow.once('ready-to-show', () => {
        mainWindow.show();
      });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {}
  }
  app.quit();
  process.exit(0);
});

app.on('before-quit', () => {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {}
  }
});

