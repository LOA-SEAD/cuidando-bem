// connect
"use strict";
module.exports = {
    options: {
      icon: "<%= pkg.source %>/images/misc/icon_128.png"
    },

    publish: {
      options: {
        name: "Cuidando Bem-<%= pkg.version %>",
        dir: "prod",
        out: "dist",
        platform: "all",
        arch: "all",
        icon: "<%= pkg.source %>/images/misc/icon_128.png"
      }
    },

    win32: {
      options: {
        name:"<%= pkg.name %>-<%= pkg.version %>",
        dir: "<%= pkg.production %>",
        out: "<%= pkg.releases %>",
        platform: "win32",
        arch: "ia32",
        icon: "<%= pkg.source %>/images/misc/favicon.ico"
      }
    },
    win64: {
      options: {
        name:"<%= pkg.name %>-<%= pkg.version %>",
        dir: "<%= pkg.production %>",
        out: "<%= pkg.releases %>",
        platform: "win32",
        arch: "x64",
        icon: "<%= pkg.source %>/images/misc/favicon.ico"
      }
    },
    linux32: {
      options: {
        name:"<%= pkg.name %>-<%= pkg.version %>",
        dir: "<%= pkg.production %>",
        out: "<%= pkg.releases %>",
        platform: "linux",
        arch: "ia32",
        icon: "<%= pkg.source %>/images/misc/icon_128.png"
      }
    },
    linux64: {
      options: {
        name:"<%= pkg.name %>-<%= pkg.version %>",
        dir: "<%= pkg.production %>",
        out: "<%= pkg.releases %>",
        platform: "linux",
        arch: "x64",
        icon: "<%= pkg.source %>/images/misc/icon_128.png"
      }
    },
    mac: {
      options: {
        name:"<%= pkg.name %>-<%= pkg.version %>",
        dir: "<%= pkg.production %>",
        out: "<%= pkg.releases %>",
        platform: "darwin",
        arch: "all",
        icon: "<%= pkg.source %>/images/misc/icon_128.png"
      }
    }
};
