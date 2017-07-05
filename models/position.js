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
    department: {type: [String], required:false},
    type: {type: [String], required: true},
    skills: {type: [String], required:false},
    perfection: {type: [String], required:false},
    qualification: {type: [String], required: true},
    location: {type: [String], required: true},
    salary: {type: salaryInfoSchema, required: false},
    other: {type:[String], required:false},
    deadline: {type: deadlineSchema, required: false},
    createdBy: {type:mongoose.Schema.ObjectId, ref: "User", required: true},
    createdAt: {type:Date, default:Date.now()},
    assigned : {type:String, required:false}
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

positionSchema.methods.assignToSuitableRecrution = function assignToSuitableRecrution(callback) {
    var userId;
    Position.aggregate([
        {$match: {'assigned': { "$exists" : true } } },
        {$group: {
            _id: '$assigned',  //$assigned is the column name in collection
            count: {$sum: 1} } },
        { $sort : { count : 1} }
        ]
    ).allowDiskUse(true).exec(function(err, data) {
        if (err) return console.log('err', err);
        userId = data[0]._id;
        console.log('id :',data);
        callback(userId)
    });

};

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> positions!
var Position = mongoose.model("Position", positionSchema);

module.exports = Position;