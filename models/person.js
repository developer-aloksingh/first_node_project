const mongoose = require("mongoose");

//define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{ 
        type: Number ,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    }
})

//create person model
const person = mongoose.model('person', personSchema);
module.exports = person