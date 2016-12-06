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
      
      
      
      var Hourmask = "HJ:MK",
    pattern = {
        'translation': {
            'H': {
                pattern: /[0-2]/
            },
            'J': {
                pattern: /[0-9]/
            },
            'M': {
                pattern: /[0-5]/
            },
            'K': {
                pattern: /[0-9]/
            },
        }
    };


      
      
      

    $( inData ).mask("00/00/0000");
    $( inLeito ).mask("00");
    $( inVolume1 ).mask("000");
    $( inVolume2 ).mask("000");
    $( inDuracao ).mask("00");
    $( inGotas ).mask("00,00");
    $( inGotasAprox ).mask("000");
    $( inIni ).mask(Hourmask,pattern);
    $( inTer ).mask(Hourmask,pattern);
    $( inHorario ).mask(Hourmask,pattern);
  }

  function open( _state, levelId, _leito, _enfermaria, _funcionario ) {
    if ( typeof _state === "undefined" || typeof _state === "undefined") {
      throw new Error("You must define a state to open ficha and the level");
    }

    state = _state;
    var _data = new Date();
    var _dataFormatada = _data.getDate() + '/' + (_data.getMonth() + 1) + '/' + _data.getFullYear();
    
    _funcionario = Storage.getLoadedSlot().name;
      
      $( inLeito ).val(_leito);  
      $( inEnfermaria ).val(_enfermaria);  
      $( inData ).val(_dataFormatada);  
      $( inFuncionario ).val(_funcionario);
    

    if ( state === "soro") {  
      $(".soro").show();
      $(".oral").hide();
      $(".curativo").hide();
    } else if ( state === "oral") {
      $(".oral").show();
      $(".soro").hide();
      $(".curativo").hide();
    } else if( state === "curativo"){
      $(".oral").hide();
      $(".soro").hide();
      $(".curativo").show();   
    }
      else {
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
   
      debugger;

       var flag = true;
   
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
      
      if( $( inPaciente ).val() == '' ){
          flag = false;
      }
      
    if ( !pacienteRegexp.test( paciente ) && $( inPaciente ).val() != '' ) {

        
      $( inPaciente ).css("color", "red");
          
      flag = false;
        
    } else {
        
         $( inPaciente ).css("color", "black"); 
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
        
        var horas = parseInt(inicio[ 0 ]);
        var minutos = parseInt(inicio[ 1 ]);
        
      // termino - Horario atual + duração
      var termino = $( inTer ).val().split(":");
        var horasTotais = parseInt(termino[0]);
        var minutosTotais = parseInt(termino[1]);
        
         if( $( inIni ).val() == '' && $( inTer ).val() == '' ){
          flag = false;
      }
        
        if( horasTotais != (horas + duracao) % 24 || minutosTotais != minutos   ){
            
            if( $( inIni ).val() == '' && $( inTer ).val() == '' ){
                 $( inTer ).css("color", "black");
                 $( inIni ).css("color", "black");
            } else {
                
             $( inTer ).css("color", "red");
             $( inIni ).css("color", "red");
            flag = false;
            }
            
        } else {
              $( inTer ).css("color", "black");
             $( inIni ).css("color", "black");
        }
        
    
        
        
      // volume - Informação passada por regExp  *
      var volume = $( inVolume1 ).val();
        
         if( $( inVolume1 ).val() == '' ){
          flag = false;
      }
        
      if ( !volumeRegexp.test( volume ) && $( inVolume1 ).val() != '' && $( inVolume2 ).val() != '' ) {
         $( inVolume1 ).css("color", "red");
         $( inVolume2 ).css("color", "red");
        flag = false;
          
      } else {
          $( inVolume1 ).css("color", "black");
          $( inVolume2   ).css("color", "black");
      }
      // duracao - Informação passada por regExp  *
      var duracaoIn = $( inDuracao ).val();
        
          if( $( inDuracao ).val() == '' ){
          flag = false;
      }
        
      if ( duracao != duracaoIn && $( inDuracao ).val() != ''  ) {
              $( inDuracao ).css("color", "red");
        flag = false;
          
      }else {
              $( inDuracao ).css("color", "black");
      }
      // gts - Informação passada por regExp  *
      var gotas = $( inGotas ).val();
        
           if( $( inGotas ).val() == '' ){
          flag = false;
      }
        
      if ( !gotasRegexp.test( gotas ) && $( inGotas ).val() != '' ) {
          $( inGotas ).css("color", "red");
        flag = false;
          
      }else {
          $( inGotas ).css("color", "black");
      }
      // gts Aproximado - Informação passada por regExp  *
      var gotasAprox = $( inGotasAprox ).val();
        
          if( $( inGotasAprox ).val() == '' ){
          flag = false;
      }
        
      if ( !gotasAproxRegexp.test( gotasAprox )  && $( inGotasAprox ).val() != '' ) {
           $( inGotasAprox ).css("color", "red");
        flag = false;
          
      }else {
                  $( inGotasAprox ).css("color", "black");
      }
    } else if ( state === "oral") {
      // oral
      // horario - Horario atual
      var horario = $( inHorario ).val().split(":");
        
           if( $( inHorario ).val() == '' ){
          flag = false;
      } 
        else {
            flag = true;
        }
 
    }
    return flag;
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
