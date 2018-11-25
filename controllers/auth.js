/* eslint-disable prefer-destructuring */
const faker = require('faker');
const URL = require('url'); // built-in utility
const jwt = require('jsonwebtoken');
const cyrillicToTranslit = require('cyrillic-to-translit-js');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const acl = require('../config/acl');

const saltRounds = 10;

const log = require('../utils/log')(module);
const User = require('../models/users');

// Create user
function setupPost(req, res) {
  const Name = req.body.username;
  const Role = req.body.role;
  const yandex = req.body.yandex;
  const Email = req.body.email;
  const saveUser = async () => {
    const pwd = await faker.internet.password();
    const translatedUser = await cyrillicToTranslit().transform(`${Name}`, '_').toLowerCase();
    const hashedPassword = await bcrypt.hash(pwd, saltRounds);
    const Token = await jwt.sign({ translatedUser, hashedPassword, Role }, process.env.SECRET);
    const NewUser = new User({
      username: translatedUser,
      yandexID: yandex,
      role: Role,
      password: pwd,
      hash: hashedPassword,
      token: Token,
      email: Email,
    });
    await NewUser.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: 1, msg: 'Bad Request', exception: err });
      }
      return res.status(200).json({ error: 0, password: pwd, username: data.username });
    });
  };
  saveUser()
    .catch((exception) => {
      const exceptionString = exception.toString();
      log.error(exceptionString);
      return res.status(500).json({ error: 1, msg: 'Internal Error', exceptionString });
    });
}

// remove user
function removeUser(req, res) {
  const user = req.body.username;
  if (typeof user === 'undefined') {
    return res.status(400).json({ error: 1, msg: 'Bad Request' });
  }
  User.findOneAndDelete({ username: cyrillicToTranslit().transform(`${user}`, '_').toLowerCase() }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 1, msg: 'Internal Error' });
    }
    if (result == null) {
      return res.status(404).json({ error: 1, msg: 'User not found' });
    }
    return res.status(200).json({ error: 0, message: 'Removed' });
  });
  return 0;
}

function renderLogin(req, res) {
  return res.status(200).render('login');
}

function logout(req, res) {
  return res.status(301).clearCookie('token').redirect('/login');
}

function login(req, res) {
  const Password = { password: req.body.password };
  const Username = { username: req.body.username };
  if (typeof (Password.password) === 'undefined' || typeof (Username.username) === 'undefined') {
    return res.status(400).json({ err: 1, msg: 'Bad Request' });
  }
  const Login = async () => {
    const result = await User.findOne({
      username: cyrillicToTranslit().transform(`${Username.username}`, '_').toLowerCase(),
    }, (err, data) => data);
    const match = await bcrypt.compare(Password.password, result.hash);
    return { result, match };
  };
  Login()
    .then((result) => {
      if (!result.match) {
        return res.status(403).clearCookie('token').json({ err: 0, msg: 'Unauthorized' });
      }
      const options = {
        path: '/',
      };
      if (result.result.role === 'user') {
        return res.status(200).cookie('token', `${result.result.token}`, options).redirect(`/operator/start?operator=${result.result.username}`);
      } if (result.result.role === 'manager') {
        return res.status(200).cookie('token', `${result.result.token}`, options).redirect(`/manager/start?username=${result.result.username}`);
      } if (result.result.role === 'admin') {
        return res.status(200).cookie('token', `${result.result.token}`, options).redirect('/admin');
      }
      return 0;
    })
    .catch((exception) => {
      if (exception.toString().includes('TypeError: Cannot read property')) {
        return res.status(403).clearCookie('token').json({ err: 0, status: 'Unauthorized', msg: 'User not found' });
      }
      return res.status(500).json({ err: 1, msg: exception.toString() });
    });
  return 0;
}
// TypeError: Cannot read property 'hash' of null
// mWXSG9EFoOSRWTc

function TokenMiddleware(req, res, next) {
  const token = req.cookies.token;
  async function checkUser() {
    const decoded = await jwtDecode(token);
    const user = await User.findOne({ username: decoded.translatedUser }, (err, data) => data);
    const match = await bcrypt.compare(user.password, decoded.hashedPassword);

    if (!match) {
      return res.status(401).json({ err: 1, status: 'Unauthorized', msg: 'Invalid token' });
    }
    return { user, match };
  }
  checkUser()
    .then((result) => {
      const methods = Object.getOwnPropertyDescriptor(acl, result.user.role).value;
      const routes = Object.getOwnPropertyDescriptor(methods, req.method).value;
      function getURL(url) {
        return url === URL.parse(req.originalUrl).pathname;
      }
      console.log(`DEBUG: ${req.url} ${URL.parse(req.originalUrl).pathname}`);
      if (routes.find(getURL) === undefined) {
        return res.status(403).json({ err: 1, msg: 'Forbidden' });
      }
      next();
      return 0;
    })
    .catch(exception => res.status(500).json({ err: 1, msg: 'Internal Error', exception: exception.toString() }));
}

module.exports.setupPost = setupPost;
module.exports.removeUser = removeUser;
module.exports.TokenMiddleware = TokenMiddleware;
module.exports.login = login;
module.exports.renderLogin = renderLogin;
module.exports.logout = logout;
