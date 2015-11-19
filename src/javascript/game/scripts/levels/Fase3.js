define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores) {

        //region Imports
        var Dialogs = require("Dialogs_data").fase3;
        var Alertas = require("Dialogs_data").alertas;
        Scores = Scores.level3;
        //endregion

        var level = new Level("Level 3");
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
                level.getFlag("conversar_recepcionista").setValue(true);
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
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
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


        //region Corredor


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if (level.getFlag("conversar_mentor").getValue() == false) { // primeira passada
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(0);
                } 
            })
            .onUnload(function () {
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([
            //Primeira passada pelo corredor

            // 0
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[0])
                .registerOption("", function () {
                level.getFlag("conversar_mentor").setValue(true);
                core.openDialog(1);
            }),

            //1 
             new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.corredor.fala1[1], function () {
                core.openDialog(4);
            })
                .registerOption(Dialogs.corredor.fala1[2], function () {
                core.openDialog(3);
            })
                .registerOption(Dialogs.corredor.fala1[3], function () {
                core.openDialog(2);
            })
                .setRandomize(true),


            // 2 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[6])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            // 3 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[5])
                .registerOption("", function () {
                core.openDialog(1);
            }),
            // 4 Mentor fala
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[4])
                .registerOption("", function () {
                core.closeDialog();
            }),


            //Segunda passada pelo corredor
            
            
            
                //5       
              new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor.fala1[7])
                .registerOption("", function () {
                core.closeDialog();
            }),
            

                //6     
              new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor.fala2[0])
                .registerOption("", function () {
                level.getFlag("conversar_mentor2").setValue(true);
                core.closeDialog();
            }),


            //7
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.corredor.fala2[1])
                    .registerOption("", function () {
                level.getFlag("conversar_mentor2").setValue(true);
                core.closeDialog();
            })

             ]);



        //FUNCOES


        function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgico");
            if(level.getFlag("conversar_paciente").getValue() == false)
                core.changeScene(2);
            else 
                core.changeScene(7);
            //core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
              
               
        }


        function corredorIrAlaFeminina() {
            console.log("Action: corredorIrAlaFeminina");
            if(level.getFlag("ir_alaFeminina_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("ir_alaFeminina_horaErrada").setValue(true);
                core.changeScene(3);
            }
             else  
                 core.changeScene(3);
      
        }


        function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            if(level.getFlag("ir_farmacia_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("ir_farmacia_horaErrada").setValue(true);
                core.changeScene(5);
            }
             else  
                core.changeScene(5);
      

        }


        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
             if(level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false){
                core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                level.getFlag("ir_postoEnfermagem_horaErrada").setValue(true);
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



           new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function () {
                core.closeCommandBar();
                console.log("Abrir diálogo com o mentor");
                if(level.getFlag("testar_equipamentos").getValue() == false)
                    core.openDialog(0);
                else if(level.getFlag("testar_equipamentos").getValue() == true && level.getFlag("conversar_paciente").getValue() == false)  //segunda passada
                    core.openDialog(5);
                //else if
                
            })
                .setVisibility(true)

    ]);



        //region Centro Cirurgico


        var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: " + centroCirurgico.getName());
                    core.openDialog(0);
            });



        centroCirurgico.registerDialogs([


            //primeira passada pelo centro cirurgico

            // 0 - Aline fala
            new Dialog(lib.characters.circulante)
                .setText(Dialogs.centro_cirurgico.fala1[0])
                .registerOption("", function () {
                level.getFlag("conversar_circulante").setValue(true);
                core.openDialog(1);
            }),

              // 1 Jogador responde
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.centro_cirurgico.fala1[1], function () {
                core.closeDialog();
            })
                .registerOption(Dialogs.centro_cirurgico.fala1[2], function () {
                core.openDialog(2);
            })
                .registerOption(Dialogs.centro_cirurgico.fala1[3], function () {
                core.openDialog(3);
            })
                .setRandomize(true),

            // 2 op errada1
                new Dialog(lib.characters.circulante)
                .setText(Dialogs.centro_cirurgico.fala1[5])
                .registerOption("", function () {
                core.openDialog(1);
            }),

            //3 op errada2

                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala1[6])
                     .registerOption("", function () {
                core.openDialog(1);
            }),

            // 4  jogador

                new Dialog(lib.characters.jogador)
                      .setText(Dialogs.centro_cirurgico.fala1[4])
                      .registerOption("", function () {
                core.closeDialog();
            }),


            
            
            // 5 alerta lavar maos cirurgica
            new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala1[7])
                    .registerOption("", function(){
                        core.closeDialog(); 
                      }),
            // 6 alerta lavar maos
                new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala1[8])
                    .registerOption("", function(){
                        core.closeDialog(); 
                      }),
             // 7 alerta testar equipamentos
                new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala1[9])
                    .registerOption("", function(){
                        core.closeDialog(); 
                      }),
            
       ]);


        function centroCirurgicoIrCorredor() {
            console.log("Action: centroCirurgicoIrCorredor");
            if (level.getFlag("testar_equipamentos").getValue() == false)
                core.openDialog(0);
            else
                core.changeScene(1);
        }






        centroCirurgico.registerInteractiveObjects([


      new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
                .setCssClass("intObj-talkToCirculante")
                .onClick(function () {
                console.log("Abrir diálogo com a circulante");
                   if(level.getFlag("conversar_paciente").getValue() == false || level.getFlag("testar_equipamentos").getValue() == false )
                        core.openDialog(0);
                    else
                        core.openDialog(5);

            })
        .setVisibility(true)


         ]);


        centroCirurgico.registerActions([

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function () {

                    if(level.getFlag("lavar_maos").getValue() == false){
                            console.log("Action: lavar_maos");
                            level.getFlag("lavar_maos").setValue(true);
                             core.registerScoreItem(Scores.lavarMaosHoraErrada);
                             console.log("Perdendo 200 pontos");
                             core.openDialog(5);
                            

                        }
            }),



             new Action("btn-lavar_maos_cirurgica", "Lavar as mãos técnica cirúrgica")
                .setCssClass("action-lavar_maos_escova")
                .onClick(function () {

                if (level.getFlag("lavar_maos_cirurgica").getValue() == false) {
                    console.log("Action: lavar_maos cirurgica");
                    core.registerScoreItem(Scores.lavarMaosCirurgica);
                    level.getFlag("lavar_maos_cirurgica").setValue(true);

                }


            }),


            new Action("btn-testarEquipamentos", "Testar Equipamentos")
                .setCssClass("action_testarEquipamentos")
                .onClick(function () {
                if(level.getFlag("lavar_maos_cirurgica").getValue() == false){
                    core.openDialog(5); // LAVAR MAOS CIRURGICA!
                }
                 else { 
                        console.log("Action: testar equipamentos");
                        level.getFlag("testar_equipamentos").setValue(true);
                        core.registerScoreItem(Scores.testarEquipamentos);
                        core.openDialog(4);

                }

            }),

             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {  
                    if(level.getFlag("testar_equipamentos").getValue() == false)
                        core.openDialog(7); // MENTOR: TESTAR EQUIPAMENTOS
                    else{
                        level.getFlag("primeira_saida_centro_cirurgico").setValue(true);
                        centroCirurgicoIrCorredor(); 
                        
                    }
            }),



        ]);





        //region Ala Feminina


        var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + alaFeminina.getName());
                //
            });
    
    
        alaFeminina.registerActions([
            
            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function () {

                    if(level.getFlag("lavar_maos2").getValue() == false){
                            console.log("Action: lavar_maos2");
                            level.getFlag("lavar_maos2").setValue(true);
                             core.registerScoreItem(Scores.lavarMaos2);
                        }
            }),
            
            
        ]);
    
    
    
        alaFeminina.registerDialogs([
            
            
            // 0 - Mentor
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo1)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 1 - Mentor
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo2)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 2 - Mentor: Não lavou mãos antes de pegar no prontuário
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo3)
                .registerOption("", function () {
                    core.closeDialog();
                })
        ]);
            
       



        alaFeminina.registerInteractiveObjects([

         new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
                .setCssClass("intObj-ir_leito_fase3")
                .onClick(function () {
                if(level.getFlag("lavar_maos2").getValue() == false)
                    core.openDialog(2);
                else {
                console.log("Abrir diálogo com paciente 4");
                core.registerScoreItem(Scores.irAoLeitoCorreto);
                core.changeScene(4);
                }

            })
           .setVisibility(true),


           new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function () {
                console.log("voltando para corredor");

                core.changeScene(1);

            })


    ]);


        //region Leito


        var leito = lib.scenes.leitos.regina.getClone()
            .onLoad(function () {
                console.log("Load scene: " + leito.getName());
                console.log("Abrindo dialogo com paciente");
                level.getFlag("conversar_paciente").setValue(true);
                core.openDialog(0);           
            });


