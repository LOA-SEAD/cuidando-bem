/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */
define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, Commons, Pulseira, Prontuario) {

        //region Imports
        var Dialogs = require('Dialogs').fase1;
        var Alerts = require('Dialogs').alertas;
        var HTML = require('HTML');
        //endregion

        var level = new Level("Level 8");
        console.groupCollapsed(level.getName());

        var flags_on = true;
        var visibility = false;

        //region Scenes

        Prontuario.setNome("João Manoel Ribeiro");
        Prontuario.setSexo("M");
        Prontuario.setEstadoCivil("Casado");
        Prontuario.setDataNascimento("07/06/1956");
        Prontuario.setIdade("58 anos");
        Prontuario.setPai("Joaquim Casagrande");
        Prontuario.setMae("Lúcia Moraes Casagrande");
        Prontuario.setLeito("02");
        Prontuario.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)");
        Prontuario.setHipotese("Crise hipertensiva");
        //TODO: alergia medicamentosa
        Prontuario.setPeso("87");
        Prontuario.setAltura("1,62");
        Prontuario.setCircunferenciaAbdominal("115");

        //region Recepcao
        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setCssClass("scene-lobby")
            .onLoad(function(){
                //Pulseira.open();
                //core.openModalScene("modalOximetro");

                Prontuario.open();
            });
        //endregion

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

        game.registerLevel(level, 8);

        console.groupEnd();
    });