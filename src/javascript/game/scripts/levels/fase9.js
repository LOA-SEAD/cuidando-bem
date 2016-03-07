/* by Wellyson */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "ScoresData" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores ) {

        // region Imports
        var Dialogs = require("DialogsData").fase9;
        var Alertas = require("DialogsData").alertas;
        var Scores = require("ScoresData").fase9;
        // endregion

        var level = new Level("Level 9");
        console.groupCollapsed( level.getName() );



     var
            recepcao,
            corredor,
            alaFeminina,
            centroCirurgico,
            salaDeLeitos,
            leito,
            postoDeEnfermagem,
            farmacia,
            gaveta,
            pulseira,
            prontuario,
            zoom;

        // region Scenes



        // region CENTRO CIRURGICO

     var centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function() {
                console.log("Load scene: " + centroCirurgico.getName() );
            });



    function corredorIrCentroCirurgico() {

                core.changeScene( 6 );
                if ( level.getFlag("score_irCentroCirurgico_horaErrada").getValue() == false ) {

                    level.getFlag("score_irCentroCirurgico_horaErrada").setValue( true );
                    // core.registerScoreItem( Scores.irCentroCirurgico_horaErrada );
                    console.log("PERDEU 25 PONTOS");

                }


        }

        // endregion CENTRO CIRURGICO


            // region ALA FEMININA


         var alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function() {

            });




              function corredorIrAlaFeminina() {
             core.changeScene( 7 );

            if ( level.getFlag("score_iralaFeminina_horaErrada").getValue() == false ) {

                    level.getFlag("score_iralaFeminina_horaErrada").setValue( true );
                    // core.registerScoreItem( Scores.irAlaFeminina_horaErrada );
                   console.log("PERDEU 25 PONTOS");

            }

        }
        // endregion ALA FEMININA




        // region Recepcao

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function() {
                console.log("Load scene: " + recepcao.getName() );

            });


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



        recepcao.registerDialogs([



        ]);



            function recepcaoIrCorredor() {
                console.log("Ir para o corredor");
                core.changeScene( 1 );
        }


        function conversarRecepcionista() {

        }


     // endregion RECEPCAO



     // region CORREDOR


        corredor = lib.scenes.corredor.getClone()
            .onLoad(function() {


            })
            .onUnload(function() {
                console.log("Saindo do corredor");
            });


        corredor.registerDialogs([

    ]);


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


             new InteractiveObject("io-ir_ala_masculina", "Ir para a Ala Masculina")
                .setCssClass("intObj-goToAlaMasculina")
                .onClick( corredorIrAlaMasculina )
                .setVisibility( true )



          /* new InteractiveObject("io-conversar_mentor", "Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function () {
                core.closeCommandBar();
                console.log("Abrir diálogo com o mentor");

                if(level.getFlag("ir_AlaMasculina_primeiraVez").getValue() == false)
                        core.openDialog(0);
                else
                    ;

                       if (level.getFlag("fim_fase").getValue() == true)
                    core.openDialog(6);

            })
                .setVisibility(true)*/
    ]);

        function corredorIrFarmacia() {
            if ( level.getFlag("ler_prontuario").getValue() == true ) {
                core.changeScene( 4 );
            }
        }

        function corredorIrPostoEnfermagem() {
            core.changeScene( 5 );
        }


        function corredorIrAlaMasculina() {
            core.changeScene( 2 );
        }


      // region ALA MASCULINA


      var alaMasculina = lib.scenes.alaMasculina.getClone()
            .onLoad(function() {



                if ( level.getFlag("falar_paciente").getValue() == false ) {
                    level.getFlag("falar_paciente").setValue( true );
                    core.openDialog( 0 );
                } else if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == true ) {

                }

                console.log("Load scene: " + alaMasculina.getName() );

                /*
                 core.setInteractiveObjectVisible("io-conversar_com_paciente", false);
                */
            });





     alaMasculina.registerDialogs([

                        // 0

                new Dialog( lib.characters.jogador )
                .setText("")
                // .registerOption( Dialogs.ala_masculina[ 0 ], function() {
                .registerOption( "", function() {
                    core.openDialog( 1 );
            })
                // .registerOption( Dialogs.ala_masculina[ 1 ], function() {
                .registerOption( "", function() {
                core.openDialog( 4 );
            })
                .setRandomize( true ),



                // 1

            new Dialog( lib.characters.pacientes.francisco )
                // .setText( Dialogs.ala_masculina[ 2 ] )
                .setText( "" )
                .registerOption("", function() {
                core.openDialog( 2 );
            }),


            // 2


         new Dialog( lib.characters.jogador )
                // .setText( Dialogs.ala_masculina[ 3 ] )
                .setText( "" )
                .registerOption("", function() {
                core.openDialog( 3 );
            }),


         // 3


           new Dialog( lib.characters.pacientes.francisco )
                // .setText( Dialogs.ala_masculina[ 4 ] )
                .setText( "" )
                .registerOption("", function() {
                core.closeDialog();
            }),


         // 4 - MENTOR ALERTA

           new Dialog( lib.characters.mentor )
                    // .setText( Dialogs.ala_masculina[ 5 ] )
                    .setText( "" )
                    .registerOption("", function() {
                core.openDialog( 0 );
            })


    ]);




    alaMasculina.registerInteractiveObjects([


      new InteractiveObject("io-ir_corredor", "Ir ao corredor")
                .setCssClass("intObj-irAlaMasculina_corredor")
                .onClick(function() {
                console.log("voltando para corredor");

                core.changeScene( 1 );

            })


       /*
         new InteractiveObject("io-conversar_com_paciente", "Ir ao leito")
                .setCssClass("intObj-ir_leito_fase3")
                .onClick(function () {

                    if (level.getFlag("ir_leito_paciente").getValue() == false) {
                        level.getFlag("ir_leito_paciente").setValue(true);
                        console.log("Abrir diálogo com paciente 6");
                        core.registerScoreItem(Scores.irAoLeitoCorreto);
                        core.changeScene(3);
                    }



            })
           .setVisibility(true),
        */



 ]);

     alaMasculina.registerActions([




            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {

                    if ( level.getFlag("ler_prontuario").getValue() == false ) {
                            level.getFlag("ler_prontuario").setValue( true );
                            core.registerScoreItem( Scores.lerProntuario );

                    }


                        Prontuario.open();
                        core.openModalScene("Prontuario");
                        core.registerScoreItem( Scores.verProntuario );


            })
                .setVisibility( true )






         ]);

       // endregion ALA MASCULINA

      var farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function() {

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
                }),

            // 3 MENTOR CORRIGE

                 new Dialog( lib.characters.mentor )
                .setText( Dialogs.farmacia[ 3 ] )
                .registerOption("", function() {
                    core.closeDialog();
                })

        ]);

        farmacia.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
               .setCssClass("action-ir_corredor")
               .onClick(function() {

                    if ( level.getFlag("verificar_medicamento").getValue() == true ) {
                        core.changeScene( 1 );
                    }



                }),

            new Action("btn-pegarFrascoDieta", "Pegar Frasco de SG 5%")
                .setCssClass("action-frasco_dieta")
                .onClick(function() {

                    if ( level.getFlag("pegarFrascoSG").getValue() == false ) {

                    level.getFlag("pegarFrascoSG").setValue( true );
                    core.registerScoreItem( Scores.pegarFrascoSG );

                        }

                }),


            new Action("btn-cloretoSodio_20_10ml", "Pegar NaCL 20%")
                .setCssClass("action-cloretoSodio_20_10ml")
                .onClick(function() {

                     if ( level.getFlag("pegarNACL").getValue() == false ) {

                    level.getFlag("pegarNACL").setValue( true );
                    core.registerScoreItem( Scores.pegarNACL );

                     }

                }),


            new Action("btn-conferirMedicamento", "Conferir Medicamento")
                .setCssClass("action-conferirMedicamento")
                .onClick(function() {


                    if ( level.getFlag("pegarFrascoSG").getValue() == false || level.getFlag("pegarNACL").getValue() == false ) {
                            core.openDialog( 3 );
                    } else {

                        if ( level.getFlag("conferirMedicamento").getValue() == false )  {
                        level.getFlag("conferirMedicamento").setValue( true );
                        core.registerScoreItem( Scores.conferirDieta );
                        }
                    }
                })
           ]);

    // endregion FARMACIA



     // region POSTO DE ENFERMAGEM

    var postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
    .onLoad(function() {

      console.log("Load scene: " + postoDeEnfermagem.getName() );

      //     if(level.getFlag("ler_prontuario").getValue() == false || level.getFlag("conferirDieta").getValue() == false)

  });

    postoDeEnfermagem.registerDialogs([

        // 0

          new Dialog( lib.characters.mentor )
          .setText( Alertas.esqueceu.pegarBandeja )
          .registerOption("", function() {
            core.closeDialog();
        })



        ]);

    postoDeEnfermagem.registerInteractiveObjects([

        new InteractiveObject("io-abrir_gaveta", "Abrir gaveta")
        .setCssClass("intObj-openDrawer")
        .onClick(function() {

            if ( level.getFlag("pegar_bandeja").getValue() == false ) {
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
            level.getFlag("pegar_bandeja").setValue( true );
                    // linha importante
                    core.setInteractiveObjectVisible("io-pegar_bandeja", false );
                })
        .setVisibility( true )

        ]);

    postoDeEnfermagem.registerActions([

        new Action("btn-ir_corredor", "Ir ao corredor")
            .setCssClass("action-ir_corredor")
            .onClick(function() {
                if ( level.getFlag("pegou_tudo_postoEnfermagem").getValue() == false ) {
                       core.openDialog( 0 );
                } else {
                    core.changeScene( 1 );
                }
            }),

        new Action("btn-lavarMaos", "Lavar as mãos")
            .setCssClass("action-lavarMaos")
            .onClick(function() {

                if ( level.getFlag("score_lavarMaos1").getValue() == false ) {
                    core.registerScoreItem( Scores.lavarMaos1 );
                }

                level.getFlag("score_lavarMaos1").setValue( true );
            })
            .setVisibility( true )

    ]);

    // endregion POSTO DE ENFERMAGEM



         // region PRONTUARIO

        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function() {


                        Prontuario.close();
                        core.setActionVisible("btn-fechar_prontuario", false );


                    console.log("Action: Fechar prontuario");

                    core.closeModalScene("Prontuario");
                })
                .setVisibility( true )
        ]);



      // region GAVETA
        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick(function() {

                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");

                    if ( (level.getFlag("pegar_seringa").getValue() == true) &&
                        (level.getFlag("pegar_agulha").getValue() == true) &&
                        (level.getFlag("pegar_ampola").getValue() == true) &&
                        (level.getFlag("pegar_equipoSoro").getValue() == true) )  {


                      //  core.openDialog( 0 );
                        level.getFlag("pegou_tudo_postoEnfermagem").setValue( true );

                    }
                })
                .setVisibility( true )

        ]);

    gaveta.registerInteractiveObjects([

        new InteractiveObject("io-seringa", "Seringa")
        .setCssClass("intObj-seringa_de_10_ml")
        .onClick(function() {

            console.log("IntObj: io-seringa");
            level.getFlag("pegar_seringa").setValue( true );
            core.setInteractiveObjectVisible("io-seringa", false );

            core.registerScoreItem( Scores.pegarSeringa );

        })
        .setVisibility( true ),

        new InteractiveObject("io-agulha", "Agulha 40X12")
        .setCssClass("intObj-agulha_40x12")
        .onClick(function() {

            console.log("intObj-agulha_40x12");
            level.getFlag("pegar_agulha").setValue( true );
            core.setInteractiveObjectVisible("io-agulha", false );

            core.registerScoreItem( Scores.pegarAgulha );

        })
        .setVisibility( true ),

        new InteractiveObject("io-ampola", "Ampola de Glicose 50%")
        .setCssClass("glicose_30_10ml")
        .onClick(function() {

            console.log("intObj-glicose");
            level.getFlag("pegar_ampola").setValue( true );
            core.setInteractiveObjectVisible("io-ampola", false );

            core.registerScoreItem( Scores.pegarAmpola );

        })
        .setVisibility( true ),


         new InteractiveObject("io-equipoSoro", "Equipamento de Soro Macrogotas")
        .setCssClass("???????????????")
        .onClick(function() {

            console.log("intObj-equipoSoro");
            level.getFlag("pegar_equipoSoro").setValue( true );
            core.setInteractiveObjectVisible("io-equipoSoro", false );

            core.registerScoreItem( Scores.pegarSoro );

        })
        .setVisibility( true )


    ]);





        // endregion

        // endregion

        // region ModalScenes

        level.registerModalScene( prontuario );
        level.registerModalScene( gaveta );
        level.registerModalScene( pulseira );

        // endregion

        // region Level

       // region Register Scenes

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

        // endregion

        // region Register Modal Scenes

        // endregion

        // region Flags

        // endregion

        level.setSetupScript(function() {
            // Script that runs once when the level is loaded or reloaded

            level.getFlag("score_iralaFeminina_horaErrada").setValue( false );
            level.getFlag("score_irCentroCirurgico_horaErrada").setValue( false );





             //  dados do prontuario
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
            Prontuario.setPrescEnfermagemState("decubito");
            Prontuario.setPrescMedicaRowData( 1, "", "Soro Glicosado 5%", "Endovenosa", "800ml", "", "(X) Administrado a infusão de  solução de  reposição  hidroeletrolítica  conforme  prescrição  médica, sem  intercorrências.", false );
            Prontuario.setPrescMedicaRowData( 1, "", "NaCL 20%", "Endovenosa", "20ml", "", "(X) Administrado a infusão de  solução de  reposição  hidroeletrolítica  conforme  prescrição  médica, sem  intercorrências.", false );
            Prontuario.setPrescMedicaRowData( 1, "", "Glicose 50%", "Endovenosa", "30ml", "", "(X) Administrado a infusão de  solução de  reposição  hidroeletrolítica  conforme  prescrição  médica, sem  intercorrências.", false );
            Prontuario.setSsvvRowData( 1, "", "130X70 mmHg", "82 bpm", "19 rpm", "96%", "35.9ºC", true );
        //    Prontuario.setAnotacaoEnfermagemRowData( "15/03", "" );
        });







        level.registerFlag( new Flag("score_iralaFeminina_horaErrada"), false );
        level.registerFlag( new Flag("score_irCentroCirurgico_horaErrada"), false );




        level.setInitialScene( 0 );
        // endregion

        game.registerLevel( level, 9 );

        console.groupEnd();


    });
