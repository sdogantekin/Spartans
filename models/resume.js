var mongoose = require("mongoose");

// this defines the document schema
var workInfoSchema = mongoose.Schema({
    company: {type: String, required: true},
    position: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: false},
    summary: {type: String, required: true},
});


var educationInfoSchema = mongoose.Schema({
    institution: {type: String, required: true},
    degreeArea: {type: String, required: true},
    studyType: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: false},
    gpa: {type: Number, required: false},
    courses: {type: [String], required: true}
});


var projectInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    summary: {type: String, required: true},
    url: {type: String, required: false},
    start: {type: Date, required: true},
    end: {type: Date, required: false}
});

var volunteerInfoSchema = mongoose.Schema({
    organization: {type: String, required: true},
    position: {type: String, required: true},
    website: {type: String, required: false},
    start: {type: Date, required: true},
    end: {type: Date, required: false},
    summary: {type: String, required: true},
    highlights: {type: [String], required: true}
});


var publicationInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    publisher: {type: String, required: true},
    summary: {type: String, required: true},
    website: {type: String, required: false},
    releaseDate: {type: Date, required: true}
});


var awardInfoSchema = mongoose.Schema({
    title: {type: String, required: true},
    awarder: {type: String, required: true},
    summary: {type: String, required: false},
    date: {type: Date, required: true}
});


var skillInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: false}
});


var salaryInfoSchema = mongoose.Schema({
    min: {type: Number, required: true},
    max: {type: Number, required: true},
    currencyCode: {type: String, required: false},
    date: {type: Date, required: true}
});

var languageInfoSchema = mongoose.Schema({
    language: {type: String, required: true},
    fluency: {type: String, required: true}
});

var locationInfoSchema = mongoose.Schema({
    address: {type: String, required: true},
    city: {type: String, required: true},
    region: {type: String, required: false},
    country: {type: String, required: true},
    postalCode: {type: String, required: true},
});


var socialProfileInfoSchema = mongoose.Schema({
    network: {type: String, required: true},
    username: {type: String, required: true},
    url: {type: String, required: false}
});

var interestInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    keyword: {type: [String], required: false}
});

var referenceInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    reference: {type: String, required: true}
});

var resumeSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    label: {type: String, required: false},
    picture: {type: Buffer, required: false},
    website: {type: String, required: false},
    summary: {type: String, required: false},
    birthDate: {type: Date, required: true},
    language: {type: [languageInfoSchema], required: false},
    location: {type: locationInfoSchema, required: true},
    profile: {type: [socialProfileInfoSchema], required: false},
    workHistory: {type: [workInfoSchema], required: false},
    educationHistory: {type: [educationInfoSchema], required: false},
    skills: {type: [skillInfoSchema], required: false},
    projects: {type: [projectInfoSchema], required: false},
    volunteers: {type: [volunteerInfoSchema], required: false},
    awards: {type: [awardInfoSchema], required: false},
    publications: {type: [publicationInfoSchema], required: false},
    interests: {type: [interestInfoSchema], required: false},
    references: {type: [referenceInfoSchema], required: false},
    salary: {type: [salaryInfoSchema], required: false},
    
    userId: {type: String},
    createdAt: {type: Date, default: Date.now()}
});

resumeSchema.statics.findResume = function (userId,callback) {
    var resumes = []
    this.find({userId : userId}).sort({createdAt: -1}).exec(function (err,users) {
        users.forEach(function(user){
            resumes.push(user);
        });
        callback(resumes);
    })
}

resumeSchema.methods.findSuitableRecruitan = function () {
    return;
}

// methods must be added to the schema before compiling it with mongoose.model()
// the first parameter is the singular name of collection --> collection name is db is plural --> resumes!
var Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
