var express = require("express");
var router  = express.Router();
var Resume  = require("../models/resume");

router.get("",function(request,response,next){
    response.render("resume");
});

module.exports = router;