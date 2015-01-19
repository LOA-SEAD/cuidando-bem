/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib) {

        //region Imports
        var Dialogs = require("Dialogs").tutorial;
        //endregion

        var level = new Level("Level Tutorial");
        console.groupCollapsed(level.getName());

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = true;
        if (flags_on)
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

        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setCssClass("scene-lobby")
            .setLoadFunction(function () {
                core.openDialog(0);
            })
            .setUnloadFunction(function () {
                core.closeDialog(0);
                core.closeDialog(1);
            });

        recepcao.registerDialogs([
            new Dialog("recepcionista", "char-recepcionista")
                .setText(Dialogs.recepcionista[0])
                .registerOption(Dialogs.recepcionista[1], function () {
                    level.getFlag("conversar_recepcionista").setValue(true);
                    console.log("Selecionado 1a opção diálogo: " + level.getFlag("conversar_recepcionista").getValue());
                    core.closeDialog(0);
                    core.openDialog(1);
                }),

            new Dialog("recepcionista", "char-recepcionista")
                .setText(Dialogs.recepcionista[2])
                .registerOption(Dialogs.recepcionista[3], function () {
                    console.log("Encerrar o diálogo");
                    core.closeDialog(1);
                    core.setActionVisible("btn-ir_corredor", true);
                    core.setActionVisible("btn-conversar_recepcionista", true);
                    core.setInteractiveObjectVisible("io-conversar_recepcionista", true);
                    core.setInteractiveObjectVisible("io-corredor_esquerda", true);
                    core.setInteractiveObjectVisible("io-corredor_direita", true);
                })
        ]);

        recepcao.registerActions([
            new Action("btn-ir_corredor","Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .setFunction(recepcaoIrCorredor)
                .setVisible(visibility),

            new Action("btn-conversar_recepcionista","Conversar com a recepcionista")
                .setCssClass("action-abrir_dialogo")
                .setFunction(conversarRecepcionista)
                .setVisible(visibility)
        ]);

        recepcao.registerInteractiveObjects([
            new InteractiveObject("io-conversar_recepcionista","Conversar com a recepcionista")
                .setCssClass("intObj-falar_com_recepcionista")
                .setFunction(conversarRecepcionista)
                .setVisible(visibility),


            new InteractiveObject("io-corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-ir_corredor_esq")
                .setFunction(recepcaoIrCorredor)
                .setVisible(visibility),


            new InteractiveObject("io-corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-ir_corredor_dir")
                .setFunction(recepcaoIrCorredor)
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

        var corredor = new Scene("corredor", "scene-corredor")
            .setCssClass("scene-corredor")
            .setLoadFunction( function () {
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0: // first time at 'corredor'
                        core.setInteractiveObjectVisible("io-conversar_mentor", true);
                        core.openDialog(0);
                        break;
                    case 1: // second time at 'corredor'
                        core.setActionVisible("btn-ir_posto_enfermagem", true);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", true);
                        core.setActionVisible("btn-ir_sala_leitos", false);
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", false);
                        core.setActionVisible("btn-conversar_mentor", false);
                        core.setInteractiveObjectVisible("io-conversar_mentor", false);
                        break;
                    case 2:
                        core.setActionVisible("btn-ir_posto_enfermagem", false);
                        core.setInteractiveObjectVisible("io-ir_posto_enfermagem", false);
                        core.setActionVisible("btn-ir_sala_leitos", true);
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
            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor[0])
                .registerOption(Dialogs.corredor[1], function () {
                    level.getFlag("conversar_mentor").setValue(true);
                    core.closeDialog(0);
                    core.openDialog(1);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor[2])
                .registerOption(Dialogs.corredor[3],function () {
                    core.closeDialog(1);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                    core.setActionVisible("btn-conversar_mentor", true);
                    core.setInteractiveObjectVisible("io-ir_sala_leitos", true);
                })
        ]);



        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.changeScene(4);
        }

        corredor.registerActions([
            new Action("btn-conversar_mentor","Conversar com Mentor")
                .setCssClass("action-abrir_dialogo")
                .setFunction(function (){
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog(0);
                })
                .setVisible(visibility),


            new Action("btn-ir_sala_leitos","Ir para a sala de leitos masculino")
                .setCssClass("action-ir_sala_de_leitos")
                .setFunction(corredorIrSalaLeitos)
                .setVisible(visibility),


            new Action("btn-ir_posto_enfermagem","Ir para o posto de enfermagem")
                .setCssClass("action-ir_posto_de_enfermagem")
                .setFunction(corredorIrPostoEnfermagem)
                .setVisible(visibility)
        ]);

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de leitos masculino")
                .setCssClass("intObj-ir_sala_de_leitos")
                .setFunction(corredorIrSalaLeitos)
                .setVisible(visibility),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o posto de enfermagem")
                .setCssClass("intObj-ir_posto_de_enfermagem")
                .setFunction(corredorIrPostoEnfermagem)
                .setVisible(visibility),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-conversar-mentor")
                .setFunction(function (){
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog(0);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Sala de Leitos
        var sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-sala_de_leitos")
            .setLoadFunction(function (){
                switch (level.getFlag("passagem_sala-de-leitos").getValue()){
                    case 0:
                        core.setActionVisible("btn-ir_leito", true);
                        core.setActionVisible("btn-ir_corredor", false);
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_leito", false);
                        core.setActionVisible("btn-ir_corredor", true);
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

        sala_de_leitos.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .setFunction(function (){
                    core.changeScene(1);
                })
                .setVisible(visibility),

            new Action("btn-ir_leito", "Ir ao leito")
                .setCssClass("action-leito-char-01")
                .setFunction( function (){
                    core.changeScene(3);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Fim do Level
        var fim_tutorial = new Scene("Fim da fase", "scene-fim-level")
            .setCssClass("scene-fim-level")
            .setLoadFunction(function (){
                core.setActionVisible("btn-proxima_fase", true);
            });

        fim_tutorial.registerActions([
            new Action("btn-proxima_fase", "Ir a recepção")
                .setCssClass("action-ir_recepcao")
                .setFunction( function (){
                    console.log("Proxima fase" + core);
                    core.changeLevelTo(1);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Posto de Enfermagem
        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem")
            .setCssClass("scene-posto_de_enfermagem")
            .setLoadFunction(function (){
                core.setActionVisible("btn-abrir_gaveta", true);
            });

        posto_de_enfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .setFunction(function (){
                    console.log("Action: ir_corredor");
                    core.changeScene(1);
                })
                .setVisible(visibility),

            new Action("btn-abrir_gaveta", "Abrir gaveta")
                .setCssClass("action-abrir_gaveta")
                .setFunction( function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("Gaveta");

                    core.setActionVisible("btn-fechar_gaveta", true);
                    if(core.getFlag("termometro").getValue() != true)
                        core.setActionVisible("btn-termometro", true);
                    if(core.getFlag("medidor-pressao").getValue() != true)
                        core.setActionVisible("btn-medidor_pressao", true);
                    if(core.getFlag("oximetro").getValue() != true)
                        core.setActionVisible("btn-oximetro", true);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Leito
        var leito = new Scene("leito", "scene-leito-char-01")
            .setCssClass("scene-leito-char-01")
            .setLoadFunction(function () {
                console.log("Leito: Onload");
                switch (level.getFlag("visita-leito").getValue()){
                    case 0:
                        core.openDialog(0);
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_sala_leitos", false);
                        core.openDialog(4);
                        core.getFlag("termometro").setValue(false);
                        core.getFlag("medidor-pressao").setValue(false);
                        core.getFlag("oximetro").setValue(false);
                        break;
                }
            })
            .setUnloadFunction(function (){
                console.log("Leito: OnUnload");
                level.getFlag("visita-leito").setValue(1);
            });

        leito.registerDialogs([
            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.leito.conversa1[0])
                .registerOption(Dialogs.leito.conversa1[1], function () {
                    core.closeDialog(0);
                    core.openDialog(1);
                }),

            new Dialog("paciente", "char-paciente-01")
                .setText(Dialogs.leito.conversa1[2])
                .registerOption(Dialogs.leito.conversa1[3], function () {
                    core.closeDialog(1);
                    core.openDialog(2);
                }),

            new Dialog("paciente", "char-paciente-01")
                .setText(Dialogs.leito.conversa1[4])
                .registerOption(Dialogs.leito.conversa1[5], function () {
                    core.closeDialog(2);
                    core.openDialog(3);
                }),


            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.leito.conversa1[6])
                .registerOption(Dialogs.leito.conversa1[7], function () {
                    core.closeDialog(3);
                    core.setActionVisible("btn-pulseira_paciente", true);
                }),

            new Dialog("jogador", "char-jogador")
                .setText("")
                .registerOption(Dialogs.leito.conversa2[0], function () {
                    core.closeDialog(4);
                    core.openDialog(5);
                }),

            new Dialog("paciente", "char-paciente-01")
                .setText(Dialogs.leito.conversa2[1])
                .registerOption(Dialogs.leito.conversa2[2], function () {
                    core.closeDialog(5);
                    core.openDialog(6);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.leito.conversa2[3])
                .registerOption(Dialogs.leito.conversa2[4], function () {
                    core.closeDialog(6);
                    core.setActionVisible("btn-lavar_maos", true);
                })
        ]);

        leito.registerActions([
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .setFunction(function (){
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene(2);
                })
                .setVisible(visibility),

            new Action("btn-pulseira_paciente", "Checar pulseira paciente")
                .setCssClass("action-pulseira_paciente")
                .setFunction(function (){
                    console.log("Action: pulseira_paciente");
                    core.openModalScene("Pulseira");
                    core.setActionVisible("btn-confirmar_pulseira", true);
                    core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
                })
                .setVisible(visibility),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .setFunction(function (){
                    console.log("Action: lavar_maos");
                    switch (level.getFlag("lavar-maos").getValue()){
                        case 0:
                            level.getFlag("lavar-maos").setValue(1);
                            core.setActionVisible("btn-frequencia_respiratoria", true);
                            core.setActionVisible("btn-medir_pulso", true);
                            core.setActionVisible("btn-medir_temperatura", true);
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

            new Action("btn-medir_temperatura", "Medir temperatura")
                .setCssClass("action-medir_temperatura")
                .setFunction(function (){
                    console.log("Action: medir_temperatura");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        level.getFlag("termometro").setValue(true);
                        core.setActionVisible("btn-medir_temperatura", false);

                        if(level.getFlag("oximetro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            core.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-medir_pulso", "Medir pulso")
                .setCssClass("action-medir_pulso")
                .setFunction(function (){
                    console.log("Action: medir_pulso");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        level.getFlag("medidor-pressao").setValue(true);
                        core.setActionVisible("btn-medir_pulso", false);

                        if(level.getFlag("termometro").getValue() == true && level.getFlag("oximetro").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            core.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),


            new Action("btn-frequencia_respiratoria", "Medir frequência respiratória")
                .setCssClass("action-medir_freq_respiratoria")
                .setFunction( function (){
                    console.log("Action: medir_freq_respiratoria");
                    if(level.getFlag("lavar-maos").getValue() >= 1){

                        level.getFlag("oximetro").setValue(true);
                        core.setActionVisible("btn-frequencia_respiratoria", false);

                        if(level.getFlag("termometro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                        {
                            core.setActionVisible("btn-lavar_maos", true);
                            core.getFlag("lavar-maos").setValue(2);
                        }
                    }
                })
                .setVisible(visibility),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .setFunction(function (){
                    console.log("Action: ler prontuario");
                    core.openModalScene("Prontuario");
                })
                .setVisible(visibility)
        ]);
        //endregion
        //endregion

        //region Modal Scenes

        //region Gaveta
        var gaveta = new Scene("Gaveta", "modalScene-gaveta");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .setFunction( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                    if(level.getFlag("termometro").getValue() == true &&
                        level.getFlag("oximetro").getValue() == true &&
                        level.getFlag("medidor-pressao").getValue() == true)
                        core.setActionVisible("btn-ir_corredor", true);
                })
                .setVisible(visibility),


            new Action("btn-termometro", "Pegar termômetro")
                .setCssClass("action-pegar_termometro")
                .setFunction(function () {
                    console.log("Action: pegar_termometro");
                    core.setInteractiveObjectVisible("io-termometro", false);
                    core.setActionVisible("btn-termometro", false);
                    core.getFlag("termometro").setValue(true);
                })
                .setVisible(visibility),


            new Action("btn-medidor_pressao", "Pegar medidor pressão")
                .setCssClass("action-pegar_medidor_pressao")
                .setFunction(function () {
                    console.log("O medidor de pressão foi ativado");
                    core.setInteractiveObjectVisible("io-medidor_pressao", false);
                    core.setActionVisible("btn-medidor_pressao", false);
                    core.getFlag("medidor-pressao").setValue(true);
                })
                .setVisible(visibility),


            new Action("btn-oximetro", "Pegar oxímetro")
                .setCssClass("action-pegar_oximetro")
                .setFunction(function () {
                    console.log("Action: pegar_oximetro");
                    core.setInteractiveObjectVisible("io-oximetro", false);
                    core.setActionVisible("btn-oximetro", false);
                    core.getFlag("oximetro").setValue(true);
                })
                .setVisible(visibility)
        ]);

        gaveta.registerInteractiveObjects([
            new InteractiveObject("io-termometro", "Termômetro")
                .setCssClass("intObj-termometro")
                .setFunction(function () {
                    console.log("Action: pegar_termometro");
                    core.setInteractiveObjectVisible("io-termometro", false);
                    core.setActionVisible("btn-termometro", false);
                    core.getFlag("termometro").setValue(true);
                }),

            new InteractiveObject("io-medidor_pressao", "Medidor de pressão")
                .setCssClass("intObj-medidor_pressao")
                .setFunction(function () {
                    console.log("O medidor de pressão foi ativado");
                    core.setInteractiveObjectVisible("io-medidor_pressao", false);
                    core.setActionVisible("btn-medidor_pressao", false);
                    core.getFlag("medidor-pressao").setValue(true);
                }),

            new InteractiveObject("io-oximetro", "Oxímetro")
                .setCssClass("intObj-oximetro")
                .setFunction(function () {
                    console.log("Action: pegar_oximetro");
                    core.setInteractiveObjectVisible("io-oximetro", false);
                    core.setActionVisible("btn-oximetro", false);
                    core.getFlag("oximetro").setValue(true);
                })
        ]);
        //endregion

        //region Prontuario
        var prontuario = new Scene("Prontuario", "modalScene-prontuario_joao");

        prontuario.registerActions([
            new Action("btn-anotar_prontuario", "Anotar prontuário")
                .setCssClass("action-anotar_prontuario")
                .setFunction(function (){
                    console.log("Action: anotar prontuario");
                    core.closeModalScene("Prontuario");
                    core.changeScene(5);
                })
        ]);
        //endregion

        //region Pulseira
        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Largar pulseira")
                .setCssClass("action-pulseira_paciente")
                .setFunction(function (){
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    core.setActionVisible("btn-ir_sala_leitos", true);
                    core.setActionVisible("btn-pulseira_paciente", false);
                })
                .setVisible(visibility),

            new Action("btn-confirmar_pulseira", "Confirmar pulseira")
                .setCssClass("action-confirmar_pulseira")
                .setFunction(function (){
                    console.log("Ação: Confirmar pulseira");
                    core.setActionVisible("btn-confirmar_pulseira", false);
                    core.setInteractiveObjectVisible("io-confirmar_pulseira", false);
                    core.setActionVisible("btn-largar_pulseira", true);
                })
                .setVisible(visibility)
        ]);

        pulseira.registerInteractiveObjects([
            new Action("io-confirmar_pulseira", "Confirmar pulseira")
                .setCssClass("intObj-confirmar_pulseira")
                .setFunction(function (){
                    console.log("Ação: Confirmar pulseira");
                    core.setActionVisible("btn-confirmar_pulseira", false);
                    core.setInteractiveObjectVisible("io-confirmar_pulseira", false);
                    core.setActionVisible("btn-largar_pulseira", true);
                })
                .setVisible(visibility)
        ]);
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
        //endregion

        //region Flags
        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("conversar_mentor", false));
        level.registerFlag(new Flag("passagem_corredor", 0));
        level.registerFlag(new Flag("passagem_sala-de-leitos", 0));
        level.registerFlag(new Flag("visita-leito", 0));
        level.registerFlag(new Flag("lavar-maos", 0));
        level.registerFlag(new Flag("termometro", false));
        level.registerFlag(new Flag("medidor-pressao", false));
        level.registerFlag(new Flag("oximetro", false));
        //endregion

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 0);

        console.groupEnd();
    });