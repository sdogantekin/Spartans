var mongoose = require("mongoose");
var bcrypt   = require("bcryptjs");

const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    email: {type:String, required:true, default:"deneme@deneme.com"},
    createdAt: {type:Date, default:Date.now()}
});

userSchema.methods.validatePassword = function(entry,callback) {
    bcrypt.compare(entry,this.password,function(err,isMatch){
        callback(err,isMatch);
    });
};

var noop = function(){};

userSchema.pre("save",function(done){
    var user = this;
    if(!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function(err,hashedPassword){
            if(err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> users!
var User = mongoose.model("User",userSchema);

module.exports = User;

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}