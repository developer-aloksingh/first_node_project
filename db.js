const mongoose = require("mongoose");

const mongoURL ='mongodb://127.0.0.1:27017/college'     //database name-college

mongoose.connect(mongoURL,{
    useNewURLPARSER: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () =>{                           //mongoose event listener
    console.log('mongodb connection stablished');
});

db.on('disconnected', () =>{                          
    console.log('mongodb connection disconnected');
});

db.on('error', () =>{                           
    console.log('mongodb connection error');
});

module.exports = db;                //import in index.js

