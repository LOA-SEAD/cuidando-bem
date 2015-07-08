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
        level1: {},
        level2: {},
        level3: {},
        level4: {},
        level5: {},
        level6: {},
        level7: {},
        level8: {},
        level9: {}
    }
});
