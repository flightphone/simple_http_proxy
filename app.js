var { createProxyMiddleware } = require('http-proxy-middleware');
var express = require('express');
var app = express();

let url = '';//'https://www.google.com/';
const customRouter = function (req) {
    return url; // protocol + host
};

const targetProxy = (req, res, next) => {
    if (url) {
        next();
    }
    else {
        res.redirect("/login");
    }
};



app.get('/login', (req, res, next) => {
    ;
    if (req.query.url)
    {
        url = req.query.url;
        res.redirect("/");
    }
    else
        res.send('set url:  /login?url=https://example.com');    
});

app.use('/', targetProxy, (req, res, next) => {
    createProxyMiddleware({
        target: customRouter(req),
        changeOrigin: true,
        ws: true
    })(req, res, next);
});

const port = 8000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/login`);
});