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
        corredor,
        alaFeminina,
        //alaMasculina,
        leito,
        posto_de_enfermagem,
        //gaveta,
        pulseira,
        prontuario;

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {
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
            if(level.getFlag("score_ver_prontuario").getValue() == false) {
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
            if(level.getFlag("conversar_mentor").getValue() == false) {
                core.openDialog(3);
                if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            }
            else{
                core.changeScene(2);
            }
        }

        function corredorIrAlaMasculina () {
            core.openDialog(3);
            if(level.getFlag("conversar_mentor").getValue() == false) {
                if(level.getFlag("score_ir_ala_masculina_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irAlaMasculina_horaErrada);
                    level.getFlag("score_ir_ala_masculina_hora_errada").setValue(true);
                }
            }
            else{
                if(level.getFlag("score_ir_ala_masculina_apos_fala_mentor").getValue() == false) {
                    core.registerScoreItem(Scores.irAlaMasculina_aposFalaMentor);
                    level.getFlag("score_ir_ala_masculina_apos_fala_mentor").setValue(true);
                }
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
                console.log("Entrando no corredor");
                //Mentor só aparece no começo da fase
                if (level.getFlag("score_ver_prontuario").getValue() == true){
                    core.setInteractiveObjectVisible("io-conversar_mentor", false);
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
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
                    level.getFlag("conversar_mentor").setValue(true);
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
                .setText(Alertas.perdido.farmacia)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 5 - Mentor Ação errada: Ir ao centro cirurgico
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.enfermagem[1])
                .registerOption("", function (){
                    core.closeDialog();
                })
        ]);

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(function corredorIrSalaLeitos () {})
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
            new InteractiveObject("io-ir_farmacia","Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),

            //TODO: Adicionar ir Centro Cirurgico
            new InteractiveObject("io-ir_centro_cirurgico","Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToSurgeryCenter")   //arrumar
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

        //region alaFeminina
        alaFeminina = lib.scenes.alaFeminina.getClone()
            .onLoad(function () {
                console.log("Load scene: Ala feminina");
                /*O fato de já ter verificado o prontuario é o que determina se é a primeira ou segunda vez
                que o jogador veio até a ala feminina*/
                if(level.getFlag("score_ver_prontuario").getValue() == false){
                    core.openDialog(0);
                }
                else{
                    core.setInteractiveObjectVisible("io-ir_leito", true);
                }
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        alaFeminina.registerInteractiveObjects([
            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    //Já checou o prontuario
                    if(level.getFlag("score_ver_prontuario").getValue() == true){
                        //Voltar para o corredor
                        core.changeScene(1);
                    } else {
                        core.openDialog(3);
                    }
                })
                .setVisibility(true),

            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-tutorial") // verificar onde conserta
                .onClick(function (){
                    if (level.getFlag("pegou_todos_instrumentos").getValue() == false){
                        //Mentor corrige
                        core.openDialog(4);
                    }
                    else{
                        if (level.getFlag("score_lavar_maos_antes_leito").getValue() == true){
                            core.changeScene(3);
                        }
                    }
                })
                .setVisibility(false),
        ]);

        alaFeminina.registerDialogs([
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_feminina[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.pacientes.raul_unknow)// APOS REGISTRAR, MUDAR PARA esther.unknow
                .setText(Dialogs.ala_feminina[1])
                .registerOption("", function() {
                    core.openDialog(2);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_feminina[2])
                .registerOption("", function() {
                    core.closeDialog();
                    //core.setActionVisible("btn-falar_paciente", true);
                    core.openCommandBar();
                }),
            //3 - Não ver o prontuario
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.ver_prontuario[1])
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 4 - Mentor Ação errada: Esquecer objetos na gaveta
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.objeto_qualquer)
                .registerOption("", function (){
                    core.closeDialog();
                })
        ]);

        alaFeminina.registerActions([
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    if(level.getFlag("score_ver_prontuario").getValue() == false) {
                        core.registerScoreItem(Scores.verProntuario);
                        level.getFlag("score_ver_prontuario").setValue(true);
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(true),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    if(level.getFlag("score_lavar_maos_antes_leito").getValue() == false) {
                        core.registerScoreItem(Scores.lavarMaosAntesLeito);
                        level.getFlag("score_lavar_maos_antes_leito").setValue(true);
                    }
                })
                .setVisibility(false),
        ]);
        //endregion

        //region Leito
        leito = lib.scenes.leitos.esther.getClone() 
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);
                //core.setActionVisible("btn-falar_paciente", true);
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([
            //COLOCAR PONTUAÇÃO
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_02-checar_pulseira") //VAI MUDAR
                .onClick(function () {
                    console.log("IO: pulseira_paciente");
                    if(level.getFlag("score_falar_paciente").getValue() == false) {
                        if(level.getFlag("score_nao_falar_paciente").getValue() == false) {
                            core.registerScoreItem(Scores.naoFalarComPaciente);
                            level.getFlag("score_nao_falar_paciente").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(7);
                    }
                    if(level.getFlag("score_verificar_pulseira").getValue() == false) {
                        core.registerScoreItem(Scores.verificarPulseira);
                        level.getFlag("score_verificar_pulseira").setValue(true);
                    }
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    //core.openCommandBar();
                })
                .setVisibility(true)
        ]);

        leito.registerDialogs([
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.pacientes.raul)// APOS REGISTRAR, MUDAR PARA esther
                .setText(Dialogs.leito_paciente[1])
                .registerOption("", function() {
                    core.openDialog(2);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.leito_paciente[2])
                .registerOption("", function() {
                    core.openDialog(3);
                }),
            new Dialog(lib.characters.pacientes.raul)// APOS REGISTRAR, MUDAR PARA esther
                .setText(Dialogs.leito_paciente[3])
                .registerOption("", function() {
                    core.openDialog(4);
                }),
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito_paciente[4], function () {
                    core.closeDialog();
                    core.setActionVisible("btn-falar_paciente", false);
                    core.setActionVisible("btn-teste_glicemia", true);
                    core.setActionVisible("btn-descartar_agulha", true);
                    core.setActionVisible("btn-jogar_algodao", true);
                    core.setActionVisible("btn-materiais_curativo", true);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.setActionVisible("btn-calcar_luvas_procedimento", true);
                    core.setActionVisible("btn-calcar_luvas_estereis", true);
                    core.setActionVisible("btn-fazer_curativo", true);
                    core.setActionVisible("btn-identificar_curativo", true);
                    core.setActionVisible("btn-erguer_grade", true);
                    core.setActionVisible("btn-anotar_prontuario", true);
                    core.openCommandBar();
                })
                .registerOption(Dialogs.leito_paciente[5], function () {
                    core.openDialog(6);
                })
                .setRandomize(true),
            // 6 - Resposta op 2
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito_paciente[6])
                .registerOption("", function () {
                    core.openDialog(4);
                }),
            // 7 - Não falar com o paciente
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.informar_paciente)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 8 - Não verificar a pulseira
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.ver_pulseira)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 9 - Não fazer o teste de glicemia capilar
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.teste[1])
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 10 - Não descartar a agulha
            new Dialog(lib.characters.mentor)
                .setText(Alertas.descarte.agulha)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 11 - Não jogar o algodão
            new Dialog(lib.characters.mentor)
                .setText(Alertas.descarte.algodão)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 12 - Não selecionar os materiais do curativo
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.materiais_curativo)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 13 - Não lavar as mãos
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo3)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 14 - Calçar luvas de procedimento
            new Dialog(lib.characters.mentor)
                .setText(Alertas.luvas_erradas)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 15 - Não calçar luva estéril
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.luvas_estereis)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 16 - Não fazer o curativo
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.teste[1])
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 17 - Não identificar o curativo
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.identificar_curativo)
                .registerOption("", function () {
                    core.closeDialog();
                }),
            // 18 - Não erguer a grade
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.elevar_grade[1])
                .registerOption("", function () {
                    core.closeDialog();
                })
        ]);

        leito.registerActions([
            new Action("btn-falar_paciente", "Conversar com Paciente")
                .setCssClass("action-leito-char-02") //Será outro
                .onClick(function () {
                    if(level.getFlag("score_falar_paciente").getValue() == false) {
                        core.registerScoreItem(Scores.falarComPaciente);
                        level.getFlag("score_falar_paciente").setValue(true);
                    }
                    core.openDialog(0);
                    core.closeCommandBar();
                })
                .setVisibility(true),

            new Action("btn-teste_glicemia", "Fazer teste de glicemia capilar")
                .setCssClass("action-selecionar_bandeja") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Fazer teste de glicemia capilar");
                    //Desabilita acesso a pulseira
                    Pulseira.disable();
                    if(level.getFlag("score_verificar_pulseira").getValue() == false){
                        if(level.getFlag("score_nao_verificar_pulseira").getValue() == false) {
                            core.registerScoreItem(Scores.naoVerificarPulseira);
                            level.getFlag("score_nao_verificar_pulseira").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(8);
                    }
                    if(level.getFlag("score_fez_teste_glicemia").getValue() == false) {
                        level.getFlag("score_fez_teste_glicemia").setValue(true);
                        core.registerScoreItem(Scores.fazerTesteGlicemia);
                    }
                })
                .setVisibility(false),

            new Action("btn-descartar_agulha", "Jogar agulha no descarpax")
                .setCssClass("action-descartar_agulha") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Jogar agulha no descarpax");
                    if(level.getFlag("score_fez_teste_glicemia").getValue() == false){
                        if(level.getFlag("score_nao_fez_teste_glicemia").getValue() == false) {
                            core.registerScoreItem(Scores.naoFazerTesteGlicemia);
                            level.getFlag("score_nao_fez_teste_glicemia").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(9);
                    }
                    if(level.getFlag("score_jogou_agulha_lixo_certo").getValue() == false) {
                        level.getFlag("score_jogou_agulha_lixo_certo").setValue(true);
                        core.registerScoreItem(Scores.jogarAgulhaLixoCerto);
                    }
                })
                .setVisibility(false),

            new Action("btn-jogar_algodao", "Jogar algodão na bandeja")
                .setCssClass("action-jogar_algodao") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Jogar algodão na bandeja");
                    if(level.getFlag("score_jogou_agulha_lixo_certo").getValue() == false){
                        if(level.getFlag("score_nao_jogou_agulha_lixo_certo").getValue() == false) {
                            core.registerScoreItem(Scores.naoJogarAgulhaLixoCerto);
                            level.getFlag("score_nao_jogou_agulha_lixo_certo").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(10);
                    }
                    if(level.getFlag("score_jogou_algodao_na_bandeja").getValue() == false) {
                        level.getFlag("score_jogou_algodao_na_bandeja").setValue(true);
                        core.registerScoreItem(Scores.jogarAlgodaoBandeja);
                    }
                })
                .setVisibility(false),

            new Action("btn-materiais_curativo", "Selecionar materiais do curativo")
                .setCssClass("action-selecionar_materiais_curativo") // CONSERTAR
                .onClick(function (){
                    console.log("Action: Selecionar materiais do curativo");
                    if(level.getFlag("score_jogou_algodao_na_bandeja").getValue() == false){
                        if(level.getFlag("score_nao_jogou_algodao_na_bandeja").getValue() == false) {
                            core.registerScoreItem(Scores.naoJogarAlgodaoBandeja);
                            level.getFlag("score_nao_jogou_algodao_na_bandeja").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(11);
                    }
                    if(level.getFlag("score_selecionou_materiais_curativo").getValue() == false) {
                        level.getFlag("score_selecionou_materiais_curativo").setValue(true);
                        core.registerScoreItem(Scores.selecionarMateriaisCurativo);
                    }
                })
                .setVisibility(false),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: Lavar as mãos");
                    if(level.getFlag("score_selecionou_materiais_curativo").getValue() == false){
                        if(level.getFlag("score_nao_selecionou_materiais_curativo").getValue() == false) {
                            core.registerScoreItem(Scores.naoSelecionarMateriaisCurativo);
                            level.getFlag("score_nao_selecionou_materiais_curativo").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(12);
                    }
                    if(level.getFlag("score_lavou_maos_antes_calcar_luva").getValue() == false) {
                        level.getFlag("score_lavou_maos_antes_calcar_luva").setValue(true);
                        core.registerScoreItem(Scores.lavarMaosAntesLuva);
                    }
                })
                .setVisibility(false),

            new Action("btn-calcar_luvas_procedimento", "Calçar luvas de procedimento")
                .setCssClass("action-luvas_de_procedimento")
                .onClick(function (){
                    console.log("Action: Calçar luvas de procedimento");
                    if(level.getFlag("score_luvas_de_procedimento").getValue() == false) {
                        core.registerScoreItem(Scores.calcarLuvaProcedimento);
                        level.getFlag("score_luvas_de_procedimento").setValue(true);
                    }
                    core.closeCommandBar();
                    core.openDialog(13);
                })
                .setVisibility(false),

            new Action("btn-calcar_luvas_estereis", "Calçar luvas estéreis")
                .setCssClass("action-luvas_estereis")
                .onClick(function (){
                    console.log("Action: Calçar luvas estéreis");
                    if(level.getFlag("score_lavou_maos_antes_calcar_luva").getValue() == false){
                        if(level.getFlag("score_nao_lavou_maos_antes_calcar_luva").getValue() == false) {
                            core.registerScoreItem(Scores.naoLavarMaosAntesLuva);
                            level.getFlag("score_nao_lavou_maos_antes_calcar_luva").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(14);
                    }
                    if(level.getFlag("score_luva_esteril").getValue() == false) {
                        level.getFlag("score_luva_esteril").setValue(true);
                        core.registerScoreItem(Scores.calcarLuvaEsteril);
                    }
                })
                .setVisibility(false),

            new Action("btn-fazer_curativo", "Fazer curativo")
                .setCssClass("action-fazer_curativo") // CONSERTAR
                .onClick(function (){
                    console.log("Action: Fazer curativo");
                    if(level.getFlag("score_luva_esteril").getValue() == false){
                        if(level.getFlag("score_nao_luva_esteril").getValue() == false) {
                            core.registerScoreItem(Scores.naoCalcarLuvaEsteril);
                            level.getFlag("score_nao_luva_esteril").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(15);
                    }
                    if(level.getFlag("score_fez_curativo").getValue() == false) {
                        level.getFlag("score_fez_curativo").setValue(true);
                        core.registerScoreItem(Scores.fazerCurativo);
                    }
                })
                .setVisibility(false),

            new Action("btn-identificar_curativo", "Identificar curativo")
                .setCssClass("action-identificar_curativo") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Identificar curativo");
                    if(level.getFlag("score_fez_curativo").getValue() == false){
                        if(level.getFlag("score_nao_fez_curativo").getValue() == false) {
                            core.registerScoreItem(Scores.naoFazerCurativo);
                            level.getFlag("score_nao_fez_curativo").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(16);
                    }
                    if(level.getFlag("score_identificou_curativo").getValue() == false) {
                        level.getFlag("score_identificou_curativo").setValue(true);
                        core.registerScoreItem(Scores.identificarCurativo);
                    }
                })
                .setVisibility(false),

            new Action("btn-erguer_grade", "Erguer grade da cama")
                .setCssClass("action-erguer_grade") //CONSERTAR
                .onClick(function (){
                    console.log("Action: Erguer grade da cama");
                    if(level.getFlag("score_identificou_curativo").getValue() == false){
                        if(level.getFlag("score_nao_identificou_curativo").getValue() == false) {
                            core.registerScoreItem(Scores.naoIdentificarCurativo);
                            level.getFlag("score_nao_identificou_curativo").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(17);
                    }
                    if(level.getFlag("score_ergueu_grade").getValue() == false) {
                        level.getFlag("score_ergueu_grade").setValue(true);
                        core.registerScoreItem(Scores.elevarGradeDaCama);
                    }
                })
                .setVisibility(false),

            new Action("btn-anotar_prontuario", "Anotar prontuario")
                .setCssClass("action-anotar_prontuario")
                .onClick(function (){
                    console.log("Action: Anotar prontuario");
                    if(level.getFlag("score_ergueu_grade").getValue() == false){
                        if(level.getFlag("score_nao_ergueu_grade").getValue() == false) {
                            core.registerScoreItem(Scores.naoElevarGradeDaCama);
                            level.getFlag("score_nao_ergueu_grade").setValue(true);
                        }
                        core.closeCommandBar();
                        core.openDialog(18);
                    }
                    if(level.getFlag("score_anotar_prontuario").getValue() == false) {
                        core.registerScoreItem(Scores.anotarNoProntuario);
                        level.getFlag("score_anotar_prontuario").setValue(true);
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(false)
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
                    && level.getFlag("score_pegou_bandeja").getValue() == true
                    && level.getFlag("score_pegou_luvas_estereis").getValue() == true
                    && level.getFlag("score_pegou_gaze").getValue() == true
                    && level.getFlag("score_pegou_fita_hipoalergenica").getValue() == true
                    && level.getFlag("score_pegou_soro").getValue() == true
                    && level.getFlag("score_pegou_seringa").getValue() == true
                    && level.getFlag("score_pegou_agulha").getValue() == true) {
                        //Libera para dialogo com o paciente
                        //level.getFlag("conversar_paciente2").setValue(true);
                        if (level.getFlag("pegou_tudo_gaveta").getValue() == false){
                            level.getFlag("pegou_tudo_gaveta").setValue(true);
                        }
                        if (level.getFlag("pegou_todos_instrumentos").getValue() == false){
                            core.registerScoreItem(Scores.pegarTodosInstrumentos);
                            level.getFlag("pegou_todos_instrumentos").setValue(true);
                        }
                        core.changeScene(1);
                    }else{
                        //Pode sair caso nao pegou tudo mas não pode ir pra ala feminina
                        level.getFlag("pegou_tudo_gaveta").setValue(false);
                        core.changeScene(1);
                    }
                })
                .setVisibility(true),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    if(level.getFlag("score_lavar_maos_posto_enfermagem").getValue() == false) {
                        core.registerScoreItem(Scores.lavarMaosPostoEnfermagem);
                        level.getFlag("score_lavar_maos_posto_enfermagem").setValue(true);
                    }
                })
                .setVisibility(true)
        ]);

        posto_de_enfermagem.registerInteractiveObjects([
            //VERIFICAR QUAIS ITENS VÃO PARA UMA GAVETA E QUAIS VÃO PARA OUTRA GAVETA
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
                    core.setInteractiveObjectVisible("io-luvas_estereis", !(level.getFlag("score_pegou_luvas_estereis").getValue()));
                    core.setInteractiveObjectVisible("io-gaze", !(level.getFlag("score_pegou_gaze").getValue()));
                    core.setInteractiveObjectVisible("io-fita_hipoalergenica", !(level.getFlag("score_pegou_fita_hipoalergenica").getValue()));
                    core.setInteractiveObjectVisible("io-soro", !(level.getFlag("score_pegou_soro").getValue()));
                    core.setInteractiveObjectVisible("io-seringa", !(level.getFlag("score_pegou_seringa").getValue()));
                    core.setInteractiveObjectVisible("io-agulha", !(level.getFlag("score_pegou_agulha").getValue()));
                })
                .setVisibility(true),

            /*new InteractiveObject("io-abrir_gaveta2","Abrir gaveta2")
                .setCssClass("intObj-openDrawer")
                .onClick(function () {
                    console.log("Action: abrir_gaveta2");
                    core.openModalScene("gaveta");
                    core.openCommandBar();
                    core.setInteractiveObjectVisible("io-gaze", !(level.getFlag("score_pegou_gaze").getValue()));
                    core.setInteractiveObjectVisible("io-fita_hipoalergenica", !(level.getFlag("score_pegou_fita_hipoalergenica").getValue()));
                    core.setInteractiveObjectVisible("io-soro", !(level.getFlag("score_pegou_soro").getValue()));
                    core.setInteractiveObjectVisible("io-seringa", !(level.getFlag("score_pegou_seringa").getValue()));
                    core.setInteractiveObjectVisible("io-agulha", !(level.getFlag("score_pegou_agulha").getValue()));
                })
                .setVisibility(true)*/
        ]);
        //endregion

        //endregion

        //region ModalScenes

        //region Gaveta
        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                    //console.log("Btn ir corredor");
                    //core.setActionVisible("btn-ir_corredor", true);
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
                .setVisibility(true),

            //Luvas estéreis
            new InteractiveObject("io-luvas_estereis","Pegar luvas estéreis")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-thermometer")
                .onClick(function () {
                    console.log("Action: pegar luvas estéreis");
                    core.registerScoreItem(Scores.pegarLuvasEstereis);
                    core.setInteractiveObjectVisible("io-luvas_estereis", false);
                    level.getFlag("score_pegou_luvas_estereis").setValue(true);
                })
                .setVisibility(true),

            //Gaze esterelizada
            new InteractiveObject("io-gaze","Pegar gaze esterelizada")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function () {
                    console.log("Action: pegar gaze ");
                    core.registerScoreItem(Scores.pegarGaze);
                    core.setInteractiveObjectVisible("io-gaze", false);
                    level.getFlag("score_pegou_gaze").setValue(true);
                })
                .setVisibility(true),

            //Fita adesiva hipoalergênica
            new InteractiveObject("io-fita_hipoalergenica","Pegar fita adesiva hipoalergênica")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-oximeter")
                .onClick(function () {
                    console.log("Action: pegar fita adesiva hipoalergênica");
                    core.registerScoreItem(Scores.pegarFitaHipoalergenica);
                    core.setInteractiveObjectVisible("io-fita_hipoalergenica", false);
                    level.getFlag("score_pegou_fita_hipoalergenica").setValue(true);
                })
                .setVisibility(true),

            //Soro Fisiológico 0,9% (250 ml) aquecido
            new InteractiveObject("io-soro","Pegar soro fisiológico 0,9% (250 ml) aquecido")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-watch")
                .onClick(function () {
                    console.log("Action: pegar soro fisiológico 0,9% (250 ml) aquecido");
                    core.registerScoreItem(Scores.pegarSoro);
                    core.setInteractiveObjectVisible("io-soro", false);
                    level.getFlag("score_pegou_soro").setValue(true);
                })
                .setVisibility(true),

            //Seringa de 20 ml
            new InteractiveObject("io-seringa","Pegar seringa de 20 ml")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-thermometer")
                .onClick(function () {
                    console.log("Action: pegar seringa de 20 ml");
                    core.registerScoreItem(Scores.pegarSeringa);
                    core.setInteractiveObjectVisible("io-seringa", false);
                    level.getFlag("score_pegou_seringa").setValue(true);
                })
                .setVisibility(true),

            //Agulha 40X12
            new InteractiveObject("io-agulha","Pegar agulha 40X12")
                //Ainda nao disponivel imagem correta
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function () {
                    console.log("Action: pegar agulha 40X12 ");
                    core.registerScoreItem(Scores.pegarAgulha);
                    core.setInteractiveObjectVisible("io-agulha", false);
                    level.getFlag("score_pegou_agulha").setValue(true);
                })
                .setVisibility(true)
        ]);
        //endregion

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
                    Pulseira.close();
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
                    //Terminou a fase
                    core.unlockLevel(6);
                    core.closeCommandBar();
                    core.showEndOfLevel();
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

        //endregion

        //Register in level

        //0
        level.registerScene(recepcao);
        //1
        level.registerScene(corredor);
        //2
        level.registerScene(alaFeminina);
        //3
        level.registerScene(leito);
        //4
        level.registerScene(posto_de_enfermagem);

        level.registerModalScene(pulseira);
        level.registerModalScene(gaveta);
        level.registerModalScene(prontuario);
        //level.registerModalScene(glicosimetro);

        //level init script
        level.setSetupScript(function () {

            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("pegou_tudo_gaveta").setValue(true);
            level.getFlag("pegou_todos_instrumentos").setValue(false);
            level.getFlag("score_ir_posto_hora_errada").setValue(false);
            level.getFlag("score_ir_farmacia_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_feminina_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_masculina_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_masculina_apos_fala_mentor").setValue(false);
            level.getFlag("score_ver_prontuario").setValue(false);
            level.getFlag("score_lavar_maos_posto_enfermagem").setValue(false);
            level.getFlag("score_pegou_kit_glicemia").setValue(false);
            level.getFlag("score_pegou_algodao").setValue(false);
            level.getFlag("score_pegou_luvas").setValue(false);
            level.getFlag("score_pegou_bandeja").setValue(false);
            level.getFlag("score_pegou_luvas_estereis").setValue(false);
            level.getFlag("score_pegou_gaze").setValue(false);
            level.getFlag("score_pegou_fita_hipoalergenica").setValue(false);
            level.getFlag("score_pegou_soro").setValue(false);
            level.getFlag("score_pegou_seringa").setValue(false);
            level.getFlag("score_pegou_agulha").setValue(false);
            level.getFlag("score_lavar_maos_antes_leito").setValue(false);
            level.getFlag("score_falar_paciente").setValue(false);
            level.getFlag("score_nao_falar_paciente").setValue(false);
            level.getFlag("score_verificar_pulseira").setValue(false);
            level.getFlag("score_nao_verificar_pulseira").setValue(false);
            level.getFlag("score_fez_teste_glicemia").setValue(false);
            level.getFlag("score_nao_fez_teste_glicemia").setValue(false);
            level.getFlag("score_jogou_agulha_lixo_certo").setValue(false);
            level.getFlag("score_nao_jogou_agulha_lixo_certo").setValue(false);
            level.getFlag("score_jogou_algodao_na_bandeja").setValue(false);
            level.getFlag("score_nao_jogou_algodao_na_bandeja").setValue(false);
            level.getFlag("score_selecionou_materiais_curativo").setValue(false);
            level.getFlag("score_nao_selecionou_materiais_curativo").setValue(false);
            level.getFlag("score_lavou_maos_antes_calcar_luva").setValue(false);
            level.getFlag("score_nao_lavou_maos_antes_calcar_luva").setValue(false);
            level.getFlag("score_luvas_de_procedimento").setValue(false);
            level.getFlag("score_luva_esteril").setValue(false);
            level.getFlag("score_nao_luva_esteril").setValue(false);
            level.getFlag("score_fez_curativo").setValue(false);
            level.getFlag("score_nao_fez_curativo").setValue(false);
            level.getFlag("score_identificou_curativo").setValue(false);
            level.getFlag("score_nao_identificou_curativo").setValue(false);
            level.getFlag("score_ergueu_grade").setValue(false);
            level.getFlag("score_nao_ergueu_grade").setValue(false);
            level.getFlag("score_anotar_prontuario").setValue(false);

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
            Prontuario.setHipotese("Acidente vascular encefálico isquêmico (AVE).");
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
            //Prontuario.setSsvvRowData(2, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('02/11', '');
        });

        //region Flags
        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("pegou_tudo_gaveta"), true);
        level.registerFlag(new Flag("pegou_todos_instrumentos"), false);
        level.registerFlag(new Flag("score_ir_posto_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_feminina_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_masculina_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_masculina_apos_fala_mentor"), false);
        level.registerFlag(new Flag("score_ver_prontuario"), false);
        level.registerFlag(new Flag("score_lavar_maos_posto_enfermagem"), false);
        level.registerFlag(new Flag("score_pegou_kit_glicemia"), false);
        level.registerFlag(new Flag("score_pegou_algodao"), false);
        level.registerFlag(new Flag("score_pegou_luvas"), false);
        level.registerFlag(new Flag("score_pegou_bandeja"), false);
        level.registerFlag(new Flag("score_pegou_luvas_estereis"), false);
        level.registerFlag(new Flag("score_pegou_gaze"), false);
        level.registerFlag(new Flag("score_pegou_fita_hipoalergenica"), false);
        level.registerFlag(new Flag("score_pegou_soro"), false);
        level.registerFlag(new Flag("score_pegou_seringa"), false);
        level.registerFlag(new Flag("score_pegou_agulha"), false);
        level.registerFlag(new Flag("score_lavar_maos_antes_leito"), false);
        level.registerFlag(new Flag("score_falar_paciente"), false);
        level.registerFlag(new Flag("score_nao_falar_paciente"), false);
        level.registerFlag(new Flag("score_verificar_pulseira"), false);
        level.registerFlag(new Flag("score_nao_verificar_pulseira"), false);
        level.registerFlag(new Flag("score_fez_teste_glicemia"), false);
        level.registerFlag(new Flag("score_nao_fez_teste_glicemia"), false);
        level.registerFlag(new Flag("score_jogou_agulha_lixo_certo"), false);
        level.registerFlag(new Flag("score_nao_jogou_agulha_lixo_certo"), false);
        level.registerFlag(new Flag("score_jogou_algodao_na_bandeja"), false);
        level.registerFlag(new Flag("score_nao_jogou_algodao_na_bandeja"), false);
        level.registerFlag(new Flag("score_selecionou_materiais_curativo"), false);
        level.registerFlag(new Flag("score_nao_selecionou_materiais_curativo"), false);
        level.registerFlag(new Flag("score_lavou_maos_antes_calcar_luva"), false);
        level.registerFlag(new Flag("score_nao_lavou_maos_antes_calcar_luva"), false);
        level.registerFlag(new Flag("score_luvas_de_procedimento"), false);
        level.registerFlag(new Flag("score_luva_esteril"), false);
        level.registerFlag(new Flag("score_nao_luva_esteril"), false);
        level.registerFlag(new Flag("score_fez_curativo"), false);
        level.registerFlag(new Flag("score_nao_fez_curativo"), false);
        level.registerFlag(new Flag("score_identificou_curativo"), false);
        level.registerFlag(new Flag("score_nao_identificou_curativo"), false);
        level.registerFlag(new Flag("score_ergueu_grade"), false);
        level.registerFlag(new Flag("score_nao_ergueu_grade"), false);
        level.registerFlag(new Flag("score_anotar_prontuario"), false);
        //endregion

        level.setInitialScene(0);

        game.registerLevel(level, 5);

        console.groupEnd();

    }
);