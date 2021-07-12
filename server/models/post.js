const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    url: {type: String, require: true},
    status: {type: String, enum:['TO LEARN', 'LEARNING', 'LEARNED']},
    user: {type: Schema.Types.ObjectId, ref: 'users'},
})

module.exports = mongoose.model('posts', PostSchema); 