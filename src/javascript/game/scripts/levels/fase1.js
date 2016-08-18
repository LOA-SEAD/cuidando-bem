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

        var Dialogs = require("DialogsData").fase1;
        var Alertas = require("DialogsData").alertas;
        var Player = require("Player");
        Scores = Scores.fase1;

        var level = new Level("Level 1 - Tutorial");
        level.setMaxPoints( Scores._sum );
        console.groupCollapsed( level.getName() );

        // if false it wont check for flags -- tests purpose
        var flagsOn = true;
        var visibility = false;
        if ( !flagsOn ) {
            visibility = true;
        }

        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            // wont check for flags
            if ( !flagsOn ) {
                core.closeDialog( 0 );
                core.closeDialog( 1 );
                core.changeScene( 1 );
                console.log("Ir ao corredor");
            } else {
                if ( core.flag("conversar_recepcionista")) {
                    core.closeDialog( 0 );
                    core.closeDialog( 1 );
                    core.changeScene( 1 );
                    console.log("Ir ao corredor");
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

                if( !core.flag("conversar_recepcionista")) {
                    core.flag("conversar_recepcionista", true);
                    core.openDialog( 0 );

                }
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.recepcionistaUnknow )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.flag("conversar_recepcionista",  true );
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

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-porta")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true )
        ]);

        function corredorIrSalaLeitos() {
            if ( !flagsOn ) {
                console.log("Action: corredorIrSalaLeitos");
            } else {
                if ( core.flag("conversar_mentor")) {
                    console.log("Action: corredorIrSalaLeitos");
                    core.changeScene( 2 );
                } else {
                    console.log("Necessita ação: falar com mentor");
                }
            }
        }

        var corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {

                core.openCommandBar();
                core.setActionVisible("btn-ir_recepcao", true);

                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInLoop( Player.audios.loops.recepcao );
                switch ( core.flag("passagem_corredor") ) {
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
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInRange( Player.audios.musics.inGame );
                switch ( core.flag("passagem_corredor") ) {
                    case 0:
                        core.flag("passagem_corredor",  1 );
                        break;
                    case 1:
                        core.flag("passagem_corredor",  2 );
                        break;
                    case 2:
                        core.flag("passagem_corredor",  3 );
                        break;
                }
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
            // Dialog 0
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 0 ] )
                .registerOption("", function() {
                    core.flag("conversar_mentor",  true );
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.jogador )
                .setText("")
                // resposta correta
                .registerOption( Dialogs.corredor[ 1 ], function() {
                    core.flag("conversar_mentor",  true );
                    core.openDialog( 4 );
                })
                // dialog 2
                .registerOption( Dialogs.corredor[ 2 ], function() {
                    core.flag("conversar_mentor",  true );
                    core.openDialog( 2 );
                })
                .registerOption( Dialogs.corredor[ 4 ], function() {
                    core.flag("conversar_mentor",  true );
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
            new InteractiveObject("io-ir_sala_leitos", "Ir à Enfermaria Masculina")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrSalaLeitos )
                .setVisibility( visibility ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir ao Posto de Enfermagem")
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

        var salaDeLeitos = new Scene("salaDeLeitos", "scene-salaDeLeitos")
            .setCssClass("scene-bedroom-level0")
            .onLoad(function() {
                switch ( core.flag("passagem_sala-de-leitos") ) {
                    case 0:
                        core.setInteractiveObjectVisible("io-ir_leito", true );
                        core.setInteractiveObjectVisible("io-ir_corredor", false );
                        break;
                    case 1:
                        core.setInteractiveObjectVisible("io-ir_leito", false );
                        core.setInteractiveObjectVisible("io-ir_corredor", true );
                        break;
                    // Não sei o motivo, mas ele não volta o valor desta flag para 0, por isso que foi necessário a duplicação do código
                    case 2:
                        core.setInteractiveObjectVisible("io-ir_leito", true );
                        core.setInteractiveObjectVisible("io-ir_corredor", false );
                        break;
                }
            })
            .onUnload(function() {
                switch ( core.flag("passagem_sala-de-leitos") ) {
                    case 0:
                        core.flag("passagem_sala-de-leitos",  1 );
                        break;
                    // Não sei o motivo, mas ele não volta o valor desta flag para 0, por isso que foi necessário a duplicação do código
                    case 1:
                        core.flag("passagem_sala-de-leitos",  2 );
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

        var leito = lib.scenes.leitos.joao.getClone()
            .onLoad(function() {
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true );

                // force case 1
                // core.flag("visita-leito", 1);
                // delete here

                switch ( core.flag("visita-leito") ) {
                    case 0:
                        core.openDialog( 0 );
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_sala_leitos", false );
                        // core.openDialog( 11 );
                        core.setActionVisible("btn-lavarMaos", true );
                        core.setInteractiveObjectVisible("io-conversar_paciente", false );
                        core.flag("termometro",  false );
                        core.flag("medidor-pressao",  false );
                        core.flag("oximetro",  false );
                        core.flag("relogio",  false );
                        core.openCommandBar();
                        break;
                }
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
                core.flag("visita-leito",  1 );
                core.closeCommandBar();
            });

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
                    // Player.play( Player.audios.sfx.missaoCumprida );
                }),
            // Dialog 16
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leito.conversa2[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog( 16 );
                    // Já que a pulseira está correta, desabilita o acesso ao paciente
                    core.setInteractiveObjectVisible("io-conversar_paciente", false );
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
                .setText("Você deve lavar as mãos após aferir os sinais vitais do paciente.")
                .registerOption("", function() {
                    core.closeDialog();
                    // Prontuario.open();
                    core.openCommandBar();
                })
        ]);

        leito.registerInteractiveObjects([

            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_01-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                    if ( !core.flag("pulseira")) {
                        // core.setInteractiveObjectVisible("io-pulseira_paciente", true );
                    }

                    if ( !core.flag("score_checar_pulseira")){
                        core.flag("score_checar_pulseira", true);
                        core.registerScoreItem( Scores.identificarPaciente );
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
                    core.changeScene( 2 );
                })
                .setVisibility( visibility ),


            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );

                    // TODO Clean this mess PLEASE
                    switch ( core.flag("lavar-maos") ) {
                        case 0:
                            core.flag("lavar-maos",  1 );
                            core.registerScoreItem( Scores.lavarMaosAntes );
                            core.setActionVisible("btn-frequencia_respiratoria", true );
                            core.setActionVisible("btn-medir_pulso", true );
                            core.setActionVisible("btn-medir_temperatura", true );
                            core.setActionVisible("btn-saturacao_02", true );
                            core.setActionVisible("btn-ler_prontuario", true );
                            // core.setActionVisible("btn-lavarMaos", false);
                            break;
                        case 2:
                            // core.flag("lavar-maos", 3);
                            // core.registerScoreItem(Scores.lavarMaosDepois);
                            // core.setActionVisible("btn-lavarMaos", false);
                            // core.setActionVisible("btn-ler_prontuario", true);
                            break;
                    }

                    core.flag("lavar-maosDepois",  true );
                })
                .setVisibility( visibility ),

            new Action("btn-medir_pulso", "Ver pressão")
                .setCssClass("action-medir_pulso")
                .onClick(function() {
                    console.log("Action: medir_pulso");
                    // Bip
                    Player.play( Player.audios.sfx.bombinha );
                    if ( core.flag("lavar-maos") >= 1 ) {

                        // core.setActionVisible("btn-medir_pulso", false);
                        core.openModalScene("modalMedidor_pressao");
                        core.flag("medidor-pressao",  true );

                        if ( !core.flag("mediuPressao")) {
                            core.flag("mediuPressao",  true );
                            core.registerScoreItem( Scores.verPressao );
                        }

                        core.flag("lavar-maosDepois",  false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-saturacao_02", "Ver saturação de O2")
                .setCssClass("action-medir_saturacao_02")
                .onClick(function() {
                    // core.setActionVisible("btn-saturacao_02", false);
                    console.log("Action: medir_saturacao_02");
                    // Bip
                    Player.play( Player.audios.sfx.bipOximetro );

                    if ( core.flag("lavar-maos") >= 1 ) {

                        core.openModalScene("modalOximetro");
                        core.flag("oximetro",  true );

                        if ( !core.flag("mediuBatimentosESaturacao")) {
                            core.flag("mediuBatimentosESaturacao",  true );
                            core.registerScoreItem( Scores.verSaturacao );
                        }

                        core.flag("lavar-maosDepois",  false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-frequencia_respiratoria", "Ver frequência respiratória")
                .setCssClass("action-medir_freq_respiratoria")
                .onClick(function() {
                    console.log("Action: medir_freq_respiratoria");
                    // Tic-Tac relógio
                    Player.play( Player.audios.sfx.ticTac );
                    if ( core.flag("lavar-maos") >= 1 ) {

                        // core.setActionVisible("btn-frequencia_respiratoria", false);
                        core.flag("relogio",  true );

                        if ( !core.flag("mediuFreqRespiratoria")) {
                            core.flag("mediuFreqRespiratoria",  true );
                            core.registerScoreItem( Scores.verFrequenciaRespiratoria );
                        }

                        core.flag("lavar-maosDepois",  false );

                        FreqRespiratoria.open();
                        core.openModalScene("freqRespiratoria");
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-medir_temperatura", "Ver temperatura")
                .setCssClass("action-medir_temperatura")
                .onClick(function() {
                    console.log("Action: medir_temperatura");
                    // Bip
                    Player.play( Player.audios.sfx.bipTermometro );
                    if ( core.flag("lavar-maos") >= 1 ) {

                        // core.setActionVisible("btn-medir_temperatura", false);
                        core.openModalScene("modalTermometro");
                        core.flag("termometro",  true );

                        if ( !core.flag("mediuTemperatura")) {
                            core.flag("mediuTemperatura",  true );
                            core.registerScoreItem( Scores.verTemperatura );
                        }

                        core.flag("lavar-maosDepois",  false );
                    }
                })
                .setVisibility( visibility ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( core.flag("lavar-maosDepois")) {
                        if ( checouTodosAparelhos() ) {
                            if ( !core.flag("lavar-maosDepoisScore") ) {
                                core.registerScoreItem( Scores.lavarMaosDepois );
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
                    if ( !core.flag("pegou_bandeja")) {
                        core.openDialog( 0 );
                    } else {
                        console.log("Action: abrirGaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        core.openModalScene("Gaveta");
                        core.openCommandBar();

                        core.setActionVisible("btn-fecharGaveta", true );

                        if ( !core.flag("termometro")) {
                            core.setInteractiveObjectVisible("io-termometro", true );
                        }
                        if ( !core.flag("medidor-pressao")) {
                            core.setInteractiveObjectVisible("io-medidorPressao", true );
                        }
                        if ( !core.flag("oximetro")) {
                            core.setInteractiveObjectVisible("io-oximetro", true );
                        }
                        if ( !core.flag("relogio")) {
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
                    core.flag("pegou_bandeja",  true );
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
                    if ( core.flag("termometro") &&
                        core.flag("oximetro") &&
                        core.flag("medidor-pressao") &&
                        core.flag("relogio") ) {

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
                    core.registerScoreItem( Scores.pegarTermometro );
                    core.setInteractiveObjectVisible("io-termometro", false );
                    core.flag("termometro",  true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-medidorPressao", "Medidor de pressão")
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function() {
                    console.log("O medidor de pressão foi ativado");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarAparelhoPressao );
                    core.setInteractiveObjectVisible("io-medidorPressao", false );
                    core.flag("medidor-pressao",  true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-oximetro", "Oxímetro")
                .setCssClass("intObj-oximeter")
                .onClick(function() {
                    console.log("Action: pegar_oximetro");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarOximetro );
                    core.setInteractiveObjectVisible("io-oximetro", false );
                    core.flag("oximetro",  true );
                })
                .setVisibility( visibility ),

            new InteractiveObject("io-relogio", "Relógio")
                .setCssClass("intObj-watch")
                .onClick(function() {
                    console.log("Action: pegar_relogio");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarRelogio );
                    core.setInteractiveObjectVisible("io-relogio", false );
                    core.flag("relogio",  true );
                })
                .setVisibility( visibility )
        ]);

        function checouTodosAparelhos() {
            return core.flag("mediuTemperatura") &&
                core.flag("mediuPressao") &&
                core.flag("mediuFreqRespiratoria") &&
                core.flag("mediuBatimentosESaturacao");
        }

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
                    if ( core.flag("lavar-maosDepois")) {
                        if ( checouTodosAparelhos() ) {
                            if ( Prontuario.isDataValid() ) {
                                core.registerScoreItem( Scores.anotarNoProntuario );
                                Prontuario.close();
                                core.closeCommandBar();
                                core.showEndOfLevel();
                                core.unlockLevel( 2 );
                                Player.stopAll();
                                Player.play( Player.audios.sfx.missaoCumprida );
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

        var pulseira = new Scene("pulseira", "pulseira");
        // .setCssClass("modalScene-pulseira");

        pulseira.registerInteractiveObjects([]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function() {
                    console.log("Ação: Fechar modal pulseira");
                    // Como o jogador pode não ter visto os dados do paciente, é fechada a modal scene da pulseira
                    core.closeModalScene("Pulseira");
                    Pulseira.close();
                    if ( Pulseira.isAllDataValid() ) {
                        console.log("Action: action-ir_sala_de_leitos");
                        if ( core.flag("visita-leito") == 0 ) {
                            core.setActionVisible("btn-ir_sala_leitos", true );
                        }
                        Pulseira.disable();
                        // Para conversar com o paciente e registrar a pontuação apenas uma vez
                        if ( core.flag("conversouPacienteSegundaVez") == false ) {
                            core.flag("conversouPacienteSegundaVez",  true );
                            //core.registerScoreItem( Scores.identificarPaciente );
                            core.openDialog( 11 );
                        }
                    } else {
                        core.closeCommandBar();
                        core.openDialog( 17 );
                        console.log("Alguns dados da pulseira estão incorretos");
                    }
                })
                .setVisibility( true )
        ]);

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

        var freqRespiratoria = new Scene("freqRespiratoria", "Frequência Respiratória")
            .setCssClass("modalScene-freqRespiratoria");

        freqRespiratoria.registerActions([
            new Action("btn-largar_relogio", "Fechar Relógio")
                .setCssClass("action-largar_relogio")
                .onClick(function() {
                    FreqRespiratoria.close();
                    core.closeModalScene("freqRespiratoria");
                    Player.stop();
                })
                .setVisibility( true )
        ]);

        level.setSetupScript(function() {

            FreqRespiratoria.setFr( 17 );

            Pulseira.setNameRegExp( /^jo(ã|a)o manoel ribeiro$/i );
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
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

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

            Prontuario.setPrescEnfermagemState([ "decubito_visual" ]);
        });

        level.registerScene( recepcao );
        level.registerScene( corredor );
        level.registerScene( salaDeLeitos );
        level.registerScene( leito );
        level.registerScene( postoDeEnfermagem );
        level.registerScene( fimTutorial );

        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );
        level.registerModalScene( freqRespiratoria );
        level.registerModalScene( gaveta );
        level.registerModalScene( termometro );
        level.registerModalScene( medidorPressao );
        level.registerModalScene( oximetro );

        level.registerFlag( new Flag("conversar_recepcionista", false ) );
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
        level.registerFlag( new Flag("conversouPacienteSegundaVez", false ) );
        level.registerFlag( new Flag("score_checar_pulseira", false ) );
        level.registerFlag( new Flag("mediuTemperatura", false ) );
        level.registerFlag( new Flag("mediuPressao", false ) );
        level.registerFlag( new Flag("mediuFreqRespiratoria", false ) );
        level.registerFlag( new Flag("mediuBatimentosESaturacao", false ) );

        level.setInitialScene( 0 );

        game.registerLevel( level, 1 );

        console.groupEnd();
    });
