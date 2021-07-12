const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    user: {type: String, require: true},
    pass: {type: String, require: true},
    makpp: {type: Number, require: true},
    tenkpp: {type: String, require: true},
    macum: {type: Number, require: true},
    tencum: {type: String, require: true},
    mavung: {type: Number, require: true},
    tenvung: {type: String, require: true},
    vunggop: {type: Number, require: true},
    tenvunggop: {type: String, require: true},
    role: {type: String, require: true},
    random: {type: Number, require: true},
    role2: {type: String, require: true},
    danhxung: {type: String, require: true},
    tenuser: {type: String, require: true},
})

module.exports = mongoose.model('users', UserSchema); 