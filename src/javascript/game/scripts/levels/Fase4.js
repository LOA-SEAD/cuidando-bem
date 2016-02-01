define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, Scores){

        // region Imports
        var Dialogs = require("Dialogs_data").fase4;
        var Alertas = require("Dialogs_data").alertas;
        var Scores = require("Scores_data").level4;
        // endregion

        var level = new Level("Level Fase4");
        console.groupCollapsed(level.getName());

        // region Scenes
        var
        recepcao,
        corredor,
        ala_masculina,
        leito,
        posto_de_enfermagem,
        gaveta_esquerda,
        gaveta_direita,
        prontuario,
        pulseira;

        // region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            core.closeDialog();
            core.changeScene(1);
            console.log("Ir para o corredor");
        }

        function conversarRecepcionista() {
            console.log("action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

            recepcao.registerDialogs([
                // Dialog 0
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.recepcao[0], function(){
                        core.openDialog(1);
                    }),

                // Dialog 1
                new Dialog(lib.characters.recepcionista)
                    .setText(Dialogs.recepcao[1])
                    .registerOption("", function(){
                        console.log("Encerrar o diálogo");
                        core.closeDialog(1);
                        level.getFlag("pegarFolheto9Certos").setValue(true);
                        core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true);
                        core.setInteractiveObjectVisible("io-ir_corredor_direita", true);
                    })
            ]);

            recepcao.registerInteractiveObjects([
                new InteractiveObject("intObj-conversar_recepcionista", "Conversar com a Recepcionista")
                    .setCssClass("intObj-talkToReceptionist")
                    .setVisibility(true)
                    .onClick(conversarRecepcionista),


                new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-left")
                    .onClick(recepcaoIrCorredor)
                    .setVisibility(true),


                new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-right")
                    .onClick(recepcaoIrCorredor)
                    .setVisibility(true),

                new InteractiveObject("io-pegar_folheto_dos_9_certos","Pegar Folheto dos 9 Certos")
                    .setCssClass("intObj-9Certos")
                    .onClick(function(){
                        core.setInteractiveObjectVisible("io-pegar_folheto_dos_9_certos", false);
                        level.getFlag("pegarFolheto9Certos").setValue(true);
                    })
                    .setVisibility(true)
            ]);
        // endregion

        // region Corredor
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function(){
                console.log("Entrando no corredor");
            })
            .onUnload(function(){
                console.log("Saindo do corredor");
            });

            function corredorIrSalaLeitos(){
                console.log("Vá para sala de leitos");
                core.changeScene(2);
            }

            function corredorIrPostoEnfermagem(){
                console.log("Vá para o posto de enfermagem");
                core.changeScene(5);
            }

            function corredorIrFarmacia(){
                console.log("Vá para a farmácia");
                core.changeScene(4);
            }

            corredor.registerInteractiveObjects([
                new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                    .setCssClass("intObj-goToBedroom")
                    .onClick(corredorIrSalaLeitos)
                    .setVisibility(true),

                new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                    .setCssClass("intObj-goToNursingStation")
                    .onClick(corredorIrPostoEnfermagem)
                    .setVisibility(true),

                new InteractiveObject("io-ir_farmacia","Ir para a Farmácia")
                    .setCssClass("intObj-goToPharmacy")
                    .onClick(corredorIrFarmacia)
                    .setVisibility(true)
            ]);

        // endregion

        // region Sala de Leitos
        ala_masculina = new Scene("ala_masculina", "scene-ala_masculina")

            .setCssClass("scene-bedroom")
            .onLoad(function(){
                console.log("Load scene: " + ala_masculina.getName());
                core.setInteractiveObjectVisible("io-ir_leito", true);
                core.setInteractiveObjectVisible("io-ir_corredor", true);
                core.setActionVisible("btn-lavar_maos", true);

                if( level.getFlag("pegarPrescricaoMedica").getValue() == true &&
                    level.getFlag("pegarMedicamento").getValue()      == false   ){
                    // vá para a farmácia!
                    core.openDialog(0);
                    core.registerScoreItem(Scores.irLugarErrado);
                }
                else if(level.getFlag("pegarPrescricaoMedica").getValue() == true &&
                        level.getFlag("pegarMedicamento").getValue()      == true &&
                        level.getFlag("prepararMedicacao").getValue()     == false   ){
                    // vá para o posto de enfermagem
                    core.openDialog(1);
                    core.registerScoreItem(Scores.irLugarErrado);
                }

            })
            .onUnload(function(){
                level.getFlag("lavarMaosSalaLeitos").setValue(false);
            })

            ala_masculina.registerActions([

                new Action("btn-lavar_maos", "Lavar as mãos")
                    .setCssClass("action-lavar_maos")
                    .onClick(function(){
                        console.log("Action: lavar_maos");
                        if(level.getFlag("lavarMaosSalaLeitos").getValue() == false){
                            level.getFlag("lavarMaosSalaLeitos").setValue(true);
                            core.setActionVisible("btn-lavar_maos", false);
                        }
                    })
                    .setVisibility(true)
                ]);

            ala_masculina.registerDialogs([
                // Dialog 0 - Vá para a farmácia
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[1])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),
                // Dialog 1 - Vá para o posto de enfermagem
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[2])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),
            ]);

            ala_masculina.registerInteractiveObjects([
                new InteractiveObject("io-ir_leito", "Ir ao leito")
                    .setCssClass("intObj-ir_leito-fase4")
                    .onClick(function(){
                        core.changeScene(3);
                    })
                    .setVisibility(true),

                new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                    .setCssClass("intObj-bedroomToHallway")
                    .onClick(function(){
                        core.changeScene(1);
                    })
                    .setVisibility(true),

                new InteractiveObject("io-ler_prontuario", "Ler prontuário")
                    .setCssClass("intObj-prontuario-leito1-fase4")
                    .onClick(function(){
                        console.log("Action: ler prontuario");
                        Prontuario.open();
                        core.openModalScene("Prontuario");

                        if(level.getFlag("lavarMaosSalaLeitos").getValue() == true){
                            core.registerScoreItem(Scores.lavarMaos);
                        }
                        else{
                            core.registerScoreItem(Scores.notLavarMaos);
                        }

                    })
                    .setVisibility(true)

            ]);

        // endregion

        // region Leito
        leito = lib.scenes.leitos.pedro.getClone()
            .onLoad(function(){
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);
                core.setActionVisible("btn-ir_sala_leitos", true);
                core.setActionVisible("btn-lavar_maos", true);
                core.setActionVisible("btn-ler_prontuario", true);

                if( level.getFlag("pegarPrescricaoMedica").getValue() == true &&
                    level.getFlag("pegarMedicamento").getValue()      == true &&
                    level.getFlag("prepararMedicacao").getValue()     == true ){
                    // after first visit
                    core.openDialog(3);
                }
                else if(level.getFlag("falarComPaciente").getValue() == false){
                    // the first visit
                    level.getFlag("falarComPaciente").setValue(true);
                    core.openDialog(0);
                }

            })
            .onUnload(function(){
                console.log("Leito: OnUnload");
                level.getFlag("lavarMaosLeito").setValue(false);
                level.getFlag("checarPulseira").setValue(false);
            });

            // region Leito - Dialogs
            leito.registerDialogs([
                // Dialog 0
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.ala_masculina[0], function(){
                        core.openDialog(1);
                    }),
                // Dialog 1
                new Dialog(lib.characters.pacientes.pedro)
                    .setText(Dialogs.ala_masculina[1])
                    .registerOption("", function(){

                        core.openDialog(2);
                    }),
                // Dialog 2
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.ala_masculina[2], function(){
                        core.closeDialog();
                    })
                    .registerOption(Dialogs.ala_masculina[3], function(){
                        core.closeDialog();
                    })
                    .registerOption(Dialogs.ala_masculina[4], function(){
                        core.closeDialog();
                    })
                    .setRandomize(true),

                // dialog 3
                // after first visit
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.leito_paciente[0], function(){
                        core.openDialog(4);
                    }),
                // Dialog 4
                new Dialog(lib.characters.pacientes.pedro)
                    .setText(Dialogs.leito_paciente[1])
                    .registerOption("", function () {
                        core.openDialog(5);
                    }),
                // Dialog 5
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.leito_paciente[2], function(){
                        core.openDialog(6);
                    })
                    .registerOption(Dialogs.leito_paciente[3], function(){
                        core.openDialog(6);
                    })
                    .registerOption(Dialogs.leito_paciente[4], function(){
                        core.openDialog(6);
                    })
                    .setRandomize(true),
                // Dialog 6
                new Dialog(lib.characters.pacientes.pedro)
                    .setText(Dialogs.leito_paciente[5])
                    .registerOption("", function(){
                        core.openDialog(7);
                    }),
                // Dialog 7
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.leito_paciente[6], function(){
                        core.openDialog(8);
                    }),
                // Dialog 8
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.leito_paciente[7])
                    .registerOption("", function(){
                        core.closeDialog();
                    })
            ]);
            // endregion

            // region Leito - interactiveObjects and Actions
            leito.registerInteractiveObjects([
                new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                    .setCssClass("intObj-paciente_01-checar_pulseira")
                    .onClick(function(){
                        console.log("IO: pulseira_paciente");
                        core.openModalScene("Pulseira");
                        Pulseira.open();
                        core.openCommandBar();
                    })
                    .setVisibility(true)
            ]);

            leito.registerActions([

                new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                    .setCssClass("action-ir_sala_de_leitos")
                    .onClick(function(){
                        if(level.getFlag("checarPulseira").getValue() == false){
                            level.getFlag("lavarMaosLeito").setValue(true);
                            core.registerScoreItem(Scores.checarPulseira);
                        }
                        else{
                            core.registerScoreItem(Scores.notChecarPulseira);
                        }
                        console.log("Action: action-ir_sala_de_leitos");
                        core.changeScene(2);
                        Pulseira.disable();
                    })
                    .setVisibility(true),

                new Action("btn-lavar_maos", "Lavar as mãos")
                    .setCssClass("action-lavar_maos")
                    .onClick(function(){
                        if(level.getFlag("lavarMaosLeito").getValue() == false){
                            level.getFlag("lavarMaosLeito").setValue(true);
                            core.setActionVisible("btn-lavar_maos", false);
                        }
                        console.log("Action: lavar_maos");
                    })
                    .setVisibility(true),

                new Action("btn-ler_prontuario", "Ler prontuario")
                    .setCssClass("action-ler_prontuario")
                    .onClick(function(){
                        console.log("Action: ler prontuario");
                        Prontuario.open();
                        core.openModalScene("Prontuario");

                        if(level.getFlag("lavarMaosLeito").getValue() == true){
                            core.registerScoreItem(Scores.lavarMaos);
                        }
                        else{
                            core.registerScoreItem(Scores.notLavarMaos);
                        }

                    })
                    .setVisibility(true)
            ]);
        // endregion

        // region Farmácia
        function farmaciaIrCorredor(){
            console.log("Funcao: farmacia_ir_corredor");
            core.closeDialog();
            core.changeScene(1);
            console.log("Ir para o corredor");
        }

        farmacia = new Scene("farmacia", "scene-pharmacy")
            .setCssClass("scene-pharmacy")

            .onLoad(function(){
                if( level.getFlag("pegarPrescricaoMedica").getValue() == false){
                    // vá para a Ala Masculina
                    core.openDialog(4);
                    core.registerScoreItem(Scores.irLugarErrado);
                }
                else if( level.getFlag("pegarPrescricaoMedica").getValue() == true &&
                         level.getFlag("pegarMedicamento").getValue()      == true    ){
                    // Vá para o Posto de Enfermagem (já pegou medicamento!)
                    core.openDialog(5);
                    core.registerScoreItem(Scores.irLugarErrado);
                }
                else if(level.getFlag("prepararMedicacao").getValue() == true){
                    // TODO: 
                }
                else{
                    core.openDialog(0);
                }

                core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true);
                core.setInteractiveObjectVisible("io-ir_corredor_direita", true);
            });

            farmacia.registerDialogs([
                // Dialog 0
                new Dialog(lib.characters.paulo)
                    .setText(Dialogs.farmacia[0])
                    .registerOption("", function(){
                        core.openDialog(1);
                    }),
                // Dialog 1
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.farmacia[1], function(){
                        core.openDialog(2);
                    }),
                // Dialog 2
                new Dialog(lib.characters.paulo)
                    .setText(Dialogs.farmacia[2])
                    .registerOption("", function(){
                        core.openDialog(3);
                        level.getFlag("pegarMedicamento").setValue(true);
                    }),
                // Dialog 3
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.farmacia[3], function(){
                        core.closeDialog();
                    }),
                // Dialog 4
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[0])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),
                // Dialog 5
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[2])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),
            ]);

            farmacia.registerInteractiveObjects([

                new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-left")
                    .onClick(farmaciaIrCorredor)
                    .setVisibility(true),


                new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                    .setCssClass("intObj-lobbyToHallway-right")
                    .onClick(farmaciaIrCorredor)
                    .setVisibility(true)

            ]);

        // endregion

        // region Posto de Enfermagem
        posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function(){
                core.openCommandBar();
                core.setActionVisible("btn-lavar_maos", true);

                if( level.getFlag("pegarPrescricaoMedica").getValue() == false ||
                    level.getFlag("prepararMedicacao").getValue()     == true     ){
                    // Vá para a Ala Masculina
                    core.openDialog(5);
                    core.registerScoreItem(Scores.irLugarErrado);
                }
                else if( level.getFlag("pegarPrescricaoMedica").getValue() == true &&
                         level.getFlag("pegarMedicamento").getValue()      == false   ){
                    // Vá para a Farmácia
                    core.openDialog(6);
                    core.registerScoreItem(Scores.irLugarErrado);
                }

                core.openDialog(0);

            })
            .onUnload(function(){
                core.closeCommandBar();
                level.getFlag("lavarMaosPostoEnfermagem").setValue(false);
                //level.getFlag("prepararMedicacao").setValue(true);
            });

            posto_de_enfermagem.registerActions([
                new Action("btn-ir_corredor", "Ir ao corredor")
                    .setCssClass("action-ir_corredor")
                    .onClick(function(){
                        if (     level.getFlag("pegarSoroFisiológico").getValue()      == true &&
                                 level.getFlag("pegarSeringa5").getValue()             == true &&
                                 level.getFlag("pegarAgulha").getValue()               == true &&
                                 level.getFlag("pegarAlcool").getValue()               == true &&
                                 level.getFlag("pegarAlgodao").getValue()              == true &&
                                 level.getFlag("pegarEquipoSoroMacrogotas").getValue() == true &&
                                 level.getFlag("pegarLuvas").getValue()                == true &&
                                 level.getFlag("pegarSeringa10").getValue()            == true &&
                                 level.getFlag("pegarAmpolaSF").getValue()             == true &&
                                 level.getFlag("pegarBandeja").getValue()              == true    ) {
                                
                            level.getFlag("pegarInstrumentos").setValue(true);
                            console.log("Action: ir_corredor");
                            core.changeScene(1);
                            
                        }
                        else{
                            core.openDialog(4);
                        }
                        
                    })
                    .setVisibility(true),

                new Action("btn-lavar_maos", "Lavar as mãos")
                    .setCssClass("action-lavar_maos")
                    .onClick(function(){
                        console.log("Action: lavar_maos");
                        if(level.getFlag("lavarMaosPostoEnfermagem").getValue() == false){
                            level.getFlag("lavarMaosPostoEnfermagem").setValue(true);
                            core.setActionVisible("btn-lavar_maos", false);
                        }

                    })
                    .setVisibility(true)
            ]);

            posto_de_enfermagem.registerDialogs([
                // Dialog 0
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.posto_de_enfermagem[0], function () {
                        core.closeDialog();
                    })
                    .registerOption(Dialogs.posto_de_enfermagem[1], function () {
                        core.openDialog(1);
                    })
                    .registerOption(Dialogs.posto_de_enfermagem[2], function () {
                        core.openDialog(1);
                    })
                    .setRandomize(true),
                // Dialog 1
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.posto_de_enfermagem[3])
                    .registerOption("", function(){
                        core.openDialog(0);
                    }),
                // Dialog 2
                new Dialog(lib.characters.jogador)
                    .setText("")
                    .registerOption(Dialogs.posto_de_enfermagem[4], function(){
                        core.openDialog(1);
                    }),
                // Dialog 3
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.posto_de_enfermagem[5])
                    .registerOption("", function(){
                        core.closeDialog();
                    }),
                // Dialog 4
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.posto_de_enfermagem[6])
                    .registerOption("", function(){
                        core.closeDialog();
                    }),
                // Dialog 5 - Vá para a Ala Masculina
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[0])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),
                // Dialog 6 - Vá para a Farmácia
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.lugar_incorreto[1])
                    .registerOption("", function(){
                        core.closeDialog();
                        core.changeScene(1);
                    }),

            ]);

            posto_de_enfermagem.registerInteractiveObjects([

                new InteractiveObject("io-abrir_gaveta_esquerda","Abrir gaveta esquerda")
                    .setCssClass("intObj-openDrawer_left")
                    .onClick(function(){
                        console.log("Action: abrir_gaveta_esquerda");
                        core.openModalScene("gaveta_esquerda");
                        core.openCommandBar();

                        // core.setInteractiveObjectVisible("io-coxim", !(level.getFlag("coxim").getValue()));
                    })
                    .setVisibility(true),

                    new InteractiveObject("io-abrir_gaveta_direita","Abrir gaveta direita")
                    .setCssClass("intObj-openDrawer_right")
                    .onClick(function(){
                        console.log("Action: abrir_gaveta_direita");
                        core.openModalScene("gaveta_direita");
                        core.openCommandBar();

                        // core.setInteractiveObjectVisible("io-coxim", !(level.getFlag("coxim").getValue()));
                    })
                    .setVisibility(true)

            ]);
        // endregion

        // region gaveta esquerda
        gaveta_esquerda = new Scene("gaveta_esquerda", "Gaveta esquerda")
            .setCssClass("modalScene-drawer");

            gaveta_esquerda.registerActions([
                new Action("btn-fechar_gaveta", "Fechar gaveta")
                    .setCssClass("action-fechar_gaveta")
                    .onClick(function(){

                        console.log("Action: fechar_gaveta_esquerda");
                        core.closeModalScene("Gaveta esquerda");

                    })
                    .setVisibility(true)
            ]);

            gaveta_esquerda.registerInteractiveObjects([
                new InteractiveObject("io-coxim", "Coxim")
                    .setCssClass("intObj-cushion")
                    .onClick(function(){
                        console.log("IntObj: io-coxim");
                        // level.getFlag("coxim").setValue(true);
                        // core.setInteractiveObjectVisible("io-coxim", false);

                        // if(level.getFlag("score_pegar_coxim").getValue() == false) {
                        //     core.registerScoreItem(Scores.pegarCoxim);
                        // level.getFlag("score_pegar_coxim").setValue(true);
                        // }
                    })
                    .setVisibility(true)
            ]);

        // region gaveta direita
        gaveta_direita = new Scene("gaveta_direita", "Gaveta direita")
            .setCssClass("modalScene-drawer");

            gaveta_direita.registerActions([
                new Action("btn-fechar_gaveta", "Fechar gaveta")
                    .setCssClass("action-fechar_gaveta")
                    .onClick(function(){
                        console.log("Action: fechar_gaveta_direita");
                        core.closeModalScene("Gaveta direita");
                    })
                    .setVisibility(true)
            ]);

            gaveta_direita.registerInteractiveObjects([
                new InteractiveObject("io-coxim", "Coxim")
                    .setCssClass("intObj-cushion")
                    .onClick(function(){
                        console.log("IntObj: io-coxim");
                        //level.getFlag("coxim").setValue(true);
                       // core.setInteractiveObjectVisible("io-coxim", false);

                       // if(level.getFlag("score_pegar_coxim").getValue() == false) {
                       //     core.registerScoreItem(Scores.pegarCoxim);
                       // level.getFlag("score_pegar_coxim").setValue(true);
                       // }
                    })
                    .setVisibility(true)
            ]);

        // region prontuario

        prontuario = new Scene("Prontuario", "Prontuario")
            .onLoad(function(){
                core.openCommandBar();
                core.setActionVisible("btn-fechar_prontuario", true);
                core.setActionVisible("btn-pegar_prescricao_medica", true);
            })

            prontuario.registerActions([
                new Action("btn-fechar_prontuario", "Fechar prontuário")
                    .setCssClass("action-ler_prontuario")
                    .onClick(function(){
                        console.log("Action: Fechar prontuario");
                        core.closeModalScene("Prontuario");
                        Prontuario.close();
                    })
                    .setVisibility(true),

                new Action("btn-pegar_prescricao_medica", "Pegar prescrição médica")
                    .setCssClass("action-pegar_prescricao_medica")
                    .onClick(function(){
                        console.log("Action: Pegar prescrição médica");
                        level.getFlag("pegarPrescricaoMedica").setValue(true);
                        core.setActionVisible("btn-pegar_prescricao_medica", false);
                    })
                    .setVisibility(true)
            ]);
            // endregion

        // region pulseira
        pulseira = new Scene("Pulseira", "Pulseira")

            pulseira.registerActions([
                new Action("btn-largar_pulseira", "Fechar pulseira")
                    .setCssClass("action-pulseira_pedro")
                    .onClick(function(){
                        console.log("Ação: Fechar modal pulseira");
                        core.closeModalScene("Pulseira");

                        Pulseira.close();

                        if(level.getFlag("checarPulseira").getValue() == false){
                            core.registerScoreItem(Scores.checarPulseira);
                            level.getFlag("checarPulseira").setValue(true);
                        }
                    })
                    .setVisibility(true)
            ]);

        // endregion

        level.setSetupScript(function(){

            // 'prontuário' content
            Prontuario.setNome("Pedro Alcídes Mendonça");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("03/06/1962");
            Prontuario.setIdade("62 anos");
            Prontuario.setProfissao("Professor");
            Prontuario.setPai("Aldair Mendonça");
            Prontuario.setMae("Ana Laura Alcídes Mendonça ");
            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("10/10/2015");
            Prontuario.setLeito("01 - Leito Masculino");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório.");
            Prontuario.setObservacoes("Está no 2.º dia de uso de Cefalotina Sódica (Keflin®)");
            Prontuario.setPeso("62");
            Prontuario.setAltura("1,77");
            Prontuario.setCircunferenciaAbdominal("91");
            Prontuario.setPrescEnfermagemState("decubito");
            Prontuario.setPrescMedicaRowData(0, "15/03", "Cefalotina sódica (Keflin®)", "Endovenosa", "800 mg diluído em 100 ml de SF (soro fisiológico) 0,9% em 01 hora", "6/6h", "Administrado medicação sem intercorrência<br />(X) Administrado medicação com intercorrência", true);
            Prontuario.setPrescMedicaRowData(1, '', '', '', '', '', '', false);
            Prontuario.setSsvvRowData(0, '15/03', '110x70', '55', '16', '96', '37.3', true);
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);
            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');

            // 'pulseira' content
            Pulseira.setNameRegExp(/Pedro Alcides Mendonça/);
            Pulseira.setLeitoRegExp(/0*1/);
            Pulseira.setDataRegExp(/03\/06\/1962/);
            Pulseira.setName("Pedro Alcides Mendonça");
            Pulseira.setLeito("13");
            Pulseira.setData("03/06/1962");
            Pulseira.disable();
        });

        // region Register Scenes
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(ala_masculina);
        level.registerScene(leito);
        level.registerScene(farmacia);
        level.registerScene(posto_de_enfermagem);
        // endregion

        // region Register Modal Scenes
        level.registerModalScene(pulseira);
        level.registerModalScene(prontuario);
        level.registerModalScene(gaveta_esquerda);
        level.registerModalScene(gaveta_direita);
        // endregion

        // region Flags
        level.registerFlag(new Flag("pegarFolheto9Certos", false));
        level.registerFlag(new Flag("checarPulseira", false));

        level.registerFlag(new Flag("falarComPaciente", false));
        level.registerFlag(new Flag("pegarPrescricaoMedica", false));
        level.registerFlag(new Flag("pegarMedicamento", false));
        level.registerFlag(new Flag("prepararMedicacao", false));

        level.registerFlag(new Flag("lavarMaosSalaLeitos", false));
        level.registerFlag(new Flag("lavarMaosLeito", false));
        level.registerFlag(new Flag("lavarMaosPostoEnfermagem", false));

        level.registerFlag(new Flag("pegarSoroFisiológico", false));
        level.registerFlag(new Flag("pegarSeringa5", false));
        level.registerFlag(new Flag("pegarAgulha", false));
        level.registerFlag(new Flag("pegarAlcool", false));
        level.registerFlag(new Flag("pegarAlgodao", false));
        level.registerFlag(new Flag("pegarEquipoSoroMacrogotas", false));
        level.registerFlag(new Flag("pegarLuvas", false));
        level.registerFlag(new Flag("pegarSeringa10", false));
        level.registerFlag(new Flag("pegarAmpolaSF", false));
        level.registerFlag(new Flag("pegarBandeja", false));
        level.registerFlag(new Flag("pegarInstrumentos", false));

        /* MORE FLAGS FROM SCORES DATA
        confirmarMedicacao
        calcularGotejamento
        identificarMedicacao
        administrarMedicacao
        gotejarSoroEquipo
        anotarNoProntuario
        */

        // endregion

        level.setInitialScene(0);

        game.registerLevel(level, 4);

        console.groupEnd();

    });