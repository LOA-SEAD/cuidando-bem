/*
 This file is required by require.js to work properly. It configures all file paths so it is easier
 to import them inside each module.

 */

//Configure all files paths, so inside each module the files address are shorter
require.config({
    baseUrl: 'scripts/',
    paths: {
        //Libs
        jquery: '../../libs/jquery/dist/jquery-min',
        text: '../../libs/requirejs-text/text',
        less: '../../libs/less/dist/less.min.js',

        //Refs
        Errors: 'references/Errors',
        Dialogs: 'references/Dialogs',
        //Configs
        gameConfig: 'controller/gameConfig',
        Commons: 'controller/gameConfig/Commons.js',
        stageConfig: 'stageConfig/stageConfig',

        //Models
        Scene: 'model/classes/class_scene',
        Flag: 'model/classes/class_flag',
        Action: 'model/classes/class_action',
        Level: 'model/classes/class_level',
        Dialog: 'model/classes/class_dialog',
        InteractiveObject: 'model/classes/class_interactiveObject',

        levelsData: 'model/levelsData',

        //Controller
        levelsData_interface: 'controller/levelsData_interface',

        stage: 'controller/stage',
        core: 'controller/core',

        commandBar: 'controller/coreControllers/commandBar_game_controller',
        dialogModal: 'controller/coreControllers/dialogModal_game_controller',
        endOfLevel: 'controller/coreControllers/endOfLevel_game_controller',
        interactiveObjects: "controller/coreControllers/interactiveObjects_game_controller",
        modalScene: "controller/coreControllers/modalScene_game_controller",
        scene: 'controller/coreControllers/scene_game_controller'


    }
});
//Init the app when everything is ready
require(['Errors', 'Dialogs']);

require(["jquery", "less"], function () {
    console.group(" 'Cuidando Bem' Log:");
    require(["main"]);
});





