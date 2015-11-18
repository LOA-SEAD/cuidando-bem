/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase8;
        var Alertas = require("Dialogs_data").alertas;
        var Scores = require("Scores_data").level8;
        //endregion

        var level = new Level("Level 8");
        console.groupCollapsed(level.getName());

        //region Scenes

        var 
        recepcao,
        corredor,
        sala_de_leitos,
        leito,
        farmacia,
        postoDeEnfermagem,
        centrocirurgico,
        alaFeminina,
        centroCirurgico_yuri,
        //pulseira,
        prontuario;

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            core.changeScene(1);
        }

        function conversarRecepcionista() {
            console.log("Action: Nada");
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
            });

        recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista", "Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .onClick(conversarRecepcionista)
                .setVisibility(true),

            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true),

            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true)
        ]);
        //endregion

        //region Corredor
        function corredorIrAlaMasculina () {
            core.changeScene(2);
        }

        function corredorIrPostoEnfermagem () {
            if(level.getFlag("score_pegou_medicamento").getValue() == false) {
                if(level.getFlag("score_ir_posto_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            }
            core.changeScene(5);
        }

        function corredorIrAlaFeminina () {
            if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("score_ir_ala_feminina_hora_errada").setValue(true);
            }
            core.changeScene(7);
        }

        function corredorIrFarmacia () {
            if(level.getFlag("score_viu_prontuario").getValue() == false) {
                if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irFarmacia_horaErrada);
                    level.getFlag("score_ir_farmacia_hora_errada").setValue(true);
                }
            }
            core.changeScene(4);
        }

        function corredorIrCentroCirurgico() {
            if(level.getFlag("levou_yuri_centro_cirurgico").getValue() == false) {
                if(level.getFlag("score_ir_centro_cirurgico_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                    level.getFlag("score_ir_centro_cirurgico_hora_errada").setValue(true);
                }
                core.changeScene(6);
            }
            else{
                core.changeScene(8);
            }
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrAlaMasculina)
                .setVisibility(true),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick(corredorIrPostoEnfermagem)
                .setVisibility(true),

            new InteractiveObject("io-ir_ala_feminina","Ir para a Ala Feminina")
                .setCssClass("intObj-goToAlaFeminina_fase3")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),

            new InteractiveObject("io-ir_farmacia","Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrFarmacia)
                .setVisibility(true),

            new InteractiveObject("io-ir_centro_cirurgico","Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToCentroCirurgico_fase3")
                .onClick(corredorIrCentroCirurgico)
                .setVisibility(true)

        ]);
        //endregion

        //region Ala masculina
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function () {
                console.log("Load scene: Ala Masculina");
                //Depois que já ocorreu o diálogo, o botão do prontuário fica liberado
                if (level.getFlag("ja_falou_paciente").getValue() == true){
                    core.openCommandBar();
                }
                //Só vai abrir o diálogo na primeira vez
                if(level.getFlag("ja_falou_paciente").getValue() == false){
                    level.getFlag("ja_falou_paciente").setValue(true);
                    core.openDialog(0);
                }
                //Libera para ir ao leito após conversar com o farmacêutico
                if(level.getFlag("ja_falou_farmaceutico").getValue() == true){
                    core.setActionVisible("btn-lavar_maos", true);
                    core.openCommandBar();
                }
            })
            .onUnload(function (){
                console.log("Ala Masculina: OnUnload");
                core.closeCommandBar();
            });

        sala_de_leitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);

        sala_de_leitos.registerActions([
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    if(level.getFlag("score_viu_prontuario").getValue() == false) {
                        core.registerScoreItem(Scores.verProntuario);
                        level.getFlag("score_viu_prontuario").setValue(true);
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(true),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: Lavar as mãos");
                    if(level.getFlag("score_lavar_maos_antes_leito").getValue() == false) {
                        core.registerScoreItem(Scores.lavarMaosAntesLeito);
                        level.getFlag("score_lavar_maos_antes_leito").setValue(true);
                    }
                })
                .setVisibility(false)
        ]);

        sala_de_leitos.registerDialogs([
            // 0
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            // 1
            new Dialog(lib.characters.pacientes.yuri)
                .setText(Dialogs.ala_masculina[1])
                .registerOption("", function() {
                    core.openDialog(2);
                }),
            // 2
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[2])
                .registerOption("", function() {
                    core.openDialog(3);
                }),
            // 3
            new Dialog(lib.characters.pacientes.yuri)
                .setText(Dialogs.ala_masculina[3])
                .registerOption("", function() {
                    core.openDialog(4);
                }),
            // 4
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[4])
                .registerOption("", function() {
                    core.openDialog(5);
                }),
            // 5
            new Dialog(lib.characters.pacientes.yuri)
                .setText(Dialogs.ala_masculina[5])
                .registerOption("", function() {
                    core.openDialog(6);
                }),
            // 6
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[6])
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);
        //endregion

        //region Leito
        leito = lib.scenes.leitos.yuri.getClone()
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerActions([
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    console.log("Action: Voltar para a ala masculina");
                    core.changeScene(2);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Farmacia
        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
                console.log("Ir para o corredor");
                //Só perde pontos caso já esteja liberado para pegar o medicamento
                if((level.getFlag("ja_falou_farmaceutico").getValue() == true) &&
                   (level.getFlag("score_conferiu_medicacao").getValue() == false)){
                    if(level.getFlag("score_nao_conferiu_medicacao").getValue() == false) {
                        core.registerScoreItem(Scores.naoConferirMedicacao);
                        level.getFlag("score_nao_conferiu_medicacao").setValue(true);
                    }
                }
                core.changeScene(1);
        }

        farmacia = new Scene("farmacia", "scene-pharmacy")
            .setCssClass("scene-pharmacy")
            .onLoad(function () {
                console.log("Load scene: Ala Masculina");
                //Depois que falou com o farmacêutico, é ativado os botões
                if (level.getFlag("ja_falou_farmaceutico").getValue() == true){
                    core.setActionVisible("btn-midazolam_medicamento", true);
                    core.setActionVisible("btn-conferir_midazolam", true);
                    core.openCommandBar();
                }
                //Apenas se ele já viu o prontuario que ele sabe o que vai pegar, mas só vai falar uma vez
                if((level.getFlag("score_viu_prontuario").getValue() == true) &&
                   (level.getFlag("ja_falou_farmaceutico").getValue() == false)){
                    level.getFlag("ja_falou_farmaceutico").setValue(true);
                    core.openDialog(0);
                }
            })
            .onUnload(function (){
                console.log("Ala Masculina: OnUnload");
                core.closeCommandBar();
            });

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

        farmacia.registerActions([
            //Um desses dois botões pode trocar de imagem
            new Action("btn-midazolam_medicamento", "Pegar Medicamento")
                .setCssClass("action-midazolam_medicamento")
                .onClick(function (){
                    console.log("Action: Pegar Medicamento");
                    if(level.getFlag("score_pegou_medicamento").getValue() == false) {
                        core.registerScoreItem(Scores.pegarMedicamento);
                        level.getFlag("score_pegou_medicamento").setValue(true);
                    }
                })
                .setVisibility(false),

            new Action("btn-conferir_midazolam", "Conferir Medicamento")
                .setCssClass("action-midazolam_medicamento")
                .onClick(function (){
                    console.log("Action: Conferir Medicamento");
                    if(level.getFlag("score_pegou_medicamento").getValue() == false) {
                        if(level.getFlag("score_nao_pegou_medicamento").getValue() == false) {
                            core.registerScoreItem(Scores.naoPegarMedicamento);
                            level.getFlag("score_nao_pegou_medicamento").setValue(true);
                        }
                    }
                    if(level.getFlag("score_conferiu_medicacao").getValue() == false) {
                        core.registerScoreItem(Scores.conferirMedicacao);
                        level.getFlag("score_conferiu_medicacao").setValue(true);
                    }
                })
                .setVisibility(false)
        ]);

        farmacia.registerDialogs([
            // 0
            new Dialog(lib.characters.paulo)
                .setText(Dialogs.farmacia[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            // 1
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.farmacia[1])
                .registerOption("", function() {
                    core.openDialog(2);
                }),
            // 2
            new Dialog(lib.characters.paulo)
                .setText(Dialogs.farmacia[2])
                .registerOption("", function() {
                    core.closeDialog();
                    //Ativando os botões
                    core.setActionVisible("btn-midazolam_medicamento", true);
                    core.setActionVisible("btn-conferir_midazolam", true);
                    core.openCommandBar();
                })
        ]);
        //endregion

        //region Posto de enfermagem
        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                console.log("Load scene: Posto de enfermagem");
                core.openCommandBar();
                //Depois que pegou o medicamento, é ativado os botões
                if (level.getFlag("score_pegou_medicamento").getValue() == true){
                    core.setActionVisible("btn-lavar_maos", true);
                    core.setActionVisible("btn-pegar_agua", true);
                    core.setActionVisible("btn-pegar_copo", true);
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
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    //Verifica o que o jogador não pegou caso ele já possa pegar
                    if (level.getFlag("score_pegou_medicamento").getValue() == true){
                        if(level.getFlag("score_pegou_agua").getValue() == false) {
                            if(level.getFlag("score_nao_pegou_agua").getValue() == false) {
                                core.registerScoreItem(Scores.naoPegarAguaPotavel);
                                level.getFlag("score_nao_pegou_agua").setValue(true);
                            }
                        }
                        if(level.getFlag("score_pegou_copo").getValue() == false) {
                            if(level.getFlag("score_nao_pegou_copo").getValue() == false) {
                                core.registerScoreItem(Scores.naoPegarCopoDescartavel);
                                level.getFlag("score_nao_pegou_copo").setValue(true);
                            }
                        }
                    }
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: lavar_maos");
                    if(level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false) {
                        core.registerScoreItem(Scores.lavarMaosPostoEnfermagem);
                        level.getFlag("score_lavar_maos_posto_enfermagem").setValue(true);
                    }
                })
                .setVisibility(false),

            //Água e copo descartavel não ficam na gaveta
            new Action("btn-pegar_agua", "Pegar água potável")
                .setCssClass("action-garrafa_agua_potavel")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    if(level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false) {
                        if(level.getFlag("score_nao_lavar_maos_posto_enfermagem").getValue() == false) {
                            core.registerScoreItem(Scores.naoLavarMaosPostoEnfermagem);
                            level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue(true);
                        }
                    }
                    if(level.getFlag("score_pegou_agua").getValue() == false) {
                        core.registerScoreItem(Scores.pegarAguaPotavel);
                        level.getFlag("score_pegou_agua").setValue(true);
                    }
                })
                .setVisibility(false),

            new Action("btn-pegar_copo", "Pegar copo descartavel")
                .setCssClass("action-copo_descartavel")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    if(level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false) {
                        if(level.getFlag("score_nao_lavar_maos_posto_enfermagem").getValue() == false) {
                            core.registerScoreItem(Scores.naoLavarMaosPostoEnfermagem);
                            level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue(true);
                        }
                    }
                    if(level.getFlag("score_pegou_copo").getValue() == false) {
                        core.registerScoreItem(Scores.pegarCopoDescartavel);
                        level.getFlag("score_pegou_copo").setValue(true);
                    }
                })
                .setVisibility(false)

        ]);
        //endregion

        //region Centro cirurgico
        centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: Centro cirurgico");
                core.openCommandBar();
            })
            .onUnload(function() {
                console.log("Centro cirurgico: OnUnload");
                core.closeCommandBar();
            });

        centroCirurgico.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Ala feminina
        alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
                console.log("Load scene: Ala feminina");
            })
            .onUnload(function (){
                console.log("Ala feminina: OnUnload");
            });

        alaFeminina.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Centro cirurgico Yuri
        centroCirurgico_yuri = lib.scenes.centroCirurgico_yuri.getClone()
            .onLoad(function () {
                console.log("Load scene: Centro cirurgico Yuri");
                core.openCommandBar();
                //Para liberar final da fase
                if (level.getFlag("levou_yuri_centro_cirurgico").getValue() == false){
                    level.getFlag("entrou_centro_cirurgico").setValue(true);
                }
            })
            .onUnload(function() {
                console.log("Centro cirurgico: OnUnload");
                core.closeCommandBar();
            });

        centroCirurgico_yuri.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);
        //endregion

        //endregion

        //region ModalScenes

        //region Prontuario
        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            //TODO Verificar se prontuario está preenchido
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    //Já estava no momento de realizar os procedimentos, portanto pode terminar a fase
                    if (level.getFlag("entrou_centro_cirurgico").getValue() == true){
                        //core.unlockLevel(6);
                        core.closeCommandBar();
                        core.showEndOfLevel();
                    }
                    else{
                        core.closeModalScene("Prontuario");
                        //core.setInteractiveObjectVisible("io-ir_corredor", true);
                    }
                })
                .setVisibility(true)

            //  alert(Prontuario.isDataValid() + " Final da fase");
        ]);
        //endregion

        //endregion

        //region Level

        //region Register Scenes
        //0
        level.registerScene(recepcao);
        //1
        level.registerScene(corredor);
        //2
        level.registerScene(sala_de_leitos);
        //3
        level.registerScene(leito);
        //4
        level.registerScene(farmacia);
        //5
        level.registerScene(postoDeEnfermagem);
        //6
        level.registerScene(centroCirurgico);
        //7
        level.registerScene(alaFeminina);
        //8
        level.registerScene(centroCirurgico_yuri);
        // endregion

        //region Register Modal Scenes
        level.registerModalScene(prontuario);
        //endregion

        //region Flags
        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded

            level.getFlag("ja_falou_farmaceutico").setValue(false);
            level.getFlag("ja_falou_paciente").setValue(false);
            level.getFlag("levou_yuri_centro_cirurgico").setValue(false);
            level.getFlag("entrou_centro_cirurgico").setValue(false);
            level.getFlag("score_ir_posto_hora_errada").setValue(false);
            level.getFlag("score_ir_farmacia_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_feminina_hora_errada").setValue(false);
            level.getFlag("score_ir_centro_cirurgico_hora_errada").setValue(false);
            level.getFlag("score_viu_prontuario").setValue(false);
            level.getFlag("score_nao_viu_prontuario").setValue(false);
            level.getFlag("score_pegou_medicamento").setValue(false);
            level.getFlag("score_nao_pegou_medicamento").setValue(false);
            level.getFlag("score_conferiu_medicacao").setValue(false);
            level.getFlag("score_nao_conferiu_medicacao").setValue(false);
            level.getFlag("score_lavar_maos_posto_enfermagem").setValue(false);
            level.getFlag("score_nao_lavar_maos_posto_enfermagem").setValue(false);
            level.getFlag("score_pegou_agua").setValue(false);
            level.getFlag("score_nao_pegou_agua").setValue(false);
            level.getFlag("score_pegou_copo").setValue(false);
            level.getFlag("score_nao_pegou_copo").setValue(false);
            level.getFlag("score_lavar_maos_antes_leito").setValue(false);
            level.getFlag("score_nao_lavar_maos_antes_leito").setValue(false);
            //level.getFlag("score_falar_paciente").setValue(false);
            //level.getFlag("score_nao_falar_paciente").setValue(false);
            level.getFlag("score_verificar_pulseira").setValue(false);
            level.getFlag("score_nao_verificar_pulseira").setValue(false);
            level.getFlag("score_ofereceu_copo").setValue(false);
            level.getFlag("score_nao_ofereceu_copo").setValue(false);
            level.getFlag("score_administrou_medicamento").setValue(false);
            level.getFlag("score_nao_administrou_medicamento").setValue(false);
            level.getFlag("score_anotar_prontuario").setValue(false);
            level.getFlag("score_nao_anotar_prontuario").setValue(false);
            level.getFlag("score_lavar_maos_tecnica_cirurgica").setValue(false);
            level.getFlag("score_nao_lavar_maos_tecnica_cirurgica").setValue(false);
            level.getFlag("score_testou_equipamentos").setValue(false);
            level.getFlag("score_nao_testou_equipamentos").setValue(false);
            level.getFlag("score_fez_lista_verificacao").setValue(false);
            level.getFlag("score_nao_fez_lista_verificacao").setValue(false);
            level.getFlag("score_mudou_posicao_paciente").setValue(false);
            level.getFlag("score_nao_mudou_posicao_paciente").setValue(false);
            level.getFlag("score_colocou_placa_neutra").setValue(false);
            level.getFlag("score_nao_colocou_placa_neutra").setValue(false);
            level.getFlag("score_lavar_maos_centro_cirurgico").setValue(false);
            level.getFlag("score_nao_lavar_maos_centro_cirurgico").setValue(false);
            level.getFlag("score_anotar_prontuario_centro_cirurgico").setValue(false);

            Pulseira.setNameRegExp(/Yuri de Souza Almeida/);
            Pulseira.setLeitoRegExp(/0*2/);
            Pulseira.setDataRegExp(/16\/03\/1993/);

            Pulseira.setName("Yuri de Souza Almeida");
            Pulseira.setLeito("02");
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

            Prontuario.setAlergiaMedicamentosa(true, "Dipirona, sulfa.");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("27/09/2015");
            Prontuario.setLeito("02 - Enfermaria masculina");
            Prontuario.setAntecedentes("");
            Prontuario.setHipotese("Cirurgia de reconstrução do ligamento cruzado anterior (LCA), no MMII direito.");
            Prontuario.setObservacoes("Acidente automobilístico.");

            Prontuario.setPeso("73");
            Prontuario.setAltura("1,80");
            Prontuario.setCircunferenciaAbdominal("90");

            Prontuario.setPrescMedicaRowData(0, "27/09", "Midazolam", "Oral", "15 mg", "01x/dia antes do procedimento cirúrgico", true, true);

            //Prontuario.setPrescEnfermagemState("Encaminhar o paciente ao centro cirúrgico");
            //Prontuario.setPrescEnfermagemState("Realizar Check list da Primeira Fase da Cirurgia segura");
            //Prontuario.setPrescEnfermagemState("Placa Neutra");

            Prontuario.setSsvvRowData(0, '27/09', '120x70', '72', '16', '96', '35,5', true);
            //Disable 2 row
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('27/09', '');
        });

        //region Flags
        level.registerFlag(new Flag("ja_falou_farmaceutico"), false);
        level.registerFlag(new Flag("ja_falou_paciente"), false);
        level.registerFlag(new Flag("levou_yuri_centro_cirurgico"), false);
        level.registerFlag(new Flag("entrou_centro_cirurgico"), false);
        level.registerFlag(new Flag("score_ir_posto_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_feminina_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_centro_cirurgico_hora_errada"), false);
        level.registerFlag(new Flag("score_viu_prontuario"), false);
        level.registerFlag(new Flag("score_nao_viu_prontuario"), false);
        level.registerFlag(new Flag("score_pegou_medicamento"), false);
        level.registerFlag(new Flag("score_nao_pegou_medicamento"), false);
        level.registerFlag(new Flag("score_conferiu_medicacao"), false);
        level.registerFlag(new Flag("score_nao_conferiu_medicacao"), false);
        level.registerFlag(new Flag("score_lavar_maos_posto_enfermagem"), false);
        level.registerFlag(new Flag("score_nao_lavar_maos_posto_enfermagem"), false);
        level.registerFlag(new Flag("score_pegou_agua"), false);
        level.registerFlag(new Flag("score_nao_pegou_agua"), false);
        level.registerFlag(new Flag("score_pegou_copo"), false);
        level.registerFlag(new Flag("score_nao_pegou_copo"), false);
        level.registerFlag(new Flag("score_lavar_maos_antes_leito"), false);
        level.registerFlag(new Flag("score_nao_lavar_maos_antes_leito"), false);
        //level.registerFlag(new Flag("score_falar_paciente"), false);
        //level.registerFlag(new Flag("score_nao_falar_paciente"), false);
        level.registerFlag(new Flag("score_verificar_pulseira"), false);
        level.registerFlag(new Flag("score_nao_verificar_pulseira"), false);
        level.registerFlag(new Flag("score_ofereceu_copo"), false);
        level.registerFlag(new Flag("score_nao_ofereceu_copo"), false);
        level.registerFlag(new Flag("score_administrou_medicamento"), false);
        level.registerFlag(new Flag("score_nao_administrou_medicamento"), false);
        level.registerFlag(new Flag("score_anotar_prontuario"), false);
        level.registerFlag(new Flag("score_nao_anotar_prontuario"), false);
        level.registerFlag(new Flag("score_lavar_maos_tecnica_cirurgica"), false);
        level.registerFlag(new Flag("score_nao_lavar_maos_tecnica_cirurgica"), false);
        level.registerFlag(new Flag("score_testou_equipamentos"), false);
        level.registerFlag(new Flag("score_nao_testou_equipamentos"), false);
        level.registerFlag(new Flag("score_fez_lista_verificacao"), false);
        level.registerFlag(new Flag("score_nao_fez_lista_verificacao"), false);
        level.registerFlag(new Flag("score_mudou_posicao_paciente"), false);
        level.registerFlag(new Flag("score_nao_mudou_posicao_paciente"), false);
        level.registerFlag(new Flag("score_colocou_placa_neutra"), false);
        level.registerFlag(new Flag("score_nao_colocou_placa_neutra"), false);
        level.registerFlag(new Flag("score_lavar_maos_centro_cirurgico"), false);
        level.registerFlag(new Flag("score_nao_lavar_maos_centro_cirurgico"), false);
        level.registerFlag(new Flag("score_anotar_prontuario_centro_cirurgico"), false);
        //endregion

        level.setInitialScene(0);

        game.registerLevel(level, 8);

        console.groupEnd();

    });