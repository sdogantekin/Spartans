var mongoose = require("mongoose");
var bcrypt   = require("bcrypt-nodejs");

const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    fileId:{type:String},
    email: {type:String, required:true, default:"deneme@deneme.com"},
    createdAt: {type:Date, default:Date.now(),

    }
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