/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */

define(['levelsData_interface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {

        var debug_mode = true;

        var level = new Level("Level 2", isEndOfLevel1, getNextLevel1);
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
                core.setActionVisible("Ir ao corredor", true);
                core.setActionVisible("Conversar com a recepcionista", true);
                //core.openDialog(1);
            }});

        recepcao.registerDialogs(fala_recepcionista);

        // Functions
        function recepcaoOnLoad(){
            if(flags_on){
                core.openDialog(0);
            }
            else{
                core.setActionVisible("Ir ao corredor", true);
                core.setActionVisible("Conversar com a recepcionista", true);
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
            new Action("Ir ao corredor", "action-ir_corredor", recepcaoIrCorredor, visibility));

        recepcao.registerAction(
            new Action("Conversar com a recepcionista", "action-abrir_dialogo",
                conversarRecepcionista, visibility));
        
        /*
         Corredor
          */
        // Flags
        level.registerFlag(new Flag("mentor_dialogo", true));

        // Dialogs
        var fala_mentor = [[],[]];

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
                core.setActionVisible("Falar com mentor", true);
                corredorLiberaActions();
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida ante, " +
            "a euismod risus. Phasellus blandit enim nec elementum bibendum. In tempus, mauris.");
        fala_mentor[1][1].registerOption({
            text: "Lorem ipsum dolor sit amet.",
            actionFunction: function () {
                core.closeDialog(3);
                core.setActionVisible("Falar com mentor", true);
                corredorLiberaActions();
            }
        });

        corredor.registerDialogs(fala_mentor[0]);
        corredor.registerDialogs(fala_mentor[1]);

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
                // ja falou com o paciente
                else if(level.getFlag("mentor_dialogo").getValue() == true){
                    core.openDialog(2);
                }
            }
            else{
                core.setActionVisible("Falar com mentor", true);
                core.setActionVisible("Ir para a ala masculina", true);
                core.setActionVisible("Ir para o posto de enfermagem", true);
            }
        }
        function corredorOnUnload(){
            core.closeDialog();
        }

        function corredorAlaMasculina() {
            L.log("Action: Ir para a ala masculina");
            core.changeScene(2);
        }

        function corredorIrPostoEnfermagem() {
            L.log("Action: Ir para o posto enfermagem");
            if(flags_on == true){
                if(level.getFlag("examinou_paciente").getValue() == false){
                // Ainda nao pode ir ao posto de enfermagem
                    L.log("Mentor: Ação incorreta");

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

        function corredorLiberaActions(){
            L.log("Libera Actions");
            core.setActionVisible("Ir para a ala masculina", true);
            core.setActionVisible("Ir para o posto de enfermagem", true);
        }

        // Actions
        corredor.registerAction(
            new Action("Falar com mentor", "action-abrir_dialogo", function(){
                core.openDialog(0);
            }, visibility));

        corredor.registerAction(
            new Action("Falar com mentor", "action-abrir_dialogo", function(){
                core.openDialog(3);
            }, visibility));

        corredor.registerAction(
            new Action("Ir para a ala masculina", "action-ir_sala_de_leitos", corredorAlaMasculina, visibility));

        corredor.registerAction(
            new Action("Ir para o posto de enfermagem", "action-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        /*
         Ala Masculina
          */
        // Flags
        level.registerFlag(new Flag("lavar_maos", false));
        level.registerFlag(new Flag("examinou_paciente", false));

        // Dialogs

        // Functions
        function ala_masculinaOnLoad(){
            if(flags_on == true){
                core.setActionVisible("Ir ao corredor", true);
                core.setActionVisible("Ir ao leito", true);
                core.setActionVisible("Lavar as mãos", true);
            }
            else{
                core.setActionVisible("Ir ao corredor", true);
                core.setActionVisible("Ir ao leito", true);
                core.setActionVisible("Lavar as mãos", true);
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
            new Action("Ir ao corredor", "action-ir_corredor", alaMasculinaIrCorredor, visibility));
        ala_masculina.registerAction(
            new Action("Ir ao leito", "action-ir_leito", alaMasculinaIrLeito, visibility));
        ala_masculina.registerAction(
            new Action("Lavar as mãos", "action-lavar_maos", alaMasculinaLavarMaos, visibility));

        /*
         Leito
          */

        // Flags
        level.registerFlag(new Flag("conversar_paciente", true));
        level.registerFlag(new Flag("confirmar_pulseira", false));
        level.registerFlag(new Flag("paciente_galaxy", 0));

        // Dialogs
        var fala_paciente = [];

        fala_paciente[0] = new Dialog("paciente-carlos", "char-carlos",
            "Vestibulum molestie eros ligula, ut rhoncus ante pellentesque ut. Nunc.");
        fala_paciente[0].registerOption({
            text: "Nullam sed metus enim. Etiam.",
            actionFunction: function() {
                core.closeDialog(0);
                core.setActionVisible("Ir para ala masculina", true);
                core.setActionVisible("Ver pulseira", true);
                core.setActionVisible("Conversar paciente", true);
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
                    core.setActionVisible("Conversar paciente", true);
                }
            }
            else {
                core.setActionVisible("Ir para a ala masculina", true);
                core.setActionVisible("Ver pulseira", true);
                core.setActionVisible("Conversar paciente", true);
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
            core.setActionVisible("Largar pulseira", true);
            core.setActionVisible("Confirmar pulseira", true);
        }
        function examinarPaciente(){
            L.log("Action: Examinar paciente");
            if(core.getFlag("paciente_galaxy").getValue() >= 10)
            {
                L.log("Load Galaxy");
            }
            core.getFlag("paciente_galaxy").setValue(core.getFlag("paciente_galaxy").getValue() + 1);
        }

        leito.registerAction(
            new Action("Ir para ala masculina", "action-ir_sala_de_leitos", leitoIrAlaMasculina, visibility));

        leito.registerAction(new Action(
            "Ver pulseira", "action-pulseira_paciente", leitoPulseiraPaciente, visibility));

        leito.registerAction(new Action(
            "Conversar paciente", "action-abrir_dialogo", dialogarPaciente, visibility));

        leito.registerAction(new Action(
            "Examinar paciente", "action-examinar_paciente", examinarPaciente, visibility));

        // Modal Scene
        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        function leitoLargarPulseira(){
            L.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");
            if(level.getFlag("confirmar_pulseira").getValue() == true){
                core.setActionVisible("Examinar paciente", true);
            }
        }

        function leitoConfirmarPulseira(){
            L.log("Ação: Confirmar pulseira");
            level.getFlag("confirmar_pulseira").setValue(true);
        }
        pulseira.registerAction(
            new Action("Largar pulseira", "action-pulseira_paciente", leitoLargarPulseira, visibility));

        pulseira.registerAction(
            new Action("Confirmar pulseira", "action-confirmar_pulseira", leitoConfirmarPulseira, visibility));

        level.registerModalScene(pulseira);


        /*
         Posto de Enfermagem
         */
        // Flags
        // Dialogs
        // Functions
        // Actions
        function postoEnfermagemOnload(){
        }

        function postoEnfermagemOnUnload(){

        }

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