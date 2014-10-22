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
        logger: 'libs/Logger',

        gameConfig: 'config/gameConfig',
        stageConfig: 'config/stageConfig',

        Scene: 'model/classes/class_scene',
        Flag: 'model/classes/class_flag',
        Action: 'model/classes/class_action',
        Level: 'model/classes/class_level',
        Dialog: 'model/classes/class_dialog',
        InteractiveObject: 'model/classes/class_interactiveObject',
        
        levelsData: 'model/levelsData',

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

require(["logger", "jquery", "libs/less"], function(){
    L.group(" 'Cuidando Bem' Log:");
    require(["main"]);
});





