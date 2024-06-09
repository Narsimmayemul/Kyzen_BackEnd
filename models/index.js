const Sequelize = require('sequelize');
const config = require('../config/config.json').development;


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  // logging: console.log, 
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/user')(sequelize, Sequelize);
db.Product = require('../models/product')(sequelize, Sequelize);

module.exports = db;
