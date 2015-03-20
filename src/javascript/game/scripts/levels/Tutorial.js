/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'Pulseira', 'CuidandoBem', 'Commons'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, Pulseira, core, lib) {

        //region Imports
        var Dialogs = require("Dialogs").tutorial;
        //endregion

        var level = new Level("Level Tutorial");
        console.groupCollapsed(level.getName());

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = false;
        if (!flags_on)
            visibility = true;

        //region Scenes

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if (!flags_on) {  // wont check for flags
                core.closeDialog(0);
                core.closeDialog(1);
                core.changeScene(1);
                console.log("Ir para o corredor");
            }
            else {
                if (level.getFlag("conversar_recepcionista").getValue() == true) {
                    core.closeDialog(0);
                    core.closeDialog(1);
                    core.changeScene(1);
                    console.log("Ir para o corredor");
                }
                else
                    console.log("Necessita ação: conversar com a recepcionista");
            }
        }

        function conversarRecepcionista() {
            console.log("action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        var recepcao = lib.scenes.recepcao.getClone()
            .setLoadFunction(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista_unknow)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.openDialog(1);
                }),

            // Dialog 1
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.recepcao[1], function(){
                    core.openDialog(2);
                }),

            // Dialog 2
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[2])
                .registerOption("", function(){
                    console.log("Encerrar o diálogo");
                    core.closeDialog(3);
                    core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true);
                    core.setInteractiveObjectVisible("io-ir_corredor_direita", true);
                })
        ]);

        recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista","Conversar com a Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .setVisible(true)
                .onClick(conversarRecepcionista),


            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick(recepcaoIrCorredor)
                .setVisible(visibility),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisible(visibility)
        ]);

        //endregion

        //region Corredor

        function corredorIrSalaLeitos() {
            if (!flags_on) {
                console.log("Action: corredorIrSalaLeitos");
                core.changeScene(2);
            } else {
                if (level.getFlag("conversar_mentor").getValue() == true) {
                    core.changeScene(2);
                    console.log("Action: corredorIrSalaLeitos");
                } else {
                    console.log("Necessita ação: falar com mentor");
                }
            }
        }

        var corredor = lib.scenes.corredor.getClone()
            .setLoadFunction( function () {
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
            .setUnloadFunction(function (){
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
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[0])
                .registerOption("", function () {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(1);
                }),
            // Dialog 1
            new Dialog(lib.characters.jogador)
                .setText("")
                // resposta correta
                .registerOption(Dialogs.corredor[1], function () {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(4);
                })
                // dialog 2
                .registerOption(Dialogs.corredor[2], function () {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(2);
                })
                .registerOption(Dialogs.corredor[4], function () {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(3);
                })
                .setRandomize(true),

            // Dialog 2
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[3])
                .registerOption("",function () {
                    core.openDialog(1);
                }),
            // Dialog 3
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[5])
                .registerOption("",function () {
                    core.openDialog(1);
                }),

            // Dialog 4 - correto
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor[6])
                .registerOption("",function () {
                    core.closeDialog(4);
                    core.setInteractiveObjectVisible("io-ir_sala_leitos", true);
                    core.setInteractiveObjectVisible("io-conversar_mentor", true);
                })
        ]);

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.changeScene(4);
        }

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrSalaLeitos)
                .setVisible(visibility),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick(corredorIrPostoEnfermagem)
                .setVisible(visibility),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog(0);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Sala de Leitos
        var sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .setLoadFunction(function (){
                switch (level.getFlag("passagem_sala-de-leitos").getValue()){
                    case 0:
                        core.setInteractiveObjectVisible("io-ir_leito", true);
                        core.setInteractiveObjectVisible("io-ir_corredor", false);
                        break;
                    case 1:
                        core.setInteractiveObjectVisible("io-ir_leito", false);
                        core.setInteractiveObjectVisible("io-ir_corredor", true);
                        break;
                }
            })
            .setUnloadFunction( function (){
                switch (level.getFlag("passagem_sala-de-leitos").getValue()){
                    case 0:
                        level.getFlag("passagem_sala-de-leitos").setValue(1);
                        break;
                    case 1:
                        level.getFlag("passagem_sala-de-leitos").setValue(0);
                        break;
                }
            });

        sala_de_leitos.registerInteractiveObjects([
           new InteractiveObject("io-ir_leito", "Ir ao leito")
               .setCssClass("intObj-ir_leito-tutorial")
               .onClick(function (){
                   core.changeScene(3);
               })
               .setVisible(visibility),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    core.changeScene(1);
                })
                .setVisible(visibility)
        ]);

        //endregion

        //region Leito
        var leito = lib.scenes.leitos.joao.getClone()
            .setLoadFunction(function () {
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);

                //force case 1
                //level.getFlag("visita-leito").setValue(1);
                // delete here

                switch (level.getFlag("visita-leito").getValue()){
                    case 0:
                        core.openDialog(0);
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_sala_leitos", false);
                        core.openDialog(11);
                        level.getFlag("termometro").setValue(false);
                        level.getFlag("medidor-pressao").setValue(false);
                        level.getFlag("oximetro").setValue(false);
                        level.getFlag("relogio").setValue(false);
                        break;
                }
            })
            .setUnloadFunction(function (){
                console.log("Leito: OnUnload");
                level.getFlag("visita-leito").setValue(1);
                core.closeCommandBar();
            });


        //region Leito - Dialogs
        leito.registerDialogs([
            // Dialog 0 - mentor
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[0])
                .registerOption("", function () {
                    core.openDialog(1);
                }),
            // Dialog 1 - resp jogador
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito.conversa1[1], function () {
                    core.openDialog(4);
                })
                .registerOption(Dialogs.leito.conversa1[2], function () {
                    core.openDialog(2);
                })
                .registerOption(Dialogs.leito.conversa1[4], function () {
                    core.openDialog(3);
                })
                .setRandomize(true),
            // Dialog 2
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[3])
                .registerOption("", function () {
                    core.openDialog(1);
                }),
            // Dialog 3
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[5])
                .registerOption("", function () {
                    core.openDialog(1);
                }),
            // Dialog 4
            new Dialog(lib.characters.pacientes.joao)
                .setText(Dialogs.leito.conversa1[6])
                .registerOption("", function () {
                    core.openDialog(5);
                }),
            // Dialog 5
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito.conversa1[7], function () {
                    core.openDialog(8);
                })
                .registerOption(Dialogs.leito.conversa1[8], function () {
                    core.openDialog(6);
                })
                .registerOption(Dialogs.leito.conversa1[10], function () {
                    core.openDialog(7);
                })
                .setRandomize(true),
            // Dialog 6
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[9])
                .registerOption("", function () {
                    core.openDialog(5);
                }),
            // Dialog 7
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[11])
                .registerOption("", function () {
                    core.openDialog(5);
                }),
            // Dialog 8
            new Dialog(lib.characters.pacientes.joao)
                .setText(Dialogs.leito.conversa1[12])
                .registerOption("", function () {
                    core.openDialog(9);
                }),
            // Dialog 9
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito.conversa1[13], function () {
                    core.openDialog(10);
                }),
            // Dialog 10
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa1[14])
                .registerOption("", function () {
                    core.closeDialog(10);
                }),


            // 2a visita do jogador ao leito

            // Dialog 11
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito.conversa2[0], function () {
                    core.openDialog(14);
                })
                .registerOption(Dialogs.leito.conversa2[1], function () {
                    core.openDialog(12);
                })
                .registerOption(Dialogs.leito.conversa2[3], function () {
                    core.openDialog(13);
                })
                .setRandomize(true),
            // Dialog 12
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa2[2])
                .registerOption("", function () {
                    core.openDialog(11);
                }),
            // Dialog 13
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa2[4])
                .registerOption("", function () {
                    core.openDialog(11);
                }),

            // Dialog 14
            new Dialog(lib.characters.pacientes.joao)
                .setText(Dialogs.leito.conversa2[5])
                .registerOption("", function () {
                    core.openDialog(15);
                }),
            // Dialog 15
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito.conversa2[6], function () {
                    core.openDialog(16);
                }),
            // Dialog 16
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito.conversa2[7])
                .registerOption("", function () {
                    core.closeDialog(16);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.openCommandBar();
                })
        ]);
        //endregion

        //region Leito - interactiveObjects and Actions
        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_01-checar_pulseira")
                .onClick(function () {
                    console.log("IO: pulseira_paciente");
                    //core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                    if(level.getFlag("pulseira").getValue() == false)
                        core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
                })
                .setVisible(visibility)

        ]);

        leito.registerActions([
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene(2);
                })
                .setVisible(visibility),
            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: lavar_maos");
                    switch (level.getFlag("lavar-maos").getValue()){
                        case 0:
                            level.getFlag("lavar-maos").setValue(1);
                            core.setActionVisible("btn-frequencia_respiratoria", true);
                            core.setActionVisible("btn-medir_pulso", true);
                            core.setActionVisible("btn-medir_temperatura", true);
                            core.setActionVisible("btn-saturacao_02", true);
                            core.setActionVisible("btn-lavar_maos", false);
                            break;
                        case 2:
                            level.getFlag("lavar-maos").setValue(3);
                            core.setActionVisible("btn-lavar_maos", false);
                            core.setActionVisible("btn-ler_prontuario", true);
                            break;
                    }
                })
                .setVisible(visibility),

            new Action("btn-medir_temperatura", "Ver temperatura")
                .setCssClass("action-medir_temperatura")
                .onClick(function (){
                    console.log("Action: medir_temperatura");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        core.openModalScene("modalTermometro");
                        level.getFlag("termometro").setValue(true);
                        core.setActionVisible("btn-medir_temperatura", false);

                        if(level.getFlag("oximetro").getValue() == true
                            && level.getFlag("medidor-pressao").getValue() == true
                            && level.getFlag("relogio").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            level.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-medir_pulso", "Ver pressão")
                .setCssClass("action-medir_pulso")
                .onClick(function (){
                    console.log("Action: medir_pulso");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        core.openModalScene("modalMedidor_pressao");
                        level.getFlag("medidor-pressao").setValue(true);
                        core.setActionVisible("btn-medir_pulso", false);

                        if(level.getFlag("termometro").getValue() == true
                            && level.getFlag("oximetro").getValue() == true
                            && level.getFlag("relogio").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            level.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-saturacao_02", "Ver saturação de O2")
                .setCssClass("action-medir_saturacao_02")
                .onClick( function (){
                    console.log("Action: medir_saturacao_02");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        level.getFlag("oximetro").setValue(true);
                        core.setActionVisible("btn-saturacao_02", false);

                        if(level.getFlag("termometro").getValue() == true
                            && level.getFlag("medidor-pressao").getValue() == true
                            && level.getFlag("relogio").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            level.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-frequencia_respiratoria", "Ver frequência respiratória")
                .setCssClass("action-medir_freq_respiratoria")
                .onClick( function (){
                    console.log("Action: medir_freq_respiratoria");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        level.getFlag("relogio").setValue(true);
                        core.setActionVisible("btn-frequencia_respiratoria", false);

                        if(level.getFlag("termometro").getValue() == true
                            && level.getFlag("medidor-pressao").getValue() == true
                            && level.getFlag("oximetro").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            level.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    core.openModalScene("Prontuario");
                })
                .setVisible(visibility)
        ]);

        //endregion
    //endregion

        //region Posto de Enfermagem
        var posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .setLoadFunction(function (){
                core.setInteractiveObjectVisible("io-abrir_gaveta", true);
            })
            .setUnloadFunction(function() {
                core.closeCommandBar();
            });


        posto_de_enfermagem.registerInteractiveObjects([
            new InteractiveObject("io-abrir_gaveta","Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("Gaveta");
                    core.openCommandBar();

                    core.setActionVisible("btn-fechar_gaveta", true);

                    if (level.getFlag("termometro").getValue() != true)
                        core.setInteractiveObjectVisible("io-termometro", true);
                    if (level.getFlag("medidor-pressao").getValue() != true)
                        core.setInteractiveObjectVisible("io-medidor_pressao", true);
                    if (level.getFlag("oximetro").getValue() != true)
                        core.setInteractiveObjectVisible("io-oximetro", true);
                    if(level.getFlag("relogio").getValue() != true)
                        core.setInteractiveObjectVisible("io-relogio", true);

                })
                .setVisible(visibility)

        ]);

        posto_de_enfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    core.changeScene(1);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Fim do Level
        var fim_tutorial = lib.scenes.finalDeFase.getClone()
            .setLoadFunction(function (){
                core.setActionVisible("btn-proxima_fase", true);
            });

        fim_tutorial.registerActions([
            new Action("btn-proxima_fase", "Ir a recepção")
                .setCssClass("action-ir_recepcao")
                .onClick( function (){
                    console.log("Proxima fase" + core);
                    core.changeLevelTo(1);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //endregion

        //region Modal Scenes

        //region Gaveta
        var gaveta = new Scene("Gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                    if(level.getFlag("termometro").getValue() == true &&
                        level.getFlag("oximetro").getValue() == true &&
                        level.getFlag("medidor-pressao").getValue() == true){
                            console.log("Btn ir corredor");
                            core.setActionVisible("btn-ir_corredor", true);
                            core.openCommandBar();
                    }
                })
                .setVisible(visibility)
        ]);

        gaveta.registerInteractiveObjects([
            new InteractiveObject("io-termometro", "Termômetro")
                .setCssClass("intObj-thermometer")
                .onClick(function () {
                    console.log("Action: pegar_termometro");
                    core.setInteractiveObjectVisible("io-termometro", false);
                    level.getFlag("termometro").setValue(true);
                })
                .setVisible(visibility),

            new InteractiveObject("io-medidor_pressao", "Medidor de pressão")
                .setCssClass("intObj-bloodPressureMonitor")
                .onClick(function () {
                    console.log("O medidor de pressão foi ativado");
                    core.setInteractiveObjectVisible("io-medidor_pressao", false);
                    level.getFlag("medidor-pressao").setValue(true);
                })
                .setVisible(visibility),

            new InteractiveObject("io-oximetro", "Oxímetro")
                .setCssClass("intObj-oximeter")
                .onClick(function () {
                    console.log("Action: pegar_oximetro");
                    core.setInteractiveObjectVisible("io-oximetro", false);
                    level.getFlag("oximetro").setValue(true);
                })
                .setVisible(visibility),

            new InteractiveObject("io-relogio", "Relógio")
                .setCssClass("intObj-watch")
                .onClick(function () {
                    console.log("Action: pegar_relogio");
                    core.setInteractiveObjectVisible("io-relogio", false);
                    level.getFlag("relogio").setValue(true);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Prontuario
        var prontuario = new Scene("Prontuario", "modalScene-prontuario_joao");

        prontuario.registerActions([
            new Action("btn-anotar_prontuario", "Anotar prontuário")
                .setCssClass("action-anotar_prontuario")
                .onClick(function (){
                    console.log("Action: anotar prontuario");
                    core.closeModalScene("Prontuario");
                    core.changeScene(5);
                })
        ]);
        //endregion

        //region Pulseira
        var pulseira = new Scene("pulseira", "pulseira")
            .setCssClass("modalScene-pulseira");


        pulseira.registerInteractiveObjects([
            new InteractiveObject("io-confirmar_pulseira", "Confirmar pulseira")
                .setCssClass("intObj-braceletConfirmation")
                .onClick(function () {
                    console.log("Ação: Confirmar pulseira");
                    core.setInteractiveObjectVisible("io-pulseira_confirmada", true);
                    core.setInteractiveObjectVisible("io-confirmar_pulseira", false);
                    level.getFlag("pulseira").setValue(true);
                    core.setActionVisible("btn-largar_pulseira", true);
                })
                .setVisible(visibility),

            new InteractiveObject("io-pulseira_confirmada", "Pulseira confirmada")
                .setCssClass("intObj-braceletConfirmed")
                .onClick(function () {})
                .setVisible(visibility)
        ]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Largar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function (){
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    if(level.getFlag("visita-leito").getValue() == 0)
                        core.setActionVisible("btn-ir_sala_leitos", true);
                    // o correto era dar um disable aqui no pulseira paciente
                    //core.setInteractiveObjectVisible("io-pulseira_paciente", false);
                })
                .setVisible(visibility)
        ]);


        var termometro = new Scene("modalTermometro", "modalTermometro")
            .setCssClass("modalScene-termometro")
            .setTemplate("<span class='temp_termometro'>37.5º</span>");

        termometro.registerActions([
            new Action("btn-largar_termometro", "Largar termômetro")
                .setCssClass("action-largar_termometro")
                .onClick(function() {
                    core.closeModalScene("modalTermometro");
                })
                .setVisible(true)
        ])

        var medidor_pressao = new Scene("modalMedidor_pressao", "modalMedidor_pressao")
            .setCssClass("modalScene-medidor_pressao")
            .setTemplate("<span class='pressao'>160x100 mmHg</span>");

        medidor_pressao.registerActions([
            new Action("btn-largar_medidor_pressao", "Largar medidor de pressão")
                .setCssClass("action-largar_medidor_pressao")
                .onClick(function() {
                    core.closeModalScene("modalMedidor_pressao");
                })
                .setVisible(true)
        ])

        //endregion

        //endregion

        //region Level

        //region Register Scenes
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);
        level.registerScene(fim_tutorial);

        //endregion

        //region Register Modal Scenes
        level.registerModalScene(pulseira);
        level.registerModalScene(prontuario);
        level.registerModalScene(gaveta);
        level.registerModalScene(termometro);
        level.registerModalScene(medidor_pressao);
        //endregion

        //region Flags
        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("conversar_mentor", false));
        level.registerFlag(new Flag("passagem_corredor", 0));
        level.registerFlag(new Flag("passagem_sala-de-leitos", 0));
        level.registerFlag(new Flag("visita-leito", 0));
        level.registerFlag(new Flag("pulseira", false));
        level.registerFlag(new Flag("lavar-maos", 0));
        level.registerFlag(new Flag("termometro", false));
        level.registerFlag(new Flag("medidor-pressao", false));
        level.registerFlag(new Flag("oximetro", false));
        level.registerFlag(new Flag("relogio", false));
        //endregion

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 0);

        console.groupEnd();
    });