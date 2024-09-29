const mongoose = require('mongoose');

let show_Schema = new mongoose.Schema({
    name :{
        type : String,
        // required : true
    },
    image : {
        type : String,
        // required : true
    },
    rating : {
        type : Number,
        // required : true,

    },
  
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"

    },
    language : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "language"
    },
    duration :{
        type : Number,

    },
    release_date : {
        type : String
    },
    description :{
        type : String
    },
    cast : {
        type : String
    },
    crew : {
        type : String
    }

})



let show = mongoose.model('show_collection',show_Schema);
module.exports = show;
