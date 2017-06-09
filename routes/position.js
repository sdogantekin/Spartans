var express   = require("express");
var router    = express.Router();
var Position  = require("../models/position");

router.get("",function(request,response,next){
    response.render("position", {positions:""});
});

router.post("", function (request, response, next) {

    var name = request.body.name;
    var type = request.body.type;
    var attributes = request.body.attributes;
    var qualifications = request.body.qualifications;
    var description = request.body.description;
    var location = request.body.location;
    var salaryMin = request.body.salaryMin;
    var salaryMax = request.body.salaryMax;
    var military = request.body.military;
    var deadlineStart = request.body.deadlineStart;
    var deadlineEnd = request.body.deadlineEnd;
    var userId = request.user._id;

    var newPosition = new Position({
        name: name,
        type: type,
        attributes: attributes,
        qualifications: qualifications,
        description: description,
        location: location,
        salary : {
            min: salaryMin,
            max: salaryMax
        },
        military : military,
        deadline : {
            start: deadlineStart,
            end: deadlineEnd
        },
        userId : userId

    });

    newPosition.save(function(err){
        if(!err){

        }
        else{
            return response.send("Error");
        }
    });
})

router.get("/getPosition",function(request,response,next){
    Position.findPosition(request.user._id, function (positions) {
        response.send(positions);
    });
});

module.exports = router;