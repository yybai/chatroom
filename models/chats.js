const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatsSchema = new Schema({
    message: String,
    user: String,
    color: String,
    createdAt: { type: Date, default: Date.now }
})

const Chats = mongoose.model('chats', ChatsSchema);

module.exports = Chats;