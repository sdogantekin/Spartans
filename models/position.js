var mongoose = require("mongoose");
var winston  = require("winston");

// this defines the document schema
var deadlineSchema = mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: false},
});

var salaryInfoSchema = mongoose.Schema({
    min: {type: Number, required: true},
    max: {type: Number, required: true}
});

var positionSchema = mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    attributes: {type: [String], required: true},
    qualifications: {type: [String], required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    salary: {type: salaryInfoSchema, required: false},
    military: {type: String, required: false},
    deadline: {type: deadlineSchema, required: false},
    userId : {type: String},
    createdAt: {type:Date, default:Date.now()}
});

positionSchema.statics.findPosition = function(userId, callback) {
    var positions = []
    this.find({userId : userId}).sort({createdAt: -1}).exec(function (err,users) {
        users.forEach(function(user){
            positions.push(user);
        });
        callback(positions);
    })
}

positionSchema.methods.findSuitableRecruitan = function () {
    return;
}

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> positions!
var Position = mongoose.model("Position", positionSchema);

module.exports = Position;