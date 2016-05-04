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

        var Dialogs = require("DialogsData").fase7;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level7;
        var Player = require("Player");


        var level = new Level("Level 8");
        level.setMaxPoints( Scores._sum );
        console.groupCollapsed( level.getName() );


        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                core.flag("conversar_recepcionista",  true );
                core.openDialog( 0 );
            });


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( core.flag("conversar_recepcionista") == true ) {
                core.closeDialog();
                core.changeScene( 1 );
                console.log("Ir ao corredor");
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
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),


            // 1

            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 1 ] )
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


        function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            if ( core.flag("score_ler_prontuario") == false ) {
                if ( core.flag("ir_farmacia_horaErrada") == false ) {
                    core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    core.flag("ir_farmacia_horaErrada",  true );
                }
            }
            core.changeScene( 4 );
        }


        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            if ( core.flag("ir_postoEnfermagem_horaErrada") == false ) {
                core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                core.flag("ir_postoEnfermagem_horaErrada",  true );
            }
            // Já falou com a paciente, porém não foi até a farmacia ainda
            if ( ( core.flag("conferir_medicamento_correto") == false ) &&
               ( core.flag("score_ler_prontuario") == true ) ) {
                    core.openDialog( 0 );
            } else {
                core.changeScene( 5 );
            }
        }

        function corredorIrAlaFeminina() {
            console.log("Action: corredorIrAlaFeminina");

            core.changeScene( 2 );
        }


        function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgicoHoraErrada");
            if ( core.flag("ir_centroCirurgico_horaErrada") == false ) {
                core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );

                core.flag("ir_centroCirurgico_horaErrada",  true );
            }
            core.changeScene( 7 );
        }


        function corredorIrAlaMasculina() {
            console.log("Action: corredorIrAlaMasculinaHoraErrada");
            if ( core.flag("ir_AlaMasculina_horaErrada") == false ) {
                core.registerScoreItem( Scores.irAlaMasculinaHoraErrada );

                core.flag("ir_AlaMasculina_horaErrada",  true );
            }
            core.changeScene( 6 );
        }


        corredor.registerDialogs([
            // 0
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.irParaFarmacia )
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
                .setVisibility( true )


        ]);


        var alaFeminina = new Scene("alaMasculina", "Ala Masculina")
            .setCssClass("scene-bedroom-level7")
            .onLoad(function() {
                core.flag("ir_ala_feminina_primeira_vez",  true );
                if ( ( core.flag("pegou_tudo_posto") == false ) &&
                   ( core.flag("conferir_medicamento_correto") == true ) ) {
                    core.setActionVisible("btn-lavarMaos", false );
                } else {
                    if ( core.flag("pegou_tudo_posto") == true ) {
                        // Pra reativar esse botão caso ele tenha sido desabilitado alguma vez
                        core.setActionVisible("btn-lavarMaos", true );
                    }
                }
                console.log("Load scene: " + alaFeminina.getName() );
            });


        alaFeminina.registerDialogs([

            // 0 Jogador responde
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.enfermariaFeminina[ 0 ], function() {
                    core.openDialog( 1 );
                })
                .registerOption( Dialogs.enfermariaFeminina[ 1 ], function() {
                    core.openDialog( 5 );
                })
                .setRandomize( true ),

            // 1
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.enfermariaFeminina[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),

            // 2
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.enfermariaFeminina[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),

            // 3
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.enfermariaFeminina[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),

            // 4
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.enfermariaFeminina[ 5 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 5
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.enfermariaFeminina[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 0 );
                }),

            // 6 - ALERTA CONVERSAR PACIENTE
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.conversarPaciente )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 7 - ALERTA LAVAR MAOS
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo3 )
                .registerOption("", function() {
                    core.closeDialog();
                }),


            // 8 - ALERTA ESQUECEU MEDICAMENTO
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarMedicamento )
                .registerOption("", function() {
                    core.closeDialog();
                })

        ]);


        alaFeminina.registerActions([


            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    if ( core.flag("conversarPaciente") == false ) {
                        if ( core.flag("score_nao_conversou_paciente") == false ) {
                            core.flag("score_nao_conversou_paciente",  true );
                            core.registerScoreItem( Scores.naoFalarComPaciente );
                        }
                    }
                    if ( core.flag("score_ler_prontuario") == false ) {
                        core.flag("score_ler_prontuario",  true );
                        core.registerScoreItem( Scores.lerProntuario );
                    }
                    // Parte final da fase
                    if ( core.flag("score_ofereceu_copo") == true ) {
                        if ( core.flag("score_lavar_maos_2") == false ) {
                            if ( core.flag("score_nao_lavou_maos_2") == false ) {
                                core.flag("score_nao_lavou_maos_2",  true );
                                core.registerScoreItem( Scores.naoLavarMaos2 );
                            }
                        }
                        if ( core.flag("score_anotar_prontuario") == false ) {
                            core.registerScoreItem( Scores.anotarProntuario );
                            core.flag("score_anotar_prontuario",  true );
                        }
                    }
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true ),


            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_ofereceu_copo") == true ) {
                        if ( core.flag("score_lavar_maos_2") == false ) {
                            core.registerScoreItem( Scores.lavarMaos2 );
                            core.flag("score_lavar_maos_2",  true );
                        }
                    } else {
                        if ( core.flag("lavarMaos") == false ) {
                            core.flag("lavarMaos",  true );
                            core.registerScoreItem( Scores.lavarMaos );
                        }
                    }
                })
                .setVisibility( false )


        ]);


        alaFeminina.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function() {
                    if ( core.flag("conversarPaciente") == false ) {
                        core.openDialog( 6 );
                    } else {
                        console.log("voltando para corredor");
                        if ( core.flag("score_ler_prontuario") == true ) {
                            if ( core.flag("score_nao_leu_prontuario") == false ) {
                                core.registerScoreItem( Scores.naoLeuProntuario );
                                core.flag("score_nao_leu_prontuario",  true );
                            }
                        }
                        core.changeScene( 1 );
                    }

                }),


            new InteractiveObject("io-conversar_paciente2", "Ir ao leito")
                .setCssClass("intObj-irLeitoEsquerda")
                .onClick(function() {
                    // Primeiro momento onde você apenas irá conversar com o paciente
                    if ( core.flag("conversarPaciente") == false ) {
                        core.flag("conversarPaciente",  true );
                        core.registerScoreItem( Scores.falarComPaciente );
                        core.openDialog( 0 );
                    // Não ocorre nada, pois o jogador precisa ir na farmácia e no posto de enfermagem primeiro
                    } else if ( core.flag("pegou_tudo_posto") == false ) {
                    // Ida para o leito sem lavar as mãos, o que impede o jogador Ir ao leito
                    } else if ( core.flag("lavarMaos") == false ) {
                        core.openDialog( 7 );
                    // Ida para o leito sem pegar o medicamento, o que impede o jogador Ir ao leito
                    } else if ( core.flag("pegar_medicamento") == false ) {
                        core.openDialog( 8 );
                    // Ida para o leito
                    } else {
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( true )


        ]);


        function farmaciaIrCorredor() {
            console.log("Ir ao corredor");

            // Caso o jogador apenas entrou na farmácia no momento errado
            if ( core.flag("score_ler_prontuario") == false ) {
                core.changeScene( 1 );
            } else if ( core.flag("pegar_medicamento") == false ) {
                core.openDialog( 8 );
            } else if ( core.flag("conferir_medicamento_correto") == false ) {
                core.openDialog( 7 );
            } else if ( core.flag("conferir_medicamento_errado") == false ) {
                core.openDialog( 10 );
            } else {
                core.changeScene( 1 );
            }
        }

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {
                if ( core.flag("score_ler_prontuario") == true ) {
                    if ( core.flag("ir_ala_feminina_primeira_vez") == true ) {
                        console.log("Load scene: " + farmacia.getName() );
                        console.log("Abrindo dialogo com farmaceutico");
                        core.openDialog( 0 );
                    } else {
                        console.log("Hora Errada!");
                        if ( core.flag("ir_farmacia_horaErrada") == false ) {
                            core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                        }
                        core.flag("ir_farmacia_horaErrada",  true );
                        core.openDialog( 9 );
                        core.changeScene( 1 );
                    }
                }
                core.setActionVisible("btn-clorpropamidaMedicamento", false );
            });


        farmacia.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),

            // Clorpromazina
            new InteractiveObject("io-clorpromazina_medicamento", "Pegar Medicamento")
                .setCssClass("intObj-clorpromazina_medicamento")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar Medicamento");
                    core.flag("pegar_medicamento",  true );
                    // Ativando o seu botão para conferi-lo
                    core.setActionVisible("btn-clorpromazinaMedicamento", true );
                    core.registerScoreItem( Scores.pegarMedicamento );
                    core.setInteractiveObjectVisible("io-clorpromazina_medicamento", false );
                })
                .setVisibility( false ),

            // Clorpropamida
            new InteractiveObject("io-clorpropamida_medicamento", "Pegar Medicamento")
                .setCssClass("intObj-clorpropamida_medicamento")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar Medicamento");
                    core.flag("pegar_medicamento_correto",  true );
                    // Ativando o seu botão para conferi-lo
                    core.setActionVisible("btn-clorpropamidaMedicamento", true );
                    core.registerScoreItem( Scores.trocarMedicamento );
                    core.setInteractiveObjectVisible("io-clorpropamida_medicamento", false );
                })
                .setVisibility( false )

        ]);

        farmacia.registerDialogs([


            // 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.farmacia[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // 1
            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 1 ] )
                .registerOption("", function() {
                    // Ativando o Clorpromazina
                    core.setInteractiveObjectVisible("io-clorpromazina_medicamento", true );
                    core.closeDialog();
                }),

            // 2
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.farmacia[ 2 ], function() {
                    core.openDialog( 3 );
                })
                .registerOption( Dialogs.farmacia[ 3 ], function() {
                    core.openDialog( 5 );
                })
                .setRandomize( true ),

            // 3
            new Dialog( lib.characters.paulo )
                .setText( Dialogs.farmacia[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),

            // 4
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.farmacia[ 5 ], function() {
                    core.openDialog( 6 );
                })
                .registerOption( Dialogs.farmacia[ 6 ], function() {
                    // Ativando o Clorpropamida
                    core.setInteractiveObjectVisible("io-clorpropamida_medicamento", true );
                    core.closeDialog();
                })
                .setRandomize( true ),

            // 5
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 7 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),

            // 6
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),

            // 7 - ALERTA VERIFICAR MEDICAMENTO
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verificarMedicamento )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 8 - ALERTA PEGAR MEDICAMENTO
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarMedicamento )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 9 - Alerta Hora Errada

            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 10 - ALERTA VERIFICAR MEDICAMENTO PRIMEIRA VEZ
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarMedicamento2 )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        farmacia.registerActions([


            new Action("btn-clorpromazinaMedicamento", "Conferir Medicamento")
                .setCssClass("action-clorpromazina_medicamento")
                .onClick(function() {
                    if ( core.flag("conferir_medicamento_errado") == false ) {
                        core.flag("conferir_medicamento_errado",  true );
                        core.registerScoreItem( Scores.conferirMedicamentoErrado );
                    }
                    core.setActionVisible("btn-clorpromazinaMedicamento", false );
                    core.openModalScene("conferirClorpromazina");
                })
                .setVisibility( false ),

            new Action("btn-clorpropamidaMedicamento", "Conferir Medicamento")
                .setCssClass("action-clorpropamida_medicamento")
                .onClick(function() {
                    if ( core.flag("conferir_medicamento_correto") == false ) {
                        core.flag("conferir_medicamento_correto",  true );
                        core.registerScoreItem( Scores.conferirMedicamentoCorreto );
                        // Para o caso do jogador não ter falado com a paciente na ala feminina, impedindo-o de fazer isso
                        /*if ( core.flag("conversarPaciente") == false ) {
                            core.flag("conversarPaciente",  true );
                        }*/
                    }
                    core.openModalScene("conferirClorpropamida");
                })
                .setVisibility( false )
        ]);


        var leito = lib.scenes.leitos.ana.getClone()
            .onLoad(function() {
                if ( core.flag("score_explicar_acao_medicamento") == false ) {
                    core.registerScoreItem( Scores.explicarAcaoMedicamento );
                    core.flag("score_explicar_acao_medicamento",  true );
                }
                core.openDialog( 0 );
            });

        leito.registerDialogs([

            // 0
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.leitoPaciente[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // 1
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // 2
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.leitoPaciente[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),

            // 3
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leitoPaciente[ 3 ], function() {
                    core.openDialog( 4 );
                })
                .registerOption( Dialogs.leitoPaciente[ 4 ], function() {
                    core.openDialog( 7 );

                })
                .setRandomize( true ),


            // 4
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.leitoPaciente[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),


            // 5
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 6 );
                }),

            // 6
            new Dialog( lib.characters.pacientes.ana )
                .setText( Dialogs.leitoPaciente[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                }),

            // 7 ALERTA MENTOR
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),

            // 8 Esquecer a pulseira
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verPulseira )
                .registerOption("", function() {
                    core.closeDialog();
                })

        ]);

        leito.registerActions([

            new Action("btn-oferecer_copo", "Oferecer copo com água para a paciente")
                .setCssClass("action-copo_descartavel")
                .onClick(function() {
                    console.log("Action: Oferecer copo com água para a paciente");
                    if ( core.flag("score_verificar_pulseira") == false ) {
                        if ( core.flag("score_nao_verificou_pulseira") == false ) {
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                            core.flag("score_nao_verificou_pulseira",  true );
                        }
                        core.openDialog( 8 );
                    } else {
                        if ( core.flag("score_ofereceu_copo") == false ) {
                            core.registerScoreItem( Scores.oferecerCopo );
                            core.flag("score_ofereceu_copo",  true );
                        }
                    }
                })
                .setVisibility( true ),

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    console.log("Action: Voltar para a ala feminina");
                    /*if ( core.flag("score_anotar_prontuario") == false ) {
                        if ( core.flag("score_nao_anotar_prontuario") == false ) {
                            core.registerScoreItem( Scores.naoAnotarProntuario );
                            core.flag("score_nao_anotar_prontuario",  true );
                        }
                    }*/
                    core.changeScene( 2 );
                })
                .setVisibility( true )

        ]);

        leito.registerInteractiveObjects([

            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_08-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    if ( core.flag("score_verificar_pulseira") == false ) {
                        core.registerScoreItem( Scores.verificarPulseira );
                        core.flag("score_verificar_pulseira",  true );
                    }
                    Pulseira.open();
                    core.openCommandBar();
                })
                .setVisibility( true )


        ]);


        var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                if ( core.flag("ir_ala_feminina_primeira_vez") == true ) {
                    console.log("Load scene: " + postoDeEnfermagem.getName() );
                } else {
                    console.log("Hora Errada!");
                    if ( core.flag("ir_postoEnfermagem_horaErrada") == false ) {
                        core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    }
                    core.flag("ir_postoEnfermagem_horaErrada",  true );
                    core.openDialog( 2 );
                    core.changeScene( 1 );
                }
            });

        postoDeEnfermagem.registerDialogs([


            // 0

            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarObjetosGaveta )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 1
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarBandeja )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 2

            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                })


        ]);


        postoDeEnfermagem.registerInteractiveObjects([

            new InteractiveObject("io-abrirGaveta", "Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function() {
                    if ( core.flag("pegou_bandeja") != true ) {
                        core.openDialog( 1 );
                    } else {
                        console.log("Action: abrirGaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        core.openModalScene("gaveta");
                        core.openCommandBar();

                        core.setInteractiveObjectVisible("io-copo_descartavel", !(core.flag("score_pegar_copo_descartavel")) );
                        core.setInteractiveObjectVisible("io-agua_potavel", !(core.flag("score_pegar_agua_potavel")) );
                    }
                })
                .setVisibility( true ),


            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    console.log("Action: Pegar bandeja");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.flag("pegou_bandeja",  true );
                    // core.flag("score_pegou_bandeja",  true );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);


        postoDeEnfermagem.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( core.flag("score_pegar_copo_descartavel") == false || core.flag("score_pegar_agua_potavel") == false ) {
                        if ( core.flag("score_pegar_copo_descartavel") == false ) {
                            if ( core.flag("score_nao_pegar_copo") == false ) {
                                core.registerScoreItem( Scores.naoPegarCopo );
                                core.flag("score_nao_pegar_copo",  true );
                            }
                        }
                        if ( core.flag("score_pegar_agua_potavel") == false ) {
                            if ( core.flag("score_nao_pegar_agua") == false ) {
                                core.registerScoreItem( Scores.naoPegarAgua );
                                core.flag("score_nao_pegar_agua",  true );
                            }
                        }
                    } else {
                        // Para liberar o segundo diálogo com a paciente
                        core.flag("pegou_tudo_posto",  true );
                        core.changeScene( 1 );
                    }
                })

        ]);


        var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function() {
                console.log("Load scene: " + alaMasculina.getName() );
            });


        alaMasculina.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function() {
                    console.log("voltando para corredor");
                    core.changeScene( 1 );
                })


        ]);


        var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
                //
            });


        centroCirurgico.registerActions([


            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    centroCirurgicoIrCorredor();
                })


        ]);

        function centroCirurgicoIrCorredor() {
            console.log("Action: centroCirurgicoIrCorredor");
            core.changeScene( 1 );
        }


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    // Já estava no momento de realizar os procedimentos, portanto pode terminar a fase
                    if ( core.flag("score_ofereceu_copo") == true ) {
                        core.unlockLevel( 8 );
                        core.closeCommandBar();
                        core.showEndOfLevel();
                        Player.stopAll();
                        Player.play( Player.audios.sfx.missaoCumprida );
                    } else {
                        core.closeModalScene("Prontuario");
                    }
                })
                .setVisibility( true )

        ]);


        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    console.log("Action: fecharGaveta");
                    // Som
                    Player.play( Player.audios.sfx.fecharGaveta );
                    core.closeModalScene("Gaveta");
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
                    core.setInteractiveObjectVisible("io-copo_descartavel", false );

                    if ( core.flag("score_pegar_copo_descartavel") == false ) {
                        core.registerScoreItem( Scores.pegarCopoDescartavel );
                        core.flag("score_pegar_copo_descartavel",  true );
                    }
                })
                .setVisibility( true ),


            new InteractiveObject("io-agua_potavel", "Água Potável")
                .setCssClass("intObj-aguaPotavel")
                .onClick(function() {
                    console.log("IntObj: io-agua_potavel");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.setInteractiveObjectVisible("io-agua_potavel", false );

                    if ( core.flag("score_pegar_agua_potavel") == false ) {
                        core.registerScoreItem( Scores.pegarAguaPotavel );
                        core.flag("score_pegar_agua_potavel",  true );
                    }
                })
                .setVisibility( true )


        ]);


        pulseira = new Scene("pulseira", "pulseira");

        pulseira.registerInteractiveObjects([]);

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

        clorpropamida = new Scene("conferirClorpropamida", "Conferir Clorpropamida")
            .setCssClass("modalScene-clorpropamidaMedicamento");

        clorpropamida.registerActions([
            new Action("btn-fechar_zoom", "Finalizar conferição")
                .setCssClass("action-clorpropamida_medicamento")
                .onClick(function() {
                    console.log("Action: Finalizar conferição");
                    core.closeModalScene("conferirClorpropamida");
                })
        ]);

        clorpromazina = new Scene("conferirClorpromazina", "Conferir Clorpromazina")
            .setCssClass("modalScene-clorpromazinaMedicamento");

        clorpromazina.registerActions([
            new Action("btn-fechar_zoom", "Finalizar conferição")
                .setCssClass("action-clorpromazina_medicamento")
                .onClick(function() {
                    console.log("Action: Finalizar conferição");
                    core.closeModalScene("conferirClorpromazina");
                    core.openDialog( 2 );
                })
        ]);


        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        level.registerModalScene( pulseira );
        level.registerModalScene( clorpropamida );
        level.registerModalScene( clorpromazina );


        // id 0
        level.registerScene( recepcao );
        // id 1
        level.registerScene( corredor );
        // id 2
        level.registerScene( alaFeminina );
        // id 3
        level.registerScene( leito );
        // id 4
        level.registerScene( farmacia );
        // id 5
        level.registerScene( postoDeEnfermagem );
        // id 6
        level.registerScene( alaMasculina );
        // id 7
        level.registerScene( centroCirurgico );
        // id 8
        level.registerScene( prontuario );
        // id 9
        level.registerScene( gaveta );


        level.setSetupScript(function() {

            // Dados da pulseira
            Pulseira.setNameRegExp( /Ana Beatriz Galv(a|ã)o/ );
            Pulseira.setLeitoRegExp( /0*1/ );
            Pulseira.setDataRegExp( /19\/07\/1979/ );

            Pulseira.setName("Ana Beatriz Galvão");
            Pulseira.setLeito("01");
            Pulseira.setData("19/07/1979");
            Pulseira.disable();

            //  dados do prontuario
            Prontuario.setNome("Ana Beatriz Galvão");
            Prontuario.setSexo("F");
            Prontuario.setEstadoCivil("Solteira");
            Prontuario.setDataNascimento("19/07/1979");
            Prontuario.setIdade("36 anos");
            Prontuario.setProfissao("Publicitária");
            Prontuario.setPai("Antônio Bueno Galvão");
            Prontuario.setMae("Isabela Romeira Galvão");
            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("23/08/2015");
            Prontuario.setLeito("01 - Enfermaria Feminina");
            Prontuario.setAntecedentes("");
            Prontuario.setHipotese("Cirurgia de fratura de fêmur");
            Prontuario.setObservacoes("Diabetes Mellitus tipo II, sofreu queda em degrau de uma escada, devido à instabilidade glicêmica.");
            Prontuario.setPeso("50");
            Prontuario.setAltura("1,65");
            Prontuario.setCircunferenciaAbdominal("78");

            Prontuario.setPrescMedicaRowData( 0, "", "Clorpropamida", "Oral", "250mg/1x/dia", "07:00h", false, false );
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 1, "", "", "", "", "", false, false );
            Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

            Prontuario.clearPrescEnfermagemState( );
            // Caso não for possível digitar o valor da glicemia terá que fazer um desse para cada fase que usa
            Prontuario.setPrescEnfermagemState("verificar_glicemia");

            Prontuario.setSsvvRowData( 0, "", "120X70", "60", "18", "96", "35", true );
            Prontuario.setSsvvRowData( 1, "", "130X70", "68", "20", "96", "36.4", true );
            Prontuario.setAnotacaoEnfermagemRowData("", "");
        });


        level.registerFlag( new Flag( "conversar_recepcionista",  false  ) );
        level.registerFlag( new Flag( "conversar_mentor",  false  ) );
        level.registerFlag( new Flag( "ir_farmacia_horaErrada",  false  ) );
        level.registerFlag( new Flag( "ir_postoEnfermagem_horaErrada",  false  ) );
        level.registerFlag( new Flag( "ir_centroCirurgico_horaErrada",  false  ) );
        level.registerFlag( new Flag( "ir_AlaMasculina_horaErrada",  false  ) );
        level.registerFlag( new Flag( "ir_AlaFeminina_horaErrada",  false  ) );
        level.registerFlag( new Flag( "ir_postoEnfermagem_horaErrada",  false  ) );
        level.registerFlag( new Flag( "conversarPaciente",  false  ) );
        level.registerFlag( new Flag( "score_nao_conversou_paciente",  false  ) );
        level.registerFlag( new Flag( "score_ler_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_nao_leu_prontuario",  false  ) );
        level.registerFlag( new Flag( "conferir_medicamento_errado",  false  ) );
        level.registerFlag( new Flag( "pegar_medicamento",  false  ) );
        level.registerFlag( new Flag( "pegar_medicamento_correto",  false  ) );
        level.registerFlag( new Flag( "conferir_medicamento_correto",  false  ) );
        level.registerFlag( new Flag( "pegar_copo_descartavel",  false  ) );
        level.registerFlag( new Flag( "pegar_agua_potavel",  false  ) );
        level.registerFlag( new Flag( "pegou_bandeja",  false  ) );
        level.registerFlag( new Flag( "score_pegar_agua_potavel",  false  ) );
        level.registerFlag( new Flag( "score_pegar_copo_descartavel",  false  ) );
        level.registerFlag( new Flag( "ir_ala_feminina_primeira_vez",  false  ) );
        level.registerFlag( new Flag( "lavarMaos",  false  ) );
        level.registerFlag( new Flag( "pegou_tudo_posto",  false  ) );
        level.registerFlag( new Flag( "score_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_nao_verificou_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_ofereceu_copo",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_2",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavou_maos_2",  false  ) );
        level.registerFlag( new Flag( "score_explicar_acao_medicamento",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_nao_pegar_copo",  false  ) );
        level.registerFlag( new Flag( "score_nao_pegar_agua",  false  ) );

        level.setInitialScene( 0 );


        game.registerLevel( level, 8 );

        console.groupEnd();
    });
