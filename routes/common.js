var winston = require("winston");

function ensureAuthenticated(request, response, next) {
    // this function is added by passport
    if (request.isAuthenticated()) {
        next();
    } else {
        winston.warn("request is not authenticated, redirecting to login");
        response.redirect("/login");
    }
}

exports.ensureAuthenticated = ensureAuthenticated;