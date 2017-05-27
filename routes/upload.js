var _    = require('underscore');
var AWS  = require('aws-sdk');
var fs   = require('fs');
var path = require('path');
var flow = require('flow');
var User  = require("../models/user");

var imageId = "";
 configPath = path.join(__dirname, '..', "config.json");

 AWS.config.loadFromPath(configPath);

 exports.s3 = function(req, res) {
 	var s3 = new AWS.S3(),
 		file = req.file,
 		result = {
 			error: 0,
 			uploaded: []
 		};

 	flow.exec(
 		function() { // Read temp File
 			fs.readFile(file.path, this);
 		},
 		function(err, data) { // Upload file to S3
 			s3.putObject({
 				Bucket: 'spartans7', //Bucket Name
 				Key: file.originalname, //Upload File Name, Default the original name
 				Body: data
 			}, this);
 		},
 		function(err, data) { //Upload Callback
 			if (err) {
 				console.error('Error : ' + err);
 				result.error++;
 			}
 			result.uploaded.push(data.ETag);
 			this();
 		},
 		function() {
            console.log({
                title: "Upload Result",
                message: result.error > 0 ? "Something is wroing, Check your server log" : "Success!!",
                entitiyIDs: result.uploaded
            });
            
            imageId = result.uploaded;

            User.findOne({username: req.user.username}, function (err, user) {
                var result = {};
                if (err) {
                    result.status = "fail";
                    result.message = err;
                    return response.json(result);
                }

                user.fileId = imageId;

                user.save(function (err, user) {
                    if (err) {
                        res.status(500).send(err)
                    }
                });

                res.send("File Uploaded");

            });
        })
 }



