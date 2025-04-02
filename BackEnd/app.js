const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users');
const registrarRouter = require('./routes/registrar');
const dashboardRouter = require('./routes/dashboard');
const agentDashboardRouter = require('./routes/agent-dashboard');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET, // Usando uma variável de ambiente para maior segurança
  resave: true,
  saveUninitialized: true
}));

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/cliente', registrarRouter);
app.use('/dashboard', dashboardRouter);
app.use('/agent-dashboard', agentDashboardRouter);

const UsuarioRoutes = require('./routes/Usuario')
const PedidosRoute = require('./routes/PedidosRoute')
app.use('/', PedidosRoute)
app.use('/', UsuarioRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
