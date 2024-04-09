require('dotenv').config();
const express = require('express');
const { connect } = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/api-docs.yaml');
const authRoutes = require('./routes/routes');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);

connect().then((db) => {
  app.get('/some-data', async (req, res) => {
    try {
      const someData = await db.collection('someCollection').find({}).toArray();
      res.json(someData);
    } catch (error) {
      console.error('Error accessing database:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
