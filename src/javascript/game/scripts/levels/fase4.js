define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").fase4;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").level4;
        var Player = require("Player");
        // endregion

        var level = new Level("Level Fase4");
        console.groupCollapsed( level.getName() );

        // region Scenes
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

        // region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            core.closeDialog();
            core.changeScene( 1 );
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
                    level.getFlag("pegarFolheto9Certos").setValue( true );
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
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),

            new InteractiveObject("io-pegar_folheto_dos_9_certos", "Pegar Folheto dos 9 Certos")
                .setCssClass("intObj-9Certos")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.setInteractiveObjectVisible("io-pegar_folheto_dos_9_certos", false );
                    level.getFlag("pegarFolheto9Certos").setValue( true );
                })
                .setVisibility( true )
        ]);
        // endregion

        // region Corredor
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });

        function corredorIrSalaLeitos() {
            console.log("Vá para sala de leitos");
            core.changeScene( 2 );
        }

        function corredorIrPostoEnfermagem() {
            console.log("Vá para o posto de enfermagem");
            if ( level.getFlag("score_conferiu_medicacao").getValue() == true ) {
                core.changeScene( 5 );
            }
            else{
                core.openDialog( 0 );
                if ( level.getFlag("score_ir_posto_enfermagem_hora_errada").getValue() == false ) {
                    core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                    level.getFlag("score_ir_posto_enfermagem_hora_errada").setValue( true );
                }
            }
        }

        function corredorIrFarmacia() {
            console.log("Vá para a farmácia");
            if ( level.getFlag("pegarPrescricaoMedica").getValue() == true ) {
                core.changeScene( 4 );
            }
            else{
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

        // endregion

        // region Sala de Leitos
        alaMasculina = new Scene("alaMasculina", "scene-alaMasculina")

            .setCssClass("scene-bedroom")
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
                level.getFlag("lavarMaosSalaLeitos").setValue( false );
            });

        alaMasculina.registerActions([

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    //Som
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
                    //level.getFlag("falarComPaciente").setValue( true );
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
                .setText( Alertas.esqueceu.verProntuario[0] )
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
                        //Marcar pontos
                        /*if ( level.getFlag("score_ir_posto_enfermagem_hora_errada").getValue() == false ) {
                            core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                            level.getFlag("score_ir_posto_enfermagem_hora_errada").setValue( true );
                        }*/
                    }
                    else{
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( false ),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    if ( level.getFlag("pegarPrescricaoMedica").getValue() == false ) {
                        core.openDialog( 5 );
                    } else {
                        core.changeScene( 1 );
                    }

                })
                .setVisibility( true ),

            new InteractiveObject("io-ler_prontuario", "Ler prontuário")
                .setCssClass("intObj-prontuario-leito1-fase4")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");

                    if ( level.getFlag("lavarMaosSalaLeitos").getValue() == true ) {
                        core.registerScoreItem( Scores.lavarMaos );
                    } else {
                        core.registerScoreItem( Scores.notLavarMaos );
                    }

                })
                .setVisibility( true )

        ]);
        // endregion

        // region Leito
        leito = lib.scenes.leitos.pedro.getClone()
            .onLoad(function() {
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true );
                core.setActionVisible("btn-ir_sala_leitos", true );
                core.openDialog( 0 );
                //}

            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
            });

        // region Leito - Dialogs
        leito.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText(Dialogs.leitoPaciente[ 0 ])
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
                .setText( Dialogs.leitoPaciente[ 6 ])
                .registerOption("", function() {
                    core.openDialog( 5 );
                }),
            // Dialog 5
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 7 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // Dialog 6
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 8 ])
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            // Dialog 7
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 9 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                })

        ]);
        // endregion

        // region Leito - interactiveObjects and Actions
        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_01-checar_pulseira")
                .onClick(function() {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("Pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                })
                .setVisibility( true )
        ]);

        leito.registerActions([

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function() {
                    if ( level.getFlag("checarPulseira").getValue() == false ) {
                        level.getFlag("lavarMaosLeito").setValue( true );
                        core.registerScoreItem( Scores.checarPulseira );
                    } else {
                        core.registerScoreItem( Scores.notChecarPulseira );
                    }
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene( 2 );
                    Pulseira.disable();
                })
                .setVisibility( true ),

            new Action("btn-administrarMedicamento", "Administrar medicamento")
                // Não existe a imagem correta
                .setCssClass("action-administrarMedicamento")
                .onClick(function() {
                    //Marcar pontos
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    //Tirar pontos se não verificou pulseira
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    console.log("Action: Administrar medicamento");
                })
                .setVisibility( true ),

            new Action("btn-realizarGotejamento", "Realizar gotejamento de soro no equipo")
            // Não existe a imagem correta
                .setCssClass("action-realizarGotejamento")
                .onClick(function() {
                    //Marcar pontos
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    //Tirar pontos se não administrou medicamento
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    console.log("Action: Realizar gotejamento de soro no equipo");
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( level.getFlag("score_lavar_maos").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaos );
                        level.getFlag("score_lavar_maos").setValue( true );
                    }
                    //Tirar pontos se não administrou medicamento
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    console.log("Action: Lavar as mãos");
                })
                .setVisibility( true ),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                    //Marcar pontos
                    /*if ( level.getFlag("score_lavar_maos_antes_leito").getValue() == false ) {
                        core.registerScoreItem( Scores.lavarMaosAntesLeito );
                        level.getFlag("score_lavar_maos_antes_leito").setValue( true );
                    }*/
                    if ( level.getFlag("lavarMaosLeito").getValue() == false ) {
                        core.registerScoreItem( Scores.notLavarMaos );
                    }

                })
                .setVisibility( true )
        ]);
        // endregion

        // region Farmácia

        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
            console.log("Ir para o corredor");
            // Só perde pontos caso já esteja liberado para pegar o medicamento
            if (level.getFlag("score_conferiu_medicacao").getValue() == false) {
                if ( level.getFlag("score_nao_conferiu_medicacao").getValue() == false ) {
                    //core.registerScoreItem( Scores.naoConferirMedicacao );
                    level.getFlag("score_nao_conferiu_medicacao").setValue( true );
                }
                core.openDialog( 4 );
            }
            else{
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
                if ( (level.getFlag("pegarPrescricaoMedica").getValue() == true) &&
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
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar Medicamento");
                    //core.registerScoreItem( Scores.pegarMedicamento );
                    level.getFlag("score_pegou_medicamento").setValue( true );
                    core.setInteractiveObjectVisible("io-keflin_medicamento", false );
                })
                .setVisibility( false )
        ]);

        farmacia.registerActions([
            new Action("btn-keflinMedicamento", "Conferir Medicamento")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Conferir Medicamento");
                    if ( level.getFlag("score_pegou_medicamento").getValue() == false ) {
                        if ( level.getFlag("score_nao_pegou_medicamento").getValue() == false ) {
                            //core.registerScoreItem( Scores.naoPegarMedicamento );
                            level.getFlag("score_nao_pegou_medicamento").setValue( true );
                        }
                    }
                    if ( level.getFlag("score_conferiu_medicacao").getValue() == false ) {
                        //core.registerScoreItem( Scores.conferirMedicacao );
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
                    core.setActionVisible("btn-keflinMedicamento", true );
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

        // endregion

        // region Posto de Enfermagem
        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                core.openCommandBar();
                core.setActionVisible("btn-lavarMaos", true );
                core.openDialog( 0 );

            })
            .onUnload(function() {
                core.closeCommandBar();
                level.getFlag("lavar_maos_posto_enfermagem").setValue( false );
                // level.getFlag("prepararMedicacao").setValue(true);
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
                    }
                    else{
                        core.changeScene( 1 );
                    }

                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    //Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( level.getFlag("lavar_maos_posto_enfermagem").getValue() == false ) {
                        level.getFlag("lavar_maos_posto_enfermagem").setValue( true );
                    }

                })
                .setVisibility( true ),

            new Action("btn-confirmarMedicamento", "Confirmar medicação com o mentor")
                .setCssClass("action-keflin_medicamento")
                .onClick(function() {
                    console.log("Action: Confirmar medicação com o mentor");
                    //COLOCAR AS FLAGS
                    /*if ( level.getFlag("lavar_maos_posto_enfermagem").getValue() == false ) {
                        level.getFlag("lavar_maos_posto_enfermagem").setValue( true );
                    }*/

                })
                .setVisibility( false ),

            new Action("btn-prepararMedicacao", "Preparar medicação")
                .setCssClass("action-prepararMedicacao")
                .onClick(function() {
                    console.log("Action: Preparar medicação");
                    //COLOCAR AS FLAGS
                    /*if ( level.getFlag("lavar_maos_posto_enfermagem").getValue() == false ) {
                        level.getFlag("lavar_maos_posto_enfermagem").setValue( true );
                    }*/

                })
                .setVisibility( false ),

            new Action("btn-gotejamentoSoro", "Calcular gotejamento do soro")
                .setCssClass("action-gotejamentoSoro")
                .onClick(function() {
                    console.log("Action: Calcular gotejamento do soro");
                    //COLOCAR AS FLAGS
                    /*if ( level.getFlag("lavar_maos_posto_enfermagem").getValue() == false ) {
                        level.getFlag("lavar_maos_posto_enfermagem").setValue( true );
                    }*/

                })
                .setVisibility( false ),

            new Action("btn-identificarMedicacao", "Identificar medicação")
                .setCssClass("action-identificarMedicacao")
                .onClick(function() {
                    console.log("Action: lavarMaos");
                    //Aqui irá abrir a ficha sobre a medicação que é para o jogador preencher

                    //COLOCAR AS FLAGS
                    /*if ( level.getFlag("lavar_maos_posto_enfermagem").getValue() == false ) {
                        level.getFlag("lavar_maos_posto_enfermagem").setValue( true );
                    }*/

                })
                .setVisibility( false )
        ]);

        postoDeEnfermagem.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.postoDeEnfermagem[ 0 ], function() {
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
                    if ( level.getFlag("pegou_bandeja_balcao").getValue() != true ) {
                        core.openDialog( 7 );
                    }
                    else{
                        console.log("Action: Abrir gaveta");
                        //Som
                        Player.play( Player.audios.sfx.abrirGaveta );
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
                    if ( level.getFlag("pegou_bandeja_balcao").getValue() != true ) {
                        core.openDialog( 7 );
                    }
                    else{
                        console.log("Action: abrir_gaveta_direita");
                        //Som
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
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar bandeja");
                    level.getFlag("pegou_bandeja_balcao").setValue( true );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);
        // endregion

        // region gaveta esquerda
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
                        //Para não abrir outra vez esse diálogo
                            level.getFlag("score_falou_com_mentor").setValue( true );
                            console.log("Action: fechar_gaveta_esquerda");
                            //Som
                            Player.play( Player.audios.sfx.fecharGaveta );
                            core.closeModalScene("Gaveta esquerda");
                            core.closeCommandBar();
                            core.openDialog( 2 );
                        }
                    else{
                        core.closeCommandBar();
                        core.openDialog( 4 );
                    }
                })
                .setVisibility( true )
        ]);

        gavetaEsquerda.registerInteractiveObjects([
            // Soro Fisiológico 0,9% (100 ml)
            new InteractiveObject("io-soro", "Pegar soro fisiológico 0,9% (100 ml)")
            // Ainda nao disponivel imagem correta
                .setCssClass("intObj-thermometer")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar soro fisiológico 0,9% (100 ml)");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-soro", false );
                    level.getFlag("score_pegou_soro").setValue( true );
                })
                .setVisibility( true ),

            // Algodão
            new InteractiveObject("io-algodao", "Pegar algodão")
                .setCssClass("intObj-algodao_seco")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar algodao ");
                    //core.registerScoreItem( Scores.pegarAlgodao );
                    core.setInteractiveObjectVisible("io-algodao", false );
                    level.getFlag("score_pegou_algodao").setValue( true );
                })
                .setVisibility( true ),

            // Luvas de procedimento
            new InteractiveObject("io-luvas", "Pegar luvas de procedimento")
                .setCssClass("intObj-luvas_de_procedimento")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar luvas de procedimento");
                    //core.registerScoreItem( Scores.pegarLuvas );
                    core.setInteractiveObjectVisible("io-luvas", false );
                    level.getFlag("score_pegou_luvas").setValue( true );
                })
                .setVisibility( true ),

            // Seringa de 5 ml
            new InteractiveObject("io-seringa5ml", "Pegar seringa de 5 ml")
            // Ainda nao disponivel imagem correta
                .setCssClass("intObj-watch")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar seringa de 5 ml");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-seringa5ml", false );
                    level.getFlag("score_pegou_seringa_5ml").setValue( true );
                })
                .setVisibility( true ),

            // Ampola de soro Fisiológico 0,9% (10ml)
            new InteractiveObject("io-ampola_soro", "Pegar ampola de soro Fisiológico 0,9% (10ml)")
                // Ainda nao disponivel imagem correta
                .setCssClass("intObj-luvas_estereis")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar ampola de soro Fisiológico 0,9% (10ml)");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-ampola_soro", false );
                    level.getFlag("score_pegou_ampola_soro").setValue( true );
                })
                .setVisibility( true ),

            // Álcool 70%
            new InteractiveObject("io-alcool", "Pegar álcool 70%")
                .setCssClass("intObj-frasco_de_alcool")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar álcool 70%");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-alcool", false );
                    level.getFlag("score_pegou_alcool").setValue( true );
                })
                .setVisibility( true ),

            // Seringa de 10 ml
            new InteractiveObject("io-seringa10ml", "Pegar seringa de 10 ml")
                .setCssClass("intObj-seringa_de_10_ml")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar seringa de 10 ml");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-seringa10ml", false );
                    level.getFlag("score_pegou_seringa_10ml").setValue( true );
                })
                .setVisibility( true ),

            // Agulha 40X12
            new InteractiveObject("io-agulha", "Pegar agulha 40X12")
                .setCssClass("intObj-agulha_40x12")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: pegar agulha 40X12 ");
                    core.registerScoreItem( Scores.pegarAgulha );
                    core.setInteractiveObjectVisible("io-agulha", false );
                    level.getFlag("score_pegou_agulha").setValue( true );
                })
                .setVisibility( true ),

            // Equipo de soro macrogotas
            new InteractiveObject("io-equipo_soro", "Pegar equipo de soro macrogotas")
                // Ainda nao disponivel imagem correta
                .setCssClass("intObj-fita_adesiva_hipoalergenica_micropore")
                .onClick(function() {
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar equipo de soro macrogotas");
                    //core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-equipo_soro", false );
                    level.getFlag("score_pegou_equipo_soro").setValue( true );
                })
                .setVisibility( true )
        ]);
