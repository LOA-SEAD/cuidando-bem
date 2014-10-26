/*
 Dialogo

 Texto do dialogo
 Quem esta falando (talvez um texto e class css)
 Opcoes de resposta com seus respectivos proximos dialogos
 acao de acordo com a resposta anterior
 Proximo dialogo


 */

define([], function () {

    /**
     * @class
     * @name Dialog
     * @param {} _speakerName
     * @param {} _speakerCssClass
     * @param {} _text
     * @return ObjectExpression

     */
    function Dialog(_speakerName, _speakerCssClass, _text) {
        //Inner Class
        /**
         * Description
         * @method DialogOption
         * @param {} _text
         * @param {} _actionFunction
         * @memberOf Dialog
         */
        function DialogOption(_text, _actionFunction) {
            this.text = _text;
            this.actionFunction = _actionFunction;
        }

        //Attributes
        var speakerName = _speakerName;
        var speakerCssClass = _speakerCssClass;
        var text = _text;

        var options = [];

        //Methods

        /**
         * Description
         * @method executeOption
         * @param {} _optionIndex
         * @memberOf Dialog
         */
        function executeOption(_optionIndex) {
            options[_optionIndex].actionFunction();
        }

        //Getters

        /**
         * Description
         * @method getOptions
         * @return options
         * @memberOf Dialog
         */
        function getOptions() {
            return options;
        }

        /**
         * Description
         * @method getSpeakerName
         * @return speakerName
         * @memberOf Dialog
         */
        function getSpeakerName() {
            return speakerName;
        }

        /**
         * Description
         * @method getSpeakerCssClass
         * @return speakerCssClass
         * @memberOf Dialog
         */
        function getSpeakerCssClass() {
            return speakerCssClass;
        }

        /**
         * Description
         * @method getText
         * @return text
         * @memberOf Dialog
         */
        function getText() {
            return text;
        }

        /**
         * Description
         * @method getOptionText
         * @param {} _optionIndex
         * @return MemberExpression
         * @memberOf Dialog
         */
        function getOptionText(_optionIndex) {
            return options[_optionIndex].text;
        }

        //Setters
        /**
         * Description
         * @method registerOption
         * @param {} _option
         * @memberOf Dialog
         */
        function registerOption(_option) {
            options.push(_option);
        }

        //Public interface

        return {
            DialogOption: DialogOption,
            executeOption: executeOption,

            getSpeakerName: getSpeakerName,
            getSpeakerCssClass: getSpeakerCssClass,
            getText: getText,
            getOptions: getOptions,
            getOptionText: getOptionText,

            registerOption: registerOption
        }
    }

    return Dialog;
});