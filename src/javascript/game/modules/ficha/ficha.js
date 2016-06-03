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
 * @name Ficha_controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/ficha/ficha.html" ], function( html ) {


    var divSelector = "#ficha_medicacao";
    // Estados podem ser medicação por soro ou oral
    var state;

    // Cabeçalho
    // data é verficado em relação a data atual
    var enfermeiraRegexp;
    var nomeRegexp;
    var leitoRegexp;

    // Corpo soro
    var inicioRegexp;
    var terminoRegexp;
    var volumeRegexp;

    var tempoRegexp;
    var gotasRegexp;
    var gotasAproxRegexp;

    // Corpo oral
    // horario é verificado em relação ao horário atual

    // Rodape
    // funcionario é validado em relação ao nome do jogador

    function init( selector ) {
        $( selector ).append( html );
    }

    function open( state, id ) {
        if ( typeof state === "undefined" || typeof state === "undefined" ) {
            throw new Error("You must define a state to open ficha and the level");
        }

        if ( state === "soro" ) {

        } else if ( state === "oral" ) {

        } else {
            throw new Error("Estado da ficha não existe.");
        }
        $( divSelector ).show();
    }

    function close() {
        $( divSelector ).hide();
    }

    function isDataValid() {

    }

    // setters
    function setEnfermeiraRegexp( _enfermeiraRegexp ) {
        enfermeiraRegexp = _enfermeiraRegexp;
    }
    function setNomeRegexp( _nomeRegexp ) {
        nomeRegexp = _nomeRegexp;
    }
    function setLeitoRegexp( _leitoRegexp ) {
        leitoRegexp = _leitoRegexp;
    }
    function setInicioRegexp( _inicioRegexp ) {
        inicioRegexp = _inicioRegexp;
    }
    function setTerminoRegexp( _terminoRegexp ) {
        terminoRegexp = _terminoRegexp;
    }
    function setVolumeRegexp( _volumeRegexp ) {
        volumeRegexp = _volumeRegexp;
    }
    function setTempoRegexp( _tempoRegexp ) {
        tempoRegexp = _tempoRegexp;
    }
    function setGotasRegexp( _gotasRegexp ) {
        gotasRegexp = _gotasRegexp;
    }
    function setGotasAproxRegexp( _gotasAproxRegexp ) {
        gotasAproxRegexp = _gotasAproxRegexp;
    }
    // getters
    function getEnfermeiraRegexp() {
        return enfermeiraRegexp;
    }
    function getNomeRegexp() {
        return nomeRegexp;
    }
    function getLeitoRegexp() {
        return leitoRegexp;
    }
    function getInicioRegexp() {
        return inicioRegexp;
    }
    function getTerminoRegexp() {
        return terminoRegexp;
    }
    function getVolumeRegexp() {
        return volumeRegexp;
    }
    function getTempoRegexp() {
        return tempoRegexp;
    }
    function getGotasRegexp() {
        return gotasRegexp;
    }
    function getGotasAproxRegexp() {
        return gotasAproxRegexp;
    }

    return {
        init: init,

        open: open,
        close: close,
        isDataValid: isDataValid,

        setEnfermeiraRegexp: setEnfermeiraRegexp,
        setNomeRegexp: setNomeRegexp,
        setLeitoRegexp: setLeitoRegexp,
        setInicioRegexp: setInicioRegexp,
        setTerminoRegexp: setTerminoRegexp,
        setVolumeRegexp: setVolumeRegexp,
        setTempoRegexp: setTempoRegexp,
        setGotasRegexp: setGotasRegexp,
        setGotasAproxRegexp: setGotasAproxRegexp,

        getEnfermeiraRegexp: getEnfermeiraRegexp,
        getNomeRegexp: getNomeRegexp,
        getLeitoRegexp: getLeitoRegexp,
        getInicioRegexp: getInicioRegexp,
        getTerminoRegexp: getTerminoRegexp,
        getVolumeRegexp: getVolumeRegexp,
        getTempoRegexp: getTempoRegexp,
        getGotasRegexp: getGotasRegexp,
        getGotasAproxRegexp: getGotasAproxRegexp
    };

});
