/**
 *
 * @name ModalScene_Game_Controller
 * @module
 */
define(function () {

//Attributes

    var divSelector = "#pulseira_modal";

    var nameDisplaySelector = "#name_display";
    var nameInputSelector = "#name_input";

    var showing = false;

    var name;
    var nameRegExp;

    var leito;
    var leitoRegExp;

    var data;
    var dataRegExp;

    var wrongName;
    var rightName;

    var wrongLeito;
    var rightLeito;

    var wrongData;
    var rightData;

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
    function open() {
        show();

        $(nameDisplaySelector).click(function(){
            $(nameInputSelector).show();
            $(nameInputSelector).val($(this).text());
            $(nameInputSelector).focus();
            $(nameInputSelector).keydown(function(e){
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13'){
                    $(this).blur();
                }
            })
        });

        $(nameInputSelector).blur(function(){
            $(nameDisplaySelector).text($(this).val());
            $(this).hide();
        });
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