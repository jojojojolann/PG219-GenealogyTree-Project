require('dotenv').config();
const express = require('express');
const { connect, disconnect } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/api-docs.yaml');
const authRoutes = require('./routes/routes');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const e = require('express');

app.use(helmet());
app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);

connect().then((db) => {
  db = database;
  console.log('Connected to the database');
}).catch(error => {
  console.error("Connnection to the database failed", error);
  process.exit(1);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});