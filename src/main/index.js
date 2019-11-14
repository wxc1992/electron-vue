import { app, BrowserWindow ,ipcMain,globalShortcut,dialog} from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// import {
//   autoUpdater
// } from "electron-updater"
import { exec } from 'child_process';
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    minWidth: 1300,
    frame: true,
    resizable: true,
    autoHideMenuBar: true,	// 隐藏导航
    alwaysOnTop:true,
    webPreferences: {
      webSecurity: false	// 解决跨域
    }
  });

  mainWindow.loadURL(winURL);

  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });
    ipcMain.on('full', e => mainWindow.setFullScreen(true));
    globalShortcut.register('CommandOrControl+Alt+K', () => {
      mainWindow.webContents.openDevTools(); //开启调试工具
    });
    globalShortcut.register('ESC', () => {
        mainWindow.setFullScreen(false); // 退出全屏
    })

    mainWindow.on('close', (e) => {
      e.preventDefault();	
      dialog.showMessageBox({
        type: 'info',
        title: 'Information',
        defaultId: 0,
        message: '确定要关闭吗？',
        buttons: ['最小化','直接退出']
      },function(index){
        
        if(index===0){
         
          e.preventDefault();		//阻止默认行为，一定要有
        } else {
          // localStorage.clear()
          mainWindow = null;
          //app.quit();	//不要用quit();试了会弹两次
          app.exit();		//exit()直接关闭客户端，不会执行quit();
        }
      }) 
  });
  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
