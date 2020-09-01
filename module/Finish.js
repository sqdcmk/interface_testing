const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishSchema=new Schema({
    pageId:{
        type:String,
        require:true
    },
    list:{
        type:Array,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports =mongoose.model('FinishSchema',FinishSchema);