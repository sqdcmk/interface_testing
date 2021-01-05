const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    page: {
        type: String,
    },
    obj: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LogSchema', LogSchema);