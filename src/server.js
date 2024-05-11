const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const path = require('path');

const init = async() => {
    
    const server = Hapi.server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ['*'],
            },
            files: {
                relativeTo: path.join(__dirname, 'web'),
            }
        },
    });

    await server.register([
        {
            plugin: require('@hapi/inert'),
        },
        {
            plugin: require('@hapi/vision'),
        }
    ])

    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        path: path.join(__dirname, 'views'),
        layout: 'header',
    })

    server.route(routes);

    await server.start();
    console.log(`Server is starting at ${server.info.uri}`);

}

process.on('unhandledRejection', (error)=>{
    console.log(error);
    process.exit(1);
})

init();