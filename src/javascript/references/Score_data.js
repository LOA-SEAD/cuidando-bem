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
            irFarmacia_horaErrada: new Score("Ir à farmácia sem precisar", -25),
            irAlaFeminina_horaErrada: new Score("Ir à ala feminina sem precisar", -25),
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
            lavarMaosAposLixos: new Score("Lavar as mãos após procedimentos", 200),
            anotarNoProntuario: new Score("Anotar no prontuário", 250)
        },
        level3: {

        },
        level4: {

        },
        level5: {
            irPostoEnfermagem_horaErrada: new Score("Ir ao posto de enfermagem em hora indevida", -25),
            irFarmacia_horaErrada: new Score("Ir à farmácia sem precisar", -25),
            irAlaFeminina_horaErrada: new Score("Ir à ala feminina em hora indevida", -25),
            irAlaMasculina_horaErrada: new Score("Ir à ala masculina sem precisar", -25),
            irCentroCirurgico_horaErrada: new Score("Ir ao centro cirurgico sem precisar", -25),
            irAlaMasculina_aposFalaMentor: new Score("Ir à ala masculina mesmo após o que o mentor disse", -25),
            verProntuario: new Score("Ver Prontuário", 150),
            lavarMaosPostoEnfermagem: new Score("Lavar mãos antes de pegar os intrumentos", 200),
            pegarKitGlicemia: new Score("Pegar kit de glicemia", 50),
            pegarAlgodao: new Score("Pegar algodão seco", 50),
            pegarLuvas: new Score("Pegar luvas", 50),
            pegarBandeja: new Score("Pegar bandeja", 50),
            pegarLuvasEstereis: new Score("Pegar luvas estéreis", 50),
            pegarGaze: new Score("Pegar gaze esterilizada", 50),
            pegarFitaHipoalergenica: new Score("Pegar fita adesiva hipoalergênica", 50),
            pegarSoro: new Score("Pegar soro fisiológico 0,9% (250 ml) aquecido", 50),
            pegarSeringa: new Score("Pegar seringa de 20 ml", 50),
            pegarAgulha: new Score("Pegar agulha 40X12", 50),
            pegarTodosInstrumentos: new Score("Pegar todos os instrumentos", 350),
            lavarMaosAntesLeito: new Score("Lavar mãos antes de ir para o leito do paciente", 200),
            falarComPaciente: new Score("Conversar com paciente", 150),
            verificarPulseira: new Score("Verificar Pulseira", 100),
            falarComPaciente2: new Score("Conversar com paciente", 150),
            fazerTesteGlicemia: new Score("Fazer teste de glicemia capilar", 100),
            agulhaLixoCerto: new Score("Jogar agulha no descarpax", 50),
            jogarAlgodaoBandeja: new Score("Jogar agulha na bandeja", 50),
            selecionarMateriaisCurativo: new Score("Selecionar todos os materiais do curativo", 350),
            lavarMaosAntesLuva: new Score("Lavar mãos antes de calçar a luva estéril", 200),
            calcarLuvaEsteril: new Score("Calçar a luva estéril", 150),
            fazerCurativo: new Score("Fazer o curativo na paciente", 150),
            identificarCurativo: new Score("Identificar o curativo feito", 150),
            elevarGradeDaCama: new Score("Elevar grade da cama", 350),
            anotarNoProntuario: new Score("Anotar no prontuário", 350)
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
