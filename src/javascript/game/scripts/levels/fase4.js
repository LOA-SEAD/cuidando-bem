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

    var Dialogs = require("DialogsData").fase4;
    var Alertas = require("DialogsData").alertas;
    Scores = Scores.fase4;
    var Player = require("Player");


    var level = new Level("Level 4");
    level.setMaxPoints( Scores._sum );
    console.groupCollapsed( level.getName() );


    var recepcao,
      corredor,
      alaFeminina,
      centroCirurgico,
      salaDeLeitos,
      leito,
      postoDeEnfermagem,
      farmacia,
      alaFemininaVazia,
      gaveta,
      pulseira,
      prontuario,
      zoom;


    var recepcao = lib.scenes.recepcao.getClone()
      .onLoad(function() {
        console.log("Load scene: " + recepcao.getName() );

        if ( core.flag("conversar_recepcionista") == false ) {

          core.flag("conversar_recepcionista", true );
          core.openDialog( 0 );

        }

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
      new Dialog( lib.characters.recepcionista )
        .setText( Dialogs.recepcao[ 0 ] )
        .registerOption("", function() {
          core.closeDialog();
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


    corredor = lib.scenes.corredor.getClone()
      .onLoad(function() {
        console.log("Entrando no corredor");

        core.openCommandBar();
        core.setActionVisible("btn-ir_recepcao", true );

        // Player.stopAll();
        // Som
        Player.play( Player.audios.sfx.abrirPorta );
        Player.playInLoop( Player.audios.loops.recepcao );
        if ( core.flag("conversar_mentor") == false ) {
          // primeira passada
          core.flag("conversar_mentor", true );
          core.openDialog( 0 );
        }
        // Desabilita o mentor por um tempinho
        if ( core.flag("testar_equipamentos") == true &&
          core.flag("conversarPaciente") == true ) {
          core.setInteractiveObjectVisible("io-conversar_mentor", false );
        }
        // Reabilita o mentor para o final da fase
        if ( core.flag("fim_fase") == true ) {
          core.setInteractiveObjectVisible("io-conversar_mentor", true );
        }
      })
      .onUnload(function() {
        console.log("Saindo do corredor");
        Player.stopLoop();
        // Som
        Player.play( Player.audios.sfx.abrirPorta );
        // Player.playInRange( Player.audios.musics.inGame );
      });

    corredor.registerActions([

      new Action("btn-ir_recepcao", "Voltar para a recepção")
        .setCssClass("action-voltarRecepcao")
        .onClick(function() {

          core.changeScene( 0 );

        })
        .setVisibility( true )

    ]);

    corredor.registerDialogs([
      // Primeira passada pelo corredor

      // 0
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor.fala1[ 0 ] )
        .registerOption("", function() {
          core.flag("conversar_mentor", true );
          core.openDialog( 1 );
        }),

      // 1
      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.corredor.fala1[ 1 ], function() {
          core.openDialog( 4 );
        })
        .registerOption( Dialogs.corredor.fala1[ 2 ], function() {
          core.openDialog( 3 );
        })
        .registerOption( Dialogs.corredor.fala1[ 3 ], function() {
          core.openDialog( 2 );
        })
        .setRandomize( true ),


      // 2 Mentor Corrige
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor.fala1[ 6 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),
      // 3 Mentor Corrige
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor.fala1[ 5 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),
      // 4 Mentor fala
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor.fala1[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),


      // Segunda passada pelo corredor


      // 5
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.corredor.fala1[ 7 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),


      // 6
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.corredor.fala2[ 0 ] )
        .registerOption("", function() {
          core.flag("conversar_mentor2", true );
          core.openDialog( 7 );
        }),


      // 7
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor.fala2[ 1 ] )
        .registerOption("", function() {
          core.flag("conversar_mentor2", true );
          core.closeDialog();
          core.unlockLevel( 5 );
          core.closeCommandBar();
          core.showEndOfLevel();
          Player.stopAll();
          Player.play( Player.audios.sfx.missaoCumprida );
        }),


      // 8 - alerta farmacia
      new Dialog( lib.characters.mentor )
        .setText( Alertas.perdido.enfermagem[ 1 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 9 - alerta centro Cirurgico
      new Dialog( lib.characters.mentor )
        .setText( Alertas.perdido.centroCirugico )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);


    // FUNCOES


    function corredorIrCentroCirurgico() {
      console.log("Action: corredorIrCentroCirurgico");
      if ( core.flag("conversarPaciente") == false ) {
        core.changeScene( 2 );
      } else {
        core.changeScene( 7 );
      }
    }


    function corredorIrAlaFeminina() {
      console.log("Action: corredorIrAlaFeminina");
      if ( core.flag("testar_equipamentos") == true ) {
        if ( core.flag("conversarPaciente") == false ) {
          core.changeScene( 3 );
        } else {
          if ( core.flag("ir_alaFeminina_horaErrada") == false ) {
            // core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
            core.flag("ir_alaFeminina_horaErrada", true );
          }
          core.changeScene( 8 );
        }
      } else {
        if ( core.flag("ir_alaFeminina_horaErrada") == false ) {
          // core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
          core.flag("ir_alaFeminina_horaErrada", true );
        }
        core.openDialog( 9 );
      }
    }


    function corredorIrFarmacia() {
      console.log("Action: corredorIrFarmaciaHoraErrada");
      core.openDialog( 8 );
      if ( core.flag("ir_farmacia_horaErrada") == false ) {
        // core.registerScoreItem( Scores.irFarmaciaHoraErrada );
        core.flag("ir_farmacia_horaErrada", true );

      }
    }


    function corredorIrPostoEnfermagem() {
      console.log("Action: corredorIrPostoEnfermagem");
      core.openDialog( 8 );
      if ( core.flag("ir_postoEnfermagem_horaErrada") == false ) {
        // core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
        core.flag("ir_postoEnfermagem_horaErrada", true );
      }
    }

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


      new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
        .setCssClass("intObj-talkToMentor")
        .onClick(function() {
          core.closeCommandBar();
          console.log("Abrir diálogo com o mentor");
          if ( core.flag("testar_equipamentos") == false ) {
            core.openDialog( 0 );
          } else {
            if ( core.flag("testar_equipamentos") == true &&
              core.flag("conversarPaciente") == false ) {
              // segunda passada
              core.openDialog( 5 );
            }
          }


          if ( core.flag("fim_fase") == true ) {
            core.openDialog( 6 );
          }
        })
        .setVisibility( true )

    ]);


    var centroCirurgico = lib.scenes.centroCirurgico.getClone()
      .onLoad(function() {
        console.log("Load scene: " + centroCirurgico.getName() );
        core.openDialog( 0 );
      })
      .onUnload(function() {
        core.closeCommandBar();
      });


    centroCirurgico.registerDialogs([


      // primeira passada pelo centro cirurgico

      // 0 - Aline fala
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 0 ] )
        .registerOption("", function() {
          core.flag("conversar_circulante", true );
          core.openDialog( 1 );
        }),

      // 1 Jogador responde
      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.centroCirurgico.fala1[ 1 ], function() {
          core.closeDialog();
        })
        .registerOption( Dialogs.centroCirurgico.fala1[ 2 ], function() {
          core.openDialog( 2 );
        })
        .registerOption( Dialogs.centroCirurgico.fala1[ 3 ], function() {
          core.openDialog( 3 );
        })
        .setRandomize( true ),

      // 2 op errada1
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 5 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 3 op errada2

      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 6 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 4  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala1[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),


      // 5 alerta lavar maos cirurgica
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 7 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 6 alerta lavar maos
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 8 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 7 alerta testar equipamentos
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala1[ 9 ] )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);

    function centroCirurgicoIrCorredor() {
      console.log("Action: centroCirurgicoIrCorredor");
      if ( core.flag("testar_equipamentos") == false ) {
        core.openDialog( 0 );
      } else {
        core.changeScene( 1 );
      }
    }

    centroCirurgico.registerInteractiveObjects([


      new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
        .setCssClass("intObj-talkToCirculante")
        .onClick(function() {
          console.log("Abrir diálogo com a circulante");
          if ( core.flag("conversarPaciente") == false || core.flag("testar_equipamentos") == false ) {
            core.openDialog( 0 );
          } else {
            core.openDialog( 5 );
          }

        })
        .setVisibility( true ),


      new InteractiveObject("io-carrinho_anestesico", "Testar Equipamentos")
        .setCssClass("intObj-carrinho_anestesico")
        .onClick(function() {
          // Bip
          Player.play( Player.audios.sfx.bip );
          if ( core.flag("lavar_maos_cirurgica") == false ) {
            core.openDialog( 5 );
          } else {

            console.log("Action: testar equipamentos");
            if ( core.flag("testar_equipamentos") == false ) {
              core.flag("testar_equipamentos", true );
              core.registerScoreItem( Scores.testarEquipamentos );
              core.openDialog( 4 );
            }


          }

        })
        .setVisibility( true )

    ]);


    centroCirurgico.registerActions([

      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );
          if ( core.flag("lavarMaos") == false ) {
            console.log("Action: lavarMaos");
            core.flag("lavarMaos", true );
            // core.registerScoreItem( Scores.lavarMaosHoraErrada );
            core.openDialog( 5 );
          }
        }),


      new Action("btn-lavar_maos_cirurgica", "Anti-sepsia cirúrgica")
        .setCssClass("action-lavar_maos_escova")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );
          if ( core.flag("lavar_maos_cirurgica") == false ) {
            console.log("Action: lavarMaos cirurgica");
            core.registerScoreItem( Scores.lavarMaosCirurgica );
            core.flag("lavar_maos_cirurgica", true );
          }


        }),


      new Action("btn-ir_corredor", "Ir ao corredor")
        .setCssClass("action-ir_corredor")
        .onClick(function() {
          if ( core.flag("testar_equipamentos") == false ) {
            // MENTOR: TESTAR EQUIPAMENTOS
            core.openDialog( 7 );
          } else {
            core.flag("primeira_saida_centro_cirurgico", true );
            centroCirurgicoIrCorredor();
          }
        })


    ]);


    var alaFeminina = new Scene("alaFeminina", "Ala Feminina")
      .setCssClass("scene-bedroom-level3")
      .onLoad(function() {
        core.openCommandBar();
        console.log("Load scene: " + alaFeminina.getName() );

        if ( core.flag("conversarPaciente") == true ) {
          // Desabilita conversar novamente com a Regina
          core.setInteractiveObjectVisible("io-conversar_com_paciente", false );

        }
      })
      .onUnload(function() {
        core.closeCommandBar();
      });


    alaFeminina.registerActions([


      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );
          if ( core.flag("lavar_maos2") == false ) {
            console.log("Action: lavar_maos2");
            core.flag("lavar_maos2", true );
            core.registerScoreItem( Scores.lavarMaos2 );
          }
        })
        .setVisibility( true )


    ]);


    alaFeminina.registerDialogs([


      // 0 - Mentor
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo1 )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 1 - Mentor
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo2 )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 2 - Mentor: Não lavou mãos antes de pegar no prontuário
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo3 )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);


    alaFeminina.registerInteractiveObjects([

      new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
        .setCssClass("intObj-ir_leito_fase3")
        .onClick(function() {
          if ( core.flag("lavar_maos2") == false ) {
            if ( core.flag("score_nao_lavou_maos") == false ) {
              // core.registerScoreItem( Scores.naoLavarMaos );
              core.flag("score_nao_lavou_maos", true );
            }
            core.openDialog( 2 );
          } else {
            if ( core.flag("ir_leito_paciente") == false ) {
              core.flag("ir_leito_paciente", true );
              console.log("Abrir diálogo com paciente 4");
              core.registerScoreItem( Scores.irAoLeitoCorreto );
              core.changeScene( 4 );
            }
          }
        })
        .setVisibility( true ),


      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
        .setCssClass("intObj-irAlaFeminina_corredor")
        .onClick(function() {
          console.log("voltando para corredor");
          core.changeScene( 1 );
        })


    ]);


    var leito = lib.scenes.leitos.regina.getClone()
      .onLoad(function() {
        console.log("Load scene: " + leito.getName() );
        console.log("Abrindo dialogo com paciente");
        //  core.openDialog( 0 );
      });


    leito.registerActions([

      new Action("btn-ir_centro_cirurgico", "Ir para sala de cirurgia")
        .setCssClass("action-irCentroCirurgico")
        .onClick(function() {

          if ( core.flag("verificar_pulseira") == true ) {

            core.registerScoreItem( Scores.encaminharPacienteCentroCirurgico );
            core.changeScene( 7 );

          } else {

            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              // core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );

          }

        })
        .setVisibility( false ),

      new Action("btn-ler_prontuario", "Ler prontuario")
        .setCssClass("action-ler_prontuario")
        .onClick(function() {


          if ( core.flag("verificar_pulseira") == true ) {

            console.log("Action: ler prontuario");
            Prontuario.open();
            core.openModalScene("Prontuario");

            if ( core.flag("ler_prontuario") == false ) {
              core.flag("ler_prontuario", true );
              core.registerScoreItem( Scores.pegarProntuario );
            }
          } else {

            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              // core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );
          }
        })
        .setVisibility( true )


    ]);


    leito.registerInteractiveObjects([

      new InteractiveObject("io-conversar_paciente04", "Falar com a paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {

          core.openDialog( 0 );
          core.setActionVisible("btn-ir_centro_cirurgico", true );
          core.setActionVisible("btn-ler_prontuario", true );
          core.enableInteractiveObject("io-pulseira_paciente", true );
        }),

      new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_04-checar_pulseira")
        .onClick(function() {

          core.flag("verificar_pulseira", true );

          core.openModalScene("pulseira");
          Pulseira.open();
          core.openCommandBar();
          //     }
        })
        .setVisibility( true )
        .setEnable( false )


    ]);


    leito.registerDialogs([

      // 0
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 0 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),


      // 1
      new Dialog( lib.characters.pacientes.regina )
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
      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.leitoPaciente[ 3 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),

      // 4
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 4 ] )
        .registerOption("", function() {
          core.openDialog( 5 );
        }),


      // 5
      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.leitoPaciente[ 5 ] )
        .registerOption("", function() {
          // Som
          Player.play( Player.audios.sfx.mesaComRodinha );
          // Só aqui é habilitado a Regina Ir ao centro cirurgico
          core.flag("conversarPaciente", true );
          // Desabilita conversar novamente com a Regina
          core.setInteractiveObjectVisible("io-conversar_paciente04", false );
          core.closeDialog();
        }),

      // 6
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.informarPaciente )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 7
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.verPulseira )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);


    // FARMACIA

    var farmacia = lib.scenes.farmacia.getClone()
      .onLoad(function() {
        console.log("Load scene: " + farmacia.getName() );
      });

    // POSTO DE ENFERMAGEM

    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
      .onLoad(function() {
        console.log("Load scene: " + postoDeEnfermagem.getName() );
      });


    var centroCirurgicoRegina = new Scene("centroCirurgicoRegina", "scene-centroCirurgicoRegina")
      .setCssClass("scene-centroCirurgicoRegina")
      .onLoad(function() {
        console.log("Entrando no centro cirurgico segunda vez");
        // core.openDialog( 0 );

        if ( core.flag("conversar_paciente_cc") == false ) {
          core.closeCommandBar();
        }

        core.setInteractiveObjectVisible("io-conversarPaciente", false );

      })
      .onUnload(function() {
        console.log("Saindo do centro cirurgico");

      });


    centroCirurgicoRegina.registerActions([


      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );
          if ( core.flag("lavar_maos3") == false ) {
            core.flag("lavar_maos3", true );
          }
        }),


      new Action("btn-verificar_oximetro_local_cirurgia", "Verificar Oxímetro e Local da Cirurgia")
        .setCssClass("action-pegar_oximetro")
        .onClick(function() {
          console.log("Action: Verificando Paciente");
          // Bip
          Player.play( Player.audios.sfx.bipOximetro );
          core.flag("verificar_oximetro_local_cirurgia", true );
          core.openModalScene("modalOximetro");

        })
        .setVisibility( true ),


      new Action("btn-colocar_placa_neutra", "Colocar Placa Neutra")
        .setCssClass("action-placa_neutra")
        .onClick(function() {

          console.log("Action: Colocando placa neutra");

          core.flag("colocar_placa_neutra", true );

          if ( core.flag("verificar_oximetro_local_cirurgia") == false ) {
            core.openDialog( 21 );
          } else {
            core.registerScoreItem( Scores.colocarPlacaNeutra );
            core.changeSceneCssClassTo("scene-surgeryCenter-reginaComPlaca");
            core.setActionVisible("btn-colocar_placa_neutra", false );
          }

        })
        .setVisibility( true ),


      new Action("btn-anotarProntuario", "Anotar prontuario")
        .setCssClass("action-anotar_prontuario")
        .onClick(function() {
          console.log("Action: Anotar prontuario");
          if ( core.flag("lavar_maos3") == false ) {
            core.openDialog( 19 );
          } else {
            if ( core.flag("colocar_placa_neutra") == false ) {
              core.openDialog( 20 );
            } else {
              Prontuario.open();
              core.openModalScene("Prontuario");
            }
          }
        })
        .setVisibility( true ),

      new Action("btn-ir_corredor", "Ir ao corredor")
        .setCssClass("action-ir_corredor")
        .onClick(function() {
          console.log("Action: ir_corredor");
          // Voltar para o corredor
          core.changeScene( 1 );
        })
        .setVisibility( true )
    ]);


    centroCirurgicoRegina.registerDialogs([

      // 0
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala2[ 0 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 1

      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.centroCirurgico.fala2[ 1 ], function() {
          core.closeDialog();
          core.closeCommandBar();
        })
        .registerOption( Dialogs.centroCirurgico.fala2[ 2 ], function() {
          core.openDialog( 15 );
        })
        .registerOption( Dialogs.centroCirurgico.fala2[ 3 ], function() {
          core.openDialog( 16 );
        })
        .setRandomize( true ),


      // 2  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 4 ] )
        .registerOption("", function() {
          core.openDialog( 3 );
        }),


      // 3  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 5 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),

      // 4  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 6 ] )
        .registerOption("", function() {
          core.openDialog( 5 );
        }),


      // 5  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 7 ] )
        .registerOption("", function() {
          core.openDialog( 6 );
        }),

      // 6  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 8 ] )
        .registerOption("", function() {
          core.openDialog( 7 );
        }),


      // 7  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 9 ] )
        .registerOption("", function() {
          core.openDialog( 8 );
        }),


      // 8  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 10 ] )
        .registerOption("", function() {
          core.openDialog( 9 );
        }),


      // 9  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 11 ] )
        .registerOption("", function() {
          core.openDialog( 10 );
        }),


      // 10  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 12 ] )
        .registerOption("", function() {
          core.openDialog( 11 );
        }),


      // 11  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 13 ] )
        .registerOption("", function() {
          core.openDialog( 12 );
        }),

      // 12  jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.centroCirurgico.fala2[ 14 ] )
        .registerOption("", function() {
          core.openDialog( 13 );
        }),


      // 13  paciente

      new Dialog( lib.characters.pacientes.regina )
        .setText( Dialogs.centroCirurgico.fala2[ 15 ] )
        .registerOption("", function() {
          core.openDialog( 14 );
        }),

      // 14 jogador op

      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.centroCirurgico.fala2[ 16 ], function() {
          core.closeDialog();
          core.openCommandBar();
        })
        .registerOption( Dialogs.centroCirurgico.fala2[ 17 ], function() {
          core.openDialog( 17 );
        })
        .registerOption( Dialogs.centroCirurgico.fala2[ 18 ], function() {
          core.openDialog( 18 );
        })
        .setRandomize( true ),


      // 15 op2 - primeira parte
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala2[ 19 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 16 op3 - primeira parte
      // 20 op2 - primeira parte
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala2[ 20 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 17 op2 - segunda parte
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala2[ 21 ] )
        .registerOption("", function() {
          core.openDialog( 14 );
        }),

      // 18 op3 - segunda parte
      new Dialog( lib.characters.circulante )
        .setText( Dialogs.centroCirurgico.fala2[ 22 ] )
        .registerOption("", function() {
          core.openDialog( 14 );
        }),

      // 19 Alertar Lavar maos

      new Dialog( lib.characters.circulante )
        .setText( Alertas.lavarMaos.tipo2 )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 20 - alerta colocar placa neutra
      new Dialog( lib.characters.circulante )
        .setText( Alertas.esqueceu.coxim )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 21 - alerta verificar oximetro e local da cirurgia

      new Dialog( lib.characters.circulante )
        .setText( Alertas.esqueceu.verificarOximetro )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);


    centroCirurgicoRegina.registerInteractiveObjects([


      new InteractiveObject("io-conversar_circulante", "Conversar com Circulante")
        .setCssClass("intObj-talkToCirculante")
        .onClick(function() {

          console.log("Abrir diálogo com a circulante");
          core.openDialog( 0 );

          core.setInteractiveObjectVisible("io-conversarPaciente", true );
        })
        .setVisibility( true ),

      new InteractiveObject("io-conversarPaciente", "Conversar com a Paciente")
        .setCssClass("intObj-talkToPacienteRegina")
        .onClick(function() {
          console.log("Abrir diálogo com a paciente");
          core.openDialog( 2 );
          core.flag("conversar_paciente_cc", true );
        })


    ]);

    var alaFemininaVazia = new Scene("alaFemininaVazia", "scene-bedroom")
      .setCssClass("scene-bedroom")
      .onLoad(function() {
        console.log("Load scene: Ala feminina vazia");
      })
      .onUnload(function() {
        console.log("Ala feminina: OnUnload");
      });

    alaFemininaVazia.registerInteractiveObjects([
      new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
        .setCssClass("intObj-bedroomToHallway")
        .onClick(function() {
          // Voltar para o corredor
          core.changeScene( 1 );
        })
        .setVisibility( true )
    ]);


    var oximetro = new Scene("modalOximetro", "Oxímetro")
      .setCssClass("modalScene-oximetro")
      .setTemplate(
        "<span class='oximetro-st-text'>96% Sat.O2</span>" + "<span class='oximetro-fc-text'>47 bpm</span>"
      );

    oximetro.registerActions([
      new Action("btn-largar_oximetro", "Fechar Oxímetro")
        .setCssClass("action-largar_oximetro")
        .onClick(function() {
          core.closeModalScene("modalOximetro");
        })
        .setVisibility( true )
    ]);


    prontuario = new Scene("Prontuario", "Prontuario");

    prontuario.registerActions([
      new Action("btn-fechar_prontuario", "Fechar prontuário")
        .setCssClass("action-ler_prontuario")
        .onClick(function() {
          console.log("Action: Fechar prontuario");
          Prontuario.close();
          core.closeModalScene("Prontuario");

          if ( core.flag("score_anotar_prontuario") == false ) {
            core.registerScoreItem( Scores.anotarNoProntuario );
            core.flag("score_anotar_prontuario", true );
          }

          if ( core.flag("verificar_oximetro_local_cirurgia") == true &&
            core.flag("colocar_placa_neutra") == true ) {
            core.flag("fim_fase", true );
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


    level.registerModalScene( prontuario );
    level.registerModalScene( pulseira );
    level.registerModalScene( oximetro );


    // 0
    level.registerScene( recepcao );
    // 1
    level.registerScene( corredor );
    // 2
    level.registerScene( centroCirurgico );
    // 3
    level.registerScene( alaFeminina );
    // 4
    level.registerScene( leito );
    // 5
    level.registerScene( farmacia );
    // 6
    level.registerScene( postoDeEnfermagem );
    // 7
    level.registerScene( centroCirurgicoRegina );
    // 8
    level.registerScene( alaFemininaVazia );


    level.setSetupScript(function() {

      //  dados do prontuario
      Prontuario.setNome("Regina Oliveira");
      Prontuario.setSexo("F");
      Prontuario.setEstadoCivil("Viúva");
      Prontuario.setDataNascimento("19/04/1952");
      Prontuario.setIdade("63 anos");
      Prontuario.setProfissao("Costureira");
      Prontuario.setPai("Pedro Faria Oliveira");
      Prontuario.setMae("Maria das Graças Silva Oliveira");
      Prontuario.setAlergiaMedicamentosa( false, "");
      Prontuario.setDisableAlergiaMedicamentosa( true );
      Prontuario.setDataInternacao("09/12/2015");
      Prontuario.setLeito("03 - Enfermaria Feminina");
      Prontuario.setAntecedentes("");
      Prontuario.setHipotese("Insuficiência arterial periférica em membro inferior esquerdo. Procedimento cirúrgico a ser realizado: Cirurgia de Enxerto Poplíteo e Amputação transmetatársica à esquerda");
      Prontuario.setObservacoes("Diabetes Mellitus II e Hipertensão Arterial Sistêmica");
      Prontuario.setPeso("79");
      Prontuario.setAltura("1,50");
      Prontuario.setCircunferenciaAbdominal("132");

      Prontuario.setPrescMedicaRowData( 0, "", "Midazolam", "Oral", "15 mg", "06h", false, false );
      Prontuario.setPrescMedicaRowData( 1, "", "Cefalotina", "Endovenosa", "6 g (6 x ao dia)", "Cefalotina Endovenosa 6 g (6 x ao dia) 06h-12h-18h-24h", true, true );
      // Necessário para evitar que valores antigos apareçam no prontuário
      Prontuario.setPrescMedicaRowData( 2, "", "", "", "", "", false, true );
      Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

      // Caso não for possível escolher o local onde está a placa neutra terá que fazer um desse para cada fase que usa
      Prontuario.setPrescEnfermagemState([ "encaminhar_paciente_cc", "check_list_cirurgia", "placa_neutra" ]);

      Prontuario.setSsvvRowData( 0, "", "120x70", "47", "16", "96", "35.7", true );
      // Disable 2 row
      Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

      Prontuario.setAnotacaoEnfermagemRowData("", "");


      Pulseira.setNameRegExp( /^Regina Oliveira$/i );
      Pulseira.setLeitoRegExp( /0*3/ );
      Pulseira.setDataRegExp( /19\/04\/1952/ );

      Pulseira.setName("Regina Oliveira");
      Pulseira.setLeito("03");
      Pulseira.setData("19/04/1952");
      Pulseira.disable();


    });


    level.registerFlag( new Flag("conversar_mentor", false ) );
    level.registerFlag( new Flag("conversar_recepcionista", false ) );
    level.registerFlag( new Flag("testar_equipamentos", false ) );
    level.registerFlag( new Flag("conversar_mentor2", false ) );
    level.registerFlag( new Flag("ir_corredor_centro_cirurgico", false ) );
    level.registerFlag( new Flag("conversar_circulante", false ) );
    level.registerFlag( new Flag("lavar_maos_cirurgica", false ) );
    level.registerFlag( new Flag("lavarMaos", false ) );
    level.registerFlag( new Flag("lavar_maos2", false ) );
    level.registerFlag( new Flag("lavar_maos3", false ) );
    level.registerFlag( new Flag("score_nao_lavou_maos", false ) );
    level.registerFlag( new Flag("primeira_saida_centro_cirurgico", false ) );
    level.registerFlag( new Flag("conversarPaciente", false ) );
    level.registerFlag( new Flag("ir_alaFeminina_horaErrada", false ) );
    level.registerFlag( new Flag("ir_farmacia_horaErrada", false ) );
    level.registerFlag( new Flag("ir_postoEnfermagem_horaErrada", false ) );
    level.registerFlag( new Flag("score_anotar_prontuario", false ) );
    level.registerFlag( new Flag("colocar_placa_neutra", false ) );
    level.registerFlag( new Flag("score_placa_neutra", false ) );
    level.registerFlag( new Flag("verificar_oximetro_local_cirurgia", false ) );
    level.registerFlag( new Flag("fim_fase", false ) );
    level.registerFlag( new Flag("ir_leito_paciente", false ) );
    level.registerFlag( new Flag("ler_prontuario", false ) );
    level.registerFlag( new Flag("conversar_paciente_cc", false ) );
    level.registerFlag( new Flag("score_pulseira", false ) );
    level.registerFlag( new Flag("verificar_pulseira", false ) );


    level.setInitialScene( 0 );


    game.registerLevel( level, 4 );

    console.groupEnd();


  }
);
