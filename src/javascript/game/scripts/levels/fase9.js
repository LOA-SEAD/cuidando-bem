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


        var recepcao,
            corredor,
            alaMasculina,
            alaMasculina2,
            alaFeminina,
            centroCirurgico,
            salaDeLeitos,
            leito,
            leito2,
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


       centroCirurgico.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {

                    core.changeScene( 1 );

            })
            .setVisibility( true ),

        ]);


        function corredorIrCentroCirurgico() {

            core.changeScene( 6 );
            if ( core.flag("score_irCentroCirurgico_horaErrada") == false ) {

                core.flag("score_irCentroCirurgico_horaErrada", true );
                core.registerScoreItem( Scores.irCentroCirurgico_horaErrada );
                console.log("PERDEU 25 PONTOS");

            }


        }


        var alaFeminina = new Scene("alaFeminina", "Ala Feminina")
            .setCssClass("scene-bedroom-level9")
            .onLoad(function() {

            });


       alaFeminina.registerInteractiveObjects([


            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
            .setCssClass("intObj-irAlaMasculina_corredor")
            .onClick(function() {
                console.log("voltando para corredor");

                    core.changeScene( 1 );


            }),





    ]);


        function corredorIrAlaFeminina() {
            core.changeScene( 7 );


            if ( core.flag("score_iralaFeminina_horaErrada") == false ) {

                core.flag("score_iralaFeminina_horaErrada", true );
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
                console.log("Entrando no corredor");
                Player.stopAll();
                Player.playInLoop( Player.audios.loops.recepcao );
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
                Player.stopAll();
                Player.playInRange( Player.audios.musics.inGame );
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


            new InteractiveObject("io-ir_ala_feminina", "Ir para a Enfermaria Feminina")
            .setCssClass("intObj-goToAlaFeminina")
            .onClick( corredorIrAlaFeminina )
            .setVisibility( true ),


            new InteractiveObject("io-ir_ala_masculina", "Ir para a Enfermaria Masculina")
            .setCssClass("intObj-goToAlaMasculina")
            .onClick( corredorIrAlaMasculina )
            .setVisibility( true )


        ]);

        function corredorIrFarmacia() {


            if ( core.flag("conversar_paciente") == false ) {

                if ( core.flag("score_ir_farmacia_horaErrada") == false ) {
                    core.flag("score_ir_farmacia_horaErrada", true );
                    core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                }

                    core.changeScene( 4 );

            } else {
                core.changeScene( 4 );
            }
        }

        function corredorIrPostoEnfermagem() {



            core.changeScene( 5 );



        }


        function corredorIrAlaMasculina() {

            if(core.flag("pegou_tudo_postoEnfermagem") == true && core.flag("trocou_de_leito") == false){

                    core.changeScene(9);
            }
            else if(core.flag("trocou_de_leito") == true || core.flag("conversar_paciente") == false || core.flag("conferirMedicamento") == true) {

                core.changeScene( 2 );

            }
        }


       var alaMasculina2 = lib.scenes.alaMasculina.getClone()
            .setCssClass("scene-bedroom-level9")
            .onLoad(function() {


                    core.setInteractiveObjectVisible("io-ir_ao_leito", true );
                    core.setActionVisible("btn-lavarMaos", true );
            });


            alaMasculina2.registerInteractiveObjects([


            new InteractiveObject("io-ir_ao_leito", "Ir ao leito")
            .setCssClass("intObj-irLeitoEsquerda")
            .onClick(function() {

                    if ( core.flag( "lavar_maos" ) == true ) {
                        core.changeScene( 3 );
                    } else {
                        core.openDialog( 0 );
                    }



            })
            .setVisibility( false )



            ]);


            alaMasculina2.registerActions ([

                new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );

                if ( core.flag("lavar_maos") == false ) {
                    core.flag("lavar_maos", true );
                    core.registerScoreItem( Scores.lavarMaos );
                }

            })
            .setVisibility( false ),

            ]);

            alaMasculina2.registerDialogs([


            // 0
                 new Dialog( lib.characters.mentor )
            .setText( Alertas.lavarMaos.tipo1 )
            .registerOption("", function() {
                core.closeDialog();
            })

            ]);



        var alaMasculina = lib.scenes.alaMasculina.getClone()
            .setCssClass("scene-bedroom-level9-trocado")
            .onLoad(function() {

                if ( core.flag("conversar_paciente") == false ) {
                    core.openDialog( 0 );
                    core.flag("conversar_paciente", true );


                }
                else if( core.flag( "trocou_de_leito" ) == true )

            {

                    core.setInteractiveObjectVisible("io-ir_ao_leito1", true );

                    core.setActionVisible("btn-ler_prontuario", false );

                }

            });

    //    core.setInteractiveObjectVisible("io-ir_ao_leito", true );
        //            core.setActionVisible("btn-lavarMaos", false );



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
                core.closeDialog();
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
                core.closeDialog();
            }),
            // 6 - MENTOR ALERTA LAVAR MAOS

            new Dialog( lib.characters.mentor )
            .setText( Alertas.lavarMaos.tipo1 )
            .registerOption("", function() {
                core.closeDialog();
            })
        ]);


        alaMasculina.registerInteractiveObjects([


            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
            .setCssClass("intObj-irAlaMasculina_corredor")
            .onClick(function() {
                console.log("voltando para corredor");

                if ( core.flag("pegar_prescricao_medica") == false ) {
                    core.openDialog( 5 );
                } else {
                    core.changeScene( 1 );
                }

            }),



            new InteractiveObject("io-ir_ao_leito1", "Ir ao leito")
            .setCssClass("intObj-irLeitoEsquerda")
            .onClick(function() {

                core.changeScene( 8 );

            })
            .setVisibility( false )





        ]);

        alaMasculina.registerActions([


            new Action("btn-ler_prontuario", "Ler prontuario")
            .setCssClass("action-ler_prontuario")
            .onClick(function() {

                if ( core.flag("ler_prontuario") == false ) {
                    core.flag("ler_prontuario", true );
                    core.registerScoreItem( Scores.lerProntuario );

                }

                 if ( core.flag("pegar_prescricao_medica") == false ) {

                    core.flag("pegar_prescricao_medica", true );
                    core.registerScoreItem( Scores.pegarPrescricaoMedica );

                }




                Prontuario.open();
                core.openModalScene("Prontuario");



            })
            .setVisibility( true ),




            new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );

                if ( core.flag("lavar_maos") == false ) {
                    core.flag("lavar_maos", true );
                    core.registerScoreItem( Scores.lavarMaos );
                }

            })
            .setVisibility( false ),


        ]);


        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {


                if ( core.flag("pegar_prescricao_medica") == false  ) {
                     core.openDialog( 4 );
                     core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );
                     core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
                     core.setActionVisible("btn-conferirMedicamento", false );
                 }
                else if(core.flag("pegou_tudo_postoEnfermagem") == true || core.flag("trocou_de_leito") == true || core.flag("conferirMedicamento") == true) {

                     core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );
                     core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
                     core.setActionVisible("btn-conferirMedicamento", false );

                }
                else {

                     core.openDialog( 0 );
                    core.setInteractiveObjectVisible("io-pegarFrascoDieta", true );
                    core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", true );
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
            }),

            // 6

              new Dialog( lib.characters.mentor )
            .setText( Dialogs.farmacia[ 4 ] )
            .registerOption("", function() {
                core.closeDialog();
            })
        ]);


        farmacia.registerInteractiveObjects([


         new InteractiveObject("io-pegarFrascoDieta", "Pegar Frasco de SG 5%")
            .setCssClass("intObj-soro_glicofisiologico_1000_ml")
            .onClick(function() {

                 Player.play( Player.audios.sfx.pegarObjeto );


                    core.flag("pegarFrascoSG", true );
                    core.registerScoreItem( Scores.pegarFrascoSG );
                console.log("GANHOU 50 PTS");
                    core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );

            })
            .setVisibility( true ),



             new InteractiveObject("io-cloretoSodio_20_10ml", "Pegar NaCL 20%")
            .setCssClass("intObj-cloreto_de_sodio_10__10_ml_")
            .onClick(function() {

                 Player.play( Player.audios.sfx.pegarObjeto );

                if ( core.flag("pegarNACL") == false ) {

                    core.flag("pegarNACL", true );
                    core.registerScoreItem( Scores.pegarNACL );
                    core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
                }

            })
            .setVisibility( true ),


        ]);

        farmacia.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {



                if(core.flag("pegar_prescricao_medica") == false){


                    core.changeScene(1);

              }

                else if(core.flag("pegarNACL") == false || core.flag("pegarFrascoSG") == false ) {

                    core.openDialog( 6 );
                }

                else if(core.flag("conferirMedicamento") == false){
                    core.openDialog(3);
                }
                else
                    core.changeScene(1);



            })
            .setVisibility( true ),


            new Action("btn-conferirMedicamento", "Conferir Medicamento")
            .setCssClass("action-conferirMedicamento")
            .onClick(function() {
                if ( (core.flag("pegarFrascoSG") == false) || (core.flag("pegarNACL") == false ) {
                    core.openDialog( 3 );
                } else {

                    if ( core.flag("conferirMedicamento") == false ) {
                        core.flag("conferirMedicamento", true );
                        core.registerScoreItem( Scores.conferirDieta );
                    }
                }
            })
            .setVisibility( true )

        ]);


        var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {

                  console.log("Load scene: " + postoDeEnfermagem.getName() );


                // falta dar um tapa aqui

               if(core.flag("conferirMedicamento") == false){

                    core.setInteractiveObjectVisible("io-abrir_gaveta", false );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                    core.openDialog(2);
                 }
                 else {
                     core.setInteractiveObjectVisible("io-abrir_gaveta", true );
                     core.setInteractiveObjectVisible("io-pegar_bandeja", true );
                    }



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
            .setText( Dialogs.postoDeEnfermagem[ 0 ] )
            .registerOption("", function() {
                core.closeDialog();
            }),

            // 2
            new Dialog( lib.characters.mentor )
            .setText( Alertas.esqueceu.pegarMedicamento )
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
                if ( core.flag("pegar_bandeja") == false ) {
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
                core.flag("pegar_bandeja", true );
                core.setInteractiveObjectVisible("io-pegar_bandeja", false );
            })
            .setVisibility( true )

        ]);

        postoDeEnfermagem.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {


                if(core.flag("pegar_prescricao_medica") == false ){
                    core.changeScene(1);


            })
            .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );
                if ( core.flag("score_lavarMaos1") == false ) {
                    core.flag("score_lavarMaos1", true );
                    core.registerScoreItem( Scores.lavarMaos1 );
                }


            })
            .setVisibility( true )

        ]);


        leito = lib.scenes.leitos.raul_leito01.getClone()
            .onLoad(function() {


            })
            .onUnload(function() {


            });


        leito.registerActions([

            new Action("btn-ir_ala_masculina", "Voltar a Ala Masculina")
            .setCssClass("action-ir_sala_de_leitos")
            .onClick(function() {


                if(core.flag("trocou_de_leito") == true)
                    core.changeScene( 2 );
                else
                    core.openDialog(7);


            })
            .setVisibility( false )


        ]);


        leito.registerInteractiveObjects([


            new InteractiveObject("io-falar_paciente", "Falar com o paciente")
            .setCssClass("intObj-conversar_paciente")
            .onClick(function() {

                if ( core.flag( "trocou_de_leito" ) == false ) {
                    core.openDialog( 0 );
                    core.flag( "trocou_de_leito",  true  );
                    core.setActionVisible("btn-ir_ala_masculina", true );

                }


            })
            .setVisibility( true ),


            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
            .setCssClass("intObj-paciente_03-checar_pulseira")
            .onClick(function() {

                core.openModalScene("Pulseira");
                Pulseira.open();
                core.openCommandBar();


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
            new Dialog( lib.characters.pacientes.francisco )
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
            new Dialog( lib.characters.pacientes.francisco )
            .setText( Dialogs.leitoPaciente[ 3 ] )
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
            .setText( Dialogs.leitoPaciente[ 6 ] )
            .registerOption("", function() {
                core.openDialog( 4 );
            }),


            // 6

            new Dialog( lib.characters.mentor )
            .setText( Dialogs.leitoPaciente[ 7 ] )
            .registerOption("", function() {
                core.closeDialog();
            }),

            // 7 - falar com o paciente

            new Dialog( lib.characters.mentor )
            .setText( Alertas.esqueceu.falarPaciente )
            .registerOption("", function() {
                core.closeDialog();
            }),






        ]);



        leito2 = lib.scenes.leitos.francisco.getClone()
            .onLoad(function() {

               // core.registerScoreItem( Scores.conversarPacienteLeito );

            })
            .onUnload(function() {


            });



        leito2.registerDialogs([



            // 0

            new Dialog( lib.characters.jogador )
            .setText( Dialogs.leitoPaciente1[ 0 ] )
            .registerOption("", function() {
                core.openDialog( 1 );
            }),

            // 1

            new Dialog( lib.characters.pacientes.francisco )
            .setText( Dialogs.leitoPaciente1[ 1 ] )
            .registerOption("", function() {
                core.openDialog( 2 );
            }),

            // 2

            new Dialog( lib.characters.jogador )
            .setText( Dialogs.leitoPaciente1[ 2 ] )
            .registerOption("", function() {
                core.openDialog( 3 );
            }),

            // 3

            new Dialog( lib.characters.pacientes.francisco )
            .setText( Dialogs.leitoPaciente1[ 3 ] )
            .registerOption("", function() {
                core.openDialog( 4 );
            }),

            // 4

            new Dialog( lib.characters.jogador )
            .setText( Dialogs.leitoPaciente1[ 4 ] )
            .registerOption("", function() {
                core.closeDialog();
            }),

            // 5

            new Dialog( lib.characters.mentor )
            .setText( Alertas.lavarMaos.tipo3 )
            .registerOption("", function() {
                core.closeDialog();
            })




        ]);


       leito2.registerInteractiveObjects([

         new InteractiveObject("io-falar_paciente", "Falar com o paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {


                     core.openDialog(0);

            if(level.getFlag("falar_paciente_correto").getValue() == false) {

                level.getFlag("falar_paciente_correto").setValue(true);
                core.registerScoreItem( Scores.conversarPacienteLeito );
            }

            core.setActionVisible("btn-pegar_suporte_soro", true );
            core.setActionVisible("btn-administrar_medicamente", true );
            core.setActionVisible("btn-realizar_gotejamento", true );
            core.setActionVisible("btn-lavarMaos", true );
            core.setActionVisible("btn-anotar_prontuario", true );


        })
        .setVisibility( true ),


         new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_05-checar_pulseira")
                .onClick(function() {

                        core.openModalScene("Pulseira2");
                        Pulseira2.open();
                        core.openCommandBar();


                })
                .setVisibility( true ),

     ]);




    leito2.registerActions([


             new Action("btn-pegar_suporte_soro", "Pegar Suporte de Soro")
            .setCssClass("action-pegar-soro")
            .onClick(function() {

                if ( core.flag( "pegar_suporte_soro" ) == false ) {
                    core.flag( "pegar_suporte_soro",  true  );
                    core.registerScoreItem( Scores.pegarSuporteSoro );
                }

            })
            .setVisibility( false ),


            new Action("btn-administrar_medicamente", "Administrar Medicamento")
            .setCssClass("action-administrar-medicamento")
            .onClick(function() {

                if ( core.flag( "administrar_medicamento" ) == false ) {
                    core.flag( "administrar_medicamento",  true  );
                    core.registerScoreItem( Scores.administrarMedicamento );
                }

            })
            .setVisibility( false ),


            new Action("btn-realizar_gotejamento", "Realizar Gotejamento de Soro")
            .setCssClass("action-realizar-gotejamento")
            .onClick(function() {

                if ( core.flag( "realizar_gotejamento" ) == false ) {
                    core.flag( "realizar_gotejamento",  true  );
                    core.registerScoreItem( Scores.realizarGotejamento );
                }

            })
            .setVisibility( false ),


            new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {
                // Som
                Player.play( Player.audios.sfx.lavarMaos );

                if ( core.flag( "lavar_maos3" ) == false ) {
                    core.flag( "lavar_maos3",  true  );
                    core.registerScoreItem( Scores.lavarMaos3 );
                }

            })
            .setVisibility( false ),


            new Action("btn-anotar_prontuario", "Anotar prontuario")
            .setCssClass("action-anotar_prontuario")
            .onClick(function() {
                console.log("Action: Anotar prontuario");
                if ( core.flag( "lavar_maos3" ) == false ) {
                    core.openDialog( 5 );
                } else {

                    Prontuario.open();
                    core.openModalScene("Prontuario");

                    if ( core.flag( "score_anotar_prontuario" ) == false ) {
                        core.registerScoreItem( Scores.anotarNoProntuario );
                        core.flag( "score_anotar_prontuario",  true  );
                    }

                }
            })
            .setVisibility( false )
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

                Pulseira.close();

            })
            .setVisibility( true )

        ]);



    /*  pulseira2 = new Scene("Pulseira2", "Pulseira2");


    pulseira2.registerInteractiveObjects([

        ]);


    pulseira2.registerActions([

        new Action("btn-largar_pulseira", "Fechar pulseira")
        .setCssClass("action-pulseira_paciente")
        .onClick(function() {

            console.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");

            Pulseira.close();

                })
        .setVisibility( true )

        ]);*/



        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([

            new Action("btn-fechar_prontuario", "Fechar prontuário")
            .setCssClass("action-ler_prontuario")
            .onClick(function() {

                if ( core.flag( "score_anotar_prontuario" ) == true ) {
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                    core.setActionVisible("btn-pegar_suporte_soro", false );
                    core.setActionVisible("btn-administrar_medicamente", false );
                    core.setActionVisible("btn-realizar_gotejamento", false );
                    core.setActionVisible("btn-lavarMaos", false );
                    core.setActionVisible("btn-anotar_prontuario", false );
                    core.showEndOfLevel();
                } else {
                    Prontuario.close();
                }

                console.log("Action: Fechar prontuario");

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

                if ( (core.flag("pegar_seringa") == true) &&
                    (core.flag("pegar_agulha") == true) &&
                    (core.flag("pegar_ampola") == true) &&
                    (core.flag("pegar_equipoSoro") == true) ) {


                    //  core.openDialog( 0 );
                    core.flag("pegou_tudo_postoEnfermagem", true );

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
                core.flag("pegar_seringa", true );
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
                core.flag("pegar_agulha", true );
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
                core.flag("pegar_ampola", true );
                core.setInteractiveObjectVisible("io-ampola", false );

                core.registerScoreItem( Scores.pegarAmpola );

            })
            .setVisibility( true ),


            new InteractiveObject("io-equipoSoro", "Equipamento de Soro Macrogotas")
            .setCssClass("intObj-equipo_de_soro")
            .onClick(function() {

                console.log("intObj-equipoSoro");
                // Som
                Player.play( Player.audios.sfx.pegarObjeto );
                core.flag("pegar_equipoSoro", true );
                core.setInteractiveObjectVisible("io-equipoSoro", false );

                core.registerScoreItem( Scores.pegarSoro );

            })
            .setVisibility( true )


        ]);




            level.registerModalScene( prontuario );
            level.registerModalScene( gaveta );
            level.registerModalScene( pulseira );
      //      level.registerModalScene( pulseira2 );



        // 00
        level.registerScene( recepcao );
        // 01
        level.registerScene( corredor );
        // 02
        level.registerScene( alaMasculina );
        // 03
        level.registerScene( leito );
        // 04
        level.registerScene( farmacia );
        // 05
        level.registerScene( postoDeEnfermagem );
        // 06
        level.registerScene( centroCirurgico );
        // 07
        level.registerScene( alaFeminina );
        // 08
        level.registerScene( leito2 );
        // 09
        level.registerScene( alaMasculina2 );


        level.setSetupScript(function() {
            // Script that runs once when the level is loaded or reloaded

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

            Prontuario.clearPrescEnfermagemState();
            Prontuario.setPrescEnfermagemState("desiquilibrio_eletrolitico_fase9");

            Prontuario.setSsvvRowData( 0, "", "130X70", "82", "19", "96", "35.9", true );
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );


            //    Prontuario.setAnotacaoEnfermagemRowData( "15/03", "" );



            // 'pulseira' content

        //    Prontuario.setAnotacaoEnfermagemRowData( "15/03", "" );



         // 'pulseira' content

            Pulseira.setNameRegExp( /Raul Gonzales Rodrigues/ );
            Pulseira.setLeitoRegExp( /0*3/ );
            Pulseira.setDataRegExp( /24\/07\/1937/ );

            Pulseira.setName("Raul Gonzales Rodrigues");
            Pulseira.setLeito("03");
            Pulseira.setData("24/07/1937");
            Pulseira.disable();

             /*// 'pulseira' content

            Pulseira2.setNameRegExp( /Pedro Alcides Mendonça/ );
            Pulseira2.setLeitoRegExp( /0*1/ );
            Pulseira2.setDataRegExp( /03\/06\/1962/ );

            Pulseira2.setName("Pedro Alcides Mendonça");
            Pulseira2.setLeito("01");
            Pulseira2.setData("03/06/1962");
            Pulseira2.disable();
*/


        });

        level.registerFlag( new Flag( "score_iralaFeminina_horaErrada",  false  ) );
        level.registerFlag( new Flag( "score_irCentroCirurgico_horaErrada",  false  ) );
        level.registerFlag( new Flag( "conversar_paciente",  false  ) );
        level.registerFlag( new Flag( "score_ir_farmacia_horaErrada",  false  ) );
        level.registerFlag( new Flag( "pegar_prescricao_medica",  false  ) );
        level.registerFlag( new Flag( "ler_prontuario",  false  ) );
        level.registerFlag( new Flag( "pegarFrascoSG",  false  ) );
        level.registerFlag( new Flag( "pegarNACL",  false  ) );
        level.registerFlag( new Flag( "conferirMedicamento",  false  ) );
        level.registerFlag( new Flag( "pegar_bandeja",  false  ) );
        level.registerFlag( new Flag( "pegar_seringa",  false  ) );
        level.registerFlag( new Flag( "pegar_agulha",  false  ) );
        level.registerFlag( new Flag( "pegar_ampola",  false  ) );
        level.registerFlag( new Flag( "pegar_equipoSoro",  false  ) );
        level.registerFlag( new Flag( "pegou_tudo_postoEnfermagem",  false  ) );
        level.registerFlag( new Flag( "lavar_maos",  false  ) );
        level.registerFlag( new Flag( "trocou_de_leito",  false  ) );
        level.registerFlag( new Flag( "falar_paciente_correto",  false  ) );
        level.registerFlag( new Flag( "lavar_maos2",  false  ) );
        level.registerFlag( new Flag( "realizar_gotejamento",  false  ) );
        level.registerFlag( new Flag( "pegar_suporte_soro",  false  ) );
        level.registerFlag( new Flag( "administrar_medicamento",  false  ) );
        level.registerFlag( new Flag( "lavar_maos3",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "irCentroCirurgicoHoraErrada", false ) );

        level.setInitialScene( 0 );

        game.registerLevel( level, 9 );

        console.groupEnd();
    });
