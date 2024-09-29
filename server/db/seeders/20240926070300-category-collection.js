

const category = require("../model/category");

module.exports = {
  up: (models, mongoose) => {

      return models.category.insertMany([
        {
         _id : "66f63d4088528ca2a62af30c",
         category : "Comedy"
        },
        {
          _id : "66f63d4c88528ca2a62af30d",
          category: "Horror"
        },
        {
          _id : "66f63cea88528ca2a62af308",
          category: "Thriller"
        },
        {
          _id : "66f63cf788528ca2a62af309",
          category: "Adventure"
        },
        {
          _id : "66f63d0588528ca2a62af30a",
          category: "Romance"
        },
        {
          _id : "66f63d1688528ca2a62af30b",
          category: "Sci-fi"
        },
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
   
      return models.category.deleteMany({
        _id : {
          $in : [
            "66f63d4088528ca2a62af30c",
            "66f63d4c88528ca2a62af30d",
            "66f63cea88528ca2a62af308",
            "66f63cf788528ca2a62af309",
            "66f63d0588528ca2a62af30a",
            "66f63d1688528ca2a62af30b"

          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull")
      console.log(res.deletedCount);
      });
    
  }
};
