// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var logger, tool;
var LOCAL_ENV = false;
var approot = '';
//var path = require ('path');

if (typeof(__production) == 'undefined') {
    LOCAL_ENV = true;
    __production = false;
    approot = __dirname + '/';
} else {
    approot = 'cloud/';
}

try {
    tool = require(approot + './tool');
    logger = require(approot + './logger');
} catch(err) {
    tool.dumpError(err);
    logger = require('util');
    logger.warn = logger.error;
}

logger.info('----- Application Started -----');

// 本地设置
if (LOCAL_ENV) {
    logger.debug('running in LOCAL ENV.');
    logger.debug(approot);
    app.use(express.static(approot + '../public'));
} 

// App全局配置
if (__production)
    app.set('views',approot + 'views');   //设置模板目录
else
    app.set('views',approot + '_views');

app.set('view engine', 'ejs');    // 设置template引擎
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
    res.render('hello', { message: 'Congrats, you just set up your app!' });
});
app.get('/1/wx', function(req, res) {
    var msg = '' + req.toString();
    logger.warn(req);
    res.render('hello', { message: msg });
});

//最后，必须有这行代码来使express响应http请求
var port = 8080
app.listen(port);
logger.info('----- Server started on port %d -----', port);
