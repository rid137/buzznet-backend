require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const swaggerDocs = require("../../utils/swagger");
const cors = require('cors');

const routes = require('../../routes');
const errorHandler = require('../../middlewares/error-handler.middleware');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use("/api", routes);

swaggerDocs(app, process.env.PORT);

app.use(errorHandler);
module.exports = app