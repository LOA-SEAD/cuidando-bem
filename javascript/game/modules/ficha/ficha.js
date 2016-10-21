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

  var Storage = require("Storage");
  Storage.loadSlot( 0 );

  var divSelector = "#ficha_medicacao";
  // Estados podem ser medicação por soro ou oral
  var state;

  // Cabeçalho
  // data é verficado em relação a data atual
  var enfermeiraRegexp;
  var pacienteRegexp;
  var leitoRegexp;

  // Corpo soro
  var inicioRegexp;
  var terminoRegexp;
  var volumeRegexp;

  var duracao;
  var gotasRegexp;
  var gotasAproxRegexp;

  var inData = ".in_data";
  var inEnfermaria = ".in_enfermaria";
  var inLeito = ".in_leito";
  var inPaciente = ".in_paciente";
  var inIni = ".in_ini";
  var inTer = ".in_ter";
  var inVolume1 = ".in_volume1";
  var inVolume2 = ".in_volume2";
  var inTempo = ".in_tempo";
  var inHorario = ".in_horario";
  var inDuracao = ".in_duracao";
  var inFuncionario = ".in_funcionario";
  var inGotasAprox = ".in_gtsAprox";
  var inGotas = ".in_gts";

  // Corpo oral
  // horario é verificado em relação ao horário atual

  // Rodape
  // funcionario é validado em relação ao nome do jogador

  function init( selector ) {
    $( selector ).append( html );

    // Syncronize volume inputs
    $( inVolume1 ).on("keyup paste change", function() {
      $( inVolume2 ).val( $( this ).val() );
    });

    $( inVolume2 ).on("keyup paste change", function() {
      $( inVolume1 ).val( $( this ).val() );
    });

    $( inData ).mask("00/00/0000");
    $( inLeito ).mask("00");
    $( inVolume1 ).mask("000");
    $( inVolume2 ).mask("000");
    $( inDuracao ).mask("00");
    $( inGotas ).mask("00,00");
    $( inGotasAprox ).mask("000");
    $( inIni ).mask("00:00");
    $( inTer ).mask("00:00");
    $( inHorario ).mask("00:00");
  }

  function open( _state, levelId ) {
    if ( typeof _state === "undefined" || typeof _state === "undefined") {
      throw new Error("You must define a state to open ficha and the level");
    }

    state = _state;

    if ( state === "soro") {
      $(".soro").show();
      $(".oral").hide();
    } else if ( state === "oral") {
      $(".oral").show();
      $(".soro").hide();
    } else {
      throw new Error("Estado da ficha não existe.");
    }

    $(".titulo > span").hide();
    $(".corpo > div > div").hide();
    $(".ficha-l" + levelId ).show();
    $( divSelector ).show();


  }

  function close() {
    $( divSelector ).hide();
  }

  function isDataValid() {
    // Geral
    // data - Verificar em relação ao dia mes e ano atual
    var today = new Date();
    var horas = today.getHours();
    var minutos = today.getMinutes();

    var inDataVal = $( inData ).val().split("/");
    if ( inDataVal[ 0 ] != today.getDate() ) {
      return false;
    }
    if ( inDataVal[ 1 ] != today.getMonth() + 1 ) {
      return false;
    }
    if ( inDataVal[ 2 ] != today.getYear() + 1900 ) {
      return false;
    }
    // Enfermaria - Informação passada por regExp  *
    var enfermaria = $( inEnfermaria ).val();
    if ( !enfermeiraRegexp.test( enfermaria ) ) {
      return false;
    }
    // Leito - Informação passada por regExp  *
    var leito = $( inLeito ).val();
    if ( !leitoRegexp.test( leito ) ) {
      return false;
    }
    // Nome do paciente - Informação passada por regExp  *
    var paciente = $( inPaciente ).val();
    if ( !pacienteRegexp.test( paciente ) ) {
      return false;
    }
    // Funcionario - Nome do jogador
    var nome = Storage.getLoadedSlot().name.toLowerCase();
    var funcionario = $( inFuncionario ).val().toLowerCase();
    if ( nome !== funcionario ) {
      return false;
    }
    // soro
    if ( state === "soro") {
      // inicio - Horario atual
      var inicio = $( inIni ).val().split(":");
      if ( inicio[ 0 ] != horas ) {
        return false;
      }
      if ( inicio[ 1 ] != minutos && (inicio[ 1 ] + 2) != minutos && (inicio[ 1 ] - 2) != minutos ) {
        return false;
      }
      // termino - Horario atual + duração
      var termino = $( inTer ).val().split(":");
      if ( termino[ 0 ] != (horas + duracao) % 24 ) {
        return false;
      }
      if ( termino[ 1 ] != minutos && (termino[ 1 ] + 2) != minutos && (termino[ 1 ] - 2) != minutos ) {
        return false;
      }
      // volume - Informação passada por regExp  *
      var volume = $( inVolume1 ).val();
      if ( !volumeRegexp.test( volume ) ) {
        return false;
      }
      // duracao - Informação passada por regExp  *
      var duracaoIn = $( inDuracao ).val();
      if ( duracao != duracaoIn ) {
        return false;
      }
      // gts - Informação passada por regExp  *
      var gotas = $( inGotas ).val();
      if ( !gotasRegexp.test( gotas ) ) {
        return false;
      }
      // gts Aproximado - Informação passada por regExp  *
      var gotasAprox = $( inGotasAprox ).val();
      if ( !gotasAproxRegexp.test( gotasAprox ) ) {
        return false;
      }
    } else if ( state === "oral") {
      // oral
      // horario - Horario atual
      var horario = $( inHorario ).val().split(":");
      if ( horario[ 0 ] != horas ) {
        return false;
      }
      if ( horario[ 1 ] != minutos && (horario[ 1 ] + 1) != minutos && (horario[ 1 ] - 1) != minutos ) {
        return false;
      }
    }
    return true;
  }

  // setters
  function setEnfermeiraRegexp( _enfermeiraRegexp ) {
    enfermeiraRegexp = _enfermeiraRegexp;
  }

  function setPacienteRegexp( _pacienteRegexp ) {
    pacienteRegexp = _pacienteRegexp;
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

  function setDuracao( _duracao ) {
    duracao = _duracao;
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
    setPacienteRegexp: setPacienteRegexp,
    setLeitoRegexp: setLeitoRegexp,

    setInicioRegexp: setInicioRegexp,
    setTerminoRegexp: setTerminoRegexp,
    setVolumeRegexp: setVolumeRegexp,
    setDuracao: setDuracao,
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
