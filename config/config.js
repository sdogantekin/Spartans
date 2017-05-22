var config = {};

config.env = "DEV";

if (config.env == "DEV") {
    config.mongo     = {};
    config.mongo.url = "mongodb://spartans:gulsahs123@ds149481.mlab.com:49481/spartans";

    config.log       = {};
    config.log.level = "debug";

    config.mongoose       = {};
    config.mongoose.debug = true;
}

module.exports = config;