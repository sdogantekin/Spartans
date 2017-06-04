var nodemailer = require('nodemailer');
var kue = require('kue');
var jobs = kue.createQueue();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spartansdeneme@gmail.com',
        pass: 'spartans123'
    }
});

var mailOptions = {
    from: '"Spartans" <spartansdeneme@gmail.com>', // sender address
    to: 'spartansdeneme@gmail.com, spartansdeneme@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world' // plain text body
};


var jobSendEmailEvery2Hours = jobs.create('SendEmailEvery2Hours', mailOptions).delay(2 * 60 * 60 * 1000).priority('high').save( function(err){
    if(!err) console.log(jobSendEmailEvery2Hours.id);
});

//Set specific time
var date = new Date();
date.setHours(20);
date.setMinutes(15);

var jobSendEmailDaily = jobs.create('SendEmailDaily', mailOptions).delay(date).priority('high').save( function(err){
    if(!err) console.log( jobSendEmailDaily.id );
});

var data = 0;
var jobSendEmailIfDataIs5 = jobs.create('SendEmailIfDataIs5', mailOptions).delay(1 * 60 * 60 * 1000).priority('high').save ( function (err) {
    if(!err) console.log(jobSendEmailIfDataIs5.id);
});

jobs.process('SendEmailEvery2Hours', 10, function (job, done) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('2 Hourly Mail %s sent: %s', info.messageId, info.response);
        done();
    });
    jobs.create('SendEmailEvery2Hours', mailOptions).delay(2 * 60 * 60 * 1000).priority('high').save();

});

jobs.process('SendEmailDaily', 10, function (job, done) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Daily Mail %s sent: %s', info.messageId, info.response);
        done();
    });
    jobs.create('SendEmailDaily', mailOptions).delay(24 * 60 * 60 * 1000).priority('high').save();

});

jobs.process('SendEmailIfDataIs5', 10, function (job, done) {

    if(data ==  5){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Data is 5 and Mail %s sent: %s', info.messageId, info.response);
            done();
        });
    }
    else{
        data = data + 1;
        console.log("Data value : " + data);
        jobs.create('SendEmailIfDataIs5', mailOptions).priority('high').save();
    }

});


process.once('SIGINT', function (sig) {
    jobs.shutdown(5000, function (err) {
        console.log('[' + process.pid + '] Kue shutdown: ', err || '');
        process.exit(0);
    });
});

kue.app.listen(3001);
console.log('UI started on port 3001');