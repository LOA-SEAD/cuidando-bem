/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */
define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, freqRespiratoria) {

        //region Imports
        var Dialogs = require('Dialogs_data').fase1;
        var Alerts = require('Dialogs_data').alertas;
        //endregion

        var level = new Level("Level 8");
        console.groupCollapsed(level.getName());

        var flags_on = true;
        var visibility = false;

        //region Scenes

        level.setSetupScript(function(){

            Pulseira.setNameRegExp(/João Manoel Ribeiro/);
            Pulseira.setLeitoRegExp(/0*2/);
            Pulseira.setDataRegExp(/07\/06\/1956/);
            Pulseira.disable();
            Pulseira.setName("Testando setName de pulseira");

            Prontuario.setNome("João Manoel Ribeiro");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("07/06/1956");
            Prontuario.setIdade("58 anos");
            Prontuario.setProfissao("Comerciante");
            Prontuario.setPai("Joaquim Casagrande");
            Prontuario.setMae("Lúcia Moraes Casagrande");

            Prontuario.setAlergiaMedicamentosa(true, "Dipirona");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("13/05/2015");
            Prontuario.setLeito("02 - Leito Masculino");
            Prontuario.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)");
            Prontuario.setHipotese("Crise hipertensiva");
            Prontuario.setObservacoes("");

            Prontuario.setPeso("87");
            Prontuario.setAltura("1,62");
            Prontuario.setCircunferenciaAbdominal("115");

            Prontuario.setPrescMedicaRowData(0, "15/03", "Captopril", "Oral", "comp 75 mg", "2x dia", "");
            Prontuario.setPrescMedicaRowData(1, "15/03", "Ácido acetilsalicílico (AAS)", "Oral", "comp 100 mg", "1x dia", "");


            Prontuario.setSsvvRowData(0, '15/03', '', '', '', '', '', false);
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setPrescEnfermagemState("decubito");

            Prontuario.setSsvvRowRegExp(0,
                new RegExp(''),
                new RegExp(''),
                new RegExp(''),
                new RegExp(''),
                new RegExp(''),
                new RegExp('')
                );

            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
        });


        //region Recepcao
        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setCssClass("scene-lobby")
            .onLoad(function(){
                //Pulseira.open();
                //core.openModalScene("modalOximetro");
                //Prontuario.open();
                //freqRespiratoria.open();

                //core.showEndOfLevel();
            });
        //endregion

        recepcao.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);

        var corredor = lib.scenes.corredor;

        var oximetro = new Scene("modalOximetro", "Oxímetro")
            .setCssClass("modalScene-oximetro")
            .setTemplate("<span class='oximetro-text'>valor unidade</span>");


        //endregion

        //region Level
        //region Register Scenes
        level.registerScene(recepcao);

        level.registerModalScene(oximetro);
        //endregion

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 9);

        console.groupEnd();
    });