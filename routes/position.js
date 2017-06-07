var express   = require("express");
var router    = express.Router();
var Position  = require("../models/position");

router.get("",function(request,response,next){
    response.render("position");
});

module.exports = router;