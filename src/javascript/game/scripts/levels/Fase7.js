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
    
     function corredorIrAlaFeminina() {
            console.log("Action: corredorIrAlaFeminina");
             if(level.getFlag("ir_AlaFeminina_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("ir_AlaFeminina_horaErrada").setValue(true);
                core.changeScene(2);
            }
             else  
                 core.changeScene(2);
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
            console.log("Action: corredorIrAlaMasculinaHoraErrada");
             if(level.getFlag("ir_AlaMasculina_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irAlaMasculina_horaErrada);
                level.getFlag("ir_AlaMasculina_horaErrada").setValue(true);
                core.changeScene(6);
            }
             else  
                 core.changeScene(6);
        }
    
    
    
      corredor.registerInteractiveObjects([

            new InteractiveObject("io-ir_centro_cirurgico", "Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico")
                .onClick(corredorIrCentroCirurgico)
                .setVisibility(true),



            new InteractiveObject("io-ir_farmacia", "Ir para a Farmacia")
                .setCssClass("intObj-goToFarmacia")
                .onClick(corredorIrFarmacia)
                .setVisibility(true),


            new InteractiveObject("io-ir_posto_enfermagem", "Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToPostoEnfermagem")
                .onClick(corredorIrPostoEnfermagem)
                .setVisibility(true),


            new InteractiveObject("io-ir_ala_feminina", "Ir para a Ala Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),
          
            new InteractiveObject("io-ir_ala_masculina", "Ir para a Ala Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick(corredorIrAlaMasculina)
                .setVisibility(true),



            
    ]);
    
    
    
  
        // region ALA FEMININA
    
    
    
            var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaFeminina.getName());
            });
    
    
    
    alaFeminina.registerDialogs([
        
        // 0
        
                // 1 Jogador responde
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.enfermaria_feminina[0], function () {
                core.openDialog(1);
            })
                .registerOption(Dialogs.enfermaria_feminina[1], function () {
                core.openDialog(5);
            })
                .setRandomize(true),
        
        // 1
        
            new Dialog(lib.characters.pacientes.ana)
                    .setText(Dialogs.enfermaria_feminina[2])
                    .registerOption("", function () {
                core.openDialog(2);
            }),
        
        // 2
        
              new Dialog(lib.characters.jogador)
                    .setText(Dialogs.enfermaria_feminina[3])
                    .registerOption("", function () {
                core.openDialog(3);
            }),
        
        // 3
         new Dialog(lib.characters.pacientes.ana)
                    .setText(Dialogs.enfermaria_feminina[4])
                    .registerOption("", function () {
                core.openDialog(4);
            }),
        
        // 4
        
         new Dialog(lib.characters.jogador)
                    .setText(Dialogs.enfermaria_feminina[5])
                    .registerOption("", function () {
                core.closeDialog();
            }),
        
        // 5
        
         new Dialog(lib.characters.mentor)
                    .setText(Dialogs.enfermaria_feminina[6])
                    .registerOption("", function () {
                core.openDialog(0);
            }),
        
        // 6 - ALERTA CONVERSAR PACIENTE
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.conversar_paciente)
                .registerOption("", function() {
                    core.closeDialog();
                }),
        
    ]);
    
    
    
        alaFeminina.registerActions([

       new Action("btn-falar_paciente", "Conversar com a Paciente")
                .setCssClass("action-leito-char-02")
                .onClick(function () {
                    level.getFlag("conversar_paciente").setValue(true);
                    core.openDialog(0);
                }),
    ]);
    
    
    
    alaFeminina.registerInteractiveObjects([

             new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function () {
                    if(level.getFlag("conversar_paciente").getValue() == false)
                        core.openDialog(6);
                    else {
                console.log("voltando para corredor");
                core.changeScene(1);  
                    
                    } 
                
            }),

          ]);
    
    
    
    
     //  region FARMACIA
    
            var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function () {
                console.log("Load scene: " + farmacia.getName());
            });
    
    
    farmacia.registerDialogs([
        
          new Dialog(lib.characters.jogador)
                    .setText(Dialogs.farmacia[0])
                    .registerOption("", function () {
                core.closeDialog();
            }),
        
    ]);
    
    
     farmacia.registerActions([

             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {
                core.changeScene(1);
            }),

        ]);
    
    
    farmacia.registerInteractiveObjects([
        
        
             new InteractiveObject("io-falar_farmaceutico", "Falar com o farmacêutico")
                .setCssClass("intObj-talkToFarmaceutico")
                .onClick(function () {
                console.log("Abrindo dialogo com farmaceutico");
                core.openDialog(0);
                    
         }),
        
        
    ]);
    
    
    
    
    
    //  region LEITO
    
            var leito = lib.scenes.leitos.ana.getClone()
            .onLoad(function () {
                console.log("Load scene: " + leito.getName());
            });
    
   
    
    //  region POSTO DE ENFERMAGEM
    
            var posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function () {
                console.log("Load scene: " + posto_de_enfermagem.getName());
                //
            });
    
    
    
        posto_de_enfermagem.registerActions([

             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {
                 core.changeScene(1);
            })

        ]);
    
    //  region ALA MASCULINA
    
            var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaMasculina.getName());
            });
    
    
    
        alaMasculina.registerInteractiveObjects([

           new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function () {
                console.log("voltando para corredor");

                core.changeScene(1);

            })


    ]);

    
    
    
    //  region CENTRO CIRURGICO
    
            var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: " + centroCirurgico.getName());
                //
            });
    
    
    centroCirurgico.registerActions([
        
        
         new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {  
                        centroCirurgicoIrCorredor(); 
                    })
           
        
    ]);
    
     function centroCirurgicoIrCorredor() {
            console.log("Action: centroCirurgicoIrCorredor");
                core.changeScene(1);
        }

    
    
    
    
    
    
    
    
    

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
            level.getFlag("ir_AlaFeminina_horaErrada").setValue(false);
            level.getFlag("ir_postoEnfermagem_horaErrada").setValue(false);
            level.getFlag("conversar_paciente").setValue(false);
            
            
            
            //Script that runs once when the level is loaded or reloaded
        });
    
    
    
            level.registerFlag(new Flag("conversar_recepcionista"), false);
            level.registerFlag(new Flag("conversar_mentor"), false);
            level.registerFlag(new Flag("ir_farmacia_horaErrada"), false);
            level.registerFlag(new Flag("postoEnfermagem_horaErrada"), false);
            level.registerFlag(new Flag("ir_centroCirurgico_horaErrada"), false);
            level.registerFlag(new Flag("ir_AlaMasculina_horaErrada"), false);
            level.registerFlag(new Flag("ir_AlaFeminina_horaErrada"), false);
            level.registerFlag(new Flag("ir_postoEnfermagem_horaErrada"), false);
            level.registerFlag(new Flag("conversar_paciente"), false);
    
    
    

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 7);

        console.groupEnd();

    });