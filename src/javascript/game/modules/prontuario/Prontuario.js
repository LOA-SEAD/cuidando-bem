/**
 *
 * @name Prontuario_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(function () {

    //region Attributes
    //region Selectors

    var prontuarioSelector = "#prontuario";

    var nomeDisplaySelector;

    var dataDisplaySelector;

    var idadeDisplaySelector;

    var sexoDisplaySelector;

    var estadoCivilDisplaySelector;

    var profissaoDisplaySelector;

    var paiDisplaySelector;

    var maeDisplaySelector;

    var dataInternacaoDisplaySelector;

    var leitoDisplaySelector;

    var antecedentesHospitalares;

    var hipoteseDiagnosticaDisplaySelector;

    var observacoesDisplaySelector;

    //TODO: Radio button e caixa de texto para Alergia medicamentosa

    var pesoDisplaySelector;

    var alturaDisplaySelector;

    var circunferenciaAbdominalSelector;

    //TODO: Prescrição Médica

    //TODO: Prescrição de Enfermagem

    //TODO: SSVV

    //TODO: Anotação de Enfermagem

    //endregion
    //endregion

    //region Methods

    function open(){
        $(prontuarioSelector).show();
    }

    function close(){
        $(prontuarioSelector).hide();
    }

    //endregion

//Public Interface
    return {
        open: open,
        close: close

    }

});