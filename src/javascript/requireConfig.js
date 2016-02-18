/*
    This file configures all paths to modules used by the project

    @author Otho - Marcelo Lopes Lotufo
 */

//Configure all files paths aliases
require.config({
    baseUrl: "javascript/",
    paths: {
        //Libs
        jquery: "./libs/jquery",
        jqueryui: "./libs/jquery-ui",
        jquerymask: "./libs/jquery.mask",
        text: "./libs/text",
        SimpleStorage: "./libs/simpleStorage",

        //Engine
        Stage: "engine/core/stage",
        Player: "engine/core/player",
        ImageLoader: "engine/core/imageLoader",

        commandBar: "engine/modules/commandBar/commandBarController",
        Action: "engine/modules/commandBar/action",

        dialogModal: "engine/modules/dialog/dialogsController",
        Dialog: "engine/modules/dialog/dialog",

        endOfLevel: "engine/modules/endOfLevel/endOfLevelController",

        interactiveObjects: "engine/modules/interactiveObjects/interactiveObjectsController",
        InteractiveObject: "engine/modules/interactiveObjects/interactiveObject",

        modalScene: "engine/modules/scenes/modalSceneController",

        scene: "engine/modules/scenes/sceneController",
        Scene: "engine/modules/scenes/scene",

        //Game
        CuidandoBem: "game/modules/cuidandoBem",

        Storage: "game/modules/storage/storage",

        Flag: "game/modules/flag",
        Level: "game/modules/level",
        Character: "game/modules/character",
        Pulseira: "game/modules/pulseira/pulseiraModal",
        Prontuario: "game/modules/prontuario/prontuario",
        levelsData: "game/modules/levelsData",
        FreqRespiratoria: "game/modules/freqRespiratoria/freqRespiratoria",

        //Configs
        gameConfig: "game/scripts/gameConfig",
        stageConfig: "game/scripts/stageConfig",

        Commons: "game/scripts/Commons",

        //Refs
        Dialogs_data: "references/dialogData",
        Images_urls: "references/imagesUrls",
        Scores_data: "references/scoreData",
        Sounds_urls: "references/soundsUrls"
    }
});
