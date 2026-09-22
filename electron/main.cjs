const { app, BrowserWindow } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');
const http = require('http');

// Enforce single instance lock so clicking multiple times never opens multiple windows
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

let mainWindow = null;

function checkServerReady(callback) {
  const req = http.get('http://localhost:5000/api/progress', (res) => {
    if (res.statusCode === 200) {
      callback();
    } else {
      setTimeout(() => checkServerReady(callback), 100);
    }
  });

  req.on('error', () => {
    setTimeout(() => checkServerReady(callback), 100);
  });
}

async function startServer() {
  process.env.PORT = '5000';
  const serverPath = path.join(__dirname, '..', 'server', 'index.js');
  await import(pathToFileURL(serverPath).href);
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

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(async () => {
  try {
    await startServer();
  } catch (err) {
    console.error('Failed to start server:', err);
  }
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
  process.exit(0);
});
