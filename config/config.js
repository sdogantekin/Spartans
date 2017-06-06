var config = {};

config.env = "DEV";

if (config.env == "DEV") {
    config.mongo     = {};
    config.mongo.url = "mongodb://spartans:serkan123@ds151279.mlab.com:51279/spartans";

    config.log       = {};
    config.log.level = "debug";

    config.mongoose       = {};
    config.mongoose.debug = true;

    config.sessionSecret = "Serkan123";

    config.aws                  = {};
    config.aws.accessKeyId      = "XXXXX";
    config.aws.secretAccessKey  = "YYYYY";
    config.aws.region           = "eu-west-2";

    config.redis      = {};
    config.redis.host = "127.0.0.1";
    config.redis.port = 6379;
}

module.exports = config;