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