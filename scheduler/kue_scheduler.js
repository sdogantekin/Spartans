var nodemailer = require("nodemailer");
var kue        = require("kue");
var winston    = require("winston");
var extend     = require("util")._extend;
var config     = require("../config/config");

function initializeKue() {
    kue.app.listen(3001);
    winston.info('UI started on port 3001');
}
exports.initializeKue = initializeKue;

function createTestJobs() {
    var jobs = kue.createQueue({
        redis: "redis://"+config.redis.host+":"+config.redis.port
    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'spartansdeneme@gmail.com',
            pass: 'spartans123'
        }
    });

    var mailJobBaseData = {
        from: '"Spartans" <spartansdeneme@gmail.com>', // sender address
        to: 'spartansdeneme@gmail.com, spartansdeneme@gmail.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world', // plain text body,
        counter: 0 // counter data to be used
    };

    var jobSendEmailEvery2Hours = jobs.create('SendEmailEvery2Hours', mailJobBaseData).delay(2 * 60 * 60 * 1000).priority('high').save( function(err){
        if(!err) {
            winston.info("create job for SendEmailEvery2Hours");
        }
    });

//Set specific time
    var dailyTime = new Date();
    dailyTime.setHours(20,15,0,0);

    var jobSendEmailDaily = jobs.create('SendEmailDaily', mailJobBaseData).delay(dailyTime).priority('high').save( function(err){
        if(!err) {
            winston.info("create job for SendEmailDaily");
        }
    });

    var jobSendEmailIfDataIs5 = jobs.create('SendEmailIfDataIs5', mailJobBaseData).delay(1 * 10 * 1000).priority('high').save ( function (err) {
        if(!err) {
            winston.info("create job for SendEmailIfDataIs5");
        }
    });

    jobs.process('SendEmailEvery2Hours', 10, function (job, done) {
        transporter.sendMail(job.data, function(error, info){
            if (error) {
                winston.error(error);
                return;
            }
            winston.info('2 Hourly Mail %s sent: %s', info.messageId, info.response);
            done();
        });
        jobs.create('SendEmailEvery2Hours', mailJobBaseData).delay(2 * 60 * 60 * 1000).priority('high').save();

    });

    jobs.process('SendEmailDaily', 10, function (job, done) {
        transporter.sendMail(job.data, function(error, info){
            if (error) {
                winston.error(error);
                return;
            }
            winston.info('Daily Mail %s sent: %s', info.messageId, info.response);
            done();
        });
        jobs.create('SendEmailDaily', mailJobBaseData).delay(24 * 60 * 60 * 1000).priority('high').save();
    });

    jobs.process('SendEmailIfDataIs5', 10, function (job, done) {
        if(job.data.counter ==  5){
            transporter.sendMail(mailJobBaseData, function(error, info){
                if (error) {
                    winston.error(error);
                    return;
                }
                winston.info('Data is 5 and Mail %s sent: %s', info.messageId, info.response);
                done();
            });
        }
        else{
            var jobData = extend({}, job.data);
            jobData.counter++;
            winston.info("Data value : " + jobData.counter);
            jobs.create('SendEmailIfDataIs5', jobData).delay(1 * 10 * 1000).priority('high').save();
        }
    });
}
exports.createTestJobs = createTestJobs;