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

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData", "EquipoGotejamento", "Ficha" ],
  function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores, EquipoGotejamento, Ficha ) {

    var Dialogs = require("DialogsData").fase10;
    var Alertas = require("DialogsData").alertas;
    var Scores = require("ScoresData").fase10;
    var Player = require("Player");

    var level = new Level("Level 10");
    level.setMaxPoints( Scores._sum );
    console.groupCollapsed( level.getName() );

    var recepcao,
      corredor,
      alaMasculina,
      alaMasculina2,
      alaFeminina,
      centroCirurgico,
      salaDeLeitos,
      leito,
      leito2,
      postoDeEnfermagem,
      farmacia,
      gaveta,
      pulseira,
      prontuario,
      zoom,
      soroGlicofisiologico,
      cloretoSodio;


    var centroCirurgico = lib.scenes.centroCirurgico.getClone()
      .onLoad(function() {
        core.openCommandBar();
        console.log("Load scene: " + centroCirurgico.getName() );
      });


    centroCirurgico.registerActions([

      new Action("btn-ir_corredor", "Ir ao corredor")
        .setCssClass("action-ir_corredor")
        .onClick(function() {

          core.changeScene( 1 );

        })
        .setVisibility( true )

    ]);


    function corredorIrCentroCirurgico() {

      core.changeScene( 6 );
      if ( core.flag("score_irCentroCirurgico_horaErrada") == false ) {

        core.flag("score_irCentroCirurgico_horaErrada", true );
        core.registerScoreItem( Scores.irCentroCirurgico_horaErrada );
        console.log("PERDEU 25 PONTOS");

      }


    }


    var alaFeminina = new Scene("alaFeminina", "Ala Feminina")
      .setCssClass("scene-bedroom-level7")
      .onLoad(function() {

      });


    alaFeminina.registerInteractiveObjects([


      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
        .setCssClass("intObj-irAlaMasculina_corredor")
        .onClick(function() {
          console.log("voltando para corredor");

          core.changeScene( 1 );


        })


    ]);


    function corredorIrAlaFeminina() {
      core.changeScene( 7 );


      if ( core.flag("score_iralaFeminina_horaErrada") == false ) {

        core.flag("score_iralaFeminina_horaErrada", true );
        core.registerScoreItem( Scores.irAlaFeminina_horaErrada );


      }

    }


    var recepcao = lib.scenes.recepcao.getClone()
      .onLoad(function() {
        console.log("Load scene: " + recepcao.getName() );


        if ( core.flag("conversar_recepcionista") == false ) {
          core.flag("conversar_recepcionista", true );
          core.openDialog( 0 );

        }


      });

    recepcao.registerDialogs([

      // 0

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

    function recepcaoIrCorredor() {
      console.log("Ir ao corredor");
      core.changeScene( 1 );
    }

    function conversarRecepcionista() {
      core.openDialog( 0 );
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


    corredor.registerDialogs([]);


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


      new InteractiveObject("io-ir_ala_masculina", "Ir à Enfermaria Masculina")
        .setCssClass("intObj-goToAlaMasculina")
        .onClick( corredorIrAlaMasculina )
        .setVisibility( true )


    ]);

    function corredorIrFarmacia() {
      core.changeScene( 4 );

    }

    function corredorIrPostoEnfermagem() {


      core.changeScene( 5 );


    }


    function corredorIrAlaMasculina() {

      if ( core.flag("pegou_tudo_postoEnfermagem") == true && core.flag("trocou_de_leito") == false ) {

        core.changeScene( 9 );
      } else if ( core.flag("trocou_de_leito") == true || core.flag("conversar_paciente") == false || core.flag("conferirMedicamento") == true ) {

        core.changeScene( 2 );

      }
    }


    var alaMasculina2 = lib.scenes.alaMasculina.getClone()
      .setCssClass("scene-bedroom-level9")
      .onLoad(function() {


        core.setInteractiveObjectVisible("io-ir_ao_leito", true );
        core.setActionVisible("btn-lavarMaos", true );
      });


    alaMasculina2.registerInteractiveObjects([


      new InteractiveObject("io-ir_ao_leito", "Ir ao leito")
        .setCssClass("intObj-irLeitoEsquerda")
        .onClick(function() {

          if ( core.flag("lavar_maos") == true ) {
            core.changeScene( 3 );
          } else {
            core.openDialog( 0 );
          }


        })
        .setVisibility( false )


    ]);


    alaMasculina2.registerActions([

      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );

          if ( core.flag("lavar_maos") == false ) {
            core.flag("lavar_maos", true );
            core.registerScoreItem( Scores.lavarMaos );
          }

        })
        .setVisibility( false )

    ]);

    alaMasculina2.registerDialogs([


      // 0
      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo1 )
        .registerOption("", function() {
          core.closeDialog();
        })

    ]);


    var alaMasculina = lib.scenes.alaMasculina.getClone()
      .setCssClass("scene-bedroom-level9-trocado")
      .onLoad(function() {

        if ( core.flag("trocou_de_leito") == true ) {

          core.setInteractiveObjectVisible("io-ir_ao_leito1", true );
          core.setInteractiveObjectVisible("io-falarPaciente", false );

          core.setActionVisible("btn-ler_prontuario", false );

        }

      });

    //    core.setInteractiveObjectVisible("io-ir_ao_leito", true );
    //            core.setActionVisible("btn-lavarMaos", false );


    alaMasculina.registerDialogs([

      // 0 jogador
      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.alaMasculina[ 0 ], function() {
          core.openDialog( 1 );
        })
        .registerOption( Dialogs.alaMasculina[ 1 ], function() {
          core.openDialog( 4 );
        })
        .setRandomize( true ),

      // 1 - paciente

      new Dialog( lib.characters.pacientes.francisco )
        .setText( Dialogs.alaMasculina[ 2 ] )
        .registerOption("", function() {
          core.openDialog( 2 );
        }),

      // 2 jogador

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.alaMasculina[ 3 ] )
        .registerOption("", function() {
          core.openDialog( 3 );
        }),

      // 3 - jogador

      new Dialog( lib.characters.pacientes.francisco )
        .setText( Dialogs.alaMasculina[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 4 - mentor corrige

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.alaMasculina[ 5 ] )
        .registerOption("", function() {
          core.openDialog( 0 );
        }),


      // 5 - MENTOR ALERTA

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.alaMasculina[ 6 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),
      // 6 - MENTOR ALERTA LAVAR MAOS

      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo1 )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);


    alaMasculina.registerInteractiveObjects([


      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
        .setCssClass("intObj-irAlaMasculina_corredor")
        .onClick(function() {
          console.log("voltando para corredor");

          if ( core.flag("pegar_prescricao_medica") == false ) {
            core.openDialog( 5 );
          } else {
            core.changeScene( 1 );
          }

        }),


      new InteractiveObject("io-ir_ao_leito1", "Ir ao leito")
        .setCssClass("intObj-irLeitoEsquerda")
        .onClick(function() {

          core.changeScene( 8 );

        })
        .setVisibility( false ),

      new InteractiveObject("io-falarPaciente", "Falar com o paciente")
        .setCssClass("intObj-irLeitoEsquerda")
        .onClick(function() {

          if ( core.flag("conversar_paciente") == false ) {
            core.openDialog( 0 );
            core.flag("conversar_paciente", true );
          }

          core.setActionVisible("btn-ler_prontuario", true );


        })
        .setVisibility( true )


    ]);

    alaMasculina.registerActions([


      new Action("btn-ler_prontuario", "Ler prontuario")
        .setCssClass("action-ler_prontuario")
        .onClick(function() {

          if ( core.flag("ler_prontuario") == false ) {
            core.flag("ler_prontuario", true );
            core.registerScoreItem( Scores.lerProntuario );

          }

          if ( core.flag("pegar_prescricao_medica") == false ) {

            core.flag("pegar_prescricao_medica", true );
            core.registerScoreItem( Scores.pegarPrescricaoMedica );

          }


          Prontuario.open("prescMedica" );
          core.openModalScene("Prontuario");


        })
        .setVisibility( false )


    ]);


    var farmacia = lib.scenes.farmacia.getClone()
      .onLoad(function() {


        if ( core.flag("pegar_prescricao_medica") == false ) {
          core.openDialog( 4 );
          core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );
          core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
          // core.setActionVisible("btn-conferirMedicamento", false );


          if ( core.flag("score_ir_farmacia_horaErrada") == false ) {

            core.flag("score_ir_farmacia_horaErrada", true );
            core.registerScoreItem( Scores.irFarmaciaHoraErrada );

          }


        } else if ( core.flag("pegou_tudo_postoEnfermagem") == true || core.flag("trocou_de_leito") == true || core.flag("conferirMedicamento") == true ) {

          core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );
          core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
          //core.setActionVisible("btn-conferirMedicamento", false );

        } else {

          core.openDialog( 0 );
          // core.setInteractiveObjectVisible("io-pegarFrascoDieta", true );
          // core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", true );
          // core.setActionVisible("btn-conferirMedicamento", true );
        }

        console.log("Load scene: " + farmacia.getName() );


      });

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
          core.setInteractiveObjectVisible("io-pegarFrascoDieta", true );
          core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", true );
        }),

      // 3 MENTOR CORRIGE

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.farmacia[ 3 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 4 - esqueceu paciente

      new Dialog( lib.characters.mentor )
        .setText( Alertas.perdido.farmacia )
        .registerOption("", function() {
          core.closeDialog();
        }),


      // 5 - esqueceu verificar medicamente


      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.verificarMedicamento3 )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 6

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.farmacia[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        })
    ]);


    farmacia.registerInteractiveObjects([


      new InteractiveObject("io-pegarFrascoDieta", "Pegar Frasco de SG 5%")
        .setCssClass("intObj-soro_glicofisiologico_1000_ml")
        .onClick(function() {

          Player.play( Player.audios.sfx.pegarObjeto );


          core.flag("pegarFrascoSG", true );
          core.registerScoreItem( Scores.pegarFrascoSG );
          core.setInteractiveObjectVisible("io-pegarFrascoDieta", false );
          core.setActionVisible("btn-conferirSoro", true );

        })
        .setVisibility( false ),


      new InteractiveObject("io-cloretoSodio_20_10ml", "Pegar NaCL 20%")
        .setCssClass("intObj-cloreto_de_sodio_10__10_ml_")
        .onClick(function() {

          Player.play( Player.audios.sfx.pegarObjeto );

          if ( core.flag("pegarNACL") == false ) {

            core.flag("pegarNACL", true );
            core.registerScoreItem( Scores.pegarNACL );
            core.setInteractiveObjectVisible("io-cloretoSodio_20_10ml", false );
            core.setActionVisible("btn-conferirCloreto", true );
          }

        })
        .setVisibility( false )


    ]);

    farmacia.registerActions([

      new Action("btn-ir_corredor", "Ir ao corredor")
        .setCssClass("action-ir_corredor")
        .onClick(function() {

          if ( core.flag("pegar_prescricao_medica") == false ) {


            core.changeScene( 1 );

          } else if ( core.flag("pegarNACL") == false || core.flag("pegarFrascoSG") == false ) {

            core.openDialog( 6 );
          }


          if ( core.flag("pegarNACL") == true && core.flag("pegarFrascoSG") == true ) {

            if ( core.flag("conferirNACL") == true || core.flag("conferirFrascoSG") == true ) {
              core.registerScoreItem( Scores.conferirDieta );
              core.flag("conferirMedicamento", true );
              core.changeScene( 1 );
            } else {
              core.flag("conferirMedicamento", true );
              core.changeScene( 1 );
            }

          }


        })
        .setVisibility( true ),


      new Action("btn-conferirSoro", "Conferir Soro Glicofisiológico")
        .setCssClass("action-soro_glicofisiologico_1000ml")
        .onClick(function() {
          core.openModalScene("conferirSoroGlicofisiologico1000");


          // if ( (core.flag("pegarFrascoSG") == false) || (core.flag("pegarNACL") == false) ) {

          //     core.openDialog( 3 );
          // } else if ( (core.flag("pegarFrascoSG") == true) && (core.flag("pegarNACL") == true) ) {

          //            if ( core.flag("conferirMedicamento") == false ) {

          //             core.flag("conferirMedicamento", true );
          //             core.registerScoreItem( Scores.conferirDieta );

          //            }
          core.openModalScene("conferirSoroGlicofisiologico1000");
        })
        .setVisibility( false ),

      new Action("btn-conferirCloreto", "Conferir Cloreto de Sodio")
        .setCssClass("action-cloreto_sodio_20_10ml")
        .onClick(function() {
          core.openModalScene("conferirCloretoSodio");
        })
        .setVisibility( false )

    ]);


    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
      .onLoad(function() {

        core.setInteractiveObjectVisible("io-pegar_bandeja", false );
        core.setInteractiveObjectVisible("io-abrir_gaveta", false );


        if ( core.flag("conferirMedicamento") == true ) {

          core.setInteractiveObjectVisible("io-pegar_bandeja", true );
          core.setInteractiveObjectVisible("io-abrir_gaveta", true );

          if ( core.flag("pegou_tudo_postoEnfermagem") == true || core.flag("pegar_bandeja") == true ) {
            core.setInteractiveObjectVisible("io-pegar_bandeja", false );
            core.setInteractiveObjectVisible("io-abrir_gaveta", true );

          }

        } else {
          core.openDialog( 2 );

          if ( core.flag("score_irPosto_horaErrada") == false ) {

            core.flag("score_irPosto_horaErrada", true );
            core.registerScoreItem( Scores.irPosto_horaErrada );
          }

        }


      });

    postoDeEnfermagem.registerDialogs([

      // 0

      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.pegarBandeja )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 1
      new Dialog( lib.characters.mentor )
        .setText( Dialogs.postoDeEnfermagem[ 0 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 2
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.pegarMedicamento )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);

    postoDeEnfermagem.registerInteractiveObjects([

      new InteractiveObject("io-abrir_gaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.abrirGaveta );
          if ( core.flag("pegar_bandeja") == false ) {
            core.openDialog( 0 );
          } else {
            console.log("Action: abrir_gaveta");
            core.openModalScene("gaveta");
            core.openCommandBar();
          }
        })
        .setVisibility( true ),

      new InteractiveObject("io-pegar_bandeja", "Pegar Bandeja")
        .setCssClass("intObj-bandeja")
        .onClick(function() {
          console.log("Action: Pegar bandeja");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );
          core.flag("pegar_bandeja", true );
          core.setInteractiveObjectVisible("io-pegar_bandeja", false );
        })
        .setVisibility( true )

    ]);

    postoDeEnfermagem.registerActions([

      new Action("btn-ir_corredor", "Ir ao corredor")
        .setCssClass("action-ir_corredor")
        .onClick(function() {


          /*      if ( core.flag("pegar_prescricao_medica") == false || core.flag("") ) {
           core.changeScene( 1 );
           }


           if(core.flag("pegou_tudo_postoEnfermagem") == true) {
           core.changeScene(1);
           }*/
          core.changeScene( 1 );

        })
        .setVisibility( true ),

      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {
          // Som
          Player.play( Player.audios.sfx.lavarMaos );

          if ( core.flag("score_lavarMaos1") == false ) {
            core.flag("score_lavarMaos1", true );
            core.registerScoreItem( Scores.lavarMaos1 );
          }


        })
        .setVisibility( true )

    ]);


    leito = lib.scenes.leitos.raul_leito01.getClone()
      .onLoad(function() {


      })
      .onUnload(function() {


      });


    leito.registerActions([

      new Action("btn-ir_ala_masculina", "Voltar a Ala Masculina")
        .setCssClass("action-ir_sala_de_leitos")
        .onClick(function() {


          if ( core.flag("trocou_de_leito") == true )
            core.changeScene( 2 );
          else
            core.openDialog( 7 );


        })
        .setVisibility( false )


    ]);


    leito.registerInteractiveObjects([


      new InteractiveObject("io-falar_paciente", "Falar com o paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {

          if ( core.flag("trocou_de_leito") == false ) {
            core.openDialog( 0 );
            core.flag("trocou_de_leito", true );
            core.setActionVisible("btn-ir_ala_masculina", true );
            core.enableInteractiveObject("io-pulseira_paciente", true );


          }


        })
        .setVisibility( true ),


      new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_03-checar_pulseira")
        .onClick(function() {

          core.openModalScene("Pulseira");
          Pulseira.open();
          core.openCommandBar();


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
      new Dialog( lib.characters.pacientes.francisco )
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
      new Dialog( lib.characters.pacientes.francisco )
        .setText( Dialogs.leitoPaciente[ 3 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),


      // 4
      new Dialog( lib.characters.jogador )
        .setText("")
        .registerOption( Dialogs.leitoPaciente[ 4 ], function() {
          core.closeDialog();
        })
        .registerOption( Dialogs.leitoPaciente[ 5 ], function() {
          core.openDialog( 5 );
        })
        .setRandomize( true ),


      // 5

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.leitoPaciente[ 6 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),


      // 6

      new Dialog( lib.characters.mentor )
        .setText( Dialogs.leitoPaciente[ 7 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 7 - falar com o paciente

      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.falarPaciente )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 8
      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.erroGotejamento )
        .registerOption("", function() {
          core.closeDialog();
        })


    ]);


    function setPulseiraData() {


      Pulseira.setNameRegExp( /^Pedro Alc(í|i)des Mendon(ç|c)a$/i );
      Pulseira.setLeitoRegExp( /0*1/ );
      Pulseira.setDataRegExp( /03\/06\/1962/ );

      Pulseira.setName("Pedro Alcides Mendonça");
      Pulseira.setLeito("01");
      Pulseira.setData("03/06/1962");
      Pulseira.disable();


    }


    leito2 = lib.scenes.leitos.francisco.getClone()
      .onLoad(function() {

      })
      .onUnload(function() {


      });


    leito2.registerDialogs([


      // 0

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente1[ 0 ] )
        .registerOption("", function() {
          core.openDialog( 1 );
        }),

      // 1

      new Dialog( lib.characters.pacientes.francisco )
        .setText( Dialogs.leitoPaciente1[ 1 ] )
        .registerOption("", function() {
          core.openDialog( 2 );
        }),

      // 2

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente1[ 2 ] )
        .registerOption("", function() {
          core.openDialog( 3 );
        }),

      // 3

      new Dialog( lib.characters.pacientes.francisco )
        .setText( Dialogs.leitoPaciente1[ 3 ] )
        .registerOption("", function() {
          core.openDialog( 4 );
        }),

      // 4

      new Dialog( lib.characters.jogador )
        .setText( Dialogs.leitoPaciente1[ 4 ] )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 5

      new Dialog( lib.characters.mentor )
        .setText( Alertas.lavarMaos.tipo3 )
        .registerOption("", function() {
          core.closeDialog();
        }),

      // 6

      new Dialog( lib.characters.mentor )
        .setText( Alertas.esqueceu.erroGotejamento )
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


    leito2.registerInteractiveObjects([

      new InteractiveObject("io-falar_paciente", "Falar com o paciente")
        .setCssClass("intObj-conversar_paciente")
        .onClick(function() {

          core.enableInteractiveObject("io-pulseira_paciente", true );
          core.openDialog( 0 );

          if ( core.flag("falar_paciente_correto") == false ) {

            core.flag("falar_paciente_correto", true );
            core.registerScoreItem( Scores.conversarPacienteLeito );

          }

          core.setActionVisible("btn-pegar_suporte_soro", true );
          core.setActionVisible("btn-administrar_medicamente", true );
          //      core.setActionVisible("btn-lavarMaos", true );
          //     core.setActionVisible("btn-anotar_prontuario", true );


        })
        .setVisibility( true ),


      new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
        .setCssClass("intObj-paciente_05-checar_pulseira")
        .onClick(function() {

          setPulseiraData();
          core.flag("verificar_pulseira", true );

          if ( core.flag("score_verPulseira") == false ) {

            core.flag( ("score_verPulseira"), true );
            core.registerScoreItem( Scores.verPulseira );

          }


          core.openModalScene("Pulseira");
          Pulseira.open();
          core.openCommandBar();


        })
        .setVisibility( true )
        .setEnable( false )

    ]);


    leito2.registerActions([


      new Action("btn-pegar_suporte_soro", "Pegar Suporte de Soro")
        .setCssClass("action-pegarSuporte")
        .onClick(function() {


          if ( core.flag("verificar_pulseira") == true ) {

            if ( core.flag("pegar_suporte_soro") == false ) {
              core.flag("pegar_suporte_soro", true );
              core.registerScoreItem( Scores.pegarSuporteSoro );

              core.changeSceneCssClassTo("scene-bedChar10B");
              core.setActionVisible("btn-pegar_suporte_soro", false );
              core.setActionVisible("btn-colocarSoro", true );


            }
          } else {


            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );
          }

        })
        .setVisibility( false ),


      new Action("btn-colocarSoro", "Colocar Soro")
        .setCssClass("action-soro_fisiologico_1000ml")
        .onClick(function() {


          core.changeSceneCssClassTo("scene-bedChar10C");
          core.setActionVisible("btn-colocarSoro", false );
          core.setActionVisible("btn-realizar_gotejamento", true );


        })
        .setVisibility( false ),


      new Action("btn-administrar_medicamente", "Administrar Medicamento")
        .setCssClass("action-admnistrar_medicacao")
        .onClick(function() {

          if ( core.flag("verificar_pulseira") == true ) {

            if ( core.flag("administrar_medicamento") == false ) {
              core.flag("administrar_medicamento", true );
              core.registerScoreItem( Scores.administrarMedicamento );
            }

          } else {

            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );

          }

        })
        .setVisibility( false ),


      new Action("btn-realizar_gotejamento", "Realizar Gotejamento de Soro")
        .setCssClass("action-colocarSoro")
        .onClick(function() {

          if ( core.flag("realizar_gotejamento") == false ) {
            core.flag("realizar_gotejamento", true );
            core.registerScoreItem( Scores.realizarGotejamento );
          }

          EquipoGotejamento.open();
          core.openModalScene("equipoSoro");
          //   core.openModalScene("EquipamentoSoro");


        })
        .setVisibility( false ),


      new Action("btn-lavarMaos", "Lavar as mãos")
        .setCssClass("action-lavarMaos")
        .onClick(function() {

          if ( core.flag("verificar_pulseira") == true ) {

            // Som
            Player.play( Player.audios.sfx.lavarMaos );

            if ( core.flag("lavar_maos3") == false ) {
              core.flag("lavar_maos3", true );
              core.registerScoreItem( Scores.lavarMaos3 );
            }
          } else {

            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );

          }

        })
        .setVisibility( false ),


      new Action("btn-anotar_prontuario", "Anotar prontuario")
        .setCssClass("action-anotar_prontuario")
        .onClick(function() {


          if ( core.flag("verificar_pulseira") == true ) {

            console.log("Action: Anotar prontuario");
            if ( core.flag("lavar_maos3") == false ) {
              core.openDialog( 5 );
            } else {

              Prontuario.open();
              core.openModalScene("Prontuario");

              if ( core.flag("score_anotar_prontuario") == false ) {
                core.registerScoreItem( Scores.anotarNoProntuario );
                core.flag("score_anotar_prontuario", true );
              }

            }
          } else {

            if ( core.flag("score_pulseira") == false ) {
              core.flag("score_pulseira", true );
              core.registerScoreItem( Scores.naoVerificarPulseira );
            }

            core.openDialog( 7 );


          }
        })
        .setVisibility( false )
    ]);


    pulseira = new Scene("Pulseira", "Pulseira");


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

      new Action("btn-fechar_prontuario", "Fechar prontuário")
        .setCssClass("action-ler_prontuario")
        .onClick(function() {

          if ( core.flag("score_anotar_prontuario") == true ) {
            Prontuario.close();
            core.closeModalScene("Prontuario");
            core.setActionVisible("btn-pegar_suporte_soro", false );
            core.setActionVisible("btn-administrar_medicamente", false );
            core.setActionVisible("btn-realizar_gotejamento", false );
            core.setActionVisible("btn-lavarMaos", false );
            core.setActionVisible("btn-anotar_prontuario", false );
            core.closeCommandBar();
            core.showEndOfLevel();
            Player.stopAll();
            Player.play( Player.audios.sfx.missaoCumprida );
          } else {
            Prontuario.close();
          }

          console.log("Action: Fechar prontuario");

          core.closeModalScene("Prontuario");
        })
        .setVisibility( true )
    ]);


    equipoSoro = new Scene("equipoSoro", "EquipamentoSoro");

    var erro = 0;

    equipoSoro.registerActions([

      new Action("btn-fecharEquipoSoro", "Fechar Equipamento de Soro")
        .setCssClass("action-colocarSoro")
        .onClick(function() {

          if ( EquipoGotejamento.isValueRight() ) {

            if ( core.flag("score_gotejar_soro") == false ) {
              core.registerScoreItem( Scores.gotejarSoroEquipo );
              core.flag("score_gotejar_soro", true );
            }

            EquipoGotejamento.close();
            core.closeModalScene("equipoSoro");
            core.setActionVisible("btn-lavarMaos", true );
            core.setActionVisible("btn-anotar_prontuario", true );
            core.setActionVisible("btn-realizar_gotejamento", false );

          } else {
            core.closeCommandBar();
            core.openDialog( 6 );
            erro = erro + 1;

            if ( erro == 3 ) {
              core.registerScoreItem( Scores.naoGotejarSoroEquipo );
              erro = -100;
            }
          }


        })
        .setVisibility( true )


    ]);


    gaveta = new Scene("gaveta", "Gaveta")
      .setCssClass("modalScene-drawer");

    gaveta.registerActions([
      new Action("btn-fechar_gaveta", "Fechar gaveta")
        .setCssClass("action-fecharGaveta")
        .onClick(function() {

          console.log("Action: fechar_gaveta");
          // Som
          Player.play( Player.audios.sfx.fecharGaveta );
          core.closeModalScene("Gaveta");

          if ( (core.flag("pegar_seringa") == true) &&
            (core.flag("pegar_agulha") == true) &&
            (core.flag("pegar_ampola") == true) &&
            (core.flag("pegar_equipoSoro") == true) ) {


            core.setActionVisible("btn-lavarMaos", false );
            core.flag("pegou_tudo_postoEnfermagem", true );

          }
        })
        .setVisibility( true )

    ]);

    gaveta.registerInteractiveObjects([

      new InteractiveObject("io-seringa", "Seringa")
        .setCssClass("intObj-seringa_de_10_ml")
        .onClick(function() {

          console.log("IntObj: io-seringa");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );

          core.registerScoreItem( Scores.pegarSeringa );


          core.flag("pegar_seringa", true );

          core.setInteractiveObjectVisible("io-seringa", false );


        })
        .setVisibility( true ),

      new InteractiveObject("io-agulha", "Agulha 40X12")
        .setCssClass("intObj-agulha_40x12")
        .onClick(function() {

          console.log("intObj-agulha_40x12");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );

          core.registerScoreItem( Scores.pegarAgulha );


          core.flag("pegar_agulha", true );

          core.setInteractiveObjectVisible("io-agulha", false );


        })
        .setVisibility( true ),

      new InteractiveObject("io-ampola", "Ampola de Glicose 50%")
        .setCssClass("intObj-ampola_glicose_50")
        .onClick(function() {

          console.log("intObj-glicose");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );

          core.registerScoreItem( Scores.pegarGlicose );


          core.flag("pegar_ampola", true );

          core.setInteractiveObjectVisible("io-ampola", false );


        })
        .setVisibility( true ),


      new InteractiveObject("io-equipoSoro", "Equipamento de Soro Macrogotas")
        .setCssClass("intObj-equipo_de_soro")
        .onClick(function() {

          console.log("intObj-equipoSoro");
          // Som
          Player.play( Player.audios.sfx.pegarObjeto );

          core.registerScoreItem( Scores.pegarSoro );


          core.flag("pegar_equipoSoro", true );

          core.setInteractiveObjectVisible("io-equipoSoro", false );


        })
        .setVisibility( true )


    ]);

    soroGlicofisiologico = new Scene("conferirSoroGlicofisiologico1000", "Conferir Soro Glicofisiologico")
      .setCssClass("modalScene-soroGlicofisiologico1000");

    soroGlicofisiologico.registerActions([
      new Action("btn-fechar_zoom", "Finalizar conferição")
        .setCssClass("action-soro_glicofisiologico_1000ml")
        .onClick(function() {
          console.log("Action: Finalizar conferição");
          core.flag("conferirFrascoSG", true );
          core.closeModalScene("conferirSoroGlicofisiologico1000");
        })
    ]);
    cloretoSodio = new Scene("conferirCloretoSodio", "Conferir Cloreto de Sodio")
      .setCssClass("modalScene-cloretoSodio20");

    cloretoSodio.registerActions([
      new Action("btn-fechar_zoom", "Finalizar conferição")
        .setCssClass("action-cloreto_sodio_20_10ml")
        .onClick(function() {
          console.log("Action: Finalizar conferição");
          core.flag("conferirNACL", true );
          core.closeModalScene("conferirCloretoSodio");
        })
    ]);


    level.registerModalScene( prontuario );
    level.registerModalScene( gaveta );
    level.registerModalScene( pulseira );
    level.registerModalScene( equipoSoro );
    level.registerModalScene( soroGlicofisiologico );
    level.registerModalScene( cloretoSodio );


    // 00
    level.registerScene( recepcao );
    // 01
    level.registerScene( corredor );
    // 02
    level.registerScene( alaMasculina );
    // 03
    level.registerScene( leito );
    // 04
    level.registerScene( farmacia );
    // 05
    level.registerScene( postoDeEnfermagem );
    // 06
    level.registerScene( centroCirurgico );
    // 07
    level.registerScene( alaFeminina );
    // 08
    level.registerScene( leito2 );
    // 09
    level.registerScene( alaMasculina2 );


    level.setSetupScript(function() {
      // Script that runs once when the level is loaded or reloaded

      Prontuario.setNome("Pedro Alcides Mendonça");
      Prontuario.setSexo("M");
      Prontuario.setEstadoCivil("Solteiro");
      Prontuario.setDataNascimento("03/06/1962");
      Prontuario.setIdade("52 anos");
      Prontuario.setProfissao("Professor");
      Prontuario.setPai("Aldair Mendonça");
      Prontuario.setMae("Ana Laura Alcídes Mendonça");
      Prontuario.setAlergiaMedicamentosa( false, "");
      Prontuario.setDisableAlergiaMedicamentosa( true );
      Prontuario.setDataInternacao("27/12/2015");
      Prontuario.setLeito("01 - Enfermaria Masculina");
      Prontuario.setAntecedentes("Ocorrência de internação por Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório no mês de outubro");
      Prontuario.setHipotese("Desidratação de grau moderado");
      Prontuario.setObservacoes("Grande perda de eletrólitos");
      Prontuario.setPeso("62");
      Prontuario.setAltura("1,77");
      Prontuario.setCircunferenciaAbdominal("91");

      Prontuario.setPrescMedicaRowData( 0, "", "Soro Glicosado 5%", "Endovenosa", "800ml", "", false, false );
      Prontuario.setPrescMedicaRowData( 1, "", "NaCL 20%", "Endovenosa", "20ml", "", false, false );
      Prontuario.setPrescMedicaRowData( 2, "", "Glicose 50%", "Endovenosa", "30ml", "", false, false );
      // Necessário para evitar que valores antigos apareçam no prontuário
      Prontuario.setPrescMedicaRowData( 3, "", "", "", "", "", false, true );

      Prontuario.setPrescEnfermagemState([ "desiquilibrio_eletrolitico_fase9" ]);

      Prontuario.setSsvvRowData( 0, "", "130X70", "82", "19", "96", "35.9", true );
      Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

      Pulseira.setNameRegExp( /^Raul Gonzales Rodrigues$/i );
      Pulseira.setLeitoRegExp( /0*3/ );
      Pulseira.setDataRegExp( /24\/07\/1937/ );

      Pulseira.setName("Raul Gonzales Rodrigues");
      Pulseira.setLeito("03");
      Pulseira.setData("24/07/1937");
      Pulseira.disable();


      EquipoGotejamento.setRightValue( 12 );

      Ficha.setEnfermeiraRegexp( /^Masculina$/i );
      Ficha.setPacienteRegexp( /^Pedro Alc(í|i)des Mendon(ç|c)a$/i );
      Ficha.setLeitoRegexp( /0?1/ );
      Ficha.setVolumeRegexp( /850/ );
      Ficha.setDuracao( 24 );
      Ficha.setGotasRegexp( /11,80/ );
      Ficha.setGotasAproxRegexp( /12/ );
    });

    level.registerFlag( new Flag("score_iralaFeminina_horaErrada", false ) );
    level.registerFlag( new Flag("score_irCentroCirurgico_horaErrada", false ) );
    level.registerFlag( new Flag("conversar_paciente", false ) );
    level.registerFlag( new Flag("score_ir_farmacia_horaErrada", false ) );
    level.registerFlag( new Flag("score_irPosto_horaErrada", false ) );
    level.registerFlag( new Flag("pegar_prescricao_medica", false ) );
    level.registerFlag( new Flag("ler_prontuario", false ) );
    level.registerFlag( new Flag("pegarFrascoSG", false ) );
    level.registerFlag( new Flag("pegarNACL", false ) );
    level.registerFlag( new Flag("conferirMedicamento", false ) );
    level.registerFlag( new Flag("pegar_bandeja", false ) );
    level.registerFlag( new Flag("pegar_seringa", false ) );
    level.registerFlag( new Flag("pegar_agulha", false ) );
    level.registerFlag( new Flag("pegar_ampola", false ) );
    level.registerFlag( new Flag("pegar_equipoSoro", false ) );
    level.registerFlag( new Flag("pegou_tudo_postoEnfermagem", false ) );
    level.registerFlag( new Flag("lavar_maos", false ) );
    level.registerFlag( new Flag("trocou_de_leito", false ) );
    level.registerFlag( new Flag("falar_paciente_correto", false ) );
    level.registerFlag( new Flag("lavar_maos2", false ) );
    level.registerFlag( new Flag("realizar_gotejamento", false ) );
    level.registerFlag( new Flag("pegar_suporte_soro", false ) );
    level.registerFlag( new Flag("administrar_medicamento", false ) );
    level.registerFlag( new Flag("lavar_maos3", false ) );
    level.registerFlag( new Flag("score_anotar_prontuario", false ) );
    level.registerFlag( new Flag("irCentroCirurgicoHoraErrada", false ) );
    level.registerFlag( new Flag("score_lavarMaos1", false ) );
    level.registerFlag( new Flag("conferirFrascoSG", false ) );
    level.registerFlag( new Flag("conferirNACL", false ) );
    level.registerFlag( new Flag("score_verPulseira", false ) );
    level.registerFlag( new Flag("score_gotejar_soro", false ) );
    level.registerFlag( new Flag("conversar_recepcionista", false ) );
    level.registerFlag( new Flag("verificar_pulseira", false ) );
    level.registerFlag( new Flag("score_pulseira", false ) );


    level.setInitialScene( 0 );

    game.registerLevel( level, 10 );

    console.groupEnd();
  });
