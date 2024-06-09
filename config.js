const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.Database,'root', process.env.Password, {
  host: 'mysql-204fd5ae-narsimmayemul49450-303b.i.aivencloud.com',
  dialect: 'mysql',
  "port": 16242,
  dialectOptions:{
    connectTimeout : 86400
  }
});


// console.log()

async function connectionToDb(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectionToDb()