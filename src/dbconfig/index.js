const Sequelize = require('sequelize');

const sequelize = new Sequelize('my_schema', 'root', 'Xiaogoesbrr1!', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

const getAllUsers = async () => {
  const [result, metadata] = await sequelize.query('SELECT * FROM users');
  return result;
};

module.exports.connection = sequelize;
module.exports.getAllUsers = getAllUsers;

/*
const authenticateServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to Database is working!');
    const [result, metadata] = await sequelize.query('SELECT * FROM my_table');
    console.log(result);
  } catch (error) {
    console.log(error.stack);
  }
};

authenticateServer();
*/
