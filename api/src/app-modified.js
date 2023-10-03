// import express from 'express';
// import cookieParser from('cookie-parser');
// import bodyParser from('body-parser');
// import morgan from 'morgan';
// import pokemonRoutes from './routes/pokemonRoutes';
// import typesRoutes from './routes/typeRoutes';
// import db from require './db.js';
// import cors from 'cors';

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const server = express();
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
// server.use(pokemonRoutes);
// server.use(typesRoutes);
server.use('/', routes);
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;