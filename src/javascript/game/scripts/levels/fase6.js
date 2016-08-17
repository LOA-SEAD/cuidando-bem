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

        var Dialogs = require("DialogsData").fase6;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").fase6;
        var Player = require("Player");


        var level = new Level("Level 6");
        level.setMaxPoints( Scores._sum );
        console.groupCollapsed( level.getName() );


        var recepcao,
            corredor,
            alaFeminina,
            leito,
            postoDeEnfermagem,
            gaveta,
            pulseira,
            prontuario,
            glicosimetro;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( core.flag("conversar_recepcionista") == true ) {
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

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );

                  if(core.flag("conversar_recepcionista") == false) {
                    core.flag("conversar_recepcionista", true);
                    core.openDialog( 0 );

                }

            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog( lib.characters.recepcionista )
                .setText( Dialogs.recepcao[ 0 ] )
                .registerOption("", function() {
                    core.flag("conversar_recepcionista",  true );
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


        function corredorIrPostoEnfermagem() {
            if ( core.flag("score_ver_prontuario") == false ) {
                core.openDialog( 2 );
                if ( core.flag("score_ir_posto_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
                    core.flag("score_ir_posto_hora_errada",  true );
                }
            } else {
                core.changeScene( 4 );
            }
        }

        function corredorIrAlaFeminina() {
            if ( core.flag("conversar_mentor") == false ) {
                core.openDialog( 6 );
                if ( core.flag("score_ir_ala_feminina_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
                    core.flag("score_ir_ala_feminina_hora_errada",  true );
                }
            } else {
                core.changeScene( 2 );
            }
        }

        function corredorIrAlaMasculina() {
            if ( core.flag("conversar_mentor") == false ) {
                core.openDialog( 6 );
                if ( core.flag("score_ir_alaMasculina_hora_errada") == false ) {
                    core.registerScoreItem( Scores.irAlaMasculinaHoraErrada );
                    core.flag("score_ir_alaMasculina_hora_errada",  true );
                }
            } else {
                core.openDialog( 3 );
                if ( core.flag("score_ir_alaMasculina_apos_fala_mentor") == false ) {
                    core.registerScoreItem( Scores.irAlaMasculinaAposFalaMentor );
                    core.flag("score_ir_alaMasculina_apos_fala_mentor",  true );
                }
            }
        }

        function corredorIrFarmacia() {
            core.openDialog( 4 );
            if ( core.flag("score_ir_farmacia_hora_errada") == false ) {
                core.registerScoreItem( Scores.irFarmaciaHoraErrada );
                core.flag("score_ir_farmacia_hora_errada",  true );
            }
        }

        function corredorIrCentroCirurgico() {
            core.openDialog( 5 );
            if ( core.flag("score_ir_centro_cirurgico_hora_errada") == false ) {
                core.registerScoreItem( Scores.irCentroCirurgicoHoraErrada );
                core.flag("score_ir_centro_cirurgico_hora_errada",  true );
            }
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {

                 core.openCommandBar();
                core.setActionVisible("btn-ir_recepcao", true);

                console.log("Entrando no corredor");
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInLoop( Player.audios.loops.recepcao );
                // Mentor só aparece no começo da fase
                if ( core.flag("entrou_ala_feminina") == true ) {
                    core.setInteractiveObjectVisible("io-conversar_mentor", false );
                }

            if(core.flag("conversar_mentor") == false) {

                core.openDialog( 0 );

            }

            })
            .onUnload(function() {
                console.log("Saindo do corredor");
                Player.stopAll();
                // Som
                Player.play( Player.audios.sfx.abrirPorta );
                Player.playInRange( Player.audios.musics.inGame );
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
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.corredor[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            // Dialog 1
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.corredor[ 1 ] )
                .registerOption("", function() {
                    core.flag("conversar_mentor",  true );
                    core.closeDialog();
                }),
            // 2 Mentor Ação errada: Ir ao posto de enfermagem
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.farmacia )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 3 - Mentor Ação errada: Ir a ala feminina
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.alaFeminina )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 4 - Mentor Ação errada: Ir a farmacia
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.enfermagem[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 5 - Mentor Ação errada: Ir ao centro cirurgico
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.enfermagem[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 6 - Mentor Ação errada: Não falar com o mentor para saber qual é a enfermaria correta
            new Dialog( lib.characters.mentor )
                .setText( Alertas.perdido.corredor )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos", "Ir à Enfermaria Masculina")
                .setCssClass("intObj-goToBedroom")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true ),

            new InteractiveObject("io-ir_posto_enfermagem", "Ir ao Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick( corredorIrPostoEnfermagem )
                .setVisibility( true ),

            new InteractiveObject("io-ir_ala_feminina", "Ir à Enfermaria Feminina")
                .setCssClass("intObj-goToAlaFeminina")
                .onClick( corredorIrAlaFeminina )
                .setVisibility( true ),

            new InteractiveObject("io-ir_farmacia", "Ir à Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick( corredorIrFarmacia )
                .setVisibility( true ),

            new InteractiveObject("io-ir_centro_cirurgico", "Ir ao Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico")
                .onClick( corredorIrCentroCirurgico )
                .setVisibility( true ),

            new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function() {
                    core.openDialog( 0 );
                })
                .setVisibility( true )

        ]);


        alaFeminina = new Scene("alaMasculina", "Ala Masculina")
            .setCssClass("scene-bedroom-level5")
            .onLoad(function() {
                console.log("Load scene: Ala feminina");
                // Apenas para desaparecer com o mentor do corredor
                if ( core.flag("entrou_ala_feminina") == false ) {
                    core.flag("entrou_ala_feminina",  true );
                }
                /*O fato de já ter verificado o prontuario ou ter tentado sair sem vê-lo é o que
                 determina se é a primeira ou segunda vez que o jogador veio até a ala feminina*/
                if ( (core.flag("score_ver_prontuario") == false) ) {
                    ;
                } else {
                    core.setInteractiveObjectVisible("io-ir_leito", true );
                    core.setInteractiveObjectVisible("io-falarPaciente", false );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.openCommandBar();
                }
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        alaFeminina.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function() {
                    // Já checou o prontuario
                    if ( core.flag("score_ver_prontuario") == false ) {
                        core.openDialog( 3 );
                    }

                        if ( core.flag("score_nao_viu_prontuario") == false ) {
                            core.registerScoreItem( Scores.naoVerProntuario );
                            core.flag("score_nao_viu_prontuario",  true );
                        }

                    // Voltar para o corredor
                    core.changeScene( 1 );
                })
                .setVisibility( true ),

            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-tutorial")
                .onClick(function() {
                    if ( core.flag("pegou_todos_instrumentos") == false ) {
                        // Mentor corrige
                        core.openDialog( 4 );
                    } else {
                        if ( core.flag("score_lavar_maos_antes_leito") == true ) {
                            core.changeScene( 3 );
                        }
                        else {
                            core.openDialog(5);
                        }
                    }
                })
                .setVisibility( false ),


            new InteractiveObject("io-falarPaciente", "Falar com a paciente")
                .setCssClass("intObj-ir_leito-tutorial")
                .onClick(function() {

                    core.openDialog( 0 );
                    core.setActionVisible("btn-ler_prontuario", true);

                })
                .setVisibility( true ),



        ]);

        alaFeminina.registerDialogs([
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaFeminina[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            new Dialog( lib.characters.pacientes.estherUnknow )
                .setText( Dialogs.alaFeminina[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.alaFeminina[ 2 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                }),
            // 3 - Não ver o prontuario
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verProntuario[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 4 - Mentor Ação errada: Esquecer objetos na gaveta
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.objetoQualquer )
                .registerOption("", function() {
                    core.closeDialog();
                }),

            // 5
               new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo1 )
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);

        alaFeminina.registerActions([

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: ler prontuario");
                    if ( core.flag("score_ver_prontuario") == false ) {
                        core.registerScoreItem( Scores.verProntuario );
                        core.flag("score_ver_prontuario",  true );
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility( false ),

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
                .setVisibility( false )
        ]);


        leito = lib.scenes.leitos.esther.getClone()
            .onLoad(function() {
                core.openCommandBar();
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true );
            })
            .onUnload(function() {
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([

            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_06-checar_pulseira")
                .onClick(function() {

                    core.flag("verificar_pulseira", true);

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
                .setEnable( false ),


            new InteractiveObject("io-conversar_paciente06", "Falar com a paciente")


                .setCssClass("intObj-conversar_paciente")
                .onClick(function() {


                      if ( core.flag("score_falar_paciente") == false ) {
                        core.registerScoreItem( Scores.falarComPaciente );
                        core.flag("score_falar_paciente",  true );
                    }
                    core.openDialog( 0 );
                    core.closeCommandBar();
                     core.enableInteractiveObject("io-pulseira_paciente", true );

                })
                .setVisibility( true )


        ]);

        leito.registerDialogs([
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 0 ] )
                .registerOption("", function() {
                    core.openDialog( 1 );
                }),
            new Dialog( lib.characters.pacientes.esther )
                .setText( Dialogs.leitoPaciente[ 1 ] )
                .registerOption("", function() {
                    core.openDialog( 2 );
                }),
            new Dialog( lib.characters.jogador )
                .setText( Dialogs.leitoPaciente[ 2 ] )
                .registerOption("", function() {
                    core.openDialog( 3 );
                }),
            new Dialog( lib.characters.pacientes.esther )
                .setText( Dialogs.leitoPaciente[ 3 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),
            new Dialog( lib.characters.jogador )
                .setText("")
                .registerOption( Dialogs.leitoPaciente[ 4 ], function() {
                    core.closeDialog();
                    // core.setActionVisible("btn-falarPaciente", false );
                    core.setActionVisible("btn-realizar_teste_glicemia", true );
                    core.setActionVisible("btn-descartar_agulha", true );
                    core.setActionVisible("btn-jogar_algodao", true );
                    core.setActionVisible("btn-materiaisCurativo", true );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setActionVisible("btn-calcar_luvas_procedimento", true );
                    core.setActionVisible("btn-calcar_luvas_estereis", true );
                    core.setActionVisible("btn-fazer_curativo", false );
                    core.setActionVisible("btn-identificarCurativo", false );
                    core.setActionVisible("btn-erguer_grade", false );
                    core.setActionVisible("btn-anotarProntuario", false );
                    core.openCommandBar();
                })
                .registerOption( Dialogs.leitoPaciente[ 5 ], function() {
                    core.openDialog( 5 );
                })
                .setRandomize( true ),
            // 5 - Resposta op 2
            new Dialog( lib.characters.mentor )
                .setText( Dialogs.leitoPaciente[ 6 ] )
                .registerOption("", function() {
                    core.openDialog( 4 );
                }),
            // 6 - Não falar com o paciente
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.informarPaciente )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 7 - Não verificar a pulseira
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.verPulseira )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 8 - Não fazer o teste de glicemia capilar
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.teste[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 9 - Não descartar a agulha
            new Dialog( lib.characters.mentor )
                .setText( Alertas.descarte.agulha )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 10 - Não jogar o algodão
            new Dialog( lib.characters.mentor )
                .setText( Alertas.descarte.algodão )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 11 - Não selecionar os materiais do curativo
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.materiaisCurativo )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 12 - Não lavar as mãos
            new Dialog( lib.characters.mentor )
                .setText( Alertas.lavarMaos.tipo3 )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 13 - Calçar luvas de procedimento
            new Dialog( lib.characters.mentor )
                .setText( Alertas.luvasErradas )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 14 - Não calçar luva estéril
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.luvasEstereis )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 15 - Não fazer o curativo
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.teste[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 16 - Não identificar o curativo
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.identificarCurativo )
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 17 - Não erguer a grade
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.elevarGrade[ 1 ] )
                .registerOption("", function() {
                    core.closeDialog();
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
        ]);

        leito.registerActions([

                 new Action("btn-verificar_teste_glicemia", "Verificar resultado")

                .setCssClass("action-realizar_teste_glicemia")
                .onClick(function() {

                     Player.play( Player.audios.sfx.bip );
                     core.openModalScene("modalGlicosimetro");


                })
                .setVisibility( false ),


            new Action("btn-realizar_teste_glicemia", "Realizar teste de glicemia capilar")
                // CONSERTAR
                .setCssClass("action-realizar_teste_glicemia")
                .onClick(function() {
                    console.log("Action: Fazer teste de glicemia capilar");

                if(core.flag("verificar_pulseira") == true){
                    // Bip
                    Player.play( Player.audios.sfx.bip );
                    // Desabilita acesso a pulseira
                    Pulseira.disable();
                    if ( core.flag("score_verificar_pulseira") == false ) {

                       /* if ( core.flag("score_nao_verificar_pulseira") == false ) {
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                            core.flag("score_nao_verificar_pulseira",  true );
                        }*/

                        core.closeCommandBar();
                        core.openDialog( 7 );
                    } else {

                        if ( core.flag("score_fez_teste_glicemia") == false ) {
                            core.flag("score_fez_teste_glicemia",  true );
                            core.registerScoreItem( Scores.fazerTesteGlicemia );
                        }
                        // Abre a cena do glicosimetro
                        core.openModalScene("modalGlicosimetroComFita");
                    }
                }
                    else {

                        if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                    }
                })
                .setVisibility( false ),

            new Action("btn-descartar_agulha", "Descartar agulha")
                .setCssClass("action-agulha_40x12")
                .onClick(function() {



                  if(core.flag("verificar_pulseira") == true){

                    // Som
                    Player.play( Player.audios.sfx.jogandoLixo );

                    core.flag("descartar_agulha", true);

                    core.setActionVisible("btn-realizar_teste_glicemia", false );
                    core.setActionVisible("btn-descartar_agulha",  false );
                    core.setActionVisible("btn-jogar_algodao",  false );
                    core.setActionVisible("btn-materiaisCurativo",  false );
                    core.setActionVisible("btn-lavarMaos", false );
                    core.setActionVisible("btn-calcar_luvas_procedimento",  false );
                    core.setActionVisible("btn-calcar_luvas_estereis",  false );
                    core.setActionVisible("btn-verificar_teste_glicemia",  false );

                    core.setActionVisible("btn-lixoComum", true );
                    core.setActionVisible("btn-lixoInfectante", true  );
                    core.setActionVisible("btn-perfuroCortante", true  );

                  }
                    else {


                        if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                    }


                })
                .setVisibility( false ),

            new Action("btn-jogar_algodao", "Descartar algodão")
                .setCssClass("action-algodao_seco")
                .onClick(function() {

                 if(core.flag("verificar_pulseira") == true){

                     // Som
                    Player.play( Player.audios.sfx.jogandoLixo );

                    core.flag("descartar_algodao", true);

                    core.setActionVisible("btn-realizar_teste_glicemia", false );
                    core.setActionVisible("btn-descartar_agulha",  false );
                    core.setActionVisible("btn-jogar_algodao",  false );
                    core.setActionVisible("btn-materiaisCurativo",  false );
                    core.setActionVisible("btn-lavarMaos", false );
                    core.setActionVisible("btn-calcar_luvas_procedimento",  false );
                    core.setActionVisible("btn-calcar_luvas_estereis",  false );
                    core.setActionVisible("btn-verificar_teste_glicemia",  false );

                    core.setActionVisible("btn-lixoComum", true );
                    core.setActionVisible("btn-lixoInfectante", true  );
                    core.setActionVisible("btn-perfuroCortante", true  );

                 }

                    else {

                                if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                    }

                })
                .setVisibility( false ),

            new Action("btn-materiaisCurativo", "Selecionar materiais do curativo")
                // CONSERTAR
                .setCssClass("action-fazer_curativo")
                .onClick(function() {



                if(core.flag("verificar_pulseira") == true){

                    if ( core.flag("score_selecionou_materiais_curativo") == false ) {
                        core.flag("score_selecionou_materiais_curativo",  true );
                        core.registerScoreItem( Scores.selecionarMateriaisCurativo );
                    }
                }
                else {

                      if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                }
                })
                .setVisibility( false ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {


              if(core.flag("verificar_pulseira") == true){

                    console.log("Action: Lavar as mãos");
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );

                  /*  if ( core.flag("score_selecionou_materiais_curativo") == false ) {
                        if ( core.flag("score_nao_selecionou_materiais_curativo") == false ) {
                            core.registerScoreItem( Scores.naoSelecionarMateriaisCurativo );
                            core.flag("score_nao_selecionou_materiais_curativo",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 11 );
                    }*/

                    if ( core.flag("score_lavou_maos_antes_calcar_luva") == false ) {
                        core.flag("score_lavou_maos_antes_calcar_luva",  true );
                        core.registerScoreItem( Scores.lavarMaosAntesLuva );
                    }
              }
                else {

                        if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                }
                })
                .setVisibility( false ),

            new Action("btn-calcar_luvas_procedimento", "Calçar luvas de procedimento")
                .setCssClass("action-luvas_de_procedimento")
                .onClick(function() {

                if(core.flag("verificar_pulseira") == true){

                    console.log("Action: Calçar luvas de procedimento");
                    // Som
                    Player.play( Player.audios.sfx.colocarLuvas );

                    if ( core.flag("score_luvas_de_procedimento") == false ) {
                        core.registerScoreItem( Scores.calcarLuvaProcedimento );
                        core.flag("score_luvas_de_procedimento",  true );
                    }
                    core.closeCommandBar();
                    core.openDialog( 13 );

            }
                else{

                                            if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );

                }
                })
                .setVisibility( false ),

            new Action("btn-calcar_luvas_estereis", "Calçar luvas estéreis")
                .setCssClass("action-luvas_estereis")
                .onClick(function() {

              if(core.flag("verificar_pulseira") == true){

                    console.log("Action: Calçar luvas estéreis");
                    // Som
                    Player.play( Player.audios.sfx.colocarLuvas );
                 /*
                    if ( core.flag("score_lavou_maos_antes_calcar_luva") == false ) {
                        if ( core.flag("score_nao_lavou_maos_antes_calcar_luva") == false ) {
                            core.registerScoreItem( Scores.naoLavarMaosAntesLuva );
                            core.flag("score_nao_lavou_maos_antes_calcar_luva",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 12 );
                    }*/


                    if ( core.flag("score_luva_esteril") == false ) {
                        core.flag("score_luva_esteril",  true );
                        core.registerScoreItem( Scores.calcarLuvaEsteril );

                        // divide os botoes
                        if (core.flag("score_fez_teste_glicemia") == true && core.flag("descartar_algodao") == true && core.flag("score_selecionou_materiais_curativo") == true &&
               core.flag("score_lavou_maos_antes_calcar_luva") == true  && core.flag("score_luva_esteril") == true && core.flag("descartar_agulha") == true) {

                            core.setActionVisible("btn-realizar_teste_glicemia", false );
                            core.setActionVisible("btn-descartar_agulha", false );
                            core.setActionVisible("btn-jogar_algodao", false );
                            core.setActionVisible("btn-materiaisCurativo", false );
                            core.setActionVisible("btn-calcar_luvas_procedimento", false );
                            core.setActionVisible("btn-calcar_luvas_estereis", false );
                            core.setActionVisible("btn-lavarMaos", false );
                            core.setActionVisible("btn-fazer_curativo", true );
                            core.setActionVisible("btn-identificarCurativo", true );
                            core.setActionVisible("btn-erguer_grade", true );
                            core.setActionVisible("btn-anotarProntuario", true );
                            core.setActionVisible("btn-verificar_teste_glicemia", false );



           }
                    }
              }
                else {

                                           if(core.flag("score_pulseira") == false) {
                            core.flag("score_pulseira", true);
                            core.registerScoreItem( Scores.naoVerificarPulseira );
                        }

                        core.openDialog( 7 );
                }
                })
                .setVisibility( false ),




            // separacao






            new Action("btn-fazer_curativo", "Fazer curativo")
                // CONSERTAR
                .setCssClass("action-fazer_curativo")
                .onClick(function() {
                    console.log("Action: Fazer curativo");
                    if ( core.flag("score_luva_esteril") == false ) {
                        if ( core.flag("score_nao_luva_esteril") == false ) {
                            core.registerScoreItem( Scores.naoCalcarLuvaEsteril );
                            core.flag("score_nao_luva_esteril",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 14 );
                    }
                    if ( core.flag("score_fez_curativo") == false ) {
                        core.flag("score_fez_curativo",  true );
                        core.registerScoreItem( Scores.fazerCurativo );
                    }
                })
                .setVisibility( false ),

            new Action("btn-identificarCurativo", "Identificar curativo")
                // CONSERTAR
                .setCssClass("action-identificarCurativo")
                .onClick(function() {
                    console.log("Action: Identificar curativo");
                    if ( core.flag("score_fez_curativo") == false ) {
                        if ( core.flag("score_nao_fez_curativo") == false ) {
                            core.registerScoreItem( Scores.naoFazerCurativo );
                            core.flag("score_nao_fez_curativo",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 15 );
                    }
                    if ( core.flag("score_identificou_curativo") == false ) {
                        core.flag("score_identificou_curativo",  true );
                        core.registerScoreItem( Scores.identificarCurativo );
                    }
                })
                .setVisibility( false ),

            new Action("btn-erguer_grade", "Elevar grade da cama")
                // CONSERTAR
                .setCssClass("action-elevarGrade")
                .onClick(function() {
                    console.log("Action: Erguer grade da cama");
                    if ( core.flag("score_identificou_curativo") == false ) {
                        if ( core.flag("score_nao_identificou_curativo") == false ) {
                            core.registerScoreItem( Scores.naoIdentificarCurativo );
                            core.flag("score_nao_identificou_curativo",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 16 );
                    }
                    if ( core.flag("score_ergueu_grade") == false ) {
                        core.flag("score_ergueu_grade",  true );
                        core.registerScoreItem( Scores.elevarGradeDaCama );
                        core.changeSceneCssClassTo("scene-bedChar06Grade");
                          core.setActionVisible("btn-erguer_grade", false);
                    }

                })
                .setVisibility( false ),

            new Action("btn-anotarProntuario", "Anotar prontuario")
                .setCssClass("action-anotar_prontuario")
                .onClick(function() {
                    console.log("Action: Anotar prontuario");
                    if ( core.flag("score_ergueu_grade") == false ) {
                        if ( core.flag("score_nao_ergueu_grade") == false ) {
                            core.registerScoreItem( Scores.naoElevarGradeDaCama );
                            core.flag("score_nao_ergueu_grade",  true );
                        }
                        core.closeCommandBar();
                        core.openDialog( 17 );
                    } else {
                        if ( core.flag("score_anotar_prontuario") == false ) {
                            core.registerScoreItem( Scores.anotarNoProntuario );
                            core.flag("score_anotar_prontuario",  true );
                        }
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                    }
                })
                .setVisibility( false ),



            // LIXOS

              new Action("btn-lixoComum", "Lixo Comum")
                .setCssClass("action-lixo_comum")
                .onClick(function() {

                    core.setActionVisible("btn-lixoComum", false );
                    core.setActionVisible("btn-lixoInfectante", false  );
                    core.setActionVisible("btn-perfuroCortante", false  );

                    core.setActionVisible("btn-realizar_teste_glicemia", false );
                    core.setActionVisible("btn-materiaisCurativo",  true );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setActionVisible("btn-calcar_luvas_procedimento",  true );
                    core.setActionVisible("btn-calcar_luvas_estereis",  true );
                    core.setActionVisible("btn-verificar_teste_glicemia",  true );


                    if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", false );
                    }

                     if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == false){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", true );
                    }

                     if(core.flag("descartar_algodao") == false && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", true );
                              core.setActionVisible("btn-descartar_agulha", false );
                    }



                })
                .setVisibility( false ),


              new Action("btn-lixoInfectante", "Lixo Infectante")
                .setCssClass("action-lixo_infectante")
                .onClick(function() {


                    core.setActionVisible("btn-lixoComum", false );
                    core.setActionVisible("btn-lixoInfectante", false  );
                    core.setActionVisible("btn-perfuroCortante", false  );

                    core.setActionVisible("btn-realizar_teste_glicemia", false );
                    core.setActionVisible("btn-materiaisCurativo",  true );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setActionVisible("btn-calcar_luvas_procedimento",  true );
                    core.setActionVisible("btn-calcar_luvas_estereis",  true );
                    core.setActionVisible("btn-verificar_teste_glicemia",  true );


                    if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", false );

                            if(core.flag("score_algodao") == false){
                                core.flag("score_algodao", true);
                                 core.registerScoreItem( Scores.jogarAlgodaoBandeja );
                            }
                    }

                     if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == false){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", true );

                          if(core.flag("score_algodao") == false){
                                core.flag("score_algodao", true);
                                 core.registerScoreItem( Scores.jogarAlgodaoBandeja );
                            }

                    }

                     if(core.flag("descartar_algodao") == false && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", true );
                              core.setActionVisible("btn-descartar_agulha", false );
                    }

                })
                .setVisibility( false ),


              new Action("btn-perfuroCortante", "Perfuro Cortante")
                .setCssClass("action-lixo_perfuro_cortante")
                .onClick(function() {


                    core.setActionVisible("btn-lixoComum", false );
                    core.setActionVisible("btn-lixoInfectante", false  );
                    core.setActionVisible("btn-perfuroCortante", false  );

                    core.setActionVisible("btn-realizar_teste_glicemia", false );
                    core.setActionVisible("btn-materiaisCurativo",  true );
                    core.setActionVisible("btn-lavarMaos", true );
                    core.setActionVisible("btn-calcar_luvas_procedimento",  true );
                    core.setActionVisible("btn-calcar_luvas_estereis",  true );
                    core.setActionVisible("btn-verificar_teste_glicemia",  true );


                    if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", false );

                            if(core.flag("score_agulha") == false){
                                core.flag("score_agulha", true);
                                 core.registerScoreItem( Scores.jogarAgulhaLixoCerto );
                            }
                    }

                     if(core.flag("descartar_algodao") == true && core.flag("descartar_agulha") == false){
                              core.setActionVisible("btn-jogar_algodao", false );
                              core.setActionVisible("btn-descartar_agulha", true );



                    }

                     if(core.flag("descartar_algodao") == false && core.flag("descartar_agulha") == true){
                              core.setActionVisible("btn-jogar_algodao", true );
                              core.setActionVisible("btn-descartar_agulha", false );


                          if(core.flag("score_agulha") == false){
                                core.flag("score_agulha", true);
                                 core.registerScoreItem( Scores.jogarAgulhaLixoCerto );
                            }
                    }

                })
                .setVisibility( false )


        ]);


        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function() {
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
            });

        postoDeEnfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    if ( core.flag("score_pegou_kit_glicemia") == true &&
                        core.flag("score_pegou_algodao") == true &&
                        core.flag("score_pegou_luvas") == true &&
                        // core.flag("score_pegou_bandeja") == true &&
                        core.flag("score_pegou_luvas_estereis") == true &&
                        core.flag("score_pegou_gaze") == true &&
                        core.flag("score_pegou_fita_hipoalergenica") == true &&
                        core.flag("score_pegou_soro") == true &&
                        core.flag("score_pegou_seringa") == true &&
                        core.flag("score_pegou_agulha") == true ) {
                        // Libera o acesso ao leito da Esther
                        if ( core.flag("pegou_todos_instrumentos") == false ) {
                            core.registerScoreItem( Scores.pegarTodosInstrumentos );
                            core.flag("pegou_todos_instrumentos",  true );
                        }
                    }
                    core.changeScene( 1 );
                })
                .setVisibility( true ),

            new Action("btn-lavarMaos", "Lavar as mãos")
                .setCssClass("action-lavarMaos")
                .onClick(function() {
                    // Som
                    Player.play( Player.audios.sfx.lavarMaos );
                    if ( core.flag("score_lavar_maos_posto_enfermagem") == false ) {
                        core.registerScoreItem( Scores.lavarMaosPostoEnfermagem );
                        core.flag("score_lavar_maos_posto_enfermagem",  true );
                    }
                })
                .setVisibility( true ),

             new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {

                    Prontuario.open("prescMedica");
                    core.openModalScene("Prontuario");
                })
                .setVisibility( true ),

        ]);

        postoDeEnfermagem.registerInteractiveObjects([
            new InteractiveObject("io-abrirGaveta", "Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function() {
                    if ( core.flag("pegou_bandeja") != true ) {
                        core.openDialog( 0 );
                    } else {
                        console.log("Action: abrirGaveta");
                        // Som
                        Player.play( Player.audios.sfx.abrirGaveta );
                        core.openModalScene("gaveta");
                        core.openCommandBar();
                        core.setInteractiveObjectVisible("io-kit_glicemia", !(core.flag("score_pegou_kit_glicemia")) );
                        core.setInteractiveObjectVisible("io-algodao", !(core.flag("score_pegou_algodao")) );
                        core.setInteractiveObjectVisible("io-luvas", !(core.flag("score_pegou_luvas")) );
                        core.setInteractiveObjectVisible("io-luvas_estereis", !(core.flag("score_pegou_luvas_estereis")) );
                        core.setInteractiveObjectVisible("io-gaze", !(core.flag("score_pegou_gaze")) );
                        core.setInteractiveObjectVisible("io-fita_hipoalergenica", !(core.flag("score_pegou_fita_hipoalergenica")) );
                        core.setInteractiveObjectVisible("io-soro", !(core.flag("score_pegou_soro")) );
                        core.setInteractiveObjectVisible("io-seringa", !(core.flag("score_pegou_seringa")) );
                        core.setInteractiveObjectVisible("io-agulha", !(core.flag("score_pegou_agulha")) );
                    }
                })
                .setVisibility( true ),

            // Bandeja
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

        postoDeEnfermagem.registerDialogs([
            // Dialog 0 - Não pegou bandeja
            new Dialog( lib.characters.mentor )
                .setText( Alertas.esqueceu.pegarBandeja )
                .registerOption("", function() {
                    core.closeDialog();
                })
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
                    core.openCommandBar();
                })
                .setVisibility( true )
        ]);

        // Acertar posicoes
        gaveta.registerInteractiveObjects([
            // Kit glicemia
            new InteractiveObject("io-kit_glicemia", "Kit de glicemia")
                .setCssClass("intObj-aparelhoGlicemia")
                .onClick(function() {
                    console.log("Action: pegar kit de glicemia");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarKitGlicemia );
                    core.setInteractiveObjectVisible("io-kit_glicemia", false );
                    core.flag("score_pegou_kit_glicemia",  true );
                })
                .setVisibility( true ),

            // Algodao
            new InteractiveObject("io-algodao", "Algodão")
                .setCssClass("intObj-algodao_seco")
                .onClick(function() {
                    console.log("Action: pegar algodao ");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarAlgodao );
                    core.setInteractiveObjectVisible("io-algodao", false );
                    core.flag("score_pegou_algodao",  true );
                })
                .setVisibility( true ),

            // Luvas
            new InteractiveObject("io-luvas", "Luvas")
                .setCssClass("intObj-luvas_de_procedimento_fase5")
                .onClick(function() {
                    console.log("Action: pegar luvas");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarLuvas );
                    core.setInteractiveObjectVisible("io-luvas", false );
                    core.flag("score_pegou_luvas",  true );
                })
                .setVisibility( true ),

            // Luvas estéreis
            new InteractiveObject("io-luvas_estereis", "Luvas Estéreis")
                .setCssClass("intObj-luvas_estereis")
                .onClick(function() {
                    console.log("Action: pegar luvas estéreis");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarLuvasEstereis );
                    core.setInteractiveObjectVisible("io-luvas_estereis", false );
                    core.flag("score_pegou_luvas_estereis",  true );
                })
                .setVisibility( true ),

            // Gaze esterelizada
            new InteractiveObject("io-gaze", "Gaze Esterelizada")
                .setCssClass("intObj-gaze_esteril")
                .onClick(function() {
                    console.log("Action: pegar gaze ");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarGaze );
                    core.setInteractiveObjectVisible("io-gaze", false );
                    core.flag("score_pegou_gaze",  true );
                })
                .setVisibility( true ),

            // Fita adesiva hipoalergênica
            new InteractiveObject("io-fita_hipoalergenica", "Fita Adesiva Hipoalergênica")
                .setCssClass("intObj-fita_adesiva_hipoalergenica_micropore")
                .onClick(function() {
                    console.log("Action: pegar fita adesiva hipoalergênica");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarFitaHipoalergenica );
                    core.setInteractiveObjectVisible("io-fita_hipoalergenica", false );
                    core.flag("score_pegou_fita_hipoalergenica",  true );
                })
                .setVisibility( true ),

            // Soro Fisiológico 0,9% (250 ml) aquecido
            new InteractiveObject("io-soro", "Soro Fisiológico 0,9% (250 ml) Aquecido")
                .setCssClass("intObj-soro_fisiologico_250_ml")
                .onClick(function() {
                    console.log("Action: pegar soro fisiológico 0,9% (250 ml) aquecido");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarSoro );
                    core.setInteractiveObjectVisible("io-soro", false );
                    core.flag("score_pegou_soro",  true );
                })
                .setVisibility( true ),

            // Seringa de 20 ml
            new InteractiveObject("io-seringa", "Seringa de 20 ml")
                .setCssClass("intObj-seringa_20_ml")
                .onClick(function() {
                    console.log("Action: pegar seringa de 20 ml");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarSeringa );
                    core.setInteractiveObjectVisible("io-seringa", false );
                    core.flag("score_pegou_seringa",  true );
                })
                .setVisibility( true ),

            // Agulha 40X12
            new InteractiveObject("io-agulha", "Agulha 40X12")
                .setCssClass("intObj-agulha_40x12")
                .onClick(function() {
                    console.log("Action: pegar agulha 40X12 ");
                    // Som
                    Player.play( Player.audios.sfx.pegarObjeto );
                    core.registerScoreItem( Scores.pegarAgulha );
                    core.setInteractiveObjectVisible("io-agulha", false );
                    core.flag("score_pegou_agulha",  true );
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


        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            // TODO Verificar se prontuario está preenchido
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    // Já estava no momento de realizar os procedimentos, portanto pode terminar a fase
                    if ( core.flag("score_falar_paciente") == true ) {
                        core.unlockLevel( 7 );
                        core.closeCommandBar();
                        core.showEndOfLevel();
                        Player.stopAll();
                        Player.play( Player.audios.sfx.missaoCumprida );
                    } else {
                        core.closeModalScene("Prontuario");
                        core.setInteractiveObjectVisible("io-ir_corredor", true );
                    }
                })
                .setVisibility( true )

            //  alert(Prontuario.isDataValid() + " Final da fase");
        ]);

            glicosimetroComFita = new Scene("modalGlicosimetroComFita", "modalGlicosimetroComFita")
            .setCssClass("modalScene-glicosimetroComFita")
            .setTemplate("<span class='glicosimetro-text'>100 mg/dl</span>");

        glicosimetroComFita.registerActions([

            new Action("btn-realizar_teste_glicemia", "Terminar teste de glicemia capilar")
                .setCssClass("action-realizar_teste_glicemia")
                .onClick(function() {

                    core.closeModalScene("modalGlicosimetroComFita");


                    core.setActionVisible("btn-realizar_teste_glicemia", false);
                    core.setActionVisible("btn-verificar_teste_glicemia", true);



                })
                .setVisibility( true ),



        ]);


        glicosimetro = new Scene("modalGlicosimetro", "modalGlicosimetro")
            .setCssClass("modalScene-glicosimetro")
            .setTemplate("<span class='glicosimetro-text'>100 mg/dl</span>");

        glicosimetro.registerActions([
            new Action("btn-realizar_teste_glicemia", "Fechar teste de glicemia capilar")
                .setCssClass("action-realizar_teste_glicemia")
                .onClick(function() {
                    core.closeModalScene("modalGlicosimetro");
                })
                .setVisibility( true )
        ]);


        // Register in level

        // 0
        level.registerScene( recepcao );
        // 1
        level.registerScene( corredor );
        // 2
        level.registerScene( alaFeminina );
        // 3
        level.registerScene( leito );
        // 4
        level.registerScene( postoDeEnfermagem );

        level.registerModalScene( pulseira );
        level.registerModalScene( gaveta );
        level.registerModalScene( prontuario );
        level.registerModalScene( glicosimetro );
        level.registerModalScene( glicosimetroComFita );

        // level init script
        level.setSetupScript(function() {

            Pulseira.setNameRegExp( /Esther Fidelis/ );
            Pulseira.setLeitoRegExp( /0*2/ );
            Pulseira.setDataRegExp( /05\/12\/1955/ );

            Pulseira.setName("Esther Fidelis");
            Pulseira.setLeito("02");
            Pulseira.setData("05/12/1955");
            Pulseira.disable();

            Prontuario.setNome("Esther Fidelis");
            Prontuario.setSexo("F");
            Prontuario.setEstadoCivil("Casada");
            Prontuario.setDataNascimento("05/12/1955");
            Prontuario.setIdade("60 anos");
            Prontuario.setProfissao("Diplomata");

            Prontuario.setPai("Apolo Zovadelli Fidelis");
            Prontuario.setMae("Laura Rodrigues Fidelis");

            Prontuario.setAlergiaMedicamentosa( false, "");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("02/11/2015");
            Prontuario.setLeito("02 - Enfermaria Feminina");
            Prontuario.setAntecedentes("Quatro internações devido à quadro de hiperglicemia entre os anos de 2012 à 2013.");
            Prontuario.setHipotese("Acidente vascular encefálico isquêmico (AVCI). Possui lesão no braço esquerdo devido à queda.");
            Prontuario.setObservacoes("Teve trombose venosa profunda, diabetes mellitus tipo II e pressão arterial sistêmica. Tabagista há 40 anos.");

            Prontuario.setPeso("56");
            Prontuario.setAltura("1,70");
            Prontuario.setCircunferenciaAbdominal("82");

            Prontuario.setPrescMedicaRowData( 0, "", "Fondaparinux Sódico", "Oral", "7,5 mg (1x ao dia)", "07h", true, true );
            Prontuario.setPrescMedicaRowData( 1, "", "Atenolol", "Oral", "100 mg (2x ao dia)", "08h - 18h", true, true );
            Prontuario.setPrescMedicaRowData( 2, "", "Metmorfina", "Oral", "750 mg (2x ao dia)", "06h - 17h", true, true );
            Prontuario.setPrescMedicaRowData( 3, "", "Glibenclamida", "Oral", "4 mg (2x ao dia)", "07:30h - 17:30h", true, true );

            Prontuario.setPrescEnfermagemState([" decubito_visual", "verificar_glicemia2", "levantar_grade", "troca_curativo" ]);

            Prontuario.setSsvvRowData( 0, "", "120x70", "46", "15", "96", "35", true );
            Prontuario.setSsvvRowData( 1, "", "130x80", "52", "18", "94", "36", true );

            Prontuario.setAnotacaoEnfermagemRowData("", "");
        });


        level.registerFlag( new Flag( "conversar_recepcionista",  false  ) );
        level.registerFlag( new Flag( "conversar_mentor",  false  ) );
        level.registerFlag( new Flag( "entrou_ala_feminina",  false  ) );
        level.registerFlag( new Flag( "pegou_bandeja",  false  ) );
        level.registerFlag( new Flag( "pegou_todos_instrumentos",  false  ) );
        level.registerFlag( new Flag( "score_ir_posto_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_farmacia_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_ala_feminina_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_alaMasculina_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ir_alaMasculina_apos_fala_mentor",  false  ) );
        level.registerFlag( new Flag( "score_ir_centro_cirurgico_hora_errada",  false  ) );
        level.registerFlag( new Flag( "score_ver_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_nao_viu_prontuario",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_posto_enfermagem",  false  ) );
        level.registerFlag( new Flag( "score_pegou_kit_glicemia",  false  ) );
        level.registerFlag( new Flag( "score_pegou_algodao",  false  ) );
        level.registerFlag( new Flag( "score_pegou_luvas",  false  ) );
        // level.registerFlag( new Flag( "score_pegou_bandeja",  false  ) );
        level.registerFlag( new Flag( "score_pegou_luvas_estereis",  false  ) );
        level.registerFlag( new Flag( "score_pegou_gaze",  false  ) );
        level.registerFlag( new Flag( "score_pegou_fita_hipoalergenica",  false  ) );
        level.registerFlag( new Flag( "score_pegou_soro",  false  ) );
        level.registerFlag( new Flag( "score_pegou_seringa",  false  ) );
        level.registerFlag( new Flag( "score_pegou_agulha",  false  ) );
        level.registerFlag( new Flag( "score_lavar_maos_antes_leito",  false  ) );
        level.registerFlag( new Flag( "score_falar_paciente",  false  ) );
        level.registerFlag( new Flag( "score_nao_falar_paciente",  false  ) );
        level.registerFlag( new Flag( "score_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_nao_verificar_pulseira",  false  ) );
        level.registerFlag( new Flag( "score_fez_teste_glicemia",  false  ) );
        level.registerFlag( new Flag( "score_nao_fez_teste_glicemia",  false  ) );
        level.registerFlag( new Flag( "score_jogou_agulha_lixo_certo",  false  ) );
        level.registerFlag( new Flag( "score_nao_jogou_agulha_lixo_certo",  false  ) );
        level.registerFlag( new Flag( "score_jogou_algodao_na_bandeja",  false  ) );
        level.registerFlag( new Flag( "score_nao_jogou_algodao_na_bandeja",  false  ) );
        level.registerFlag( new Flag( "score_selecionou_materiais_curativo",  false  ) );
        level.registerFlag( new Flag( "score_nao_selecionou_materiais_curativo",  false  ) );
        level.registerFlag( new Flag( "score_lavou_maos_antes_calcar_luva",  false  ) );
        level.registerFlag( new Flag( "score_nao_lavou_maos_antes_calcar_luva",  false  ) );
        level.registerFlag( new Flag( "score_luvas_de_procedimento",  false  ) );
        level.registerFlag( new Flag( "score_luva_esteril",  false  ) );
        level.registerFlag( new Flag( "score_nao_luva_esteril",  false  ) );
        level.registerFlag( new Flag( "score_fez_curativo",  false  ) );
        level.registerFlag( new Flag( "score_nao_fez_curativo",  false  ) );
        level.registerFlag( new Flag( "score_identificou_curativo",  false  ) );
        level.registerFlag( new Flag( "score_nao_identificou_curativo",  false  ) );
        level.registerFlag( new Flag( "score_ergueu_grade",  false  ) );
        level.registerFlag( new Flag( "score_nao_ergueu_grade",  false  ) );
        level.registerFlag( new Flag( "score_anotar_prontuario",  false  ) );
        level.registerFlag( new Flag( "descartar_agulha",  false  ) );
        level.registerFlag( new Flag( "descartar_algodao",  false  ) );
        level.registerFlag( new Flag( "score_agulha",  false  ) );
        level.registerFlag( new Flag( "score_algodao",  false  ) );
        level.registerFlag( new Flag( "score_pulseira",  false  ) );
        level.registerFlag( new Flag( "verificar_pulseira",  false  ) );


        level.setInitialScene( 0 );

        game.registerLevel( level, 6 );

        console.groupEnd();

    }
);
