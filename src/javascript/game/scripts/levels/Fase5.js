/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase5;
        var Alertas = require("Dialogs_data").alertas;
        var Scores = require("Scores_data").level5;
        //endregion

        var level = new Level("Level 5");
        console.groupCollapsed(level.getName());

        //var flags_on = true;    // if false it wont check for flags -- tests purpose
        //var visibility = false;
        //if (!flags_on)
        //    visibility = true;

        //region Scenes

        var
        recepcao,
        corredor;
        //alaMasculina,
        //sala_de_leitos,
        //leito,
        //posto_de_enfermagem,
        //gaveta,
        //pulseira,
        //prontuario;

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
                core.changeScene(1);
                console.log("Ir para o corredor");
            } else {
                console.log("Necessita ação: conversar com a recepcionista");
            }
        }

        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.closeDialog();
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
                .setVisibility(true)
        ]);
        //endregion

        //region Corredor
        

        function corredorIrPostoEnfermagem () {
            //if(level.getFlag("checar_prontuario").getValue() == false) {
                core.openDialog(2);
                if(level.getFlag("score_ir_posto_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            //} else {
            //    core.changeScene(4);
            //}
        }

        function corredorIrAlaFeminina () {
            //CRIAR CONDIÇÃO PARA LIBERAR A ALA FEMININA APÓS FALA COM O MENTOR
            core.openDialog(3);
            if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        function corredorIrAlaMasculina () {
            //CRIAR FLAG DE FALA DO MENTOR
            core.openDialog(3);
            if(level.getFlag("score_ir_ala_masculina_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irAlaMasculina_horaErrada);
                level.getFlag("score_ir_ala_masculina_hora_errada").setValue(true);
            }
        }

        function corredorIrFarmacia () {
            core.openDialog(4);
            if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        function corredorIrCentroCirurgico() {
            core.openDialog(5);
            if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irCentroCirurgico_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }        
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad( function () {
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0: // first time at 'corredor'
                        core.setInteractiveObjectVisible("io-conversar_mentor", true);
                        core.openDialog(0);
                        break;
                    case 1: // second time at 'corredor'
                        //core.setActionVisible("btn-ir_posto_enfermagem", true);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", true);
                        //core.setActionVisible("btn-ir_sala_leitos", false);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", false);
                        //core.setActionVisible("btn-conversar_mentor", false);
                        core.setInteractiveObjectVisible("io-conversar_mentor", false);
                        break;
                    case 2:
                        //core.setActionVisible("btn-ir_posto_enfermagem", false);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", false);
                        //core.setActionVisible("btn-ir_sala_leitos", true);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", true);
                        break;
                }
            })
            .onUnload(function (){
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0:
                        level.getFlag("passagem_corredor").setValue(1);
                        break;
                    case 1:
                        level.getFlag("passagem_corredor").setValue(2);
                        break;
                    case 2:
                        level.getFlag("passagem_corredor").setValue(3);
                        break;
                }
            });

        corredor.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor[0])
                .registerOption("", function () {
                    core.openDialog(1);
                }),
            // Dialog 1
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[1])
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 2 Mentor Ação errada: Ir ao posto de enfermagem
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.enfermagem[1])
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 3 - Mentor Ação errada: Ir a ala feminina
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.ala_feminina)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 4 - Mentor Ação errada: Ir a farmacia
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.farmácia)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 5 - Mentor Ação errada: Ir ao centro cirurgico
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.enfermagem[1])
                .registerOption("", function (){
                    core.closeDialog();
                }),
        ]);

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrSalaLeitos)
                .setVisibility(true),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick(corredorIrPostoEnfermagem)
                .setVisibility(true),

            //TODO: Adicionar ir ala feminina
            new InteractiveObject("io-ir_ala_feminina","Ir para a Ala Feminina")
                .setCssClass("intObj-goToFemaleRoom")
                .onClick(corredorIrFarmacia)
                .setVisibility(true),

            //TODO: Adicionar ir Farmácia
            new InteractiveObject("io-ir_farmacia","Ir para a Farmacia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),

            //TODO: Adicionar ir Centro Cirurgico
            new InteractiveObject("io-ir_centro_cirurgico","Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToBedroom")   //arrumar
                .onClick(corredorIrCentroCirurgico)      
                .setVisibility(true),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    core.openDialog(0);
                })
                .setVisibility(false)

        ]);
        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        //0
        level.registerScene(recepcao);
        //1
        level.registerScene(corredor);

        // endregion

        //region Register Modal Scenes

        //endregion



        level.setSetupScript(function () {
            
            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("passagem_corredor").setValue(0);
            //level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("score_ir_posto_hora_errada").setValue(false);
            level.getFlag("score_ir_farmacia_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_feminina_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_masculina_hora_errada").setValue(false);

            Pulseira.setNameRegExp(/Esther Fidelis/);
            Pulseira.setLeitoRegExp(/0*2/);
            Pulseira.setDataRegExp(/05\/12\/1955/);

            Pulseira.setName("Esther Fidelis");
            Pulseira.setLeito("02");
            Pulseira.setData("05/12/1955");
            Pulseira.disable();

            Prontuario.setNome("Esther Fidelis");
            Prontuario.setSexo("F");
            Prontuario.setEstadoCivil("Casada");
            Prontuario.setDataNascimento("05/12/1955");
            Prontuario.setIdade("60 anos");
            Prontuario.setProfissao("Relações Internacionais (Doutorado Completo)");

            Prontuario.setPai("Apolo Zovadelli Fidelis");
            Prontuario.setMae("Laura Rodrigues Fidelis");

            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("02/11/2015");
            Prontuario.setLeito("02 - Enfermaria Feminina");
            Prontuario.setAntecedentes("Quatro internações devido à quadro de hiperglicemia entre os anos de 2012 à 2013.");
            Prontuario.setHipotese("Acidente vascular encefálico isquêmico (AVCI).");
            Prontuario.setObservacoes("Teve trombose venosa profunda, diabetes mellitus tipo II e pressão arterial sistêmica. Tabagista há 40 anos.");

            Prontuario.setPeso("56");
            Prontuario.setAltura("1,70");
            Prontuario.setCircunferenciaAbdominal("82");

            Prontuario.setPrescMedicaRowData(0, "02/11", "Fondaparinux Sódico", "Oral", "7,5 mg (1x ao dia)", "07h", true, true);
            Prontuario.setPrescMedicaRowData(1, "02/11", "Atenolol", "Oral", "100 mg (2x ao dia)", "08h - 18h", true, true);
            //Prescrição 2 e 3 ainda não funciona
            //Prontuario.setPrescMedicaRowData(2, "02/11", "Metmorfina", "Oral", "750 mg (2x ao dia)", "06h - 17h", true, true);
            //Prontuario.setPrescMedicaRowData(3, "02/11", "Glibenclamida", "Oral", "4 mg (2x ao dia)", "07:30h - 17:30h", true, true);

            Prontuario.setPrescEnfermagemState("decubito");
            //Prontuario.setPrescEnfermagemState("verificar glicemia");
            //Prontuario.setPrescEnfermagemState("levantar grade");
            //Prontuario.setPrescEnfermagemState("troca curativo");

            Prontuario.setSsvvRowData(0, '02/11', '120x70', '46', '15', '96', '35', true);
            Prontuario.setSsvvRowData(1, '02/11', '130x80', '52', '18', '94', '36', true);
            //Disable 2 row
            Prontuario.setSsvvRowData(2, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('02/11', '');
        });

        //region Flags

        level.registerFlag(new Flag("conversar_recepcionista"), false);
        //level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("passagem_corredor", 0));
        level.registerFlag(new Flag("score_ir_posto_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_feminina_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_masculina_hora_errada"), false);

        //endregion

        level.setInitialScene(0);

        game.registerLevel(level, 5);

        console.groupEnd();

    });
