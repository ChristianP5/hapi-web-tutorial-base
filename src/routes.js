const {
  getRoot, getError, getIndex, getDownload, loginHandler,
  getAllUsersHandler, getCssHandler,
} = require('./handler');

const Boom = require('@hapi/boom');

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
    path: '/css/{filename}',
    method: 'GET',
    handler: getCssHandler,
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
  {
    path: '/auth',
    method: 'GET',
    handler: (request, h)=>{

      const { name } = request.auth.credentials;

      return `<h1>Welcome ${name} to my Private API!</h1>`;
    },
    options: {
      auth: 'login',
    }
  },
  {
    path: '/logout',
    method: 'GET',
    handler: ()=>{
      return Boom.unauthorized();
    }
  }
];

module.exports = routes;
