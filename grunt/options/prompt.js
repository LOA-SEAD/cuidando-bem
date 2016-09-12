// prompt
"use strict";
module.exports = function( grunt ) {

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
              default: false,
              when: function( answers ) {
                return answers.target === "dev" || answers.target === "prod";
              }
            }, {
              config: "distributions",
              type: "checkbox",
              message: "For which plataforms the game should be built?",
              choices: [
                {
                  name: "Web Browsers(zip) - Compress",
                  value: "web"
                }, {
                  name: "Android - Crosswalk",
                  value: "android"
                }, {
                  name: "Ios - Crosswalk (only works if you are on a mac)",
                  value: "ios"
                }, {
                  name: "Win 32 - Electron",
                  value: "win32"
                }, {
                  name: "Win 64 - Electron",
                  value: "win64"
                }, {
                  name: "Linux 32 - Electron",
                  value: "linux32"
                }, {
                  name: "Linux 64 - Electron",
                  value: "linux64"
                }, {
                  name: "Mac - Electron (only works if you are on a mac)",
                  value: "mac"
                }
              ],
              when: function( answers ) {
                return answers.target === "rel";
              }
            }, {
              config: "ghpages",
              type: "confirm",
              message: "Should use git to upload to test server?",
              default: false,
              when: function( answers ) {
                return answers.target === "rel";
              }
            }
          ],
          then: function( answers ) {
            if ( answers.ver ) {
              grunt.task.run([
                "version::" + answers.ver
              ]);
            }
            grunt.option( "target", "rel" );
            grunt.task.run([
              "build"
            ]);

            if ( answers.serve ) {
              grunt.task.run([
                "serve"
              ]);
            }

            if ( answers.ghpages ) {
              grunt.task.run([
                "gh-pages"
              ]);
            }

            if ( answers.distributions.length > 0 ) {
              console.log( answers.distributions );
              if ( answers.distributions.indexOf("web") > -1 ) {
                // Build for web
                grunt.task.run([ "compress" ]);
              }
              if ( answers.distributions.indexOf("android") > -1 ) {
                // Build for android using crosswalk
              }
              if ( answers.distributions.indexOf("ios") > -1 ) {
                // Build for ios using crosswalk
              }
              if ( answers.distributions.indexOf("win32") > -1 ) {
                // Build for win32 using electron
                grunt.task.run([ "electron:win32" ]);
              }
              if ( answers.distributions.indexOf("win64") > -1 ) {
                // Build for win64 using electron
                grunt.task.run([ "electron:win64" ]);
              }
              if ( answers.distributions.indexOf("linux32") > -1 ) {
                // Build for linux32 using electron
                grunt.task.run([ "electron:linux32" ]);
              }
              if ( answers.distributions.indexOf("linux64") > -1 ) {
                // Build for linux64 using electron
                grunt.task.run([ "electron:linux64" ]);
              }
              if ( answers.distributions.indexOf("mac") > -1 ) {
                // Build for mac using electron
                grunt.task.run([ "electron:mac" ]);
              }
            }
          }
      }
    }
  };
};
