/*
 This file is required by require.js to work properly. It configures all file paths so it is easier
 to import them inside each module.

 @author Otho - Marcelo Lopes Lotufo
 */

//Configure all files paths, so inside each module the files address are shorter
require.config({
    baseUrl: 'javascript/',
    paths: {
        Player: 'engine/core/Player',
        ImageLoader: 'engine/core/ImageLoader',
        //Libs
        jquery: '../../libs/jquery/dist/jquery.min',
        jqueryui: '../../libs/jquery-ui/jquery-ui.min',
        text: '../../libs/requirejs-text/text',
        less: '../../libs/less/dist/less.min',
        SimpleStorage: '../../libs/simpleStorage/simpleStorage',


        //Refs
        Dialogs: 'references/Dialog_texts',
        Images: 'references/Images',
        Sounds: 'references/Sounds',
        HTML: 'references/HTML',
        //Configs
        gameConfig: 'game/scripts/gameConfig',
        stageConfig: 'game/scripts/stageConfig',

        Commons: 'game/scripts/Commons',

        Scene: 'engine/modules/scenes/Scene',
        Flag: 'game/modules/Flag',
        Action: 'engine/modules/command_bar/Action',
        Level: 'game/modules/Level',
        Character: 'game/modules/Character',
        Dialog: 'engine/modules/dialogs/Dialog',
        InteractiveObject: 'engine/modules/interactive_objects/InteractiveObject',
        Pulseira: 'game/modules/pulseira/Pulseira_Modal',

        levelsData: 'game/modules/levelsData',
        SaveLoadGame: 'game/modules/save/SaveLoadGame',

        Stage: 'engine/core/Stage',
        CuidandoBem: 'game/modules/CuidandoBem',

        commandBar: 'engine/modules/command_bar/CommandBarController',
        dialogModal: 'engine/modules/dialogs/DialogsController',
        endOfLevel: 'engine/modules/end_of_level/EndOfLevelController',
        interactiveObjects: "engine/modules/interactive_objects/InteractiveObjectsController",
        modalScene: "engine/modules/scenes/ModalSceneController",
        scene: 'engine/modules/scenes/SceneController'
    }
});
require(['Dialogs', 'Images', 'Sounds', 'HTML'], function (){
    //Init the app when everything is ready
    require(['SaveLoadGame'], function(){
        require(['Player', 'ImageLoader']);
    });

    window.init = function(){
        require(["jquery", "less"], function () {
            console.group("Cuidando Bem Log:");
            require(['jqueryui', "main"]);
        });
    };
});




