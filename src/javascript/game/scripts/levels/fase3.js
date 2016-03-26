define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").fase3;
        var Alertas = require("DialogsData").alertas;
        Scores = Scores.level3;
        // endregion

        var level = new Level("Level 3");
        console.groupCollapsed( level.getName() );


        var
            recepcao,
            corredor,
            alaFeminina,
            centroCirurgico,
            salaDeLeitos,
            leito,
            postoDeEnfermagem,
            farmacia,
            gaveta,
            pulseira,
            prontuario,
            zoom;


        // region Scenes

        // region Recepcao


        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                core.openDialog( 0 );
                level.getFlag("conversar_recepcionista").setValue( true );
            });

        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {
                core.closeDialog();
                core.changeScene( 1 );
                console.log("Ir para o corredor");
            } else {
                console.log("Necessita ação: conversar com a recepcionista");
            }
        }


        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog( 0 );
        }


        recepcao.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista", "Conversar com a Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .setVisibility( true )
                .onClick( conversarRecepcionista ),


            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true )
        ]);


        // region Corredor


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");
                if ( level.getFlag("conversar_mentor").getValue() == false ) {
                    // primeira passada
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([
            // Primeira passada pelo corredor

            // 0
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor.fala1[ 0 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 1 );
                }),

            // 1
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.corredor.fala1[ 1 ], function() {
                    core.openDialog( 4 );
                })
                .registerOption( Dialogs.corredor.fala1[ 2 ], function() {
                    core.openDialog( 3 );
                })
                .registerOption( Dialogs.corredor.fala1[ 3 ], function() {
                    core.openDialog( 2 );
                })
                .setRandomize( true ),


            // 2 Mentor Corrige
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor.fala1[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // 3 Mentor Corrige
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor.fala1[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // 4 Mentor fala
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor.fala1[ 4 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),


            // Segunda passada pelo corredor


            // 5
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.corredor.fala1[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),


            // 6
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.corredor.fala2[ 0 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_mentor2").setValue( true );
                    core.openDialog( 7 );
                }),


            // 7
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor.fala2[ 1 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_mentor2").setValue( true );
                    core.closeDialog();
                    core.unlockLevel( 3 );
                    core.closeCommandBar();
                    core.showEndOfLevel();
                }),


            // 8 - alerta farmacia
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.enfermagem[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 9 - alerta centro Cirurgico
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.centroCirugico )
                .registerOption("", function() {
                    core.closeDialog();
                })


        ]);


        // FUNCOES


        function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgico");
            if ( level.getFlag("conversarPaciente").getValue() == false ) {
                core.changeScene( 2 );
            } else {
                core.changeScene( 7 );
            }
        }


        function corredorIrAlaFeminina() {
            console.log("Action: corredorIrAlaFeminina");
            if ( level.getFlag("testar_equipamentos").getValue() == true ) {
                core.changeScene( 3 );
            } else {
                core.openDialog( 9 );
            }


            if ( level.getFlag("ir_alaFeminina_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
                level.getFlag("ir_alaFeminina_horaErrada").setValue( true );

            }

        }


        function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            core.openDialog( 8 );
            if ( level.getFlag("ir_farmacia_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                level.getFlag("ir_farmacia_horaErrada").setValue( true );

            }
        }


        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.openDialog( 8 );
            if ( level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                level.getFlag("ir_postoEnfermagem_horaErrada").setValue( true );
            }
        }

        corredor.registerInteractiveObjects([

            new InteractiveObject("io-ir_centro_cirurgico", "Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico")
                .onClick( corredorIrCentroCirurgico )
                .setVisibility( true ),


            new InteractiveObject("io-ir_farmacia", "Ir para a Farmacia")
                .setCssClass("intObj-goToFarmacia")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),


            new InteractiveObject("io-ir_posto_enfermagem", "Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToPostoEnfermagem")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),


            new InteractiveObject("io-ir_ala_feminina", "Ir para a Ala Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true ),


            new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function() {
                    core.closeCommandBar();
                    console.log("Abrir diálogo com o mentor");
                    if ( level.getFlag("testar_equipamentos").getValue() == false ) {
                        core.openDialog( 0 );
                    } else if ( level.getFlag("testar_equipamentos").getValue() == true && level.getFlag("conversarPaciente").getValue() == false ) {
                        // segunda passada
                        core.openDialog( 5 );
                    }


                    if ( level.getFlag("fim_fase").getValue() == true ) {
                        core.openDialog( 6 );
                    }
                })
                .setVisibility( true )

        ]);


        // region Centro Cirurgico


        var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
                core.openDialog( 0 );
            });


        centroCirurgico.registerDialogs([


            // primeira passada pelo centro cirurgico

            // 0 - Aline fala
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 0 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_circulante").setValue( true );
                    core.openDialog( 1 );
                }),

            // 1 Jogador responde
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.centroCirurgico.fala1[ 1 ], function() {
                    core.closeDialog();
                })
                .registerOption( Dialogs.centroCirurgico.fala1[ 2 ], function() {
                    core.openDialog( 2 );
                })
                .registerOption( Dialogs.centroCirurgico.fala1[ 3 ], function() {
                    core.openDialog( 3 );
                })
                .setRandomize( true ),

            // 2 op errada1
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 3 op errada2

            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 4  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala1[ 4 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),


            // 5 alerta lavar maos cirurgica
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 6 alerta lavar maos
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 8 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 7 alerta testar equipamentos
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala1[ 9 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        function centroCirurgicoIrCorredor() {
            console.log("Action: centroCirurgicoIrCorredor");
            if ( level.getFlag("testar_equipamentos").getValue() == false ) {
                core.openDialog( 0 );
            } else {
                core.changeScene( 1 );
            }
        }

        centroCirurgico.registerInteractiveObjects([  


            new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
                .setCssClass("intObj-talkToCirculante")
                .onClick(function() {
                    console.log("Abrir diálogo com a circulante");
                    if ( level.getFlag("conversarPaciente").getValue() == false || level.getFlag("testar_equipamentos").getValue() == false ) {
                        core.openDialog( 0 );
                    } else {
                        core.openDialog( 5 );
                    }

                })
                .setVisibility( true ),
            
      
            
            
            new InteractiveObject("io-carrinho_anestesico", "Testar Equipamentos")
                .setCssClass("intObj-carrinho_anestesico")
                .onClick(function() {
                 
                      if ( level.getFlag("lavar_maos_cirurgica").getValue() == false ) {
                        core.openDialog( 5 );
                    } else {
                        
                        console.log("Action: testar equipamentos");
                        if ( level.getFlag("testar_equipamentos").getValue() == false ) {
                            level.getFlag("testar_equipamentos").setValue( true );
                            core.registerScoreItem( Scores.testarEquipamentos );
                            // FALTA COLOCAR BEEP DO SOM DE CONFIRMAÇÃO -----------------------
                            core.openDialog( 4 );
                        }


                    }

                })
                .setVisibility( true )
        
        ]);
    
    


        centroCirurgico.registerActions([

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {

                    if ( level.getFlag("lavarMaos").getValue() == false ) {
                        console.log("Action: lavarMaos");
                        level.getFlag("lavarMaos").setValue( true );
                        core.registerScoreItem( Scores.lavarMaosHoraErrada );
                        core.openDialog( 5 );


                    }
                }),


            new Action("btn-lavar_maos_cirurgica", "Lavar as mãos técnica cirúrgica")
                .setCssClass("action-lavar_maos_escova")
                .onClick(function() {

                    if ( level.getFlag("lavar_maos_cirurgica").getValue() == false ) {
                        console.log("Action: lavarMaos cirurgica");
                        core.registerScoreItem( Scores.lavarMaosCirurgica );
                        level.getFlag("lavar_maos_cirurgica").setValue( true );
                    }


                }),
            

            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( level.getFlag("testar_equipamentos").getValue() == false ) {
                        // MENTOR: TESTAR EQUIPAMENTOS
                        core.openDialog( 7 );
                    } else {
                        level.getFlag("primeira_saida_centro_cirurgico").setValue( true );
                        centroCirurgicoIrCorredor();
                    }
                })


        ]);


        // region Ala Feminina


        var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function() {
                console.log("Load scene: " + alaFeminina.getName() );
                //
            });


        alaFeminina.registerActions([

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {

                    if ( level.getFlag("lavar_maos2").getValue() == false ) {
                        console.log("Action: lavar_maos2");
                        level.getFlag("lavar_maos2").setValue( true );
                        core.registerScoreItem( Scores.lavarMaos2 );
                    }
                })


        ]);


        alaFeminina.registerDialogs([


            // 0 - Mentor
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo1 )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 1 - Mentor
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo2 )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 2 - Mentor: Não lavou mãos antes de pegar no prontuário
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo3 )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        alaFeminina.registerInteractiveObjects([

            new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
                .setCssClass("intObj-ir_leito_fase3")
                .onClick(function() {
                    if ( level.getFlag("lavar_maos2").getValue() == false ) {
                        core.openDialog( 2 );
                    } else {
                        if ( level.getFlag("ir_leito_paciente").getValue() == false ) {
                            level.getFlag("ir_leito_paciente").setValue( true );
                            console.log("Abrir diálogo com paciente 4");
                            core.registerScoreItem( Scores.irAoLeitoCorreto );
                            core.changeScene( 4 );
                        }
                    }
                })
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function() {
                    console.log("voltando para corredor");

                    core.changeScene( 1 );

                })


        ]);


        // region Leito


        var leito = lib.scenes.leitos.regina.getClone()
            .onLoad(function() {
                console.log("Load scene: " + leito.getName() );
                console.log("Abrindo dialogo com paciente");
                level.getFlag("conversarPaciente").setValue( true );
                core.openDialog( 0 );
            });


        leito.registerActions([

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    if ( level.getFlag("conversarPaciente").getValue() == false ) {
                        core.openDialog( 6 );
                    } else {
                        console.log("Ganhou 150 pontos");
                        core.registerScoreItem( Scores.encaminharPacienteCentroCirurgico );
                        core.changeScene( 3 );
                    }
                }),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");

                    if ( level.getFlag("ler_prontuario").getValue() == false ) {
                        level.getFlag("ler_prontuario").setValue( true );
                        core.registerScoreItem( Scores.pegarProntuario );
                        console.log("Ganhou 150 pontos");

                    }
                })
                .setVisibility( true )


        ]);


        leito.registerDialogs([

            // 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),


            // 1
            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.leitoPaciente[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),

            // 2
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),


            // 3
            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.leitoPaciente[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),

            // 4
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),


            // 5
            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.leitoPaciente[ 5 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 6
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.informarPaciente )
                .registerOption("", function() {
                    core.closeDialog();
                })


        ]);


        // FARMACIA

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {
                console.log("Load scene: " + farmacia.getName() );
                //
            });

        // POSTO DE ENFERMAGEM

        var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                console.log("Load scene: " + postoDeEnfermagem.getName() );
                //
            });


        // region CENTRO CIRURGICO c/ PACIENTE REGINA
        var centroCirurgicoRegina = new Scene("centroCirurgicoRegina", "scene-centroCirurgicoRegina")
            .setCssClass("scene-centroCirurgicoRegina")
            .onLoad(function() {
                console.log("Entrando no centro cirurgico segunda vez");
                core.openDialog( 0 );
            })
            .onUnload(function() {
                console.log("Saindo do centro cirurgico");

            });


        centroCirurgicoRegina.registerActions([


            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {

                    if ( level.getFlag("lavar_maos3").getValue() == false ) {
                        level.getFlag("lavar_maos3").setValue( true );
                    }
                }),


            new Action("btn-anotarProntuario", "Anotar prontuario")
                .setCssClass("action-anotarProntuario")
                .onClick(function() {
                    console.log("Action: Anotar prontuario");
                    if ( level.getFlag("lavar_maos3").getValue() == false ) {
                        core.openDialog( 19 );
                    } else {
                        if ( level.getFlag("score_anotar_prontuario").getValue() == false ) {
                            core.registerScoreItem( Scores.anotarNoProntuario );
                            level.getFlag("score_anotar_prontuario").setValue( true );
                        }
                        if ( level.getFlag("colocar_placa_neutra").getValue() == false ) {
                            core.openDialog( 20 );
                        } else {
                            Prontuario.open();
                            core.openModalScene("Prontuario");
                        }
                    }
                })
                .setVisibility( true ),


            new Action("btn-colocar_placa_neutra", "Colocar Placa Neutra")
                .setCssClass("action-colocar_placa_neutra")
                .onClick(function() {
                    console.log("Action: Colocando placa neutra");
                    level.getFlag("colocar_placa_neutra").setValue( true );
                    if ( level.getFlag("score_placa_neutra").getValue() == false ) {
                        core.registerScoreItem( Scores.colocarPlacaNeutra );
                        level.getFlag("score_placa_neutra").setValue( true );
                    }

                    if ( level.getFlag("verificar_oximetro_local_cirurgia").getValue() == false ) {
                        core.openDialog( 21 );
                    }
                })
                .setVisibility( true ),


            new Action("btn-verificar_oximetro_local_cirurgia", "Verificar Oxímetro e Local da Cirurgia")
                .setCssClass("action-verificar_oximetro_local_cirurgia")
                .onClick(function() {
                    console.log("Action: Verificando Paciente");
                    level.getFlag("verificar_oximetro_local_cirurgia").setValue( true );
                })
                .setVisibility( true )


        ]);


        centroCirurgicoRegina.registerDialogs([

            // 0
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala2[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 1

            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.centroCirurgico.fala2[ 1 ], function() {
                    core.closeDialog();
                })
                .registerOption( Dialogs.centroCirurgico.fala2[ 2 ], function() {
                    core.openDialog( 15 );
                })
                .registerOption( Dialogs.centroCirurgico.fala2[ 3 ], function() {
                    core.openDialog( 16 );
                })
                .setRandomize( true ),


            // 2  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),


            // 3  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),

            // 4  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),


            // 5  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 7 ] )
                .registerOption("", function() {
                    core.openDialog( 6 );
                }),

            // 6  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 7 );
                }),


            // 7  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 9 ] )
                .registerOption("", function() {
                    core.openDialog( 8 );
                }),


            // 8  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 10 ] )
                .registerOption("", function() {
                    core.openDialog( 9 );
                }),


            // 9  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 11 ] )
                .registerOption("", function() {
                    core.openDialog( 10 );
                }),


            // 10  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 12 ] )
                .registerOption("", function() {
                    core.openDialog( 11 );
                }),


            // 11  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 13 ] )
                .registerOption("", function() {
                    core.openDialog( 12 );
                }),

            // 12  jogador

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico.fala2[ 14 ] )
                .registerOption("", function() {
                    core.openDialog( 13 );
                }),


            // 13  paciente

            new Dialog( lib.characters.pacientes.regina )
                .setText( Dialogs.centroCirurgico.fala2[ 15 ] )
                .registerOption("", function() {
                    core.openDialog( 14 );
                }),

            // 14 jogador op

            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.centroCirurgico.fala2[ 16 ], function() {
                    core.closeDialog();
                })
                .registerOption( Dialogs.centroCirurgico.fala2[ 17 ], function() {
                    core.openDialog( 17 );
                })
                .registerOption( Dialogs.centroCirurgico.fala2[ 18 ], function() {
                    core.openDialog( 18 );
                })
                .setRandomize( true ),


            // 15 op2 - primeira parte
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala2[ 19 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 16 op3 - primeira parte
            // 20 op2 - primeira parte
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala2[ 20 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 17 op2 - segunda parte
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala2[ 21 ] )
                .registerOption("", function() {
                    core.openDialog( 14 );
                }),

            // 18 op3 - segunda parte
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico.fala2[ 22 ] )
                .registerOption("", function() {
                    core.openDialog( 14 );
                }),

            // 19 Alertar Lavar maos

            new Dialog( lib.characters.circulante )
                .setText( Alertas.lavarMaos.tipo2 )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 20 - alerta colocar placa neutra
            new Dialog( lib.characters.circulante )
                .setText( Alertas.esqueceu.coxim )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 21 - alerta verificar oximetro e local da cirurgia

            new Dialog( lib.characters.circulante )
                .setText( Alertas.esqueceu.verificarOximetro )
                .registerOption("", function() {
                    core.closeDialog();
                })


        ]);


        centroCirurgicoRegina.registerInteractiveObjects([


            new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
                .setCssClass("intObj-talkToCirculante")
                .onClick(function() {
                    console.log("Abrir diálogo com a circulante");
                    core.openDialog( 0 );
                })
                .setVisibility( true ),

            new InteractiveObject("io-conversarPaciente", "Conversar com a Paciente")
                .setCssClass("intObj-talkToPacienteRegina")
                .onClick(function() {
                    console.log("Abrir diálogo com a paciente");
                    core.openDialog( 2 );
                })


        ]);


        // region PRONTUARIO


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");

                    if ( level.getFlag("verificar_oximetro_local_cirurgia").getValue() == true && level.getFlag("colocar_placa_neutra").getValue() == true ) {
                        level.getFlag("fim_fase").setValue( true );
                        console.log("ACABOUUUUU EH TETRAAAA");
                        core.changeScene( 1 );
                    }

                })
                .setVisibility( true )

        ]);


        // endregion

        // endregion

        // region ModalScenes

        level.registerModalScene( prontuario );


        // endregion

        // region Level

        // region Register Scenes

        // 0
        level.registerScene( recepcao );
        // 1
        level.registerScene( corredor );
        // 2
        level.registerScene( centroCirurgico );
        // 3
        level.registerScene( alaFeminina );
        // 4
        level.registerScene( leito );
        // 5
        level.registerScene( farmacia );
        // 6
        level.registerScene( postoDeEnfermagem );
        // 7
        level.registerScene( centroCirurgicoRegina );
        // 8
        level.registerScene( prontuario );

        // endregion

        // region Register Modal Scenes

        // endregion

        // region Flags


        level.setSetupScript(function() {

            // arrumar flags para contar score uma so vez


            level.getFlag("conversar_recepcionista").setValue( false );
            level.getFlag("conversar_mentor").setValue( false );
            level.getFlag("conversar_mentor2").setValue( false );
            level.getFlag("testar_equipamentos").setValue( false );
            level.getFlag("ir_corredor_centro_cirurgico").setValue( false );
            level.getFlag("conversar_circulante").setValue( false );
            level.getFlag("lavar_maos_cirurgica").setValue( false );
            level.getFlag("lavarMaos").setValue( false );
            level.getFlag("lavar_maos2").setValue( false );
            level.getFlag("lavar_maos3").setValue( false );
            level.getFlag("primeira_saida_centro_cirurgico").setValue( false );
            level.getFlag("conversarPaciente").setValue( false );
            level.getFlag("ir_alaFeminina_horaErrada").setValue( false );
            level.getFlag("ir_farmacia_horaErrada").setValue( false );
            level.getFlag("ir_postoEnfermagem_horaErrada").setValue( false );
            level.getFlag("score_anotar_prontuario").setValue( false );
            level.getFlag("colocar_placa_neutra").setValue( false );
            level.getFlag("score_placa_neutra").setValue( false );
            level.getFlag("verificar_oximetro_local_cirurgia").setValue( false );
            level.getFlag("fim_fase").setValue( false );
            level.getFlag("ir_leito_paciente").setValue( false );
            level.getFlag("ler_prontuario").setValue( false );


            //  dados do prontuario
            Prontuario.setNome("Regina Oliveira");
            Prontuario.setSexo("F");
            Prontuario.setEstadoCivil("Viúva");
            Prontuario.setDataNascimento("19/04/1952");
            Prontuario.setIdade("63 anos");
            Prontuario.setProfissao("Costureira");
            Prontuario.setPai("Pedro Faria Oliveira");
            Prontuario.setMae("Maria das Graças Silva Oliveira");
            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("09/12/2015");
            Prontuario.setLeito("03 - Enfermaria Feminina");
            Prontuario.setAntecedentes("");
            Prontuario.setHipotese("Insuficiência arterial periférica em membro inferior esquerdo. Procedimento cirúrgico a ser realizado: Cirurgia de Enxerto Poplíteo e Amputação transmetatársica à esquerda");
            Prontuario.setObservacoes("Diabetes Mellitus II e Hipertensão Arterial Sistêmica");
            Prontuario.setPeso("79");
            Prontuario.setAltura("1,50");
            Prontuario.setCircunferenciaAbdominal("132");

            Prontuario.setPrescMedicaRowData( 0, "", "Midazolam", "Oral", "15 mg", "06h", true, true );
            Prontuario.setPrescMedicaRowData( 1, "", "Cefalotina", "Endovenosa", "6 g (6 x ao dia)", "Cefalotina Endovenosa 6 g (6 x ao dia) 06h-12h-18h-24h", true, false );

            // Prontuario.setPrescEnfermagemState("encaminhas paciente ao centro cirúrgico");
            // Prontuario.setPrescEnfermagemState("check list da cirurgia segura");
            // Prontuario.setPrescEnfermagemState("placa neutra");

            Prontuario.setSsvvRowData( 0, "", "120x70", "47", "16", "96", "35,7", true );
            // Disable 2 row
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

            Prontuario.setAnotacaoEnfermagemRowData("", "");

        });


        level.registerFlag( new Flag("conversar_mentor"), false );
        level.registerFlag( new Flag("conversar_recepcionista"), false );
        level.registerFlag( new Flag("testar_equipamentos"), false );
        level.registerFlag( new Flag("conversar_mentor2"), false );
        level.registerFlag( new Flag("ir_corredor_centro_cirurgico"), false );
        level.registerFlag( new Flag("conversar_circulante"), false );
        level.registerFlag( new Flag("lavar_maos_cirurgica"), false );
        level.registerFlag( new Flag("lavarMaos"), false );
        level.registerFlag( new Flag("lavar_maos2"), false );
        level.registerFlag( new Flag("lavar_maos3"), false );
        level.registerFlag( new Flag("primeira_saida_centro_cirurgico"), false );
        level.registerFlag( new Flag("conversarPaciente"), false );
        level.registerFlag( new Flag("ir_alaFeminina_horaErrada"), false );
        level.registerFlag( new Flag("ir_farmacia_horaErrada"), false );
        level.registerFlag( new Flag("ir_postoEnfermagem_horaErrada"), false );
        level.registerFlag( new Flag("score_anotar_prontuario"), false );
        level.registerFlag( new Flag("colocar_placa_neutra"), false );
        level.registerFlag( new Flag("score_placa_neutra"), false );
        level.registerFlag( new Flag("verificar_oximetro_local_cirurgia"), false );
        level.registerFlag( new Flag("fim_fase"), false );
        level.registerFlag( new Flag("ir_leito_paciente"), false );
        level.registerFlag( new Flag("ler_prontuario"), false );


        level.setInitialScene( 0 );
        // endregion

        game.registerLevel( level, 3 );

        console.groupEnd();


    }
);
