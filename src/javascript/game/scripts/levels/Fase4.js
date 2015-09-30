/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase4;
        // var Scores = require("Scores_data").fase4;
        //endregion

        var level = new Level("Level Fase4");
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
                core.closeDialog();
                core.changeScene(1);
                console.log("Ir para o corredor");
            }
            else {
                if (level.getFlag("conversar_recepcionista").getValue() == true) {
                    core.closeDialog();
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
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista_unknow)
                .setText("")
                .registerOption(Dialogs.recepcao[0], function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.openDialog(1);
                }),

            // Dialog 2
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[1])
                .registerOption("", function(){
                    console.log("Encerrar o diálogo");
                    core.closeDialog(1);
                    level.getFlag("folheto_dos_nove_certos").setValue(true);
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
                .setVisibility(visibility),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisibility(visibility)
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
            .onLoad( function () {
                switch (level.getFlag("passagem_corredor").getValue()){
                    case 0: // first time at 'corredor'
                        core.setInteractiveObjectVisible("io-ir_sala_leitos", false);
                        break;
                    case 1: // second time at 'corredor'

                        break;
                    case 2:

                        break;
                }
                console.log("Load scene: " + corredor.getName());
            })

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

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.changeScene(4);
        }

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrSalaLeitos)
                .setVisibility(visibility),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick(corredorIrPostoEnfermagem)
                .setVisibility(visibility),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog(0);
                })
                .setVisibility(visibility)
        ]);
        //endregion

        //region Register Scenes

        level.registerScene(recepcao);
        level.registerScene(corredor);
        // level.registerScene(sala_de_leitos);
        // level.registerScene(leito);
        // level.registerScene(farmacia);
        // level.registerScene(posto_de_enfermagem);

        // endregion

        //region Register Modal Scenes

        // level.registerModalScene(pulseira);
        // level.registerModalScene(prontuario);
        // level.registerModalScene(freqRespiratoria);
        // level.registerModalScene(gaveta);
        // level.registerModalScene(termometro);
        // level.registerModalScene(medidor_pressao);
        // level.registerModalScene(oximetro);

        //endregion

        //region Flags
        level.registerFlag(new Flag("conversar_recepcionista", false));
        level.registerFlag(new Flag("folheto_dos_nove_certos", false));
        level.registerFlag(new Flag("passagem_corredor", 0));
        // level.registerFlag(new Flag("passagem_sala-de-leitos", 0));
        // level.registerFlag(new Flag("visita-leito", 0));
        // level.registerFlag(new Flag("pulseira", false));
        // level.registerFlag(new Flag("lavar-maos", 0));
        // level.registerFlag(new Flag("lavar-maosDepois", false));
        // level.registerFlag(new Flag("termometro", false));
        // level.registerFlag(new Flag("medidor-pressao", false));
        // level.registerFlag(new Flag("oximetro", false));
        // level.registerFlag(new Flag("relogio", false));

        // level.registerFlag(new Flag("mediuTemperatura", false));
        // level.registerFlag(new Flag("mediuPressao", false));
        // level.registerFlag(new Flag("mediuFreqRespiratoria", false));
        // level.registerFlag(new Flag("mediuBatimentosESaturacao", false));
        //endregion

        level.setInitialScene(0);

        game.registerLevel(level, 4);

        console.groupEnd();

    });