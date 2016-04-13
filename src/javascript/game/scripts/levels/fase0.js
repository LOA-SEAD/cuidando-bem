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
/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").tutorial;
        var Alertas = require("DialogsData").alertas;
        var Player = require("Player");
        // endregion

        var level = new Level("Level 0 - Tutorial");
        console.groupCollapsed( level.getName() );

        // if false it wont check for flags -- tests purpose
        var flagsOn = true;
        var visibility = false;
        if ( !flagsOn ) {
            visibility = true;
        }

        // region Scenes

        // region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            // wont check for flags
            if ( !flagsOn ) {
                core.closeDialog( 0 );
                core.closeDialog( 1 );
                core.changeScene( 1 );
                console.log("Ir para o corredor");
            } else {
                if ( level.getFlag("conversar_recepcionista").getValue() == true ) {
                    core.closeDialog( 0 );
                    core.closeDialog( 1 );
                    core.changeScene( 1 );
                    console.log("Ir para o corredor");
                } else {
                    console.log("Necessita ação: conversar com a recepcionista");
                }
            }
        }

        function conversarRecepcionista() {
            console.log("action: Conversar com a recepcionista");
            core.openDialog( 0 );
        }

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                core.openDialog( 0 );
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.recepcionistaUnknow )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_recepcionista").setValue( true );
                    core.openDialog( 1 );
                }),

            // Dialog 1
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.recepcao[ 1 ], function() {
                    core.openDialog( 2 );
                }),

            // Dialog 2
            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 2 ] )
                .registerOption("", function() {
                    console.log("Encerrar o diálogo");
                    core.closeDialog( 3 );
                    core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true );
                    core.setInteractiveObjectVisible("io-ir_corredor_direita", true );
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
                .setVisibility( visibility ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right no-glow")
                .onClick( recepcaoIrCorredor )
                .setVisibility( visibility )
        ]);

        // endregion

        // region Corredor

        function corredorIrSalaLeitos() {
            if ( !flagsOn ) {
                console.log("Action: corredorIrSalaLeitos");
                core.changeScene( 2 );
            } else {
                if ( level.getFlag("conversar_mentor").getValue() == true ) {
                    core.changeScene( 2 );
                    console.log("Action: corredorIrSalaLeitos");
                } else {
                    console.log("Necessita ação: falar com mentor");
                }
            }
        }

        var corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                switch ( level.getFlag("passagem_corredor").getValue() ) {
                    // first time at 'corredor'
                    case 0:
                        core.setInteractiveObjectVisible("io-conversar_mentor", true );
                        core.openDialog( 0 );
                        break;
                    // second time at 'corredor'
                    case 1:
                        // core.setActionVisible("btn-ir_posto_enfermagem", true);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", true );
                        // core.setActionVisible("btn-ir_sala_leitos", false);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", false );
                        // core.setActionVisible("btn-conversar_mentor", false);
                        core.setInteractiveObjectVisible("io-conversar_mentor", false );
                        break;
                    case 2:
                        // core.setActionVisible("btn-ir_posto_enfermagem", false);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", false );
                        // core.setActionVisible("btn-ir_sala_leitos", true);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", true );
                        break;
                }
            })
            .onUnload(function() {
                switch ( level.getFlag("passagem_corredor").getValue() ) {
                    case 0:
                        level.getFlag("passagem_corredor").setValue( 1 );
                        break;
                    case 1:
                        level.getFlag("passagem_corredor").setValue( 2 );
                        break;
                    case 2:
                        level.getFlag("passagem_corredor").setValue( 3 );
                        break;
                }
            });

        corredor.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 0 ] )
                .registerOption("", function() {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.jogador )
                .setText("")
                // resposta correta
                .registerOption( Dialogs.corredor[ 1 ], function() {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 4 );
                })
                // dialog 2
                .registerOption( Dialogs.corredor[ 2 ], function() {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 2 );
                })
                .registerOption( Dialogs.corredor[ 4 ], function() {
                    level.getFlag("conversar_mentor").setValue( true );
                    core.openDialog( 3 );
                })
                .setRandomize( true ),

            // Dialog 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 3
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),

            // Dialog 4 - correto
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 6 ] )
                .registerOption("", function() {
                    core.closeDialog( 4 );
                    core.setInteractiveObjectVisible("io-ir_sala_leitos", true );
                    core.setInteractiveObjectVisible("io-conversar_mentor", true );
                })
        ]);

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.changeScene( 4 );
        }

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos", "Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrSalaLeitos )
                .setVisibility( visibility ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( visibility ),

            new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function() {
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog( 0 );
                })
                .setVisibility( visibility )
        ]);
        // endregion

        // region Sala de Leitos
        var salaDeLeitos = new Scene("salaDeLeitos", "scene-salaDeLeitos")
            .setCssClass("scene-bedroom-level0")
            .onLoad(function() {
                switch ( level.getFlag("passagem_sala-de-leitos").getValue() ) {
                    case 0:
                        core.setInteractiveObjectVisible("io-ir_leito", true );
                        core.setInteractiveObjectVisible("io-ir_corredor", false );
                        break;
                    case 1:
                        core.setInteractiveObjectVisible("io-ir_leito", false );
                        core.setInteractiveObjectVisible("io-ir_corredor", true );
                        break;
                }
            })
            .onUnload(function() {
                switch ( level.getFlag("passagem_sala-de-leitos").getValue() ) {
                    case 0:
                        level.getFlag("passagem_sala-de-leitos").setValue( 1 );
                        break;
                    case 1:
                        level.getFlag("passagem_sala-de-leitos").setValue( 0 );
                        break;
                }
            });

        salaDeLeitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-tutorial")
                .onClick(function() {
                    core.changeScene( 3 );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    core.changeScene( 1 );
                })
                .setVisibility( visibility )
        ]);

        // endregion

        // region Leito
        var leito = lib.scenes.leitos.joao.getClone()
            .onLoad(function() {
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true );

                // force case 1
                // level.getFlag("visita-leito").setValue(1);
                // delete here

                switch ( level.getFlag("visita-leito").getValue() ) {
                    case 0:
                        core.openDialog( 0 );
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_sala_leitos", false );
                        core.openDialog( 11 );
                        level.getFlag("termometro").setValue( false );
                        level.getFlag("medidor-pressao").setValue( false );
                        level.getFlag("oximetro").setValue( false );
                        level.getFlag("relogio").setValue( false );
                        break;
                }
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
                level.getFlag("visita-leito").setValue( 1 );
                core.closeCommandBar();
            });


        // region Leito - Dialogs
        leito.registerDialogs([
            // Dialog 0 - mentor
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 1 - resp jogador
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leito.conversa1[ 1 ], function() {
                    core.openDialog( 4 );
                })
                .registerOption( Dialogs.leito.conversa1[ 2 ], function() {
                    core.openDialog( 2 );
                })
                .registerOption( Dialogs.leito.conversa1[ 4 ], function() {
                    core.openDialog( 3 );
                })
                .setRandomize( true ),
            // Dialog 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 3
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 4
            new Dialog( lib.characters.pacientes.joao )
                .setText( Dialogs.leito.conversa1[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // Dialog 5
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leito.conversa1[ 7 ], function() {
                    core.openDialog( 8 );
                })
                .registerOption( Dialogs.leito.conversa1[ 8 ], function() {
                    core.openDialog( 6 );
                })
                .registerOption( Dialogs.leito.conversa1[ 10 ], function() {
                    core.openDialog( 7 );
                })
                .setRandomize( true ),
            // Dialog 6
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 9 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // Dialog 7
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 11 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // Dialog 8
            new Dialog( lib.characters.pacientes.joao )
                .setText( Dialogs.leito.conversa1[ 12 ] )
                .registerOption("", function() {
                    core.openDialog( 9 );
                }),
            // Dialog 9
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leito.conversa1[ 13 ], function() {
                    core.openDialog( 10 );
                }),
            // Dialog 10
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa1[ 14 ] )
                .registerOption("", function() {
                    core.closeDialog( 10 );
                    core.openCommandBar();
                }),


            // 2a visita do jogador ao leito

            // Dialog 11
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leito.conversa2[ 0 ], function() {
                    core.openDialog( 14 );
                })
                .registerOption( Dialogs.leito.conversa2[ 1 ], function() {
                    core.openDialog( 12 );
                })
                .registerOption( Dialogs.leito.conversa2[ 3 ], function() {
                    core.openDialog( 13 );
                })
                .setRandomize( true ),
            // Dialog 12
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa2[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 11 );
                }),
            // Dialog 13
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa2[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 11 );
                }),

            // Dialog 14
            new Dialog( lib.characters.pacientes.joao )
                .setText( Dialogs.leito.conversa2[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 15 );
                }),
            // Dialog 15
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leito.conversa2[ 6 ], function() {
                    core.openDialog( 16 );
                    // Som
                    Player.play( Player.audios.sfx.missaoCumprida );
                }),
            // Dialog 16
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa2[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog( 16 );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.openCommandBar();
                }),
            // Dialog 17 - Mentor
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.pulseiraIncorreta )
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                }),
            // Dialog 18 - Jogador
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leito.perguntarNome )
                .registerOption("", function() {
                    core.openDialog( 19 );
                }),
            // Dialog 19 - Nome do Paciente
            new Dialog( lib.characters.pacientes.joao )
                .setText( Dialogs.leito.conversa1[ 12 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                }),
            // Dialog 20 - Final de fase, informações no prontuário incorretas.
            new Dialog( lib.characters.mentor )
                .setText("Algumas informações do prontuário estão incorretas. Verifique-as e volte a conversar comigo.")
                .registerOption("", function() {
                    core.closeDialog();
                    Prontuario.open();
                    core.openCommandBar();
                }),
            // Dialog 21 - Final de fase, não verificou aparelhos de ssvv.
            new Dialog( lib.characters.mentor )
                .setText("Você ainda não mediu algum dos SSVV. Meça-os antes de anotar no prontuário.")
                .registerOption("", function() {
                    core.closeDialog();
                    Prontuario.open();
                    core.openCommandBar();
                }),
            // Dialog 22 - Final de fase, não lavou as mãos após usar aparelho
            new Dialog( lib.characters.mentor )
                .setText("Você deve lavar as mãos após utilizar os aparelhos.")
                .registerOption("", function() {
                    core.closeDialog();
                    // Prontuario.open();
                    core.openCommandBar();
                })
        ]);
        // endregion

        // region Leito - interactiveObjects and Actions
        leito.registerInteractiveObjects([

            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_01-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                    if ( level.getFlag("pulseira").getValue() == false ) {
                        // core.setInteractiveObjectVisible("io-pulseira_paciente", true );
                    }
                })
                .setVisibility( visibility ),


             new InteractiveObject("io-conversar_paciente", "Falar com o paciente")
                .setCssClass("intObj-conversar_paciente")
                .onClick(function() {


                    core.openDialog( 18 );
                    core.closeCommandBar();

                })
                .setVisibility( true )


        ]);

        leito.registerActions([
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    if ( Pulseira.isAllDataValid() ) {
                        console.log("Action: action-ir_sala_de_leitos");
                        core.registerScoreItem( Scores.tutorial.identificarPaciente );
                        core.changeScene( 2 );
                        Pulseira.disable();
                    } else {
                        core.closeCommandBar();
                        core.openDialog( 17 );
                        console.log("Alguns dados da pulseira estão incorretos");
                    }
                })
                .setVisibility( visibility ),


            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );

                    // TODO Clean this mess PLEASE
                    switch ( level.getFlag("lavar-maos").getValue() ) {
                        case 0:
                            level.getFlag("lavar-maos").setValue( 1 );
                            core.registerScoreItem( Scores.tutorial.lavarMaosAntes );
                            core.setActionVisible("btn-frequencia_respiratoria", true );
                            core.setActionVisible("btn-medir_pulso", true );
                            core.setActionVisible("btn-medir_temperatura", true );
                            core.setActionVisible("btn-saturacao_02", true );
                            core.setActionVisible("btn-ler_prontuario", true );
                            // core.setActionVisible("btn-lavarMaos", false);
                            break;
                        case 2:
                            // level.getFlag("lavar-maos").setValue(3);
                            // core.registerScoreItem(Scores.tutorial.lavarMaosDepois);
                            // core.setActionVisible("btn-lavarMaos", false);
                            // core.setActionVisible("btn-ler_prontuario", true);
                            break;
                    }

                    level.getFlag("lavar-maosDepois").setValue( true );
                })
                .setVisibility( visibility ),

            new Action("btn-medir_temperatura", "Ver temperatura")
                .setCssClass("action-medir_temperatura")
                .onClick(function() {
                    console.log("Action: medir_temperatura");
                    if ( level.getFlag("lavar-maos").getValue() >= 1 ) {

                        // core.setActionVisible("btn-medir_temperatura", false);
                        core.openModalScene("modalTermometro");
                        level.getFlag("termometro").setValue( true );

                        if ( level.getFlag("mediuTemperatura").getValue() == false ) {
                            level.getFlag("mediuTemperatura").setValue( true );
                            core.registerScoreItem( Scores.tutorial.verTemperatura );
                        }

                        level.getFlag("lavar-maosDepois").setValue( false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-medir_pulso", "Ver pressão")
                .setCssClass("action-medir_pulso")
                .onClick(function() {
                    console.log("Action: medir_pulso");
                    if ( level.getFlag("lavar-maos").getValue() >= 1 ) {

                        // core.setActionVisible("btn-medir_pulso", false);
                        core.openModalScene("modalMedidor_pressao");
                        level.getFlag("medidor-pressao").setValue( true );

                        if ( level.getFlag("mediuPressao").getValue() == false ) {
                            level.getFlag("mediuPressao").setValue( true );
                            core.registerScoreItem( Scores.tutorial.verPressao );
                        }

                        level.getFlag("lavar-maosDepois").setValue( false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-saturacao_02", "Ver saturação de O2")
                .setCssClass("action-medir_saturacao_02")
                .onClick(function() {
                    // core.setActionVisible("btn-saturacao_02", false);
                    console.log("Action: medir_saturacao_02");

                    if ( level.getFlag("lavar-maos").getValue() >= 1 ) {

                        core.openModalScene("modalOximetro");
                        level.getFlag("oximetro").setValue( true );

                        if ( level.getFlag("mediuBatimentosESaturacao").getValue() == false ) {
                            level.getFlag("mediuBatimentosESaturacao").setValue( true );
                            core.registerScoreItem( Scores.tutorial.verSaturacao );
                        }

                        level.getFlag("lavar-maosDepois").setValue( false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-frequencia_respiratoria", "Ver frequência respiratória")
                .setCssClass("action-medir_freq_respiratoria")
                .onClick(function() {
                    console.log("Action: medir_freq_respiratoria");
                    if ( level.getFlag("lavar-maos").getValue() >= 1 ) {

                        // core.setActionVisible("btn-frequencia_respiratoria", false);
                        level.getFlag("relogio").setValue( true );

                        if ( level.getFlag("mediuFreqRespiratoria").getValue() == false ) {
                            level.getFlag("mediuFreqRespiratoria").setValue( true );
                            core.registerScoreItem( Scores.tutorial.verFrequenciaRespiratoria );
                        }

                        level.getFlag("lavar-maosDepois").setValue( false );

                        FreqRespiratoria.open();
                        core.openModalScene("freqRespiratoria");
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( level.getFlag("lavar-maosDepois").getValue() == true ) {
                        if ( checouTodosAparelhos() ) {
                            if ( level.getFlag("lavar-maosDepoisScore").getValue() == true ) {
                                core.registerScoreItem( Scores.tutorial.lavarMaosDepois );
                            }
                        }

                        Prontuario.open();
                        core.openModalScene("Prontuario");
                    } else {
                        Prontuario.close();
                        core.closeCommandBar();
                        core.openDialog( 22 );
                    }
                })
                .setVisibility( visibility )
        ]);
        // endregion
        // endregion

        // region Posto de Enfermagem
        var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                core.setInteractiveObjectVisible("io-abrirGaveta", true );
            })
            .onUnload(function() {
                core.closeCommandBar();
            });


        postoDeEnfermagem.registerInteractiveObjects([
            new InteractiveObject("io-abrirGaveta", "Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function() {
                    if ( level.getFlag("pegou_bandeja").getValue() != true ) {
                        core.openDialog( 0 );
                    } else {
                        console.log("Action: abrirGaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        core.openModalScene("Gaveta");
                        core.openCommandBar();

                        core.setActionVisible("btn-fecharGaveta", true );

                        if ( level.getFlag("termometro").getValue() != true ) {
                            core.setInteractiveObjectVisible("io-termometro", true );
                        }
                        if ( level.getFlag("medidor-pressao").getValue() != true ) {
                            core.setInteractiveObjectVisible("io-medidorPressao", true );
                        }
                        if ( level.getFlag("oximetro").getValue() != true ) {
                            core.setInteractiveObjectVisible("io-oximetro", true );
                        }
                        if ( level.getFlag("relogio").getValue() != true ) {
                            core.setInteractiveObjectVisible("io-relogio", true );
                        }
                    }

                })
                .setVisibility( visibility ),

            // Bandeja
            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    console.log("Action: Pegar bandeja");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    level.getFlag("pegou_bandeja").setValue( true );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);

        postoDeEnfermagem.registerDialogs([
            // Dialog 0 - Não pegou bandeja
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarBandeja )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        postoDeEnfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    core.changeScene( 1 );
                })
                .setVisibility( visibility )
        ]);
        // endregion

        // region Fim do Level
        var fimTutorial = lib.scenes.finalDeFase.getClone()
            .onLoad(function() {
                core.setActionVisible("btn-proxima_fase", true );
            });

        fimTutorial.registerActions([
            new Action("btn-proxima_fase", "Ir a recepção")
                .setCssClass("action-ir_recepcao")
                .onClick(function() {
                    console.log("Proxima fase" + core );
                    core.changeLevelTo( 1 );
                })
                .setVisibility( visibility )
        ]);
        // endregion

        // endregion

        // region Modal Scenes

        // region Gaveta
        var gaveta = new Scene("Gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    console.log("Action: fecharGaveta");
                    // Som
                    Player.play( Player.audios.sfx.fecharGaveta );
                    core.closeModalScene("Gaveta");
                    if ( level.getFlag("termometro").getValue() == true &&
                        level.getFlag("oximetro").getValue() == true &&
                        level.getFlag("medidor-pressao").getValue() == true &&
                        level.getFlag("relogio").getValue() == true ) {

                        console.log("Btn ir corredor");
                        core.setActionVisible("btn-ir_corredor", true );
                        core.openCommandBar();
                    }
                })
                .setVisibility( visibility )
        ]);

        gaveta.registerInteractiveObjects([
            new InteractiveObject("io-termometro", "Termômetro")
                .setCssClass("intObj-thermometer")
                .onClick(function() {
                    console.log("Action: pegar_termometro");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.tutorial.pegarTermometro );
                    core.setInteractiveObjectVisible("io-termometro", false );
                    level.getFlag("termometro").setValue( true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-medidorPressao", "Medidor de pressão")
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function() {
                    console.log("O medidor de pressão foi ativado");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.tutorial.pegarAparelhoPressao );
                    core.setInteractiveObjectVisible("io-medidorPressao", false );
                    level.getFlag("medidor-pressao").setValue( true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-oximetro", "Oxímetro")
                .setCssClass("intObj-oximeter")
                .onClick(function() {
                    console.log("Action: pegar_oximetro");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.tutorial.pegarOximetro );
                    core.setInteractiveObjectVisible("io-oximetro", false );
                    level.getFlag("oximetro").setValue( true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-relogio", "Relógio")
                .setCssClass("intObj-watch")
                .onClick(function() {
                    console.log("Action: pegar_relogio");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.tutorial.pegarRelogio );
                    core.setInteractiveObjectVisible("io-relogio", false );
                    level.getFlag("relogio").setValue( true );
                })
                .setVisibility( visibility )
        ]);
        // endregion

        function checouTodosAparelhos() {
            return level.getFlag("mediuTemperatura").getValue() &&
                level.getFlag("mediuPressao").getValue() &&
                level.getFlag("mediuFreqRespiratoria").getValue() &&
                level.getFlag("mediuBatimentosESaturacao").getValue();
        }

        // region Prontuario
        var prontuario = new Scene("Prontuario", "modalScene-prontuario_joao");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                    // core.changeScene(5);
                }),

            new Action("btn-terminar_fase", "Conversar com Mentor")
                .setCssClass("action-abrir_dialogo")
                .onClick(function() {
                    console.log("Action: Finalizar fase");
                    if ( level.getFlag("lavar-maosDepois").getValue() == true ) {
                        if ( checouTodosAparelhos() ) {
                            if ( Prontuario.isDataValid() ) {
                                core.registerScoreItem( Scores.tutorial.anotarNoProntuario );
                                Prontuario.close();
                                core.closeCommandBar();
                                core.showEndOfLevel();
                                core.unlockLevel( 1 );
                            } else {
                                // In case form data is not valid
                                Prontuario.close();
                                core.closeCommandBar();
                                core.openDialog( 20 );
                            }
                        } else {
                            Prontuario.close();
                            core.closeCommandBar();
                            core.openDialog( 21 );
                        }
                    } else {
                        Prontuario.close();
                        core.closeCommandBar();
                        core.openDialog( 22 );
                    }

                })
        ]);

        // endregion

        // region Pulseira


        var pulseira = new Scene("pulseira", "pulseira");
        // .setCssClass("modalScene-pulseira");

        pulseira.registerInteractiveObjects([]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function() {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    if ( level.getFlag("visita-leito").getValue() == 0 ) {
                        core.setActionVisible("btn-ir_sala_leitos", true );
                    }
                    Pulseira.close();
                })
                .setVisibility( true )
        ]);

        // endregion
        // region termometro
        var termometro = new Scene("modalTermometro", "modalTermometro")
            .setCssClass("modalScene-termometro")
            .setTemplate("<span class='temp_termometro'>35.7º</span>");

        termometro.registerActions([
            new Action("btn-largar_termometro", "Fechar termômetro")
                .setCssClass("action-largar_termometro")
                .onClick(function() {
                    core.closeModalScene("modalTermometro");
                })
                .setVisibility( true )
        ]);
        // endregion

        // region medidor de pressao
        var medidorPressao = new Scene("modalMedidor_pressao", "modalMedidor_pressao")
            .setCssClass("modalScene-medidorPressao")
            .setTemplate("<span class='pressao'>160x100 mmHg</span>");

        medidorPressao.registerActions([
            new Action("btn-largar_medidor_pressao", "Fechar medidor de pressão")
                .setCssClass("action-largar_medidor_pressao")
                .onClick(function() {
                    core.closeModalScene("modalMedidor_pressao");
                })
                .setVisibility( true )
        ]);
        // endregion

        // region oximetro
        var oximetro = new Scene("modalOximetro", "Oxímetro")
            .setCssClass("modalScene-oximetro")
            .setTemplate(
                "<span class='oximetro-st-text'>97% Sat.O2</span>" + "<span class='oximetro-fc-text'>69 bpm</span>"
            );

        oximetro.registerActions([
            new Action("btn-largar_oximetro", "Fechar Oxímetro")
                .setCssClass("action-largar_oximetro")
                .onClick(function() {
                    core.closeModalScene("modalOximetro");
                })
                .setVisibility( true )
        ]);
        // endregion

        // region freqRespiratoria
        var freqRespiratoria = new Scene("freqRespiratoria", "Frequência Respiratória")
            .setCssClass("modalScene-freqRespiratoria");

        freqRespiratoria.registerActions([
            new Action("btn-largar_relogio", "Fechar Relógio")
                .setCssClass("action-largar_relogio")
                .onClick(function() {
                    FreqRespiratoria.close();
                    core.closeModalScene("freqRespiratoria");
                })
                .setVisibility( true )
        ]);

        // enfregion

        // endregion

        // region Level

        level.setSetupScript(function() {

            FreqRespiratoria.setFr( 17 );

            level.getFlag("conversar_recepcionista").setValue( false );
            level.getFlag("conversar_mentor").setValue( false );
            level.getFlag("passagem_corredor").setValue( 0 );
            level.getFlag("passagem_sala-de-leitos").setValue( 0 );
            level.getFlag("visita-leito").setValue( 0 );
            level.getFlag("pulseira").setValue( false );
            level.getFlag("lavar-maos").setValue( 0 );
            level.getFlag("lavar-maosDepois").setValue( false );
            level.getFlag("lavar-maosDepoisScore").setValue( false );
            level.getFlag("pegou_bandeja").setValue( false );
            level.getFlag("termometro").setValue( false );
            level.getFlag("medidor-pressao").setValue( false );
            level.getFlag("oximetro").setValue( false );
            level.getFlag("relogio").setValue( false );

            level.getFlag("mediuTemperatura").setValue( false );
            level.getFlag("mediuPressao").setValue( false );
            level.getFlag("mediuFreqRespiratoria").setValue( false );
            level.getFlag("mediuBatimentosESaturacao").setValue( false );

            Pulseira.setNameRegExp( /joão manoel ribeiro/ );
            Pulseira.setLeitoRegExp( /0*2/ );
            Pulseira.setDataRegExp( /07\/06\/1956/ );

            Prontuario.setNome("João Manoel Ribeiro");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("07/06/1956");
            Prontuario.setIdade("58 anos");
            Prontuario.setProfissao("Comerciante");
            Prontuario.setPai("Joaquim Ribeiro");
            Prontuario.setMae("Adelaide Moraes Ribeiro");

            Prontuario.setAlergiaMedicamentosa( true, "Dipirona");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("15/03/2015");
            Prontuario.setLeito("02 - Enfermaria Masculina");
            Prontuario.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)");
            Prontuario.setHipotese("Crise hipertensiva");
            Prontuario.setObservacoes("");

            Prontuario.setPeso("87");
            Prontuario.setAltura("1,62");
            Prontuario.setCircunferenciaAbdominal("115");

            Prontuario.setPrescMedicaRowData( 0, "", "Captopril", "Oral", "comp 75 mg", "2x dia", false, true );
            Prontuario.setPrescMedicaRowData( 1, "", "Ácido acetilsalicílico (AAS)", "Oral", "comp 100 mg", "1x dia", false, true );

            Prontuario.setSsvvRowData( 0, "", "", "", "", "", "", false );
            Prontuario.setSsvvRowRegExp( 0,
                new RegExp("15/03"),
                new RegExp("160x100"),
                new RegExp("69"),
                new RegExp("17"),
                new RegExp("97"),
                new RegExp("35.7")
            );
            // Disable 2 row
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

            Prontuario.setAnotacaoEnfermagemRowData("", "");

            Prontuario.setPrescEnfermagemState("vazio");
        });

        // region Register Scenes
        level.registerScene( recepcao );
        level.registerScene( corredor );
        level.registerScene( salaDeLeitos );
        level.registerScene( leito );
        level.registerScene( postoDeEnfermagem );
        level.registerScene( fimTutorial );

        // endregion

        // region Register Modal Scenes
        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );
        level.registerModalScene( freqRespiratoria );
        level.registerModalScene( gaveta );
        level.registerModalScene( termometro );
        level.registerModalScene( medidorPressao );
        level.registerModalScene( oximetro );
        // endregion

        // region Flags
        level.registerFlag( new Flag("conversar_recepcionista"), false );
        level.registerFlag( new Flag("conversar_mentor", false ) );
        level.registerFlag( new Flag("passagem_corredor", 0 ) );
        level.registerFlag( new Flag("passagem_sala-de-leitos", 0 ) );
        level.registerFlag( new Flag("visita-leito", 0 ) );
        level.registerFlag( new Flag("pulseira", false ) );
        level.registerFlag( new Flag("lavar-maos", 0 ) );
        level.registerFlag( new Flag("lavar-maosDepois", false ) );
        level.registerFlag( new Flag("lavar-maosDepoisScore", false ) );
        level.registerFlag( new Flag("pegou_bandeja", false ) );
        level.registerFlag( new Flag("termometro", false ) );
        level.registerFlag( new Flag("medidor-pressao", false ) );
        level.registerFlag( new Flag("oximetro", false ) );
        level.registerFlag( new Flag("relogio", false ) );

        level.registerFlag( new Flag("mediuTemperatura", false ) );
        level.registerFlag( new Flag("mediuPressao", false ) );
        level.registerFlag( new Flag("mediuFreqRespiratoria", false ) );
        level.registerFlag( new Flag("mediuBatimentosESaturacao", false ) );

        // endregion

        level.setInitialScene( 0 );
        // endregion

        game.registerLevel( level, 0 );

        console.groupEnd();
    });
