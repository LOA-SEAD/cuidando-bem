console.log("This is the start point of the app: 'Cuidando Bem'.\nIf this is being displayed on a publish version, please report to us.")

/*
    This file is required by require.js to work properly. It configures all file paths so it is easier
to import them inside each module.

*/

//Configure all files paths, so inside each module the files address are shorter
require.config({
    baseUrl: 'scripts/',
    paths: {        
        jquery: 'libs/jquery-min',
        text: 'libs/text',   

        gameConfig: 'config/gameConfig',
        stageConfig: 'config/stageConfig',

        stateMachine: 'model/stateMachine',
        Scene: 'model/class_scene',

        stage: 'controller/stage',

        core: 'controller/core',
       
        
    }
});
//Init the app when everything is ready

require(["jquery", "libs/less"]);

require(["main"]);




