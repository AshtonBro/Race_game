const url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: require('path').join(__dirname, 'index.html')
});

const element = require('electron');

const {
    app,
    BrowserWindow
} = require('electron');

let win;

const createWidnow = () => {
    win = new BrowserWindow({
        width: 500,
        height: 850
    });

    win.loadURL(url);

    win.on('closed', () => {
        win = null;
    });

    app.on('ready', createWidnow);
    app.on('window-all-closed', () => {
        app.quit();
    });
};