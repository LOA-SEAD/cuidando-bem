/*
    This file configures all paths to modules used by the project

    @author Otho - Marcelo Lopes Lotufo
 */

//Configure all files paths aliases
require.config({
    baseUrl: 'javascript/',
    paths: {
        //Libs
        jquery: './libs/jquery',
        jqueryui: './libs/jquery-ui',
        jquerymask: './libs/jquery.mask',
        text: './libs/text',
        SimpleStorage: './libs/simpleStorage',

        //Engine
        Stage: 'engine/core/Stage',
        Player: 'engine/core/Player',
        ImageLoader: 'engine/core/ImageLoader',

        commandBar: 'engine/modules/command_bar/CommandBarController',
        Action: 'engine/modules/command_bar/Action',

        dialogModal: 'engine/modules/dialog/DialogsController',
        Dialog: 'engine/modules/dialog/Dialog',

        endOfLevel: 'engine/modules/end_of_level/EndOfLevelController',

        interactiveObjects: "engine/modules/interactive_objects/InteractiveObjectsController",
        InteractiveObject: 'engine/modules/interactive_objects/InteractiveObject',

        modalScene: "engine/modules/scenes/ModalSceneController",

        scene: 'engine/modules/scenes/SceneController',
        Scene: 'engine/modules/scenes/Scene',

        //Game
        CuidandoBem: 'game/modules/CuidandoBem',

        Storage: 'game/modules/storage/Storage',

        Flag: 'game/modules/Flag',
        Level: 'game/modules/Level',
        Character: 'game/modules/Character',
        Pulseira: 'game/modules/pulseira/Pulseira_Modal',
        Prontuario: 'game/modules/prontuario/Prontuario',
        levelsData: 'game/modules/levelsData',
        FreqRespiratoria: 'game/modules/freqRespiratoria/freqRespiratoria',

        //Configs
        gameConfig: 'game/scripts/gameConfig',
        stageConfig: 'game/scripts/stageConfig',

        Commons: 'game/scripts/Commons',

        //Refs
        Dialogs_data: 'references/Dialog_data',
        Images_urls: 'references/Images_urls',
        Scores_data: 'references/Score_data',
        Sounds_urls: 'references/Sounds_urls'
    }
});
