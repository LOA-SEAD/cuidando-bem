/*
This file is part of Cuidando Bem.

    Cuidando Bem is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cuidando Bem is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 This file configures all paths to modules used by the project

 @author Otho - Marcelo Lopes Lotufo
 */

// Configure all files paths aliases
require.config({
    baseUrl: "javascript/",
    paths: {
        // Libs
        jquery: "./libs/jquery",
        jqueryui: "./libs/jquery-ui",
        jquerymask: "./libs/jquery.mask",
        text: "./libs/text",
        SimpleStorage: "./libs/simpleStorage",

        // Engine
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

        // Game
        CuidandoBem: "game/modules/cuidandoBem",

        Storage: "game/modules/storage/storage",

        Flag: "game/modules/flag",
        Level: "game/modules/level",
        Character: "game/modules/character",
        Pulseira: "game/modules/pulseira/pulseiraModal",
        Prontuario: "game/modules/prontuario/prontuario",
        levelsData: "game/modules/levelsData",
        FreqRespiratoria: "game/modules/freqRespiratoria/freqRespiratoria",

        // Configs
        gameConfig: "game/scripts/gameConfig",
        stageConfig: "game/scripts/stageConfig",

        Commons: "game/scripts/commons",

        // Refs
        DialogsData: "references/dialogData",
        ImagesUrls: "references/imagesUrls",
        ScoresData: "references/scoreData",
        SoundsUrls: "references/soundsUrls"
    }
});
