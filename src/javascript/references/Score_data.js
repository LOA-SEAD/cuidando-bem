define(function ()
{
    function Score(_name, _score){
        this.name = _name;
        this.score = _score;
    }

    return {
        general: {},
        tutorial: {
            identificarPaciente: new Score("Ver pulseira/identifica��o do paciente", 100),
            pegarOximetro: new Score("Pegar ox�metro", 50),
            pegarAparelhoPressao: new Score("Pegar aparelho de press�o", 50),
            pegarTermometro: new Score("Pegar term�metro", 50),
            pegarRelogio: new Score("Pegar rel�gio", 50),
            lavarMaosAntes: new Score("Lavar as m�os", 200),
            verTemperatura: new Score("Ver temperatura", 100),
            verPressao: new Score("Ver press�o", 100),
            verSaturacao: new Score("Ver satura��o de O2", 100),
            verFrequenciaRespiratoria: new Score("Ver frequ�ncia respirat�ria", 100),
            lavarMaosDepois: new Score("Lavar as m�os ap�s procedimento", 200),
            anotarNoProntuario: new Score("Anotar prontu�rio", 250)
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
