/*
 This file is required by require.js to work properly. It configures all file paths so it is easier
 to import them inside each module.

 */

//Configure all files paths, so inside each module the files address are shorter
require.config({
    baseUrl: 'javascript/',
    paths: {
        //Libs
        jquery: '../../libs/jquery/dist/jquery.min',
        text: '../../libs/requirejs-text/text',
        less: '../../libs/less/dist/less.min',

        //Refs
        Errors: 'references/Errors',
        Dialogs: 'references/Dialogs',
        //Configs
        gameConfig: 'game/scripts/gameConfig',
        stageConfig: 'game/scripts/stageConfig',

        Commons: 'game/scripts/Commons',

        //Models
        Scene: 'engine/modules/scenes/Scene',
        Flag: 'game/modules/Flag',
        Action: 'engine/modules/actions_bar/Action',
        Level: 'game/modules/Level',
        Dialog: 'engine/modules/dialogs/Dialog',
        InteractiveObject: 'engine/modules/interactive_objects/InteractiveObject',

        levelsData: 'game/modules/levelsData',

        stage: 'engine/core/stage',
        CuidandoBem: 'game/modules/CuidandoBem',

        commandBar: 'engine/modules/command_bar/CommandBarController',
        dialogModal: 'engine/modules/dialogs/DialogsController',
        endOfLevel: 'engine/modules/end_of_level/EndOfLevelController',
        interactiveObjects: "engine/modules/interactive_objects/InteractiveObjectsController",
        modalScene: "engine/modules/scenes/ModalSceneController",
        scene: 'engine/modules/scenes/SceneController'
    }
});
//Init the app when everything is ready
require(['Errors', 'Dialogs']);

require(["jquery", "less"], function () {
    console.group(" 'Cuidando Bem' Log:");
    require(["main"]);
});





