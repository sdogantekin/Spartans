var cookieParser    = require('cookie-parser');
var mongoose        = require("mongoose");
var config          = require("../config/config");
var passport        = require("passport");
var session         = require("express-session");
var mongoStore      = require("connect-mongo")(session);

mongoose.connect(config.mongo.url);

var sessionStore = new mongoStore({
    mongooseConnection: mongoose.connection
});

exports = module.exports = function(io) {
    // Configure socket.io session
    io.use(function (socket,next) {
        cookieParser(config.sessionSecret)(socket.request, {}, function(err) {
            var sessionId = socket.request.signedCookies['connect.sid'];
            sessionStore.get(sessionId, function (err,session) {
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function () {
                   passport.session()(socket.request, {}, function () {
                       if(socket.request.user) {
                           next(null, true);
                       } else {
                           next(new Error("User is not authenticated"),false);
                       }
                   });
                });
            });
        });
    });

    // Set socket.io listeners.
    io.on('connection', function(socket){
        console.log('a user connected');
        if(socket.request.user) {
            console.log('connected user is : '+socket.request.user.username);
        }

        // inform everyone that there is a new sheriff in the town :)
        io.emit('chatMessage', {
            type: 'status',
            text: 'connected',
            created: Date.now(),
            username: socket.request.user.username
        });

        // handle chat messages received from client (later published to all connected clients)
        socket.on('chatMessage', function (message) {
            console.log('received message '+message.text+' from '+socket.request.user.username);

            message.type     = 'message';
            message.created  = Date.now();
            message.username = socket.request.user.username;

            io.emit('chatMessage', message);
        });

        // inform everyone that a sheriff is leaving the town :(
        socket.on('disconnect', function(){
            console.log('user disconnected : '+socket.request.user.username);
            io.emit('chatMessage', {
                type: 'status',
                text: 'disconnected',
                created: Date.now(),
                username: socket.request.user.username
            });
        });

        /**
         * room logic
         *
         * socket.on('join', function(roomData) {
         *  socket.join(roomData.roomName);
         * });
         *
         * socket.on('leave', function(roomData) {
         *  socket.leave(roomData.roomName);
         * });
         *
         * emit all in room
         *
         * io.in('roomName').emit('event', eventData);
         *
         * emit all in a room except the sender
         *
         * socket.broadcast.to('roomName').emit('event', eventData);
         *
         */
    });
}