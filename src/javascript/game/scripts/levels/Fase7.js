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
                level.getFlag("conversar_recepcionista").setValue(true);
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
    
    
    
    
        function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            if(level.getFlag("ir_farmacia_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("ir_farmacia_horaErrada").setValue(true);
                core.changeScene(4);
            }
             else  
                core.changeScene(4);
      

        }


        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
             if(level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                level.getFlag("ir_postoEnfermagem_horaErrada").setValue(true);
                core.changeScene(5);
            }
             else  
                 core.changeScene(5);
        }
    
        function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgicoHoraErrada");
            if(level.getFlag("ir_centroCirurgico_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                level.getFlag("ir_centroCirurgico_horaErrada").setValue(true);
                core.changeScene(7);
            }
             else  
                core.changeScene(7);
      

        }


        function corredorIrAlaMasculina() {
            console.log("Action: corredorIrAlaFemininaHoraErrada");
             if(level.getFlag("ir_AlaMasculina_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irAlaMasculina_horaErrada);
                level.getFlag("ir_AlaMasculina_horaErrada").setValue(true);
                core.changeScene(6);
            }
             else  
                 core.changeScene(6);
        }
    
    
    
    // ------------------------------------- continuar Corredor --------------------------------------------
    
    
    
    
            var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaFeminina.getName());
            });
    
            var leito = lib.scenes.leitos.ana.getClone()
            .onLoad(function () {
                console.log("Load scene: " + leito.getName());
            });
    
            var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function () {
                console.log("Load scene: " + farmacia.getName());
            });
    
            var posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function () {
                console.log("Load scene: " + posto_de_enfermagem.getName());
                //
            });
    
            var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaMasculina.getName());
            });
    
            var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: " + centroCirurgico.getName());
                //
            });
    
    
    
    
    
    
    
    
    

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);  //id 0
        level.registerScene(corredor);//id 1
        level.registerScene(alaFeminina);//id 2
        level.registerScene(leito);//id 3
        level.registerScene(farmacia);//id 4
        level.registerScene(posto_de_enfermagem);//id 5
        level.registerScene(alaMasculina);//id 6
        level.registerScene(centroCirurgico);//id 7
    

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            
            
            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("ir_farmacia_horaErrada").setValue(false);
            level.getFlag("postoEnfermagem_horaErrada").setValue(false);
            level.getFlag("ir_centroCirurgico_horaErrada").setValue(false);
            level.getFlag("ir_AlaMasculina_horaErrada").setValue(false);
            
            
            
            //Script that runs once when the level is loaded or reloaded
        });
    
    
    
            level.registerFlag(new Flag("conversar_recepcionista"), false);
            level.registerFlag(new Flag("conversar_mentor"), false);
            level.registerFlag(new Flag("ir_farmacia_horaErrada"), false);
            level.registerFlag(new Flag("postoEnfermagem_horaErrada"), false);
            level.registerFlag(new Flag("ir_centroCirurgico_horaErrada"), false);
            level.registerFlag(new Flag("ir_AlaMasculina_horaErrada"), false);
    
    
    

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 7);

        console.groupEnd();

    });