const {
  getRoot, getError, getIndex, getDownload, loginHandler,
  getAllUsersHandler,
} = require('./handler');

const routes = [
  {
    path: '/',
    method: 'GET',
    handler: getRoot,
  },
  {
    path: '/{any*}',
    method: 'GET',
    handler: getError,
  },
  {
    path: '/index',
    method: 'GET',
    handler: getIndex,
  },
  {
    path: '/download',
    method: 'GET',
    handler: getDownload,
  },
  {
    path: '/users',
    method: 'GET',
    handler: getAllUsersHandler,
  },
  {
    path: '/home',
    method: 'POST',
    handler: loginHandler,
  },
];

module.exports = routes;
