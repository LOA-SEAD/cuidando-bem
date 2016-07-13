// prompt
"use strict";
module.exports = function(grunt) {

  return {
    options: {},
    build: {
      options: {
          questions: [
            {
              config: "target",
              type: "list",
              message: "You want to build the game for...",
              default: "dev",
              choices: [
                {
                  name: "development - Code not minified, with console output",
                  value: "dev"
                }, {
                    name: "testing - Code not minified, without console outputs",
                    value: "prod"
                }, {
                    name: "release - Code minified, without console outputs",
                    value: "rel"
                }
              ]
            }, {
              config: "ver",
              type: "list",
              message: "Should game version be updated?",
              default: false,
              choices: [
                {
                  name: "No",
                  value: false
                }, {
                  name: "0.0.+1 - Patch",
                  value: "patch"
                }, {
                  name: "0.+1.0 - Minor",
                  value: "minor"
                }, {
                  name: "+1.0.0 - Major",
                  value: "major"
                }
              ]
            }, {
              config: "serve",
              type: "confirm",
              message: "Should start dev server?",
              default: true,
              when: function( answers ) {
                return answers.target === "dev" || answers.target === "prod";
              }
            }, {
              config: "distributions",
              type: "checkbox",
              message: "For which plataforms the game should be built?",
              choices: [
                {
                  name: "Web Browsers(zip) - Compress"
                }, {
                  name: "Android - Crosswalk"
                }, {
                  name: "Ios - Crosswalk"
                }, {
                  name: "win 32 - Electron"
                }, {
                  name: "Win 64 - Electron"
                }, {
                  name: "Linux 32 - Electron"
                }, {
                  name: "Linux 64 - Electron"
                }, {
                  name: "Mac - Electron"
                }
              ],
              when: function( answers ) {
                return answers.target === "rel";
              }
            }, {
              config: "gh-pages",
              type: "confirm",
              message: "Should use git to upload to test server?",
              default: true,
              when: function( answers ) {
                return answers.target === "rel";
              }
            }
          ],
          then: function(answers) {
            if ( answers.ver ) {
              grunt.task.run([
                "version::" + answers.ver
              ]);
            }

            grunt.task.run([
              "build"
            ]);

            if ( answers.serve ) {
              grunt.task.run([
                "serve"
              ]);
            }

            if ( answers.distributions ) {
              console.log( answers.distributions );
            }
          }
      }
    }
  }
};
