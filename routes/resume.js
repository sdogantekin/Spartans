var express = require("express");
var router  = express.Router();
var Resume  = require("../models/resume");

router.get("",function(request,response,next){
    response.render("resume");
});

router.post("", function (request, response, next) {

    var name = request.body.name;
    var surname = request.body.surname;
    var contactInfo = request.body.contactInfo;
    var birthDate = request.body.birthDate;
    var experience = request.body.experience;
    var language = request.body.language;
    var categories = request.body.categories;
    var skills = request.body.skills;
    var location = request.body.location;
    var workName = request.body.workName;
    var workTitle = request.body.workTitle;
    var workStart = request.body.workStart;
    var workEnd = request.body.workEnd;
    var educationSchool = request.body.educationSchool;
    var educationDegree = request.body.educationDegree;
    var educationStart = request.body.educationStart;
    var educationEnd = request.body.educationEnd;
    var salaryMin = request.body.salaryMin;
    var salaryMax = request.body.salaryMax;
    var userId = request.user._id;

    var newResume = new Resume({name: name,
        surname: surname,
        contactInfo: contactInfo,
        birthDate: birthDate,
        experience: experience,
        language: language,
        categories: categories,
        skills: skills,
        location: location,
        workHistory: {
        name : workName,
            title : workTitle,
            start : workStart,
            end : workEnd
        },
        educationHistory: {
        school : educationSchool,
            degree : educationDegree,
            start : educationStart,
            end : educationEnd
        },
        salary : {
        min: salaryMin,
            max: salaryMax
        },
        userId : userId

    });

    newResume.save(function(err){
        if(!err){
            return response.redirect('/users/' + request.user.username);
        }
        else{
            return response.send("Error");
        }
    });
})

module.exports = router;