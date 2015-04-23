/*
 This file is required by require.js to work properly. It configures all file paths so it is easier
 to import them inside each module.

 @author Otho - Marcelo Lopes Lotufo
 */

//Configure all files paths aliases
require.config({
    baseUrl: 'javascript/',
    paths: {
        //Libs
        jquery: '../../libs/jquery/dist/jquery.min',
        jqueryui: '../../libs/jquery-ui/jquery-ui.min',
        text: '../../libs/requirejs-text/text',
        less: '../../libs/less/dist/less.min',
        SimpleStorage: '../../libs/simpleStorage/simpleStorage',

        //Engine
        Stage: 'engine/core/Stage',
        Player: 'engine/core/Player',
        ImageLoader: 'engine/core/ImageLoader',

        commandBar: 'engine/modules/command_bar/CommandBarController',
        Action: 'engine/modules/command_bar/Action',

        dialogModal: 'engine/modules/dialogs/DialogsController',
        Dialog: 'engine/modules/dialogs/Dialog',

        endOfLevel: 'engine/modules/end_of_level/EndOfLevelController',

        interactiveObjects: "engine/modules/interactive_objects/InteractiveObjectsController",
        InteractiveObject: 'engine/modules/interactive_objects/InteractiveObject',

        modalScene: "engine/modules/scenes/ModalSceneController",

        scene: 'engine/modules/scenes/SceneController',
        Scene: 'engine/modules/scenes/Scene',

        //Game
        CuidandoBem: 'game/modules/CuidandoBem',

        SaveLoadGame: 'game/modules/save/SaveLoadGame',

        Flag: 'game/modules/Flag',
        Level: 'game/modules/Level',
        Character: 'game/modules/Character',
        Pulseira: 'game/modules/pulseira/Pulseira_Modal',
        Prontuario: 'game/modules/prontuario/Prontuario',
        levelsData: 'game/modules/levelsData',

        //Configs
        gameConfig: 'game/scripts/gameConfig',
        stageConfig: 'game/scripts/stageConfig',

        Commons: 'game/scripts/Commons',

        //Refs
        Dialogs: 'references/Dialog_texts',
        Images: 'references/Images',
        Sounds: 'references/Sounds'
    }
});
require(['Dialogs', 'Images', 'Sounds'], function (){
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




