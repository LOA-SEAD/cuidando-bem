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

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {


        var Dialogs = require("DialogsData").fase9;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level9;
        var Player = require("Player");


        var level = new Level("Level 9");
        console.groupCollapsed( level.getName() );


     var
            recepcao,
            corredor,
            alaMasculina,
            alaFeminina,
            alaMasculina,
            centroCirurgico,
            salaDeLeitos,
            leito,
            postoDeEnfermagem,
            farmacia,
            gaveta,
            pulseira,
            prontuario,
            zoom;


     var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
            });


    function corredorIrCentroCirurgico() {

                core.changeScene( 6 );
                if ( level.getFlag("score_irCentroCirurgico_horaErrada").getValue() == false ) {

                    level.getFlag("score_irCentroCirurgico_horaErrada").setValue( true );
                    // core.registerScoreItem( Scores.irCentroCirurgico_horaErrada );
                    console.log("PERDEU 25 PONTOS");

                }


        }


         var alaFeminina = new Scene("alaFeminina", "Ala Feminina")
            .setCssClass("scene-bedroom-level9")
            .onLoad(function() {

            });


              function corredorIrAlaFeminina() {
             core.changeScene( 7 );


            if ( level.getFlag("score_iralaFeminina_horaErrada").getValue() == false ) {

                    level.getFlag("score_iralaFeminina_horaErrada").setValue( true );
                    // core.registerScoreItem( Scores.irAlaFeminina_horaErrada );


            }

        }


        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );

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
        ]);


            function recepcaoIrCorredor() {
                console.log("Ir para o corredor");
                core.changeScene( 1 );
        }


    function conversarRecepcionista() {


    }


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {


            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });


        corredor.registerDialogs([

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


             new InteractiveObject("io-ir_ala_masculina", "Ir para a Ala Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true )


    ]);

        function corredorIrFarmacia() {


                if ( level.getFlag("conversar_paciente").getValue() == false ) {

                    if ( level.getFlag("score_ir_farmacia_horaErrada").getValue() == false ) {
                        level.getFlag("score_ir_farmacia_horaErrada").setValue( true );
                        core.registerScoreItem( Scores.irFarmaciaHoraErrada );

                         core.changeScene( 4 );
                    }
                } else {
                   core.changeScene( 4 );
                }
        }

        function corredorIrPostoEnfermagem() {


            core.changeScene( 5 );


    }


        function corredorIrAlaMasculina() {
            core.changeScene( 2 );
        }


      var alaMasculina = lib.scenes.alaMasculina.getClone()
            .setCssClass("scene-bedroom-level9")
            .onLoad(function() {


                if ( level.getFlag("conversar_paciente").getValue() == false ) {
                    core.openDialog( 0 );
                    level.getFlag("conversar_paciente").setValue( true );
                } else if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == true ) {

                     core.setInteractiveObjectVisible("io-ir_ao_leito", true );
                     core.setActionVisible("btn-lavarMaos", true );
                     core.setActionVisible("btn-prescricao_medica", false );

                }


                console.log("Load scene: " + alaMasculina.getName() );

                /*
                 core.setInteractiveObjectVisible("io-conversar_com_paciente", false);
                */
            });


     alaMasculina.registerDialogs([

         // 0 jogador
           new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.alaMasculina[ 0 ], function() {
                    core.openDialog( 1 );
                })
                .registerOption( Dialogs.alaMasculina[ 1 ], function() {
                    core.openDialog( 4 );
                })
                .setRandomize( true ),

         // 1 - paciente

           new Dialog( lib.characters.pacientes.francisco )
                .setText( Dialogs.alaMasculina[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),

         // 2 jogador

           new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),

         // 3 - jogador

          new Dialog( lib.characters.pacientes.francisco )
                .setText( Dialogs.alaMasculina[ 4 ] )
                .registerOption("", function() {
                    core.closeDialog(  );
                }),

         // 4 - mentor corrige

         new Dialog( lib.characters.mentor )
                .setText( Dialogs.alaMasculina[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 0 );
                }),


         // 5 - MENTOR ALERTA

           new Dialog( lib.characters.mentor )
                     .setText( Dialogs.alaMasculina[ 6 ] )
                    .registerOption("", function() {
                core.closeDialog(  );
            }),
          // 6 - MENTOR ALERTA LAVAR MAOS

           new Dialog( lib.characters.mentor )
                     .setText( Alertas.lavarMaos.tipo1 )
                    .registerOption("", function() {
                core.closeDialog(  );
            })
    ]);


    alaMasculina.registerInteractiveObjects([


      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function() {
                console.log("voltando para corredor");

                    if ( level.getFlag("pegar_prescricao_medica").getValue() == false ) {
                        core.openDialog( 5 );
                    } else {
                       core.changeScene( 1 );
                    }

            }),


         new InteractiveObject("io-ir_ao_leito", "Ir ao leito")
                .setCssClass("intObj-irLeitoEsquerda")
                .onClick(function() {

                    if ( level.getFlag("lavar_maos").getValue() == true ) {
                        core.changeScene( 3 );
                    } else {
                        core.openDialog( 6 );
                    }


            })
           .setVisibility( false )


 ]);

     alaMasculina.registerActions([


            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {

                    if ( level.getFlag("ler_prontuario").getValue() == false ) {
                            level.getFlag("ler_prontuario").setValue( true );
                            core.registerScoreItem( Scores.lerProntuario );
                            core.setActionVisible("btn-prescricao_medica", true );

                    }

                        Prontuario.open();
                        core.openModalScene("Prontuario");
                        core.registerScoreItem( Scores.verProntuario );


            })
                .setVisibility( true ),


            new Action("btn-prescricao_medica", "Pegar prescrição médica")
                .setCssClass("action-pegar_prescricao")
                .onClick(function() {

                    if ( level.getFlag("pegar_prescricao_medica").getValue() == false ) {

                        level.getFlag("pegar_prescricao_medica").setValue( true );
                        core.registerScoreItem( Scores.pegarPrescricaoMedica );

                    }

            })
                .setVisibility( false ),


            new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );

                if ( level.getFlag("lavar_maos").getValue() == false ) {
                        level.getFlag("lavar_maos").setValue( true );
                        core.registerScoreItem( Scores.lavarMaos );
                }
            })
            .setVisibility( false )

         ]);


      var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {

                if ( level.getFlag("pegar_prescricao_medica").getValue() == false ) {
                        core.openDialog( 4 );
                } else {

                    core.openDialog( 0 );
                    core.setActionVisible("btn-pegarFrascoDieta", true );
                    core.setActionVisible("btn-cloretoSodio_20_10ml", true );
                    core.setActionVisible("btn-conferirMedicamento", true );
                }

                console.log("Load scene: " + farmacia.getName() );


            });

        farmacia.registerDialogs([

            // 0

            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 1
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.farmacia[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),

            // 2

             new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 2 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 3 MENTOR CORRIGE

                 new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 3 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 4 - esqueceu paciente

                new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                }),


            // 5 - esqueceu verificar medicamente


                new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verificarMedicamento3 )
                .registerOption("", function() {
                    core.closeDialog();
                })


        ]);

        farmacia.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
               .setCssClass("action-ir_corredor")
               .onClick(function() {


                    if ( level.getFlag("conferirMedicamento").getValue() == true  ) {
                        core.changeScene( 1 );
                    } else {

                        core.openDialog( 5 );

                   }


                })
               .setVisibility( true ),

            new Action("btn-pegarFrascoDieta", "Pegar Frasco de SG 5%")
                .setCssClass("action-frasco_dieta")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    if ( level.getFlag("pegarFrascoSG").getValue() == false ) {

                    level.getFlag("pegarFrascoSG").setValue( true );
                    core.registerScoreItem( Scores.pegarFrascoSG );

                        }

                })
             .setVisibility( false ),


            new Action("btn-cloretoSodio_20_10ml", "Pegar NaCL 20%")
                .setCssClass("action-cloretoSodio_20_10ml")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                     if ( level.getFlag("pegarNACL").getValue() == false ) {

                    level.getFlag("pegarNACL").setValue( true );
                    core.registerScoreItem( Scores.pegarNACL );

                     }

                })
             .setVisibility( false ),


            new Action("btn-conferirMedicamento", "Conferir Medicamento")
                .setCssClass("action-conferirMedicamento")
                .onClick(function() {


                    if ( level.getFlag("pegarFrascoSG").getValue() == false || level.getFlag("pegarNACL").getValue() == false ) {
                            core.openDialog( 3 );
                    } else {

                        if ( level.getFlag("conferirMedicamento").getValue() == false )  {
                        level.getFlag("conferirMedicamento").setValue( true );
                        core.registerScoreItem( Scores.conferirDieta );
                        }
                    }
                })
             .setVisibility( false )
           ]);


    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
    .onLoad(function() {

        //   if(level.getFlag("pegar_prescricao_medica").getValue() == false){

        //     //    core.setInteractiveObjectVisible("io-abrir_gaveta", false );
        //      //   core.setInteractiveObjectVisible("io-pegar_bandeja", false );
        //         core.openDialog(2);


        // }
        // else {
        //     core.changeScene(5);
        //     core.setInteractiveObjectVisible("io-abrir_gaveta", true );
        //     core.setInteractiveObjectVisible("io-pegar_bandeja", true );


        //         }


      console.log("Load scene: " + postoDeEnfermagem.getName() );

      //     if(level.getFlag("ler_prontuario").getValue() == false || level.getFlag("conferirDieta").getValue() == false)

  });

    postoDeEnfermagem.registerDialogs([

        // 0

          new Dialog( lib.characters.mentor )
          .setText( Alertas.esqueceu.pegarBandeja )
          .registerOption("", function() {
            core.closeDialog();
        }),

        // 1
         new Dialog( lib.characters.mentor )
          .setText( Dialogs.postoDeEnfermagem[ 0 ]  )
          .registerOption("", function() {
            core.closeDialog();
        }),

          // 2
         new Dialog( lib.characters.mentor )
          .setText( Alertas.esqueceu.pegarMedicamento  )
          .registerOption("", function() {
            core.closeDialog();
        })


        ]);

    postoDeEnfermagem.registerInteractiveObjects([

        new InteractiveObject("io-abrir_gaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {
            // Som
            Player.play( Player.audios.sfx.abrirGaveta );
            if ( level.getFlag("pegar_bandeja").getValue() == false ) {
                core.openDialog( 0 );
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
            level.getFlag("pegar_bandeja").setValue( true );
            core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
        .setVisibility( true )

        ]);

    postoDeEnfermagem.registerActions([

        new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {


                if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == false ) {
                       core.openDialog( 1 );
                } else {
                    core.changeScene( 1 );
                }
            })
         .setVisibility( true ),

        new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );
                if ( level.getFlag("score_lavarMaos1").getValue() == false ) {
                    level.getFlag("score_lavarMaos1").setValue( true );
                    core.registerScoreItem( Scores.lavarMaos1 );
                }


            })
            .setVisibility( true )

    ]);


        leito = lib.scenes.leitos.francisco.getClone()
            .onLoad(function() {


            })
            .onUnload(function() {


            });

    leito.registerInteractiveObjects([


             new InteractiveObject("io-falar_paciente", "Falar com o paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {

                 if ( level.getFlag("conversar_paciente_leito").getValue() == false ) {
                     level.getFlag("conversar_paciente_leito").setValue( true );
                     core.registerScoreItem( Scores.conversarPacienteLeito );
                 }

                 core.openDialog( 0 );

        })
        .setVisibility( true )


    ]);


    leito.registerDialogs([


        // 0
         new Dialog( lib.characters.jogador )
          .setText(  Dialogs.leitoPaciente[ 0 ] )
          .registerOption("", function() {
            core.openDialog( 1 );
        }),

        // 1
         new Dialog( lib.characters.pacientes.francisco )
          .setText( Dialogs.leitoPaciente [ 1 ] )
          .registerOption("", function() {
            core.openDialog( 2 );
        }),


        // 2
         new Dialog( lib.characters.jogador )
          .setText(  Dialogs.leitoPaciente[ 2 ] )
          .registerOption("", function() {
            core.openDialog( 3 );
        }),


         // 3
         new Dialog( lib.characters.pacientes.francisco )
          .setText( Dialogs.leitoPaciente [ 3 ] )
          .registerOption("", function() {
            core.openDialog( 4 );
        }),


         // 4
        new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.leitoPaciente[ 4 ], function() {
            core.closeDialog();
        })
        .registerOption( Dialogs.leitoPaciente[ 5 ], function() {
            core.openDialog( 5 );
        })
        .setRandomize( true ),


        // 5

         new Dialog( lib.characters.mentor )
          .setText(  Dialogs.leitoPaciente[ 6 ] )
          .registerOption("", function() {
            core.openDialog( 4 );
        })


    ]);


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([

            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {


                        Prontuario.close();
                    //    core.setActionVisible("btn-fechar_prontuario", false );


                    console.log("Action: Fechar prontuario");

                    core.closeModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);


        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick(function() {

                    console.log("Action: fechar_gaveta");
                    // Som
                    Player.play( Player.audios.sfx.fecharGaveta );
                    core.closeModalScene("Gaveta");

                    if ( (level.getFlag("pegar_seringa").getValue() == true) &&
                        (level.getFlag("pegar_agulha").getValue() == true) &&
                        (level.getFlag("pegar_ampola").getValue() == true) &&
                        (level.getFlag("pegar_equipoSoro").getValue() == true) )  {


                      //  core.openDialog( 0 );
                        level.getFlag("pegou_tudo_postoEnfermagem").setValue( true );

                    }
                })
                .setVisibility( true )

        ]);

    gaveta.registerInteractiveObjects([

        new InteractiveObject("io-seringa", "Seringa")
        .setCssClass("intObj-seringa_de_10_ml")
        .onClick(function() {

            console.log("IntObj: io-seringa");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            level.getFlag("pegar_seringa").setValue( true );
            core.setInteractiveObjectVisible("io-seringa", false );

            core.registerScoreItem( Scores.pegarSeringa );

        })
        .setVisibility( true ),

        new InteractiveObject("io-agulha", "Agulha 40X12")
        .setCssClass("intObj-agulha_40x12")
        .onClick(function() {

            console.log("intObj-agulha_40x12");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            level.getFlag("pegar_agulha").setValue( true );
            core.setInteractiveObjectVisible("io-agulha", false );

            core.registerScoreItem( Scores.pegarAgulha );

        })
        .setVisibility( true ),

        new InteractiveObject("io-ampola", "Ampola de Glicose 50%")
        .setCssClass("intObj-ampola_glicose_50")
        .onClick(function() {

            console.log("intObj-glicose");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            level.getFlag("pegar_ampola").setValue( true );
            core.setInteractiveObjectVisible("io-ampola", false );

            core.registerScoreItem( Scores.pegarAmpola );

        })
        .setVisibility( true ),


         new InteractiveObject("io-equipoSoro", "Equipamento de Soro Macrogotas")
        .setCssClass("intObj-soro_glicofisiologico_1000_ml")
        .onClick(function() {

            console.log("intObj-equipoSoro");
            // Som
            Player.play( Player.audios.sfx.pegarObjeto );
            level.getFlag("pegar_equipoSoro").setValue( true );
            core.setInteractiveObjectVisible("io-equipoSoro", false );

            core.registerScoreItem( Scores.pegarSoro );

        })
        .setVisibility( true )


    ]);


        // 00
        level.registerScene( recepcao );
        // 01
        level.registerScene( corredor );
        // 02
        level.registerScene( alaMasculina );
        // 03
        // level.registerScene( leito );
        // 04
        level.registerScene( farmacia );
        // 05
        level.registerScene( postoDeEnfermagem );
        // 06
        level.registerScene( centroCirurgico );
        // 07
        level.registerScene( alaFeminina );


            level.registerModalScene( prontuario );
            level.registerModalScene( gaveta );
        //  level.registerModalScene( pulseira );


        level.setSetupScript(function() {
            // Script that runs once when the level is loaded or reloaded

            level.getFlag("score_iralaFeminina_horaErrada").setValue( false );
            level.getFlag("score_irCentroCirurgico_horaErrada").setValue( false );
            level.getFlag("conversar_paciente").setValue( false );
            level.getFlag("score_ir_farmacia_horaErrada").setValue( false );
            level.getFlag("pegar_prescricao_medica").setValue( false );
            level.getFlag("ler_prontuario").setValue( false );
            level.getFlag("pegarFrascoSG").setValue( false );
            level.getFlag("pegarNACL").setValue( false );
            level.getFlag("conferirMedicamento").setValue( false );
            level.getFlag("pegar_bandeja").setValue( false );
            level.getFlag("pegar_seringa").setValue( false );
            level.getFlag("pegar_agulha").setValue( false );
            level.getFlag("pegar_ampola").setValue( false );

            level.getFlag("pegar_equipoSoro").setValue( false );
            level.getFlag("pegou_tudo_postoEnfermagem").setValue( false );
            level.getFlag("lavar_maos").setValue( false );
            level.getFlag("conversar_paciente_leito").setValue( false );
             //  dados do prontuario
            Prontuario.setNome("Pedro Alcides Mendonça");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("03/06/1962");
            Prontuario.setIdade("52 anos");
            Prontuario.setProfissao("Professor");
            Prontuario.setPai("Aldair Mendonça");
            Prontuario.setMae("Ana Laura Alcídes Mendonça");
            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("27/12/2015");
            Prontuario.setLeito("01 - Enfermaria Masculina");
            Prontuario.setAntecedentes("Ocorrência de internação por Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório no mês de outubro");
            Prontuario.setHipotese("Desidratação de grau moderado");
            Prontuario.setObservacoes("Grande perda de eletrólitos");
            Prontuario.setPeso("62");
            Prontuario.setAltura("1,77");
            Prontuario.setCircunferenciaAbdominal("91");

            Prontuario.setPrescMedicaRowData( 0, "", "Soro Glicosado 5%", "Endovenosa", "800ml", "", false, true );
            Prontuario.setPrescMedicaRowData( 1, "", "NaCL 20%", "Endovenosa", "20ml", "", false, true );
            Prontuario.setPrescMedicaRowData( 2, "", "Glicose 50%", "Endovenosa", "30ml", "", "(X) Administrado a infusão de  solução de  reposição  hidroeletrolítica  conforme  prescrição  médica, sem  intercorrências.", false );
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

            // Prontuario.setPrescEnfermagemState("desiquilibrio_eletrolitico_fase9");

            Prontuario.setSsvvRowData( 0, "", "130X70", "82", "19", "96", "35.9", true );
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );
        //    Prontuario.setAnotacaoEnfermagemRowData( "15/03", "" );
        });


        level.registerFlag( new Flag("score_iralaFeminina_horaErrada"), false );
        level.registerFlag( new Flag("score_irCentroCirurgico_horaErrada"), false );
        level.registerFlag( new Flag("conversar_paciente"), false );
        level.registerFlag( new Flag("score_ir_farmacia_horaErrada"), false );
        level.registerFlag( new Flag("pegar_prescricao_medica"), false );
        level.registerFlag( new Flag("ler_prontuario"), false );
        level.registerFlag( new Flag("pegarFrascoSG"), false );
        level.registerFlag( new Flag("pegarNACL"), false );
        level.registerFlag( new Flag("conferirMedicamento"), false );
        level.registerFlag( new Flag("pegar_bandeja"), false );
        level.registerFlag( new Flag("pegar_seringa"), false );
        level.registerFlag( new Flag("pegar_agulha"), false );
        level.registerFlag( new Flag("pegar_ampola"), false );
        level.registerFlag( new Flag("pegar_equipoSoro"), false );
        level.registerFlag( new Flag("pegou_tudo_postoEnfermagem"), false );
        level.registerFlag( new Flag("lavar_maos"), false );
        level.registerFlag( new Flag("conversar_paciente_leito"), false );

        level.setInitialScene( 0 );


        game.registerLevel( level, 9 );

        console.groupEnd();
    });
