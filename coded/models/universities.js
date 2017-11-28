const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UniversitySchema = new Schema({
  name: {type: String, unique: true},
  website:{type: String, unique: true, lowercase: true},

  contactnumber : Number,
  universityprofile:{
    location: String,
    mode:{type: String, unique: true},
    paymentportal: {type: String, unique: true, lowercase: true},
    Department1: {
      title: String,
      courses:[

      ]
    },
    Department1: {
      title: String,
      courses:[

      ]
    },
    Department2: {
      title: String,
      courses:[

      ]
    },
    Department3: {
      title: String,
      courses:[

      ]
    },
    Department4: {
      title: String,
      courses:[

      ]
    },
    Department5: {
      title: String,
      courses:[

      ]
    },
    Department6: {
      title: String,
      courses:[

      ]
    },
    Department7: {
      title: String,
      courses:[

      ]
    },
    Department8: {
      title: String,
      courses:[

      ]
    },
    Department9: {
      title: String,
      courses:[

      ]
    },
    Department10: {
      title: String,
      courses:[

      ]
    },
    Department11: {
      title: String,
      courses:[

      ]
    },
    Department12: {
      title: String,
      courses:[

      ]
    },
    Department13: {
      title: String,
      courses:[

      ]
    },
    Department14: {
      title: String,
      courses:[

      ]
    },
    Department15: {
      title: String,
      courses:[

      ]
    },
    Department16: {
      title: String,
      courses:[

      ]
    },
    Department17: {
      title: String,
      courses:[

      ]
    },
    Department18: {
      title: String,
      courses:[

      ]
    },
    Department19: {
      title: String,
      courses:[

      ]
    }

  },

})



module.exports = mongoose.model("University", UniversitySchema);
