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
/**
 * This module is the core module for the game CuidandoBem. It's intention is to provide methods
 * that communicate between all the other modules used in game
 *
 * @name CuidandoBem
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([
        "Stage",
        "levelsData",
        "commandBar",
        "dialogModal",
        "interactiveObjects",
        "modalInteractiveObjects",
        "modalScene",
        "scene",
        "endOfLevel",
        "Prontuario",
        "Pulseira",
        "FreqRespiratoria",
        "EquipoGotejamento",
        "Ficha"
    ],
    function(
        Stage,
        game,
        CommandBar,
        Dialog,
        InteractiveObject,
        ModalInteractiveObject,
        ModalScene,
        SceneController,
        endOfLevel,
        prontuario,
        Pulseira,
        freqRespiratoria,
        EquipoGotejamento,
        Ficha
    ) {

// Attributes
        var Storage = require("Storage");
        var gameStageSelector = "#gameStage";

        var Level;
        var Scene;
        var Actions;
        var InteractiveObjects;
        var Dialogs;
        var Flags;
        var curScene;

        var scoreList;

        var Player = require("Player");

        function ScoreItem( _title, _score ) {
            this.title = _title;
            this.score = _score;
        }


// Methods
        function init() {

            SceneController.init( gameStageSelector );

            InteractiveObject.init( gameStageSelector );
            ModalScene.init( gameStageSelector );
            ModalInteractiveObject.init( gameStageSelector );

            endOfLevel.init( gameStageSelector );
            prontuario.init( gameStageSelector );
            Pulseira.init( gameStageSelector );
            freqRespiratoria.init( gameStageSelector );
            EquipoGotejamento.init( gameStageSelector );
            Ficha.init( gameStageSelector );

            Dialog.init( gameStageSelector );

            CommandBar.init( gameStageSelector );

            changeLevel( game.getCurrentLevel() );
            startLevel();
        }

        /**
         * Description
         * @method start
         * @param {} _gameState
         * @memberOf module:CuidandoBem
         */
        function start( _level ) {
            console.group("Game Running:");

            changeLevelTo( _level );
        }

        function restartLevel() {
            console.info("Restarting current level");

            closeEndOfLevel();
            changeLevel( game.getCurrentLevel() );
            startLevel();
        }

        // Level
        /**
         * Description
         * @method getCurrentLevel
         * @return Level
         * @memberOf module:CuidandoBem
         */
        function getCurrentLevel() {
            return Level;
        }

        /**
         * Description
         * @method changeLevel
         * @param {} _newLevel
         * @memberOf module:CuidandoBem
         */
        function changeLevel( _newLevel ) {
            console.group("Clone Level");
            Level = _newLevel.getClone();
            // Ensure that the bracelet form is empty
            Pulseira.resetData();
            Level.setup();
            Dialog.close();

            console.groupEnd();

            curScene = Level.getCurrentSceneId();
        }

        function changeLevelTo( _levelId ) {
            game.setCurrentLevel( _levelId );
            changeLevel( game.getCurrentLevel() );

            startLevel();
        }

        /**
         * Description
         * @method startLevel
         * @memberOf module:CuidandoBem
         */
        function startLevel() {
            console.group("Starting level:" + Level.getName(), true );

            Level.setCurrentSceneById( curScene );
            Scene = Level.getCurrentScene();

            Actions = Level.getActions( curScene );
            Dialogs = Level.getDialogs( curScene );
            InteractiveObjects = Level.getInteractiveObjects( curScene );

            Flags = Level.getFlags();
            scoreList = [];

            SceneController.setScene( Scene );
            CommandBar.changeToActionsButtons( Actions );
            InteractiveObject.changeToInteractiveObjects( InteractiveObjects );

            endOfLevel.close();
            prontuario.close();
            Pulseira.close();
            freqRespiratoria.close();
            EquipoGotejamento.close();
            Ficha.close();
            Dialog.close();
            CommandBar.hide();

            Scene.load();
            console.groupEnd();
        }

        // Scene
        /**
         * Description
         * @method changeScene
         * @param {} _newSceneId
         * @memberOf module:CuidandoBem
         */
        function changeScene( _newSceneId ) {


            var oldScene = Scene;
            Level.setCurrentSceneById( _newSceneId );
            Scene = Level.getCurrentScene();

            console.group("Change Scene to: " + Scene.getName(), true );

            curScene = _newSceneId;
            Actions = Level.getActions( curScene );
            Dialogs = Level.getDialogs( curScene );
            InteractiveObjects = Level.getInteractiveObjects( curScene );

            Flags = Level.getFlags();

            oldScene.unload();
            SceneController.changeScene( Scene );

            CommandBar.changeToActionsButtons( Actions );
            InteractiveObject.changeToInteractiveObjects( InteractiveObjects );

            Scene.load();

            console.groupEnd();
        }

        // ModalScene
        /**
         * Description
         * @method openModalScene
         * @param {} _modalSceneId
         * @memberOf module:CuidandoBem
         */
        function openModalScene( _modalSceneId ) {
            var modalScene = Level.getModalScene( _modalSceneId );
            Scene = modalScene;

            ModalScene.open( modalScene );
            ModalInteractiveObject.open();
            CommandBar.changeToActionsButtons( modalScene.getActions() );
            InteractiveObject.disableAllInteractiveObjects( InteractiveObjects );
            ModalInteractiveObject.changeToInteractiveObjects( modalScene.getInteractiveObjects() );
        }

        /**
         * Description
         * @method closeModalScene
         * @memberOf module:CuidandoBem
         */
        function closeModalScene() {
            ModalScene.close();
            ModalInteractiveObject.close();

            CommandBar.changeToActionsButtons( Actions );
            ModalInteractiveObject.removeAllInteractiveObjects();
            InteractiveObject.updateAllInteractiveObjects( InteractiveObjects );
            Scene = Level.getCurrentScene();
        }


        // CommandBar
        function openCommandBar() {
            CommandBar.show();
        }

        function closeCommandBar() {
            CommandBar.hide();
        }

        // Dialog
        /**
         * Description
         * @method openDialog
         * @param {} _dialogId
         * @memberOf module:CuidandoBem
         */
        function openDialog( _dialogId ) {
            var dialog = Dialogs[ _dialogId ];
            Dialog.show( dialog );

            Player.play( Player.audios.sfx.avancarMensagens );
            disableAllActionButtons();
            disableAllInteractiveObjects();
            closeCommandBar();
        }

        /**
         * Description
         * @method closeDialog
         * @memberOf module:CuidandoBem
         */
        function closeDialog() {
            Dialog.close();

            Player.play( Player.audios.sfx.avancarMensagens );
            updateAllActionButtons();
            updateAllInteractiveObjects();
            openCommandBar();
        }

        // End Level
        /**
         * Description
         * @method openEndLevel
         * @memberOf module:CuidandoBem
         */
        function showEndOfLevel() {
            // debugger;
            endOfLevel.show( scoreList, Level.getMaxPoints() );
        }

        /**
         * Description
         * @method closeEndLevel
         * @memberOf module:CuidandoBem
         */
        function closeEndOfLevel() {
            endOfLevel.close();
        }

        /**
         * Description
         * @method deactivateAllActionButtons
         * @memberOf module:CuidandoBem
         */
        function disableAllActionButtons() {
            CommandBar.disableAllActionButtons( Actions );
        }

        /**
         * Description
         * @method deactivateAllInteractiveObjects
         *
         * @memberof module:CuidandoBem
         */
        function disableAllInteractiveObjects() {
            InteractiveObject.disableAllInteractiveObjects( InteractiveObjects );
        }

        /**
         * Description
         * @method updateAllInteractiveObjects
         *
         * @memberof module:CuidandoBem
         */
        function updateAllInteractiveObjects() {
            InteractiveObject.updateAllInteractiveObjects( InteractiveObjects );
        }

        /**
         * Description
         * @method updateAllActionButtons
         * @memberOf module:CuidandoBem
         */
        function updateAllActionButtons() {
            CommandBar.updateAllActionButtons( Actions );
        }

        /**
         * Description
         * @method disableActionButton
         * @param {} _actionId
         * @memberOf module:CuidandoBem
         */
        function disableActionButton( _actionId ) {
            var action = Scene.getAction( _actionId );
            action.setEnable( false );
            CommandBar.disableActionButton( action );
        }

        /**
         * Description
         * @method enableActionButton
         * @param {} _actionId
         * @memberOf module:CuidandoBem
         */
        function enableActionButton( _actionId ) {
            var action = Scene.getAction( _actionId );
            action.setEnable( true );
            CommandBar.enableActionButton( action );
        }

        function disableInteractiveObject( _ioId ) {
            var io = Scene.getInteractiveObject( _ioId );
            io.setEnable( false );
            InteractiveObject.disableInteractiveObject( io );
        }

        /**
         * Description
         * @method enableActionButton
         * @param {} _actionId
         * @memberOf module:CuidandoBem
         */
        function enableInteractiveObject( _ioId ) {
            var io = Scene.getInteractiveObject( _ioId );
            io.setEnable( true );
            InteractiveObject.enableInteractiveObject( io );
        }

