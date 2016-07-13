// connect
"use strict";
module.exports = {
    options: {

    },

    publish: {
        options: {
            name: "Cuidando Bem-<%= pkg.version %>",
            dir: "prod",
            out: "dist",
            platform: "all",
            arch: "all"
        }
    }
};
