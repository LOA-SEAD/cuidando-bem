/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores) {

        //region Imports
        var Dialogs = require("Dialogs_data").fase1;
        // var Scores = require("Scores_data").tutorial;
        //endregion

        var level = new Level("Level Fase1");
        console.groupCollapsed(level.getName());

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = false;
        if (!flags_on)
            visibility = true;


        //Scenes

        var
        recepcao,
        corredor,
        alaMasculina,
        sala_de_leitos,
        leito,
        posto_de_enfermagem;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( !flags_on || level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
                core.closeDialog();
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
                .setText(Dialogs.recepcionista[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.recepcionista[1])
                .registerOption("", function(){
                    core.closeDialog();
                }),
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

        //Corredor
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if(level.getFlag("conversar_mentor") == false){
                    core.openDialog(0);
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[0])
                .registerOption("", function(){
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(1);
                }),

            new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor.fala1[1])
                .registerOption("", function(){
                    core.closeDialog();
                })
        ]);

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            core.changeScene(4);
        }

        function corredorIrSalaLeitos() {
            if (!flags_on || level.getFlag("conversar_mentor").getValue() == true) {
                core.changeScene(2);
                console.log("Action: corredorIrSalaLeitos");
            } else {
                console.log("Necessita ação: falar com mentor");
            }
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

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    console.log("Abrir diálogo com o mentor");
                    core.openDialog(0);
                })
                .setVisibility(true)
        ]);

        //Sala de leitos
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Entrando na sala de leitos");
                core.openCommandBar();
            })
            .onUnload( function (){
                console.log("Saindo da sala de leitos");
                core.closeCommandBar();
            });

        sala_de_leitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-fase1")
                .onClick(function (){
                    core.changeScene(3);
                })
                .setVisibility(true),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    core.changeScene(1);
                })
                .setVisibility(true)
        ]);

        sala_de_leitos.registerActions([
            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: lavar_maos");
                    level.getFlag("lavar_maos").setValue(true);

                })
                .setVisibility(true),
        ]);

        leito = lib.scenes.leitos.char2.getClone()
            .onLoad(function () {
                console.log("Leito: Onload");
                // core.setInteractiveObjectVisible("io-pulseira_paciente", true);

                // //force case 1
                // //level.getFlag("visita-leito").setValue(1);
                // // delete here

                // switch (level.getFlag("visita-leito").getValue()){
                //     case 0:
                //         core.openDialog(0);
                //         break;
                //     case 1:
                //         core.setActionVisible("btn-ir_sala_leitos", false);
                //         core.openDialog(11);
                //         level.getFlag("termometro").setValue(false);
                //         level.getFlag("medidor-pressao").setValue(false);
                //         level.getFlag("oximetro").setValue(false);
                //         level.getFlag("relogio").setValue(false);
                //         break;
                // }
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");

                // level.getFlag("visita-leito").setValue(1);
                // core.closeCommandBar();
            });

        posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                core.setInteractiveObjectVisible("io-abrir_gaveta", true);
            })
            .onUnload(function() {
                core.closeCommandBar();
            });





        //ModalScenes

        //Register in level
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);

        //level init script
        level.setSetupScript(function(){

            Pulseira.setNameRegExp(/João Manoel Ribeiro/);
            Pulseira.setLeitoRegExp(/0*2/);
            Pulseira.setDataRegExp(/07\/06\/1956/);

            Prontuario.setNome("João Manoel Ribeiro");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("07/06/1956");
            Prontuario.setIdade("58 anos");
            Prontuario.setProfissao("Comerciante");
            Prontuario.setPai("Joaquim Casagrande");
            Prontuario.setMae("Lúcia Moraes Casagrande");

            Prontuario.setAlergiaMedicamentosa(true, "Dipirona");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("13/05/2015");
            Prontuario.setLeito("02 - Leito Masculino");
            Prontuario.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)");
            Prontuario.setHipotese("Crise hipertensiva");
            Prontuario.setObservacoes("");

            Prontuario.setPeso("87");
            Prontuario.setAltura("1,62");
            Prontuario.setCircunferenciaAbdominal("115");

            Prontuario.setPrescMedicaRowData(0, "15/03", "Captopril", "Oral", "comp 75 mg", "2x dia", "");
            Prontuario.setPrescMedicaRowData(1, "15/03", "Ácido acetilsalicílico (AAS)", "Oral", "comp 100 mg", "1x dia", "");

            Prontuario.setSsvvRowData(0, '15/03', '', '', '', '', '', false);
            //Disable 2 row
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
        });

        //Flags

        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("conversar_paciente"), false);
        level.registerFlag(new Flag("lavar_maos"), false);


        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 1);

        console.groupEnd();


    }
);