leito.registerActions([

       new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function () {
        if (level.getFlag("conversar_paciente").getValue() == false)
            core.openDialog(6);
        else{
            console.log("Ganhou 150 pontos");
            core.registerScoreItem(Scores.encaminharPacienteCentroCirurgico);
            core.changeScene(3);  
        }

                }),
    
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                    core.registerScoreItem(Scores.pegarProntuario);   
                })
                .setVisibility(true)
    
    
    
    
    
    

    ]);


        leito.registerDialogs([

                // 0
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[0])
                .registerOption("", function () {
                core.openDialog(1);
            }),


                // 1
            new Dialog(lib.characters.pacientes.regina)
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
            new Dialog(lib.characters.pacientes.regina)
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
            new Dialog(lib.characters.pacientes.regina)
                .setText(Dialogs.leito_paciente[5])
                .registerOption("", function () {
                core.closeDialog();
            }),
            
            //6
             new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.informar_paciente)
                .registerOption("", function() {
                    core.closeDialog();
                }),


        ]);







        // FARMACIA

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function () {
                console.log("Load scene: " + farmacia.getName());
                //
            });


        farmacia.registerActions([

             new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function () {
                core.changeScene(1);
            }),

        ]);


        // POSTO DE ENFERMAGEM

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
            
            
        // region CENTRO CIRURGICO c/ PACIENTE REGINA
            var centroCirurgicoRegina =  new Scene("centroCirurgicoRegina", "scene-centroCirurgicoRegina")
                    .setCssClass("scene-centroCirurgicoRegina")
                    .onLoad(function (){  
                        console.log("Entrando no centro cirurgico segunda vez");
                        core.openDialog(0);
                    })
                    .onUnload (function() {
                        console.log("Saindo do centro cirurgico");         
                        
                    });
    
    
    centroCirurgicoRegina.registerDialogs([  
        
                // 0
                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala2[0])
                    .registerOption("", function () {
                core.openDialog(1);
            }),

            // 1

                 new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.centro_cirurgico.fala2[1], function () {
                core.closeDialog();
            })
                .registerOption(Dialogs.centro_cirurgico.fala2[2], function () {
                core.openDialog(15);
            })
                .registerOption(Dialogs.centro_cirurgico.fala2[3], function () {
                core.openDialog(16);
            })
                .setRandomize(true),



            //2  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[4])
                    .registerOption("", function () {
                core.openDialog(3);
            }),


            //3  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[5])
                    .registerOption("", function () {
                core.openDialog(4);
            }),

             //4  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[6])
                    .registerOption("", function () {
                core.openDialog(5);
            }),


            //5  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[7])
                    .registerOption("", function () {
                core.openDialog(6);
            }),

            //6  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[8])
                    .registerOption("", function () {
                core.openDialog(7);
            }),


            //7  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[9])
                    .registerOption("", function () {
                core.openDialog(8);
            }),


            //8  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[10])
                    .registerOption("", function () {
                core.openDialog(9);
            }),


            //9  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[11])
                    .registerOption("", function () {
                core.openDialog(10);
            }),


             //10  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[12])
                    .registerOption("", function () {
                core.openDialog(11);
            }),


            //11  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[13])
                    .registerOption("", function () {
                core.openDialog(12);
            }),

             //12  jogador

                 new Dialog(lib.characters.jogador)
                    .setText(Dialogs.centro_cirurgico.fala2[14])
                    .registerOption("", function () {
                core.openDialog(13);
            }),


            //13  paciente

                new Dialog(lib.characters.pacientes.regina)
                    .setText(Dialogs.centro_cirurgico.fala2[15])
                    .registerOption("", function () {
                core.openDialog(14);
            }),

            // 14 jogador op

                 new Dialog(lib.characters.jogador)
                     .setText("")
                .registerOption(Dialogs.centro_cirurgico.fala2[16], function () {
                core.closeDialog();
            })
                .registerOption(Dialogs.centro_cirurgico.fala2[17], function () {
                core.openDialog(17);
            })
                .registerOption(Dialogs.centro_cirurgico.fala2[18], function () {
                    core.openDialog(18);
            })
                .setRandomize(true),


            //15 op2 - primeira parte
                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala2[19])
                    .registerOption("", function () {
                core.openDialog(1);
            }),

            //16 op3 - primeira parte
                     //20 op2 - primeira parte
                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala2[20])
                    .registerOption("", function () {
                core.openDialog(1);
            }),

            //17 op2 - segunda parte
                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala2[21])
                    .registerOption("", function(){
                        core.openDialog(14); 
                      }),
                     
            //18 op3 - segunda parte
                 new Dialog(lib.characters.circulante)
                    .setText(Dialogs.centro_cirurgico.fala2[22])
                    .registerOption("", function(){
                        core.openDialog(14); 
                      }),   
        
    
    
    ]);
    
    
    centroCirurgicoRegina.registerInteractiveObjects([


      new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
                .setCssClass("intObj-talkToCirculante")
                .onClick(function () {
                console.log("Abrir diálogo com a circulante");
                   core.openDialog(0);
            })
        .setVisibility(true),
        
        new InteractiveObject("io-conversar_paciente", "Conversar com a Paciente")
                .setCssClass("intObj-talkToPacienteRegina")
                .onClick(function () {
                console.log("Abrir diálogo com a paciente");
                   core.openDialog(2);
            })
        


         ]);
          
    
            // region PRONTUARIO
    
    
        prontuario = new Scene("Prontuario", "Prontuario");            

             prontuario.registerActions([
                new Action("btn-fechar_prontuario", "Fechar prontuário")
                    .setCssClass("action-ler_prontuario")
                    .onClick(function (){
                        console.log("Action: Fechar prontuario");
                        Prontuario.close();
                        core.closeModalScene("Prontuario");
                    })
                    .setVisibility(true),
                
                ]);
    
    

        //endregion

        //endregion

        //region ModalScenes
    
         level.registerModalScene(prontuario);
    

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao); // id 0
        level.registerScene(corredor); // id 1
        level.registerScene(centroCirurgico); // id 2
        level.registerScene(alaFeminina); // id 3
        level.registerScene(leito); // id 4
        level.registerScene(farmacia); // id 5
        level.registerScene(posto_de_enfermagem); // id 6
        level.registerScene(centroCirurgicoRegina); // id 7
        level.registerScene(prontuario); // id 8

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags



        level.setSetupScript(function () {
            
            // arrumar flags para contar score uma so vez
            
            
            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("conversar_mentor2").setValue(false);
            level.getFlag("testar_equipamentos").setValue(false);
            level.getFlag("ir_corredor_centro_cirurgico").setValue(false);
            level.getFlag("conversar_circulante").setValue(false);
            level.getFlag("lavar_maos_cirurgica").setValue(false);
            level.getFlag("lavar_maos").setValue(false);
            level.getFlag("lavar_maos2").setValue(false);
            level.getFlag("primeira_saida_centro_cirurgico").setValue(false);
            level.getFlag("conversar_paciente").setValue(false);
            level.getFlag("ir_alaFeminina_horaErrada").setValue(false);
            level.getFlag("ir_farmacia_horaErrada").setValue(false);
            level.getFlag("ir_postoEnfermagem_horaErrada").setValue(false);
            
   
             //  dados do prontuario
            Prontuario.setNome("Regina Oliveira");
            Prontuario.setSexo("F");
            Prontuario.setEstadoCivil("Viúva");
            Prontuario.setDataNascimento("19/04/1952");
            Prontuario.setIdade("63 anos");
            Prontuario.setProfissao("Costureira");
            Prontuario.setPai("Pedro Faria Oliveira");
            Prontuario.setMae("Maria das Graças Silva Oliveira");
            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("09/12/2015");
            Prontuario.setLeito("01 - Leito Feminino");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Insuficiência arterial periférica em membro inferior esquerdo. Procedimento cirúrgico a ser realizado: Cirurgia de Enxerto Poplíteo e Amputação transmetatársica à esquerda");
            Prontuario.setObservacoes("Diabetes Mellitus II e Hipertensão Arterial Sistêmica");
            Prontuario.setPeso("79");
            Prontuario.setAltura("1,50");
            Prontuario.setCircunferenciaAbdominal("132");
            Prontuario.setPrescEnfermagemState("decubito");
            Prontuario.setPrescMedicaRowData(1, '', 'Cefalotina', 'Endovenosa', '6 g (6 x ao dia)', 'Cefalotina Endovenosa 6 g (6 x ao dia) 06h-12h-18h-24h', '(X) 06h', false);
            Prontuario.setSsvvRowData(1, '17/06', '120X70 mmHg', '47 bpm', '16 rpm', '96%', '35,7ºC', true);
            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
            
        });


        level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("testar_equipamentos"), false);
        level.registerFlag(new Flag("conversar_mentor2"), false);
        level.registerFlag(new Flag("ir_corredor_centro_cirurgico"), false);
        level.registerFlag(new Flag("conversar_circulante"), false);
        level.registerFlag(new Flag("lavar_maos_cirurgica"), false);
        level.registerFlag(new Flag("lavar_maos"), false);
        level.registerFlag(new Flag("lavar_maos2"), false);
        level.registerFlag(new Flag("primeira_saida_centro_cirurgico"), false);
        level.registerFlag(new Flag("conversar_paciente"), false);
        level.registerFlag(new Flag("ir_alaFeminina_horaErrada"), false);
        level.registerFlag(new Flag("ir_farmacia_horaErrada"), false);
        level.registerFlag(new Flag("ir_postoEnfermagem_horaErrada"), false);


        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 3);

        console.groupEnd();



    }
);