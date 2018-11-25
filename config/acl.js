const config = require('./config');

module.exports = {
  admin: {
    POST: ['/api/v3/signup'],
    PUT: ['/admin/distribution'],
    GET: ['/admin/statistics', '/admin/remove', '/admin/base', '/admin/upload', '/admin/signup', '/admin'],
  },
  user: {
    POST: [],
    GET: ['/operator/start'],
  },
  manager: {
    POST: [],
    GET: ['/manager/start', '/manager/call'],
  },
};
