/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase6;
        var Alertas = require("Dialogs_data").alertas;
        Scores = Scores.level6;
        //endregion

        var level = new Level("Level 6");
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

        //region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
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
            
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            
             new Dialog(lib.characters.jogador)
                .setText(Dialogs.recepcao[1])
                .registerOption("", function () {
                core.closeDialog();
            })
            
            
        ]);
    
    
    
            function recepcaoIrCorredor() {
                console.log("Ir para o corredor");
                core.changeScene(1);
        }


        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }
    
    
     //endregion RECEPCAO
    
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
    
    
        corredor.registerDialogs([
        
               // 0
            
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[0])
                .registerOption("", function () {
                core.openDialog(1);
            }),

                //1 
            
             new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.corredor[1], function () {
                core.openDialog(2);
            })
                .registerOption(Dialogs.corredor[2], function () {
                core.openDialog(3);
            })
                .setRandomize(true),
            
            
            // 2 Mentor Corrige
            
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[3])
                .registerOption("", function () {
                core.closeDialog();
            }),
            
            // 3
        
              new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[4])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            
               //4
            
             new Dialog(lib.characters.mentor)
                    .setText(Alertas.perdido.farmacia)
                    .registerOption("", function () {
                core.closeDialog();
            }),
            
            
         
            
            
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



           new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function () {
                core.closeCommandBar();
                console.log("Abrir diálogo com o mentor");
                
                if(level.getFlag("ir_ala_masculina").getValue() == false)
                        core.openDialog(0);
                else
                    ;

                    /*   if (level.getFlag("fim_fase").getValue() == true)
                    core.openDialog(6);*/

            })
                .setVisibility(true)
    ]);
    
    
    
    function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgico");
                core.changeScene(2);
                if(level.getFlag("score_irCentroCirurgico_horaErrada").getValue() == false){

                    level.getFlag("score_irCentroCirurgico_horaErrada").setValue(true);
                    core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                    
                }
    



        }


        function corredorIrAlaFeminina() {
            
            console.log("Action: corredorIrAlaFeminina");
             core.changeScene(8);
            
            if (level.getFlag("score_iralaFeminina_horaErrada").getValue() == false) {
                
                    level.getFlag("score_iralaFeminina_horaErrada").setValue(true);
                    core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                
            }

        }


        function corredorIrFarmacia() {
    
            console.log("Action: corredorIrFarmacia");
            
            if(level.getFlag("ler_prontuario").getValue() == true){
                      core.changeScene(4);
                        core.openDialog(0); 
            
            }
            
            else {
                
                if (level.getFlag("score_ir_farmacia_horaErrada").getValue() == false){
                
                level.getFlag("score_ir_farmacia_horaErrada").setValue(true);
                core.registerScoreItem(Scores.irFarmacia_horaErrada);

                }
                
                
              //  core.changeScene(4);
             
              
                
                
            }
            
        }
            
                
            
        
    
    


        function corredorIrPostoEnfermagem() {
    
            console.log("Action: corredorIrPostoEnfermagem");
            
            core.changeScene(5);
    
            
       /* if(level.getFlag("pegar_dieta").getValue() == true && level.getFlag("conferir_dieta").getValue() == true)
                core.changeScene(6);
        else
            {
            
                core.changeScene(6);
                
                if(level.getFlag("score_ir_postoEnfermagem_horaErrada").getValue() == false){
                    level.getFlag("score_ir_postoEnfermagem_horaErrada").setValue(true);
                    core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    
                }
            
            }*/
        }



        function corredorIrAlaMasculina() {
            
            console.log("Action: coredorirAlaMasculina");
        
       
            
      //      if(level.getFlag("ir_AlaMasculina_primeiraVez").getValue() == false) 
       //         level.getFlag("ir_AlaMasculina_primeiraVez").setValue(true);
            
        level.getFlag("pegou_tudo_posto_enfermagem").setValue(true);
        if(level.getFlag("pegou_tudo_posto_enfermagem").getValue() == true)
                core.changeScene(3);
            
        core.changeScene(2);
            
            
        }
    
    
    //endregion CORREDOR
    
    
    
      //region ALA MASCULINA


      var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaMasculina.getName());
                level.getFlag("conversar_paciente").setValue(true);
                core.openDialog(0);
            });
    

    
        
            
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
                core.openDialog(2);
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
        
        
        

 ]);
    
     alaMasculina.registerActions([   

    
   
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function () {
              //  if(level.getFlag("lavar_maos").getValue() == false)
               //     core.openDialog(4);   
           //     else {
                        
                        level.getFlag("ler_prontuario").setValue(true);
                        console.log("Action: ler prontuario");
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                //        core.registerScoreItem(Scores.verProntuario);         
                 
        //        }
            })
                .setVisibility(true),
            
            
            /*  new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function () {
                    
                if(level.getFlag("lavar_maos").getValue() == false){
                    level.getFlag("lavar_maos").setValue(true);
                  //   core.registerScoreItem(Scores.lavarMaos);      
                 
                    
                }
                   
            })
            .setVisibility(true),*/
         
         
         ]);  

    

       //endregion ALA MASCULINA
   
  
    
    // region FARMACIA
    

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function () {
                
                    console.log("Load scene: " + farmacia.getName());

                
              /*  
                if(level.getFlag("conversar_paciente").getValue() == false)
                           core.openDialog(6);
                           core.changeScene(1);*/
             
            });
    
     

        farmacia.registerDialogs([

            // 0
            
                 new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.farmacia[0], function () {
                core.openDialog(1);
            })
                .registerOption(Dialogs.farmacia[1], function () {
                core.openDialog(3);
            })
                .setRandomize(true),
            
            // 1
            
              new Dialog(lib.characters.paulo)
                .setText(Dialogs.farmacia[2])
                .registerOption("", function () {
                core.closeDialog();
            }),
            
            // 2
            
              new Dialog(lib.characters.mentor)
                .setText(Dialogs.farmacia[3])
                .registerOption("", function () {
                core.closeDialog();
            }),
            
            // 3
            
              new Dialog(lib.characters.mentor)
                .setText(Dialogs.farmacia[4])
                .registerOption("", function () {
                core.openDialog(0);
            }),
            
            // 4
            
             new Dialog(lib.characters.mentor)
                    .setText(Alertas.esqueceu.pegar_dieta)
                    .registerOption("", function () {
                core.closeDialog();
            }),
           
            //5
            
             new Dialog(lib.characters.mentor)
                    .setText(Alertas.esqueceu.conferir_dieta)
                    .registerOption("", function () {
                core.closeDialog();
            }),
            
        
                 
    ]);
    
        

        farmacia.registerActions([

        
             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {
                    
                    
                    if(level.getFlag("pegar_dieta").getValue() == false)        
                        core.openDialog(4);  
                    
                    
                    
                    if(level.getFlag("pegar_dieta").getValue() == true && level.getFlag("conferir_dieta").getValue() == false)
                            core.openDialog(5);
                    
                     if(level.getFlag("pegar_dieta").getValue() == true && level.getFlag("conferir_dieta").getValue() == true)
                            core.changeScene(1);
                  
            }),
            
   
            
                         new Action("btn-pegarFrascoDieta", "Pegar Frasco de Dieta")
                .setCssClass("action-pegarFrascoDieta")
                .onClick(function () {
                    
                    level.getFlag("pegar_dieta").setValue(true);
                 
                      //  core.registerScoreItem(Scores.pegarDieta);
                    
            }),
            
            
            
                         new Action("btn-conferirMedicamento", "Conferir Dieta Prescrita")
                .setCssClass("action-conferir_dieta")
                .onClick(function () {
                    
                    if(level.getFlag("pegar_dieta").getValue() == false)
                        ; // nao faz nada
                    else  {
                        
                    level.getFlag("conferir_dieta").setValue(true);    
                  //  core.registerScoreItem(Scores.conferirDieta);
                    core.openDialog(2);  
                        
                        }
                    
                    
            }),

        ]);
    
    //endregion FARMACIA
    
    
    // region POSTO DE ENFERMAGEM
    
     var posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function () {
                
                
                
                  console.log("Load scene: " + posto_de_enfermagem.getName());
                
                
            /*    if(level.getFlag("").getValue() == true){
               console.log("Load scene: " + posto_de_enfermagem.getName());
                }
                else
                    {
                        console.log("Hora Errada!"); 
                        if(level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false)
                            core.registerScoreItem(Scores.irFarmacia_horaErrada);                    
                        level.getFlag("ir_postoEnfermagem_horaErrada").setValue(true);
                        core.openDialog(2);
                        core.changeScene(1);
                    }
                */
                
             
                
            });
    
    
    
    posto_de_enfermagem.registerDialogs([
        
        
        
        // 0
              new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.posto_enfermagem[0], function () {
                core.closeDialog(0);
            })
                .registerOption(Dialogs.posto_enfermagem[1], function () {
                core.openDialog(1);
            })
                .registerOption(Dialogs.posto_enfermagem[2], function () {
                core.openDialog(1);
            })
                .setRandomize(true),
        
          // 1
        
           new Dialog(lib.characters.mentor)
                .setText(Dialogs.posto_enfermagem[3])
                .registerOption("", function () {
                core.openDialog(0);
            })
        
        
        
]);
    
   
     posto_de_enfermagem.registerInteractiveObjects([
         
            new InteractiveObject("io-abrir_gaveta","Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("gaveta");
                    core.openCommandBar();
                    

                //    core.setInteractiveObjectVisible("io-coxim", !(level.getFlag("coxim").getValue()));
                })
                .setVisibility(true),
         
         
         
             new InteractiveObject("io-pegar_bandeja","Pegar Bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function () {
                    console.log("Action: Pegar bandeja");
                    level.getFlag("pegar_bandeja").setValue(true);
                  //  core.setInteractiveObjectVisible("io-pegar_bandeja", false);
        
                })
                .setVisibility(true)
         
         ]);

    
    
    
        posto_de_enfermagem.registerActions([

             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {
                 //   if(level.getFlag("pegar_copo_descartavel").getValue() == false || level.getFlag("pegar_agua_potavel").getValue() == false)
               //         core.openDialog(0);
                //    else
                  //      core.changeScene(1);
            }),
            
            
              
              new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function () {
                    
              /*      
                if(level.getFlag("lavar_maos").getValue() == false){
                    level.getFlag("lavar_maos").setValue(true);
                     core.registerScoreItem(Scores.lavarMaos);      
                    level.getFlag("score_lavar_maos").setValue(true);
                    
                }
                   */
            })
            .setVisibility(true),
            
            new Action("btn-calcular_dieta", "Calcular Infusão da Dieta")
                .setCssClass("action-calcular_dieta")
                .onClick(function () {
                 //   if(level.getFlag("pegar_copo_descartavel").getValue() == false || level.getFlag("pegar_agua_potavel").getValue() == false)
               //         core.openDialog(0);
                //    else
                  //      core.changeScene(1);
            }),

            
        ]);
        
    
    
    // endregion POSTO DE ENFERMAGEM
    
    
    
    //region LEITO
    
         //  region LEITO

        var leito = lib.scenes.leitos.josivaldo.getClone()
            .onLoad(function () {
                    
            //    if(level.getFlag("pegou_tudo_posto_enfermagem").getValue() == true)
                    core.openDialog(0);
            });
    
    
    
     
    
    leito.registerDialogs([
        
        // 0 
          new Dialog(lib.characters.jogador)
                    .setText(Dialogs.leito_paciente[0])
                    .registerOption("", function () {
                core.openDialog(1);
            }),
        // 1
        new Dialog(lib.characters.pacientes.josivaldo)
                    .setText(Dialogs.leito_paciente[1])
                    .registerOption("", function () {
                core.openDialog(2);
            }),
        // 2
          new Dialog(lib.characters.jogador)
                    .setText(Dialogs.leito_paciente[2])
                    .registerOption("", function () {
                core.openDialog(3);
            }),
        
        // 3
           
          new Dialog(lib.characters.pacientes.josivaldo)
                    .setText(Dialogs.leito_paciente[3])
                    .registerOption("", function () {
                core.openDialog(4);
            }),
        
        
         // 4
        new Dialog(lib.characters.jogador)
                    .setText(Dialogs.leito_paciente[4])
                    .registerOption("", function () {
                core.openDialog(5);
            }),
        
        // 5
          new Dialog(lib.characters.pacientes.josivaldo)
                    .setText(Dialogs.leito_paciente[5])
                    .registerOption("", function () {
                core.closeDialog();
            }),
    
        ]);
        
    
        
    //endregion LEITO
    
    
    
        

    
    
    
    
    
        // region PRONTUARIO


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
                new Action("btn-fechar_prontuario", "Fechar prontuário")
                    .setCssClass("action-ler_prontuario")
                    .onClick(function () {
                console.log("Action: Fechar prontuario");
                Prontuario.close();
                core.closeModalScene("Prontuario");
            })
                    .setVisibility(true),

                ]);
    
    
    // region GAVETA
    
     gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                })
                .setVisibility(true)
        ]);
    
   
    
    
       gaveta.registerInteractiveObjects([
           
            new InteractiveObject("io-copo_descartavel", "Copo Descartável")
                .setCssClass("intObj-copoDescartavel")
                .onClick(function () {
                    if(level.getFlag("pegar_bandeja").getValue() == false){
                        
                        core.openDialog(1);
                    }
                    else{
                    console.log("IntObj: io-copo_descartavel");
                    level.getFlag("pegar_copo_descartavel").setValue(true);
                    core.setInteractiveObjectVisible("io-copo_descartavel", false);

                    if(level.getFlag("score_pegar_copo_descartavel").getValue() == false) {
                        core.registerScoreItem(Scores.pegarCopoDescartavel);
                       level.getFlag("score_pegar_copo_descartavel").setValue(true);
                    }
                    }
                })
                .setVisibility(true),
           
           
            new InteractiveObject("io-agua_potavel", "Água Potável")
                .setCssClass("intObj-aguaPotavel")
                .onClick(function () {
                    
                    if(level.getFlag("pegar_bandeja").getValue() == false){
                        
                        core.openDialog(1);
                    }
                    else{
                    console.log("IntObj: io-agua_potavel");
                    level.getFlag("pegar_agua_potavel").setValue(true);
                    core.setInteractiveObjectVisible("io-agua_potavel", false);

                    if(level.getFlag("score_pegar_agua_potavel").getValue() == false) {
                        core.registerScoreItem(Scores.pegarAguaPotavel);
                        level.getFlag("score_pegar_agua_potavel").setValue(true);
                    }
                     }
                })
                .setVisibility(true),
           
           
           
           new InteractiveObject("io-seringa", "Seringa")
                .setCssClass("intObj-seringa_de_10_ml")
                .onClick(function () {
                    
                    if(level.getFlag("pegar_bandeja").getValue() == false){
                        
                        core.openDialog(1);
                    }
                    else{
                    console.log("IntObj: io-seringa");
                    level.getFlag("pegar_seringa").setValue(true);
              //      core.setInteractiveObjectVisible("io-agua_potavel", false);

                   /* if(level.getFlag("score_pegar_agua_potavel").getValue() == false) {
                        core.registerScoreItem(Scores.pegarAguaPotavel);
                        level.getFlag("score_pegar_agua_potavel").setValue(true);
                    }*/
                     }
                })
                .setVisibility(true),
           
       
           
        ]);    
    

    

       
            
        //endregion

        //region ModalScenes
    
        level.registerModalScene(prontuario);
        level.registerModalScene(gaveta);
    
        //endregion
  

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);  //00
        level.registerScene(corredor);  //01
        level.registerScene(alaMasculina);  //02
        level.registerScene(leito);  //03
        level.registerScene(farmacia);  //04
        level.registerScene(posto_de_enfermagem);  //05
    //    level.registerScene(centroCirurgico);  //06
    //    level.registerScene(alaFeminina);  //07


        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion
                    
                    
        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded
            
            level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("conversar_paciente").setValue(false);
            level.getFlag("score_ir_postoEnfermagem_horaErrada").setValue(false);
            level.getFlag("score_ir_farmacia_horaErrada").setValue(false);
            level.getFlag("score_iralaFeminina_horaErrada").setValue(false);
            level.getFlag("score_irCentroCirurgico_horaErrada").setValue(false);
            level.getFlag("ir_AlaMasculina_primeiraVez").setValue(false);
            level.getFlag("ler_prontuario").setValue(false);
            level.getFlag("pegar_dieta").setValue(false);
            level.getFlag("pegar_seringa").setValue(false);
            level.getFlag("conferir_dieta").setValue(false);
            level.getFlag("lavar_maos").setValue(false);
            level.getFlag("pegar_bandeja").setValue(false);
            level.getFlag("pegou_tudo_posto_enfermagem").setValue(false);
            
        
              //  dados do prontuario
            
            Prontuario.setNome("Josivaldo Silva");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("02/02/1961");
            Prontuario.setIdade("54 anos");
            Prontuario.setProfissao("Pedreiro");
            Prontuario.setPai("Josué Souza Silva");
            Prontuario.setMae("Mãe:");
            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("15/05/2015");
            Prontuario.setLeito("01 - Enfermaria Masculina");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Câncer de esôfago");
            Prontuario.setObservacoes("Diagnóstico identificado de Câncer (CA) de Esôfago há um ano atrás, encontra-se em cuidados paliativos.");
            Prontuario.setPeso("48");
            Prontuario.setAltura("1,60");
            Prontuario.setCircunferenciaAbdominal("70");
            Prontuario.setPrescEnfermagemState("decubito");
            Prontuario.setPrescMedicaRowData(1, '', 'Nutrição Enteral (Hipercalórica  0,99 cal/ml)', 'Sonda Nasogástrica', '200 ml/01 hora', '06h/06h', '(X) Administrado dieta sem intercorrências', false);
               Prontuario.setPrescMedicaRowData(1, '', 'Morfina (solução oral/gota)', 'Oral', '40mg/ml', '12/12h', '(X) Administrado medicamento,', false);
            Prontuario.setSsvvRowData(1, '', '100X10 mmHg', '65 bpm', '16 rpm', '93%', '36.5ºC', true);
            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
            
            
        });             
            
                    
                    
                    
        level.registerFlag(new Flag("conversar_mentor"), false);  
        level.registerFlag(new Flag("conversar_paciente"), false);  
        level.registerFlag(new Flag("score_ir_postoEnfermagem_horaErrada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_horaErrada"), false);
        level.registerFlag(new Flag("score_iralaFeminina_horaErrada"), false);
        level.registerFlag(new Flag("score_irCentroCirurgico_horaErrada"), false);
        level.registerFlag(new Flag("ir_AlaMasculina_primeiraVez"), false);
        level.registerFlag(new Flag("ler_prontuario"), false);
        level.registerFlag(new Flag("pegar_dieta"), false);
        level.registerFlag(new Flag("pegar_seringa"), false);
        level.registerFlag(new Flag("conferir_dieta"), false);
        level.registerFlag(new Flag("lavar_maos"), false);
        level.registerFlag(new Flag("pegar_bandeja"), false);
        level.registerFlag(new Flag("pegou_tudo_posto_enfermagem"), false);
                    
                    
                    

   

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 6);

        console.groupEnd();

    });