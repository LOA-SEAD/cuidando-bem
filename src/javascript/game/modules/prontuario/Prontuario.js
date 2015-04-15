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



    var nomeDisplaySelector = "#pront_nome";
    var nomeText;

    var dataDisplaySelector = "#pront_data_nascimento";
    var dataText;

    var idadeDisplaySelector = "#pront_idade";
    var idadeText;

    var sexoDisplaySelector = "#pront_sexo";
    var sexoText;

    var estadoCivilDisplaySelector = "#pront_estado_civil";
    var estadoCivilext;

    var profissaoDisplaySelector = "#pront_profissao";
    var profissaoText;

    var paiDisplaySelector = "#pront_nome_pai";
    var paiText;

    var maeDisplaySelector = "#pront_nome_mae";
    var maeText;

    var dataInternacaoDisplaySelector = "#";
    var dataInternacaoText;

    var leitoDisplaySelector = "#pront_numero_leito";
    var leitoText;

    var antecedentesHospitalares = "#pront_antecedentes";
    var antecedentesText;

    var hipoteseDiagnosticaDisplaySelector = "#pront_hipotese_diagnostica";
    var hipoteseText;

    var observacoesDisplaySelector = "#pront_observacoes";
    var observacoesText;

    //TODO: Radio button e caixa de texto para Alergia medicamentosa

    var pesoDisplaySelector = "#pront_peso";
    var pesoText;

    var alturaDisplaySelector = "#pront_altura";
    var alturaText;

    var circunferenciaAbdominalSelector = "#pront_circunferencia_abdominal";
    var circunferenciaAbdominalText;

    //TODO: Prescrição Médica

    //TODO: Prescrição de Enfermagem

    //TODO: SSVV

    //TODO: Anotação de Enfermagem

    //endregion
    //endregion

    //region Gets
    function getNome(){
        return nomeText;
    }

    function getData(){
        return dataText;
    }

    function getIdade(){
        return idadeText;
    }

    function getSexo(){
        return sexoText;
    }

    function getEstadoCivil(){
        return estadoCivilext;
    }

    function getProfissao(){
        return profissaoText;
    }

    function getPai(){
        return paiText;
    }

    function getMae(){
        return maeText;
    }

    function getDataInternacao(){
        return dataInternacaoText;
    }

    function getLeito(){
        return leitoText;
    }

    function getAntecedentes(){
        return antecedentesText;
    }

    function getHipotese(){
        return hipoteseText;
    }

    function getObservacoes(){
        return observacoesText;
    }

    function getPeso(){
        return pesoText;
    }

    function getAltura() {
        return alturaText;
    }

    function getCircunferenciaAbdominal(){
        return circunferenciaAbdominalText;
    }

    //endregion

    //region Sets
    function setNome(_nomeText){
        nomeText = _nomeText;
    }

    function setData(_dataText){
        dataText = _dataText;
    }

    function setIdade(_idadeText){
        idadeText = _idadeText;
    }

    function setSexo(_sexoText){
        sexoText = _sexoText;
    }

    function setEstadoCivil(_estadoCivilext){
        estadoCivilext = _estadoCivilext;
    }

    function setProfissao(_profissaoText){
        profissaoText = _profissaoText;
    }

    function setPai(_paiText){
        paiText = _paiText;
    }

    function setMae(_maeText){
        maeText = _maeText;
    }

    function setDataInternacao(_dataInternacaoText){
        dataInternacaoText = _dataInternacaoText;
    }

    function setLeito(_leitoText){
        leitoText = _leitoText;
    }

    function setAntecedentes(_antecedentesText){
        antecedentesText = _antecedentesText;
    }

    function setHipotese(_hipoteseText){
        hipoteseText = _hipoteseText;
    }

    function setObservacoes(_observacoesText){
        observacoesText = _observacoesText;
    }

    function setPeso(_pesoText){
        pesoText = _pesoText;
    }

    function setAltura(_alturaText) {
        alturaText = _alturaText;
    }

    function setCircunferenciaAbdominal(_circunferenciaAbdominalText){
        circunferenciaAbdominalText = _circunferenciaAbdominalText;
    }
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
        close: close,

        getNome: getNome,
        getData: getData,
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
        setData: setData,
        setIdade: setIdade,
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
        setCircunferenciaAbdominal: setCircunferenciaAbdominal

    }

});