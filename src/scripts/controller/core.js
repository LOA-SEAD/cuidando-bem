/**
 *
 * @name Core_Controller
 * @module
 */
define(['levelsData', 'commandBar', 'dialogModal', 'interactiveObjects', 'modalScene', 'scene'], function (game, CommandBar, Dialog, InteractiveObject, ModalScene, Scene_con) {

//Attributes

    var Level;
    var Scene;
    var Actions;
    var InteractiveObjects;
    var Dialogs;
    var Flags;
    var cur_scene;

//Methods
    /**
     * Description
     * @method start
     * @param {} _gameState
     * @memberOf module:Core_Controller
     */
    function start(_gameState) {
        L.group("Game Running:");

        changeLevel(game.getCurrentLevel());
        startLevel();
    }

    //Level
    /**
     * Description
     * @method getCurrentLevel
     * @return Level
     * @memberOf module:Core_Controller
     */
    function getCurrentLevel() {
        return Level;
    }

    /**
     * Description
     * @method changeLevel
     * @param {} _newLevel
     * @memberOf module:Core_Controller
     */
    function changeLevel(_newLevel) {
        Level = $.extend(true, {}, _newLevel);

        cur_scene = Level.getCurrentSceneId();
    }

    /**
     * Description
     * @method startLevel
     * @memberOf module:Core_Controller
     */
    function startLevel() {
        L.group('Starting level:' + Level.getName(), true);

        Level.setCurrentSceneById(cur_scene);
        Scene = Level.getCurrentScene();

        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        Scene_con.setScene(Scene);
        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        Scene.load();
        L.groupEnd();
    }

    //Scene
    /**
     * Description
     * @method changeScene
     * @param {} _newSceneId
     * @memberOf module:Core_Controller
     */
    function changeScene(_newSceneId) {


        var oldScene = Scene;
        Level.setCurrentSceneById(_newSceneId);
        Scene = Level.getCurrentScene();

        L.group("Change Scene to: " + Scene.getName(), true);

        cur_scene = _newSceneId;
        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        oldScene.unload();
        Scene_con.changeScene(Scene);
        Scene.load();

        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        L.groupEnd();
    }

    //ModalScene
    /**
     * Description
     * @method openModalScene
     * @param {} _modalSceneId
     * @memberOf module:Core_Controller
     */
    function openModalScene(_modalSceneId) {
        var modalScene = Level.getModalScene(_modalSceneId);
        Scene = modalScene;

        ModalScene.open(modalScene);
        CommandBar.changeToActionsButtons(modalScene.getActions());
        InteractiveObject.changeToInteractiveObjects(modalScene.getInteractiveObjects());
    }

    /**
     * Description
     * @method closeModalScene
     * @memberOf module:Core_Controller
     */
    function closeModalScene() {
        ModalScene.close();

        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);
        Scene = Level.getCurrentScene();
    }

    //Dialog
    /**
     * Description
     * @method openDialog
     * @param {} _dialogId
     * @memberOf module:Core_Controller
     */
    function openDialog(_dialogId) {
        var dialog = Dialogs[_dialogId];
        Dialog.show(dialog);

        deactivateAllActionButtons(Actions);
    }

    /**
     * Description
     * @method closeDialog
     * @memberOf module:Core_Controller
     */
    function closeDialog() {
        Dialog.close();

        updateAllActionButtons();
    }

    //End Level
    /**
     * Description
     * @method openEndLevel
     * @memberOf module:Core_Controller
     */
    function openEndLevel() {

    }

    /**
     * Description
     * @method closeEndLevel
     * @memberOf module:Core_Controller
     */
    function closeEndLevel() {

    }

    /**
     * Description
     * @method deactivateAllActionButtons
     * @memberOf module:Core_Controller
     */
    function deactivateAllActionButtons() {
        CommandBar.deactivateAllActionButtons(Actions);
    }

    /**
     * Description
     * @method updateAllActionButtons
     * @memberOf module:Core_Controller
     */
    function updateAllActionButtons() {
        CommandBar.updateAllActionButtons(Actions);
    }

    /**
     * Description
     * @method disableActionButton
     * @param {} _actionId
     * @memberOf module:Core_Controller
     */
    function disableActionButton(_actionId) {
        var action = Scene.getAction(_actionId);
        action.setEnable(false);
        CommandBar.deactivateActionButton(action, _value);
    }

    /**
     * Description
     * @method enableActionButton
     * @param {} _actionId
     * @memberOf module:Core_Controller
     */
    function enableActionButton(_actionId) {
        var action = Scene.getAction(_actionId);
        action.setEnable(true);
        CommandBar.activateActionButton(action);
    }

//Getters

    /**
     * Description
     * @method getFlag
     * @param {} _flagId
     * @return CallExpression
     * @memberOf module:Core_Controller
     */
    function getFlag(_flagId) {
        return Level.getFlag(_flagId);
    }

//Setters

    /**
     * Description
     * @method setFlag
     * @param {} _flagId
     * @param {} _value
     * @memberOf module:Core_Controller
     */
    function setFlag(_flagId, _value) {
        Level.setFlag(_flagId, _value)
    }

    /**
     * Description
     * @method setActionEnable
     * @param {} _actionId
     * @param {} _value
     * @memberOf module:Core_Controller
     */
    function setActionEnable(_actionId, _value) {
        var action = Scene.getAction(_actionId);
        if (_value)
            enableActionButton(action);
        else
            disableActionButton(action);
    }

    /**
     * Description
     * @method setActionVisible
     * @param {} _actionId
     * @param {} _value
     * @memberOf module:Core_Controller
     */
    function setActionVisible(_actionId, _value) {
        var action = Scene.getAction(_actionId);
        action.setVisible(_value);
        CommandBar.setActionVisible(action, _value);
    }

    /**
     * Description
     * @method toggleActionVisible
     * @param {} _actionId
     * @memberOf module:Core_Controller
     */
    function toggleActionVisible(_actionId) {
        var action = Scene.getAction(_actionId);
        if (action.isVisible())
            action.setVisible(false);
        else
            action.setVisible(true);

        CommandBar.setActionVisible(action, action.isVisible());
    }

    /**
     * Description
     * @method setInteractiveObjectVisible
     * @param {} _interactiveObjectId
     * @param {} _value
     * @memberOf module:Core_Controller
     */
    function setInteractiveObjectVisible(_interactiveObjectId, _value) {
        var interactiveObject = Scene.getInteractiveObject(_interactiveObjectId);
        interactiveObject.setVisible(_value);
        InteractiveObject.setInteractiveObjectVisible(interactiveObject, _value);
    }

    /**
     * Description
     * @method toggleInteractiveObjectVisible
     * @param {} _interactiveObjectId
     * @memberOf module:Core_Controller
     */
    function toggleInteractiveObjectVisible(_interactiveObjectId) {
        var interactiveObject = Scene.getInteractiveObject(_interactiveObjectId);
        if (interactiveObject.isVisible())
            interactiveObject.setVisible(false);
        else
            interactiveObject.setVisible(true);

        InteractiveObject.setInteractiveObjectVisible(interactiveObject, interactiveObject.isVisible());
    }


//Public Interface
    return {
        start: start,
        changeScene: changeScene,
        openDialog: openDialog,
        closeDialog: closeDialog,
        openModalScene: openModalScene,
        closeModalScene: closeModalScene,
        openEndLevel: openEndLevel,
        closeEndLevel: closeEndLevel,

        enableActionButton: enableActionButton,
        disableActionButton: disableActionButton,

        setActionEnable: setActionEnable,

        getCurrentLevel: getCurrentLevel,
        getFlag: getFlag,

        setFlag: setFlag,

        setActionVisible: setActionVisible,
        toggleActionVisible: toggleActionVisible,
        setInteractiveObjectVisible: setInteractiveObjectVisible,
        toggleInteractiveObjectVisible: toggleInteractiveObjectVisible,

        deactivateAllActionButtons: deactivateAllActionButtons,
        updateAllActionButtons: updateAllActionButtons
    }
});