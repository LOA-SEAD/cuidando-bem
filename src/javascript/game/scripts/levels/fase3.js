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

    var Dialogs = require("DialogsData").fase3;
    var Alertas = require("DialogsData").alertas;
    var Scores = require("ScoresData").fase3;
    var Player = require("Player");

    var level = new Level("Level 3");
    level.setMaxPoints( Scores._sum );
    console.groupCollapsed( level.getName() );

    // Scenes

    var recepcao,
      corredor,
      salaDeLeitos,
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

        if ( core.flag("conversar_recepcionista") == false ) {
          core.flag("conversar_recepcionista", true );
          core.openDialog( 0 );

        }

      });

    recepcao.registerDialogs([
      new Dialog( lib.characters.recepcionista )
        .setText( Dialogs.recepcao[ 0 ] )
        .registerOption("", function() {
          core.flag("conversar_recepcionista", true );
          core.closeDialog();
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
      if ( core.flag("pegou_tudo_gaveta") == false ) {
        core.openDialog( 5 );
      } else {
        core.changeScene( 2 );
      }
    }

    function corredorIrPostoEnfermagem() {
      if ( core.flag("checar_prontuario") == false ) {
        core.openDialog( 2 );
        if ( core.flag("score_ir_posto_hora_errada") == false ) {
          //core.registerScoreItem( Scores.irPostoEnfermagemHoraErrada );
          core.flag("score_ir_posto_hora_errada", true );
        }
      } else {
        core.changeScene( 4 );
      }
    }

    function corredorIrAlaFeminina() {
      core.openDialog( 3 );
      if ( core.flag("score_ir_ala_feminina_hora_errada") == false ) {
        //core.registerScoreItem( Scores.irAlaFemininaHoraErrada );
        core.flag("score_ir_ala_feminina_hora_errada", true );
      }
    }

    function corredorIrFarmacia() {
      core.openDialog( 4 );
      if ( core.flag("score_ir_farmacia_hora_errada") == false ) {
        //core.registerScoreItem( Scores.irFarmaciaHoraErrada );
        core.flag("score_ir_farmacia_hora_errada", true );
      }
    }

    corredor = lib.scenes.corredor.getClone()
      .onLoad(function() {

        core.openCommandBar();
        core.setActionVisible("btn-ir_recepcao", true );

        console.log("Entrando no corredor");
        Player.stopAll();
        // Som
        Player.play( Player.audios.sfx.abrirPorta );
        Player.playInLoop( Player.audios.loops.recepcao );
        if ( core.flag("score_anotar_prontuario") == true ) {
          core.setInteractiveObjectVisible("io-conversar_mentor", true );
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
        .setVisibility( true )

    ]);

    corredor.registerDialogs([
      // 0
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.corredor[ 0 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),
      // 1
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.corredor[ 1 ] )
        .registerOption("", function() {
          core.closeDialog();
          // Fim do nível após este diálogo
          /*   core.unlockLevel( 4 );
           core.closeCommandBar();
           core.showEndOfLevel();
           Player.stopAll();
           Player.play( Player.audios.sfx.missaoCumprida );*/
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
      // 5 - Mentor Ação errada: Esquecer objetos na gaveta
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.objetoQualquer )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);

    corredor.registerInteractiveObjects([
      new InteractiveObject("io-ir_sala_leitos", "Ir à Enfermaria Masculina")
        .setCssClass("intObj-goToAlaMasculina")
        .onClick( corredorIrSalaLeitos )
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

      new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
        .setCssClass("intObj-talkToMentor")
        .onClick(function() {
          core.openDialog( 0 );
        })
        .setVisibility( false )


    ]);


    salaDeLeitos = new Scene("salaDeLeitos", "scene-salaDeLeitos")
      .setCssClass("scene-bedroom-level2")
      .onLoad(function() {


        if ( core.flag("segunda_ida_leito_paciente") == true ) {
          /*core.setInteractiveObjectVisible("io-ir_leito", false );
           // core.openDialog( 0 );
           } else {*/
          core.setInteractiveObjectVisible("io-ir_leito", true );
          core.setInteractiveObjectVisible("io-falarPaciente", false );

          if ( core.flag("tem_fala") == false ) {
            core.openCommandBar();
          }
        }
        // Caso ele já tenha realizado os procedimentos, são habilitados os botões de descarte dos itens utilizados
        if ( (core.flag("score_explicou_resultado") == true ) ) {

          core.setActionVisible("btn-jogar_algodao_lixo", true );
          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-jogar_agulha_perfuro", true );
          core.setActionVisible("btn-elevar_grade_cama", true );
          core.setActionVisible("btn-ler_prontuario", false );
          core.setActionVisible("btn-anotarProntuario", false );
          core.openCommandBar();
        }

        if ( core.flag("descartar_algodao") == true ) {
          core.setActionVisible("btn-jogar_algodao_lixo", false );
        }

        if ( core.flag("descartar_agulha") == true ) {
          core.setActionVisible("btn-jogar_agulha_perfuro", false );
        }


      })
      .onUnload(function() {
        console.log("Saindo da sala de leitos");
        // Habilitar o fato de que a proxima ida ao leito do paciente seja no mínimo a segunda
        core.flag("segunda_ida_leito_paciente", true );
        // core.closeCommandBar();
      });

    salaDeLeitos.registerInteractiveObjects([

      new InteractiveObject("io-falarPaciente", "Falar com o paciente")
        .setCssClass("intObj-ir_leito-fase2")
        .onClick(function() {

          core.openDialog( 0 );


        })
        .setVisibility( true ),


      new InteractiveObject("io-ir_leito", "Ir ao leito")
        .setCssClass("intObj-ir_leito-fase2")
        .onClick(function() {

          if ( core.flag("lavar_maos2") == false ) {
            // Mentor corrige
            core.openDialog( 3 );
          } else {
            core.changeScene( 3 );
          }

        })
        .setVisibility( false ),

      new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
        .setCssClass("intObj-bedroomToHallway")
        .onClick(function() {
          // Já checou o prontuario
          if ( core.flag("checar_prontuario") == true ) {
            // Volte para o corredor
            core.changeScene( 1 );
          } else {
            core.openDialog( 8 );
          }
        })
        .setVisibility( true )


    ]);

    salaDeLeitos.registerActions([

      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );
          // verifica se é a primeira vez que está indo verificar o paciente
          if ( core.flag("segunda_ida_leito_paciente") == false ) {
            if ( core.flag("lavarMaos") == false ) {
              core.flag("lavarMaos", true );
            }
            if ( core.flag("score_lavar_maos_antes_do_prontuario") == false ) {
              core.registerScoreItem( Scores.lavaMaosAntes );
              core.flag("score_lavar_maos_antes_do_prontuario", true );
            }
          } else {
            // Verifica se os procedimentos já foram realizados
            if ( (core.flag("score_explicou_resultado") == false) ) {
              if ( core.flag("lavar_maos2") == false ) {
                core.flag("lavar_maos2", true );
              }
              if ( core.flag("score_lavar_maos_antes_de_ir_no_leito") == false ) {
                core.registerScoreItem( Scores.lavarMaosAntesLeito );
                core.flag("score_lavar_maos_antes_de_ir_no_leito", true );
              }
            } else {
              if ( core.flag("score_elevou_grade_cama") == true ) {
                if ( core.flag("lavar_maos_apos_lixo") == false ) {
                  core.flag("lavar_maos_apos_lixo", true );
                }
                if ( core.flag("score_lavou_maos_apos_lixo") == false ) {
                  core.registerScoreItem( Scores.lavarMaosAposLixos );
                  core.flag("score_lavou_maos_apos_lixo", true );
                }
              } else {
                core.closeCommandBar();
                core.openDialog( 5 );
              }
            }
          }
        })
        .setVisibility( false ),


      new Action("btn-ler_prontuario", "Ler prontuario")
        .setCssClass("action-ler_prontuario")
        .onClick(function() {
          console.log("Action: ler prontuario");
          if ( core.flag("lavarMaos") == false ) {
            core.closeCommandBar();
            core.openDialog( 6 );
          } else {
            if ( core.flag("score_checar_prontuario") == false ) {
              core.registerScoreItem( Scores.checarProntuario );
              core.flag("score_checar_prontuario", true );
            }
            Prontuario.open();
            core.openModalScene("Prontuario");
          }
        })
        .setVisibility( false ),


      new Action("btn-jogar_agulha_perfuro", "Descartar Agulhas")
        .setCssClass("action-agulhas")
        .onClick(function() {

          core.flag("descartar_agulha", true );


          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-jogar_algodao_lixo", false );
          core.setActionVisible("btn-jogar_agulha_perfuro", false );
          core.setActionVisible("btn-elevar_grade_cama", false );
          core.setActionVisible("btn-ler_prontuario", false );
          core.setActionVisible("btn-anotarProntuario", false );

          core.setActionVisible("btn-lixoComum", true );
          core.setActionVisible("btn-lixoInfectante", true );
          core.setActionVisible("btn-perfuroCortante", true );

        })
        .setVisibility( false ),


      new Action("btn-jogar_algodao_lixo", "Descartar Algodão")
        .setCssClass("action-algodao_seco")
        .onClick(function() {
          console.log("Action: Descartar Algodão");


          core.flag("descartar_algodao", true );


          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-jogar_algodao_lixo", false );
          core.setActionVisible("btn-jogar_agulha_perfuro", false );
          core.setActionVisible("btn-elevar_grade_cama", false );
          core.setActionVisible("btn-ler_prontuario", false );
          core.setActionVisible("btn-anotarProntuario", false );

          core.setActionVisible("btn-lixoComum", true );
          core.setActionVisible("btn-lixoInfectante", true );
          core.setActionVisible("btn-perfuroCortante", true );


        })
        .setVisibility( false ),


      new Action("btn-elevar_grade_cama", "Elevar grade da cama")
      // CONSERTAR
        .setCssClass("action-elevarGrade")
        .onClick(function() {

          if ( core.flag("descartar_agulha") == true ) {
            console.log("Action: Elevar a grade da cama");
            if ( core.flag("score_elevou_grade_cama") == false ) {
              core.flag("score_elevou_grade_cama", true );
              core.registerScoreItem( Scores.elevarGradeDaCama );
              core.changeSceneCssClassTo("scene-bedroom-level2b");
              core.setActionVisible("btn-elevar_grade_cama", false );
              core.setActionVisible("btn-anotarProntuario", true );
              core.setActionVisible("btn-lavarMaos", true );
            }
          } else {
            core.closeCommandBar();
            core.openDialog( 4 );
          }
        })
        .setVisibility( false ),

      new Action("btn-anotarProntuario", "Anotar prontuario")
        .setCssClass("action-anotar_prontuario")
        .onClick(function() {
          console.log("Action: Anotar prontuario");
          if ( core.flag("lavar_maos_apos_lixo") == false ) {
            core.closeCommandBar();
            core.openDialog( 6 );
          } else {
            Prontuario.open();
            core.openModalScene("Prontuario");
          }
        })
        .setVisibility( false ),


      new Action("btn-lixoComum", "Lixo Comum")
        .setCssClass("action-lixo_comum")
        .onClick(function() {

          core.setActionVisible("btn-lixoComum", false );
          core.setActionVisible("btn-lixoInfectante", false );
          core.setActionVisible("btn-perfuroCortante", false );

          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-elevar_grade_cama", true );
          core.setActionVisible("btn-anotarProntuario", false );


          if ( core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );
          }

          if ( core.flag("descartar_algodao") && !core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", true );
          }

          if ( !core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", true );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );
          }


        })
        .setVisibility( false ),


      new Action("btn-lixoInfectante", "Lixo Infectante")
        .setCssClass("action-lixo_infectante")
        .onClick(function() {

          core.setActionVisible("btn-lixoComum", false );
          core.setActionVisible("btn-lixoInfectante", false );
          core.setActionVisible("btn-perfuroCortante", false );

          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-elevar_grade_cama", true );
          core.setActionVisible("btn-anotarProntuario", false );


          if ( core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );

            if ( !core.flag("score_algodao") ) {
              core.flag("score_algodao", true );
              core.registerScoreItem( Scores.algodaoLixoCerto );
            }
          }

          if ( core.flag("descartar_algodao") && !core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", true );

            if ( !core.flag("score_algodao") ) {
              core.flag("score_algodao", true );
              core.registerScoreItem( Scores.algodaoLixoCerto );
            }

          }

          if ( !core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", true );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );
          }

        })
        .setVisibility( false ),


      new Action("btn-perfuroCortante", "Perfuro Cortante")
        .setCssClass("action-lixo_perfuro_cortante")
        .onClick(function() {

          core.setActionVisible("btn-lixoComum", false );
          core.setActionVisible("btn-lixoInfectante", false );
          core.setActionVisible("btn-perfuroCortante", false );

          core.setActionVisible("btn-lavarMaos", false );
          core.setActionVisible("btn-elevar_grade_cama", true );
          core.setActionVisible("btn-anotarProntuario", false );


          if ( core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );

            if ( !core.flag("score_agulha") ) {
              core.flag("score_agulha", true );
              core.registerScoreItem( Scores.agulhaLixoCerto );
            }
          }

          if ( core.flag("descartar_algodao") && !core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", false );
            core.setActionVisible("btn-jogar_agulha_perfuro", true );


          }

          if ( !core.flag("descartar_algodao") && core.flag("descartar_agulha") ) {
            core.setActionVisible("btn-jogar_algodao_lixo", true );
            core.setActionVisible("btn-jogar_agulha_perfuro", false );


            if ( !core.flag("score_agulha") ) {
              core.flag("score_agulha", true );
              core.registerScoreItem( Scores.agulhaLixoCerto );
            }
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
      new Dialog( lib.characters.pacientes.raulUnknow )
        .setText( Dialogs.alaMasculina[ 1 ] )
        .registerOption("", function() {
          core.setInteractiveObjectVisible("io-ir_leito", false );
          core.setActionVisible("btn-ler_prontuario", true );
          core.setActionVisible("btn-lavarMaos", true );
          core.closeDialog();
          core.openCommandBar();
        }),
      // 2 - Verificar se fechou o prontuario pra abrir a fala
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.alaMasculina[ 2 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 3 - Mentor corrigindo o fato de não lavar as mãos antes de ir ao leito do paciente
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo3 )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 4 - Mentor corrigindo o fato de não descartar a agulha
      new Dialog( lib.characters.mentor )
        .setText( Alertas.descarte.objetos )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 5 - Mentor corrigindo o fato de não elevar a grade
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.elevarGrade[ 0 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 6 - Mentor corrigindo o fato de não lavar as mãos antes de verificar o prontuario
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo3 )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 7 - Mentor corrigindo se jogar no lixo errado

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.alaMasculina[ 3 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 8 - Aviso de checar prontuario

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.alaMasculina[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);


    leito = lib.scenes.leitos.raul.getClone()
      .onLoad(function() {
        core.openCommandBar();
        console.log("Leito: Onload");
        core.setInteractiveObjectVisible("io-pulseira_paciente", true );


        // core.setActionVisible("btn-falarPaciente", true );
      })
      .onUnload(function() {
        console.log("Leito: OnUnload");
        core.closeCommandBar();
      });

    leito.registerInteractiveObjects([

      new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_03-checar_pulseira")
        .onClick(function() {
          if ( !core.flag("score_falar_paciente") ) {
            core.closeCommandBar();
            core.openDialog( 15 );
          } else {
            core.flag("verificar_pulseira", true );
            console.log("IO: pulseira_paciente");
            core.openModalScene("pulseira");
            Pulseira.open();
            core.openCommandBar();
          }
        })
        .setVisibility( true )
        .setEnable( false ),


      new InteractiveObject("io-conversar_paciente03", "Falar com o paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {


          if ( !core.flag("conversar_paciente2") ) {
            console.log("Action: btn-conversarPaciente");
            if ( !core.flag("score_falar_paciente") ) {
              core.registerScoreItem( Scores.falarComPaciente );
              core.flag("score_falar_paciente", true );
            }
            core.closeCommandBar();
            core.openDialog( 0 );
            core.enableInteractiveObject("io-pulseira_paciente", true );
          } else {
            // Já realizou os procedimentos
            console.log("Action: Explicar o resultado");
            if ( !core.flag("score_utilizou_algodao2") ) {
              if ( !core.flag("score_nao_utilizou_algodao2") ) {
                //core.registerScoreItem( Scores.naoUsarAlgodao2 );
                core.flag("score_nao_utilizou_algodao2", true );
              }
              core.closeCommandBar();
              core.openDialog( 12 );
            } else {
              if ( !core.flag("score_explicou_resultado") ) {
                core.flag("score_explicou_resultado", true );
                core.registerScoreItem( Scores.explicarResultado );
              }
              core.openDialog( 6 );
              // Para o caso dele ter tentado sair sem explicar o resultado para o paciente antes
              core.flag("tem_fala", false );
            }
          }
        })
        .setVisibility( true )


    ]);


    leito.registerDialogs([
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 0 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),
      new Dialog( lib.characters.pacientes.raulUnknow )
        .setText( Dialogs.leitoPaciente[ 1 ] )
        .registerOption("", function() {
          core.openDialog( 2 );
        }),
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 2 ] )
        .registerOption("", function() {
          core.openDialog( 3 );
        }),
      new Dialog( lib.characters.pacientes.raul )
        .setText( Dialogs.leitoPaciente[ 3 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),
      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente[ 4 ] )
        .registerOption("", function() {
          core.openDialog( 5 );
        }),
      new Dialog( lib.characters.pacientes.raul )
        .setText( Dialogs.leitoPaciente[ 5 ] )
        .registerOption("", function() {
          core.closeDialog();
          // core.setActionVisible("btn-selecionar_bandeja", true );
          core.setActionVisible("btn-por_luvas", true );
          core.setActionVisible("btn-utilizar_algodao", true );
          core.setActionVisible("btn-realizar_teste_glicemia", true );
          core.setActionVisible("btn-ir_sala_leitos", true );
          core.openCommandBar();
        }),
      // Apos os exames
      new Dialog( lib.characters.pacientes.raul )
        .setText( Dialogs.leitoPaciente[ 6 ] )
        .registerOption("", function() {
          core.openDialog( 7 );
        }),
      // 7 - resposta jogador
      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.leitoPaciente[ 7 ], function() {
          core.openDialog( 8 );
        })
        .registerOption( Dialogs.leitoPaciente[ 9 ], function() {
          core.closeDialog();
        })
        .registerOption( Dialogs.leitoPaciente[ 10 ], function() {
          core.openDialog( 9 );
        })
        .setRandomize( true ),
      // 8 - Resposta op 1
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.leitoPaciente[ 8 ] )
        .registerOption("", function() {
          core.openDialog( 7 );
        }),
      // 9 - Resposta op 3
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.leitoPaciente[ 11 ] )
        .registerOption("", function() {
          core.openDialog( 7 );
        }),
      // 10 - Pulseira não verificada
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.verPulseira )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 11 - Não selecionar as luvas
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.luvas )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 12 - Não usar o algodão no paciente (nos dois casos)
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.algodão )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 13 - Não realizar o teste de glicemia
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.teste[ 0 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 14 - Não falar o resultado ao paciente
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.paciente )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 15 - Não ter conversado com o paciente antes de verificar a pulseira dele
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.falarPaciente )
        .registerOption("", function() {
          core.closeDialog();
        })

    ]);

    leito.registerActions([


      new Action("btn-por_luvas", "Colocar Luvas")
        .setCssClass("action-luvas_de_procedimento")
        .onClick(function() {
          console.log("Action: Colocar Luvas");
          // Som
          Player.play( Player.audios.sfx.colocarLuvas );

          if ( core.flag("verificar_pulseira") ) {

            if ( !core.flag("score_vestiu_luvas") ) {
              core.flag("score_vestiu_luvas", true );
              core.registerScoreItem( Scores.porLuvas );
              core.setActionVisible("btn-por_luvas", false );
            }

          } else {

            if ( !core.flag("score_pulseira") ) {
              core.flag("score_pulseira", true );
              //core.registerScoreItem( Scores.naoVerificarPulseira);
            }

            core.openDialog( 10 );
          }

        })
        .setVisibility( false ),


      new Action("btn-utilizar_algodao", "Utilizar Algodão")
        .setCssClass("action-algodao_seco")
        .onClick(function() {

          console.log("Action: Utilizar Algodão");
          // Verifica qual é a vez que está utilizando o algodão

          if ( core.flag("verificar_pulseira") ) {
            if ( core.flag("utilizar_algodao2") ) {
              if ( !core.flag("score_realizou_teste_glicemia") ) {
                if ( !core.flag("score_nao_realizou_teste_glicemia") ) {
                  //core.registerScoreItem( Scores.naoRealizarTesteGlicemia );
                  core.flag("score_nao_realizou_teste_glicemia", true );
                }
                core.closeCommandBar();
                core.openDialog( 13 );
              } else {
                if ( !core.flag("score_utilizou_algodao2") ) {
                  core.flag("score_utilizou_algodao2", true );
                  core.registerScoreItem( Scores.usarAlgodao2 );
                }
              }
            } else {
              if ( !core.flag("score_vestiu_luvas") ) {
                if ( !core.flag("score_nao_vestiu_luvas") ) {
                  //core.registerScoreItem( Scores.naoPorLuvas );
                  core.flag("score_nao_vestiu_luvas", true );
                }
                core.closeCommandBar();
                core.openDialog( 11 );
              } else {
                if ( !core.flag("score_utilizou_algodao1") ) {
                  core.flag("score_utilizou_algodao1", true );
                  core.registerScoreItem( Scores.usarAlgodao );
                }
                // A próxima vez que se utilizar o algodão será a segunda vez
                core.flag("utilizar_algodao2", true );
              }
            }
          } else {

            if ( !core.flag("score_pulseira") ) {
              core.flag("score_pulseira", true );
              //core.registerScoreItem( Scores.naoVerificarPulseira);
            }

            core.openDialog( 10 );
          }
        })
        .setVisibility( false ),


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
          console.log("Action: Realizar teste de glicemia capilar");
          // Bip

          if ( core.flag("verificar_pulseira") ) {
            Player.play( Player.audios.sfx.bip );
            if ( !core.flag("score_utilizou_algodao1") ) {
              if ( !core.flag("score_nao_utilizou_algodao1") ) {
                //core.registerScoreItem( Scores.naoUsarAlgodao );
                core.flag("score_nao_utilizou_algodao1", true );
              }
              //   core.closeCommandBar();
              core.openDialog( 12 );
            } else {
              // Habilita o segundo diálogo com o paciente
              core.flag("conversar_paciente2", true );
              if ( !core.flag("score_realizou_teste_glicemia") ) {
                core.flag("score_realizou_teste_glicemia", true );
                core.registerScoreItem( Scores.realizarTesteGlicemia );
              }
              // Abre a cena do glicosimetro
              core.openModalScene("modalGlicosimetroComFita");
            }
          } else {

            if ( !core.flag("score_pulseira") ) {
              core.flag("score_pulseira", true );
              //core.registerScoreItem( Scores.naoVerificarPulseira);
            }

            core.openDialog( 10 );
          }
        })
        .setVisibility( false ),


      new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
        .setCssClass("action-ir_sala_de_leitos")
        .onClick(function() {
          console.log("Action: Voltar para a ala masculina");
          if ( !core.flag("score_explicou_resultado") ) {
            // Uma flag apenas para evitar o erro de abrir a commandBar durante o alerta do mentor
            core.flag("tem_fala", true );
            if ( !core.flag("score_nao_explicou_resultado") ) {
              //core.registerScoreItem( Scores.naoExplicarResultado );
              core.flag("score_nao_explicou_resultado", true );
            }
            core.closeCommandBar();
            core.openDialog( 14 );
          } else {
            core.changeScene( 2 );
          }
        })
        .setVisibility( true )
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
          if ( core.flag("score_pegou_kit_glicemia") &&
            core.flag("score_pegou_algodao") &&
            core.flag("score_pegou_luvas") &&
            core.flag("pegou_agulhas") ) {


            core.flag("pegou_tudo_gaveta", true );


            core.changeScene( 1 );
          } else {

            core.flag("pegou_tudo_gaveta", false );


            core.openDialog( 1 );
          }
        })
        .setVisibility( true )
    ]);


    postoDeEnfermagem.registerInteractiveObjects([
      new InteractiveObject("io-abrirGaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {
          if ( !core.flag("pegou_bandeja") ) {
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
          core.flag("pegou_bandeja", true );
          if ( !core.flag("score_pegou_bandeja") ) {
            core.registerScoreItem( Scores.pegarBandeja );
            core.flag("score_pegou_bandeja", true );
          }
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
        }),

      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.objetosGaveta )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);


    // Modal scenes


    pulseira = new Scene("pulseira", "pulseira");

    pulseira.registerInteractiveObjects([]);

    pulseira.registerActions([
      new Action("btn-largar_pulseira", "Fechar pulseira")
        .setCssClass("action-pulseira_paciente")
        .onClick(function() {
          console.log("Ação: Fechar modal pulseira");
          core.closeModalScene("Pulseira");
          if ( !core.flag("score_verificar_pulseira") ) {
            core.flag("score_verificar_pulseira", true );
            core.registerScoreItem( Scores.verificarPulseira );
          }
          Pulseira.close();
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
          console.log("Btn ir corredor");
          core.setActionVisible("btn-ir_corredor", true );
          core.openCommandBar();
        })
        .setVisibility( true )
    ]);

    // Acertar posicoes
    gaveta.registerInteractiveObjects([
      // Kit glicemia
      new InteractiveObject("io-kit_glicemia", "Pegar Kit de glicemia")
        .setCssClass("intObj-aparelhoGlicemia")
        .onClick(function() {
          console.log("Action: pegar kit de glicemia");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );
          core.registerScoreItem( Scores.pegarKitGlicemia );
          core.setInteractiveObjectVisible("io-kit_glicemia", false );
          core.flag("score_pegou_kit_glicemia", true );
        })
        .setVisibility( true ),

      // Agulhas

      new InteractiveObject("io-agulhas", "Pegar Agulhas")
        .setCssClass("intObj-agulhas")
        .onClick(function() {

          // Som
          Player.play( Player.audios.sfx.pegarObjeto );

          core.setInteractiveObjectVisible("io-agulhas", false );
          core.flag("pegou_agulhas", true );
        })
        .setVisibility( true ),


      // Algodao
      new InteractiveObject("io-algodao", "Pegar algodao")
        .setCssClass("intObj-algodao_seco")
        .onClick(function() {
          console.log("Action: pegar algodao ");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );
          core.registerScoreItem( Scores.pegarAlgodao );
          core.setInteractiveObjectVisible("io-algodao", false );
          core.flag("score_pegou_algodao", true );
        })
        .setVisibility( true ),

      // Luvas
      new InteractiveObject("io-luvas", "Pegar luvas")
        .setCssClass("intObj-luvas_de_procedimento")
        .onClick(function() {
          console.log("Action: pegar luvas");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );
          core.registerScoreItem( Scores.pegarLuvas );
          core.setInteractiveObjectVisible("io-luvas", false );
          core.flag("score_pegou_luvas", true );
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
          core.closeModalScene("Prontuario");
          core.setInteractiveObjectVisible("io-ir_corredor", true );
          core.flag("checar_prontuario", true );
          // Verifica se é apenas a verificação do prontuário no início ou se é no final, para anotar os valores
          if ( !core.flag("score_falar_paciente") ) {
            //  core.closeCommandBar();
            // Vai abrir o segundo diálogo da ala masculina caso ele ainda não tenha dito esta frase
            if ( !core.flag("frase_apos_prontuario") ) {
              core.flag("frase_apos_prontuario", true );
              core.openDialog( 2 );
            }
          }

          if ( core.flag("score_anotar_prontuario") == false ) {
            if ( Prontuario.isDataValid() ) {
              core.registerScoreItem( Scores.anotarNoProntuario );
              core.flag("score_anotar_prontuario", true );
            }
          }
          if ( core.flag("lavar_maos_apos_lixo") ) {
            core.unlockLevel( 4 );
            core.closeCommandBar();
            core.showEndOfLevel();
            Player.stopAll();
            Player.play( Player.audios.sfx.missaoCumprida );
          }
        })
        .setVisibility( true )
    ]);

    glicosimetroComFita = new Scene("modalGlicosimetroComFita", "modalGlicosimetroComFita")
      .setCssClass("modalScene-glicosimetroComFita")
      .setTemplate("<span class='glicosimetro-text'>180 mg/dl</span>");

    glicosimetroComFita.registerActions([

      new Action("btn-realizar_teste_glicemia", "Terminar teste de glicemia capilar")
        .setCssClass("action-realizar_teste_glicemia")
        .onClick(function() {

          core.closeModalScene("modalGlicosimetroComFita");


          core.setActionVisible("btn-realizar_teste_glicemia", false );
          core.setActionVisible("btn-verificar_teste_glicemia", true );


        })
        .setVisibility( true )


    ]);


    glicosimetro = new Scene("modalGlicosimetro", "modalGlicosimetro")
      .setCssClass("modalScene-glicosimetro")
      .setTemplate("<span class='glicosimetro-text'>180 mg/dl</span>");

    glicosimetro.registerActions([

      new Action("btn-realizar_teste_glicemia", "Fechar verificação")
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
    level.registerScene( salaDeLeitos );
    // 3
    level.registerScene( leito );
    // 4
    level.registerScene( postoDeEnfermagem );

    level.registerModalScene( pulseira );
    level.registerModalScene( gaveta );
    level.registerModalScene( prontuario );
    level.registerModalScene( glicosimetroComFita );
    level.registerModalScene( glicosimetro );

    // level init script
    level.setSetupScript(function() {

      Pulseira.setNameRegExp( /^Raul Gonzales Rodrigues$/i );
      Pulseira.setLeitoRegExp( /0*3/ );
      Pulseira.setDataRegExp( /24\/07\/1937/ );

      Pulseira.setName("Raul Gonzales Rodrigues");
      Pulseira.setLeito("03");
      Pulseira.setData("24/07/1937");
      Pulseira.disable();

      Prontuario.setNome("Raul Gonzales Rodrigues");
      Prontuario.setSexo("M");
      Prontuario.setEstadoCivil("Casado");
      Prontuario.setDataNascimento("24/07/1937");
      Prontuario.setIdade("78 anos");
      Prontuario.setProfissao("Aposentado (operário)");

      Prontuario.setPai("Roberto Cruz Rodrigues");
      Prontuario.setMae("Rebeca Gonzales");

      Prontuario.setAlergiaMedicamentosa( false, "");
      Prontuario.setDisableAlergiaMedicamentosa( true );
      Prontuario.setDataInternacao("17/06/2015");
      Prontuario.setLeito("03 - Enfermaria Masculina");
      Prontuario.setAntecedentes("Ocorrência de duas internações em 2013 por crise hipertensiva e uma internação em 2014 por hiperglicemia.");
      Prontuario.setHipotese("Acidose metabólica (Glicemia capilar no momento de internação 649 mg/dl).");
      Prontuario.setObservacoes("Portador de Diabetes Mellitus II há 33 anos e Hipertensão Arterial Sistêmica há 15 anos.");

      Prontuario.setPeso("77");
      Prontuario.setAltura("1,63");
      Prontuario.setCircunferenciaAbdominal("147");

      Prontuario.setPrescMedicaRowData( 0, "", "Metmorfina", "Oral", "500 mg (2x ao dia)", "07h - 17h", true, true );
      Prontuario.setPrescMedicaRowData( 1, "", "Glibenclamida", "Oral", "4 mg (2x ao dia)", "08h - 18h", true, true );
      Prontuario.setPrescMedicaRowData( 2, "", "Bicarbonato de sódio", "Endovenoso", "8,4 g + Água destilada 100 ml", "Tempo de 4 horas", true, true );
      // Necessário para evitar que valores antigos apareçam no prontuário
      Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

      // Caso não for possível digitar o valor da glicemia terá que fazer um desse para cada fase que usa
      Prontuario.setPrescEnfermagemState([ "verificar_glicemia", "levantar_grade" ]);

      Prontuario.setSsvvRowData( 0, "", "130x70", "58", "28", "95", "36,2", true );
      // Disable 2 row
      Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

      Prontuario.setAnotacaoEnfermagemRowData("", "");
    });

    // Flags

    level.registerFlag( new Flag("conversar_recepcionista", false ) );
    level.registerFlag( new Flag("conversarPaciente", true ) );
    level.registerFlag( new Flag("lavarMaos", false ) );
    level.registerFlag( new Flag("checar_prontuario", false ) );
    level.registerFlag( new Flag("frase_apos_prontuario", false ) );
    level.registerFlag( new Flag("pegou_bandeja", false ) );
    level.registerFlag( new Flag("pegou_tudo_gaveta", true ) );
    level.registerFlag( new Flag("segunda_ida_leito_paciente", false ) );
    level.registerFlag( new Flag("lavar_maos2", false ) );
    level.registerFlag( new Flag("conversar_paciente2", false ) );
    level.registerFlag( new Flag("selecionar_bandeja", false ) );
    level.registerFlag( new Flag("por_luvas", false ) );
    level.registerFlag( new Flag("utilizar_algodao1", false ) );
    level.registerFlag( new Flag("realizar_teste_glicemia", false ) );
    level.registerFlag( new Flag("utilizar_algodao2", false ) );
    level.registerFlag( new Flag("explicar_resultado", false ) );
    level.registerFlag( new Flag("voltar_alaMasculina", false ) );
    level.registerFlag( new Flag("lixo_algodao", false ) );
    level.registerFlag( new Flag("lixo_agulha", false ) );
    level.registerFlag( new Flag("elevarGrade", false ) );
    level.registerFlag( new Flag("lavar_maos_apos_lixo", false ) );
    level.registerFlag( new Flag("tem_fala", false ) );
    level.registerFlag( new Flag("score_ir_posto_hora_errada", false ) );
    level.registerFlag( new Flag("score_ir_farmacia_hora_errada", false ) );
    level.registerFlag( new Flag("score_ir_ala_feminina_hora_errada", false ) );
    level.registerFlag( new Flag("score_falar_paciente", false ) );
    level.registerFlag( new Flag("score_lavar_maos_antes_do_prontuario", false ) );
    level.registerFlag( new Flag("score_checar_prontuario", false ) );
    level.registerFlag( new Flag("score_pegou_kit_glicemia", false ) );
    level.registerFlag( new Flag("score_pegou_algodao", false ) );
    level.registerFlag( new Flag("score_pegou_luvas", false ) );
    level.registerFlag( new Flag("score_pegou_bandeja", false ) );
    level.registerFlag( new Flag("score_lavar_maos_antes_de_ir_no_leito", false ) );
    level.registerFlag( new Flag("score_verificar_pulseira", false ) );
    level.registerFlag( new Flag("score_selecionou_bandeja", false ) );
    level.registerFlag( new Flag("score_vestiu_luvas", false ) );
    level.registerFlag( new Flag("score_utilizou_algodao1", false ) );
    level.registerFlag( new Flag("score_realizou_teste_glicemia", false ) );
    level.registerFlag( new Flag("score_utilizou_algodao2", false ) );
    level.registerFlag( new Flag("score_explicou_resultado", false ) );
    level.registerFlag( new Flag("score_nao_verificar_pulseira", false ) );
    level.registerFlag( new Flag("score_nao_selecionou_bandeja", false ) );
    level.registerFlag( new Flag("score_nao_vestiu_luvas", false ) );
    level.registerFlag( new Flag("score_nao_utilizou_algodao1", false ) );
    level.registerFlag( new Flag("score_nao_realizou_teste_glicemia", false ) );
    level.registerFlag( new Flag("score_nao_utilizou_algodao2", false ) );
    level.registerFlag( new Flag("score_nao_explicou_resultado", false ) );
    level.registerFlag( new Flag("score_jogou_algodao_lixo", false ) );
    level.registerFlag( new Flag("score_jogou_agulha_perfuro", false ) );
    level.registerFlag( new Flag("score_elevou_grade_cama", false ) );
    level.registerFlag( new Flag("score_lavou_maos_apos_lixo", false ) );
    level.registerFlag( new Flag("score_anotar_prontuario", false ) );
    level.registerFlag( new Flag("descartar_algodao", false ) );
    level.registerFlag( new Flag("descartar_agulha", false ) );
    level.registerFlag( new Flag("score_agulha", false ) );
    level.registerFlag( new Flag("score_algodao", false ) );
    level.registerFlag( new Flag("score_jogou_agulha_errado", false ) );
    level.registerFlag( new Flag("score_jogou_algodao_errado", false ) );
    level.registerFlag( new Flag("pegou_agulhas", false ) );
    level.registerFlag( new Flag("fez_teste_glicemia", false ) );
    level.registerFlag( new Flag("verificar_pulseira", false ) );
    level.registerFlag( new Flag("score_pulseira", false ) );

    level.setInitialScene( 0 );


    game.registerLevel( level, 3 );

    console.groupEnd();
  }
);
