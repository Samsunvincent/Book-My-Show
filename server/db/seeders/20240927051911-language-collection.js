const language = require('../model/language')

'use strict';

module.exports = {
  up: (models, mongoose) => {

      return models.language.insertMany([
        {
          _id : "66f640e688528ca2a62af30e",
          language : "Malayalam"
        },
        {
          _id : "66f644c3c426a7999b1e6135",
          language : "English"
        },
        {
          _id : "66f644e2c426a7999b1e6136",
          language : "Hindi"
        },
        {
          _id : "66f644f9c426a7999b1e6137",
          language : "Tamil"
        },
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {


      
      return models.language.deleteMany({
        _id :{
          $in : [
            "66f640e688528ca2a62af30e",
            "66f644c3c426a7999b1e6135",
            "66f644e2c426a7999b1e6136",
            "66f644f9c426a7999b1e6137"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
