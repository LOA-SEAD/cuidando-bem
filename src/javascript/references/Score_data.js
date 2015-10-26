define(function ()
{
    function Score(_title, _score){
        this.title = _title;
        this.score = _score;
    }

    return {
        general: {},
        tutorial: {
            identificarPaciente: new Score("Ver pulseira/identificação do paciente", 100),
            pegarOximetro: new Score("Pegar oxímetro", 50),
            pegarAparelhoPressao: new Score("Pegar aparelho de pressão", 50),
            pegarTermometro: new Score("Pegar termômetro", 50),
            pegarRelogio: new Score("Pegar relógio", 50),
            lavarMaosAntes: new Score("Lavar as mãos", 200),
            verTemperatura: new Score("Ver temperatura", 100),
            verPressao: new Score("Ver pressão", 100),
            verSaturacao: new Score("Ver saturação de O2", 100),
            verFrequenciaRespiratoria: new Score("Ver frequência respiratória", 100),
            lavarMaosDepois: new Score("Lavar as mãos após procedimento", 200),
            anotarNoProntuario: new Score("Anotar no prontuário", 250)
        },
        level1: {
            irPostoEnfermagem_horaErrada: new Score("Ir ao posto de enfermagem em hora indevida", -50),
            lavarMaosAntes: new Score("Lavar as mãos antes de examinar paciente", 200),
            falarComPaciente: new Score("Falar com Paciente", 50),
            verificarPulseira: new Score("Verificar Pulseira", 100),
            examinarPaciente: new Score("Examinar Paciente", 150),
            lavarMaosDepois: new Score("Lavar as mãos após procedimento", 200),
            falarComMentorApos: new Score("Falar com mentor após examinar paciente", 50),
            pegarCoxim: new Score("Pegar Coxim", 50),
            lavarMaosProntuario: new Score("Lavar mãos antes de pegar prontuario", 200),
            naoLavarMaosProntuario: new Score("Não lavar as mãos antes de pegar prontuario", -100),
            anotarNoProntuario: new Score("Anotar no prontuário", 50)
        },
        level2: {
            irPostoEnfermagem_horaErrada: new Score("Ir ao posto de enfermagem em hora indevida", -25),
            irFarmacia_horaErrada: new Score("Ir à farmácia em hora indevida", -25),
            irAlaFeminina_horaErrada: new Score("Ir à farmácia sem precisar", -25),
            lavaMaosAntes: new Score("Lavar maos antes de pegar no prontuário", 200),
            checarProntuario: new Score("Checar Prontuário", 150),
            pegarKitGlicemia: new Score("Pegar kit de glicemia", 50),
            pegarAlgodao: new Score("Pegar algodão seco", 50),
            pegarLuvas: new Score("Pegar luvas", 50),
            pegarBandeja: new Score("Pegar bandeja", 50),
            lavarMaosAntesLeito: new Score("Lavar mãos antes de ir para o leito do paciente", 200),
            falarComPaciente: new Score("Conversar com paciente", 50),
            verificarPulseira: new Score("Verificar Pulseira", 50),
            selecionarBandeja: new Score("Selecionar Bandeja", 50),
            porLuvas: new Score("Vestir luvas", 50),
            usarAlgodao: new Score("Usar Algodão", 50),
            realizarTesteGlicemia: new Score("Realizar teste de glicemia", 100),
            usarAlgodao2: new Score("Usar Algodão", 50),
            explicarResultado: new Score("Explicar resultado do teste para o paciente", 150),
            algodaoLixoCerto: new Score("Jogar algodão no lixo branco", 50),
            agulhaLixoCerto: new Score("Jogar agulha no lixo de perfuro cortante", 50),
            elevarGradeDaCama: new Score("Elevar grade da cama", 150),
            lavaoMaosAposLixos: new Score("Lavar as mãos após procedimentos", 200),
            anotarNoProntuario: new Score("Anotar no prontuário", 250)
        },
        level3: {

        },
        level4: {

        },
        level5: {

        },
        level6: {

        },
        level7: {

        },
        level8: {

        },
        level9: {

        }
    }
});
