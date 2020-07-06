const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

/* Database */

const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const proxy = require('http-proxy-middleware')


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/* ======= */

app.use(cors());
app.use(express.json());

const donationsRouter = require('./routes/donations');

app.use('/donations', donationsRouter);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('../../build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

/*
if (process.env.NODE_ENV === 'production'){
  app.use.express.static('/../build');
}
*/


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});