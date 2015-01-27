/**
 *
 * @name ModalScene_Game_Controller
 * @module
 */
define(function () {

//Attributes

    var divSelector = "#modalScene";
    var showing = false;

    var lastSceneClass = "";
//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:ModalScene_Game_Controller
     */
    function init() {

    }

    /**
     * Description
     * @method show
     * @memberOf module:ModalScene_Game_Controller
     */
    function show() {
        console.info("Show Modal Scene");
        showing = true;
        $(divSelector).show();
    }

    /**
     * Description
     * @method open
     * @param {} _modalScene
     * @memberOf module:ModalScene_Game_Controller
     */
    function open(_modalScene) {
        if (lastSceneClass == "") {
            $(divSelector).addClass(_modalScene.getCssClass());
        } else {
            $(divSelector).removeClass(lastSceneClass);
            $(divSelector).addClass(_modalScene.getCssClass());
        }


        $(divSelector).append(_modalScene.getTemplate());


        lastSceneClass = _modalScene.getCssClass();
        show();
    }

    /**
     * Description
     * @method close
     * @memberOf module:ModalScene_Game_Controller
     */
    function close() {
        console.info("Close modal Scene");
        showing = false;
        $(divSelector).hide();
    }

//Getters
    /**
     * Description
     * @method isShowing
     * @return showing
     * @memberOf module:ModalScene_Game_Controller
     */
    function isShowing() {
        return showing;
    }

//Setters


//Public Interface
    return {
        init: init,

        close: close,
        open: open,

        isShowing: isShowing

    }

});