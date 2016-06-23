/*
This file is part of Cuidando Bem.

    Cuidando Bem is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cuidando Bem is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
*/

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData", "EquipoGotejamento", "Ficha" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores, EquipoGotejamento, Ficha ) {

        var Dialogs = require("DialogsData").fase7;
        var Alertas = require("DialogsData").alertas;
        var Scores = Scores.level6;
        var Player = require("Player");


        var level = new Level("Level 7");
        level.setMaxPoints( Scores._sum );
        console.groupCollapsed( level.getName() );

        var recepcao,
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
            zoom,
            frascoDieta;


        var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
            });

        centroCirurgico.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true )
        ]);

        function corredorIrCentroCirurgico() {
            core.changeScene( 6 );
            if ( core.flag("scoreIrCentroCirurgicoHoraErrada") == false ) {

                core.flag("scoreIrCentroCirurgicoHoraErrada",  true );
                core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );
                console.log("PERDEU 25 PONTOS");
            }
        }


        var alaFeminina = lib.scenes.alaFeminina.getClone()
        .setCssClass("scene-bedroom-level5")
        .onLoad(function() {

        });

        function corredorIrAlaFeminina() {
           core.changeScene( 7 );

            if ( core.flag("scoreIrAlaFemininaHoraErrada") == false ) {

                core.flag("scoreIrAlaFemininaHoraErrada",  true );
                core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
                console.log("PERDEU 25 PONTOS");

            }

        }


        alaFeminina.registerInteractiveObjects([

         new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function() {
                    console.log("voltando para corredor");

                    core.changeScene( 1 );

                })

      ]);


        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );

                 if(core.flag("conversar_recepcionista") == false) {
                    core.flag("conversar_recepcionista", true);
                    core.openDialog( 0 );

                }

            });

        recepcao.registerInteractiveObjects([
                new InteractiveObject("intObj-conversar_recepcionista", "Conversar com a Recepcionista")
                    .setCssClass("intObj-talkToReceptionist")
                    .setVisibility( true )
                    .onClick( conversarRecepcionista ),

                new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-left no-glow")
                    .onClick( recepcaoIrCorredor )
                    .setVisibility( true ),

                new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-right no-glow")
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
            console.log("Ir ao corredor");
            core.changeScene( 1 );
        }

        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog( 0 );
        }


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");

                 core.openCommandBar();
                core.setActionVisible("btn-ir_recepcao", true);

                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInLoop( Player.audios.loops.recepcao );
                if ( core.flag("conversar_mentor") == false ) {
                    core.flag("conversar_mentor",  true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInRange( Player.audios.musics.inGame );
            });

     corredor.registerActions([

             new Action("btn-ir_recepcao", "Voltar para a recepção")
                .setCssClass("action-voltarRecepcao")
                .onClick(function() {

                    core.changeScene( 0 );

                })
                .setVisibility( true ),

        ]);

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

            new InteractiveObject("io-ir_centro_cirurgico", "Ir ao Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico")
                .onClick( corredorIrCentroCirurgico )
                .setVisibility( true ),

            new InteractiveObject("io-ir_farmacia", "Ir à Farmacia")
                .setCssClass("intObj-goToFarmacia")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir ao Posto de Enfermagem")
                .setCssClass("intObj-goToPostoEnfermagem")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),

            new InteractiveObject("io-ir_ala_feminina", "Ir à Enfermaria Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true ),

            new InteractiveObject("io-ir_alaMasculina", "Ir à Enfermaria Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true ),

            new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function() {
                    core.closeCommandBar();
                    console.log("Abrir diálogo com o mentor");

                    if ( core.flag("ir_AlaMasculina_primeiraVez") == false ) {
                        core.openDialog( 0 );
                    }
                    /*   if (core.flag("fim_fase") == true)
                    core.openDialog(6);*/
                })
                .setVisibility( true )
        ]);

        function corredorIrFarmacia() {
            if ( core.flag("ler_prontuario") == true ) {
                core.changeScene( 4 );
                core.openDialog( 0 );
            }
        }

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");

            if ( core.flag("conferirDieta") == true ) {
                core.changeScene( 5 );
            }

            /* if(core.flag("pegarDieta") == true && core.flag("conferirDieta") == true)
                    core.changeScene(6);
            else
                {

                    core.changeScene(6);

                    if(core.flag("score_ir_postoEnfermagem_horaErrada") == false){
                        core.flag("score_ir_postoEnfermagem_horaErrada", true);
                        core.registerScoreItem(Scores.irPostoEnfermagemHoraErrada);

                    }

            }*/
        }

        function corredorIrAlaMasculina() {
            console.log("Action: coredorirAlaMasculina");
            core.changeScene( 2 );
        }


        var alaMasculina = lib.scenes.alaMasculina.getClone()
            .setCssClass("scene-bedroom-level6")
            .onLoad(function() {
                console.log("Load scene: " + alaMasculina.getName() );

                core.setInteractiveObjectVisible("io-conversar_com_paciente", false );

                if ( core.flag("pegou_tudo_postoEnfermagem") == true ) {
                    core.setInteractiveObjectVisible("io-conversar_com_paciente", true );
                } else if ( core.flag("ler_prontuario") == true ) {

                } else {
                    core.flag("conversar_paciente",  true );
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
                    core.flag("ler_prontuario",  true );
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

                    if ( core.flag("ir_leito_paciente") == false ) {
                        core.flag("ir_leito_paciente",  true );
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
                    Prontuario.open("prescMedica");
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true )

         ]);

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {

                console.log("Load scene: " + farmacia.getName() );

                /*
                if(core.flag("conversar_paciente") == false)
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
                    // Ativando o frasco de dieta e o seu botão para conferí-lo
                    core.setInteractiveObjectVisible("io-frasco_de_dieta", true );
                    core.openCommandBar();
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
                }),

            //7
               new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[5] )
                .registerOption("", function() {
                    core.closeDialog();
                }),




        ]);

        farmacia.registerInteractiveObjects([
            // Frasco de dieta
            new InteractiveObject("io-frasco_de_dieta", "Pegar frasco de dieta")
                .setCssClass("intObj-frasco_de_dieta")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    if ( core.flag("pegarDieta") == false ) {
                        core.flag("pegarDieta",  true );
                        core.registerScoreItem( Scores.pegarDieta );
                    }
                    core.setInteractiveObjectVisible("io-frasco_de_dieta", false );
                    core.setActionVisible("btn-conferirMedicamento", true);
                })
                .setVisibility( false )
        ]);

        farmacia.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
               .setCssClass("action-ir_corredor")
               .onClick(function() {

                    //   if(core.flag("ler_prontuario") == false)
                    //        core.openDialog(6);
                    //     core.changeScene(1);

                    if ( core.flag("pegarDieta") == false ) {
                        core.openDialog( 4 );
                    }

                    if ( core.flag("pegarDieta") == true && core.flag("conferirDieta") == false ) {
                        core.openDialog( 5 );
                    }

                    if ( core.flag("pegarDieta") == true && core.flag("conferirDieta") == true ) {
                        core.changeScene( 1 );
                    }
                }),

            new Action("btn-conferirMedicamento", "Conferir Dieta Prescrita")
                .setCssClass("action-frasco_dieta")
                .onClick(function() {
                    if ( core.flag("pegarDieta") == false ) {
                            core.openDialog(7);
                    } else {

                        if( core.flag("conferirDieta") == false)  {
                        core.flag("conferirDieta",  true );
                        core.registerScoreItem( Scores.conferirDieta );
                        }

                        core.openModalScene("conferirFrascoDieta");

                    }
                })
                .setVisibility(false),

                    new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {

                    Prontuario.open("prescMedica");
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true ),
           ]);


    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
    .onLoad(function() {

      console.log("Load scene: " + postoDeEnfermagem.getName() );

      //     if(core.flag("ler_prontuario") == false || core.flag("conferirDieta") == false)

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
        .setText( Alertas.esqueceu.pegarBandeja )
        .registerOption("", function() {
            core.closeDialog();
        }),

        // 2
        new Dialog( lib.characters.mentor )
        .setText( Dialogs.postoEnfermagem[ 3 ] )
        .registerOption("", function() {
            core.openDialog( 0 );
        }),

        // 3

        new Dialog( lib.characters.mentor )
        .setText( Dialogs.postoEnfermagem[ 4 ] )
        .registerOption("", function() {
            core.closeDialog(  );
        }),

        ]);

    postoDeEnfermagem.registerInteractiveObjects([

        new InteractiveObject("io-abrir_gaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {
            // Som
            Player.play( Player.audios.sfx.abrirGaveta );
            if ( core.flag("pegar_bandeja") == false ) {
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
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            core.flag("pegar_bandeja",  true );
                    // linha importante
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
        .setVisibility( true )

        ]);

    postoDeEnfermagem.registerActions([

        new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {
                if ( core.flag("pegou_tudo_postoEnfermagem") == false ) {
                    //   core.openDialog(0);
                } else {
                    core.changeScene( 1 );
                }
            }),

        new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );
                if ( core.flag("score_lavarMaos1") == false ) {
                    core.registerScoreItem( Scores.lavarMaos1 );
                }

                core.flag("score_lavarMaos1",  true );
            })
            .setVisibility( true ),

        new Action("btn-ler_prontuario", "Ler prontuario")
            .setCssClass("action-ler_prontuario")
            .onClick(function() {
                console.log("Action: ler prontuario");
                Prontuario.open();
                core.openModalScene("Prontuario");
            })
            .setVisibility( true )

    ]);


    var leito = lib.scenes.leitos.josivaldo.getClone()
    .onLoad(function() {

     core.openDialog( 0 );

     if ( core.flag("score_falarComPaciente") == false ) {
        core.flag("score_falarComPaciente",  true );
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
        }),

        // 6
        new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.erroGotejamento )
                .registerOption("", function() {
                    core.closeDialog(  );
                }),


        ]);

    leito.registerInteractiveObjects([

        new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_07-checar_pulseira")
        .onClick(function() {
            console.log("IO: pulseira_paciente");
            core.openModalScene("Pulseira");
            Pulseira.open();
            core.openCommandBar();
        })
        .setVisibility( true ),
    //    .setEnable( false ),


            new InteractiveObject("io-conversar_paciente07", "Falar com o paciente")

                .setCssClass("intObj-conversar_paciente")
                .onClick(function() {


                })
                .setVisibility( true )


        ]);

    leito.registerActions([

      new Action("btn-pegar_suporte_soro", "Pegar Suporte de Soro")
      .setCssClass("action-pegarSuporte")
      .onClick(function() {

        if ( core.flag("score_pegar_suporte_soro") == false ) {
            core.registerScoreItem( Scores.pegarSuporteSoro );
            core.changeSceneCssClassTo("scene-bedChar07b");
        }

        core.flag("score_pegar_suporte_soro",  true );
        core.setActionVisible("btn-pegar_suporte_soro", false);

    })
      .setVisibility( true ),

      new Action("btn-elevar_cama", "Elevar Cabeceira da Cama em 90º")
      .setCssClass("action-elevarCama")
      .onClick(function() {

        if ( core.flag("score_elevar_cama") == false ) {
            core.registerScoreItem( Scores.elevarCama );
            core.changeSceneCssClassTo("scene-bedChar07d");
        }

        core.flag("score_elevar_cama",  true );
        core.setActionVisible("btn-elevar_cama", false);

    })
      .setVisibility( true ),



           new Action("btn-colocarSoro", "Colocar Soro")
            .setCssClass("action-frasco_dieta")
            .onClick(function() {


                core.changeSceneCssClassTo("scene-bedChar07c");
                core.setActionVisible("btn-colocarSoro", false);



            })
            .setVisibility( true ),


      new Action("btn-verificar_sonda", "Verificar Local da Sonda")
      .setCssClass("action-verificar-sonda")
      .onClick(function() {

        if ( core.flag("score_verificar_sonda") == false ) {
            core.registerScoreItem( Scores.verificarSonda );
        }

        core.flag("score_verificar_sonda",  true );

    })
      .setVisibility( true ),

      new Action("btn-administrar_dieta", "Administrar Dieta")
      .setCssClass("action-frasco_dieta")
      .onClick(function() {

        if ( core.flag("score_administrar_dieta") == false ) {
            core.registerScoreItem( Scores.administrarDieta );
        }

        core.flag("score_administrar_dieta",  true );

    })
      .setVisibility( true ),

      new Action("btn-colocar_gotejamento", "Colocar Gotejamento")
      .setCssClass("action-colocarSoroDieta")
      .onClick(function() {

        if ( core.flag("score_colocar_gotejamento") == false ) {
            core.registerScoreItem( Scores.colocarGotejamento );
        }

        core.flag("score_colocar_gotejamento",  true );

             EquipoGotejamento.open();
             core.openModalScene("equipoSoro");

    })
      .setVisibility( true ),

      new Action("btn-lavarMaos", "Lavar as mãos")
      .setCssClass("action-lavarMaos")
      .onClick(function() {
        // Som
        Player.play( Player.audios.sfx.lavarMaos );
        if ( core.flag("score_lavarMaos2") == false ) {
            core.registerScoreItem( Scores.lavarMaos2 );
        }

        core.flag("score_lavarMaos2",  true );

    })
      .setVisibility( true ),

        new Action("btn-anotar_prontuario", "Anotar prontuario")
            .setCssClass("action-anotar_prontuario")
            .onClick(function() {
                console.log("Action: Anotar prontuario");
                if ( core.flag("score_lavarMaos2") == false ) {
                    // core.openDialog(19);
                } else {

                    Prontuario.open();
                    core.openModalScene("Prontuario");

                    if ( core.flag("score_anotar_prontuario") == false ) {
                        core.registerScoreItem( Scores.anotarNoProntuario );
                        core.flag("score_anotar_prontuario",  true );
                    }
                }
            })
            .setVisibility( true )

      ]);


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

                   if ( core.flag("score_verificar_pulseira") == false ) {
                    core.registerScoreItem( Scores.verificarPulseira );
                    core.flag("score_verificar_pulseira",  true );
                }

                    Pulseira.close();
                })
        .setVisibility( true )
        ]);


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    if ( core.flag("pegarDieta") == false ) {
                        core.openDialog( 2 );
                    } else {
                        Prontuario.close();
                        // core.setActionVisible("btn-fechar_prontuario", false );
                        if ( core.flag("score_colocar_gotejamento") == true ) {
                            core.unlockLevel( 8 );
                            core.closeCommandBar();
                            core.showEndOfLevel();
                            Player.stopAll();
                            Player.play( Player.audios.sfx.missaoCumprida );
                        }
                    }
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);


        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    console.log("Action: fechar_gaveta");
                    // Som
                    Player.play( Player.audios.sfx.fecharGaveta );
                    core.closeModalScene("Gaveta");

                    if ( (core.flag("pegar_copo_descartavel") == true) &&
                        (core.flag("pegar_agua_potavel") == true) &&
                        (core.flag("pegar_seringa") == true) &&
                        (core.flag("pegar_equipoCorreto") == true) )  {

                        core.openDialog( 0 );
                        /*core.openDialog( 0 );
                        core.flag("pegou_tudo_postoEnfermagem",  true );*/
                        core.flag("pegou_tudo_postoEnfermagem",  true );
                    }
                })
                .setVisibility( true )

        ]);

    gaveta.registerInteractiveObjects([

        new InteractiveObject("io-copo_descartavel", "Copo Descartável")
        .setCssClass("intObj-copoDescartavel")
        .onClick(function() {

            console.log("IntObj: io-copo_descartavel");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            core.flag("pegar_copo_descartavel",  true );
            core.setInteractiveObjectVisible("io-copo_descartavel", false );

            core.registerScoreItem( Scores.pegarCopoDescartavel );

        })
        .setVisibility( true ),

        new InteractiveObject("io-agua_potavel", "Água Potável")
        .setCssClass("intObj-aguaPotavel")
        .onClick(function() {

            console.log("IntObj: io-agua_potavel");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            core.flag("pegar_agua_potavel",  true );
            core.setInteractiveObjectVisible("io-agua_potavel", false );

            core.registerScoreItem( Scores.pegarAguaPotavel );

        })
        .setVisibility( true ),

        new InteractiveObject("io-seringa", "Seringa")
        .setCssClass("intObj-seringa_de_10_ml")
        .onClick(function() {

            console.log("IntObj: io-seringa");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            core.flag("pegar_seringa",  true );
            core.setInteractiveObjectVisible("io-seringa", false );

            core.registerScoreItem( Scores.pegarSeringa );

        })
        .setVisibility( true ),

        new InteractiveObject("io-infusao", "Equipamento de infusão de dieta")
        .setCssClass("intObj-equipo_de_infusao_de_dieta")
        .onClick(function() {

            console.log("intObj-equipo_de_infusao_de_dieta");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            core.flag("pegar_equipoCorreto",  true );
            core.setInteractiveObjectVisible("io-infusao", false );

            core.registerScoreItem( Scores.pegarEquipoCorreto );

        })
        .setVisibility( true ),


            new InteractiveObject("io-equipoSoro", "Equipamento de soro")
            .setCssClass("intObj-equipo_de_soro")
            .onClick(function() {

                // Som
                Player.play( Player.audios.sfx.pegarObjeto );

                core.openDialog( 3 );

                if(core.flag("pegar_equipoSoro") == false) {
                core.registerScoreItem( Scores.pegarEquipoErrado );
                core.flag("pegar_equipoSoro", true );
                }


            })
            .setVisibility( true )


    ]);

        frascoDieta = new Scene("conferirFrascoDieta", "Conferir Frasco de Dieta")
            .setCssClass("modalScene-frascoDieta");

        frascoDieta.registerActions([
            new Action("btn-fechar_zoom", "Finalizar conferição")
                .setCssClass("action-frasco_dieta")
                .onClick(function() {
                    console.log("Action: Finalizar conferição");
                    core.closeModalScene("conferirFrascoDieta");
                    core.openDialog( 2 );
                })
        ]);

        equipoSoro = new Scene("equipoSoro", "EquipamentoSoro")

        var erro = 0;

        equipoSoro.registerActions([

            new Action("btn-fecharEquipoSoro", "Fechar Equipamento de Soro")
            .setCssClass("action-colocarSoroDieta")
            .onClick(function() {

                  if(EquipoGotejamento.isValueRight()){

                    if(core.flag("score_gotejar_soro") == false){
                         core.registerScoreItem( Scores.gotejarSoroEquipo );
                         core.flag("score_gotejar_soro", true);
                    }

                    EquipoGotejamento.close();
                    core.closeModalScene("equipoSoro");

                }

                else {
                    core.closeCommandBar();
                    core.openDialog(6);
                    erro = erro + 1;

                    if(erro == 3){
                        core.registerScoreItem( Scores.naoGotejarSoroEquipo );
                        erro = -100;
                    }
                }





            })
            .setVisibility( true )



        ]);


        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        level.registerModalScene( pulseira );
        level.registerModalScene( frascoDieta );
        level.registerModalScene( equipoSoro );


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


        level.setSetupScript(function() {

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
            Prontuario.setLeito("03 - Enfermaria Masculina");
            Prontuario.setAntecedentes("");
            Prontuario.setHipotese("Câncer de esôfago");
            Prontuario.setObservacoes("Diagnóstico identificado de Câncer (CA) de Esôfago há um ano atrás, encontra-se em cuidados paliativos.");
            Prontuario.setPeso("48");
            Prontuario.setAltura("1,60");
            Prontuario.setCircunferenciaAbdominal("70");

            Prontuario.setPrescMedicaRowData( 0, "", "Nutrição Enteral (Hipercalórica  0,99 cal/ml)", "Sonda Nasogástrica", "200 ml/01 hora", "06h/06h", false, true );
            Prontuario.setPrescMedicaRowData( 1, "", "Morfina (solução oral/gota)", "Oral", "40mg/ml", "12/12h", true, true );
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

            Prontuario.clearPrescEnfermagemState( );
            Prontuario.setPrescEnfermagemState("nutricao_desequilibrada");
            Prontuario.setPrescEnfermagemState("manutencao_sonda_nasogastrica");
            Prontuario.setPrescEnfermagemState("desiquilibrio_eletrolitico");

            Prontuario.setSsvvRowData( 0, "", "100X10", "65", "16", "93", "36.5", true );
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );
            Prontuario.setAnotacaoEnfermagemRowData( "", "" );


            // 'pulseira' content
            Pulseira.setNameRegExp( /Josivaldo Silva/ );
            Pulseira.setLeitoRegExp( /0*3/ );
            Pulseira.setDataRegExp( /02\/02\/1961/ );

            Pulseira.setName("Josivaldo Silva");
            Pulseira.setLeito("03");
            Pulseira.setData("02/02/1961");
            Pulseira.disable();

            EquipoGotejamento.setRightValue( 67 );

            Ficha.setEnfermeiraRegexp( /Masculina/i );
            Ficha.setPacienteRegexp( /Josivaldo Silva/i );
            Ficha.setLeitoRegexp( /0?3/ );
            Ficha.setVolumeRegexp( /200/ );
            Ficha.setDuracao( 1 );
            Ficha.setGotasRegexp( /66,66/ );
            Ficha.setGotasAproxRegexp( /67/ );

        });

        level.registerFlag( new Flag( "conversar_mentor",  false  ) );
        level.registerFlag( new Flag( "conversar_paciente",  false  ) );
        level.registerFlag( new Flag( "score_ir_postoEnfermagem_horaErrada",  false  ) );
        level.registerFlag( new Flag( "scoreIrFarmaciaHoraErrada",  false  ) );
        level.registerFlag( new Flag( "scoreIrAlaFemininaHoraErrada",  false  ) );
        level.registerFlag( new Flag( "scoreIrCentroCirurgicoHoraErrada",  false  ) );
        level.registerFlag( new Flag( "ir_AlaMasculina_primeiraVez",  false  ) );
        level.registerFlag( new Flag( "ler_prontuario",  false  ) );
        level.registerFlag( new Flag( "pegarDieta",  false  ) );
        level.registerFlag( new Flag( "pegar_seringa",  false  ) );
        level.registerFlag( new Flag( "conferirDieta",  false  ) );
        level.registerFlag( new Flag( "lavarMaos",  false  ) );
        level.registerFlag( new Flag( "pegar_bandeja",  false  ) );
        level.registerFlag( new Flag( "pegou_tudo_posto_enfermagem",  false  ) );
        level.registerFlag( new Flag( "score_lavarMaos1",  false  ) );
        level.registerFlag( new Flag( "score_lavarMaos2",  false  ) );
        level.registerFlag( new Flag( "pegar_copo_descartavel",  false  ) );
        level.registerFlag( new Flag( "pegar_agua_potavel",  false  ) );
        level.registerFlag( new Flag( "pegar_equipoCorreto",  false  ) );
        level.registerFlag( new Flag( "pegar_equipoErrado",  false  ) );
        level.registerFlag( new Flag( "pegou_tudo_postoEnfermagem",  false  ) );
        level.registerFlag( new Flag( "ir_leito_paciente",  false  ) );
        level.registerFlag( new Flag( "score_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_falarComPaciente",  false  ) );
        level.registerFlag( new Flag( "score_pegar_suporte_soro",  false  ) );
        level.registerFlag( new Flag( "score_elevar_cama",  false  ) );
        level.registerFlag( new Flag( "score_verificar_sonda",  false  ) );
        level.registerFlag( new Flag( "score_administrar_dieta",  false  ) );
        level.registerFlag( new Flag( "score_colocar_gotejamento",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_gotejar_soro",  false  ) );
        level.registerFlag( new Flag( "conversar_recepcionista",  false  ) );

        level.setInitialScene( 0 );

        game.registerLevel( level, 7 );

        console.groupEnd();
    });
