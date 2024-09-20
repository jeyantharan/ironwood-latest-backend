const mongoose = require('mongoose')

// module.exports = mongoose.model('Place', {
//     Name: {
//         type: String, 
//         unique:true
//     },
//     Image: {
//         type: String, 
//     },
//     Description: {
//         type: String, 
//     },
//     ShortDescription: {
//         type: String, 
//     },
//     Map:{
//         type: String, 
//     },
//     Type:{
//         type: String, 
//     },
//     DirMap:{
//         type: String, 
//     },
//     Phone:{
//         type: String,
//     }


// })

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