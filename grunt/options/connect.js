// connect
"use strict";
module.exports = {
    options: {
      hostname: "localhost",
      port: 8080
    },

    dev: {
        options: {
            livereload: true,
            port: "<%= pkg.port %>",
            base: "<%= pkg.development %>"
        }
    },

    prod: {
        options: {
            keepalive: true,
            port: "<%= pkg.port %>",
            base: "<%= pkg.production %>"
        }
    },

    docs: {
        options: {
            // keepalive: true,
            port: "<%= pkg.port %>",
            base: "<%= pkg.documentation %>"
        }
    }
};
