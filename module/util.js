const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema=new Schema({
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
        
    }
})

module.exports =mongoose.model('FinishSchema',FinishSchema);