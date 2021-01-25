const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const  MONGODB_URI  = "mongodb+srv://shaimaa870:hager123@@iti-db-1.6vyje.mongodb.net/test";

mongoose.connect(MONGODB_URI,{  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false} );
// require("dotenv").config();

// const url = process.env.MONGODB_URI
// mongoose.connect(url, {
 
// });
// mongoose.connection
//   .once("open", function () {
//     console.log("DB Connected!");
//   })
//   .on("error", function (error) {
//     console.log("Error is: ", error);
//   });
   
 

app.use(express.json());

app.use('/', routes);

app.use('*', (req, res, next) => {
  res.status(404).json({ err: 'NOT_FOUND' });
});

app.use((err, req, res, next) => {
  // Map the error and send it to user
  // instanceof
  // Check if this err is a mongoose err using instanceof
  console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();
});

const { PORT = 6000 } = process.env;

app.listen(PORT, () => {
  console.log('App is up and ready on:', PORT);
});
