/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core', 'Commons'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, Commons) {

        var Dialogs = require('Dialogs').fase1;
        var Alerts = require('Dialogs').alertas;

        var level = new Level("Level 1");
        console.groupCollapsed(level.getName());

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = false;

        level.registerFlag(new Flag("mentor_dialogo", true));
        level.registerFlag(new Flag("buscar_coxim", false));

        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setLoadFunction(function (){
                if(flags_on){
                    core.openDialog(0);
                }
                else{
                    core.setActionVisible("btn-ir_corredor", true);
                    core.setActionVisible("btn-conversar_recepcionista", true);
                }
            })
            .setUnloadFunction(core.closeDialog());

        var corredor = new Scene("corredor", "scene-corredor")
            .setLoadFunction(function(){
                if(flags_on == true){
                    // primeira vez no corredor - ainda nao falou com o paciente
                    if(level.getFlag("examinou_paciente").getValue() == false
                        && level.getFlag("mentor_dialogo").getValue() == true) {
                        console.log("Fala mentor");
                        level.getFlag("mentor_dialogo").setValue(false);
                        core.openDialog(0);
                    }
                    // ja examinou o paciente
                    else if(level.getFlag("mentor_dialogo").getValue() == true
                        && level.getFlag("examinou_paciente").getValue() == true){
                        console.log("Segunda fala do mentor");
                        level.getFlag("mentor_dialogo").setValue(false);
                        corredorActions(false);
                        corredorDialogos(false);
                        core.openDialog(1);
                    }
                    else if(level.getFlag("buscar_coxim").getValue() == true){
                        console.log("Mentor: Ação incorreta");
                        core.openDialog(5);
                    }
                    else if(level.getFlag("pegou_coxim").getValue() == true){
                        corredorDialogos(false);
                    }
                }
                else{
                    core.setActionVisible("btn-falar_mentor_01", true);
                    core.setActionVisible("btn-falar_mentor_02", true);
                    core.setActionVisible("btn-ir_ala_masculina", true);
                    core.setActionVisible("btn-ir_posto_enfermagem", true);
                }
            })
            .setUnloadFunction(function(){core.closeDialog()});

        var ala_masculina = new Scene("ala_masculina", "scene-ala_masculina")
            .setLoadFunction(function (){
                if(flags_on == true){
                    if(level.getFlag("posicionou_coxim").getValue() == false){
                        ala_masculinaAction(true);
                    }
                    else{
                        ala_masculinaAction(false);
                        level.getFlag("lavar_maos").setValue(false);
                        core.changeSceneCssClassTo("scene-ala_masculina-coxim");
                        core.setActionVisible("btn-lavar_maos", true);
                        core.setActionVisible("btn-ler_prontuario", true);
                    }
                }
                else{
                    core.setActionVisible("btn-ir_corredor", true);
                    core.setActionVisible("btn-ir_leito", true);
                    core.setActionVisible("btn-lavar_maos", true);
                }
            });

        var leito = new Scene("leito", "scene-leito-char-02", leitoOnLoad, leitoOnUnload)
            .setLoadFunction(function (){
                if(flags_on == true){
                    if(level.getFlag("conversar_paciente").getValue() == true){
                        level.getFlag("conversar_paciente").setValue(false);
                        core.openDialog(0);
                    }
                    else{
                        if(level.getFlag("pegou_coxim").getValue() == true){
                            leitoFirstActions(false);
                            core.setActionVisible("btn-mudar_posicao_paciente", true);
                        }
                        else{
                            core.setActionVisible("btn-conversar_paciente", true);
                        }
                    }
                }
                else {
                    core.setActionVisible("btn-ir_ala_masculina", true);
                    core.setActionVisible("btn-ver_pulseira", true);
                    core.setActionVisible("btn-conversar_paciente", true);
                }
            });

        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem")
            .setLoadFunction(function (){
                core.setActionVisible("btn-abrir_gaveta", true);
                core.setActionVisible("btn-ir_corredor", true);
            });


        recepcao.registerDialogs([
            new Dialog("recepcionista", "char-recepcionista")
            .setText(Dialogs.recepcionista[0])
            .registerOption(Dialogs.recepcionista[1], function () {
                console.log("Selecionado 1a opção diálogo");
                core.closeDialog(0);
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-conversar_recepcionista", true);
            })
        ]);
        recepcao.registerActions([

            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .setFunction(function(){
                    console.log("Action: recepcao_ir_corredor");
                    core.changeScene(1);
                })
                .setVisible(visibility),

            new Action("btn-conversar_recepcionista", "Conversar com a recepcionista")
                .setCssClass("action-abrir_dialogo")
                .setFunction(function(){
                    console.log("Action: Conversar com a recepcionista");
                    core.openDialog(0);
                })
                .setVisible(visibility)
            ]);

        corredor.registerDialogs([
            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor.fala1[0])
                .registerOption(Dialogs.corredor.fala1[1], function () {
                    core.closeDialog(0);
                    corredorActions(true);
                    core.setActionVisible("btn-falar_mentor_01", true);
                }),


            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor.fala2[0])
                .registerOption(Dialogs.corredor.fala2[1], function () {
                    core.closeDialog(1);
                    core.openDialog(2);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor.fala2[2])
                .registerOption(Dialogs.corredor.fala2[3], function () {
                    core.closeDialog(2);
                    core.setActionVisible("btn-falar_mentor_02", true);
                    level.getFlag("buscar_coxim").setValue(true);
                    corredorActions(true);
                }),

            // alerta do mentor
            new Dialog("mentor", "char-mentor")
                .setText(Alerts.enfermaria_masculina[0])
                .registerOption(Alerts.enfermaria_masculina[1], function () {
                    core.closeDialog(3);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(Alerts.perdido.enfermagem[0])
                .registerOption(Alerts.perdido.enfermagem[1], function () {
                    core.closeDialog(4);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(Alerts.esqueceu[0])
                .registerOption(Alerts.esqueceu[1], function () {
                    core.closeDialog(5);
                })
        ]);

//--------------------------------------------------------------------------------------------------------
        function corredorAlaMasculina() {
            if (flags_on == true) {
                console.log("Action: Ir para a ala masculina");
                if (level.getFlag("buscar_coxim").getValue() == false) {
                    core.changeScene(2);
                }
                else {
                    console.log("Mentor: Ação incorreta");
                    core.openDialog(4);
                }
            }
            else {
                console.log("Action: Ir para a ala masculina");
                core.changeScene(2);
            }
        }

        function corredorIrPostoEnfermagem() {
            console.log("Action: Ir para o posto enfermagem");
            if(flags_on == true){
                if(level.getFlag("examinou_paciente").getValue() == false){
                // Ainda nao pode ir ao posto de enfermagem
                    console.log("Mentor: Ação incorreta");
                    core.openDialog(3);
                }
                else{
                // Ja pode ir ao posto de enfermagem
                    console.log("Mudar cenário: posto de enfermagem");
                    core.changeScene(4);
                }
            }
            else {
                core.changeScene(4);
            }
        }
        function corredorActions(_status){
            console.log("Muda visibilidade de Actions: " + _status);
            core.setActionVisible("btn-ir_ala_masculina", _status);
            core.setActionVisible("btn-ir_posto_enfermagem", _status);
        }
        function corredorDialogos(_status){
            console.log("Muda visibilidade dos Dialogos: " + _status);
            core.setActionVisible("btn-falar_mentor_01", _status);
            core.setActionVisible("btn-falar_mentor_02", _status);
        }
        // Actions
        corredor.registerAction(
            new Action("btn-falar_mentor_01", "Falar com mentor",
                "action-abrir_dialogo", function(){core.openDialog(0);}, visibility));

        corredor.registerAction(
            new Action("btn-falar_mentor_02", "Falar com mentor",
                "action-abrir_dialogo", function(){core.openDialog(1);}, visibility));

        corredor.registerAction(
            new Action("btn-ir_ala_masculina", "Ir para a ala masculina",
                "action-ir_sala_de_leitos", corredorAlaMasculina, visibility));

        corredor.registerAction(
            new Action("btn-ir_posto_enfermagem", "Ir para o posto de enfermagem",
                "action-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        /*
         Ala Masculina
          */
        // Flags
        level.registerFlag(new Flag("lavar_maos", false));
        level.registerFlag(new Flag("examinou_paciente", false));

        // Dialogs
        fala_mentor[2][1] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[1]);
        fala_mentor[2][1].registerOption({
            text: alerta_resposta[1],
            actionFunction: function () {
                core.closeDialog(0);
            }
        });

        fala_mentor[2][2] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[2]);
        fala_mentor[2][2].registerOption({
            text: alerta_resposta[2],
            actionFunction: function () {
                core.closeDialog(1);
            }
        });

        fala_mentor[2][3] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[5]);
        fala_mentor[2][3].registerOption({
            text: alerta_resposta[5],
            actionFunction: function () {
                core.closeDialog(2);
            }
        });

        ala_masculina.registerDialog(fala_mentor[2][1]);
        ala_masculina.registerDialog(fala_mentor[2][2]);
        ala_masculina.registerDialog(fala_mentor[2][3]);

        // Functions
        function ala_masculinaAction(_status){
            core.setActionVisible("btn-ir_corredor", _status);
            core.setActionVisible("btn-ir_leito", _status);
            core.setActionVisible("btn-lavar_maos", _status);
        }

        function alaMasculinaIrCorredor(){
            if(flags_on == true ){
                if(core.getFlag("examinou_paciente").getValue() == true)
                {
                    if(core.getFlag("lavar_maos").getValue() == true){
                        console.log("Ir corredor: depois examinar paciente");
                        core.changeScene(1);
                    }
                    else{
                        console.log("Erro: Lavar mãos necessario");
                        core.openDialog(1);
                    }
                }
                else{
                    console.log("Ir corredor: antes examinar paciente");
                    core.changeScene(1);
                }
            }
            else{
                core.changeScene(1);
            }
        }
        function alaMasculinaIrLeito(){
            console.log("Action: Ala Masculina - Ir Leito");
            if(flags_on == true){
                if(level.getFlag("lavar_maos").getValue() == true){
                    console.log("Troca cena: leito");
                    core.changeScene(3);
                }
                else{
                    console.log("Lavar maos necessario");
                    console.log("Desconta ponto - apenas uma vez");
                    core.openDialog(0);
                }
            }
            else {
                core.changeScene(3);
            }
        }
        function alaMasculinaLavarMaos(){
            console.log("Action: lavar as maos");
            core.getFlag("lavar_maos").setValue(true);
        }
        function alaMasculinaLerProntuario(){
            console.log("Action: ler prontuario");
            if(flags_on){
                if(level.getFlag("lavar_maos").getValue() == true){
                    core.openModalScene("Prontuario");
                }
                else{
                    console.log("Desconta pontos - falta lavar mãos");
                    core.openDialog(2);
                }
            }else{

            }
        }
        function anotarProntuario(){
            console.log("Anotar prontuario");
            // Fim do level
            core.closeModalScene("Prontuario");
            core.changeScene(5);
        }
        // Actions
        ala_masculina.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor", alaMasculinaIrCorredor, visibility));
        ala_masculina.registerAction(
            new Action("btn-ir_leito", "Ir ao leito",
                "action-leito-char-02", alaMasculinaIrLeito, visibility));
        ala_masculina.registerAction(
            new Action("btn-lavar_maos", "Lavar as mãos",
                "action-lavar_maos", alaMasculinaLavarMaos, visibility));
        ala_masculina.registerAction(
            new Action("btn-ler_prontuario", "Ler prontuario",
                "action-ler_prontuario", alaMasculinaLerProntuario, visibility));

        // Modal
        var prontuario = new Scene("Prontuario", "modalScene-prontuario_carlos");

        prontuario.registerAction(
            new Action("btn-anotar_prontuario", "Anotar prontuário",
                "action-anotar_prontuario", anotarProntuario, true)
        );

        level.registerModalScene(prontuario);

        /*
         Leito
          */

        // Flags
        level.registerFlag(new Flag("conversar_paciente", true));
        level.registerFlag(new Flag("confirmar_pulseira", false));
        level.registerFlag(new Flag("paciente_carlos", 0));
        level.registerFlag(new Flag("posicionou_coxim", false));

        // Dialogs
        var fala_paciente = [];

        fala_paciente[0] = new Dialog(
            "Jogador", "char-jogador","");
        fala_paciente[0].registerOption({
            text: Dialogs.enfermaria[0],
            actionFunction: function() {
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_paciente[1] = new Dialog(
            "Paciente Carlos", "char-paciente-02",Dialogs.enfermaria[1]);
        fala_paciente[1].registerOption({
            text: Dialogs.enfermaria[2],
            actionFunction: function() {
                core.closeDialog(1);
                core.openDialog(2);
            }
        });

        fala_paciente[2] = new Dialog(
            "Paciente Carlos", "char-paciente-02",Dialogs.enfermaria[3]);
        fala_paciente[2].registerOption({
            text: Dialogs.enfermaria[4],
            actionFunction: function() {
                core.closeDialog(2);
                core.setActionVisible("btn-ir_ala_masculina", true);
                core.setActionVisible("btn-ver_pulseira", true);
                core.setActionVisible("btn-conversar_paciente", true);
            }
        });

        leito.registerDialogs(fala_paciente);

        // Functions

        function dialogarPaciente(){
            core.openDialog(0);
        }
        function leitoIrAlaMasculina(){
            console.log("Action: action-ir_ala_masculina");
            core.changeScene(2);
        }
        function leitoPulseiraPaciente(){
            console.log("Action: Ver pulsiera");
            core.openModalScene("Pulseira");
            core.setActionVisible("btn-largar_pulseira", true);
            core.setActionVisible("btn-confirmar_pulseira", true);
        }
        function examinarPaciente(){
            console.log("Action: Examinar paciente");
            core.getFlag("examinou_paciente").setValue(true);
            core.getFlag("lavar_maos").setValue(false);
            core.getFlag("mentor_dialogo").setValue(true);
            if(core.getFlag("paciente_carlos").getValue() >= 20)
            {
                console.log("Load Carlos Esme Gouvea");
                core.openModalScene("Carlos Esme Gouvea");
                core.getFlag("paciente_carlos").setValue(0);
            }
            core.getFlag("paciente_carlos").setValue(
                core.getFlag("paciente_carlos").getValue() + 1);
        }
        function leitoFirstActions(_status){
            console.log("Leito visibilidade acoes: " + _status);
            core.setActionVisible("btn-ir_ala_masculina", _status);
            core.setActionVisible("btn-ver_pulseira", _status);
            core.setActionVisible("btn-conversar_paciente", _status);
            core.setActionVisible("btn-examinar_paciente", _status);
        }
        function mudarPosicaoPaciente(){
            console.log("Action: mudar posição do paciente");
            core.setActionVisible("btn-mudar_posicao_paciente", false);
            core.changeSceneCssClassTo("scene-leito-char-02-virado");
            core.setActionVisible("btn-posicionar_coxim", true);
        }
        function posicionarCoxim(){
            console.log("Action: posicionar coxim");
            level.getFlag("posicionou_coxim").setValue(true);
            core.changeSceneCssClassTo("scene-leito-char-02-coxim");
            core.setActionVisible("btn-posicionar_coxim", false);
            core.setActionVisible("btn-ir_ala_masculina", true);
        }

        // Actions
        leito.registerAction(
            new Action("btn-ir_ala_masculina", "Ir para ala masculina",
                "action-ir_sala_de_leitos", leitoIrAlaMasculina, visibility));

        leito.registerAction(
            new Action("btn-ver_pulseira", "Ver pulseira",
                "action-pulseira_paciente", leitoPulseiraPaciente, visibility));

        leito.registerAction(new Action("btn-conversar_paciente", "Conversar paciente",
            "action-abrir_dialogo", dialogarPaciente, visibility));

        leito.registerAction(new Action("btn-examinar_paciente", "Examinar paciente",
            "action-examinar_paciente", examinarPaciente, visibility));

        leito.registerAction(new Action("btn-mudar_posicao_paciente", "Mudar posição do paciente",
            "action-mudar_posicao_paciente", mudarPosicaoPaciente, visibility));

        leito.registerAction(new Action("btn-posicionar_coxim", "Posicionar coxim e o travesseiro",
            "action-posicionar_coxim", posicionarCoxim, visibility));

        // Modal Scene
        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        var carlos_esme_gouvea = new Scene("Carlos Esme Gouvea", "modalScene-carlos_esme_gouvea");
        carlos_esme_gouvea.registerAction(
            new Action("btn-fechar_carlos", "Fechar Carlos",
                "action-fechar_modal", function() {core.closeModalScene("Carlos Esme Gouvea");}, true)
        );
        level.registerModalScene(carlos_esme_gouvea);

        function leitoLargarPulseira(){
            console.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");
            if(level.getFlag("confirmar_pulseira").getValue() == true){
                core.setActionVisible("btn-examinar_paciente", true);
            }
        }

        function leitoConfirmarPulseira(){
            console.log("Ação: Confirmar pulseira");
            level.getFlag("confirmar_pulseira").setValue(true);
        }
        pulseira.registerAction(
            new Action("btn-largar_pulseira", "Largar pulseira",
                "action-pulseira_paciente", leitoLargarPulseira, visibility));

        pulseira.registerAction(
            new Action("btn-confirmar_pulseira", "Confirmar pulseira",
                "action-confirmar_pulseira", leitoConfirmarPulseira, visibility));

        level.registerModalScene(pulseira);

        /*
         Posto de Enfermagem
         */
        // Flags
        level.registerFlag(new Flag("pegou_coxim", false));
        // Dialogs

        // Functions

        function postoEnfermagemIrCorredor(){
            console.log("Action: ir_corredor");
            core.changeScene(1);
        }

        function postoEnfermagemAbrirGaveta() {
            console.log("Action: abrir_gaveta");
            core.openModalScene("Gaveta");
            gavetaActions(true);

        }
        function postoEnfermagemFecharGaveta() {
            console.log("Action: fechar_gaveta");
            core.closeModalScene("Gaveta");
            gavetaActions(false);
        }
        function postoEnfermagemPegarCoxim(){
            console.log("Action: pegar coxim");
            level.getFlag("buscar_coxim").setValue(false);
            level.getFlag("pegou_coxim").setValue(true);
            core.setActionVisible("btn-coxim", false);
            core.setInteractiveObjectVisible("io-coxim", false);
        }
        function gavetaActions(_status){
            if(_status == true) {
                core.setActionVisible("btn-fechar_gaveta", _status);
                if (level.getFlag("pegou_coxim").getValue() == false) {
                    core.setActionVisible("btn-coxim", _status);
                    core.setInteractiveObjectVisible("io-coxim", _status);
                }
                else {
                    core.setActionVisible("btn-coxim", !_status);
                    core.setInteractiveObjectVisible("io-coxim", !_status);
                }
            }
        }
        // Actions
        posto_de_enfermagem.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor",postoEnfermagemIrCorredor, visibility));

        posto_de_enfermagem.registerAction(
            new Action("btn-abrir_gaveta", "Abrir gaveta",
                "action-abrir_gaveta", postoEnfermagemAbrirGaveta, visibility));

        // Modal
        var gaveta = new Scene("Gaveta", "modalScene-gaveta");

        gaveta.registerAction(
            new Action("btn-fechar_gaveta", "Fechar gaveta",
                "action-fechar_gaveta", postoEnfermagemFecharGaveta, visibility));

        gaveta.registerAction(
            new Action("btn-coxim", "Pegar coxim",
                "action-pegar_coxim", postoEnfermagemPegarCoxim, visibility));

        gaveta.registerInteractiveObject(
            new InteractiveObject("io-coxim", "Coxim",
                "intObj-coxim", postoEnfermagemPegarCoxim));

        level.registerModalScene(gaveta);

        /*
         Scene:  Fim do Level
         */
        var fim_alfa = new Scene("Fim da fase", "scene-fim-alfa",
            fimalfaOnLoad, fimalfaOnUnload);
        // Flags

        // Dialogs

        // Functions
        function fimalfaOnLoad(){
            core.setActionVisible("btn-voltar_menu", true);
        }

        function fimalfaOnUnload(){

        }

        function fimalfaMenu(){
            console.log("Voltar ao menu");
            core.goBackToMenu();
        }

        // Actions
        fim_alfa.registerAction(
            new Action("btn-voltar_menu", "Voltar ao Menu Principal",
                "action-voltar_menu", fimalfaMenu, visibility));

        // Registrar cenas no level
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(ala_masculina);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);
        level.registerScene(fim_alfa);

        // Cena inicial é recepcao
        level.setInitialScene(0);

        game.registerLevel(level, 1);

        console.groupEnd();
    });