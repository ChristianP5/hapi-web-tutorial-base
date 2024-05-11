const { DataTypes } = require('sequelize');
const Connection = require('../dbconfig/index');

const dbconnection = Connection.connection;

const Users = dbconnection.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,

});

const createUser = (name, password)=>{
    Users.create({ name: name, password: password}).then((data)=>{
});
}

module.exports.createUser = createUser;
/*

// To Initialize the Table the first time
dbconnection.drop().then(() => {
  dbconnection.sync();
});
*/