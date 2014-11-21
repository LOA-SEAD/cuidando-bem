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
        level.registerFlag(new Flag("conversar_paciente", false));

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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida ante, " +
            "a euismod risus. Phasellus blandit enim nec elementum bibendum. In tempus, mauris.");
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida ante, " +
            "a euismod risus. Phasellus blandit enim nec elementum bibendum. In tempus, mauris.");
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
                if(level.getFlag("conversar_paciente").getValue() == false) {
                    L.log("Fala mentor");
                    core.openDialog(0);
                }
                // ja falou com o paciente
                else {
                    //core.openDialog(2);
                }
            }
            else{
                core.setActionVisible("Falar com mentor 1", true);
                core.setActionVisible("Falar com mentor 2", true);
                core.setActionVisible("Ir para a ala masculina", true);
                core.setActionVisible("Ir para o posto de enfermagem", true);
            }
        }
        function corredorOnUnload(){
            core.closeDialog();
        }

        function corredorAlaMasculina() {
            L.log("Action: Ir para a ala masculina");
            core.changeScene("ala_masculina");
        }

        function corredorIrPostoEnfermagem() {
            L.log("Action: Ir para a ala masculina");
            core.changeScene("posto_de_enfermagem");
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

        // Dialogs
        // Functions
        // Actions
        function ala_masculinaOnLoad(){
        }
        function ala_masculinaOnUnload(){

        }

        /*
         Leito
          */
        // Flags
        // Dialogs
        // Functions
        // Actions
        function leitoOnLoad() {
        }
        function leitoOnUnload(){

        }
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