/*
        // region gaveta direita
        gavetaDireita = new Scene("gavetaDireita", "Gaveta direita")
            .setCssClass("modalScene-drawer");

        gavetaDireita.registerActions([
            new Action("btn-fecharGaveta", "Fechar gaveta")
                .setCssClass("action-fecharGaveta")
                .onClick(function() {
                    //Som
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
        // region prontuario

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
                    //Já estava na parte final da fase, então a termina
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
                    //Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    console.log("Action: Pegar prescrição médica");
                    level.getFlag("pegarPrescricaoMedica").setValue( true );
                    core.setActionVisible("btn-pegar_prescricao_medica", false );
                })
                .setVisibility( true )
        ]);
        // endregion

        // region pulseira
        pulseira = new Scene("Pulseira", "Pulseira");

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_pedro")
                .onClick(function() {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");

                    Pulseira.close();

                    if ( level.getFlag("checarPulseira").getValue() == false ) {
                        core.registerScoreItem( Scores.checarPulseira );
                        level.getFlag("checarPulseira").setValue( true );
                    }
                })
                .setVisibility( true )
        ]);
        // endregion

        // region Register Scenes
        level.registerScene( recepcao );
        level.registerScene( corredor );
        level.registerScene( alaMasculina );
        level.registerScene( leito );
        level.registerScene( farmacia );
        level.registerScene( postoDeEnfermagem );
        // endregion

        // region Register Modal Scenes
        level.registerModalScene( pulseira );
        level.registerModalScene( prontuario );
        level.registerModalScene( gavetaEsquerda );
        //level.registerModalScene( gavetaDireita );
        // endregion

        level.setSetupScript(function() {

            level.getFlag("score_ir_posto_enfermagem_hora_errada").setValue( false );
            level.getFlag("score_ir_farmacia_hora_errada").setValue( false );
            level.getFlag("score_ir_ala_feminina").setValue( false );
            level.getFlag("score_viu_prontuario").setValue( false );
            level.getFlag("score_nao_viu_prontuario").setValue( false );
            level.getFlag("score_lavar_maos_antes_leito").setValue( false );
            level.getFlag("falarComPaciente").setValue( false );
            level.getFlag("ja_falou_farmaceutico").setValue( false );
            level.getFlag("score_pegou_medicamento").setValue( false );
            level.getFlag("score_nao_pegou_medicamento").setValue( false );
            level.getFlag("score_conferiu_medicacao").setValue( false );
            level.getFlag("pegarPrescricaoMedica").setValue( false );
            level.getFlag("score_nao_conferiu_medicacao").setValue( false );
            level.getFlag("lavar_maos_posto_enfermagem").setValue( false );
            level.getFlag("pegou_bandeja_balcao").setValue( false );
            level.getFlag("score_pegou_soro").setValue( false );
            level.getFlag("score_pegou_algodao").setValue( false );
            level.getFlag("score_pegou_luvas").setValue( false );
            level.getFlag("score_pegou_seringa_5ml").setValue( false );
            level.getFlag("score_pegou_ampola_soro").setValue( false );
            level.getFlag("score_pegou_alcool").setValue( false );
            level.getFlag("score_pegou_seringa_10ml").setValue( false );
            level.getFlag("score_pegou_agulha").setValue( false );
            level.getFlag("score_pegou_equipo_soro").setValue( false );
            level.getFlag("pegou_instrumentos").setValue( false );
            level.getFlag("score_falou_com_mentor").setValue( false );
            level.getFlag("score_lavar_maos").setValue( false );

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
            Prontuario.setPrescMedicaRowData( 1, "", "", "", "", "", "", false );

            //Prontuario.setPrescEnfermagemState("risco de infecção");

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

        // region Flags
        level.registerFlag( new Flag("pegarFolheto9Certos", false ) );
        level.registerFlag( new Flag("checarPulseira", false ) );


        level.registerFlag( new Flag("pegarPrescricaoMedica", false ) );
        level.registerFlag( new Flag("pegarMedicamento", false ) );
        level.registerFlag( new Flag("prepararMedicacao", false ) );

        level.registerFlag( new Flag("lavarMaosSalaLeitos", false ) );
        level.registerFlag( new Flag("lavarMaosLeito", false ) );
        level.registerFlag( new Flag("lavar_maos_posto_enfermagem", false ) );

       /* level.registerFlag( new Flag("pegou_bandeja_balcao", false ) );
        level.registerFlag( new Flag("pegarSoroFisiológico", false ) );
        level.registerFlag( new Flag("pegarSeringa5", false ) );
        level.registerFlag( new Flag("pegarAgulha", false ) );
        level.registerFlag( new Flag("pegarAlcool", false ) );
        level.registerFlag( new Flag("pegarAlgodao", false ) );
        level.registerFlag( new Flag("pegarEquipoSoroMacrogotas", false ) );
        level.registerFlag( new Flag("pegarLuvas", false ) );
        level.registerFlag( new Flag("pegarSeringa10", false ) );
        level.registerFlag( new Flag("pegarAmpolaSF", false ) );
        //level.registerFlag( new Flag("pegarBandeja", false ) );
        */

        level.registerFlag( new Flag("score_ir_posto_enfermagem_hora_errada", false ) );
        level.registerFlag( new Flag("score_ir_farmacia_hora_errada", false ) );
        level.registerFlag( new Flag("score_ir_ala_feminina", false ) );
        level.registerFlag( new Flag("score_viu_prontuario", false ) );
        level.registerFlag( new Flag("score_nao_viu_prontuario", false ) );
        level.registerFlag( new Flag("score_lavar_maos_antes_leito", false ) );
        level.registerFlag( new Flag("falarComPaciente", false ) );
        level.registerFlag( new Flag("ja_falou_farmaceutico", false ) );
        level.registerFlag( new Flag("score_pegou_medicamento", false ) );
        level.registerFlag( new Flag("score_nao_pegou_medicamento", false ) );
        level.registerFlag( new Flag("score_conferiu_medicacao", false ) );
        level.registerFlag( new Flag("pegarPrescricaoMedica", false ) );
        level.registerFlag( new Flag("score_nao_conferiu_medicacao", false ) );
        level.registerFlag( new Flag("lavar_maos_posto_enfermagem", false ) );
        level.registerFlag( new Flag("pegou_bandeja_balcao", false ) );
        level.registerFlag( new Flag("score_pegou_soro", false ) );
        level.registerFlag( new Flag("score_pegou_algodao", false ) );
        level.registerFlag( new Flag("score_pegou_luvas", false ) );
        level.registerFlag( new Flag("score_pegou_seringa_5ml", false ) );
        level.registerFlag( new Flag("score_pegou_ampola_soro", false ) );
        level.registerFlag( new Flag("score_pegou_alcool", false ) );
        level.registerFlag( new Flag("score_pegou_seringa_10ml", false ) );
        level.registerFlag( new Flag("score_pegou_agulha", false ) );
        level.registerFlag( new Flag("score_pegou_equipo_soro", false ) );
        level.registerFlag( new Flag("pegou_instrumentos", false ) );
        level.registerFlag( new Flag("score_falou_com_mentor", false ) );
        level.registerFlag( new Flag("score_lavar_maos", false ) );

        /* MORE FLAGS FROM SCORES DATA
         confirmarMedicacao
         calcularGotejamento
         identificarMedicacao
         administrarMedicacao
         gotejarSoroEquipo
         anotarNoProntuario
         */

        // endregion

        level.setInitialScene( 0 );

        game.registerLevel( level, 4 );

        console.groupEnd();

    });
