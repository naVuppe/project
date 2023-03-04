const { app, BrowserWindow, ipcMain } = require('electron')
// const {} = require('fs')

ipcMain.on('out', (_, e) => {
    console.log('主线程监听', e)
})

// 创建一个窗口
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 预加载代码 桥接
            preload: require('path').join(__dirname, '/preload.js')
        }
    })
    win.loadFile('./vite-project/dist/index.html')
    win.webContents.send('in', '哈哈哈哈')
    // 打开调试工具
    win.webContents.openDevTools()
}
app.whenReady().then(() => {
    createWindow()
})