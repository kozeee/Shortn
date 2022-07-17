const mongoose = require('mongoose')
const shortId = require('shortid')


const shortUrlSchema = new mongoose.Schema({

    full:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortId.generate
    },
    redirects:{
        type:String,
        required:true,
        default:0
    }

})

module.exports = mongoose.model('Shortn', shortUrlSchema)