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
        //var Scores = Scores.level1;
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
        gaveta,
        pulseira,
        prontuario;

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
            console.log("Va para sala de leitos");
            core.changeScene(2);
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
            alert("Mentor corrige");
            core.openDialog(3);
            if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        function corredorIrFarmacia () {
            alert("Mentor corrige");
            core.openDialog(4);
            if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                core.registerScoreItem(Scores.irFarmacia_horaErrada);
                level.getFlag("score_ir_posto_hora_errada").setValue(true);
            }
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if (level.getFlag("pegou_tudo_gaveta").getValue() == false){
                    core.setInteractiveObjectVisible("io-ir_sala_leitos", false);
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
                .onClick(corredorIrFarmacia)
                .setVisibility(true),

            //TODO: Adicionar ir Farmácia
            new InteractiveObject("io-ir_farmacia","Ir para a Farmacia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true)

        ]);
        //endregion

        //region Sala de leitos -> botao de falar com paciente
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Entrando na sala de leitos");
                core.openCommandBar();
                //Na primeira vez o leito vai estar desabilitado
                if (level.getFlag("segunda_ida_leito_paciente").getValue() == false){
                    core.setInteractiveObjectVisible("io-ir_leito", false);
                }
                else{
                    core.setInteractiveObjectVisible("io-ir_leito", true);
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
                .setCssClass("intObj-ir_leito-fase1") // verificar onde conserta
                .onClick(function (){
                    if (level.getFlag("lavar_maos2").getValue() == false){
                        //Mentor apenas corrige
                        core.openDialog(3);
                    }
                    core.changeScene(3);
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
            new Action("btn-falar_com_paciente_ala", "Falar com paciente")
                .setCssClass("action-leito-char-02") //Vai ser outro
                .onClick(function (){
                   core.openDialog(0);
                   core.closeCommandBar();
                   level.getFlag("conversar_paciente").setValue(true);
                })
                .setVisibility(true),

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
                        if(level.getFlag("lavar_maos2").getValue() == false) {
                            level.getFlag("lavar_maos2").setValue(true);
                        }
                        if(level.getFlag("score_lavar_maos_antes_de_ir_no_leito").getValue() == false) {
                            core.registerScoreItem(Scores.lavarMaosAntesLeito);
                            level.getFlag("score_lavar_maos_antes_de_ir_no_leito").setValue(true);
                        }
                    }
                })
                .setVisibility(false),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    if(level.getFlag("lavar_maos").getValue() == false){
                        alert("Você deve lavar as mãos antes de abrir o prontuario");
                    } else {
                        if(level.getFlag("score_checar_prontuario").getValue() == false) {
                            core.registerScoreItem(Scores.checarProntuario);
                            level.getFlag("score_checar_prontuario").setValue(true);
                        }
                        //Bloqueia o acesso para a farmacia e a ala feminina
                        //level.getFlag("passagem_corredor").setValue(1);
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                        //Verificou o prontuario, realiza a fala
                        core.openDialog(2);
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
                })
        ]);
        //endregion

        //region Leito
        leito = lib.scenes.leitos.char2.getClone()
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_02-checar_pulseira")
                .onClick(function () {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                    if(level.getFlag("pulseira").getValue() == false)
                        core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
                })
                .setVisibility(visibility)
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
                    core.setActionVisible("btn-ler_prontuario", true);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.closeDialog();
                    core.openCommandBar();
                }),
            new Dialog(lib.characters.pacientes.raul)
                .setText(Dialogs.leito_paciente[6])
                .registerOption("", function() {
                    core.openDialog(7);
                })
        ]);

        leito.registerActions([
            /*new Action("btn-examinar_paciente", "Examinar Paciente")
                .setCssClass("action-examinar_paciente")
                .onClick(function () {
                    console.log("Action: btn-examinar_paciente");
                    core.openModalScene("zoomChar2");
                    level.getFlag("examinar_paciente").setValue(true);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                })
                .setVisibility(false),*/
            new Action("btn-falar_paciente", "Conversar com Paciente")
                .setCssClass("action-leito-char-02") //Vai ser outro
                .onClick(function () {
                    console.log("Action: btn-conversar_paciente");
                    if(level.getFlag("score_falar_paciente").getValue() == false) {
                        core.registerScoreItem(Scores.falarComPaciente);
                        level.getFlag("score_falar_paciente").setValue(true);
                    }
                    core.openDialog(0);
                    core.closeCommandBar();
                })
                .setVisibility(true),
                //Mais actions
            //A ordem será mantida por flags
            // CUIDADO COM OS CSS ERRADOS
            new Action("btn-selecionar_bandeja", "Selecionar Bandeja")
                .setCssClass("action-selecionar_bandeja")
                .onClick(function (){
                    if(Pulseira.isAllDataValid()){
                        console.log("Action: selecionar_bandeja");
                        // [duvida] uma flag pra pulseira
                        core.registerScoreItem(Scores.verificarPulseira);
                        //core.setActionVisible("btn-perguntar_nome_do_paciente", false);
                        //core.changeScene(2);
                        Pulseira.disable();
                    }else{
                        core.closeCommandBar();
                        alert("Mentor corrige");
                        console.log("Alguns dados da pulseira estão incorretos");
                })
                .setVisibility(visibility),
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
                        if (level.getFlag("pegou_tudo_gaveta").getValue() == false){
                            level.getFlag("pegou_tudo_gaveta").setValue(true);
                        }
                        core.changeScene(1);
                    }else{
                        alert("Você esqueceu de pegar algo. Tem que revisar se realmente deve travar aqui");
                        //Aparentemente pode sair caso nao pegou tudo mas não pode ir pra ala masculina
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
                    if(level.getFlag("confirmou_pulseira").getValue() == false) {
                        level.getFlag("confirmou_pulseira").setValue(true);
                        core.setActionVisible("btn-examinar_paciente", true);
                    }

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
                .setCssClass("intObj-thermometer")
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
                .setCssClass("intObj-thermometer")
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
                .setCssClass("intObj-thermometer")
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
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    level.getFlag("checar_prontuario").setValue(true);
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                    core.setInteractiveObjectVisible("io-ir_corredor", true);
                })
                .setVisibility(true),

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

        level.registerModalScene(pulseira);
        level.registerModalScene(gaveta);
        level.registerModalScene(prontuario);
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
            level.getFlag("pulseira").setValue(false);
            level.getFlag("conversar_paciente2").setValue(false);
            level.getFlag("usou_bandeja").setValue(false);
            level.getFlag("usou_luvas").setValue(false);
            level.getFlag("usou_algodao").setValue(false);
            level.getFlag("usou_kit_glicemia").setValue(false);
            level.getFlag("usou_algodao2").setValue(false);
            //Explicar resultados para paciente
            level.getFlag("conversar_paciente3").setValue(false);
            //Jogar fora itens usados nos devidos lixos
            level.getFlag("lixo_algodao").setValue(false);
            level.getFlag("lixo_agulha").setValue(false);
            level.getFlag("elevar_grade").setValue(false);
            level.getFlag("lavar_maos3").setValue(false);
            level.getFlag("anotar_prontuario").setValue(false);
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
            level.getFlag("score_lavar_maos_antes_de_ir_no_leito").setValue(true);

            Pulseira.setNameRegExp(/Raul Gonzales Rodrigues/);
            Pulseira.setLeitoRegExp(/0*1/);
            Pulseira.setDataRegExp(/01\/12\/1945/);

            Prontuario.setNome("Raul Gonzales Rodrigues");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("01/12/1945");
            Prontuario.setIdade("78 anos");
            Prontuario.setProfissao("Operário Aposentado");

            //TODO: Atualizar isso com informações corretas dos pacientes
            Prontuario.setPai("Leonardo Gouvêa");
            Prontuario.setMae("Maria Clara Esme Gouvêa");

            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("15/06/2015");
            Prontuario.setLeito("03 - Leito Masculino");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Pneumonia brônquica, insuficiência respiratória e anemia ferropriva.");
            Prontuario.setObservacoes("Possui incontinência urinária, acamado.");

            Prontuario.setPeso("72");
            Prontuario.setAltura("1,68");
            Prontuario.setCircunferenciaAbdominal("135");

            Prontuario.setPrescMedicaRowData(0, "15/03", "Sulfato ferroso", "Oral", "drágea 250 mg", "2x dia", "x");
            Prontuario.setPrescMedicaRowData(1, "15/03", "Azitromicina", "Oral", "comp 500 mg", "1x dia", "x");

            Prontuario.setSsvvRowData(0, '15/03', '130x80', '65', '14', '94', '36', true);
            //Disable 2 row
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
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
        level.registerFlag(new Flag("pulseira"), false);
        level.registerFlag(new Flag("conversar_paciente2"), false);
        level.registerFlag(new Flag("usou_bandeja"), false);
        level.registerFlag(new Flag("usou_luvas"), false);
        level.registerFlag(new Flag("usou_algodao"), false);
        level.registerFlag(new Flag("usou_kit_glicemia"), false);
        level.registerFlag(new Flag("usou_algodao2"), false);
        //Explicar resultados para paciente
        level.registerFlag(new Flag("conversar_paciente3"), false);
        //Jogar fora itens usados nos devidos lixos
        level.registerFlag(new Flag("lixo_algodao"), false);
        level.registerFlag(new Flag("lixo_agulha"), false);
        level.registerFlag(new Flag("elevar_grade"), false);
        level.registerFlag(new Flag("lavar_maos3"), false);
        level.registerFlag(new Flag("anotar_prontuario"), false);
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

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 2);

        console.groupEnd();
    }
);
