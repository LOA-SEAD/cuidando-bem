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

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, Scores ) {

        var Dialogs = require("DialogsData").fase4;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level4;
        var Player = require("Player");


        var level = new Level("Level Fase4");
        console.groupCollapsed( level.getName() );


        var
            recepcao,
            corredor,
            alaMasculina,
            leito,
            postoDeEnfermagem,
            gavetaEsquerda,
            gavetaDireita,
            prontuario,
            pulseira;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("pegarFolheto9Certos").getValue() == false ) {
                core.openDialog( 2 );
            } else {
                core.closeDialog();
                core.changeScene( 1 );
            }
            console.log("Ir para o corredor");
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
                    level.getFlag("pegarFolheto9Certos").setValue( true );
                })
                .setVisibility( true )
        ]);


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

        function corredorIrSalaLeitos() {
            console.log("Vá para sala de leitos");
            core.changeScene( 2 );
        }

        function corredorIrPostoEnfermagem() {
            console.log("Vá para o posto de enfermagem");
            if ( level.getFlag("score_conferiu_medicacao").getValue() == true ) {
                core.changeScene( 5 );
            } else {
                core.openDialog( 0 );
                if ( level.getFlag("score_ir_posto_enfermagem_hora_errada").getValue() == false ) {
                    core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                    level.getFlag("score_ir_posto_enfermagem_hora_errada").setValue( true );
                }
            }
        }

        function corredorIrFarmacia() {
            console.log("Vá para a farmácia");
            if ( level.getFlag("score_pegou_prescricao_medica").getValue() == true ) {
                core.changeScene( 4 );
            } else {
                core.openDialog( 0 );
                if ( level.getFlag("score_ir_farmacia_hora_errada").getValue() == false ) {
                    core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    level.getFlag("score_ir_farmacia_hora_errada").setValue( true );
                }
            }
        }

        function corredorIrAlaFeminina() {
            core.openDialog( 1 );
            if ( level.getFlag("score_ir_ala_feminina").getValue() == false ) {
                core.registerScoreItem( Scores.irAlaFeminina );
                level.getFlag("score_ir_ala_feminina").setValue( true );
            }
        }

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos", "Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrSalaLeitos )
                .setVisibility( true ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),

            new InteractiveObject("io-ir_farmacia", "Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),

            new InteractiveObject("io-ir_ala_feminina", "Ir para a Ala Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true )
        ]);

        corredor.registerDialogs([
            // 0 Mentor Ação errada: Ir para a enfermaria masculina
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
                .setText( Alertas.perdido.farmacia )
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

                /*O fato de já ter verificado o prontuario ou ter tentado sair sem vê-lo é o que
                 determina se é a primeira ou segunda vez que o jogador veio até a ala masculina*/
                if ( (level.getFlag("score_viu_prontuario").getValue() == false) &&
                    (level.getFlag("score_nao_viu_prontuario").getValue() == false) ) {
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
                    if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }
                })
                .setVisibility( false ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( level.getFlag("score_viu_prontuario").getValue() == false ) {
                        core.registerScoreItem( Scores.checarProntuario );
                        level.getFlag("score_viu_prontuario").setValue( true );
                    }
                    Prontuario.open();
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
            // Dialog 6 - Não lavou as mãos antes de ir para o leito
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
                    if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.openDialog( 6 );
                        if ( level.getFlag("score_nao_lavar_maos_antes_leito").getValue() == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesLeito );
                            level.getFlag("score_nao_lavar_maos_antes_leito").setValue( true );
                        }
                    } else {
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( false ),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    if ( level.getFlag("score_pegou_prescricao_medica").getValue() == false ) {
                        // Retira pontos do prontuario e da prescrição caso eles não foram vistos
                        if ( level.getFlag("score_nao_pegou_prescricao_medica").getValue() == false ) {
                            core.registerScoreItem( Scores.naoPegarPrescricaoMedica );
                            level.getFlag("score_nao_pegou_prescricao_medica").setValue( true );
                        }
                        if ( level.getFlag("score_viu_prontuario").getValue() == false ) {
                            if ( level.getFlag("score_nao_viu_prontuario").getValue() == false ) {
                                core.registerScoreItem( Scores.naoChecarProntuario );
                                level.getFlag("score_nao_viu_prontuario").setValue( true );
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
                    if ( level.getFlag("score_viu_prontuario").getValue() == false ) {
                        core.registerScoreItem( Scores.checarProntuario );
                        level.getFlag("score_viu_prontuario").setValue( true );
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
                    if ( level.getFlag("score_checar_pulseira").getValue() == false ) {
                        core.registerScoreItem( Scores.checarPulseira );
                        level.getFlag("score_checar_pulseira").setValue( true );
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
                    if ( level.getFlag("score_checar_pulseira").getValue() == false ) {
                        if ( level.getFlag("score_nao_checar_pulseira").getValue() == false ) {
                            core.registerScoreItem( Scores.naoChecarPulseira );
                            level.getFlag("score_nao_checar_pulseira").setValue( true );
                        }
                    }
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene( 2 );
                    Pulseira.disable();
                })
                .setVisibility( true ),

            new Action("btn-administrarMedicamento", "Administrar medicamento")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    if ( level.getFlag("score_administrar_medicacao").getValue() == false ) {
                        core.registerScoreItem( Scores.administrarMedicacao );
                        level.getFlag("score_administrar_medicacao").setValue( true );
                    }
                    // Tirar pontos se não verificou pulseira
                    if ( level.getFlag("score_checar_pulseira").getValue() == false ) {
                        if ( level.getFlag("score_nao_checar_pulseira").getValue() == false ) {
                            core.registerScoreItem( Scores.naoChecarPulseira );
                            level.getFlag("score_nao_checar_pulseira").setValue( true );
                        }
                    }
                    console.log("Action: Administrar medicamento");
                })
                .setVisibility( true ),

            new Action("btn-realizarGotejamento", "Realizar gotejamento de soro no equipo")
                .setCssClass("action-equipo")
                .onClick(function() {
                    if ( level.getFlag("score_gotejar_soro_equipo").getValue() == false ) {
                        core.registerScoreItem( Scores.gotejarSoroEquipo );
                        level.getFlag("score_gotejar_soro_equipo").setValue( true );
                    }
                    // Tirar pontos se não administrou medicamento
                    if ( level.getFlag("score_administrar_medicacao").getValue() == false ) {
                        if ( level.getFlag("score_nao_administrar_medicacao").getValue() == false ) {
                            core.registerScoreItem( Scores.naoAdministrarMedicacao );
                            level.getFlag("score_nao_administrar_medicacao").setValue( true );
                        }
                    }
                    console.log("Action: Realizar gotejamento de soro no equipo");
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( level.getFlag("score_lavar_maos_antes_prontuario").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesProntuario );
                        level.getFlag("score_lavar_maos_antes_prontuario").setValue( true );
                    }
                    // Tirar pontos se não realizou gotejamento
                    if ( level.getFlag("score_gotejar_soro_equipo").getValue() == false ) {
                        if ( level.getFlag("score_nao_gotejar_soro_equipo").getValue() == false ) {
                            core.registerScoreItem( Scores.naoGotejarSoroEquipo );
                            level.getFlag("score_nao_gotejar_soro_equipo").setValue( true );
                        }
                    }
                    console.log("Action: Lavar as mãos");
                })
                .setVisibility( true ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                    // Marcar pontos
                    if ( level.getFlag("score_anotou_prontuario").getValue() == false ) {
                        core.registerScoreItem( Scores.anotarNoProntuario );
                        level.getFlag("score_anotou_prontuario").setValue( true );
                    }
                    if ( level.getFlag("score_lavar_maos_antes_prontuario").getValue() == false ) {
                        if ( level.getFlag("score_nao_lavar_maos_antes_prontuario").getValue() == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesProntuario );
                            level.getFlag("score_nao_lavar_maos_antes_prontuario").setValue( true );
                        }
                    }

                })
                .setVisibility( true )
        ]);


        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
            console.log("Ir para o corredor");
            // Só perde pontos caso já esteja liberado para pegar o medicamento
            if ( level.getFlag("score_conferiu_medicacao").getValue() == false ) {
                if ( level.getFlag("score_nao_conferiu_medicacao").getValue() == false ) {
                    core.registerScoreItem( Scores.naoConferirMedicamento );
                    level.getFlag("score_nao_conferiu_medicacao").setValue( true );
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
                if ( level.getFlag("ja_falou_farmaceutico").getValue() == true ) {
                    core.setInteractiveObjectVisible("io-keflin_medicamento", !(level.getFlag("score_pegou_medicamento").getValue()) );
                    core.setActionVisible("btn-keflinMedicamento", true );
                    core.openCommandBar();
                }
                // Apenas se ele pegou a prescrição médica é que ele sabe o que vai pegar, mas só vai falar uma vez
                if ( (level.getFlag("score_pegou_prescricao_medica").getValue() == true) &&
                    (level.getFlag("ja_falou_farmaceutico").getValue() == false) ) {
                    level.getFlag("ja_falou_farmaceutico").setValue( true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Farmácia: OnUnload");
                core.closeCommandBar();
            });


         farmacia.registerActions([

            new Action("io-ler_prontuario", "Ler prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");

                })
                .setVisibility( true )
        ]);


        farmacia.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),

            // Keflin
            new InteractiveObject("io-keflin_medicamento", "Pegar Medicamento")
                .setCssClass("intObj-keflin_medicamento")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar Medicamento");
                    if ( level.getFlag("score_pegou_medicamento").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarMedicamento );
                        level.getFlag("score_pegou_medicamento").setValue( true );
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
                    if ( level.getFlag("score_conferiu_medicacao").getValue() == false ) {
                        core.registerScoreItem( Scores.conferirMedicamento );
                        level.getFlag("score_conferiu_medicacao").setValue( true );
                    }
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
                core.openDialog( 0 );

            })
            .onUnload(function() {
                core.closeCommandBar();
            });

        postoDeEnfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( level.getFlag("score_pegou_soro").getValue() == false ||
                        level.getFlag("score_pegou_algodao").getValue() == false ||
                        level.getFlag("score_pegou_luvas").getValue() == false ||
                        level.getFlag("score_pegou_seringa_5ml").getValue() == false ||
                        level.getFlag("score_pegou_ampola_soro").getValue() == false ||
                        level.getFlag("score_pegou_alcool").getValue() == false ||
                        level.getFlag("score_pegou_seringa_10ml").getValue() == false ||
                        level.getFlag("score_pegou_agulha").getValue() == false ||
                        level.getFlag("score_pegou_equipo_soro").getValue() == false /*||
                        level.getFlag("pegarBandeja").getValue() == true*/ ) {
                        core.openDialog( 4 );
                    } else {
                        core.changeScene( 1 );
                    }

                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaos );
                        level.getFlag("score_lavar_maos_posto_enfermagem").setValue( true );
                    }

                })
                .setVisibility( true ),

            new Action("btn-confirmarMedicamento", "Confirmar medicação com o mentor")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Confirmar medicação com o mentor");
                    if ( level.getFlag("score_conferiu_medicacao_posto").getValue() == false ) {
                        core.registerScoreItem( Scores.confirmarMedicacaoPosto );
                        level.getFlag("score_conferiu_medicacao_posto").setValue( true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-prepararMedicacao", "Preparar medicação")
                .setCssClass("action-prepararMedicacao")
                .onClick(function() {
                    console.log("Action: Preparar medicação");
                    if ( level.getFlag("score_preparar_medicacao").getValue() == false ) {
                        core.registerScoreItem( Scores.prepararMedicacao );
                        level.getFlag("score_preparar_medicacao").setValue( true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-gotejamentoSoro", "Calcular gotejamento do soro")
                .setCssClass("action-equipo")
                .onClick(function() {
                    console.log("Action: Calcular gotejamento do soro");
                    if ( level.getFlag("score_calculou_gotejamento").getValue() == false ) {
                        core.registerScoreItem( Scores.calcularGotejamento );
                        level.getFlag("score_calculou_gotejamento").setValue( true );
                    }

                })
                .setVisibility( false ),

            new Action("btn-identificarMedicacao", "Identificar medicação")
                .setCssClass("action-identificarMedicacao")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Aqui irá abrir a ficha sobre a medicação que é para o jogador preencher

                    if ( level.getFlag("score_identificar_medicacao").getValue() == false ) {
                        core.registerScoreItem( Scores.identificarMedicacao );
                        level.getFlag("score_identificar_medicacao").setValue( true );
                    }

                })
                .setVisibility( false )
        ]);

        postoDeEnfermagem.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.postoDeEnfermagem[ 0 ], function() {
                    if ( level.getFlag("score_calculou_valor_medicamento").getValue() == false ) {
                        core.registerScoreItem( Scores.calcularValorMedicamento );
                        level.getFlag("score_calculou_valor_medicamento").setValue( true );
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
                    if ( level.getFlag("score_calculou_errado_valor_medicamento").getValue() == false ) {
                        core.registerScoreItem( Scores.calcularErradoValorMedicamento );
                        level.getFlag("score_calculou_errado_valor_medicamento").setValue( true );
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
                    core.setActionVisible("btn-confirmarMedicamento", true );
                    core.setActionVisible("btn-prepararMedicacao", true );
                    core.setActionVisible("btn-gotejamentoSoro", true );
                    core.setActionVisible("btn-identificarMedicacao", true );
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
                })

        ]);

        postoDeEnfermagem.registerInteractiveObjects([

            new InteractiveObject("io-abrir_gaveta_esquerda", "Abrir gaveta esquerda")
                .setCssClass("intObj-openDrawer_left")
                .onClick(function() {
                    if ( level.getFlag("score_pegou_bandeja").getValue() != true ) {
                        core.openDialog( 7 );
                    } else {
                        console.log("Action: Abrir gaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        if ( level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false ) {
                            if ( level.getFlag("score_nao_lavar_maos_posto_enfermagem").getValue() == false ) {
                                core.registerScoreItem( Scores.naoLavarMaos );
                                level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue( true );
                            }
                        }
                        core.openModalScene("gavetaEsquerda");
                        core.openCommandBar();

                        core.setInteractiveObjectVisible("io-soro", !(level.getFlag("score_pegou_soro").getValue()) );
                        core.setInteractiveObjectVisible("io-algodao", !(level.getFlag("score_pegou_algodao").getValue()) );
                        core.setInteractiveObjectVisible("io-luvas", !(level.getFlag("score_pegou_luvas").getValue()) );
                        core.setInteractiveObjectVisible("io-seringa5ml", !(level.getFlag("score_pegou_seringa_5ml").getValue()) );
                        core.setInteractiveObjectVisible("io-ampola_soro", !(level.getFlag("score_pegou_ampola_soro").getValue()) );
                        core.setInteractiveObjectVisible("io-alcool", !(level.getFlag("score_pegou_alcool").getValue()) );
                        core.setInteractiveObjectVisible("io-seringa10ml", !(level.getFlag("score_pegou_seringa_10ml").getValue()) );
                        core.setInteractiveObjectVisible("io-agulha", !(level.getFlag("score_pegou_agulha").getValue()) );
                        core.setInteractiveObjectVisible("io-equipo_soro", !(level.getFlag("score_pegou_equipo_soro").getValue()) );
                    }
                })
                .setVisibility( true ),

            /*new InteractiveObject("io-abrir_gaveta_direita", "Abrir gaveta direita")
                .setCssClass("intObj-openDrawer_right")
                .onClick(function() {
                    if ( level.getFlag("score_pegou_bandeja").getValue() != true ) {
                        core.openDialog( 7 );
                    }
                    else{
                        console.log("Action: abrir_gaveta_direita");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        core.openModalScene("gavetaDireita");
                        core.openCommandBar();

                        // core.setInteractiveObjectVisible("io-coxim", !(level.getFlag("coxim").getValue()));
                    }
                })
                .setVisibility( true ),*/

            // Bandeja
            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar bandeja");
                    if ( level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false ) {
                        if ( level.getFlag("score_nao_lavar_maos_posto_enfermagem").getValue() == false ) {
                            core.registerScoreItem( Scores.naoLavarMaos );
                            level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue( true );
                        }
                    }
                    if ( level.getFlag("score_pegou_bandeja").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarBandeja );
                        level.getFlag("score_pegou_bandeja").setValue( true );
                    }
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);


        gavetaEsquerda = new Scene("gavetaEsquerda", "Gaveta esquerda")
            .setCssClass("modalScene-drawer");

        gavetaEsquerda.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    // Verifica se pegou todos os itens e ainda não abriu o diálogo com o mentor
                    if ( level.getFlag("score_pegou_soro").getValue() == true &&
                        level.getFlag("score_pegou_algodao").getValue() == true &&
                        level.getFlag("score_pegou_luvas").getValue() == true &&
                        level.getFlag("score_pegou_seringa_5ml").getValue() == true &&
                        level.getFlag("score_pegou_ampola_soro").getValue() == true &&
                        level.getFlag("score_pegou_alcool").getValue() == true &&
                        level.getFlag("score_pegou_seringa_10ml").getValue() == true &&
                        level.getFlag("score_pegou_agulha").getValue() == true &&
                        level.getFlag("score_pegou_equipo_soro").getValue() == true &&
                        level.getFlag("score_falou_com_mentor").getValue() == false ) {
                        // Para não abrir outra vez esse diálogo
                            level.getFlag("score_falou_com_mentor").setValue( true );
                            console.log("Action: fechar_gaveta_esquerda");
                            // Som
                            Player.play( Player.audios.sfx.fecharGaveta );
                            core.closeModalScene("Gaveta esquerda");
                            core.closeCommandBar();
                            core.openDialog( 2 );
                        } else {
                            if ( level.getFlag("score_nao_pegou_todos_instrumentos").getValue() == false ) {
                                core.registerScoreItem( Scores.naoPegarAlgumInstrumento );
                                level.getFlag("score_nao_pegou_todos_instrumentos").setValue( true );
                            }
                            core.closeCommandBar();
                            core.openDialog( 4 );
                    }
                })
                .setVisibility( true )
        ]);

        gavetaEsquerda.registerInteractiveObjects([
            // Soro Fisiológico 0,9% (100 ml)
            new InteractiveObject("io-soro", "Pegar soro fisiológico 0,9% (100 ml)")
                .setCssClass("intObj-soro_fisiologico_100_ml")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar soro fisiológico 0,9% (100 ml)");
                    core.setInteractiveObjectVisible("io-soro", false );
                    if ( level.getFlag("score_pegou_soro").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarSoroFisiologico );
                        level.getFlag("score_pegou_soro").setValue( true );
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
                    if ( level.getFlag("score_pegou_algodao").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarAlgodao );
                        level.getFlag("score_pegou_algodao").setValue( true );
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
                    if ( level.getFlag("score_pegou_luvas").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarLuvas );
                        level.getFlag("score_pegou_luvas").setValue( true );
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
                    if ( level.getFlag("score_pegou_seringa_5ml").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarSeringa5 );
                        level.getFlag("score_pegou_seringa_5ml").setValue( true );
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
                    if ( level.getFlag("score_pegou_ampola_soro").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarAmpolaSF );
                        level.getFlag("score_pegou_ampola_soro").setValue( true );
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
                    if ( level.getFlag("score_pegou_alcool").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarAlcool );
                        level.getFlag("score_pegou_alcool").setValue( true );
                    }
                })
                .setVisibility( true ),

            // Seringa de 10 ml
            new InteractiveObject("io-seringa10ml", "Pegar seringa de 10 ml")
                .setCssClass("intObj-seringa_de_10_ml")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar seringa de 10 ml");
                    core.setInteractiveObjectVisible("io-seringa10ml", false );
                    if ( level.getFlag("score_pegou_seringa_10ml").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarSeringa10 );
                        level.getFlag("score_pegou_seringa_10ml").setValue( true );
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
                    if ( level.getFlag("score_pegou_agulha").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarAgulha );
                        level.getFlag("score_pegou_agulha").setValue( true );
                    }
                })
                .setVisibility( true ),

            // Equipo de soro macrogotas
            new InteractiveObject("io-equipo_soro", "Pegar equipo de soro macrogotas")
                .setCssClass("intObj-equipo_de_soro")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar equipo de soro macrogotas");
                    core.setInteractiveObjectVisible("io-equipo_soro", false );
                    if ( level.getFlag("score_pegou_equipo_soro").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarEquipoSoroMacrogotas );
                        level.getFlag("score_pegou_equipo_soro").setValue( true );
                    }
                })
                .setVisibility( true )
        ]);
