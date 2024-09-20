const mongoose = require('mongoose')


module.exports = mongoose.model('Front', {
    En:{
        type:Array
    },
    De:{
        type:Array
    },
    It:{
        type:Array
    },
    Cs:{
        type:Array
    }

})