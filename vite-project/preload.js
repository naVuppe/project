const { contextBridge, ipcRenderer } = require('electron')

// 桥接
contextBridge.exposeInMainWorld('electronAPI', {
    send: (content) => ipcRenderer.send('out', content)
})