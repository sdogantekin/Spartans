var mongoose = require("mongoose");

var threadSchema = mongoose.Schema({
    participants: {type:[{type: mongoose.Schema.ObjectId, ref: 'User'}]},
    createdAt: {type:Date, default:Date.now()}
});

threadSchema.statics.allThreadsByUser = function (req, res, next) {
    this.find({participants: req.user._id}).populate('participants').exec(function (err, threads) {
       if(err) {
           return next(err);
       }
       req.resources.threads = threads;
       next();
    });
};

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> users!
var Thread = mongoose.model("CommThread",threadSchema);

module.exports = Thread;