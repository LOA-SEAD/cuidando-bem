/**
 *
 * @name Pulseira_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(['text!../assets/html/pulseira/pulseira.html'], function (html) {

//Attributes

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var divSelector = "#pulseira_modal";

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var nameDisplaySelector = "#name_display";

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var nameInputSelector = "#name_input";

    /**
     * Description
     * @type {boolean}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var validName = false;

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var leitoDisplaySelector = "#leito_display";

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var leitoInputSelector = "#leito_input";

    /**
     * Description
     * @type {boolean}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var validLeito = false;

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var dataDisplaySelector = "#data_display";

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var dataInputSelector = "#data_input";

    /**
     * Description
     * @type {boolean}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var validData = false;

    /**
     * Description
     * @type {boolean}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var showing = false;

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var name;

    /**
     * Description
     * @type {regex}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var nameRegExp;

    /**
     * Description
     * @type {regex}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var leito;

    /**
     * Description
     * @type {regex}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var leitoRegExp;

    /**
     * Description
     * @type {string}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var data;

    /**
     * Description
     * @type {regex}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var dataRegExp;

    //TODO: review this propertie, it may not be needed
    var lastSceneClass = "";
//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:Pulseira_Controller
     */
    function init(selector) {
        $(selector).append(html);
    }

    /**
     * Description
     * @method show
     * @memberOf module:Pulseira_Controller
     */
    function show() {
        console.info("Show Modal Scene");
        showing = true;
        $(divSelector).show();
    }

    /**
     * Description
     * @method open

     * @memberOf module:Pulseira_Controller
     */
    function open() {
        show();

        //region name selector and display
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
            name = $(this).val();
            validName = nameRegExp.test(name);

            $(nameInputSelector).unbind('keydown');

            $(nameDisplaySelector).text(name);
            $(this).hide();
        });
        //endregion

        //region leito selector and display
        $(leitoDisplaySelector).click(function(){
            $(leitoInputSelector).show();
            $(leitoInputSelector).val($(this).text());
            $(leitoInputSelector).focus();
            $(leitoInputSelector).keydown(function(e){
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13'){
                    $(this).blur();
                }
            })
        });

        $(leitoInputSelector).blur(function(){
            leito = $(this).val();
            validLeito = leitoRegExp.test(leito);

            $(leitoInputSelector).unbind('keydown');

            $(leitoDisplaySelector).text(leito);
            $(this).hide();
        });
        //endregion

        //region data selector and display
        $(dataDisplaySelector).click(function(){
            $(dataInputSelector).show();
            $(dataInputSelector).val($(this).text());
            $(dataInputSelector).focus();
            $(dataInputSelector).keydown(function(e){
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13'){
                    $(this).blur();
                }
            })
        });

        $(dataInputSelector).blur(function(){
            data = $(this).val();
            validData = dataRegExp.test(data);

            $(dataInputSelector).unbind('keydown');

            $(dataDisplaySelector).text(data);
            $(this).hide();
        });
        //endregion
    }

    /**
     * Description
     * @method close
     * @memberOf module:Pulseira_Controller
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
     * @memberOf module:Pulseira_Controller
     */
    function isShowing() {
        return showing;
    }

    /**
     * Description
     * @method isNameValid
     * @return validName
     * @memberOf module:Pulseira_Controller
     */
    function isNameValid(){
        return validName;
    }

    /**
     * Description
     * @method isDataValid
     * @return validData
     * @memberOf module:Pulseira_Controller
     */
    function isDataValid(){
        return validData;
    }

    /**
     * Description
     * @method isLeitoValid
     * @return validLeito
     * @memberOf module:Pulseira_Controller
     */
    function isLeitoValid(){
        return validLeito;
    }

//Setters
    /**
     * Description
     * @method setNameRegExp
     * @param {regex} _nameRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setNameRegExp(_nameRegExp) {
        nameRegExp = _nameRegExp;
        return this;
    }

    /**
     * Description
     * @method setDataRegExp
     * @param {regex} _dataRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setDataRegExp(_dataRegExp){
        dataRegExp = _dataRegExp;
        return this;
    }

    /**
     * Description
     * @method setLeitoRegExp
     * @param {regex} _leitoRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setLeitoRegExp(_leitoRegExp){
        leitoRegExp = _leitoRegExp;
        return this;
    }




//Public Interface
    return {
        init: init,

        close: close,
        open: open,

        isShowing: isShowing,

        isNameValid: isNameValid,
        isDataValid: isDataValid,
        isLeitoValid: isLeitoValid,

        setNameRegExp: setNameRegExp,
        setDataRegExp: setDataRegExp,
        setLeitoRegExp: setLeitoRegExp
    }

});