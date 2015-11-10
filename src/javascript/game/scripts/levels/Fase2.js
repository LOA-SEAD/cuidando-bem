/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores) {

        //region Imports
        var Dialogs = require("Dialogs_data").fase2;
        var Alertas = require("Dialogs_data").alertas;
        var Scores = require("Scores_data").level2;
        //endregion

        var level = new Level("Level 2");
        console.groupCollapsed(level.getName());

        //Scenes

        var
        recepcao,
        corredor,
        alaMasculina,
        sala_de_leitos,
        leito,
        posto_de_enfermagem,
        farmacia,
        alaFeminina,
        gaveta,
        pulseira,
        prontuario;
        //glicosimetro

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
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.closeDialog();
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
                .setVisibility(true)
        ]);
        //endregion

        //region Corredor -> permitir ir pra farmacia e ala feminina
        function corredorIrSalaLeitos () {
            if(level.getFlag("pegou_tudo_gaveta").getValue() == false) {
                core.openDialog(5);
            } else {
                core.changeScene(2);
            }
        }

        function corredorIrPostoEnfermagem () {
            if(level.getFlag("checar_prontuario").getValue() == false) {
                core.openDialog(2);
                if(level.getFlag("score_ir_posto_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            } else {
                core.changeScene(4);
            }
        }

        function corredorIrAlaFeminina () {
            core.openDialog(3);
            if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        function corredorIrFarmacia () {
            core.openDialog(4);
            if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if (level.getFlag("score_anotar_prontuario").getValue() == true){
                    core.setInteractiveObjectVisible("io-conversar_mentor", true);
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        /*corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0: // first time at 'corredor'
                        core.setInteractiveObjectVisible("io-ir_ala_feminina", true);
                        core.setInteractiveObjectVisible("io-ir_farmacia", true);
                        break;
                    case 1: // second time at 'corredor'
                        core.setInteractiveObjectVisible("io-ir_ala_feminina", false);
                        core.setInteractiveObjectVisible("io-ir_farmacia", false);
                        break;
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });*/

        corredor.registerDialogs([
            // 0
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor[0])
                .registerOption("", function(){
                    core.openDialog(1);
                }),
            // 1
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[1])
                .registerOption("", function(){
                    core.closeDialog();
                    //Fim do nível após este diálogo
                    core.unlockLevel(3);
                    core.closeCommandBar();
                    core.showEndOfLevel();
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
                .setText(Alertas.perdido.farmacia)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 5 - Mentor Ação errada: Esquecer objetos na gaveta
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.objeto_qualquer)
                .registerOption("", function (){
                    core.closeDialog();
                })
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
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),

            new InteractiveObject("io-ir_farmacia","Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrFarmacia)
                .setVisibility(true),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    core.openDialog(0);
                })
                .setVisibility(false)

        ]);
        //endregion

        //region Sala de leitos -> botao de falar com paciente
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Entrando na sala de leitos");
                //Na primeira vez o leito vai estar desabilitado e ocorrerá uma conversa com o paciente
                if (level.getFlag("segunda_ida_leito_paciente").getValue() == false){
                    core.setInteractiveObjectVisible("io-ir_leito", false);
                    core.openDialog(0);
                }
                else{
                    core.setInteractiveObjectVisible("io-ir_leito", true);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.openCommandBar();
                }
                //Caso ele já tenha realizado os procedimentos, é habilitado os botões de descarte dos itens utilizados
                if((level.getFlag("voltar_ala_masculina").getValue() == true)){
                    core.setActionVisible("btn-jogar_algodao_lixo", true);
                    core.setActionVisible("btn-jogar_agulha_perfuro", true);
                    core.setActionVisible("btn-elevar_grade_cama", true);
                    core.setActionVisible("btn-ler_prontuario", false);
                    core.setActionVisible("btn-anotar_prontuario", true);
                    core.openCommandBar();
                }
            })
            .onUnload( function (){
                console.log("Saindo da sala de leitos");
                //Habilitar o fato de que a proxima ida ao leito do paciente seja no mínimo a segunda
                level.getFlag("segunda_ida_leito_paciente").setValue(true);
                // [duvida] Vai precisar desabilitar a segunda vez que lavou as mãos 
                core.closeCommandBar();
            });

        sala_de_leitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-tutorial") // verificar onde conserta
                .onClick(function (){
                    if (level.getFlag("lavar_maos2").getValue() == false){
                        //Mentor corrige
                        core.openDialog(3);
                    }
                    else{
                        core.changeScene(3);
                    }
                })
                .setVisibility(false),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    //Já checou o prontuario
                    if(level.getFlag("checar_prontuario").getValue() == true){
                        //Volte para o corredor
                        core.changeScene(1);
                    } else {
                        alert("Você deveria checar o prontuario");
                    }
                })
                .setVisibility(false)
        ]);

        sala_de_leitos.registerActions([

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    //verifica se é a primeira vez que está indo verificar o paciente
                    if(level.getFlag("segunda_ida_leito_paciente").getValue() == false) {
                        if(level.getFlag("lavar_maos").getValue() == false) {
                            level.getFlag("lavar_maos").setValue(true);
                        }
                        if(level.getFlag("score_lavar_maos_antes_do_prontuario").getValue() == false) {
                            core.registerScoreItem(Scores.lavaMaosAntes);
                            level.getFlag("score_lavar_maos_antes_do_prontuario").setValue(true);
                        }
                    }
                    else {
                        //Verifica se os procedimentos já foram realizados
                        if((level.getFlag("voltar_ala_masculina").getValue() == false)){
                            if(level.getFlag("lavar_maos2").getValue() == false) {
                                level.getFlag("lavar_maos2").setValue(true);
                            }
                            if(level.getFlag("score_lavar_maos_antes_de_ir_no_leito").getValue() == false) {
                                core.registerScoreItem(Scores.lavarMaosAntesLeito);
                                level.getFlag("score_lavar_maos_antes_de_ir_no_leito").setValue(true);
                            }
                        }
                        else {
                            if(level.getFlag("score_elevou_grade_cama").getValue() == true) {
                                if(level.getFlag("lavar_maos_apos_lixo").getValue() == false) {
                                    level.getFlag("lavar_maos_apos_lixo").setValue(true);
                                }
                                if(level.getFlag("score_lavou_maos_apos_lixo").getValue() == false) {
                                    core.registerScoreItem(Scores.lavarMaosAposLixos);
                                    level.getFlag("score_lavou_maos_apos_lixo").setValue(true);
                                }
                            }
                            else{
                                core.closeCommandBar();
                                core.openDialog(5);
                            }
                        }    
                    }
                })
                .setVisibility(false),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    if(level.getFlag("lavar_maos").getValue() == false){
                        core.closeCommandBar();
                        core.openDialog(6);
                    } else {
                        if(level.getFlag("score_checar_prontuario").getValue() == false) {
                            core.registerScoreItem(Scores.checarProntuario);
                            level.getFlag("score_checar_prontuario").setValue(true);
                        }
                        //Bloqueia o acesso para a farmacia e a ala feminina
                        //level.getFlag("passagem_corredor").setValue(1);
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                        //Verificou o prontuario na primeira vez, realiza a fala
                        if(level.getFlag("checar_prontuario").getValue() == true) {
                            core.openDialog(2);
                        }
                    }
                })
                .setVisibility(false),

            new Action("btn-jogar_algodao_lixo", "Jogar algodão no lixo branco")
                .setCssClass("action-jogar_algodao_lixo") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Jogar algodão no lixo branco");
                    if(level.getFlag("score_jogou_algodao_lixo").getValue() == false) {
                        level.getFlag("score_jogou_algodao_lixo").setValue(true);
                        core.registerScoreItem(Scores.algodaoLixoCerto);
                    }
                })
                .setVisibility(false),

            new Action("btn-jogar_agulha_perfuro", "Jogar agulha no perfuro cortante")
                .setCssClass("action-jogar_agulha_perfuro") //CONSERTAR
                .onClick(function (){
                    if(level.getFlag("score_jogou_algodao_lixo").getValue() == true) {
                        console.log("Action: Jogar agulha no perfuro cortante");
                        if(level.getFlag("score_jogou_agulha_perfuro").getValue() == false) {
                            level.getFlag("score_jogou_agulha_perfuro").setValue(true);
                            core.registerScoreItem(Scores.agulhaLixoCerto);
                        }
                    }//else{
                    //Não vai utilizar uma mensagem avisando que não jogou fora o algodão
                    //    core.closeCommandBar();
                    //    core.openDialog(7);
                    //}

                })
                .setVisibility(false),

            new Action("btn-elevar_grade_cama", "Elevar a grade da cama")
                .setCssClass("action-elevar_grade_cama") //CONSERTAR
                .onClick(function (){
                    if(level.getFlag("score_jogou_agulha_perfuro").getValue() == true) {
                        console.log("Action: Elevar a grade da cama");
                        if(level.getFlag("score_elevou_grade_cama").getValue() == false) {
                            level.getFlag("score_elevou_grade_cama").setValue(true);
                            core.registerScoreItem(Scores.elevarGradeDaCama);
                        }
                    }else{
                        core.closeCommandBar();
                        core.openDialog(4);
                    }
                })
                .setVisibility(false),

            new Action("btn-anotar_prontuario", "Anotar prontuario")
                .setCssClass("action-anotar_prontuario")
                .onClick(function (){
                    console.log("Action: Anotar prontuario");
                    if(level.getFlag("lavar_maos_apos_lixo").getValue() == false){
                        core.closeCommandBar();
                        core.openDialog(6);
                    } else {
                        if(level.getFlag("score_anotar_prontuario").getValue() == false) {
                            core.registerScoreItem(Scores.anotarNoProntuario);
                            level.getFlag("score_anotar_prontuario").setValue(true);
                        }
                        Prontuario.open();
                        core.openModalScene("Prontuario");
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
            new Dialog(lib.characters.pacientes.raul_unknow)
                .setText(Dialogs.ala_masculina[1])
                .registerOption("", function() {
                    core.setActionVisible("btn-ler_prontuario", true);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.closeDialog();
                    core.openCommandBar();
                }),
            // 2 - Verificar se fechou o prontuario pra abrir a fala
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[2])
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 3 - Mentor corrigindo o fato de não lavar as mãos antes de ir ao leito do paciente
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo3)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 4 - Mentor corrigindo o fato de não descartar a agulha
            new Dialog(lib.characters.mentor)
                .setText(Alertas.descarte.agulha)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 5 - Mentor corrigindo o fato de não elevar a grade
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.elevar_grade[0])
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 6 - Mentor corrigindo o fato de não lavar as mãos antes de verificar o prontuario
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo3)
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);
        //endregion

        //region Leito
        leito = lib.scenes.leitos.char2.getClone()
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);
                core.setActionVisible("btn-falar_paciente", true);
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_02-checar_pulseira")
                .onClick(function () {
                    //Desabilita o primeiro diálogo com o paciente
                    level.getFlag("conversar_paciente2").setValue(false);
                    level.getFlag("selecionar_bandeja").setValue(true);
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                })
                .setVisibility(true)
        ]);

        leito.registerDialogs([
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.pacientes.raul_unknow)
                .setText(Dialogs.leito_paciente[1])
                .registerOption("", function() {
                    core.openDialog(2);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[2])
                .registerOption("", function() {
                    core.openDialog(3);
                }),
            new Dialog(lib.characters.pacientes.raul)
                .setText(Dialogs.leito_paciente[3])
                .registerOption("", function() {
                    core.openDialog(4);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[4])
                .registerOption("", function() {
                    core.openDialog(5);
                }),
            new Dialog(lib.characters.pacientes.raul)
                .setText(Dialogs.leito_paciente[5])
                .registerOption("", function() {
                    core.closeDialog();
                    core.openCommandBar();
                }),
            //Apos os exames
            new Dialog(lib.characters.pacientes.raul)
                .setText(Dialogs.leito_paciente[6])
                .registerOption("", function() {
                    core.openDialog(7);
                }),
            // 7 - resposta jogador
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito_paciente[7], function () {
                    core.openDialog(8);
                })
                .registerOption(Dialogs.leito_paciente[9], function () {
                    core.closeDialog();
                })
                .registerOption(Dialogs.leito_paciente[10], function () {
                    core.openDialog(9);
                })
                .setRandomize(true),
             // 8 - Resposta op 1
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito_paciente[8])
                .registerOption("", function () {
                    core.openDialog(7);
                }),
            // 9 - Resposta op 3
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito_paciente[11])
                .registerOption("", function () {
                    core.openDialog(7);
                }),
            //10 - Pulseira não verificada
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.ver_pulseira)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            //11 - Não selecionar as luvas
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.luvas)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            //12 - Não usar o algodão no paciente (nos dois casos)
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.algodão)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            //13 - Não realizar o teste de glicemia
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.teste[0])
                .registerOption("", function (){
                    core.closeDialog();
                }),
            //14 - Não falar o resultado ao paciente
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.paciente)
                .registerOption("", function (){
                    core.closeDialog();
                })
        ]);

        leito.registerActions([
            new Action("btn-falar_paciente", "Conversar com Paciente")
                .setCssClass("action-leito-char-02") //Será outro
                .onClick(function () {
                    if(level.getFlag("conversar_paciente2").getValue() == true) {
                        console.log("Action: btn-conversar_paciente");
                        if(level.getFlag("score_falar_paciente").getValue() == false) {
                            core.registerScoreItem(Scores.falarComPaciente);
                            level.getFlag("score_falar_paciente").setValue(true);
                        }
                        core.openDialog(0);
                        core.closeCommandBar();
                    } else { //Já realizou os procedimentos
                        if(level.getFlag("explicar_resultado").getValue() == true) {
                            console.log("Action: Explicar o resultado");
                            level.getFlag("voltar_ala_masculina").setValue(true);
                            if(level.getFlag("score_explicou_resultado").getValue() == false) {
                                level.getFlag("score_explicou_resultado").setValue(true);
                                core.registerScoreItem(Scores.explicarResultado);
                            }
                            level.getFlag("explicar_resultado").setValue(false);
                            core.openDialog(6);
                        }else{
                            core.closeCommandBar();
                            core.openDialog(12);
                        }
                    }
                })
                .setVisibility(true),
            // CUIDADO COM OS CSS ERRADOS

            new Action("btn-selecionar_bandeja", "Selecionar Bandeja")
                .setCssClass("action-selecionar_bandeja") //CONSERTAR
                .onClick(function (){
                    if(level.getFlag("selecionar_bandeja").getValue() == true){
                        console.log("Action: Selecionar Bandeja");
                        //Desabilita acesso a pulseira
                        Pulseira.disable();
                        level.getFlag("por_luvas").setValue(true);
                        if(level.getFlag("score_selecionou_bandeja").getValue() == false) {
                            level.getFlag("score_selecionou_bandeja").setValue(true);
                            core.registerScoreItem(Scores.selecionarBandeja);
                        }
                        level.getFlag("selecionar_bandeja").setValue(false);
                    }else{
                        core.closeCommandBar();
                        core.openDialog(10);
                    }
                })
                .setVisibility(false),

            new Action("btn-por_luvas", "Por Luvas")
                .setCssClass("action-luvas_de_procedimento")
                .onClick(function (){
                    if(level.getFlag("por_luvas").getValue() == true) {
                        console.log("Action: Por Luvas");
                        level.getFlag("utilizar_algodao1").setValue(true);
                        if(level.getFlag("score_vestiu_luvas").getValue() == false) {
                            level.getFlag("score_vestiu_luvas").setValue(true);
                            core.registerScoreItem(Scores.porLuvas);
                        }
                        level.getFlag("por_luvas").setValue(false);
                    }//else{
                        //Não será utilizada uma fala caso não selecione a bandeja
                        /*core.closeCommandBar();
                        core.openDialog(15);*/
                    //}
                })
                .setVisibility(false),

            new Action("btn-utilizar_algodao", "Utilizar Algodão")
                .setCssClass("action-algodao_seco")
                .onClick(function (){
                    if((level.getFlag("utilizar_algodao1").getValue() == true) ||
                        (level.getFlag("utilizar_algodao2").getValue() == true)) {
                        console.log("Action: Utilizar Algodão");
                        //Verifica qual é a vez que está utilizando o algodão
                        if(level.getFlag("utilizar_algodao1").getValue() == true) {
                            level.getFlag("realizar_teste_glicemia").setValue(true);
                            if(level.getFlag("score_utilizou_algodao1").getValue() == false) {
                                level.getFlag("score_utilizou_algodao1").setValue(true);
                                core.registerScoreItem(Scores.usarAlgodao);
                            }
                            level.getFlag("utilizar_algodao1").setValue(false);
                        }else{
                            level.getFlag("explicar_resultado").setValue(true);
                            if(level.getFlag("score_utilizou_algodao2").getValue() == false) {
                                level.getFlag("score_utilizou_algodao2").setValue(true);
                                core.registerScoreItem(Scores.usarAlgodao2);
                            }
                            level.getFlag("utilizar_algodao2").setValue(false);
                        }
                    }else{
                        //Ainda não realizou algum dos passos anteriores a utilizar o algodão pela primeira vez
                        if((level.getFlag("selecionar_bandeja").getValue() == true) ||
                            (level.getFlag("por_luvas").getValue() == true)) {
                            core.closeCommandBar();
                            core.openDialog(11);
                        } else {
                            core.closeCommandBar();
                            core.openDialog(13);
                        }
                    }
                })
                .setVisibility(false),

            new Action("btn-realizar_teste_glicemia", "Realizar teste de glicemia capilar")
                .setCssClass("action-realizar_teste_glicemia") // CONSERTAR
                .onClick(function (){
                    if(level.getFlag("realizar_teste_glicemia").getValue() == true) {
                        console.log("Action: Realizar teste de glicemia capilar");
                        level.getFlag("utilizar_algodao2").setValue(true);
                        if(level.getFlag("score_realizou_teste_glicemia").getValue() == false) {
                            level.getFlag("score_realizou_teste_glicemia").setValue(true);
                            core.registerScoreItem(Scores.realizarTesteGlicemia);
                        }
                        level.getFlag("realizar_teste_glicemia").setValue(false);
                    }else{
                        core.closeCommandBar();
                        core.openDialog(12);
                    }
                })
                .setVisibility(false),

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    if((level.getFlag("voltar_ala_masculina").getValue() == true)){
                        core.disableInteractiveObject("io-pulseira_paciente");
                        core.changeScene(2);
                    }else{
                        core.closeCommandBar();
                        core.openDialog(14);
                    }
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Posto de enfermagem
        posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
            });

        posto_de_enfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    if(level.getFlag("score_pegou_kit_glicemia").getValue() == true
                    && level.getFlag("score_pegou_algodao").getValue() == true
                    && level.getFlag("score_pegou_luvas").getValue() == true
                    && level.getFlag("score_pegou_bandeja").getValue() == true) {
                        //Libera para dialogo com o paciente
                        level.getFlag("conversar_paciente2").setValue(true);
                        if (level.getFlag("pegou_tudo_gaveta").getValue() == false){
                            level.getFlag("pegou_tudo_gaveta").setValue(true);
                        }
                        core.changeScene(1);
                    }else{
                        //Pode sair caso nao pegou tudo mas não pode ir pra ala masculina
                        level.getFlag("pegou_tudo_gaveta").setValue(false);
                        core.changeScene(1);
                    }
                })
                .setVisibility(true)
        ]);

        posto_de_enfermagem.registerInteractiveObjects([
            new InteractiveObject("io-abrir_gaveta","Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("gaveta");
                    core.openCommandBar();

                    core.setInteractiveObjectVisible("io-kit_glicemia", !(level.getFlag("score_pegou_kit_glicemia").getValue()));
                    core.setInteractiveObjectVisible("io-algodao", !(level.getFlag("score_pegou_algodao").getValue()));
                    core.setInteractiveObjectVisible("io-luvas", !(level.getFlag("score_pegou_luvas").getValue()));
                    core.setInteractiveObjectVisible("io-bandeja", !(level.getFlag("score_pegou_bandeja").getValue()));
                })
                .setVisibility(true)
        ]);
        //endregion

        //farmacia - não será feito nada aqui mas é necessário ter
        farmacia = lib.scenes.farmacia.getClone()
            .onLoad(function (){
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
            });
        //endregion

        //ala feminina - não será feito nada aqui mas é necessário ter
        alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function (){
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
            });
        //endregion

        //Modal scenes

        //region Pulseira
        pulseira = new Scene("pulseira", "pulseira");

        pulseira.registerInteractiveObjects([

        ]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function () {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    if (level.getFlag("score_verificar_pulseira").getValue() == false){
                        level.getFlag("score_verificar_pulseira").setValue(true);
                        core.registerScoreItem(Scores.verificarPulseira);
                    }
                    core.setActionVisible("btn-selecionar_bandeja", true);
                    core.setActionVisible("btn-por_luvas", true);
                    core.setActionVisible("btn-utilizar_algodao", true);
                    core.setActionVisible("btn-realizar_teste_glicemia", true);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                    Pulseira.close();
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Gaveta
        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                    console.log("Btn ir corredor");
                    core.setActionVisible("btn-ir_corredor", true);
                    core.openCommandBar();
                })
                .setVisibility(true)
        ]);

        //Acertar posicoes
        gaveta.registerInteractiveObjects([
            //Kit glicemia
            new InteractiveObject("io-kit_glicemia","Pegar Kit de glicemia")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-thermometer")
                .onClick(function () {
                    console.log("Action: pegar kit de glicemia");
                    core.registerScoreItem(Scores.pegarKitGlicemia);
                    core.setInteractiveObjectVisible("io-kit_glicemia", false);
                    level.getFlag("score_pegou_kit_glicemia").setValue(true);
                })
                .setVisibility(true),

            //Algodao
            new InteractiveObject("io-algodao","Pegar algodao")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function () {
                    console.log("Action: pegar algodao ");
                    core.registerScoreItem(Scores.pegarAlgodao);
                    core.setInteractiveObjectVisible("io-algodao", false);
                    level.getFlag("score_pegou_algodao").setValue(true);
                })
                .setVisibility(true),

            //Luvas
            new InteractiveObject("io-luvas","Pegar luvas")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-oximeter")
                .onClick(function () {
                    console.log("Action: pegar luvas");
                    core.registerScoreItem(Scores.pegarLuvas);
                    core.setInteractiveObjectVisible("io-luvas", false);
                    level.getFlag("score_pegou_luvas").setValue(true);
                })
                .setVisibility(true),

            //Bandeja
            new InteractiveObject("io-bandeja","Pegar bandeja")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-watch")
                .onClick(function () {
                    console.log("Action: pegar bandeja");
                    core.registerScoreItem(Scores.pegarBandeja);
                    core.setInteractiveObjectVisible("io-bandeja", false);
                    level.getFlag("score_pegou_bandeja").setValue(true);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region Prontuario
        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            //TODO Verificar se prontuario está preenchido
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                    core.setInteractiveObjectVisible("io-ir_corredor", true);
                    level.getFlag("checar_prontuario").setValue(true);
                })
                .setVisibility(true)

            // new Action("btn-terminar_fase", "Conversar com Mentor")
            //     .setCssClass("action-abrir_dialogo")
            //     .onClick(function (){
            //         console.log("Action: Fechar prontuario");
            //         Prontuario.close();
            //         alert(Prontuario.isDataValid() + " Final da fase");
            //         core.registerScoreItem(Scores.tutorial.identificarPaciente);
            //         core.closeCommandBar();
            //         core.showEndOfLevel();
            //     })
        ]);
        //endregion

        //region Glicosimetro
        /*
        glicosimetro = new Scene("Glicosimetro", "Glicosimetro");

        glicosimetro.registerActions([
        
        ]);*/

        //endregion

        //Register in level
        //0
        level.registerScene(recepcao);
        //1
        level.registerScene(corredor);
        //2
        level.registerScene(sala_de_leitos);
        //3
        level.registerScene(leito);
        //4
        level.registerScene(posto_de_enfermagem);
        //5
        level.registerScene(farmacia);
        //6
        level.registerScene(alaFeminina);

        level.registerModalScene(pulseira);
        level.registerModalScene(gaveta);
        level.registerModalScene(prontuario);
        //level.registerModalScene(glicosimetro);

        //level init script
        level.setSetupScript(function(){

            level.getFlag("conversar_recepcionista").setValue(false);
            //level.getFlag("passagem_corredor").setValue(0);
            level.getFlag("conversar_paciente").setValue(false);
            level.getFlag("lavar_maos").setValue(false);
            level.getFlag("checar_prontuario").setValue(false);
            level.getFlag("pegou_tudo_gaveta").setValue(true);
            level.getFlag("segunda_ida_leito_paciente").setValue(false);
            level.getFlag("lavar_maos2").setValue(false);
            level.getFlag("conversar_paciente2").setValue(false);
            level.getFlag("selecionar_bandeja").setValue(false);
            level.getFlag("por_luvas").setValue(false);
            level.getFlag("utilizar_algodao1").setValue(false);
            level.getFlag("realizar_teste_glicemia").setValue(false);
            level.getFlag("utilizar_algodao2").setValue(false);
            level.getFlag("explicar_resultado").setValue(false);
            level.getFlag("voltar_ala_masculina").setValue(false);
            //Jogar fora itens usados nos devidos lixos
            level.getFlag("lixo_algodao").setValue(false);
            level.getFlag("lixo_agulha").setValue(false);
            level.getFlag("elevar_grade").setValue(false);
            level.getFlag("lavar_maos_apos_lixo").setValue(false);
            level.getFlag("score_ir_posto_hora_errada").setValue(false);
            level.getFlag("score_ir_farmacia_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_feminina_hora_errada").setValue(false);
            level.getFlag("score_falar_paciente").setValue(false);
            level.getFlag("score_lavar_maos_antes_do_prontuario").setValue(false);
            level.getFlag("score_checar_prontuario").setValue(false);
            level.getFlag("score_pegou_kit_glicemia").setValue(false);
            level.getFlag("score_pegou_algodao").setValue(false);
            level.getFlag("score_pegou_luvas").setValue(false);
            level.getFlag("score_pegou_bandeja").setValue(false);
            level.getFlag("score_lavar_maos_antes_de_ir_no_leito").setValue(false);
            level.getFlag("score_verificar_pulseira").setValue(false);
            level.getFlag("score_selecionou_bandeja").setValue(false);
            level.getFlag("score_vestiu_luvas").setValue(false);
            level.getFlag("score_utilizou_algodao1").setValue(false);
            level.getFlag("score_realizou_teste_glicemia").setValue(false);
            level.getFlag("score_utilizou_algodao2").setValue(false);
            level.getFlag("score_explicou_resultado").setValue(false);
            level.getFlag("score_jogou_algodao_lixo").setValue(false);
            level.getFlag("score_jogou_agulha_perfuro").setValue(false);
            level.getFlag("score_elevou_grade_cama").setValue(false);
            level.getFlag("score_lavou_maos_apos_lixo").setValue(false);
            level.getFlag("score_anotar_prontuario").setValue(false);

            Pulseira.setNameRegExp(/Raul Gonzales Rodrigues/);
            Pulseira.setLeitoRegExp(/0*3/);
            Pulseira.setDataRegExp(/24\/07\/1937/);

            Pulseira.setName("Raul Gonzales Rodrigues");
            Pulseira.setLeito("03");
            Pulseira.setData("24/07/1937");
            Pulseira.disable();

            Prontuario.setNome("Raul Gonzales Rodrigues");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("24/07/1937");
            Prontuario.setIdade("78 anos");
            Prontuario.setProfissao("Operário Aposentado");

            Prontuario.setPai("Roberto Cruz Rodrigues");
            Prontuario.setMae("Rebeca Gonzales");

            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("17/06/2015");
            Prontuario.setLeito("03 - Leito Masculino");
            Prontuario.setAntecedentes("Ocorrência de duas internações em 2013 por crise hipertensiva e uma internação em 2014 por hiperglicemia.");
            Prontuario.setHipotese("Acidose metabólica (Glicemia capilar no momento de internação 649 mg/dl).");
            Prontuario.setObservacoes("Portador de Diabetes Mellitus II há 33 anos e Hipertensão Arterial Sistêmica há 15 anos.");

            Prontuario.setPeso("77");
            Prontuario.setAltura("1,63");
            Prontuario.setCircunferenciaAbdominal("147");

            Prontuario.setPrescMedicaRowData(0, "17/06", "Metmorfina", "Oral", "500 mg (2x ao dia)", "07h - 17h", true, true);
            Prontuario.setPrescMedicaRowData(1, "17/06", "Glibenclamida", "Oral", "4 mg (2x ao dia)", "08h - 18h", true, true);
            //Prescricao 2 ainda não está funcionando
            //Prontuario.setPrescMedicaRowData(1, "17/06", "Bicarbonato de sódio", "Endovenoso", "8,4 g + Água destilada 100 ml", "Tempo de 4 horas", true, true);

            //Prontuario.setPrescEnfermagemState("decubito");
            //Prontuario.setPrescEnfermagemState("verificar glicemia");
            //Prontuario.setPrescEnfermagemState("levantar grade");

            Prontuario.setSsvvRowData(0, '17/06', '130x70', '58', '28', '95', '36,2', true);
            //Disable 2 row
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('17/06', '');
        });

        //Flags

        level.registerFlag(new Flag("conversar_recepcionista"), false);
        //level.registerFlag(new Flag("passagem_corredor"), 0);
        level.registerFlag(new Flag("conversar_paciente"), false);
        level.registerFlag(new Flag("lavar_maos"), false);
        level.registerFlag(new Flag("checar_prontuario"), false);
        level.registerFlag(new Flag("pegou_tudo_gaveta"), true);
        level.registerFlag(new Flag("segunda_ida_leito_paciente"), false);
        level.registerFlag(new Flag("lavar_maos2"), false);
        level.registerFlag(new Flag("conversar_paciente2"), false);
        level.registerFlag(new Flag("selecionar_bandeja"), false);
        level.registerFlag(new Flag("por_luvas"), false);
        level.registerFlag(new Flag("utilizar_algodao1"), false);
        level.registerFlag(new Flag("realizar_teste_glicemia"), false);
        level.registerFlag(new Flag("utilizar_algodao2"), false);
        level.registerFlag(new Flag("explicar_resultado"), false);
        level.registerFlag(new Flag("voltar_ala_masculina"), false);
        //Jogar fora itens usados nos devidos lixos
        level.registerFlag(new Flag("lixo_algodao"), false);
        level.registerFlag(new Flag("lixo_agulha"), false);
        level.registerFlag(new Flag("elevar_grade"), false);
        level.registerFlag(new Flag("lavar_maos_apos_lixo"), false);
        level.registerFlag(new Flag("score_ir_posto_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_feminina_hora_errada"), false);
        level.registerFlag(new Flag("score_falar_paciente"), false);
        level.registerFlag(new Flag("score_lavar_maos_antes_do_prontuario"), false);
        level.registerFlag(new Flag("score_checar_prontuario"), false);
        level.registerFlag(new Flag("score_pegou_kit_glicemia"), false);
        level.registerFlag(new Flag("score_pegou_algodao"), false);
        level.registerFlag(new Flag("score_pegou_luvas"), false);
        level.registerFlag(new Flag("score_pegou_bandeja"), false);
        level.registerFlag(new Flag("score_lavar_maos_antes_de_ir_no_leito"), false);
        level.registerFlag(new Flag("score_verificar_pulseira"), false);
        level.registerFlag(new Flag("score_selecionou_bandeja"), false);
        level.registerFlag(new Flag("score_vestiu_luvas"), false);
        level.registerFlag(new Flag("score_utilizou_algodao1"), false);
        level.registerFlag(new Flag("score_realizou_teste_glicemia"), false);
        level.registerFlag(new Flag("score_utilizou_algodao2"), false);
        level.registerFlag(new Flag("score_explicou_resultado"), false);
        level.registerFlag(new Flag("score_jogou_algodao_lixo"), false);
        level.registerFlag(new Flag("score_jogou_agulha_perfuro"), false);
        level.registerFlag(new Flag("score_elevou_grade_cama"), false);
        level.registerFlag(new Flag("score_lavou_maos_apos_lixo"), false);
        level.registerFlag(new Flag("score_anotar_prontuario"), false);

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 2);

        console.groupEnd();
    }
);