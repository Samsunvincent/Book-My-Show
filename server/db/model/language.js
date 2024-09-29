const mongoose = require('mongoose');

let language_Schema = new mongoose.Schema({
    language : {
        type : String
    }
})

module.exports = mongoose.model('language',language_Schema);

