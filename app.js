var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Anda bisa mengatur domain yang diizinkan jika diperlukan
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Mengizinkan metode GET, POST, PUT, dan DELETE
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Handle error
app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.json({
        status: 404,
        message: "Ooops! Page you are looking for not found"
    })
})


module.exports = app;
