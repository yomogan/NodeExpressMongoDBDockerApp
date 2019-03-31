'use strict';
var mongoose = require('mongoose');

var database = function () {
    var conn = null,

        init = function (config) {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            var options = {
                useMongoClient: true,
                promiseLibrary: global.Promise
            };

            setTimeout(function(){
                var connString = `mongodb://${config.host}:27017/${config.database}`;
                mongoose.connect(connString, options);
                conn = mongoose.connection;
                conn.on('error', console.error.bind(console, 'connection error:'));
                conn.once('open', function() {
                    console.log('db connection open');
                });
            }, 2000);
            
            return conn;
        },

        close = function() {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;
