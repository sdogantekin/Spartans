var express   = require("express");
var router    = express.Router();
var Position  = require("../models/position");

router.get("",function(request,response,next){
    response.render("position", {positions:""});
});
//var positionId;
router.post("", function (request, response, next) {

    var newPosition = new Position({
        department       : request.body.department,
        type             : request.body.type,
        skills           : request.body.skills,
        perfection       : request.body.perfection,
        qualification    : request.body.qualification,
        location         : request.body.location,
        salary: {
            min          : request.body.salary.min,
            max          : request.body.salary.max
        },
        other            : request.body.other,
        createdBy        : request.user._id
    });

    newPosition.save(function (err) {
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

/*    newPosition.assignToSuitableRecrution(function (userId) {
        Position.findOne({_id: newPosition.id}, function (err, position) {
            if (err) {
                console.log("Error")
            }
            position.assigned = userId;

            position.save(function (err) {
                if (!err) {
                    response.send("New Position created and the user " + userId + " assigned for recrution")
                }
            });

        });
    });*/

})

router.get("/getPosition",function(request,response,next){
    Position.findPosition(request.user._id, function (positions) {
        response.send(""+positions);

    });
});

module.exports = router;