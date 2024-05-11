const { request } = require('http');
const path = require('path');
const Connection = require('./dbconfig');

const getRoot = (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'Welcome to the Root!',
  });

  response.code(200);
  return response;
};

const getError = (request, h) => `<h1>You appear to be lost!</h1>
    <h2>Current path is ${path.resolve(__dirname)}</h2>`;

const getIndex = (request, h) => h.file('index.html');

const getDownload = (request, h) => h.file('index.html', {
  mode: 'attachment',
  filename: 'downloaded-index.html',
});

const loginHandler = (request, h) => {
  const { username, password } = request.payload;

  if (!username || !password) {
    return h.redirect('/index');
  }
  return h.view('home', { username, password });
};

const getAllUsersHandler = async(request, h) => {
    
    const users = await Connection.getAllUsers();
    const data = { users }
    
    return h.view('users', data);
    
}

module.exports = {
  getRoot, getError, getIndex, getDownload, loginHandler,
  getAllUsersHandler
};