// Getters

        /**
         * Description
         * @method getFlag
         * @param {} _flagId
         * @return CallExpression
         * @memberOf module:CuidandoBem
         */
        function getFlag( _flagId ) {
            return Level.getFlag( _flagId );
        }

        function flag( _flagId, _value ) {

            if ( typeof _value !== "undefined" ) {
                Level.getFlag( _flagId ).setValue( _value );
            } else {
                return Level.getFlag( _flagId ).getValue();
            }
        }

// Setters

        /**
         * Description
         * @method setFlag
         * @param {} _flagId
         * @param {} _value
         * @memberOf module:CuidandoBem
         */
        function setFlag( _flagId, _value ) {
            Level.setFlag( _flagId, _value );
        }

        /**
         * Description
         * @method setActionEnable
         * @param {} _actionId
         * @param {} _value
         * @memberOf module:CuidandoBem
         */
        function setActionEnable( _actionId, _value ) {
            var action = Scene.getAction( _actionId );
            if ( typeof _value !== "undefined" ) {
                enableActionButton( action );
            } else {
                disableActionButton( action );
            }
        }

        /**
         * Description
         * @method setActionVisible
         * @param {} _actionId
         * @param {} _value
         * @memberOf module:CuidandoBem
         */
        function setActionVisible( _actionId, _value ) {
            var action = Scene.getAction( _actionId );
            action.setVisibility( _value );
            CommandBar.setActionVisible( action, _value );
        }

        /**
         * Description
         * @method toggleActionVisible
         * @param {} _actionId
         * @memberOf module:CuidandoBem
         */
        function toggleActionVisible( _actionId ) {
            var action = Scene.getAction( _actionId );
            if ( action.isVisible() ) {
                action.setVisibility( false );
            } else {
                action.setVisibility( true );
            }

            CommandBar.setActionVisible( action, action.isVisible() );
        }

        /**
         * Description
         * @method setInteractiveObjectVisible
         * @param {} _interactiveObjectId
         * @param {} _value
         * @memberOf module:CuidandoBem
         */
        function setInteractiveObjectVisible( _interactiveObjectId, _value ) {
            var interactiveObject = Scene.getInteractiveObject( _interactiveObjectId );
            interactiveObject.setVisibility( _value );
            InteractiveObject.setInteractiveObjectVisible( interactiveObject, _value );
        }

        /**
         * Description
         * @method toggleInteractiveObjectVisible
         * @param {} _interactiveObjectId
         * @memberOf module:CuidandoBem
         */
        function toggleInteractiveObjectVisible( _interactiveObjectId ) {
            var interactiveObject = Scene.getInteractiveObject( _interactiveObjectId );
            if ( interactiveObject.isVisible() ) {
                interactiveObject.setVisibility( false );
            } else {
                interactiveObject.setVisibility( true );
            }

            InteractiveObject.setInteractiveObjectVisible( interactiveObject, interactiveObject.isVisible() );
        }

        function registerScoreItem( score ) {
            scoreList.push( score );
            Storage.addScore( game.getCurrentLevelId(), score );
        }

        function goBackToMenu() {
            Stage.changeScreen( 6 );
        }

        function changeSceneCssClassTo( _cssClass ) {
            var oldSelector = "." + Scene.getCssClass();
            var selector = "." + _cssClass;
            $( oldSelector ).addClass( _cssClass );
            $( selector ).removeClass( Scene.getCssClass() );

            Scene.setCssClass( _cssClass );
        }

        function unlockLevel( _levelId ) {
            Storage.unlockLevel( _levelId );
        }


