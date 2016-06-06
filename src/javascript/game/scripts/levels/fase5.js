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

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "ScoresData", "EquipoGotejamento" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, Scores, EquipoGotejamento ) {

        var Dialogs = require("DialogsData").fase4;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level4;
        var Player = require("Player");


        var level = new Level("Level 5");
        level.setMaxPoints( Scores._sum );
        console.groupCollapsed( level.getName() );


        var recepcao,
            corredor,
            alaMasculina,
            leito,
            postoDeEnfermagem,
            gaveta,
            prontuario,
            pulseira,
            keflin,
            noveCertosMedicacao;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( core.flag("pegarFolheto9Certos") == false ) {
                core.openDialog( 2 );
            } else {
                core.closeDialog();
                core.changeScene( 1 );
            }
            console.log("Ir ao corredor");
        }

        function conversarRecepcionista() {
            console.log("action: Conversar com a recepcionista");
            core.openDialog( 0 );
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                core.openDialog( 0 );
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // Dialog 1
            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 1 ] )
                .registerOption("", function() {
                    console.log("Encerrar o diálogo");
                    core.closeDialog( 1 );
                    core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true );
                    core.setInteractiveObjectVisible("io-ir_corredor_direita", true );
                }),
            // Dialog 2
            new Dialog( lib.characters.recepcionista )
                .setText( Alertas.esqueceu.folheto9certos )
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
                .setCssClass("intObj-lobbyToHallway-left no-glow")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right no-glow")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-pegar_folheto_dos_9_certos", "Pegar Folheto dos 9 Certos")
                .setCssClass("intObj-9Certos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.setInteractiveObjectVisible("io-pegar_folheto_dos_9_certos", false );
                    core.flag("pegarFolheto9Certos",  true );
                    core.openModalScene("noveCertosMedicacao");
                })
                .setVisibility( true )
        ]);


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInLoop( Player.audios.loops.recepcao );
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInRange( Player.audios.musics.inGame );
            });

        function corredorIrSalaLeitos() {
            console.log("Vá para sala de leitos");
            core.changeScene( 2 );
        }

        function corredorIrPostoEnfermagem() {
            console.log("Vá para o posto de enfermagem");
            if ( core.flag("score_conferiu_medicacao") == true ) {
                core.changeScene( 5 );
            } else {
                if ( core.flag("score_viu_prontuario") == false ) {
                    core.openDialog( 0 );
                } else {
                    core.openDialog( 2 );
                }
                if ( core.flag("score_ir_posto_enfermagem_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                    core.flag("score_ir_posto_enfermagem_hora_errada",  true );
                }
            }
        }

        function corredorIrFarmacia() {
            console.log("Vá para a farmácia");
            if ( core.flag("score_pegou_prescricao_medica") == true ) {
                core.changeScene( 4 );
            } else {
                core.openDialog( 0 );
                if ( core.flag("score_ir_farmacia_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    core.flag("score_ir_farmacia_hora_errada",  true );
                }
            }
        }

        function corredorIrAlaFeminina() {
            core.openDialog( 1 );
            if ( core.flag("score_ir_ala_feminina") == false ) {
                core.registerScoreItem( Scores.irAlaFeminina );
                core.flag("score_ir_ala_feminina",  true );
            }
        }

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos", "Ir à Enfermaria Masculina")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrSalaLeitos )
                .setVisibility( true ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir ao Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),

            new InteractiveObject("io-ir_farmacia", "Ir à Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),

            new InteractiveObject("io-ir_ala_feminina", "Ir à Enfermaria Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true )
        ]);

        corredor.registerDialogs([
            // 0 Mentor Ação errada: Ir à enfermaria masculina
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 1
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.alaFeminina )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 2 Mentor Ação errada: Ir ao posto de enfermagem
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.enfermagem[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        alaMasculina = new Scene("alaMasculina", "scene-alaMasculina")

            .setCssClass("scene-bedroom-level4")
            .onLoad(function() {
                console.log("Load scene: " + alaMasculina.getName() );
                core.setInteractiveObjectVisible("io-ir_corredor", true );
                core.setActionVisible("btn-ler_prontuario", true );

                // Só após ter ido no posto de enfermagem é que libera a ida ao leito do paciente
                if ( core.flag("score_falou_com_mentor") == false ) {
                    core.openDialog( 0 );
                } else {
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setInteractiveObjectVisible("io-ir_leito", true );
                    core.openCommandBar();
                }
            })
            .onUnload(function() {
                console.log("Ala masculina: OnUnload");
                core.closeCommandBar();
            });

        alaMasculina.registerActions([

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_antes_leito") == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        core.flag("score_lavar_maos_antes_leito",  true );
                    }
                })
                .setVisibility( false ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( core.flag("score_viu_prontuario") == false ) {
                        core.registerScoreItem( Scores.checarProntuario );
                        core.flag("score_viu_prontuario",  true );
                    }

                         // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar prescrição médica");
                    if ( core.flag("score_pegou_prescricao_medica") == false ) {
                        core.registerScoreItem( Scores.pegarPrescricaoMedica );
                        core.flag("score_pegou_prescricao_medica",  true );
                    }

                    Prontuario.open("prescMedica");      // abre prontuario na aba correta
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);

        alaMasculina.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.pacientes.pedroUnknow )
                .setText( Dialogs.alaMasculina[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 2
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.alaMasculina[ 2 ], function() {
                    core.closeDialog();
                    core.openCommandBar();
                })
                .registerOption( Dialogs.alaMasculina[ 3 ], function() {
                    core.openDialog( 3 );
                })
                .registerOption( Dialogs.alaMasculina[ 4 ], function() {
                    core.openDialog( 4 );
                })
                .setRandomize( true ),
            // Dialog 3
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.alaMasculina[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 4
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.alaMasculina[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 5 - Não pegou a prescrição Médica
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verProntuario[ 0 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // Dialog 6 - Não lavou as mãos antes de Ir ao leito
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo1 )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        alaMasculina.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-fase4")
                .onClick(function() {
                    if ( core.flag("score_lavar_maos_antes_leito") == false ) {
                        core.openDialog( 6 );
                        if ( core.flag("score_nao_lavar_maos_antes_leito") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesLeito );
                            core.flag("score_nao_lavar_maos_antes_leito",  true );
                        }
                    } else {
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( false ),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    if ( core.flag("score_pegou_prescricao_medica") == false ) {
                        // Retira pontos do prontuario e da prescrição caso eles não foram vistos
                        if ( core.flag("score_nao_pegou_prescricao_medica") == false ) {
                            core.registerScoreItem( Scores.naoPegarPrescricaoMedica );
                            core.flag("score_nao_pegou_prescricao_medica",  true );
                        }
                        if ( core.flag("score_viu_prontuario") == false ) {
                            if ( core.flag("score_nao_viu_prontuario") == false ) {
                                core.registerScoreItem( Scores.naoChecarProntuario );
                                core.flag("score_nao_viu_prontuario",  true );
                            }
                        }
                        core.openDialog( 5 );
                    }else {
                        core.changeScene( 1 );
                    }

                })
                .setVisibility( true ),

            new InteractiveObject("io-ler_prontuario", "Ler prontuário")
                .setCssClass("intObj-prontuario-leito1-fase4")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( core.flag("score_viu_prontuario") == false ) {
                        core.registerScoreItem( Scores.checarProntuario );
                        core.flag("score_viu_prontuario",  true );
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true )

        ]);


        leito = lib.scenes.leitos.pedro.getClone()
            .onLoad(function() {

                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true );
                core.setActionVisible("btn-ir_sala_leitos", true );

                core.openDialog( 0 );

                // Conflito
                // core.setActionVisible("btn-lavarMaos", true );
                // core.setActionVisible("btn-ler_prontuario", true );
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
            });


        leito.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.pacientes.pedro )
                .setText( Dialogs.leitoPaciente[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 2
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leitoPaciente[ 2 ], function() {
                    core.openDialog( 3 );
                })
                .registerOption( Dialogs.leitoPaciente[ 3 ], function() {
                    core.openDialog( 6 );
                })
                .registerOption( Dialogs.leitoPaciente[ 4 ], function() {
                    core.openDialog( 7 );
                })
                .setRandomize( true ),
            // Dialog 3
            new Dialog( lib.characters.pacientes.pedro )
                .setText( Dialogs.leitoPaciente[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),
            // Dialog 4
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // Dialog 5
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // Dialog 6 - Opção errada 2 no diálogo 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 7 - Opção errada 3 no diálogo 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 9 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                })

        ]);


        leito.registerInteractiveObjects([

            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_05-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("Pulseira");
                    if ( core.flag("score_checar_pulseira") == false ) {
                        core.registerScoreItem( Scores.checarPulseira );
                        core.flag("score_checar_pulseira",  true );
                    }
                    Pulseira.open();
                    core.openCommandBar();
                })
                .setVisibility( true ),


            new InteractiveObject("io-conversar_paciente05", "Falar com o paciente")
                .setCssClass("intObj-conversar_paciente")
                .onClick(function() {
                    core.openDialog( 0 );
                })
                .setVisibility( true )

        ]);

        leito.registerActions([

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    if ( core.flag("score_checar_pulseira") == false ) {
                        if ( core.flag("score_nao_checar_pulseira") == false ) {
                            core.registerScoreItem( Scores.naoChecarPulseira );
                            core.flag("score_nao_checar_pulseira",  true );
                        }
                    }
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene( 2 );
                    Pulseira.disable();
                })
                .setVisibility( true ),

            new Action("btn-administrarMedicamento", "Administrar medicamento")
                .setCssClass("action-administrar_medicamento")
                .onClick(function() {
                    if ( core.flag("score_administrar_medicacao") == false ) {
                        core.registerScoreItem( Scores.administrarMedicacao );
                        core.flag("score_administrar_medicacao",  true );
                    }
                    // Tirar pontos se não verificou pulseira
                    if ( core.flag("score_checar_pulseira") == false ) {
                        if ( core.flag("score_nao_checar_pulseira") == false ) {
                            core.registerScoreItem( Scores.naoChecarPulseira );
                            core.flag("score_nao_checar_pulseira",  true );
                        }
                    }
                    console.log("Action: Administrar medicamento");
                })
                .setVisibility( true ),

            new Action("btn-realizarGotejamento", "Realizar gotejamento de soro no equipo")
                .setCssClass("action-equipo")
                .onClick(function() {
                    if ( core.flag("score_gotejar_soro_equipo") == false ) {
                        core.registerScoreItem( Scores.gotejarSoroEquipo );
                        core.flag("score_gotejar_soro_equipo",  true );
                    }
                    // Tirar pontos se não administrou medicamento
                    if ( core.flag("score_administrar_medicacao") == false ) {
                        if ( core.flag("score_nao_administrar_medicacao") == false ) {
                            core.registerScoreItem( Scores.naoAdministrarMedicacao );
                            core.flag("score_nao_administrar_medicacao",  true );
                        }
                    }
                    console.log("Action: Realizar gotejamento de soro no equipo");

                    EquipoGotejamento.open();
                    core.openModalScene("equipoSoro");

                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_antes_prontuario") == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesProntuario );
                        core.flag("score_lavar_maos_antes_prontuario",  true );
                    }
                    // Tirar pontos se não realizou gotejamento
                    if ( core.flag("score_gotejar_soro_equipo") == false ) {
                        if ( core.flag("score_nao_gotejar_soro_equipo") == false ) {
                            core.registerScoreItem( Scores.naoGotejarSoroEquipo );
                            core.flag("score_nao_gotejar_soro_equipo",  true );
                        }
                    }
                    console.log("Action: Lavar as mãos");
                })
                .setVisibility( true ),

            new Action("btn-ler_prontuario", "Anotar prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: anotar no prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                    // Marcar pontos
                    if ( core.flag("score_anotou_prontuario") == false ) {
                        core.registerScoreItem( Scores.anotarNoProntuario );
                        core.flag("score_anotou_prontuario",  true );
                    }
                    if ( core.flag("score_lavar_maos_antes_prontuario") == false ) {
                        if ( core.flag("score_nao_lavar_maos_antes_prontuario") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesProntuario );
                            core.flag("score_nao_lavar_maos_antes_prontuario",  true );
                        }
                    }

                })
                .setVisibility( true )
        ]);


        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
            console.log("Ir ao corredor");
            // Só perde pontos caso já esteja liberado para pegar o medicamento
            if ( core.flag("score_conferiu_medicacao") == false ) {
                if ( core.flag("score_nao_conferiu_medicacao") == false ) {
                    core.registerScoreItem( Scores.naoConferirMedicamento );
                    core.flag("score_nao_conferiu_medicacao",  true );
                }
                core.openDialog( 4 );
            } else {
                core.changeScene( 1 );
            }
        }

        farmacia = new Scene("farmacia", "scene-pharmacy")
            .setCssClass("scene-pharmacy")
            .onLoad(function() {
                console.log("Load scene: Farmácia");
                // Depois que falou com o farmacêutico, é ativado os botões
                if ( core.flag("ja_falou_farmaceutico") == true ) {
                    core.setInteractiveObjectVisible("io-keflin_medicamento", !(core.flag("score_pegou_medicamento")) );
                    core.setActionVisible("btn-keflinMedicamento", true );
                    core.openCommandBar();
                }
                // Apenas se ele pegou a prescrição médica é que ele sabe o que vai pegar, mas só vai falar uma vez
                if ( (core.flag("score_pegou_prescricao_medica") == true) &&
                    (core.flag("ja_falou_farmaceutico") == false) ) {
                    core.flag("ja_falou_farmaceutico",  true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Farmácia: OnUnload");
                core.closeCommandBar();
            });


         farmacia.registerActions([
             
               new Action("btn-ir_corredor", "Ir ao corredor")
         .setCssClass("action-ir_corredor")
         .onClick(function () {

             farmaciaIrCorredor();

         })
         .setVisibility(true),

         new Action("io-ler_prontuario", "Ler prontuário")
         .setCssClass("action-ler_prontuario")
         .onClick(function () {
             console.log("Action: ler prontuario");
             Prontuario.open();
             core.openModalScene("Prontuario");

         })
         .setVisibility(true),


     ]);

        farmacia.registerInteractiveObjects([

            // Keflin
            new InteractiveObject("io-keflin_medicamento", "Pegar Medicamento")
                .setCssClass("intObj-keflin_medicamento")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar Medicamento");
                    if ( core.flag("score_pegou_medicamento") == false ) {
                        core.registerScoreItem( Scores.pegarMedicamento );
                        core.flag("score_pegou_medicamento",  true );
                    }
                    core.setActionVisible("btn-keflinMedicamento", true );
                    core.setInteractiveObjectVisible("io-keflin_medicamento", false );
                })
                .setVisibility( false )
        ]);

        farmacia.registerActions([
            new Action("btn-keflinMedicamento", "Conferir Medicamento")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Conferir Medicamento");
                    if ( core.flag("score_conferiu_medicacao") == false ) {
                        core.registerScoreItem( Scores.conferirMedicamento );
                        core.flag("score_conferiu_medicacao",  true );
                    }
                    core.openModalScene("conferirKeflin");
                })
                .setVisibility( false )
        ]);

        farmacia.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.farmacia[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 2
            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),
            // Dialog 3
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.farmacia[ 3 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    // Ativando o Keflin e o seu botão para conferí-lo
                    core.setInteractiveObjectVisible("io-keflin_medicamento", true );
                    core.openCommandBar();
                }),
            // Dialog 4
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verificarMedicamento3 )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // Dialog 5
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.lugarIncorreto[ 2 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.changeScene( 1 );
                })
        ]);

        farmacia.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left no-glow")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right no-glow")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true )

        ]);


        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                core.openCommandBar();         
                core.setActionVisible("btn-lavarMaos", true );
                core.setActionVisible("btn-ir_corredor", true );
                core.setActionVisible("btn-visualizarFolheto", true );
                core.openDialog( 0 );

            })
            .onUnload(function() {
                core.closeCommandBar();
            });

        postoDeEnfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( core.flag("score_pegou_soro") == false ||
                        core.flag("score_pegou_algodao") == false ||
                        core.flag("score_pegou_luvas") == false ||
                        core.flag("score_pegou_seringa_5ml") == false ||
                        core.flag("score_pegou_ampola_soro") == false ||
                        core.flag("score_pegou_alcool") == false ||
                        core.flag("score_pegou_seringa_10ml") == false ||
                        core.flag("score_pegou_agulha") == false ||
                        core.flag("score_pegou_equipo_soro") == false /*||
                        core.flag("pegarBandeja") == true*/ ) {
                        core.openDialog( 4 );
                    } else if(core.flag("score_conferiu_medicacao_posto") == true &&
                              core.flag("score_preparar_medicacao") == true &&
                              core.flag("score_calculou_gotejamento") == true &&
                              core.flag("score_identificar_medicacao") == true)
                    
                    {
                            core.changeScene( 1 );
                            
                        
                            
                    }
                    else {
                        core.openDialog(8);
                    }

                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        core.registerScoreItem( Scores.lavarMaos );
                        core.flag("score_lavar_maos_posto_enfermagem",  true );
                    }

                })
                .setVisibility( true ),

            new Action("btn-confirmarMedicamento", "Confirmar medicação com o mentor")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Confirmar medicação com o mentor");
                    if ( core.flag("score_conferiu_medicacao_posto") == false ) {  
                        core.registerScoreItem( Scores.confirmarMedicacaoPosto );
                        core.flag("score_conferiu_medicacao_posto",  true );
                    }
                    core.openModalScene("conferirKeflin");

                })
                .setVisibility( false ),

            new Action("btn-prepararMedicacao", "Preparar medicação")
                .setCssClass("action-preparar_medicacao")
                .onClick(function() {
                    console.log("Action: Preparar medicação");
                    if ( core.flag("score_preparar_medicacao") == false ) {
                        core.registerScoreItem( Scores.prepararMedicacao );
                        core.flag("score_preparar_medicacao",  true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-gotejamentoSoro", "Calcular gotejamento do soro")
                .setCssClass("action-equipo")
                .onClick(function() {
                    console.log("Action: Calcular gotejamento do soro");
                    if ( core.flag("score_calculou_gotejamento") == false ) {
                         console.log("TRUE3");
                        core.registerScoreItem( Scores.calcularGotejamento );
                        core.flag("score_calculou_gotejamento",  true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-identificarMedicacao", "Identificar medicação")
                .setCssClass("action-identificarMedicacao")
                .onClick(function() {
                 
                    if ( core.flag("score_identificar_medicacao") == false ) {
                        core.registerScoreItem( Scores.identificarMedicacao );
                        core.flag("score_identificar_medicacao",  true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-visualizarFolheto", "Visualizar o folheto dos 9 certos")
                .setCssClass("action-visualizar_folheto")
                .onClick(function() {
                    console.log("Action: Visualizando folheto");
                    core.openModalScene("noveCertosMedicacao");

                })
                .setVisibility( false )
        ]);

        postoDeEnfermagem.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.postoDeEnfermagem[ 0 ], function() {
                    if ( core.flag("score_calculou_valor_medicamento") == false ) {
                        core.registerScoreItem( Scores.calcularValorMedicamento );
                        core.flag("score_calculou_valor_medicamento",  true );
                    }
                    core.closeDialog();
                })
                .registerOption( Dialogs.postoDeEnfermagem[ 1 ], function() {
                    core.openDialog( 1 );
                })
                .registerOption( Dialogs.postoDeEnfermagem[ 2 ], function() {
                    core.openDialog( 1 );
                })
                .setRandomize( true ),
            // Dialog 1
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.postoDeEnfermagem[ 3 ] )
                .registerOption("", function() {
                    if ( core.flag("score_calculou_errado_valor_medicamento") == false ) {
                        core.registerScoreItem( Scores.calcularErradoValorMedicamento );
                        core.flag("score_calculou_errado_valor_medicamento",  true );
                    }
                    core.openDialog( 0 );
                }),
            // Dialog 2
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.postoDeEnfermagem[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),
            // Dialog 3
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.postoDeEnfermagem[ 5 ] )
                .registerOption("", function() {
                    core.openCommandBar();
                    core.closeDialog();
                }),
            // Dialog 4 - Caso de estar esquecendo algo
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.postoDeEnfermagem[ 6 ] )
                .registerOption("", function() {
                    core.openCommandBar();
                    core.closeDialog();
                }),
            // Dialog 5 - Vá para a Ala Masculina
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.lugarIncorreto[ 0 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.changeScene( 1 );
                }),
            // Dialog 6 - Vá para a Farmácia
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.lugarIncorreto[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.changeScene( 1 );
                }),
            // Dialog 7 - Não pegou bandeja
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarBandeja )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 8
             new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verificarTudoPostoEnfermagem )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            
            

        ]);

        postoDeEnfermagem.registerInteractiveObjects([

            new InteractiveObject("io-abrir_gaveta_esquerda", "Abrir gaveta")
                .setCssClass("intObj-openDrawer_left")
                .onClick(function() {
                    if ( core.flag("score_pegou_bandeja") != true ) {
                        core.openDialog( 7 );
                    } else {
                        console.log("Action: Abrir gaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                            if ( core.flag("score_nao_lavar_maos_posto_enfermagem") == false ) {
                                core.registerScoreItem( Scores.naoLavarMaos );
                                core.flag("score_nao_lavar_maos_posto_enfermagem",  true );
                            }
                        }
                        core.openModalScene("gaveta");
                        core.openCommandBar();

                        core.setInteractiveObjectVisible("io-soro", !(core.flag("score_pegou_soro")) );
                        core.setInteractiveObjectVisible("io-algodao", !(core.flag("score_pegou_algodao")) );
                        core.setInteractiveObjectVisible("io-luvas", !(core.flag("score_pegou_luvas")) );
                        core.setInteractiveObjectVisible("io-seringa5ml", !(core.flag("score_pegou_seringa_5ml")) );
                        core.setInteractiveObjectVisible("io-ampola_soro", !(core.flag("score_pegou_ampola_soro")) );
                        core.setInteractiveObjectVisible("io-alcool", !(core.flag("score_pegou_alcool")) );
                        core.setInteractiveObjectVisible("io-seringa10ml", !(core.flag("score_pegou_seringa_10ml")) );
                        core.setInteractiveObjectVisible("io-agulha", !(core.flag("score_pegou_agulha")) );
                        core.setInteractiveObjectVisible("io-equipo_soro", !(core.flag("score_pegou_equipo_soro")) );
                    }
                })
                .setVisibility( true ),

         

            // Bandeja
            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar bandeja");
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        if ( core.flag("score_nao_lavar_maos_posto_enfermagem") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaos );
                            core.flag("score_nao_lavar_maos_posto_enfermagem",  true );
                        }
                    }
                    if ( core.flag("score_pegou_bandeja") == false ) {
                        core.registerScoreItem( Scores.pegarBandeja );
                        core.flag("score_pegou_bandeja",  true );
                    }
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);

       equipoSoro = new Scene("equipoSoro", "EquipamentoSoro")

        equipoSoro.registerActions([

            new Action("btn-fecharEquipoSoro", "Fechar Equipamento de Soro")
            .setCssClass("action-fecharEquipoSoro")
            .onClick(function() {

                 EquipoGotejamento.close();
                core.closeModalScene("equipoSoro");





            })
            .setVisibility( true )



        ]);
    
  
    

         gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    
                
                   
                    
                    
                    if ( core.flag("score_pegou_soro") == true &&
                        core.flag("score_pegou_algodao") == true &&
                        core.flag("score_pegou_luvas") == true &&
                        core.flag("score_pegou_seringa_5ml") == true &&
                        core.flag("score_pegou_ampola_soro") == true &&
                        core.flag("score_pegou_alcool") == true &&
                        core.flag("score_pegou_seringa_10ml") == true &&
                        core.flag("score_pegou_agulha") == true &&
                        core.flag("score_pegou_equipo_soro") == true &&
                        core.flag("score_falou_com_mentor") == false ) 
                    {
                        
                            core.flag("pegou_todos_instrumentos", true);  
                   
                            core.flag("score_falou_com_mentor",  true );
                        
                      
                            // Som
                            Player.play( Player.audios.sfx.fecharGaveta );
                        
                            core.closeModalScene("Gaveta");
                     
                            core.openDialog( 2 );
                                 
                            core.setActionVisible("btn-confirmarMedicamento", true );
                            core.setActionVisible("btn-prepararMedicacao", true );
                            core.setActionVisible("btn-gotejamentoSoro", true );
                            core.setActionVisible("btn-identificarMedicacao", true );
                            core.setActionVisible("btn-visualizarFolheto", false );  
                            core.setActionVisible("btn-lavarMaos", false ); 
                        
                        } else {
                            
                        core.flag("pegou_todos_instrumentos", false);
                        core.flag("score_falou_com_mentor",  false );
                            
                        Player.play(Player.audios.sfx.fecharGaveta);
                            
                        core.closeModalScene("Gaveta");
            
                            
                        //    core.openDialog(4); 
                            
                        core.setActionVisible("btn-visualizarFolheto", true );  
                        core.setActionVisible("btn-lavarMaos", true );
                
                            
                         

                            
                            
                     //       if ( core.flag("score_nao_pegou_todos_instrumentos") == false ) {
                      //          core.registerScoreItem( Scores.naoPegarAlgumInstrumento );
                      //          core.flag("score_nao_pegou_todos_instrumentos",  true );
                      //      }
                            
                            
                    }
                })
                .setVisibility( true )
        ]);

        gaveta.registerInteractiveObjects([
            // Soro Fisiológico 0,9% (100 ml)
            new InteractiveObject("io-soro", "Pegar soro fisiológico 0,9% (100 ml)")
                .setCssClass("intObj-soro_fisiologico_100_ml")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar soro fisiológico 0,9% (100 ml)");
                    core.setInteractiveObjectVisible("io-soro", false );
                    if ( core.flag("score_pegou_soro") == false ) {
                        core.registerScoreItem( Scores.pegarSoroFisiologico );
                        core.flag("score_pegou_soro",  true );
                    }
                })
                .setVisibility( true ),

            // Algodão
            new InteractiveObject("io-algodao", "Pegar algodão")
                .setCssClass("intObj-algodao_seco")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar algodao ");
                    core.setInteractiveObjectVisible("io-algodao", false );
                    if ( core.flag("score_pegou_algodao") == false ) {
                        core.registerScoreItem( Scores.pegarAlgodao );
                        core.flag("score_pegou_algodao",  true );
                    }
                })
                .setVisibility( true ),

            // Luvas de procedimento
            new InteractiveObject("io-luvas", "Pegar luvas de procedimento")
                .setCssClass("intObj-luvas_de_procedimento_fase5")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar luvas de procedimento");
                    core.setInteractiveObjectVisible("io-luvas", false );
                    if ( core.flag("score_pegou_luvas") == false ) {
                        core.registerScoreItem( Scores.pegarLuvas );
                        core.flag("score_pegou_luvas",  true );
                    }
                })
                .setVisibility( true ),

            // Seringa de 5 ml
            new InteractiveObject("io-seringa5ml", "Pegar seringa de 5 ml")
                .setCssClass("intObj-seringa_5_ml")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar seringa de 5 ml");
                    core.setInteractiveObjectVisible("io-seringa5ml", false );
                    if ( core.flag("score_pegou_seringa_5ml") == false ) {
                        core.registerScoreItem( Scores.pegarSeringa5 );
                        core.flag("score_pegou_seringa_5ml",  true );
                    }
                })
                .setVisibility( true ),

            // Ampola de soro Fisiológico 0,9% (10ml)
            new InteractiveObject("io-ampola_soro", "Pegar ampola de soro Fisiológico 0,9% (10ml)")
                .setCssClass("intObj-cloreto_de_sodio_20__10_ml_")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar ampola de soro Fisiológico 0,9% (10ml)");
                    core.setInteractiveObjectVisible("io-ampola_soro", false );
                    if ( core.flag("score_pegou_ampola_soro") == false ) {
                        core.registerScoreItem( Scores.pegarAmpolaSF );
                        core.flag("score_pegou_ampola_soro",  true );
                    }
                })
                .setVisibility( true ),

            // Álcool 70%
            new InteractiveObject("io-alcool", "Pegar álcool 70%")
                .setCssClass("intObj-frasco_de_alcool")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar álcool 70%");
                    core.setInteractiveObjectVisible("io-alcool", false );
                    if ( core.flag("score_pegou_alcool") == false ) {
                        core.registerScoreItem( Scores.pegarAlcool );
                        core.flag("score_pegou_alcool",  true );
                    }
                })
                .setVisibility( true ),

            // Seringa de 10 ml
            new InteractiveObject("io-seringa10ml", "Pegar seringa de 10 ml")
                .setCssClass("intObj-seringa_de_10_ml_fase4")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar seringa de 10 ml");
                    core.setInteractiveObjectVisible("io-seringa10ml", false );
                    if ( core.flag("score_pegou_seringa_10ml") == false ) {
                        core.registerScoreItem( Scores.pegarSeringa10 );
                        core.flag("score_pegou_seringa_10ml",  true );
                    }
                })
                .setVisibility( true ),

            // Agulha 40X12
            new InteractiveObject("io-agulha", "Pegar agulha 40X12")
                .setCssClass("intObj-agulha_40x12")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar agulha 40X12 ");
                    core.setInteractiveObjectVisible("io-agulha", false );
                    if ( core.flag("score_pegou_agulha") == false ) {
                        core.registerScoreItem( Scores.pegarAgulha );
                        core.flag("score_pegou_agulha",  true );
                    }
                })
                .setVisibility( true ),

            // Equipo de soro macrogotas
            new InteractiveObject("io-equipo_soro", "Pegar equipo de soro macrogotas")
                .setCssClass("intObj-equipo_de_soro_fase4")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar equipo de soro macrogotas");
                    core.setInteractiveObjectVisible("io-equipo_soro", false );
                    if ( core.flag("score_pegou_equipo_soro") == false ) {
                        core.registerScoreItem( Scores.pegarEquipoSoroMacrogotas );
                        core.flag("score_pegou_equipo_soro",  true );
                    }
                })
                .setVisibility( true )
        ]);

        prontuario = new Scene("Prontuario", "Prontuario")
            .onLoad(function() {
                core.openCommandBar();
                core.setActionVisible("btn-fechar_prontuario", true );
                core.setActionVisible("btn-pegar_prescricao_medica", true );
            });

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    core.closeModalScene("Prontuario");
                    Prontuario.close();
                    // Já estava na parte final da fase, então a termina
                    if ( core.flag("score_gotejar_soro_equipo") == true ) {
                        core.unlockLevel( 5 );
                        core.closeCommandBar();
                        core.showEndOfLevel();
                        Player.stopAll();
                        Player.play( Player.audios.sfx.missaoCumprida );
                    }
                })
                .setVisibility( true ),

          /*  new Action("btn-pegar_prescricao_medica", "Pegar prescrição médica")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar prescrição médica");
                    if ( core.flag("score_pegou_prescricao_medica") == false ) {
                        core.registerScoreItem( Scores.pegarPrescricaoMedica );
                        core.flag("score_pegou_prescricao_medica",  true );
                    }
                    core.setActionVisible("btn-pegar_prescricao_medica", false );
                })
                .setVisibility( true )*/
        ]);


        pulseira = new Scene("Pulseira", "Pulseira");

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function() {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");

                    Pulseira.close();

                    if ( core.flag("score_checar_pulseira") == false ) {
                        core.registerScoreItem( Scores.checarPulseira );
                        core.flag("score_checar_pulseira",  true );
                    }
                })
                .setVisibility( true )
        ]);

        keflin = new Scene("conferirKeflin", "Conferir Keflin")
            .setCssClass("modalScene-keflinMedicamento");

        keflin.registerActions([
            new Action("btn-fechar_zoom", "Finalizar conferição")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Finalizar conferição");
                    core.closeModalScene("conferirKeflin");
                })
        ]);

        noveCertosMedicacao = new Scene("noveCertosMedicacao", "Visualizar o folheto dos 9 certos")
             .setCssClass("modalScene-noveCertosMedicacao");

        noveCertosMedicacao.registerActions([
            new Action("btn-fechar_zoom", "Fechar folheto")
                .setCssClass("action-visualizar_folheto")
                .onClick(function() {
                    console.log("Action: Fechar folheto");
                    core.closeModalScene("noveCertosMedicacao");
                })
        ]);



        level.registerScene( recepcao );
        level.registerScene( corredor );
        level.registerScene( alaMasculina );
        level.registerScene( leito );
        level.registerScene( farmacia );
        level.registerScene( postoDeEnfermagem );


        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        level.registerModalScene( noveCertosMedicacao );
        level.registerModalScene( keflin );
        level.registerModalScene( equipoSoro );


        level.setSetupScript(function() {

            // 'prontuário' content
            Prontuario.setNome("Pedro Alcídes Mendonça");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("03/06/1962");
            Prontuario.setIdade("52 anos");
            Prontuario.setProfissao("Professor");
            Prontuario.setPai("Aldair Mendonça");
            Prontuario.setMae("Ana Laura Alcídes Mendonça ");
            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("10/10/2015");
            Prontuario.setLeito("01 - Enfermaria Masculina");
            Prontuario.setAntecedentes("Ausência");
            Prontuario.setHipotese("Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório.");
            Prontuario.setObservacoes("Está no 2.º dia de uso de Cefalotina Sódica (Keflin®)");
            Prontuario.setPeso("62");
            Prontuario.setAltura("1,77");
            Prontuario.setCircunferenciaAbdominal("91");

            Prontuario.setPrescMedicaRowData( 0, "", "Cefalotina sódica (Keflin®)", "Endovenosa", "800 mg diluído em 100 ml de SF (soro fisiológico) 0,9% em 01 hora", "6/6h", false, true );
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 1, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

            Prontuario.clearPrescEnfermagemState( );
            Prontuario.setPrescEnfermagemState("risco_infeccao");

            Prontuario.setSsvvRowData( 0, "", "110x70", "55", "16", "96", "37.3", true );
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );
            Prontuario.setAnotacaoEnfermagemRowData("", "");

            // 'pulseira' content
            Pulseira.setNameRegExp( /Pedro Alcides Mendonça/ );
            Pulseira.setLeitoRegExp( /0*1/ );
            Pulseira.setDataRegExp( /03\/06\/1962/ );

            Pulseira.setName("Pedro Alcides Mendonça");
            Pulseira.setLeito("01");
            Pulseira.setData("03/06/1962");
            Pulseira.disable();
        });


        level.registerFlag( new Flag("pegarFolheto9Certos", false ) );
        level.registerFlag( new Flag("score_ir_posto_enfermagem_hora_errada", false ) );
        level.registerFlag( new Flag("score_ir_farmacia_hora_errada", false ) );
        level.registerFlag( new Flag("score_ir_ala_feminina", false ) );
        level.registerFlag( new Flag("score_viu_prontuario", false ) );
        level.registerFlag( new Flag("score_nao_viu_prontuario", false ) );
        level.registerFlag( new Flag("score_lavar_maos_antes_leito", false ) );
        level.registerFlag( new Flag("score_nao_lavar_maos_antes_leito", false ) );
        level.registerFlag( new Flag("ja_falou_farmaceutico", false ) );
        level.registerFlag( new Flag("score_pegou_medicamento", false ) );
        level.registerFlag( new Flag("score_nao_pegou_medicamento", false ) );
        level.registerFlag( new Flag("score_conferiu_medicacao", false ) );
        level.registerFlag( new Flag("score_pegou_prescricao_medica", false ) );
        level.registerFlag( new Flag("score_nao_conferiu_medicacao", false ) );
        level.registerFlag( new Flag("score_lavar_maos_posto_enfermagem", false ) );
        level.registerFlag( new Flag("score_nao_lavar_maos_posto_enfermagem", false ) );
        level.registerFlag( new Flag("score_pegou_bandeja", false ) );
        level.registerFlag( new Flag("score_pegou_soro", false ) );
        level.registerFlag( new Flag("score_pegou_algodao", false ) );
        level.registerFlag( new Flag("score_pegou_luvas", false ) );
        level.registerFlag( new Flag("score_pegou_seringa_5ml", false ) );
        level.registerFlag( new Flag("score_pegou_ampola_soro", false ) );
        level.registerFlag( new Flag("score_pegou_alcool", false ) );
        level.registerFlag( new Flag("score_pegou_seringa_10ml", false ) );
        level.registerFlag( new Flag("score_pegou_agulha", false ) );
        level.registerFlag( new Flag("score_pegou_equipo_soro", false ) );
        level.registerFlag( new Flag("score_nao_pegou_todos_instrumentos", false ) );
        level.registerFlag( new Flag("score_falou_com_mentor", false ) );
        level.registerFlag( new Flag("score_lavar_maos", false ) );
        level.registerFlag( new Flag("score_nao_pegou_prescricao_medica", false ) );
        level.registerFlag( new Flag("score_calculou_valor_medicamento", false ) );
        level.registerFlag( new Flag("score_calculou_errado_valor_medicamento", false ) );
        level.registerFlag( new Flag("score_checar_pulseira", false ) );
        level.registerFlag( new Flag("score_nao_checar_pulseira", false ) );
        level.registerFlag( new Flag("score_lavar_maos_antes_prontuario", false ) );
        level.registerFlag( new Flag("score_nao_lavar_maos_antes_prontuario", false ) );
        level.registerFlag( new Flag("score_conferiu_medicacao_posto", false ) );
        level.registerFlag( new Flag("score_preparar_medicacao", false ) );
        level.registerFlag( new Flag("score_calculou_gotejamento", false ) );
        level.registerFlag( new Flag("score_identificar_medicacao", false ) );
        level.registerFlag( new Flag("score_administrar_medicacao", false ) );
        level.registerFlag( new Flag("score_nao_administrar_medicacao", false ) );
        level.registerFlag( new Flag("score_gotejar_soro_equipo", false ) );
        level.registerFlag( new Flag("score_nao_gotejar_soro_equipo", false ) );
        level.registerFlag( new Flag("score_anotou_prontuario", false ) );
        level.registerFlag( new Flag("pegou_todos_instrumentos", false ) );


        level.setInitialScene( 0 );

        game.registerLevel( level, 5 );

        console.groupEnd();

    });
