var express = require("express");
var router = express.Router();
var Resume = require("../models/resume");

router.get("", function (request, response, next) {
    response.render("resume");
});

router.post("", function (request, response, next) {
    var newResume = new Resume({
        name             : request.body.name,
        surname          : request.body.surname,
        email            : request.body.email,
        phone            : request.body.phone,
        birthDate        : request.body.birthDate,
        language         : request.body.language,
        categories       : request.body.categories,
        skills           : request.body.skills,
        location         : request.body.location,
        preferredLocation: request.body.preferredLocation,
        salary: {
            min          : request.body.salary.min,
            max          : request.body.salary.max
        },
        other            : request.body.other,
        createdBy        : request.user._id
    });

    newResume.save(function (err) {
        if (!err) {
            var result = {};
            result.status = "success";
            return response.json(result);
        } else {
            var result = {};
            result.status = "fail";
            result.message = err;
            return response.json(result);
        }
    });
});

router.get("/getResume", function (request, response, next) {
    Resume.findResume(request.user._id, function (res) {
        response.send(res);
    });
});

module.exports = router;