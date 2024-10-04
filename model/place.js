const mongoose = require('mongoose')

module.exports = mongoose.model('Place', {
    En:{
        type:Object
    },
    De:{
        type:Object
    },
    It:{
        type:Object
    },
    Cs:{
        type:Object
    },
    Type:{
        type: String
    }

})