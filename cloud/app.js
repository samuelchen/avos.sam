// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var path = require ('path');
var logger = require('cloud/logger.js');

logger.info('----- Application Started -----');

// 本地设置
if (typeof(__production) == 'undefined') {
    logger.debug('local env');
    logger.debug(__dirname);
    app.set('views',__dirname + '/views');   //设置模板目录
    app.use(express.static(path.join(__dirname + '/../public')));
} else {
// App全局配置
    if (__production)
        app.set('views','cloud/views');   //设置模板目录
    else
        app.set('views','cloud/_views');
}
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
