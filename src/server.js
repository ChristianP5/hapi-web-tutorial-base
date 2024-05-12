const Hapi = require('@hapi/hapi');
const path = require('path');
const routes = require('./routes');

const validUsers = [
  {username: "Admin", password: "111", name: "Admin User"},
  {username: "Admin2", password: "122", name: "Second Admin User"},
]

const validate = (request, username, password, h) => {
  const index = validUsers.findIndex((item)=>item.username===username);
  if(index != -1){
    const user = validUsers[index];

    if (user.password === password){
      return { isValid: true,  credentials: { name: user.name}};
    }else{
      return { isValid: false };
    }
    
  }else{
    return { isValid: false };
  }
}

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
      files: {
        relativeTo: path.join(__dirname, 'web'),
      },
    },
  });

  await server.register([
    {
      plugin: require('@hapi/inert'),
    },
    {
      plugin: require('@hapi/vision'),
    },
    {
      plugin: require('@hapi/basic')
    }
  ]);

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    path: path.join(__dirname, 'views'),
    layout: 'header',
  });

  server.auth.strategy('login', 'basic', { validate });

  server.route(routes);

  await server.start();
  console.log(`Server is starting at ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit(1);
});

init();
