const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

//allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
const uri = process.env.DB_STRING;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
