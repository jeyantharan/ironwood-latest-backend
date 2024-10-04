const mongoose = require('mongoose')


module.exports = mongoose.model('Link', {
   Weather:{
    type:String
   },
   Event:{
    type:String
   }

})