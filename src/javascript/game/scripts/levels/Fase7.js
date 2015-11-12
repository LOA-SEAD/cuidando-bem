/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase7;
        var Alertas = require("Dialogs_data").alertas;
        // var Scores = require("Scores_data").fase3;
        //endregion

        var level = new Level("Level 7");
        console.groupCollapsed(level.getName());

        //region Scenes

        //region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });
    
    
    
         function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if (level.getFlag("conversar_recepcionista").getValue() == true) { // wont check for flags
                core.closeDialog();
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
    
    

        recepcao.registerDialogs([
            // Dialog 0
           new Dialog(lib.characters.jogador)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            
            
            // 1
            
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[1])
                .registerOption("", function () {
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
    
    
    //region CORREDOR
    
      corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if (level.getFlag("conversar_mentor").getValue() == false) {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(0);
                } 
            })
            .onUnload(function () {
                console.log("Saindo do corredor");
            });
    
    
    
    
    

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            
            
            level.getFlag("conversar_recepcionista").setValue(false);
            
            
            //Script that runs once when the level is loaded or reloaded
        });
    
    
    
            level.registerFlag(new Flag("conversar_recepcionista"), false);
    
    
    

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 7);

        console.groupEnd();

    });