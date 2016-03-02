// jscs
"use strict";
module.exports = {
	idiomatic: {
	    src: "<%= pkg.source %>" + "/javascript/**/*.js",
	    options: {
	        config: ".jscsrc",
	        reporter: "inline.js",
	        verbose: false,
	        fix: true,
	        reporterOutput: "jscs.log"
	    }
	}
};
