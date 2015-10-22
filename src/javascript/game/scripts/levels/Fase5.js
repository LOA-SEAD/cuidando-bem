/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase5;
        //var Alertas = require("Dialogs_data").alertas;
        // var Scores = require("Scores_data").fase5;
        //endregion

        var level = new Level("Level 5");
        console.groupCollapsed(level.getName());

        //var flags_on = true;    // if false it wont check for flags -- tests purpose
        //var visibility = false;
        //if (!flags_on)
        //    visibility = true;

        //region Scenes

        var
        recepcao,
        corredor;
        //alaMasculina,
        //sala_de_leitos,
        //leito,
        //posto_de_enfermagem,
        //gaveta,
        //pulseira,
        //prontuario;

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
                core.changeScene(1);
                console.log("Ir para o corredor");
            } else {
                console.log("Necessita ação: conversar com a recepcionista");
            }
        }

        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.closeDialog();
                })
        ]);

        recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista", "Conversar com a Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .setVisibility(true)
                .onClick(conversarRecepcionista),


            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true)
        ]);
        //endregion

        //region Corredor
        function conversarMentor() {
            console.log("Entrando no corredor");
            /*if(level.getFlag("conversar_mentor").getValue() == false){
                level.getFlag("conversar_mentor").setValue(true);*/
                core.openDialog(0);
        }

        function corredorIrAlaFeminina() {
            //if (level.getFlag("conversar_mentor").getValue() == true) {
                /*if(level.getFlag("examinar_paciente").getValue() == false) {
                    core.changeScene(2);
                } else {
                    if(level.getFlag("coxim").getValue() == true) {
                        core.changeScene(2);
                    }else{
                        core.openDialog(11);
                    }
                }
                console.log("Action: corredorIrSalaLeitos");*/
            /*} else {
                console.log("Necessita ação: falar com mentor");
            }*/
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad( function () {
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0: // first time at 'corredor'
                        core.setInteractiveObjectVisible("io-conversar_mentor", true);
                        core.openDialog(0);
                        break;
                    case 1: // second time at 'corredor'
                        //core.setActionVisible("btn-ir_posto_enfermagem", true);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", true);
                        //core.setActionVisible("btn-ir_sala_leitos", false);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", false);
                        //core.setActionVisible("btn-conversar_mentor", false);
                        core.setInteractiveObjectVisible("io-conversar_mentor", false);
                        break;
                    case 2:
                        //core.setActionVisible("btn-ir_posto_enfermagem", false);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", false);
                        //core.setActionVisible("btn-ir_sala_leitos", true);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", true);
                        break;
                }
            })
            .onUnload(function (){
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0:
                        level.getFlag("passagem_corredor").setValue(1);
                        break;
                    case 1:
                        level.getFlag("passagem_corredor").setValue(2);
                        break;
                    case 2:
                        level.getFlag("passagem_corredor").setValue(3);
                        break;
                }
            });

        corredor.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor[0])
                .registerOption("", function () {
                    core.openDialog(1);
                }),
            // Dialog 1
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[1])
                // resposta correta
                .registerOption("", function () {
                    core.closeDialog();
                })
        ]);

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);
        level.registerScene(corredor);

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        level.registerFlag(new Flag("conversar_recepcionista"), false);
        //level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("passagem_corredor", 0));

        //endregion

        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded
            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("passagem_corredor").setValue(0);
            //level.getFlag("conversar_mentor").setValue(false);
        });

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 5);

        console.groupEnd();

    });
