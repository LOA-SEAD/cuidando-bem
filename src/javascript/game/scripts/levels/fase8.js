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

        var Dialogs = require("DialogsData").fase8;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level8;
        var Player = require("Player");

        var level = new Level("Level 8");
        console.groupCollapsed( level.getName() );

        var recepcao,
            corredor,
            salaDeLeitos,
            leito,
            farmacia,
            postoDeEnfermagem,
            centrocirurgico,
            alaFeminina,
            centroCirurgicoYuri,
            pulseira,
            prontuario;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            core.changeScene( 1 );
        }

        function conversarRecepcionista() {
            console.log("Action: Nada");
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
            });

        recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista", "Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .onClick( conversarRecepcionista )
                .setVisibility( true ),

            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left no-glow")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right no-glow")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true )
        ]);


        function corredorIrAlaMasculina() {
            core.changeScene( 2 );
        }

        function corredorIrPostoEnfermagem() {
            if ( core.flag("score_pegou_medicamento") == false ) {
                if ( core.flag("score_ir_posto_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                    core.flag("score_ir_posto_hora_errada",  true );
                }
            }
            core.changeScene( 5 );
        }

        function corredorIrAlaFeminina() {
            if ( core.flag("score_ir_ala_feminina_hora_errada") == false ) {
                core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
                core.flag("score_ir_ala_feminina_hora_errada",  true );
            }
            core.changeScene( 7 );
        }

        function corredorIrFarmacia() {
            if ( core.flag("score_viu_prontuario") == false ) {
                if ( core.flag("score_ir_farmacia_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    core.flag("score_ir_farmacia_hora_errada",  true );
                }
            }
            core.changeScene( 4 );
        }

        function corredorIrCentroCirurgico() {
            if ( core.flag("levou_yuri_centro_cirurgico") == false ) {
                if ( core.flag("score_ir_centro_cirurgico_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );
                    core.flag("score_ir_centro_cirurgico_hora_errada",  true );
                }
                core.changeScene( 6 );
            } else {
                // Para liberar final da fase
                core.flag("entrou_centro_cirurgico",  true );
                core.changeScene( 8 );
            }
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

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos", "Ir para a Enfermaria Masculina")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),

            new InteractiveObject("io-ir_ala_feminina", "Ir para a Enfermaria Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true ),

            new InteractiveObject("io-ir_farmacia", "Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),

            new InteractiveObject("io-ir_centro_cirurgico", "Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico")
                .onClick( corredorIrCentroCirurgico )
                .setVisibility( true )

        ]);


        salaDeLeitos = new Scene("salaDeLeitos", "scene-salaDeLeitos")
            .setCssClass("scene-bedroom-level8")
            .onLoad(function() {
                console.log("Load scene: Ala Masculina");
                // Depois que já ocorreu o diálogo, o botão do prontuário fica liberado
                if ( core.flag("ja_falou_paciente") == true ) {
                    core.openCommandBar();
                }
                // Só vai abrir o diálogo na primeira vez
                if ( core.flag("ja_falou_paciente") == false ) {
                    core.flag("ja_falou_paciente",  true );
                    core.openDialog( 0 );
                }
                // Libera para ir ao leito após conversar com o farmacêutico
                if ( (core.flag("ja_falou_farmaceutico") == true) &&
                    (core.flag("levou_yuri_centro_cirurgico") == false) ) {
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setInteractiveObjectVisible("io-ir_leito", true );
                    core.openCommandBar();
                }
                if ( core.flag("levou_yuri_centro_cirurgico") == true ) {
                    core.setInteractiveObjectVisible("io-ir_leito", false );
                }
            })
            .onUnload(function() {
                console.log("Ala Masculina: OnUnload");
                core.closeCommandBar();
            });

        salaDeLeitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true ),

            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-irLeitoEsquerda")
                .onClick(function() {
                    if ( core.flag("score_lavar_maos_antes_leito") == false ) {
                        if ( core.flag("score_nao_lavar_maos_antes_leito") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesLeito );
                            core.flag("score_nao_lavar_maos_antes_leito",  true );
                        }
                    }
                    core.changeScene( 3 );
                })
                .setVisibility( false )
        ]);

        salaDeLeitos.registerActions([
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( core.flag("score_viu_prontuario") == false ) {
                        core.registerScoreItem( Scores.verProntuario );
                        core.flag("score_viu_prontuario",  true );
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: Lavar as mãos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_antes_leito") == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        core.flag("score_lavar_maos_antes_leito",  true );
                    }
                })
                .setVisibility( false )
        ]);

        salaDeLeitos.registerDialogs([
            // 0
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // 1
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.alaMasculina[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // 2
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),
            // 3
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.alaMasculina[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),
            // 4
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // 5
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.alaMasculina[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 6 );
                }),
            // 6
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaMasculina[ 6 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        leito = lib.scenes.leitos.yuri.getClone()
            .onLoad(function() {
                core.openCommandBar();
                console.log("Leito: Onload");
                // Verificações de se o botão de oferecer copo com água e o medicamento estarão ativados
                if ( (core.flag("score_pegou_agua") == true) &&
                    (core.flag("score_pegou_copo") == true) ) {
                    core.setActionVisible("btn-oferecer_copo", true );
                }
                if ( core.flag("score_pegou_medicamento") == true ) {
                    core.setActionVisible("btn-administrar_medicamento", true );
                }
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                // VAI MUDAR
                .setCssClass("intObj-paciente_09-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    if ( core.flag("score_verificar_pulseira") == false ) {
                        core.flag("score_verificar_pulseira",  true );
                        core.registerScoreItem( Scores.verificarPulseira );
                    }
                    core.openModalScene("pulseira");
                    Pulseira.open();
                })
                .setVisibility( true ),


              new InteractiveObject("io-conversar_paciente09", "Falar com o paciente")

                .setCssClass("intObjconversar_paciente")
                .onClick(function() {


               core.openDialog( 0 );
                    core.closeCommandBar();

                })
                .setVisibility( true )
        ]);

        leito.registerDialogs([
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.leitoPaciente[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 2 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        leito.registerActions([

          /*  new Action("btn-falarPaciente", "Conversar com Paciente")
                // Será outro
                .setCssClass("action-leito-char-02")
                .onClick(function() {
                    core.openDialog( 0 );
                    core.closeCommandBar();
                })
                .setVisibility( true ),*/

            new Action("btn-oferecer_copo", "Oferecer copo com água para o paciente")
                .setCssClass("action-copo_descartavel")
                .onClick(function() {
                    console.log("Action: Oferecer copo com água para o paciente");
                    if ( core.flag("score_ofereceu_copo") == false ) {
                        core.registerScoreItem( Scores.oferecerCopo );
                        core.flag("score_ofereceu_copo",  true );
                    }
                })
                .setVisibility( false ),

            new Action("btn-administrar_medicamento", "Administrar o medicamento")
                .setCssClass("action-midazolam_medicamento")
                .onClick(function() {
                    console.log("Action: Administrar o medicamento");
                    if ( core.flag("score_ofereceu_copo") == false ) {
                        if ( core.flag("score_nao_ofereceu_copo") == false ) {
                            core.registerScoreItem( Scores.naoOferecerCopo );
                            core.flag("score_nao_ofereceu_copo",  true );
                        }
                    }
                    if ( core.flag("score_administrou_medicamento") == false ) {
                        core.registerScoreItem( Scores.administrarMedicamento );
                        core.flag("score_administrou_medicamento",  true );
                    }
                })
                .setVisibility( false ),

            new Action("btn-anotarProntuario", "Anotar prontuario")
                .setCssClass("action-anotarProntuario")
                .onClick(function() {
                    console.log("Action: Anotar prontuario");
                    if ( core.flag("score_administrou_medicamento") == false ) {
                        if ( core.flag("score_nao_administrou_medicamento") == false ) {
                            core.registerScoreItem( Scores.naoAdministrarMedicamento );
                            core.flag("score_nao_administrou_medicamento",  true );
                        }
                    }
                    if ( core.flag("score_anotar_prontuario") == false ) {
                        core.registerScoreItem( Scores.anotarProntuario );
                        core.flag("score_anotar_prontuario",  true );
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true ),

            new Action("btn-levar_yuri_cc", "Levar paciente ao Centro Cirurgico")
                .setCssClass("action-paciente9")
                .onClick(function() {
                    console.log("Action: Levar paciente ao Centro Cirurgico");
                    // Som
                    Player.play( Player.audios.sfx.mesaComRodinha );
                    // Como o paciente vai se tornar indisponivel, tudo o que poderia ser feito com ele será descontado
                    if ( core.flag("score_verificar_pulseira") == false ) {
                        if ( core.flag("score_nao_verificar_pulseira") == false ) {
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                            core.flag("score_nao_verificar_pulseira",  true );
                        }
                    }
                    // Repete pois precisa descontar os pontos no medicamento também
                    if ( core.flag("score_ofereceu_copo") == false ) {
                        if ( core.flag("score_nao_ofereceu_copo") == false ) {
                            core.registerScoreItem( Scores.naoOferecerCopo );
                            core.flag("score_nao_ofereceu_copo",  true );
                        }
                    }
                    if ( core.flag("score_administrou_medicamento") == false ) {
                        if ( core.flag("score_nao_administrou_medicamento") == false ) {
                            core.registerScoreItem( Scores.naoAdministrarMedicamento );
                            core.flag("score_nao_administrou_medicamento",  true );
                        }
                    }
                    if ( core.flag("levou_yuri_centro_cirurgico") == false ) {
                        core.flag("levou_yuri_centro_cirurgico",  true );
                    }
                    // core.setActionVisible("btn-falarPaciente", false );
                    core.setActionVisible("btn-oferecer_copo", false );
                    core.setActionVisible("btn-administrar_medicamento", false );
                    core.setActionVisible("btn-levar_yuri_cc", false );
                })
                .setVisibility( true ),

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    console.log("Action: Voltar para a ala masculina");
                    if ( core.flag("score_anotar_prontuario") == false ) {
                        if ( core.flag("score_nao_anotar_prontuario") == false ) {
                            core.registerScoreItem( Scores.naoAnotarProntuario );
                            core.flag("score_nao_anotar_prontuario",  true );
                        }
                    }
                    core.changeScene( 2 );
                })
                .setVisibility( true )
        ]);


        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
            console.log("Ir para o corredor");
            // Só perde pontos caso já esteja liberado para pegar o medicamento
            if ( (core.flag("ja_falou_farmaceutico") == true) &&
                (core.flag("score_conferiu_medicacao") == false) ) {
                if ( core.flag("score_nao_conferiu_medicacao") == false ) {
                    core.registerScoreItem( Scores.naoConferirMedicacao );
                    core.flag("score_nao_conferiu_medicacao",  true );
                }
            }
            core.changeScene( 1 );
        }

        farmacia = new Scene("farmacia", "scene-pharmacy")
            .setCssClass("scene-pharmacy")
            .onLoad(function() {
                console.log("Load scene: Ala Masculina");
                // Depois que falou com o farmacêutico, é ativado os botões
                if ( core.flag("ja_falou_farmaceutico") == true ) {
                    core.setInteractiveObjectVisible("io-midazolam_medicamento", !(core.flag("score_pegou_medicamento")) );
                    core.setActionVisible("btn-conferir_midazolam", true );
                    core.openCommandBar();
                }
                // Apenas se ele já viu o prontuario que ele sabe o que vai pegar, mas só vai falar uma vez
                if ( (core.flag("score_viu_prontuario") == true) &&
                    (core.flag("ja_falou_farmaceutico") == false) ) {
                    core.flag("ja_falou_farmaceutico",  true );
                    core.openDialog( 0 );
                }
            })
            .onUnload(function() {
                console.log("Ala Masculina: OnUnload");
                core.closeCommandBar();
            });

        farmacia.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( farmaciaIrCorredor )
                .setVisibility( true )
        ]);

        farmacia.registerActions([
            new Action("btn-conferir_midazolam", "Conferir Medicamento")
                .setCssClass("action-midazolam_medicamento")
                .onClick(function() {
                    console.log("Action: Conferir Medicamento");
                    if ( core.flag("score_pegou_medicamento") == false ) {
                        if ( core.flag("score_nao_pegou_medicamento") == false ) {
                            core.registerScoreItem( Scores.naoPegarMedicamento );
                            core.flag("score_nao_pegou_medicamento",  true );
                        }
                    }
                    if ( core.flag("score_conferiu_medicacao") == false ) {
                        core.registerScoreItem( Scores.conferirMedicacao );
                        core.flag("score_conferiu_medicacao",  true );
                    }
                })
                .setVisibility( false )
        ]);

        // Acertar posicoes
        farmacia.registerInteractiveObjects([
            // Midazolam
            new InteractiveObject("io-midazolam_medicamento", "Pegar Medicamento")
                .setCssClass("intObj-midazolam_medicamento")
                .onClick(function() {
                    console.log("Action: Pegar Medicamento");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarMedicamento );
                    core.flag("score_pegou_medicamento",  true );
                    core.setInteractiveObjectVisible("io-midazolam_medicamento", false );
                })
                .setVisibility( false )
        ]);

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
                    // Ativando o midazolam e o seu botao para conferí-lo
                    core.setInteractiveObjectVisible("io-midazolam_medicamento", true );
                    core.setActionVisible("btn-conferir_midazolam", true );
                    core.openCommandBar();
                })
        ]);


        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                console.log("Load scene: Posto de enfermagem");
                core.openCommandBar();
                // Depois que pegou o medicamento, é ativado os botões
                if ( core.flag("score_pegou_medicamento") == true ) {
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setInteractiveObjectVisible("io-pegar_agua", !(core.flag("score_pegou_agua")) );
                    core.setInteractiveObjectVisible("io-pegar_copo", !(core.flag("score_pegou_copo")) );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", !(core.flag("pegou_bandeja")) );
                    core.openCommandBar();
                }
            })
            .onUnload(function() {
                console.log("Posto de enfermagem: OnUnload");
                core.closeCommandBar();
            });

        postoDeEnfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    // Verifica o que o jogador não pegou caso ele já possa pegar
                    if ( core.flag("score_pegou_medicamento") == true ) {
                        if ( core.flag("score_pegou_agua") == false ) {
                            if ( core.flag("score_nao_pegou_agua") == false ) {
                                core.registerScoreItem( Scores.naoPegarAguaPotavel );
                                core.flag("score_nao_pegou_agua",  true );
                            }
                        }
                        if ( core.flag("score_pegou_copo") == false ) {
                            if ( core.flag("score_nao_pegou_copo") == false ) {
                                core.registerScoreItem( Scores.naoPegarCopoDescartavel );
                                core.flag("score_nao_pegou_copo",  true );
                            }
                        }
                    }
                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        core.registerScoreItem( Scores.lavarMaosPostoEnfermagem );
                        core.flag("score_lavar_maos_posto_enfermagem",  true );
                    }
                })
                .setVisibility( false )
        ]);

        // Acertar posicoes
        postoDeEnfermagem.registerInteractiveObjects([
            // Agua
            new InteractiveObject("io-pegar_agua", "Pegar água potável")
                .setCssClass("intObj-garrafa_agua_potavel")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        if ( core.flag("score_nao_lavar_maos_posto_enfermagem") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosPostoEnfermagem );
                            core.flag("score_nao_lavar_maos_posto_enfermagem",  true );
                        }
                    }
                    if ( core.flag("pegou_bandeja") != true ) {
                        core.openDialog( 0 );
                    } else {
                        console.log("Action: Pegar água potável");
                        core.registerScoreItem( Scores.pegarAguaPotavel );
                        core.flag("score_pegou_agua",  true );
                        core.setInteractiveObjectVisible("io-pegar_agua", false );
                    }
                })
                .setVisibility( false ),

            // Copo
            new InteractiveObject("io-pegar_copo", "Pegar copo descartavel")
                .setCssClass("intObj-copo_descartavel")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        if ( core.flag("score_nao_lavar_maos_posto_enfermagem") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosPostoEnfermagem );
                            core.flag("score_nao_lavar_maos_posto_enfermagem",  true );
                        }
                    }
                    if ( core.flag("pegou_bandeja") != true ) {
                        core.openDialog( 0 );
                    } else {
                        console.log("Action: Pegar copo descartavel");
                        core.registerScoreItem( Scores.pegarCopoDescartavel );
                        core.flag("score_pegou_copo",  true );
                        core.setInteractiveObjectVisible("io-pegar_copo", false );
                    }
                })
                .setVisibility( false ),

            // Bandeja
            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    console.log("Action: Pegar bandeja");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        if ( core.flag("score_nao_lavar_maos_posto_enfermagem") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosPostoEnfermagem );
                            core.flag("score_nao_lavar_maos_posto_enfermagem",  true );
                        }
                    }
                    core.flag("pegou_bandeja",  true );
                    // core.flag("score_pegou_bandeja",  true );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( false )
        ]);

        postoDeEnfermagem.registerDialogs([
            // Dialog 0 - Não pegou bandeja
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarBandeja )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: Centro cirurgico");
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                core.openCommandBar();
            })
            .onUnload(function() {
                console.log("Centro cirurgico: OnUnload");
                core.closeCommandBar();
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


        alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function() {
                console.log("Load scene: Ala feminina");
            })
            .onUnload(function() {
                console.log("Ala feminina: OnUnload");
            });

        alaFeminina.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true )
        ]);


        centroCirurgicoYuri = lib.scenes.centroCirurgicoYuri.getClone()
            .onLoad(function() {
                console.log("Load scene: Centro cirurgico Yuri");
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                core.openCommandBar();
            })
            .onUnload(function() {
                console.log("Centro cirurgico: OnUnload");
                core.closeCommandBar();
            });

        centroCirurgicoYuri.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true ),

            new Action("btn-lavar_maos_cirurgia", "Lavar as mãos técnica cirúrgica")
                .setCssClass("action-lavar_maos_escova")
                .onClick(function() {
                    console.log("Action: Lavar as mãos técnica cirúrgica");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_tecnica_cirurgica") == false ) {
                        core.registerScoreItem( Scores.lavarMaosTecnicaCirurgica );
                        core.flag("score_lavar_maos_tecnica_cirurgica",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-falar_circulante", "Falar com circulante de sala")
                // Será outro
                .setCssClass("action-leito-char-02")
                .onClick(function() {
                    console.log("Action: Falar com circulante de sala");
                    if ( core.flag("score_lavar_maos_tecnica_cirurgica") == false ) {
                        if ( core.flag("score_nao_lavar_maos_tecnica_cirurgica") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosTecnicaCirurgica );
                            core.flag("score_nao_lavar_maos_tecnica_cirurgica",  true );
                        }
                    }
                    // Caso falar com o paciente dê pontos:
                    /*if(core.flag("score_falar_circulante") == false) {
                     core.registerScoreItem(Scores.conferirMedicacao);
                     core.flag("score_falar_circulante", true);
                     }*/
                    core.openDialog( 0 );
                    core.closeCommandBar();
                })
                .setVisibility( true ),

            new Action("btn-testar_equipamentos", "Testar Equipamentos")
                // Será outro
                .setCssClass("action-testar_equipamentos")
                .onClick(function() {
                    console.log("Action: Testar Equipamentos");
                    // Caso falar com o paciente dê pontos:
                    /*if(core.flag("score_ofereceu_copo") == false) {
                     if(core.flag("score_nao_ofereceu_copo") == false) {
                     core.registerScoreItem(Scores.naoOferecerCopo);
                     core.flag("score_nao_ofereceu_copo", true);
                     }
                     }*/
                    if ( core.flag("score_testou_equipamentos") == false ) {
                        core.registerScoreItem( Scores.testarEquipamentos );
                        core.flag("score_testou_equipamentos",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-fazer_lista", "Fazer lista de verificação")
                // Será outro
                .setCssClass("action-fazer_lista")
                .onClick(function() {
                    console.log("Action: Fazer lista de verificação");
                    if ( core.flag("score_testou_equipamentos") == false ) {
                        if ( core.flag("score_nao_testou_equipamentos") == false ) {
                            core.registerScoreItem( Scores.naoTestarEquipamentos );
                            core.flag("score_nao_testou_equipamentos",  true );
                        }
                    }
                    if ( core.flag("score_fez_lista_verificacao") == false ) {
                        core.registerScoreItem( Scores.fazerListaVerificacao );
                        core.flag("score_fez_lista_verificacao",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-mudar_posicao_paciente", "Mudar posição do paciente")
                // Será outro
                .setCssClass("action-mudar_posicao_paciente")
                .onClick(function() {
                    console.log("Action: Mudar posição do paciente");
                    if ( core.flag("score_fez_lista_verificacao") == false ) {
                        if ( core.flag("score_nao_fez_lista_verificacao") == false ) {
                            core.registerScoreItem( Scores.naoFazerListaVerificacao );
                            core.flag("score_nao_fez_lista_verificacao",  true );
                        }
                    }
                    if ( core.flag("score_mudou_posicao_paciente") == false ) {
                        core.registerScoreItem( Scores.mudarPosicaoPaciente );
                        core.flag("score_mudou_posicao_paciente",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-colocar_placa", "Colocar placa neutra")
                .setCssClass("action-placa_neutra")
                .onClick(function() {
                    console.log("Action: Colocar placa neutra");
                    if ( core.flag("score_mudou_posicao_paciente") == false ) {
                        if ( core.flag("score_nao_mudou_posicao_paciente") == false ) {
                            core.registerScoreItem( Scores.naoMudarPosicaoPaciente );
                            core.flag("score_nao_mudou_posicao_paciente",  true );
                        }
                    }
                    if ( core.flag("score_colocou_placa_neutra") == false ) {
                        core.registerScoreItem( Scores.colocarPlacaNeutra );
                        core.flag("score_colocou_placa_neutra",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: Lavar as mãos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_colocou_placa_neutra") == false ) {
                        if ( core.flag("score_nao_colocou_placa_neutra") == false ) {
                            core.registerScoreItem( Scores.naoColocarPlacaNeutra );
                            core.flag("score_nao_colocou_placa_neutra",  true );
                        }
                    }
                    if ( core.flag("score_lavar_maos_centro_cirurgico") == false ) {
                        core.registerScoreItem( Scores.lavarMaosCentroCirurgico );
                        core.flag("score_lavar_maos_centro_cirurgico",  true );
                    }
                })
                .setVisibility( true ),

            new Action("btn-anotarProntuario", "Anotar prontuario")
                .setCssClass("action-anotarProntuario")
                .onClick(function() {
                    console.log("Action: Anotar prontuario");
                    if ( core.flag("score_lavar_maos_centro_cirurgico") == false ) {
                        if ( core.flag("score_nao_lavar_maos_centro_cirurgico") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosCentroCirurgico );
                            core.flag("score_nao_lavar_maos_centro_cirurgico",  true );
                        }
                    }
                    if ( core.flag("score_anotar_prontuario_centro_cirurgico") == false ) {
                        core.registerScoreItem( Scores.anotarProntuarioCentroCirurgico );
                        core.flag("score_anotar_prontuario_centro_cirurgico",  true );
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);

        centroCirurgicoYuri.registerDialogs([
            // 0
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.centroCirurgico[ 0 ], function() {
                    core.openDialog( 1 );
                })
                .registerOption( Dialogs.centroCirurgico[ 1 ], function() {
                    core.openDialog( 2 );
                })
                .setRandomize( true ),
            // 1 - Mentor corrige resposta 1
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.centroCirurgico[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 0 );
                }),
            // 2
            new Dialog( lib.characters.circulante )
                .setText( Dialogs.centroCirurgico[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),
            // 3
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 4 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),
            // 4
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 5 ] )
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // 5
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 6 );
                }),
            // 6
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 7 ] )
                .registerOption("", function() {
                    core.openDialog( 7 );
                }),
            // 7
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 8 );
                }),
            // 8
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 9 ] )
                .registerOption("", function() {
                    core.openDialog( 9 );
                }),
            // 9
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 10 ] )
                .registerOption("", function() {
                    core.openDialog( 10 );
                }),
            // 10
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 11 ] )
                .registerOption("", function() {
                    core.openDialog( 11 );
                }),
            // 11
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 12 ] )
                .registerOption("", function() {
                    core.openDialog( 12 );
                }),
            // 12
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 13 ] )
                .registerOption("", function() {
                    core.openDialog( 13 );
                }),
            // 13
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 14 ] )
                .registerOption("", function() {
                    core.openDialog( 14 );
                }),
            // 14
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 15 ] )
                .registerOption("", function() {
                    core.openDialog( 15 );
                }),
            // 15
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 16 ] )
                .registerOption("", function() {
                    core.openDialog( 16 );
                }),
            // 16
            new Dialog( lib.characters.pacientes.yuri )
                .setText( Dialogs.centroCirurgico[ 17 ] )
                .registerOption("", function() {
                    core.openDialog( 17 );
                }),
            // 17
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.centroCirurgico[ 18 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                })
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


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            // TODO Verificar se prontuario está preenchido
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    // Já estava no momento de realizar os procedimentos, portanto pode terminar a fase
                    if ( core.flag("entrou_centro_cirurgico") == true ) {
                        // core.unlockLevel(6);
                        core.closeCommandBar();
                        core.showEndOfLevel();
                    } else {
                        core.closeModalScene("Prontuario");
                    }
                })
                .setVisibility( true )

            //  alert(Prontuario.isDataValid() + " Final da fase");
        ]);


        // 0
        level.registerScene( recepcao );
        // 1
        level.registerScene( corredor );
        // 2
        level.registerScene( salaDeLeitos );
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
        // 8
        level.registerScene( centroCirurgicoYuri );


        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );


        level.setSetupScript(function() {

            // Script that runs once when the level is loaded or reloaded
            Pulseira.setNameRegExp( /Yuri de Souza Almeida/ );
            Pulseira.setLeitoRegExp( /0*1/ );
            Pulseira.setDataRegExp( /16\/03\/1993/ );

            Pulseira.setName("Yuri de Souza Almeida");
            Pulseira.setLeito("01");
            Pulseira.setData("16/03/1993");
            Pulseira.disable();

            Prontuario.setNome("Yuri de Souza Almeida");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("16/03/1993");
            Prontuario.setIdade("22 anos");
            Prontuario.setProfissao("Estudante");

            Prontuario.setPai("Miguel Augusto Briganti Almeida");
            Prontuario.setMae("Mariana Soares Almeida");

            Prontuario.setAlergiaMedicamentosa( true, "Dipirona, sulfa.");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("27/09/2015");
            Prontuario.setLeito("01 - Enfermaria masculina");
            Prontuario.setAntecedentes("");
            Prontuario.setHipotese("Cirurgia de reconstrução do ligamento cruzado anterior (LCA), no MMII direito.");
            Prontuario.setObservacoes("Acidente automobilístico.");

            Prontuario.setPeso("73");
            Prontuario.setAltura("1,80");
            Prontuario.setCircunferenciaAbdominal("90");

            Prontuario.setPrescMedicaRowData( 0, "", "Midazolam", "Oral", "15 mg", "01x/dia antes do procedimento cirúrgico", false, true );
            // Necessário para evitar que valores antigos apareçam no prontuário
            Prontuario.setPrescMedicaRowData( 1, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
            Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

            Prontuario.clearPrescEnfermagemState( );
            Prontuario.setPrescEnfermagemState("encaminhar_paciente_cc");
            // Caso não for possível escolher o local onde está a placa neutra terá que fazer um desse para cada fase que usa
            Prontuario.setPrescEnfermagemState("check_list_cirurgia");
            Prontuario.setPrescEnfermagemState("placa_neutra");

            Prontuario.setSsvvRowData( 0, "", "120x70", "72", "16", "96", "35,5", true );
            // Disable 2 row
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

            Prontuario.setAnotacaoEnfermagemRowData("", "");
        });


        level.registerFlag( new Flag( "ja_falou_farmaceutico",  false  ) );
        level.registerFlag( new Flag( "pegou_bandeja",  false  ) );
        level.registerFlag( new Flag( "ja_falou_paciente",  false  ) );
        level.registerFlag( new Flag( "ja_falou_paciente_leito",  false  ) );
        level.registerFlag( new Flag( "levou_yuri_centro_cirurgico",  false  ) );
        level.registerFlag( new Flag( "entrou_centro_cirurgico",  false  ) );
        level.registerFlag( new Flag( "score_ir_posto_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_farmacia_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_ala_feminina_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_centro_cirurgico_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_viu_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_nao_viu_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_pegou_medicamento",  false  ) );
        level.registerFlag( new Flag( "score_nao_pegou_medicamento",  false  ) );
        level.registerFlag( new Flag( "score_conferiu_medicacao",  false  ) );
        level.registerFlag( new Flag( "score_nao_conferiu_medicacao",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_posto_enfermagem",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavar_maos_posto_enfermagem",  false  ) );
        level.registerFlag( new Flag( "score_pegou_agua",  false  ) );
        level.registerFlag( new Flag( "score_nao_pegou_agua",  false  ) );
        level.registerFlag( new Flag( "score_pegou_copo",  false  ) );
        level.registerFlag( new Flag( "score_nao_pegou_copo",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_antes_leito",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavar_maos_antes_leito",  false  ) );
        // level.registerFlag(new Flag( "score_falar_paciente",  false ) );
        // level.registerFlag(new Flag( "score_nao_falar_paciente",  false ) );
        level.registerFlag( new Flag( "score_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_nao_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_ofereceu_copo",  false  ) );
        level.registerFlag( new Flag( "score_nao_ofereceu_copo",  false  ) );
        level.registerFlag( new Flag( "score_administrou_medicamento",  false  ) );
        level.registerFlag( new Flag( "score_nao_administrou_medicamento",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_nao_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_tecnica_cirurgica",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavar_maos_tecnica_cirurgica",  false  ) );
        // level.registerFlag(new Flag( "score_falar_circulante",  false ) );
        // level.registerFlag(new Flag( "score_nao_falar_circulante",  false ) );
        level.registerFlag( new Flag( "score_testou_equipamentos",  false  ) );
        level.registerFlag( new Flag( "score_nao_testou_equipamentos",  false  ) );
        level.registerFlag( new Flag( "score_fez_lista_verificacao",  false  ) );
        level.registerFlag( new Flag( "score_nao_fez_lista_verificacao",  false  ) );
        level.registerFlag( new Flag( "score_mudou_posicao_paciente",  false  ) );
        level.registerFlag( new Flag( "score_nao_mudou_posicao_paciente",  false  ) );
        level.registerFlag( new Flag( "score_colocou_placa_neutra",  false  ) );
        level.registerFlag( new Flag( "score_nao_colocou_placa_neutra",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_centro_cirurgico",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavar_maos_centro_cirurgico",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario_centro_cirurgico",  false  ) );


        level.setInitialScene( 0 );

        game.registerLevel( level, 8 );

        console.groupEnd();

    });
