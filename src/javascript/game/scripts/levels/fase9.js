/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase9;
         var Scores = require("Scores_data").fase9;
        //endregion

        var level = new Level("Level 9");
        console.groupCollapsed(level.getName());
    
    
    
     var
            recepcao,
            corredor,
            alaFeminina,
            centroCirurgico,
            sala_de_leitos,
            leito,
            posto_de_enfermagem,
            farmacia,
            gaveta,
            pulseira,
            prontuario,
            zoom;

        //region Scenes
    
    
          
        // region CENTRO CIRURGICO
    
     var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: " + centroCirurgico.getName());
            });
    
    
       
    function corredorIrCentroCirurgico() {
        
                core.changeScene(6);
                if(level.getFlag("score_irCentroCirurgico_horaErrada").getValue() == false){

                    level.getFlag("score_irCentroCirurgico_horaErrada").setValue(true);
                    core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                    console.log("PERDEU 25 PONTOS");
                    
                }


        }
    
        //endregion CENTRO CIRURGICO
    
    
            // region ALA FEMININA
    
    
         var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
            
            });

    
    
    
              function corredorIrAlaFeminina() {
             core.changeScene(7);
            
            if (level.getFlag("score_iralaFeminina_horaErrada").getValue() == false) {
                
                    level.getFlag("score_iralaFeminina_horaErrada").setValue(true);
                    core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                   console.log("PERDEU 25 PONTOS");
                
            }

        }
        //endregion ALA FEMININA
    
    

     
        //region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
             
            });
    
    
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
    

        
        recepcao.registerDialogs([
            
        
            
        ]);
    
    
    
            function recepcaoIrCorredor() {
                console.log("Ir para o corredor");
                core.changeScene(1);
        }


        function conversarRecepcionista() {
       
        }
    
    
     //endregion RECEPCAO
    
    
    
     //region CORREDOR


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
              

            })
            .onUnload(function () {
                console.log("Saindo do corredor");
            });
    
    
        corredor.registerDialogs([
                  
    ]);
    
    
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



          /* new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function () {
                core.closeCommandBar();
                console.log("Abrir diálogo com o mentor");
                
                if(level.getFlag("ir_AlaMasculina_primeiraVez").getValue() == false)
                        core.openDialog(0);
                else
                    ;

                       if (level.getFlag("fim_fase").getValue() == true)
                    core.openDialog(6);

            })
                .setVisibility(true)*/
    ]);
   
        function corredorIrFarmacia() {
             
                        core.changeScene(4);
                      
      
        }
  
        function corredorIrPostoEnfermagem() {
            
                    core.changeScene(5); 
        }
    
    
        function corredorIrAlaMasculina() {
        
            core.changeScene(2);    
        }
    
    
    
    
      //region ALA MASCULINA


      /*var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function () {
                
                
                
                console.log("Load scene: " + alaMasculina.getName());
                
                
                 core.setInteractiveObjectVisible("io-conversar_com_paciente", false);
                
                
                if(level.getFlag("pegou_tudo_postoEnfermagem").getValue() == true)
                        core.setInteractiveObjectVisible("io-conversar_com_paciente", true);
                else   
                    if(level.getFlag("ler_prontuario").getValue() == true)
                            ;
                    else   
                {
                    level.getFlag("conversar_paciente").setValue(true);
                    core.openDialog(0);
                    
                }
             
                
                
                
            });*/
    

    
        
            
     alaMasculina.registerDialogs([

                        // 0
            
             new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[0])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            

                //1 
            
            new Dialog(lib.characters.pacientes.josivaldo)
                .setText(Dialogs.ala_masculina[1])
                .registerOption("", function () {
                core.closeDialog();
            }),
         
         
            // 2
         
         
          new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.ala_masculina[2], function () {
                   level.getFlag("ler_prontuario").setValue(true);  
                    core.closeDialog();
            })
                .registerOption(Dialogs.ala_masculina[3], function () {
                core.openDialog(3);
            })
                .setRandomize(true),
         
         // 3
         
         
           new Dialog(lib.characters.mentor)
                .setText(Dialogs.ala_masculina[4])
                .registerOption("", function () {
                core.closeDialog();
            }),
         
         // 4
         
           new Dialog(lib.characters.mentor)
                    .setText(Alertas.lavar_maos.tipo3)
                    .registerOption("", function () {
                core.closeDialog();
            }),
         
        
    ]);
         
    
    

    alaMasculina.registerInteractiveObjects([  
    
    
      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function () {
                console.log("voltando para corredor");

                core.changeScene(1);

            }),
        
        
          
         new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
                .setCssClass("intObj-ir_leito_fase3")
                .onClick(function () {

                    if (level.getFlag("ir_leito_paciente").getValue() == false) {
                        level.getFlag("ir_leito_paciente").setValue(true);
                        console.log("Abrir diálogo com paciente 6");
                        core.registerScoreItem(Scores.irAoLeitoCorreto);
                        core.changeScene(3);
                    }

                

            })
           .setVisibility(true),
        
        
        

 ]);
    
     alaMasculina.registerActions([   

    
   
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function () {
                 
                        
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                //        core.registerScoreItem(Scores.verProntuario);         
                 
              
            })  
                .setVisibility(true),
            
    
         
         
         ]);  

    

       //endregion ALA MASCULINA
   
    
    
    
    
    //endregion CORREDOR
    

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

       //region Register Scenes

        level.registerScene(recepcao);  //00
        level.registerScene(corredor);  //01
        level.registerScene(alaMasculina);  //02
        level.registerScene(leito);  //03
        level.registerScene(farmacia);  //04
        level.registerScene(posto_de_enfermagem);  //05
        level.registerScene(centroCirurgico);  //06
        level.registerScene(alaFeminina);  //07

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded
            
            level.getFlag("score_iralaFeminina_horaErrada").setValue(false);
            level.getFlag("score_irCentroCirurgico_horaErrada").setValue(false);
            
        });
    
    
         level.registerFlag(new Flag("score_iralaFeminina_horaErrada"), false);
        level.registerFlag(new Flag("score_irCentroCirurgico_horaErrada"), false);
    
    
    

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 9);

        console.groupEnd();

    });