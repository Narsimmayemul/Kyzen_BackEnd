require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const app = express();
const cors = require('cors');
app.use(cors())


app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
//   logging: console.log,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./models/user')(sequelize, Sequelize);
db.Product = require('./models/product')(sequelize, Sequelize);


const signupRouter = require('./Routes/signup');
const signinRouter = require('./Routes/signin');
const productRouter = require('./Routes/products');

app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/users', productRouter);

app.get("/", (req, res) => {
  res.send('This is Home Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
