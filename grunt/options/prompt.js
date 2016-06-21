// prompt
"use strict";
module.exports = {
    options: {
    },
    build: {
      options: {
        questions: [
          {
            config: 'target',
            type: 'list',
            message: 'You want to build the game for...',
            default: 'prod',
            choices: [
              {name:"development", value: "dev"},
              {name:"testing", value: "prod"},
              {name:"release", value: "rel"}
            ]
          }
        ]
      }
    }
};
