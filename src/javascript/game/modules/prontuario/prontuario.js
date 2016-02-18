/**
 *
 * @name Prontuario_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "text!../html/prontuario/prontuario.html" ], function( html ) {

    //region Attributes

    var prontuarioSelector = "#prontuario";

    var nomeDisplaySelector = "#pront_nome";
    var nomeText;

    var dataNascimentoDisplaySelector = "#pront_data_nascimento";
    var dataNascimentoText;

    var idadeDisplaySelector = "#pront_idade";
    var idadeText;

    var sexoDisplaySelector = "#pront_sexo";
    var sexoText;

    var estadoCivilDisplaySelector = "#pront_estado_civil";
    var estadoCivilText;

    var profissaoDisplaySelector = "#pront_profissao";
    var profissaoText;

    var paiDisplaySelector = "#pront_nome_pai";
    var paiText;
    var paiLocked;

    var maeDisplaySelector = "#pront_nome_mae";
    var maeText;

    var dataInternacaoDisplaySelector = "#pront_data_internacao";
    var dataInternacaoText;

    var leitoDisplaySelector = "#pront_numero_leito";
    var leitoText;

    var antecedentesHospitalaresDisplaySelector = "#pront_antecedentes";
    var antecedentesText;

    var hipoteseDiagnosticaDisplaySelector = "#pront_hipotese_diagnostica";
    var hipoteseText;

    var observacoesDisplaySelector = "#pront_observacoes";
    var observacoesText;

    var alergiaMedicamentosa_spanSim = "#pront_alergia_spanSim";
    var alergiaMedicamentosa_divSim = "#pront_alergia_divSim";
    var alergiaMedicamentosa_textSelector = "#pront_alergia_qual";
    var alergiaMedicamentosa_text;
    var alergiaMedicamentosa_regExp;
    var alergiaMedicamentosa_divNao = "#pront_alergia_divNao";
    var alergiaMedicamentosa_spanNao = "#pront_alergia_spanNao";
    var alergiaMedicamentosa_status;
    var alergiaMedicamentosa_correctStatus;
    var alergiaMedicamentosa_status_empty = "   ";
    var alergiaMedicamentosa_status_x = "X";
    var alergiaMedicamentosa_disabled = false;



    var pesoDisplaySelector = "#pront_peso";
    var pesoText;

    var alturaDisplaySelector = "#pront_altura";
    var alturaText;

    var circunferenciaAbdominalSelector = "#pront_circunferencia_abdominal";
    var circunferenciaAbdominalText;

    var prescMedica_tbodySelector = "#prescMedica_tbody";
    var prescMedica_rowSelector = ".prescMedica_row";

    var prescMedica_dataSelector = ".data";
    var prescMedica_medicacaoSelector = ".medicacao";
    var prescMedica_viaSelector = ".via";
    var prescMedica_posologiaSelector = ".posologia";
    var prescMedica_horarioSelector = ".horario";
    var prescMedica_relatorioSelector = ".relatorio";

    var prescMedica_data = [
        {
            disabled: false,
            data: "",
            medicacao: "",
            via: "",
            posologia: "",
            horario: "",
            relatorio: false
        },
        {
            disabled: false,
            data: "",
            medicacao: "",
            via: "",
            posologia: "",
            horario: "",
            relatorio: false
        }
    ];

    var prescMedica_relatorioRegExp = [
        {
            relatorio: ""
        },
        {
            relatorio: ""
        }
    ];

    //TODO: Prescrição de Enfermagem
    var prescEnfermagemStates = {
        "vazio": false,
        "decubito": true
    };

    var prescEnfermagemState = "vazio";

    //Enfermagem: virarDecubito
    var prescEnfermagemVirouDecubito = false;
    var prescEnfermagemCheckSelector = "";


    var ssvv_tbodySelector = "#ssvv_tbody";

    var ssvv_dataSelector = ".data";
    var ssvv_pressaoArterialSelector = ".pa";
    var ssvv_frequenciaCardiacaSelector = ".fc";
    var ssvv_frequenciaRespiratoriaSelector = ".fr";
    var ssvv_saturacaoSelector = ".sat";
    var ssvv_temperaturaSelector = ".temp";

    var ssvv_data = [
        {
            disabled: false,
            data: "",
            pa: "",
            fc: "",
            fr: "",
            sat: "",
            temp: ""
        },
        {
            disabled: false,
            data: "",
            pa: "",
            fc: "",
            fr: "",
            sat: "",
            temp: ""
        }
    ];

    var ssvv_regExps = [
        {
            data: "",
            pa: "",
            fc: "",
            fr: "",
            sat: "",
            temp: ""
        },
        {
            data: "",
            pa: "",
            fc: "",
            fr: "",
            sat: "",
            temp: ""
        }
    ];

    var anotacaoEnfermagem_tbodySelector = "#anotacaoEnfermagem_tbody";

    var anotacaoEnfermagem_dataSelector = ".data";
    var anotacaoEnfermagem_anotacaoSelector = ".anotacao";

    var anotacaoEnfermagem_data = "";
    var anotacaoEnfermagem_dataRegExp = "";
    var anotacaoEnfermagem_text = "";
    var anotacaoEnfermagem_textRegExp = "";

    //endregion

    //region Gets
    function getNome() {
        return nomeText;
    }

    function getDataNascimento() {
        return dataNascimentoText;
    }

    function getIdade() {
        return idadeText;
    }

    function getSexo() {
        return sexoText;
    }

    function getEstadoCivil() {
        return estadoCivilText;
    }

    function getProfissao() {
        return profissaoText;
    }

    function getPai() {
        return paiText;
    }

    function getMae() {
        return maeText;
    }

    function getDataInternacao() {
        return dataInternacaoText;
    }

    function getLeito() {
        return leitoText;
    }

    function getAntecedentes() {
        return antecedentesText;
    }

    function getHipotese() {
        return hipoteseText;
    }

    function getObservacoes() {
        return observacoesText;
    }

    function getPeso() {
        return pesoText;
    }

    function getAltura() {
        return alturaText;
    }

    function getCircunferenciaAbdominal() {
        return circunferenciaAbdominalText;
    }

    function getPrescEnfermagemState() {
        return prescEnfermagemState;
    }
    //endregion

    //region Sets
    function setNome( _nomeText ) {
        nomeText = _nomeText;
        $( nomeDisplaySelector ).text( nomeText );
    }

    function setDataNascimento( _dataText ) {
        dataNascimentoText = _dataText;
        $( dataNascimentoDisplaySelector ).text( dataNascimentoText );
    }

    function setIdade( _idadeText ) {
        idadeText = _idadeText;
        $( idadeDisplaySelector ).text( idadeText );
    }

    function setSexo( _sexoText ) {
        sexoText = _sexoText;
        $( sexoDisplaySelector ).text( sexoText );
    }

    function setEstadoCivil( _estadoCivilText ) {
        estadoCivilText = _estadoCivilText;
        $( estadoCivilDisplaySelector ).text( estadoCivilText );
    }

    function setProfissao( _profissaoText ) {
        profissaoText = _profissaoText;
        $( profissaoDisplaySelector ).text( profissaoText );
    }

    function setPai( _paiText ) {
        paiText = _paiText;
        $( paiDisplaySelector ).text( paiText );
    }

    function setMae( _maeText ) {
        maeText = _maeText;
        $( maeDisplaySelector ).text( maeText );
    }

    function setDataInternacao( _dataInternacaoText ) {
        dataInternacaoText = _dataInternacaoText;
        $( dataInternacaoDisplaySelector ).text( dataInternacaoText );
    }

    function setLeito( _leitoText ) {
        leitoText = _leitoText;
        $( leitoDisplaySelector ).text( leitoText );
    }

    function setAntecedentes( _antecedentesText ) {
        antecedentesText = _antecedentesText;
        $( antecedentesHospitalaresDisplaySelector ).text( antecedentesText );
    }

    function setHipotese( _hipoteseText ) {
        hipoteseText = _hipoteseText;
        $( hipoteseDiagnosticaDisplaySelector ).text( hipoteseText );
    }

    function setObservacoes( _observacoesText ) {
        observacoesText = _observacoesText;
        $( observacoesDisplaySelector ).text( observacoesText );
    }

    function setAlergiaMedicamentosa( status, text ) {
        alergiaMedicamentosa_status = status;

        if ( status ) {
            $( alergiaMedicamentosa_spanSim ).text( alergiaMedicamentosa_status_x );
            $( alergiaMedicamentosa_spanNao ).text( alergiaMedicamentosa_status_empty );

            alergiaMedicamentosa_text = text;
            $( alergiaMedicamentosa_textSelector ).val( text );
            $( alergiaMedicamentosa_textSelector ).show();
        }else {
            $( alergiaMedicamentosa_spanSim ).text( alergiaMedicamentosa_status_empty );
            $( alergiaMedicamentosa_spanNao ).text( alergiaMedicamentosa_status_x );

            $( alergiaMedicamentosa_textSelector ).hide();
        }
    }

    function setAlergiaMedicamentosaCorrection( _correctStatus, _regExp ) {
        alergiaMedicamentosa_regExp = _regExp;
        alergiaMedicamentosa_correctStatus = _correctStatus;
    }

    function setDisableAlergiaMedicamentosa( status ) {
        alergiaMedicamentosa_disabled = status;
        $( alergiaMedicamentosa_textSelector ).prop( "disabled", alergiaMedicamentosa_disabled );
    }

    function setPeso( _pesoText ) {
        pesoText = _pesoText;
        $( pesoDisplaySelector ).text( pesoText );
    }

    function setAltura( _alturaText ) {
        alturaText = _alturaText;
        $( alturaDisplaySelector ).text( alturaText );
    }

    function setCircunferenciaAbdominal( _circunferenciaAbdominalText ) {
        circunferenciaAbdominalText = _circunferenciaAbdominalText;
        $( circunferenciaAbdominalSelector ).text( circunferenciaAbdominalText );
    }

    function setSsvvRowData( _row, _data, _pa, _fc, _fr, _sat, _temp, _disabled ) {
        //in case _disabled is null
        _disabled = _disabled || false;

        if ( _row < 0 || _row > ssvv_data.length ) {
            throw new Error("Invalid row index");
        }

        ssvv_data[ _row ].disabled = _disabled;
        ssvv_data[ _row ].data = _data;
        ssvv_data[ _row ].pa = _pa;
        ssvv_data[ _row ].fc = _fc;
        ssvv_data[ _row ].fr = _fr;
        ssvv_data[ _row ].sat = _sat;
        ssvv_data[ _row ].temp = _temp;

        $( $( ssvv_dataSelector, ssvv_tbodySelector )[ _row ] ).text( _data );
        $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ _row ] ).val( _pa );
        $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ _row ] ).val( _fc );
        $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ _row ] ).val( _fr );
        $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ _row ] ).val( _sat );
        $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ _row ] ).val( _temp );


        // $($(ssvv_dataSelector, ssvv_tbodySelector)[_row]).text(_data);
        $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ _row ] ).prop( "disabled", _disabled );
        $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ _row ] ).prop( "disabled", _disabled );
        $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ _row ] ).prop( "disabled", _disabled );
        $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ _row ] ).prop( "disabled", _disabled );
        $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ _row ] ).prop( "disabled", _disabled );

    }

    function setSsvvRowRegExp( _row, _data, _pa, _fc, _fr, _sat, _temp ) {
        if ( _row < 0 || _row > ssvv_data.length ) {
            throw new Error("Invalid row index");
        }

        //ssvv_regExps[_row].data = _data;
        ssvv_regExps[ _row ].pa = _pa;
        ssvv_regExps[ _row ].fc = _fc;
        ssvv_regExps[ _row ].fr = _fr;
        ssvv_regExps[ _row ].sat = _sat;
        ssvv_regExps[ _row ].temp = _temp;
    }

    function setAnotacaoEnfermagemRowData( _data, _anotacao ) {

        anotacaoEnfermagem_data = _data;
        anotacaoEnfermagem_text = _anotacao;

        $( $( anotacaoEnfermagem_dataSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).val( _data );
        $( $( anotacaoEnfermagem_anotacaoSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).text( _anotacao );
    }

    function addToRelatorio( _anotacao ) {

        var actualText = $( $( anotacaoEnfermagem_anotacaoSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).text();



        $( $( anotacaoEnfermagem_anotacaoSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).text( actualText + _anotacao );
    }

    function setAnotacaoEnfermagemRowRegExp( _data, _anotacao ) {

        anotacaoEnfermagem_dataRegExp = _data;
        anotacaoEnfermagem_textRegExp = _anotacao;

    }

    function setPrescMedicaRowData( _row, _data, _medicacao, _via, _posologia, _horario, _relatorio, _disabled ) {
        if ( _row < 0 || _row > prescMedica_data.length ) {
            throw new Error("Invalid row index");
        }

        prescMedica_data[ _row ].disabled = _disabled;
        prescMedica_data[ _row ].data = _data;
        prescMedica_data[ _row ].medicacao = _medicacao;
        prescMedica_data[ _row ].via = _via;
        prescMedica_data[ _row ].posologia = _posologia;
        prescMedica_data[ _row ].horario = _horario;
        prescMedica_data[ _row ].relatorio = _relatorio;

        $( $( prescMedica_dataSelector, prescMedica_tbodySelector )[ _row ] ).text( _data );
        $( $( prescMedica_medicacaoSelector, prescMedica_tbodySelector )[ _row ] ).text( _medicacao );
        $( $( prescMedica_viaSelector, prescMedica_tbodySelector )[ _row ] ).text( _via );
        $( $( prescMedica_posologiaSelector, prescMedica_tbodySelector )[ _row ] ).text( _posologia );
        $( $( prescMedica_horarioSelector, prescMedica_tbodySelector )[ _row ] ).text( _horario );
        // $($(prescMedica_relatorioSelector, prescMedica_tbodySelector)[_row]).val(_relatorio);

        if ( prescMedica_data[ _row ].relatorio ) {
            $( $( prescMedica_relatorioSelector, prescMedica_tbodySelector )[ _row ] ).text("(x)");
        }else {
            $( $( prescMedica_relatorioSelector, prescMedica_tbodySelector )[ _row ] ).text("( )");
        }

        $( "tr", prescEnfermagem_tbody ).hide();
        $( "." + prescEnfermagemState, prescEnfermagem_tbody ).show();
    }

    function setPrescMedicaRowRegExp( _row, _relatorio ) {
        if ( _row < 0 || _row > prescMedica_data.length ) {
            throw new Error("Invalid row index");
        }

        prescMedica_relatorioRegExp[ _row ] = _relatorio;
    }

    function setPrescEnfermagemState( _prescEnfermagemState ) {
        prescEnfermagemState = _prescEnfermagemState;

        $( "tr", prescEnfermagem_tbody ).hide();
        $( "." + prescEnfermagemState, prescEnfermagem_tbody ).show();
    }
    //endregion

    //region Methods

    function init( selector ) {
        $( selector ).append( html );

        $( alergiaMedicamentosa_divSim ).click(function() {
            if ( !alergiaMedicamentosa_disabled ) {
                alergiaMedicamentosa_status = true;

                $( alergiaMedicamentosa_spanSim ).text("X");
                $( alergiaMedicamentosa_spanNao ).text("   ");

                $( alergiaMedicamentosa_textSelector ).show();
            }
        });

        $( alergiaMedicamentosa_divNao ).click(function() {
            if ( !alergiaMedicamentosa_disabled ) {
                alergiaMedicamentosa_status = false;

                $( alergiaMedicamentosa_spanNao ).text("X");
                $( alergiaMedicamentosa_spanSim ).text("   ");

                $( alergiaMedicamentosa_textSelector ).hide();
            }
        });

        $( prescMedica_relatorioSelector, prescMedica_tbodySelector ).click(function() {
            // console.log(this);
            var row = $( prescMedica_relatorioSelector, prescMedica_tbodySelector ).index( this );
            if ( !prescMedica_data[ row ].relatorio.disabled ) {
                prescMedica_data[ row ].relatorio = !prescMedica_data[ row ].relatorio;

                if ( prescMedica_data[ row ].relatorio ) {
                    $( this ).text("(x)");
                }else {
                    $( this ).text("( )");
                }
            }
        });


        $( ".content" ).tabs();
    }

    function open() {
        $( prontuarioSelector ).show();

        updateData();
    }

    function updateData() {
        $( nomeDisplaySelector ).text( nomeText );
        $( dataNascimentoDisplaySelector ).text( dataNascimentoText );
        $( idadeDisplaySelector ).text( idadeText );
        $( sexoDisplaySelector ).text( sexoText );
        $( estadoCivilDisplaySelector ).text( estadoCivilText );
        $( profissaoDisplaySelector ).text( profissaoText );
        $( paiDisplaySelector ).text( paiText );
        $( maeDisplaySelector ).text( maeText );
        $( dataInternacaoDisplaySelector ).text( dataInternacaoText );
        $( leitoDisplaySelector ).text( leitoText );
        $( antecedentesHospitalaresDisplaySelector ).text( antecedentesText );
        $( hipoteseDiagnosticaDisplaySelector ).text( hipoteseText );
        $( observacoesDisplaySelector ).text( observacoesText );
        $( pesoDisplaySelector ).text( pesoText );
        $( alturaDisplaySelector ).text( alturaText );
        $( circunferenciaAbdominalSelector ).text( circunferenciaAbdominalText );

        $( alergiaMedicamentosa_textSelector ).prop( "disabled", alergiaMedicamentosa_disabled );

        if ( alergiaMedicamentosa_status ) {
            $( alergiaMedicamentosa_spanSim ).text( alergiaMedicamentosa_status_x );
            $( alergiaMedicamentosa_spanNao ).text( alergiaMedicamentosa_status_empty );

            $( alergiaMedicamentosa_textSelector ).val( alergiaMedicamentosa_text );
            $( alergiaMedicamentosa_textSelector ).show();
        }else {
            $( alergiaMedicamentosa_spanSim ).text( alergiaMedicamentosa_status_empty );
            $( alergiaMedicamentosa_spanNao ).text( alergiaMedicamentosa_status_x );

            $( alergiaMedicamentosa_textSelector ).hide();
        }

        for ( row = 0; row < prescMedica_data.length; row++ ) {
            $( $( prescMedica_dataSelector, prescMedica_tbodySelector )[ row ] ).text( prescMedica_data[ row ].data );
            $( $( prescMedica_medicacaoSelector, prescMedica_tbodySelector )[ row ] ).text( prescMedica_data[ row ].medicacao );
            $( $( prescMedica_viaSelector, prescMedica_tbodySelector )[ row ] ).text( prescMedica_data[ row ].via );
            $( $( prescMedica_posologiaSelector, prescMedica_tbodySelector )[ row ] ).text( prescMedica_data[ row ].posologia );
            $( $( prescMedica_horarioSelector, prescMedica_tbodySelector )[ row ] ).text( prescMedica_data[ row ].horario );
            // $($(prescMedica_relatorioSelector, prescMedica_tbodySelector)[row]).val(prescMedica_data[row].relatorio);
            if ( prescMedica_data[ row ].relatorio ) {
                $( $( prescMedica_relatorioSelector, prescMedica_tbodySelector )[ row ] ).text("(x)");
            }else {
                $( $( prescMedica_relatorioSelector, prescMedica_tbodySelector )[ row ] ).text("( )");
            }

        }

        for ( row = 0; row < ssvv_data.length; row++ ) {
            var _disabled = ssvv_data[ row ].disabled;

            $( $( ssvv_dataSelector, ssvv_tbodySelector )[ row ] ).text( ssvv_data[ row ].data );
            $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ row ] ).val( ssvv_data[ row ].pa );
            $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ row ] ).val( ssvv_data[ row ].fc );
            $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ row ] ).val( ssvv_data[ row ].fr );
            $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ row ] ).val( ssvv_data[ row ].sat );
            $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ row ] ).val( ssvv_data[ row ].temp );

            // $($(ssvv_dataSelector, ssvv_tbodySelector)[_row]).text(_data);
            $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ row ] ).prop( "disabled", _disabled );
            $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ row ] ).prop( "disabled", _disabled );
            $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ row ] ).prop( "disabled", _disabled );
            $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ row ] ).prop( "disabled", _disabled );
            $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ row ] ).prop( "disabled", _disabled );
        }


        $( $( anotacaoEnfermagem_dataSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).val( anotacaoEnfermagem_data );
        $( $( anotacaoEnfermagem_anotacaoSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).val( anotacaoEnfermagem_text );

    }

    function updateValues() {
        nomeText = $( nomeDisplaySelector ).text();
        dataNascimentoText = $( dataNascimentoDisplaySelector ).text();
        idadeText = $( idadeDisplaySelector ).text();
        sexoText = $( sexoDisplaySelector ).text();
        estadoCivilText = $( estadoCivilDisplaySelector ).text();
        profissaoText = $( profissaoDisplaySelector ).text();
        paiText = $( paiDisplaySelector ).text();
        maeText = $( maeDisplaySelector ).text();
        dataInternacaoText = $( dataInternacaoDisplaySelector ).text();
        leitoText = $( leitoDisplaySelector ).text();
        antecedentesText = $( antecedentesHospitalaresDisplaySelector ).text();
        hipoteseText = $( hipoteseDiagnosticaDisplaySelector ).text();
        observacoesText = $( observacoesDisplaySelector ).text();
        pesoText = $( pesoDisplaySelector ).text();
        alturaText = $( alturaDisplaySelector ).text();
        circunferenciaAbdominalText = $( circunferenciaAbdominalSelector ).text();

        // alergiaMedicamentosa_disabled = $(alergiaMedicamentosa_textSelector).prop('disabled', );

        // if(alergiaMedicamentosa_status){
        //     alergiaMedicamentosa_status_x = $(alergiaMedicamentosa_spanSim).text();
        //     alergiaMedicamentosa_status_empty = $(alergiaMedicamentosa_spanNao).text();

        //     alergiaMedicamentosa_text = $(alergiaMedicamentosa_textSelector).val();
        //     $(alergiaMedicamentosa_textSelector).show();
        // }else{
        //     alergiaMedicamentosa_status_empty = $(alergiaMedicamentosa_spanSim).text();
        //     alergiaMedicamentosa_status_x = $(alergiaMedicamentosa_spanNao).text();

        //     $(alergiaMedicamentosa_textSelector).hide();
        // }

        for ( row = 0; row < prescMedica_data.length; row++ ) {
            prescMedica_data[ row ].data = $( $( prescMedica_dataSelector, prescMedica_tbodySelector )[ row ] ).text();
            prescMedica_data[ row ].medicacao = $( $( prescMedica_medicacaoSelector, prescMedica_tbodySelector )[ row ] ).text();
            prescMedica_data[ row ].via = $( $( prescMedica_viaSelector, prescMedica_tbodySelector )[ row ] ).text();
            prescMedica_data[ row ].posologia = $( $( prescMedica_posologiaSelector, prescMedica_tbodySelector )[ row ] ).text();
            prescMedica_data[ row ].horario = $( $( prescMedica_horarioSelector, prescMedica_tbodySelector )[ row ] ).text();
        }

        for ( row = 0; row < ssvv_data.length; row++ ) {
            var _disabled = ssvv_data[ row ].disabled;

            ssvv_data[ row ].data = $( $( ssvv_dataSelector, ssvv_tbodySelector )[ row ] ).text();
            ssvv_data[ row ].pa = $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ row ] ).val();
            ssvv_data[ row ].fc = $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ row ] ).val();
            ssvv_data[ row ].fr = $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ row ] ).val();
            ssvv_data[ row ].sat = $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ row ] ).val();
            ssvv_data[ row ].temp = $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ row ] ).val();
        }


        anotacaoEnfermagem_data = $( $( anotacaoEnfermagem_dataSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).val();
        anotacaoEnfermagem_text = $( $( anotacaoEnfermagem_anotacaoSelector, anotacaoEnfermagem_tbodySelector )[ 0 ] ).val();
    }

    function close() {
        updateValues();
        $( prontuarioSelector ).hide();
    }

    function isDataValid() {
        var row;

        //Internação

        if ( !alergiaMedicamentosa_disabled ) {
            if ( alergiaMedicamentosa_correctStatus == alergiaMedicamentosa_status )
            {
                if ( alergiaMedicamentosa_status ) {
                    if ( !alergiaMedicamentosa_regExp.test( alergiaMedicamentosa_text ) ) {
                        return false;
                    }
                }
            }else {
                return false;
            }

        }



        //Precrição Médica
        for ( row = 0; row < prescMedica_data.length; row++ ) {

            if ( !prescMedica_data[ row ].disabled ) {
                if ( !prescMedica_data[ row ].relatorio )
                    return false;
            }
        }

        //TODO prescrição da Enfermagem

        for ( row = 0; row < ssvv_data.length; row++ ) {
            //if row is not enabled, dont check if vars are valid
            if ( !ssvv_data[ row ].disabled ) {
                // data = $($(ssvv_dataSelector, ssvv_tbodySelector)[row]).text();
                pa = $( $( ssvv_pressaoArterialSelector, ssvv_tbodySelector )[ row ] ).val();
                fc = $( $( ssvv_frequenciaCardiacaSelector, ssvv_tbodySelector )[ row ] ).val();
                fr = $( $( ssvv_frequenciaRespiratoriaSelector, ssvv_tbodySelector )[ row ] ).val();
                sat = $( $( ssvv_saturacaoSelector, ssvv_tbodySelector )[ row ] ).val();
                temp = $( $( ssvv_temperaturaSelector, ssvv_tbodySelector )[ row ] ).val();

                // if(!ssvv_regExps[row].data.test(data))
                //     return false;
                if ( !ssvv_regExps[ row ].pa.test( pa ) )
                    return false;
                if ( !ssvv_regExps[ row ].fc.test( fc ) )
                    return false;
                if ( !ssvv_regExps[ row ].fr.test( fr ) )
                    return false;
                if ( !ssvv_regExps[ row ].sat.test( sat ) )
                    return false;
                if ( !ssvv_regExps[ row ].temp.test( temp ) )
                    return false;
            }
        }
        return true;
    }

    //endregion
    //Public Interface

    window.Prontuario = {
        open:open,
        close:close,
        isDataValid: isDataValid
    };
    return {
        init: init,

        open: open,
        close: close,
        isDataValid: isDataValid,
        updateDate: updateData,

        getNome: getNome,
        getDataNascimento: getDataNascimento,
        getIdade: getIdade,
        getSexo: getSexo,
        getEstadoCivil: getEstadoCivil,
        getProfissao: getProfissao,
        getPai: getPai,
        getMae: getMae,
        getDataInternacao: getDataInternacao,
        getLeito: getLeito,
        getAntecedentes: getAntecedentes,
        getHipotese: getHipotese,
        getObservacoes: getObservacoes,
        getPeso: getPeso,
        getAltura: getAltura,
        getCircunferenciaAbdominal: getCircunferenciaAbdominal,

        setNome: setNome,
        setDataNascimento: setDataNascimento,
        setIdade: setIdade,
        setAlergiaMedicamentosa: setAlergiaMedicamentosa,
        setDisableAlergiaMedicamentosa: setDisableAlergiaMedicamentosa,
        setSexo: setSexo,
        setEstadoCivil: setEstadoCivil,
        setProfissao: setProfissao,
        setPai: setPai,
        setMae: setMae,
        setDataInternacao: setDataInternacao,
        setLeito: setLeito,
        setAntecedentes: setAntecedentes,
        setHipotese: setHipotese,
        setObservacoes: setObservacoes,
        setPeso: setPeso,
        setAltura: setAltura,
        setCircunferenciaAbdominal: setCircunferenciaAbdominal,

        getPrescEnfermagemState: getPrescEnfermagemState,
        setPrescEnfermagemState: setPrescEnfermagemState,

        addToRelatorio:addToRelatorio,

        setSsvvRowData: setSsvvRowData,
        setSsvvRowRegExp: setSsvvRowRegExp,

        setAnotacaoEnfermagemRowData: setAnotacaoEnfermagemRowData,
        setAnotacaoEnfermagemRowRegExp: setAnotacaoEnfermagemRowRegExp,

        setPrescMedicaRowData: setPrescMedicaRowData,
        setPrescMedicaRowRegExp: setPrescMedicaRowRegExp
    };

});