// Public Interface
        var ret = {
            init: init,

            start: start,
            restartLevel: restartLevel,
            changeScene: changeScene,
            changeLevelTo: changeLevelTo,
            openDialog: openDialog,
            closeDialog: closeDialog,
            openModalScene: openModalScene,
            closeModalScene: closeModalScene,
            showEndOfLevel: showEndOfLevel,
            closeEndOfLevel: closeEndOfLevel,
            openCommandBar: openCommandBar,
            closeCommandBar: closeCommandBar,
            unlockLevel: unlockLevel,

            enableActionButton: enableActionButton,
            disableActionButton: disableActionButton,

            enableInteractiveObject: enableInteractiveObject,
            disableInteractiveObject: disableInteractiveObject,

            setActionEnable: setActionEnable,

            getCurrentLevel: getCurrentLevel,
            getFlag: getFlag,

            setFlag: setFlag,
            flag: flag,

            setActionVisible: setActionVisible,
            toggleActionVisible: toggleActionVisible,

            setInteractiveObjectVisible: setInteractiveObjectVisible,
            toggleInteractiveObjectVisible: toggleInteractiveObjectVisible,

            registerScoreItem: registerScoreItem,

            disableAllActionButtons: disableAllActionButtons,
            updateAllActionButtons: updateAllActionButtons,

            disableAllInteractiveObjects: disableAllInteractiveObjects,
            updateAllInteractiveObjects: updateAllInteractiveObjects,

            goBackToMenu: goBackToMenu,

            changeSceneCssClassTo: changeSceneCssClassTo
        };


        // @dev {
        window.gameShark = {
            Stage: Stage,
            game: game,
            CommandBar: CommandBar,
            Dialog: Dialog,
            InteractiveObject: InteractiveObject,
            ModalScene: ModalScene,
            SceneController: SceneController,
            endOfLevel: endOfLevel,
            Player: require("Player"),
            core: ret
        };
        // }

        return ret;
    });
