const createError = require('http-errors');
const express = require('express');
const path = require('path');
const os = require('os');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const formData = require('express-form-data');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const log = require('./utils/log')(module);
const config = require('./config/mongodb');

const indexRouter = require('./routes/index');

const admin = require('./routes/admin');
const login = require('./routes/login');
const operator = require('./routes/operator');
const upload = require('./routes/upload');
const status = require('./routes/status');
const manager = require('./routes/manager');

const homeDir = os.tmpdir();
const crawlerDir = 'magenta-temp';

const yandexKey = process.env.YANDEXTELEPHONY;

if (!fs.existsSync(`${homeDir}/${crawlerDir}/`)) {
  fs.mkdirSync(`${homeDir}/${crawlerDir}/`);
  log.info(`Created directory: ${homeDir}/${crawlerDir}/`);
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  uploadDir: `${homeDir}/${crawlerDir}`,
  autoClean: process.env.AUTOCLEAN,
};

app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ url: config.database }),
  resave: false,
  saveUninitialized: true,
}));

// parse data with connect-multiparty.
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable
app.use(formData.stream());
// union body and files
app.use(formData.union());

app.use(admin);

app.get('/api/v3/yandex-key', (req, res) => {
  res.status(200).json({ err: 0, yandex: yandexKey, baseURL: config.url });
});

app.use(login);
app.use(operator);
app.use(manager);
app.use(status);
app.use(upload);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
