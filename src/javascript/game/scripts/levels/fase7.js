/* by Wellyson */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").fase7;
        var Alertas = require("DialogsData").alertas;
        // var Scores = require("ScoresData").fase3;
        // endregion

        var level = new Level("Level 7");
        console.groupCollapsed( level.getName() );

        // region Scenes

        // region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );
                level.getFlag("conversar_recepcionista").setValue( true );
                core.openDialog( 0 );
            });


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {
                core.closeDialog();
                core.changeScene( 1 );
                console.log("Ir para o corredor");
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
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true ),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick( recepcaoIrCorredor )
                .setVisibility( true )
        ]);


        // region CORREDOR

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {
                console.log("Entrando no corredor");
            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });


        function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            core.changeScene( 4 );


        }


        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            if ( level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                level.getFlag("ir_postoEnfermagem_horaErrada").setValue( true );
                core.changeScene( 5 );
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
            if ( level.getFlag("ir_centroCirurgico_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );
                level.getFlag("ir_centroCirurgico_horaErrada").setValue( true );
                core.changeScene( 7 );
            } else {
                core.changeScene( 7 );
            }
        }


        function corredorIrAlaMasculina() {
            console.log("Action: corredorIrAlaMasculinaHoraErrada");
            if ( level.getFlag("ir_AlaMasculina_horaErrada").getValue() == false ) {
                core.registerScoreItem( Scores.irAlaMasculinaHoraErrada );
                level.getFlag("ir_AlaMasculina_horaErrada").setValue( true );
                core.changeScene( 6 );
            } else {
                core.changeScene( 6 );
            }
        }


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

            new InteractiveObject("io-ir_alaMasculina", "Ir para a Ala Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true )


        ]);


        // region ALA FEMININA


        var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function() {
                level.getFlag("ir_ala_feminina_primeira_vez").setValue( true );
                console.log("Load scene: " + alaFeminina.getName() );
            });


        alaFeminina.registerDialogs([

            // 0

            // 1 Jogador responde
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
                    if ( level.getFlag("conversarPaciente").getValue() == false ) {
                        // aviso que nao conversou com paciente
                    } else {
                        if ( level.getFlag("ler_prontuario").getValue() == false ) {
                            level.getFlag("ler_prontuario").setValue( true );
                            console.log("Action: ler prontuario");
                            Prontuario.open();
                            core.openModalScene("Prontuario");
                            core.registerScoreItem( Scores.verProntuario );
                        } else {
                            console.log("Action: ler prontuario");
                            Prontuario.open();
                            core.openModalScene("Prontuario");

                        }

                    }
                })
                .setVisibility( true ),


            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {

                    if ( level.getFlag("lavarMaos").getValue() == false ) {
                        level.getFlag("lavarMaos").setValue( true );
                        core.registerScoreItem( Scores.lavarMaos );
                        level.getFlag("score_lavar_maos").setValue( true );

                    }

                })
                .setVisibility( true )


        ]);


        alaFeminina.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaFeminina_corredor")
                .onClick(function() {
                    if ( level.getFlag("conversarPaciente").getValue() == false ) {
                        core.openDialog( 6 );
                    } else {
                        console.log("voltando para corredor");
                        core.changeScene( 1 );

                    }

                }),


            new InteractiveObject("io-conversar_paciente2", "Ir ao leito")
                .setCssClass("intObj-irLeitoEsquerda")
                .onClick(function() {
                    if ( level.getFlag("lavarMaos").getValue() == false ) {
                        core.openDialog( 7 );
                    } else if ( level.getFlag("conversarPaciente").getValue() == false ) {
                        level.getFlag("conversarPaciente").setValue( true );
                        core.registerScoreItem( Scores.falarComPaciente );
                        core.openDialog( 0 );
                    } else if ( level.getFlag("pegarMedicamento").getValue() == false ) {
                        core.openDialog( 8 );
                    } else {
                        core.changeScene( 3 );
                    }
                })
                .setVisibility( true )


        ]);


        //  region FARMACIA

        var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {
                if ( level.getFlag("ir_ala_feminina_primeira_vez").getValue() == true ) {
                    console.log("Load scene: " + farmacia.getName() );
                    console.log("Abrindo dialogo com farmaceutico");
                    core.openDialog( 0 );
                } else {
                    console.log("Hora Errada!");
                    if ( level.getFlag("ir_farmacia_horaErrada").getValue() == false ) {
                        core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    }
                    level.getFlag("ir_farmacia_horaErrada").setValue( true );
                    core.openDialog( 9 );
                    core.changeScene( 1 );
                }
            });


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
                    core.registerScoreItem( Scores.trocarMedicamento );
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
                })

        ]);


        farmacia.registerActions([


            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( level.getFlag("pegarMedicamento").getValue() == false ) {
                        core.openDialog( 8 );
                    } else if ( level.getFlag("conferir_medicamento_correto").getValue() == false ) {
                        core.openDialog( 7 );
                    } else {
                        core.changeScene( 1 );
                    }
                }),


            new Action("btn-pegarMedicamento", "Pegar Medicamento")
                .setCssClass("action-pegarMedicamento")
                .onClick(function() {
                    level.getFlag("pegarMedicamento").setValue( true );
                    core.registerScoreItem( Scores.pegarMedicamento );

                }),


            new Action("btn-conferirMedicamento", "Conferir Medicamento")
                .setCssClass("action-conferir_medicamento")
                .onClick(function() {
                    if ( level.getFlag("pegarMedicamento").getValue() == false ) {
                        // nao faz nada
                    } else if ( level.getFlag("conferir_medicamento_errado").getValue() == false ) {
                        level.getFlag("conferir_medicamento_errado").setValue( true );
                        core.registerScoreItem( Scores.conferirMedicamentoErrado );
                        core.openDialog( 2 );
                    } else {
                        level.getFlag("conferir_medicamento_correto").setValue( true );
                        core.registerScoreItem( Scores.conferirMedicamentoCorreto );

                    }


                })

        ]);


        //  region LEITO

        var leito = lib.scenes.leitos.ana.getClone()
            .onLoad(function() {
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
                }),

            // 7 ALERTA MENTOR
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 8 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                })

        ]);


        //  region POSTO DE ENFERMAGEM

        var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                if ( level.getFlag("ir_ala_feminina_primeira_vez").getValue() == true ) {
                    console.log("Load scene: " + postoDeEnfermagem.getName() );
                } else {
                    console.log("Hora Errada!");
                    if ( level.getFlag("ir_postoEnfermagem_horaErrada").getValue() == false ) {
                        core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                    }
                    level.getFlag("ir_postoEnfermagem_horaErrada").setValue( true );
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
                    if ( level.getFlag("pegou_bandeja").getValue() != true ) {
                        core.openDialog( 1 );
                    }
                    else{
                        console.log("Action: abrirGaveta");
                        core.openModalScene("gaveta");
                        core.openCommandBar();
                    }
                })
                .setVisibility( true ),


            new InteractiveObject("io-pegar_bandeja", "Pegar bandeja")
                .setCssClass("intObj-bandeja")
                .onClick(function() {
                    console.log("Action: Pegar bandeja");
                    level.getFlag("pegou_bandeja").setValue( true );
                    //level.getFlag("score_pegou_bandeja").setValue( true );
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
                .setVisibility( true )

        ]);


        postoDeEnfermagem.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    if ( level.getFlag("pegar_copo_descartavel").getValue() == false || level.getFlag("pegar_agua_potavel").getValue() == false ) {
                        core.openDialog( 0 );
                    } else {
                        core.changeScene( 1 );
                    }
                })

        ]);

        //  region ALA MASCULINA

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


        //  region CENTRO CIRURGICO

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


        // region PRONTUARIO


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
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
                    core.closeModalScene("Gaveta");
                })
                .setVisibility( true )
        ]);


        gaveta.registerInteractiveObjects([

            new InteractiveObject("io-copo_descartavel", "Copo Descartável")
                .setCssClass("intObj-copoDescartavel")
                .onClick(function() {
                    console.log("IntObj: io-copo_descartavel");
                    level.getFlag("pegar_copo_descartavel").setValue( true );
                    core.setInteractiveObjectVisible("io-copo_descartavel", false );

                    if ( level.getFlag("score_pegar_copo_descartavel").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarCopoDescartavel );
                        level.getFlag("score_pegar_copo_descartavel").setValue( true );
                    }
                })
                .setVisibility( true ),


            new InteractiveObject("io-agua_potavel", "Água Potável")
                .setCssClass("intObj-aguaPotavel")
                .onClick(function() {
                    console.log("IntObj: io-agua_potavel");
                    level.getFlag("pegar_agua_potavel").setValue( true );
                    core.setInteractiveObjectVisible("io-agua_potavel", false );

                    if ( level.getFlag("score_pegar_agua_potavel").getValue() == false ) {
                        core.registerScoreItem( Scores.pegarAguaPotavel );
                        level.getFlag("score_pegar_agua_potavel").setValue( true );
                    }
                })
                .setVisibility( true )


        ]);


        // endregion

        // endregion

        // region ModalScenes
        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        // endregion

        // region Level

        // region Register Scenes

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


        // endregion

        // region Register Modal Scenes

        // endregion

        // region Flags

        // endregion

        level.setSetupScript(function() {


            level.getFlag("conversar_recepcionista").setValue( false );
            level.getFlag("conversar_mentor").setValue( false );
            level.getFlag("ir_farmacia_horaErrada").setValue( false );
            level.getFlag("ir_postoEnfermagem_horaErrada").setValue( false );
            level.getFlag("ir_centroCirurgico_horaErrada").setValue( false );
            level.getFlag("ir_AlaMasculina_horaErrada").setValue( false );
            level.getFlag("ir_AlaFeminina_horaErrada").setValue( false );
            level.getFlag("ir_postoEnfermagem_horaErrada").setValue( false );
            level.getFlag("conversarPaciente").setValue( false );
            level.getFlag("ler_prontuario").setValue( false );
            level.getFlag("conferir_medicamento_errado").setValue( false );
            level.getFlag("pegarMedicamento").setValue( false );
            level.getFlag("conferir_medicamento_correto").setValue( false );
            level.getFlag("pegar_copo_descartavel").setValue( false );
            level.getFlag("pegar_agua_potavel").setValue( false );
            level.getFlag("pegou_bandeja").setValue( false );
            level.getFlag("score_pegar_agua_potavel").setValue( false );
            level.getFlag("score_pegar_copo_descartavel").setValue( false );
            level.getFlag("ir_ala_feminina_primeira_vez").setValue( false );
            level.getFlag("lavarMaos").setValue( false );

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
            Prontuario.setPrescMedicaRowData( 1, "", "", "", "", "", false, false );

            //Prontuario.setPrescEnfermagemState("glicemia instável");

            Prontuario.setSsvvRowData( 0, "", "120X70", "60", "18", "96", "35", true );
            Prontuario.setSsvvRowData( 1, "", "130X70", "68", "20", "96", "36.4", true );
            Prontuario.setAnotacaoEnfermagemRowData("", "");


        });


        level.registerFlag( new Flag("conversar_recepcionista"), false );
        level.registerFlag( new Flag("conversar_mentor"), false );
        level.registerFlag( new Flag("ir_farmacia_horaErrada"), false );
        level.registerFlag( new Flag("ir_postoEnfermagem_horaErrada"), false );
        level.registerFlag( new Flag("ir_centroCirurgico_horaErrada"), false );
        level.registerFlag( new Flag("ir_AlaMasculina_horaErrada"), false );
        level.registerFlag( new Flag("ir_AlaFeminina_horaErrada"), false );
        level.registerFlag( new Flag("ir_postoEnfermagem_horaErrada"), false );
        level.registerFlag( new Flag("conversarPaciente"), false );
        level.registerFlag( new Flag("ler_prontuario"), false );
        level.registerFlag( new Flag("conferir_medicamento_errado"), false );
        level.registerFlag( new Flag("pegarMedicamento"), false );
        level.registerFlag( new Flag("conferir_medicamento_correto"), false );
        level.registerFlag( new Flag("pegar_copo_descartavel"), false );
        level.registerFlag( new Flag("pegar_agua_potavel"), false );
        level.registerFlag( new Flag("pegou_bandeja"), false );
        level.registerFlag( new Flag("score_pegar_agua_potavel"), false );
        level.registerFlag( new Flag("score_pegar_copo_descartavel"), false );
        level.registerFlag( new Flag("ir_ala_feminina_primeira_vez"), false );
        level.registerFlag( new Flag("lavarMaos"), false );


        level.setInitialScene( 0 );
        // endregion

        game.registerLevel( level, 7 );

        console.groupEnd();

    });
