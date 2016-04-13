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
define([], function() {

    /**
     * @class
     * @name Dialog
     * @param {Character} _speaker
     * @return ObjectExpression
     *
     * @author Otho - Marcelo Lopes Lotufo
     */
    function Dialog( _speaker ) {


        // Inner Class
        /**
         * Description
         * @class Dialog.DialogOption
         * @param {string} _text
         * @param {function} _actionFunction
         *
         * @memberOf Dialog
         */
        function DialogOption( _text, _actionFunction ) {
            this.text = _text;
            this.actionFunction = _actionFunction;
        }

        // Attributes

        if ( _speaker != null ) {
            /**
             * @type {string}
             * @private
             *
             * @memberOf Dialog#
             */
            var speaker = _speaker;
            var speakerName = _speaker.getName();
            /**
             * @type {string}
             * @private
             *
             * @memberOf Dialog#
             */
            var speakerCssClass = _speaker.getCssClass();
        }
        /**
         * @type {string}
         * @private
         *
         * @memberOf Dialog#
         */
        var text = "";
        /**
         * @type {array}
         * @private
         *
         * @memberOf Dialog#
         */
        var options = [];

        var randomize = false;

        // Methods

        /**
         * Description
         *
         * @method executeOption
         * @param {int} _optionIndex
         *
         * @memberOf Dialog#
         */
        function executeOption( _optionIndex ) {
            options[ _optionIndex ].actionFunction();
        }

        // Getters
        function getClone() {
            var dialogClone = new Dialog( speaker )
                .setText( text )
                .setRandomize( randomize )
                .setSpeakerCssClass( speaker.getCssClass() )
                .setSpeakerName( speaker.getName() );
            // .setSpeakerName(speakerName);


            for ( opt in options ) {
                dialogClone.registerOption( options[ opt ].text, options[ opt ].actionFunction );
            }

            return dialogClone;
        }

        /**
         * Description
         * @method getOptions
         * @return options
         *
         * @memberOf Dialog#
         */
        function getOptions() {
            return options;
        }

        /**
         * Description
         * @method getSpeakerName
         * @return speakerName
         * @memberOf Dialog#
         */
        function getSpeakerName() {
            return speaker.getName();
        }

        /**
         * Description
         * @method getSpeakerCssClass
         * @return speakerCssClass
         * @memberOf Dialog#
         */
        function getSpeakerCssClass() {
            return speaker.getCssClass();
        }

        /**
         * Description
         * @method getText
         * @return text
         *
         * @memberOf Dialog#
         */
        function getText() {
            return text;
        }

        function getRandomize() {
            return randomize;
        }

        /**
         * Description
         * @method getOptionText
         * @param {int} _optionIndex
         * @return MemberExpression
         *
         * @memberOf Dialog#
         */
        function getOptionText( _optionIndex ) {
            return options[ _optionIndex ].text;
        }

        function setSpeakerName( _speakerName ) {
            // speakerName = _speakerName;
            return this;
        }

        function setSpeakerCssClass( _speakerCssClass ) {
            // speakerCssClass = _speakerCssClass;
            return this;
        }

        function setText( _text ) {
            text = _text;
            return this;
        }

        function setRandomize( _randomize ) {
            randomize = _randomize;
            return this;
        }

        // Setters
        /**
         * Description
         * @method registerOption
         * @param {DialogOption} _option
         *
         * @memberOf Dialog#
         */
        function registerOption( _text, _actionFunction ) {
            var opt = new DialogOption( _text, _actionFunction );

            options.push( opt );
            return this;
        }

        // Public interface

        return {
            DialogOption: DialogOption,
            executeOption: executeOption,

            getClone: getClone,
            getSpeakerName: getSpeakerName,
            getSpeakerCssClass: getSpeakerCssClass,
            getText: getText,
            getOptions: getOptions,
            getOptionText: getOptionText,
            getRandomize: getRandomize,

            setSpeakerName: setSpeakerName,
            setSpeakerCssClass: setSpeakerCssClass,
            setText: setText,
            setRandomize: setRandomize,

            registerOption: registerOption
        };
    }

    return Dialog;
});
