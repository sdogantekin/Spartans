var mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
    sender: {type:[{type: mongoose.Schema.ObjectId, required: true, ref: 'User'}]},
    thread: {type:[{type: mongoose.Schema.ObjectId, required: true, ref: 'CommThread'}]},
    body:{type: String, required: true},
    createdAt: {type:Date, default:Date.now()}
});

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> users!
var Message = mongoose.model("CommMessage",messageSchema);

module.exports = Message;