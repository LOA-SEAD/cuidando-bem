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
 *
 * @name Pulseira_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/pulseira/pulseira.html" ], function( html ) {

// Attributes
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

    var disabled = false;

// Methods
    // Init
    /**
     * Description
     * @method init
     * @memberOf module:Pulseira_Controller
     */
    function init( selector ) {
        $( selector ).append( html );
    }

    /**
     * Description
     * @method open

     * @memberOf module:Pulseira_Controller
     */
    function open() {
        console.info("Show Modal Scene");
        showing = true;
        $( divSelector ).show();
        $( dataInputSelector ).mask("00/00/0000");

        var data = $( dataInputSelector ).val().toLowerCase();
        var leito = $( leitoInputSelector ).val().toLowerCase();
        var name = $( nameInputSelector ).val().toLowerCase();

        $( dataInputSelector ).focus( function(){
            $( '<span>Data: <time datetime="' + data.replace(/\//g, '-') + '">' + data + '</time></span><br>' ).appendTo( "#accessible_log" );
        });

        $( leitoInputSelector ).focus( function(){
            $( '<span>Leito: ' + leito + '</span><br>' ).appendTo( "#accessible_log" );
        });

        $( nameInputSelector ).focus( function(){
            $( '<span>Nome: ' + name + '</span><br>' ).appendTo( "#accessible_log" );
        });

        $( "#pulseira_modal input:first" ).focus();

        if(showing){

            var i = 0,
            arrow_down = 40,
            arrow_up = 38,
            enter = 13,
            pause = 80;

            $( document ).keydown( function( e ){

                if( $( ".action_button" ).is(":visible") ){
                    var n = $.merge(
                                $( "#pulseira_modal input" ),
                                $( ".action_button:visible" )
                            );
                }
                else{
                    var n = $( "#pulseira_modal input" );
                }

                if( n.length != 0 ){
                    if( e.which == arrow_down ){ // seta para baixo
                        if( i >= n.length - 1 ){
                            i = 0;
                        }
                        else{
                            i++;
                        }
                        $(n[i]).focus();
                        return false;
                    }
                    else if( e.which == arrow_up ){ // seta para cima
                        if( i > 0 ){
                            i--;
                        }
                        else{
                            i = n.length - 1;
                        }
                        $(n[i]).focus();
                        return false;
                    }
                    else if( e.which == enter ){ // enter
                        if( i != -1 && $(n[i]).attr("class") == "action_button" ){
                            $(n[i]).click();
                            showing = false;
                        }
                        else{
                            // TODO
                        }
                        return false;
                    }
                    else if( e.which == pause ){
                        if( $( "#pauseButton" ).is(":visible") ){
                            $( "#pauseButton" ).click();
                        }
                        return false;
                    }
                }
            });
        }
    }

    /**
     * Description
     * @method close
     * @memberOf module:Pulseira_Controller
     */
    function close() {
        console.info("Close modal Scene");
        showing = false;
        $( divSelector ).hide();
    }

    function disable() {
        disable = true;

        $( dataInputSelector ).prop("disabled", true );
        $( leitoInputSelector ).prop("disabled", true );
        $( nameInputSelector ).prop("disabled", true );
    }

    function enable() {
        disable = false;

        $( dataInputSelector ).prop("disabled", false );
        $( leitoInputSelector ).prop("disabled", false );
        $( nameInputSelector ).prop("disabled", false );
    }

// Getters
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
    function isNameValid() {
        return validName;
    }

    /**
     * Description
     * @method isDataValid
     * @return validData
     * @memberOf module:Pulseira_Controller
     */
    function isDataValid() {
        return validData;
    }

    /**
     * Description
     * @method isLeitoValid
     * @return validLeito
     * @memberOf module:Pulseira_Controller
     */
    function isLeitoValid() {
        return validLeito;
    }

    function isAllDataValid() {
        var valid = true;

        var data = $( dataInputSelector ).val().toLowerCase();
        var leito = $( leitoInputSelector ).val().toLowerCase();
        var name = $( nameInputSelector ).val().toLowerCase();

        valid = valid && nameRegExp.test( name );
        valid = valid && leitoRegExp.test( leito );
        valid = valid && dataRegExp.test( data );

        return valid;
    }

// Setters
    /**
     * Description
     * @method setNameRegExp
     * @param {regex} _nameRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setNameRegExp( _nameRegExp ) {
        nameRegExp = _nameRegExp;
        return this;
    }

    function setName( _name ) {
        $( nameInputSelector ).val( _name );
    }

    /**
     * Description
     * @method setDataRegExp
     * @param {regex} _dataRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setDataRegExp( _dataRegExp ) {
        dataRegExp = _dataRegExp;
        return this;
    }

    function setData( _data ) {
        $( dataInputSelector ).val( _data );
    }

    /**
     * Description
     * @method setLeitoRegExp
     * @param {regex} _leitoRegExp
     *
     * @memberOf module:Pulseira_Controller
     */
    function setLeitoRegExp( _leitoRegExp ) {
        leitoRegExp = _leitoRegExp;
        return this;
    }

    function setLeito( _leito ) {
        $( leitoInputSelector ).val( _leito );
    }

    function resetData() {
        setName("");
        setLeito("");
        setData("");

        enable();
    }


// Public Interface
    return {
        init: init,

        close: close,
        open: open,

        disable: disable,
        enable: enable,

        isShowing: isShowing,

        isNameValid: isNameValid,
        isDataValid: isDataValid,
        isLeitoValid: isLeitoValid,
        isAllDataValid: isAllDataValid,

        resetData: resetData,

        setNameRegExp: setNameRegExp,
        setDataRegExp: setDataRegExp,
        setLeitoRegExp: setLeitoRegExp,

        setName: setName,
        setLeito: setLeito,
        setData: setData
    };

});