/*

        gavetaDireita = new Scene("gavetaDireita", "Gaveta direita")
            .setCssClass("modalScene-drawer");

        gavetaDireita.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.fecharGaveta );
                    console.log("Action: fechar_gaveta_direita");
                    core.closeModalScene("Gaveta direita");
                })
                .setVisibility( true )
        ]);

        gavetaDireita.registerInteractiveObjects([
            new InteractiveObject("io-coxim", "Coxim")
                .setCssClass("intObj-cushion")
                .onClick(function() {
                    console.log("IntObj: io-coxim");
                    // level.getFlag("coxim").setValue(true);
                    // core.setInteractiveObjectVisible("io-coxim", false);

                    // if(level.getFlag("score_pegar_coxim").getValue() == false) {
                    //     core.registerScoreItem(Scores.pegarCoxim);
                    // level.getFlag("score_pegar_coxim").setValue(true);
                    // }
                })
                .setVisibility( true )
        ]);
*/


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
                    if ( level.getFlag("score_falou_com_mentor").getValue() == true ) {
                        core.unlockLevel( 5 );
                        core.closeCommandBar();
                        core.showEndOfLevel();
                    }
                })
                .setVisibility( true ),

            new Action("btn-pegar_prescricao_medica", "Pegar prescrição médica")
                .setCssClass("action-pegar_prescricao_medica")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar prescrição médica");
                    if ( level.getFlag("score_pegou_prescricao_medica").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarPrescricaoMedica );
                        level.getFlag("score_pegou_prescricao_medica").setValue( true );
                    }
                    core.setActionVisible("btn-pegar_prescricao_medica", false );
                })
                .setVisibility( true )
        ]);


        pulseira = new Scene("Pulseira", "Pulseira");

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_pedro")
                .onClick(function() {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");

                    Pulseira.close();

                    if ( level.getFlag("score_checar_pulseira").getValue() == false ) {
                        core.registerScoreItem( Scores.checarPulseira );
                        level.getFlag("score_checar_pulseira").setValue( true );
                    }
                })
                .setVisibility( true )
        ]);


        level.registerScene( recepcao );
        level.registerScene( corredor );
        level.registerScene( alaMasculina );
        level.registerScene( leito );
        level.registerScene( farmacia );
        level.registerScene( postoDeEnfermagem );


        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );
        level.registerModalScene( gavetaEsquerda );
        // level.registerModalScene( gavetaDireita );


        level.setSetupScript(function() {

            level.getFlag("pegarFolheto9Certos").setValue( false );
            level.getFlag("score_ir_posto_enfermagem_hora_errada").setValue( false );
            level.getFlag("score_ir_farmacia_hora_errada").setValue( false );
            level.getFlag("score_ir_ala_feminina").setValue( false );
            level.getFlag("score_viu_prontuario").setValue( false );
            level.getFlag("score_nao_viu_prontuario").setValue( false );
            level.getFlag("score_lavar_maos_antes_leito").setValue( false );
            level.getFlag("score_nao_lavar_maos_antes_leito").setValue( false );
            level.getFlag("ja_falou_farmaceutico").setValue( false );
            level.getFlag("score_pegou_medicamento").setValue( false );
            level.getFlag("score_nao_pegou_medicamento").setValue( false );
            level.getFlag("score_conferiu_medicacao").setValue( false );
            level.getFlag("score_pegou_prescricao_medica").setValue( false );
            level.getFlag("score_nao_conferiu_medicacao").setValue( false );
            level.getFlag("score_lavar_maos_posto_enfermagem").setValue( false );
            level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue( false );
            level.getFlag("score_pegou_bandeja").setValue( false );
            level.getFlag("score_pegou_soro").setValue( false );
            level.getFlag("score_pegou_algodao").setValue( false );
            level.getFlag("score_pegou_luvas").setValue( false );
            level.getFlag("score_pegou_seringa_5ml").setValue( false );
            level.getFlag("score_pegou_ampola_soro").setValue( false );
            level.getFlag("score_pegou_alcool").setValue( false );
            level.getFlag("score_pegou_seringa_10ml").setValue( false );
            level.getFlag("score_pegou_agulha").setValue( false );
            level.getFlag("score_pegou_equipo_soro").setValue( false );
            level.getFlag("score_nao_pegou_todos_instrumentos").setValue( false );
            level.getFlag("score_falou_com_mentor").setValue( false );
            level.getFlag("score_lavar_maos").setValue( false );
            level.getFlag("score_nao_pegou_prescricao_medica").setValue( false );
            level.getFlag("score_calculou_valor_medicamento").setValue( false );
            level.getFlag("score_calculou_errado_valor_medicamento").setValue( false );
            level.getFlag("score_checar_pulseira").setValue( false );
            level.getFlag("score_nao_checar_pulseira").setValue( false );
            level.getFlag("score_lavar_maos_antes_prontuario").setValue( false );
            level.getFlag("score_nao_lavar_maos_antes_prontuario").setValue( false );
            level.getFlag("score_conferiu_medicacao_posto").setValue( false );
            level.getFlag("score_preparar_medicacao").setValue( false );
            level.getFlag("score_calculou_gotejamento").setValue( false );
            level.getFlag("score_identificar_medicacao").setValue( false );
            level.getFlag("score_administrar_medicacao").setValue( false );
            level.getFlag("score_nao_administrar_medicacao").setValue( false );
            level.getFlag("score_gotejar_soro_equipo").setValue( false );
            level.getFlag("score_nao_gotejar_soro_equipo").setValue( false );
            level.getFlag("score_anotou_prontuario").setValue( false );

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

            Prontuario.setPrescMedicaRowData( 0, "", "Cefalotina sódica (Keflin®)", "Endovenosa", false, true );
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


        level.setInitialScene( 0 );

        game.registerLevel( level, 4 );

        console.groupEnd();

    });
