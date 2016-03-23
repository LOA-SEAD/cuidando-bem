/* by Wellyson */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").fase6;
        var Alertas = require("DialogsData").alertas;
        var Scores = Scores.level6;
        // endregion

        var level = new Level("Level 6");
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

        // region CENTRO CIRURGICO

        var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
            });

        function corredorIrCentroCirurgico() {
            core.changeScene( 6 );
            if ( level.getFlag("scoreIrCentroCirurgicoHoraErrada").getValue() == false ) {

                level.getFlag("scoreIrCentroCirurgicoHoraErrada").setValue( true );
                core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );
                console.log("PERDEU 25 PONTOS");
            }
        }

        // endregion CENTRO CIRURGICO

        // region ALA FEMININA

        var alaFeminina = lib.scenes.alaFeminina.getClone()
        .onLoad(function() {

        });

        function corredorIrAlaFeminina() {
           core.changeScene( 7 );

            if ( level.getFlag("scoreIrAlaFemininaHoraErrada").getValue() == false ) {

                level.getFlag("scoreIrAlaFemininaHoraErrada").setValue( true );
                core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
                console.log("PERDEU 25 PONTOS");

            }

        }
        // endregion ALA FEMININA

        // region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                core.openDialog( 0 );
            });

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
            ]
        );

        recepcao.registerDialogs([
            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            new Dialog( lib.characters.jogador )
                .setText( Dialogs.recepcao[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
            ]
        );

        function recepcaoIrCorredor() {
            console.log("Ir para o corredor");
            core.changeScene( 1 );
        }

        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog( 0 );
        }

        // endregion RECEPCAO

        // region CORREDOR

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");
                if ( level.getFlag("conversar_mentor").getValue() == false ) {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([
                // 0
                new Dialog( lib.characters.mentor )
                    .setText( Dialogs.corredor[ 0 ] )
                    .registerOption("", function() {
                        core.openDialog( 1 );
                    }),

                // 1
                new Dialog( lib.characters.jogador )
                    .setText("")
                    .registerOption( Dialogs.corredor[ 1 ], function() {
                        core.openDialog( 2 );
                    })
                    .registerOption( Dialogs.corredor[ 2 ], function() {
                        core.openDialog( 3 );
                    })
                    .setRandomize( true ),

                // 2 Mentor Corrige
                new Dialog( lib.characters.mentor )
                    .setText( Dialogs.corredor[ 3 ] )
                    .registerOption("", function() {
                        core.closeDialog();
                    }),

                // 3
                new Dialog( lib.characters.mentor )
                    .setText( Dialogs.corredor[ 4 ] )
                    .registerOption("", function() {
                        core.openDialog( 1 );
                    }),

               // 4
                new Dialog( lib.characters.mentor )
                    .setText( Alertas.perdido.farmacia )
                    .registerOption("", function() {
                        core.closeDialog();
                    })
        ]);

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

            new InteractiveObject("io-ir_alaMasculina", "Ir para a Ala Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true ),

            new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function() {
                    core.closeCommandBar();
                    console.log("Abrir diálogo com o mentor");

                    if ( level.getFlag("ir_AlaMasculina_primeiraVez").getValue() == false ) {
                        core.openDialog( 0 );
                    }
                    /*   if (level.getFlag("fim_fase").getValue() == true)
                    core.openDialog(6);*/
                })
                .setVisibility( true )
        ]);

        function corredorIrFarmacia() {
            if ( level.getFlag("ler_prontuario").getValue() == true ) {
                core.changeScene( 4 );
                core.openDialog( 0 );
            }
        }

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");

            if ( level.getFlag("conferirDieta").getValue() == true ) {
                core.changeScene( 5 );
            }

            /* if(level.getFlag("pegarDieta").getValue() == true && level.getFlag("conferirDieta").getValue() == true)
                    core.changeScene(6);
            else
                {

                    core.changeScene(6);

                    if(level.getFlag("score_ir_postoEnfermagem_horaErrada").getValue() == false){
                        level.getFlag("score_ir_postoEnfermagem_horaErrada").setValue(true);
                        core.registerScoreItem(Scores.irPostoEnfermagemHoraErrada);

                    }

            }*/
        }

        function corredorIrAlaMasculina() {
            console.log("Action: coredorirAlaMasculina");
            core.changeScene( 2 );
        }

        // endregion CORREDOR

        // region ALA MASCULINA

        var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function() {
                console.log("Load scene: " + alaMasculina.getName() );

                core.setInteractiveObjectVisible("io-conversar_com_paciente", false );

                if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == true ) {
                    core.setInteractiveObjectVisible("io-conversar_com_paciente", true );
                } else if ( level.getFlag("ler_prontuario").getValue() == true ) {

                } else {
                    level.getFlag("conversar_paciente").setValue( true );
                    core.openDialog( 0 );
                }
            });

        alaMasculina.registerDialogs([
            // 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 1
            new Dialog( lib.characters.pacientes.josivaldo )
                .setText( Dialogs.alaMasculina[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 2
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.alaMasculina[ 2 ], function() {
                    level.getFlag("ler_prontuario").setValue( true );
                    core.closeDialog();
                })
                .registerOption( Dialogs.alaMasculina[ 3 ], function() {
                    core.openDialog( 3 );
                })
                .setRandomize( true ),

             // 3
             new Dialog( lib.characters.mentor )
                .setText( Dialogs.alaMasculina[ 4 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 4
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo3 )
                .registerOption("", function() {
                    core.closeDialog();
                })
         ]);


        alaMasculina.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function() {
                    console.log("voltando para corredor");

                    core.changeScene( 1 );

                }),

            new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
                .setCssClass("intObj-ir_leito_fase3")
                .onClick(function() {

                    if ( level.getFlag("ir_leito_paciente").getValue() == false ) {
                        level.getFlag("ir_leito_paciente").setValue( true );
                        console.log("Abrir diálogo com paciente 6");
                        core.registerScoreItem( Scores.irAoLeitoCorreto );
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( true )
        ]);

        alaMasculina.registerActions([

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true )

         ]);

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {

                console.log("Load scene: " + farmacia.getName() );

                /*
                if(level.getFlag("conversar_paciente").getValue() == false)
                           core.openDialog(6);
                       core.changeScene(1);*/

            });

        farmacia.registerDialogs([
            // 0
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.farmacia[ 0 ], function() {
                    core.openDialog( 1 );
                })
                .registerOption( Dialogs.farmacia[ 1 ], function() {
                    core.openDialog( 3 );
                })
                .setRandomize( true ),

            // 1
            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 2 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 3 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 3

            new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 0 );
                }),

            // 4
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarDieta )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 5
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.conferirDieta )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 6
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        farmacia.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
               .setCssClass("action-ir_corredor")
               .onClick(function() {

                    //   if(level.getFlag("ler_prontuario").getValue() == false)
                    //        core.openDialog(6);
                    //     core.changeScene(1);

                    if ( level.getFlag("pegarDieta").getValue() == false ) {
                        core.openDialog( 4 );
                    }

                    if ( level.getFlag("pegarDieta").getValue() == true && level.getFlag("conferirDieta").getValue() == false ) {
                        core.openDialog( 5 );
                    }

                    if ( level.getFlag("pegarDieta").getValue() == true && level.getFlag("conferirDieta").getValue() == true ) {
                        core.changeScene( 1 );
                    }
                }),

            new Action("btn-pegarFrascoDieta", "Pegar Frasco de Dieta")
                .setCssClass("action-frasco_dieta")
                .onClick(function() {
                    level.getFlag("pegarDieta").setValue( true );
                    core.registerScoreItem( Scores.pegarDieta );
                    console.log("GANHA 50 PONTOS");
                }),

            new Action("btn-conferirMedicamento", "Conferir Dieta Prescrita")
                .setCssClass("action-conferirDieta")
                .onClick(function() {
                    if ( level.getFlag("pegarDieta").getValue() == false ) {

                    } else {
                        level.getFlag("conferirDieta").setValue( true );
                        core.registerScoreItem( Scores.conferirDieta );
                        console.log("GANHA 150 PONTOS");
                        core.openDialog( 2 );
                    }
                })
           ]);

    // endregion FARMACIA

    // region POSTO DE ENFERMAGEM

    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
    .onLoad(function() {

      console.log("Load scene: " + postoDeEnfermagem.getName() );

      //     if(level.getFlag("ler_prontuario").getValue() == false || level.getFlag("conferirDieta").getValue() == false)

  });

    postoDeEnfermagem.registerDialogs([

        // 0
        new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.postoEnfermagem[ 0 ], function() {
            core.closeDialog();
            core.registerScoreItem( Scores.calcularInfusaoDieta );
        })
        .registerOption( Dialogs.postoEnfermagem[ 1 ], function() {
            core.openDialog( 2 );
        })
        .registerOption( Dialogs.postoEnfermagem[ 2 ], function() {
            core.openDialog( 2 );
        })
        .setRandomize( true ),

          // 1

          new Dialog( lib.characters.mentor )
          .setText( Dialogs.postoEnfermagem[ 3 ] )
          .registerOption("", function() {
            core.closeDialog();
        }),

        // 2
        new Dialog( lib.characters.mentor )
        .setText( Dialogs.postoEnfermagem[ 4 ] )
        .registerOption("", function() {
            core.openDialog( 0 );
        })

        ]);

    postoDeEnfermagem.registerInteractiveObjects([

        new InteractiveObject("io-abrir_gaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {

            if ( level.getFlag("pegar_bandeja").getValue() == false ) {
                core.openDialog( 1 );
            } else {
                console.log("Action: abrir_gaveta");
                core.openModalScene("gaveta");
                core.openCommandBar();
            }
        })
        .setVisibility( true ),

        new InteractiveObject("io-pegar_bandeja", "Pegar Bandeja")
        .setCssClass("intObj-bandeja")
        .onClick(function() {
            console.log("Action: Pegar bandeja");
            level.getFlag("pegar_bandeja").setValue( true );
                    // linha importante
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
        .setVisibility( true )

        ]);

    postoDeEnfermagem.registerActions([

        new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {
                if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == false ) {
                    //   core.openDialog(0);
                } else {
                    core.changeScene( 1 );
                }
            }),

        new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {

                if ( level.getFlag("score_lavarMaos1").getValue() == false ) {
                    core.registerScoreItem( Scores.lavarMaos1 );
                }

                level.getFlag("score_lavarMaos1").setValue( true );
            })
            .setVisibility( true )

    ]);

    // endregion POSTO DE ENFERMAGEM

    // region LEITO

    var leito = lib.scenes.leitos.ana.getClone()
    .onLoad(function() {

     core.openDialog( 0 );

     if ( level.getFlag("score_falarComPaciente").getValue() == false ) {
        level.getFlag("score_falarComPaciente").setValue( true );
        core.registerScoreItem( Scores.falarComPaciente );
    }

});

    leito.registerDialogs([

        // 0
        new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 0 ] )
        .registerOption("", function() {
            core.openDialog( 1 );
        }),
        // 1
        new Dialog( lib.characters.pacientes.josivaldo )
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

        new Dialog( lib.characters.pacientes.josivaldo )
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
        new Dialog( lib.characters.pacientes.josivaldo )
        .setText( Dialogs.leitoPaciente[ 5 ] )
        .registerOption("", function() {
            core.closeDialog();
        })

        ]);

    leito.registerInteractiveObjects([

        new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_01-checar_pulseira")
        .onClick(function() {
            console.log("IO: pulseira_paciente");
            core.openModalScene("Pulseira");
            pulseira.open();
            core.openCommandBar();
        })
        .setVisibility( true )
        .setEnable( false )
        ]);

    leito.registerActions([

      new Action("btn-pegar_suporte_soro", "Pegar Suporte de Soro")
      .setCssClass("action-pegar_suporte_soro")
      .onClick(function() {

        if ( level.getFlag("score_pegar_suporte_soro").getValue() == false ) {
            core.registerScoreItem( Scores.pegarSuporteSoro );
        }

        level.getFlag("score_pegar_suporte_soro").setValue( true );

    })
      .setVisibility( true ),

      new Action("btn-elevar_cama", "Elevar Cabeceira da Cama em 90º")
      .setCssClass("action-elevar_cama")
      .onClick(function() {

        if ( level.getFlag("score_elevar_cama").getValue() == false ) {
            core.registerScoreItem( Scores.elevarCama );
        }

        level.getFlag("score_elevar_cama").setValue( true );

    })
      .setVisibility( true ),

      new Action("btn-verificar_sonda", "Verificar Local da Sonda")
      .setCssClass("action-verificar_sonda")
      .onClick(function() {

        if ( level.getFlag("score_verificar_sonda").getValue() == false ) {
            core.registerScoreItem( Scores.verificarSonda );
        }

        level.getFlag("score_verificar_sonda").setValue( true );

    })
      .setVisibility( true ),

      new Action("btn-administrar_dieta", "Administrar Dieta")
      .setCssClass("action-administrar_dieta")
      .onClick(function() {

        if ( level.getFlag("score_administrar_dieta").getValue() == false ) {
            core.registerScoreItem( Scores.administrarDieta );
        }

        level.getFlag("score_administrar_dieta").setValue( true );

    })
      .setVisibility( true ),

      new Action("btn-colocar_gotejamento", "Colocar Gotejamento")
      .setCssClass("action-colocar_gotejamento")
      .onClick(function() {

        if ( level.getFlag("score_colocar_gotejamento").getValue() == false ) {
            core.registerScoreItem( Scores.colocarGotejamento );
        }

        level.getFlag("score_colocar_gotejamento").setValue( true );

    })
      .setVisibility( true ),

      new Action("btn-lavarMaos", "Lavar as mãos")
      .setCssClass("action-lavarMaos")
      .onClick(function() {

        if ( level.getFlag("score_lavarMaos2").getValue() == false ) {
            core.registerScoreItem( Scores.lavarMaos2 );
        }

        level.getFlag("score_lavarMaos2").setValue( true );

    })
      .setVisibility( true ),

        new Action("btn-anotar_prontuario", "Anotar prontuario")
            .setCssClass("action-anotar_prontuario")
            .onClick(function() {
                console.log("Action: Anotar prontuario");
                if ( level.getFlag("score_lavarMaos2").getValue() == false ) {
                    // core.openDialog(19);
                } else {

                    Prontuario.open();
                    core.openModalScene("Prontuario");

                    if ( level.getFlag("score_anotar_prontuario").getValue() == false ) {
                        core.registerScoreItem( Scores.anotarNoProntuario );
                        level.getFlag("score_anotar_prontuario").setValue( true );
                    }
                }
            })
            .setVisibility( true )

      ]);

    // endregion LEITO

    pulseira = new Scene("Pulseira", "Pulseira");

    pulseira.registerInteractiveObjects([

        ]);

    pulseira.registerActions([
        new Action("btn-largar_pulseira", "Fechar pulseira")
        .setCssClass("action-pulseira_paciente")
        .onClick(function() {
            console.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");

                   //     core.setActionVisible("btn-examinar_paciente", true);    // LINHA IMPORTANTE

                   if ( level.getFlag("score_verificar_pulseira").getValue() == false ) {
                    core.registerScoreItem( Scores.verificarPulseira );
                    level.getFlag("score_verificar_pulseira").setValue( true );
                }

                    pulseira.close();
                })
        .setVisibility( true )
        ]);

        // region PRONTUARIO

        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == false ) {
                        core.openDialog( 2 );
                    } else {
                        Prontuario.close();
                        core.setActionVisible("btn-fechar_prontuario", false );
                        core.showEndOfLevel();
                    }
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);

        // region GAVETA
        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick(function() {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");

                    if ( (level.getFlag("pegar_copo_descartavel").getValue() == true) &&
                        (level.getFlag("pegar_agua_potavel").getValue() == true) &&
                        (level.getFlag("pegar_seringa").getValue() == true) &&
                        (level.getFlag("pegar_equipoCorreto").getValue() == true) )  {

                        core.openDialog( 0 );
                        core.openDialog( 0 );
                        level.getFlag("pegou_tudo_postoEnfermagem").setValue( true );
                        level.getFlag("pegou_tudo_postoEnfermagem").setValue( true );
                    }
                })
                .setVisibility( true )

        ]);

    gaveta.registerInteractiveObjects([

        new InteractiveObject("io-copo_descartavel", "Copo Descartável")
        .setCssClass("intObj-copoDescartavel")
        .onClick(function() {

            console.log("IntObj: io-copo_descartavel");
            level.getFlag("pegar_copo_descartavel").setValue( true );
            core.setInteractiveObjectVisible("io-copo_descartavel", false );

            core.registerScoreItem( Scores.pegarCopoDescartavel );

        })
        .setVisibility( true ),

        new InteractiveObject("io-agua_potavel", "Água Potável")
        .setCssClass("intObj-aguaPotavel")
        .onClick(function() {

            console.log("IntObj: io-agua_potavel");
            level.getFlag("pegar_agua_potavel").setValue( true );
            core.setInteractiveObjectVisible("io-agua_potavel", false );

            core.registerScoreItem( Scores.pegarAguaPotavel );

        })
        .setVisibility( true ),

        new InteractiveObject("io-seringa", "Seringa")
        .setCssClass("intObj-seringa_de_10_ml")
        .onClick(function() {

            console.log("IntObj: io-seringa");
            level.getFlag("pegar_seringa").setValue( true );
            core.setInteractiveObjectVisible("io-seringa", false );

            core.registerScoreItem( Scores.pegarSeringa );

        })
        .setVisibility( true ),

        new InteractiveObject("io-infusao", "Equipamento de infusão de dieta")
        .setCssClass("intObj-equipo_de_infusao_de_dieta")
        .onClick(function() {

            console.log("intObj-equipo_de_infusao_de_dieta");
            level.getFlag("pegar_equipoCorreto").setValue( true );
            core.setInteractiveObjectVisible("io-infusao", false );

            core.registerScoreItem( Scores.pegarEquipoCorreto );

        })
        .setVisibility( true ),

        new InteractiveObject("io-equipoErrado", "Equipamento ??????????????????")
        .setCssClass("equipo")
        .onClick(function() {

            console.log("intObj-equipo");
            level.getFlag("pegar_equipoErrado").setValue( true );
            core.setInteractiveObjectVisible("io-equipoErrado", false );

            core.registerScoreItem( Scores.pegarEquipoErrado );

        })
        .setVisibility( true )
    ]);

        // endregion

        // region ModalScenes

        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        level.registerModalScene( pulseira );

        // endregion

        // region Level

        // region Register Scenes

        // 0
        level.registerScene( recepcao );
        // 1
        level.registerScene( corredor );
        // 2
        level.registerScene( alaMasculina );
        // 3
        level.registerScene( leito );
        // 4
        level.registerScene( farmacia );
        // 5
        level.registerScene( postoDeEnfermagem );
        // 6
        level.registerScene( centroCirurgico );
        // 7
        level.registerScene( alaFeminina );

        // endregion

        // region Register Modal Scenes

        // endregion

        // region Flags

        // endregion

        level.setSetupScript(function() {
            // Script that runs once when the level is loaded or reloaded
            level.getFlag("conversar_mentor").setValue( false );
            level.getFlag("conversar_paciente").setValue( false );
            level.getFlag("score_ir_postoEnfermagem_horaErrada").setValue( false );
            level.getFlag("scoreIrFarmaciaHoraErrada").setValue( false );
            level.getFlag("scoreIrAlaFemininaHoraErrada").setValue( false );
            level.getFlag("scoreIrCentroCirurgicoHoraErrada").setValue( false );
            level.getFlag("ir_AlaMasculina_primeiraVez").setValue( false );
            level.getFlag("ler_prontuario").setValue( false );
            level.getFlag("pegarDieta").setValue( false );
            level.getFlag("pegar_seringa").setValue( false );
            level.getFlag("conferirDieta").setValue( false );
            level.getFlag("lavarMaos").setValue( false );
            level.getFlag("pegar_bandeja").setValue( false );
            level.getFlag("pegou_tudo_posto_enfermagem").setValue( false );
            level.getFlag("score_lavarMaos1");
            level.getFlag("score_lavarMaos2");
            level.getFlag("pegar_equipoCorreto").setValue( false );
            level.getFlag("pegar_copo_descartavel").setValue( false );
            level.getFlag("pegar_equipoErrado").setValue( false );
            level.getFlag("pegou_tudo_postoEnfermagem").setValue( false );
            level.getFlag("ir_leito_paciente").setValue( false );
            level.getFlag("score_verificar_pulseira").setValue( false );
            level.getFlag("score_falarComPaciente").setValue( false );
            level.getFlag("score_pegar_suporte_soro").setValue( false );
            level.getFlag("score_verificar_sonda").setValue( false );
            level.getFlag("score_administrar_dieta").setValue( false );
            level.getFlag("score_colocar_gotejamento").setValue( false );
            level.getFlag("score_anotar_prontuario").setValue( false );

            //  dados do prontuario
            Prontuario.setNome("Josivaldo Silva");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("02/02/1961");
            Prontuario.setIdade("54 anos");
            Prontuario.setProfissao("Pedreiro");
            Prontuario.setPai("Josué Souza Silva");
            Prontuario.setMae("Maria das Graças Costa Silva");
            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("15/05/2015");
            Prontuario.setLeito("01 - Enfermaria Masculina");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Câncer de esôfago");
            Prontuario.setObservacoes("Diagnóstico identificado de Câncer (CA) de Esôfago há um ano atrás, encontra-se em cuidados paliativos.");
            Prontuario.setPeso("48");
            Prontuario.setAltura("1,60");
            Prontuario.setCircunferenciaAbdominal("70");
            Prontuario.setPrescEnfermagemState("decubito");
            Prontuario.setPrescMedicaRowData( 1, "", "Nutrição Enteral (Hipercalórica  0,99 cal/ml)", "Sonda Nasogástrica", "200 ml/01 hora", "06h/06h", "(X) Administrado dieta sem intercorrências", false );
            Prontuario.setPrescMedicaRowData( 1, "", "Morfina (solução oral/gota)", "Oral", "40mg/ml", "12/12h", "(X) Administrado medicamento,", false );
            Prontuario.setSsvvRowData( 1, "", "100X10 mmHg", "65 bpm", "16 rpm", "93%", "36.5ºC", true );
            Prontuario.setAnotacaoEnfermagemRowData( "15/03", "" );
        });

        level.registerFlag( new Flag("conversar_mentor"), false );
        level.registerFlag( new Flag("conversar_paciente"), false );
        level.registerFlag( new Flag("score_ir_postoEnfermagem_horaErrada"), false );
        level.registerFlag( new Flag("scoreIrFarmaciaHoraErrada"), false );
        level.registerFlag( new Flag("scoreIrAlaFemininaHoraErrada"), false );
        level.registerFlag( new Flag("scoreIrCentroCirurgicoHoraErrada"), false );
        level.registerFlag( new Flag("ir_AlaMasculina_primeiraVez"), false );
        level.registerFlag( new Flag("ler_prontuario"), false );
        level.registerFlag( new Flag("pegarDieta"), false );
        level.registerFlag( new Flag("pegar_seringa"), false );
        level.registerFlag( new Flag("conferirDieta"), false );
        level.registerFlag( new Flag("lavarMaos"), false );
        level.registerFlag( new Flag("pegar_bandeja"), false );
        level.registerFlag( new Flag("pegou_tudo_posto_enfermagem"), false );
        level.registerFlag( new Flag("score_lavarMaos1"), false );
        level.registerFlag( new Flag("score_lavarMaos2"), false );
        level.registerFlag( new Flag("pegar_copo_descartavel"), false );
        level.registerFlag( new Flag("pegar_agua_potavel"), false );
        level.registerFlag( new Flag("pegar_equipoCorreto"), false );
        level.registerFlag( new Flag("pegar_equipoErrado"), false );
        level.registerFlag( new Flag("pegou_tudo_postoEnfermagem"), false );
        level.registerFlag( new Flag("ir_leito_paciente"), false );
        level.registerFlag( new Flag("score_verificar_pulseira"), false );
        level.registerFlag( new Flag("score_falarComPaciente"), false );
        level.registerFlag( new Flag("score_pegar_suporte_soro"), false );
        level.registerFlag( new Flag("score_verificar_sonda"), false );
        level.registerFlag( new Flag("score_administrar_dieta"), false );
        level.registerFlag( new Flag("score_colocar_gotejamento"), false );
        level.registerFlag( new Flag("score_anotar_prontuario"), false );

        level.setInitialScene( 0 );
        // endregion

        game.registerLevel( level, 6 );

        console.groupEnd();
    });
