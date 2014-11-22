/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */

define(['levelsData_interface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {

        var debug_mode = true;

        var level = new Level("Level 1", isEndOfLevel1, getNextLevel1);
        L.group(level.getName(), debug_mode);

        function isEndOfLevel1() {
        }

        function getNextLevel1() {
        }

        /*
         Flags for level 1
         */

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = false;

        /*
         Scenes for level 1
         */

        var recepcao = new Scene("recepcao", "scene-recepcao", recepcaoOnLoad, recepcaoOnUnload);
        var corredor = new Scene("corredor", "scene-corredor", corredorOnLoad, corredorOnUnload);
        var ala_masculina = new Scene(
            "ala_masculina", "scene-ala_masculina", ala_masculinaOnLoad, ala_masculinaOnUnload);
        var leito = new Scene("leito", "scene-leito", leitoOnLoad, leitoOnUnload);
        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem",
            postoEnfermagemOnload, postoEnfermagemOnUnload);

        
        /*
         Recepcao
          */
        // Flags

        // Dialogs
        var fala_recepcionista = [];
        fala_recepcionista[0] = new Dialog("recepcionista", "char-recepcionista",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. " +
            "Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur " +
            "ante hendrerit. Donec et mollis dolor.");
        fala_recepcionista[0].registerOption({
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            actionFunction: function () {
                L.log("Selecionado 1a opção diálogo");
                core.closeDialog(0);
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-conversar_recepcionista", true);
                //core.openDialog(1);
            }});

        recepcao.registerDialogs(fala_recepcionista);

        // Functions
        function recepcaoOnLoad(){
            if(flags_on){
                core.openDialog(0);
            }
            else{
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-conversar_recepcionista", true);
            }
        }
        function recepcaoOnUnload(){
            core.closeDialog();
        }
        function recepcaoIrCorredor() {
            L.log("Action: recepcao_ir_corredor");
            core.changeScene(1);
        }

        function conversarRecepcionista() {
            L.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        // Actions
        recepcao.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor", recepcaoIrCorredor, visibility));

        recepcao.registerAction(
            new Action("btn-conversar_recepcionista", "Conversar com a recepcionista",
                "action-abrir_dialogo", conversarRecepcionista, visibility));

        /*
         Corredor
          */
        // Flags
        level.registerFlag(new Flag("mentor_dialogo", true));
        level.registerFlag(new Flag("buscar_coxim", false));

        // Dialogs
        var fala_mentor = [[],[],[]];

        // primeiro dialogo com o mentor
        fala_mentor[0][0] = new Dialog("mentor", "char-mentor",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida ante, " +
            "a euismod risus. Phasellus blandit enim nec elementum bibendum. In tempus, mauris.");
        fala_mentor[0][0].registerOption({
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            actionFunction: function () {
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_mentor[0][1] = new Dialog("mentor", "char-mentor",
            "Mauris nisl justo, venenatis non tellus tincidunt, pellentesque convallis nunc. " +
            "Vivamus neque diam, venenatis vitae imperdiet at, hendrerit vitae magna. Curabitur " +
            "mauris magna, viverra sit.");
        fala_mentor[0][1].registerOption({
            text: "Lorem ipsum dolor sit amet.",
            actionFunction: function () {
                core.closeDialog(1);
                corredorActions(true);
                core.setActionVisible("btn-falar_mentor_01", true);
            }
        });

        // segundo dialogo com o mentor
        fala_mentor[1][0] = new Dialog("mentor", "char-mentor",
            "Sed pulvinar sagittis mi, vel facilisis dolor pulvinar quis. Aenean non velit velit. " +
            "Pellentesque egestas rutrum odio, vitae convallis tortor gravida ac. " +
            "Curabitur fringilla libero.");
        fala_mentor[1][0].registerOption({
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            actionFunction: function () {
                core.closeDialog(2);
                core.openDialog(3);
            }
        });

        fala_mentor[1][1] = new Dialog("mentor", "char-mentor",
            "Phasellus placerat accumsan leo, facilisis dapibus nibh rutrum sit amet. " +
            "Duis non sagittis elit. Praesent.");
        fala_mentor[1][1].registerOption({
            text: "Lorem ipsum dolor sit amet.",
            actionFunction: function () {
                core.closeDialog(3);
                core.setActionVisible("btn-falar_mentor_02", true);
                level.getFlag("buscar_coxim").setValue(true);
            }
        });

        // alerta do mentor
        fala_mentor[2][0] = new Dialog("mentor", "char-mentor",
            "Proin laoreet quis nibh at.");
        fala_mentor[2][0].registerOption({
            text: "Nunc mollis, nunc in aliquet.",
            actionFunction: function () {
                core.closeDialog(4);
            }
        });

        corredor.registerDialogs(fala_mentor[0]);
        corredor.registerDialogs(fala_mentor[1]);
        corredor.registerDialog(fala_mentor[2][0]);

        // Functions
        function corredorOnLoad(){
            if(flags_on == true){
                // primeira vez no corredor - ainda nao falou com o paciente
                if(level.getFlag("examinou_paciente").getValue() == false
                    && level.getFlag("mentor_dialogo").getValue() == true) {
                    L.log("Fala mentor");
                    level.getFlag("mentor_dialogo").setValue(false);
                    core.openDialog(0);
                }
                // ja examinou o paciente
                else if(level.getFlag("mentor_dialogo").getValue() == true
                    && level.getFlag("examinou_paciente").getValue() == true){
                    L.log("Segunda fala do mentor");
                    level.getFlag("mentor_dialogo").setValue(false);
                    core.openDialog(2);
                }
                else if(level.getFlag("buscar_coxim").getValue() == true){
                    core.openDialog(4);
                }
            }
            else{
                core.setActionVisible("btn-falar_mentor_01", true);
                core.setActionVisible("btn-falar_mentor_02", true);
                core.setActionVisible("btn-ir_ala_masculina", true);
                core.setActionVisible("btn-ir_posto_enfermagem", true);
            }
        }
        function corredorOnUnload(){
            core.closeDialog();
        }

        function corredorAlaMasculina() {
            if (flags_on == true) {
                L.log("Action: Ir para a ala masculina");
                if (level.getFlag("buscar_coxim").getValue() == false) {
                    core.changeScene(2);
                }
                else {
                    core.openDialog(4);
                }
            }
            else {
                L.log("Action: Ir para a ala masculina");
                core.changeScene(2);
            }
        }

        function corredorIrPostoEnfermagem() {
            L.log("Action: Ir para o posto enfermagem");
            if(flags_on == true){
                if(level.getFlag("examinou_paciente").getValue() == false){
                // Ainda nao pode ir ao posto de enfermagem
                    L.log("Mentor: Ação incorreta");
                    core.openDialog(4);
                }
                else{
                // Ja pode ir ao posto de enfermagem
                    L.log("Mudar cenário: posto de enfermagem");
                    core.changeScene(4);
                }
            }
            else {
                core.changeScene(4);
            }
        }

        function corredorActions(_status){
            L.log("Muda visibilidade de Actions: " + _status);
            core.setActionVisible("btn-ir_ala_masculina", _status);
            core.setActionVisible("btn-ir_posto_enfermagem", _status);
        }

        // Actions
        corredor.registerAction(
            new Action("btn-falar_mentor_01", "Falar com mentor",
                "action-abrir_dialogo", function(){core.openDialog(0);}, visibility));

        corredor.registerAction(
            new Action("btn-falar_mentor_02", "Falar com mentor",
                "action-abrir_dialogo", function(){core.openDialog(2);}, visibility));

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
        fala_mentor[2][1] = new Dialog("mentor", "char-mentor",
            "Proin laoreet quis nibh at.");
        fala_mentor[2][1].registerOption({
            text: "Nunc mollis, nunc in aliquet.",
            actionFunction: function () {
                core.closeDialog(0);
            }
        });

        ala_masculina.registerDialog(fala_mentor[2][1]);

        // Functions
        function ala_masculinaOnLoad(){
            if(flags_on == true){
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-ir_leito", true);
                core.setActionVisible("btn-lavar_maos", true);
            }
            else{
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-ir_leito", true);
                core.setActionVisible("btn-lavar_maos", true);
            }
        }
        function ala_masculinaOnUnload(){

        }
        function alaMasculinaIrCorredor(){
            core.getFlag("lavar_maos").setValue(false);
            core.changeScene(1);
        }
        function alaMasculinaIrLeito(){
            L.log("Action: Ala Masculina - Ir Leito");
            if(flags_on == true){
                if(level.getFlag("lavar_maos").getValue() == true){
                    L.log("Troca cena: leito");
                    core.changeScene(3);
                }
                else{
                    L.log("Lavar maos necessario");
                    L.log("Desconta ponto - apenas uma vez");
                    core.openDialog(0);
                }
            }
            else {
                core.changeScene(3);
            }
        }
        function alaMasculinaLavarMaos(){
            L.log("Action: lavar as maos");
            core.getFlag("lavar_maos").setValue(true);
        }

        // Actions
        ala_masculina.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor", alaMasculinaIrCorredor, visibility));
        ala_masculina.registerAction(
            new Action("btn-ir_leito", "Ir ao leito",
                "action-ir_leito", alaMasculinaIrLeito, visibility));
        ala_masculina.registerAction(
            new Action("btn-lavar_maos", "Lavar as mãos",
                "action-lavar_maos", alaMasculinaLavarMaos, visibility));

        /*
         Leito
          */

        // Flags
        level.registerFlag(new Flag("conversar_paciente", true));
        level.registerFlag(new Flag("confirmar_pulseira", false));
        level.registerFlag(new Flag("paciente_carlos", 0));

        // Dialogs
        var fala_paciente = [];

        fala_paciente[0] = new Dialog("paciente-carlos", "char-carlos",
            "Vestibulum molestie eros ligula, ut rhoncus ante pellentesque ut. Nunc.");
        fala_paciente[0].registerOption({
            text: "Nullam sed metus enim. Etiam.",
            actionFunction: function() {
                core.closeDialog(0);
                core.setActionVisible("btn-ir_ala_masculina", true);
                core.setActionVisible("btn-ver_pulseira", true);
                core.setActionVisible("btn-conversar_paciente", true);
            }
        })

        leito.registerDialogs(fala_paciente);

        // Functions


        // Actions
        function leitoOnLoad() {
            if(flags_on == true){
                if(level.getFlag("conversar_paciente").getValue() == true){
                    level.getFlag("conversar_paciente").setValue(false);
                    core.openDialog(0);
                }
                else{
                    core.setActionVisible("btn-conversar_paciente", true);
                }
            }
            else {
                core.setActionVisible("btn-ir_ala_masculina", true);
                core.setActionVisible("btn-ver_pulseira", true);
                core.setActionVisible("btn-conversar_paciente", true);
            }
        }
        function leitoOnUnload(){
        }
        function dialogarPaciente(){
            core.openDialog(0);
        }
        function leitoIrAlaMasculina(){
            L.log("Action: action-ir_ala_masculina");
            core.changeScene(2);
        }
        function leitoPulseiraPaciente(){
            L.log("Action: Ver pulsiera");
            core.openModalScene("Pulseira");
            core.setActionVisible("btn-largar_pulseira", true);
            core.setActionVisible("btn-confirmar_pulseira", true);
        }
        function examinarPaciente(){
            L.log("Action: Examinar paciente");
            core.getFlag("examinou_paciente").setValue(true);
            core.getFlag("mentor_dialogo").setValue(true);
            if(core.getFlag("paciente_carlos").getValue() >= 20)
            {
                L.log("Load Carlos Esme Gouvea");
                core.openModalScene("Carlos Esme Gouvea");
                core.getFlag("paciente_carlos").setValue(0);
            }
            core.getFlag("paciente_carlos").setValue(
                core.getFlag("paciente_carlos").getValue() + 1);
        }

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

        // Modal Scene
        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        function leitoLargarPulseira(){
            L.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");
            if(level.getFlag("confirmar_pulseira").getValue() == true){
                core.setActionVisible("btn-examinar_paciente", true);
            }
        }

        function leitoConfirmarPulseira(){
            L.log("Ação: Confirmar pulseira");
            level.getFlag("confirmar_pulseira").setValue(true);
        }
        pulseira.registerAction(
            new Action("btn-largar_pulseira", "Largar pulseira",
                "action-pulseira_paciente", leitoLargarPulseira, visibility));

        pulseira.registerAction(
            new Action("btn-confirmar_pulseira", "Confirmar pulseira",
                "action-confirmar_pulseira", leitoConfirmarPulseira, visibility));

        level.registerModalScene(pulseira);
        var carlos_esme_gouvea = new Scene("Carlos Esme Gouvea", "modalScene-carlos_esme_gouvea");
        carlos_esme_gouvea.registerAction(
            new Action("btn-fechar_carlos", "Fechar Carlos",
                "action-fechar_modal", function() {core.closeModalScene("Carlos Esme Gouvea");}, true)
        );

        level.registerModalScene(carlos_esme_gouvea);
        /*
         Posto de Enfermagem
         */
        // Flags
        level.registerFlag(new Flag("pegou_coxim", false));
        // Dialogs

        // Functions
        function postoEnfermagemOnload(){
            core.setActionVisible("btn-abrir_gaveta", true);
            core.setActionVisible("btn-ir_corredor", true);
        }
        function postoEnfermagemIrCorredor(){
            L.log("Action: ir_corredor");
            core.changeScene(1);
        }
        function postoEnfermagemOnUnload(){

        }
        function postoEnfermagemAbrirGaveta() {
            L.log("Action: abrir_gaveta");
            core.openModalScene("Gaveta");
            gavetaActions(true);

        }
        function postoEnfermagemFecharGaveta() {
            L.log("Action: fechar_gaveta");
            core.closeModalScene("Gaveta");
            gavetaActions(false);
        }
        function postoEnfermagemPegarCoxim(){
            L.log("Action: pegar coxim");
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



        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(ala_masculina);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);

        // Cena inicial é recepcao
        level.setInitialScene(0);

        game.registerLevel(level, 1);

        L.groupEnd();
    });