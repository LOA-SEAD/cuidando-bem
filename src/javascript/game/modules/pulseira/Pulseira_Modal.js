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
    var leitoRegExp;

    /**
     * Description
     * @type {regex}
     * @private
     *
     * @memberOf module:Pulseira_Controller
     */
    var dataRegExp;

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
     * @method open

     * @memberOf module:Pulseira_Controller
     */
    function open() {
        console.info("Show Modal Scene");
        showing = true;
        $(divSelector).show();
        $(dataInputSelector).mask('00/00/0000');
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

    function isAllDataValid(){
        var valid = true;

        var data = $(dataInputSelector).val();
        var leito = $(leitoInputSelector).val();
        var name = $(nameInputSelector).val();

        valid = valid && nameRegExp.test(name);
        valid = valid && leitoRegExp.test(leito);
        valid = valid && dataRegExp.test(data);

        return valid;
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
        isAllDataValid: isAllDataValid,

        setNameRegExp: setNameRegExp,
        setDataRegExp: setDataRegExp,
        setLeitoRegExp: setLeitoRegExp
    }

});