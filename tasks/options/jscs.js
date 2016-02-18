// jscs
"use strict";
module.exports = {
	idiomatic: {
	    src: "<%= pkg.source %>" + "/javascript/**/*.js",
	    options: {
	        config: ".jscsrc",
	        reporter: "text.js",
	        verbose: true,
	        fix: true,
	        reporterOutput: "jscs.log"
	    }
	}
};
