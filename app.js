var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('cors')
var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var login = require('./routes/login');
var app = express();
// 跨域配置
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') { res.send(200); /让options请求快速返回/ } else { next(); }
});
var db = require('mongoskin').db('mongodb://127.0.0.1:27017/mydb');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/test', test);
app.use('/login', login);

app.use('/username', function(req, res, next) {
    res.send('pretty');
});


app.get('/user/:id', function(req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 否则将控制权交给栈中下一个中间件
    else next();
}, function(req, res, next) {
    if (req.params.id == '9') {
        res.render('usual');
    } else {
        next();
    }
}, (req, res, next) => {
    res.render('index');
});


// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function(req, res, next) {
    res.render('special');
});


app.get('/video/:id', function(req, res, next) {
    console.log('ID:', req.params);
    next();
}, function(req, res, next) {
    res.send('User Info');
    next('route');
});

// 处理 /user/:id， 打印出用户 id
app.get('/video/:id', function(req, res, next) {
    console.log(path.join(__dirname, 'public'))
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;