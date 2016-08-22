// jscs
"use strict";
module.exports = {
	idiomatic: {
	    src: "<%= pkg.source %>" + "/javascript/**/*.js",
	    options: {
	        config: ".jscsrc",
	        reporter: "inline.js",
	        fix: true,
	        reporterOutput: "jscs.log"
	    }
	}
};
