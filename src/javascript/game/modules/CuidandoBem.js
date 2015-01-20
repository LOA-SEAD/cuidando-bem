/**
 *
 * @name Core_Controller
 * @module
 */
define(['Stage', 'levelsData', 'commandBar', 'dialogModal', 'interactiveObjects', 'modalScene', 'scene', 'endOfLevel'], function (Stage, game, CommandBar, Dialog, InteractiveObject, ModalScene, Scene_con, endOfLevel) {

//Attributes

    var Level;
    var Scene;
    var Actions;
    var InteractiveObjects;
    var Dialogs;
    var Flags;
    var cur_scene;

    var scoreList;


    function ScoreItem (_title, _score){
        this.title = _title;
        this.score = _score;
    }


//Methods
    /**
     * Description
     * @method start
     * @param {} _gameState
     * @memberOf module:Core_Controller
     */
    function start(_gameState) {
        console.group("Game Running:");

        changeLevel(game.getInitialLevel());
        CommandBar.hide();
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
        console.group("Clone Level");
        Level = _newLevel.getClone();
        console.groupEnd();

        cur_scene = Level.getCurrentSceneId();
    }

    function changeLevelTo(_levelId){
        game.setCurrentLevel(_levelId);
        changeLevel(game.getCurrentLevel());

        startLevel();
    }

    /**
     * Description
     * @method startLevel
     * @memberOf module:Core_Controller
     */
    function startLevel() {
        console.group('Starting level:' + Level.getName(), true);

        Level.setCurrentSceneById(cur_scene);
        Scene = Level.getCurrentScene();

        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();
        scoreList = [];

        Scene_con.setScene(Scene);
        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        Scene.load();
        console.groupEnd();
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

        console.group("Change Scene to: " + Scene.getName(), true);

        cur_scene = _newSceneId;
        Actions = Level.getActions(cur_scene);
        Dialogs = Level.getDialogs(cur_scene);
        InteractiveObjects = Level.getInteractiveObjects(cur_scene);

        Flags = Level.getFlags();

        oldScene.unload();
        Scene_con.changeScene(Scene);

        CommandBar.changeToActionsButtons(Actions);
        InteractiveObject.changeToInteractiveObjects(InteractiveObjects);

        Scene.load();

        console.groupEnd();
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

        disableAllActionButtons();
        disableAllInteractiveObjects();
    }

    /**
     * Description
     * @method closeDialog
     * @memberOf module:Core_Controller
     */
    function closeDialog() {
        Dialog.close();

        updateAllActionButtons();
        updateAllInteractiveObjects();
    }

    //End Level
    /**
     * Description
     * @method openEndLevel
     * @memberOf module:Core_Controller
     */
    function showEndOfLevel() {
        endOfLevel.show(scoreList);
    }

    /**
     * Description
     * @method closeEndLevel
     * @memberOf module:Core_Controller
     */
    function closeEndOfLevel() {
        endOfLevel.close();
    }

    /**
     * Description
     * @method deactivateAllActionButtons
     * @memberOf module:Core_Controller
     */
    function disableAllActionButtons() {
        CommandBar.disableAllActionButtons(Actions);
    }

    /**
     * Description
     * @method deactivateAllInteractiveObjects
     *
     * @memberof module:Core_Controller
     */
    function disableAllInteractiveObjects(){
        InteractiveObject.disableAllInteractiveObjects(InteractiveObjects);
    }

    /**
     * Description
     * @method updateAllInteractiveObjects
     *
     * @memberof module:Core_Controller
     */
    function updateAllInteractiveObjects(){
        InteractiveObject.updateAllInteractiveObjects(InteractiveObjects);
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
        CommandBar.disableActionButton(action, _value);
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
        CommandBar.enableActionButton(action);
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

    function registerScoreItem(_title, _score){
        scoreList.push(new ScoreItem(_title, _score));
    }

    function goBackToMenu(){
        Stage.changeScreen(0);
    }

    function changeSceneCssClassTo(_cssClass){
        var oldSelector = '.' + Scene.getCssClass();
        var selector = '.' + _cssClass
        $(oldSelector).addClass(_cssClass);
        $(selector).removeClass(Scene.getCssClass());

        Scene.setCssClass(_cssClass);
    }


//Public Interface
    var ret = {
        start: start,
        changeScene: changeScene,
        changeLevelTo: changeLevelTo,
        openDialog: openDialog,
        closeDialog: closeDialog,
        openModalScene: openModalScene,
        closeModalScene: closeModalScene,
        showEndOfLevel: showEndOfLevel,
        closeEndOfLevel: closeEndOfLevel,

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

        registerScoreItem: registerScoreItem,

        disableAllActionButtons: disableAllActionButtons,
        updateAllActionButtons: updateAllActionButtons,

        disableAllInteractiveObjects: disableAllInteractiveObjects,
        updateAllInteractiveObjects: updateAllInteractiveObjects,

        goBackToMenu: goBackToMenu,

        changeSceneCssClassTo: changeSceneCssClassTo
    };


    window.gameShark = {
        Stage:Stage,
        game:game,
        CommandBar: CommandBar,
        Dialog:Dialog,
        InteractiveObject:InteractiveObject,
        ModalScene: ModalScene,
        Scene_con:Scene_con,
        endOfLevel:endOfLevel,
        core: ret
    };

    return ret;
});