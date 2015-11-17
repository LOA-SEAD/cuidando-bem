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
        //gaveta,
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
                    //core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true);
                    //core.setInteractiveObjectVisible("io-ir_corredor_direita", true);

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
            if(level.getFlag("score_ir_posto_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
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
            if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("score_ir_farmacia_hora_errada").setValue(true);
            }
            core.changeScene(4);
        }

        function corredorIrCentroCirurgico() {
            if(level.getFlag("score_ir_centro_cirurgico_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                level.getFlag("score_ir_centro_cirurgico_hora_errada").setValue(true);
            }
            core.changeScene(6);
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
                core.openDialog(0);
            })
            .onUnload(function (){
                console.log("Ala Masculina: OnUnload");
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
                .setVisibility(true)
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
                //Para liberar final da fase
                if (level.getFlag("entrou_leito").getValue() == false){
                    level.getFlag("entrou_leito").setValue(true);
                }
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
        farmacia = new Scene("farmacia", "scene-pharmacy")
            .setCssClass("scene-pharmacy")
            .onLoad(function () {
                console.log("Load scene: Ala Masculina");
                core.openCommandBar();
            })
            .onUnload(function (){
                console.log("Ala Masculina: OnUnload");
                core.closeCommandBar();
            });

        farmacia.registerActions([
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

        //region Posto de enfermagem
        postoDeEnfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                console.log("Load scene: Posto de enfermagem");
                core.openCommandBar();
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
                    //Voltar para o corredor
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Centro cirurgico
        centroCirurgico = lib.scenes.centroCirurgico.getClone()
            .onLoad(function () {
                console.log("Load scene: Centro cirurgico");
                core.openCommandBar();
                //Para liberar final da fase
                if (level.getFlag("entrou_leito").getValue() == false){
                    level.getFlag("entrou_centro_cirurgico").setValue(true);
                }
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

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded

            level.getFlag("entrou_leito").setValue(false);
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
        level.registerFlag(new Flag("entrou_leito"), false);
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