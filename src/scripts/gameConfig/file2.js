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
        var leito = new Scene("leito", "scene-leito-char-02", leitoOnLoad, leitoOnUnload);
        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem",
            postoEnfermagemOnload, postoEnfermagemOnUnload);

        // Dialogos

        var dialog_recepcao = [[]];
        dialog_recepcao[0][0] = "Oi! Parece que deu tudo certo com seu primeiro paciente. Parabéns! " +
        "O mentor já te espera para um novo caso.";
        dialog_recepcao[0][1] = "Vou encontrá-lo no corredor. Obrigado, Clarice.";

        var dialog_corredor = [[],[]];
        dialog_corredor[0][0] = "Bom dia! Seu segundo paciente tem 69 anos, está acamado e sabemos que isso" +
        " é um fator de risco para o desenvolvimento de úlcera por pressão; a mudança de posição é" +
        " essencial!";
        dialog_corredor[0][1] = "Bom dia! Vou até a enfermaria conhecê-lo.";

        dialog_corredor[1][0] = "Você inspecionou a pele do paciente?";
        dialog_corredor[1][1] = "Sim e encontrei algumas regiões hiperemiadas no calcanhar.";
        dialog_corredor[1][2] = "Isso mesmo! Em casos como este é essencial a mudança de posição (decúbito) a cada " +
        "2 horas e colocar coxim.";
        dialog_corredor[1][3] = "Então precisarei de um. Vou ao posto de enfermagem procurar.";

        var dialog_enfermaria = [[]];
        dialog_enfermaria[0][0] = "Olá! Sou o técnico de enfermagem cuidarei do Sr. hoje. Como o Sr. está se " +
        "sentindo?";
        dialog_enfermaria[0][1] = "Olha, eu poderia estar melhor mas não serviram minha preciosa gelatina " +
        "hoje. HAHAHAHAHA.";
        dialog_enfermaria[0][2] = "HAHAHA a gelatina daqui é ótima mesmo. O sr. poderia me dizer  seu nome completo e " +
        "data de nascimento, por favor?";
        dialog_enfermaria[0][3] = "Carlos Esme Gouvêa, nasci em 01-12-1945.";
        dialog_enfermaria[0][4] = "Preciso examiná-lo agora, Sr. Carlos. Com licença.";

        var alerta_mentor = [];
        var alerta_resposta = [];
        // Após primeiro diálogo com mentor no corredor - tentar ir ao posto de enfermagem
        alerta_mentor[0] = "Volte à Enfermaria Masculina.";
        alerta_resposta[0] =  "Já volto!";

        // Tentar ir ao leito sem lavar as mãos
        alerta_mentor[1] = "Nunca se esqueça de lavar as mãos antes e após tocar o paciente!";
        alerta_resposta[1] =  "Não posso nunca isso!";

        // Tentar ir ao corredor sem lavar as mãos após examinar o paciente
        alerta_mentor[2] = "Após contato com o paciente lave as mãos!";
        alerta_resposta[2] =  "Sim!";

        // Após o segundo diálogo c/ mentor - tentar ir a ala masculina
        alerta_mentor[3] = "Parece estar perdido? É no posto de enfermagem.";
        alerta_resposta[3] =  "Ok!";

        // Após ter ido ao posto de enfermagem, voltar ao corredor sem ter pego o coxim
        alerta_mentor[4] = "Você está esquecendo de algo!";
        alerta_resposta[4] =  "Falta o coxim!";

        // Tentar ler o prontuário sem ter lavado as mãos
        alerta_mentor[5] = "Lave as mãos!";
        alerta_resposta[5] =  "Sim, agora mesmo!";

        /*
         Recepcao
          */

        // Flags
        // Dialogs
        var fala_recepcionista = [];
        fala_recepcionista[0] = new Dialog(
            "recepcionista", "char-recepcionista", dialog_recepcao[0][0]);
        fala_recepcionista[0].registerOption({
            text: dialog_recepcao[0][1],
            actionFunction: function () {
                L.log("Selecionado 1a opção diálogo");
                core.closeDialog(0);
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-conversar_recepcionista", true);
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
        fala_mentor[0][0] = new Dialog(
            "mentor", "char-mentor", dialog_corredor[0][0]);
        fala_mentor[0][0].registerOption({
            text: dialog_corredor[0][1],
            actionFunction: function () {
                core.closeDialog(0);
                corredorActions(true);
                core.setActionVisible("btn-falar_mentor_01", true);
            }
        });

        // segundo dialogo com o mentor
        fala_mentor[1][0] = new Dialog("mentor", "char-mentor",dialog_corredor[1][0]);
        fala_mentor[1][0].registerOption({
            text: dialog_corredor[1][1],
            actionFunction: function () {
                core.closeDialog(1);
                core.openDialog(2);
            }
        });

        fala_mentor[1][1] = new Dialog(
            "mentor", "char-mentor",dialog_corredor[1][2]);
        fala_mentor[1][1].registerOption({
            text: dialog_corredor[1][3],
            actionFunction: function () {
                core.closeDialog(2);
                core.setActionVisible("btn-falar_mentor_02", true);
                level.getFlag("buscar_coxim").setValue(true);
                corredorActions(true);
            }
        });

        // alerta do mentor
        fala_mentor[2][0] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[0]);
        fala_mentor[2][0].registerOption({
            text: alerta_resposta[0],
            actionFunction: function () {
                core.closeDialog(3);
            }
        });

        fala_mentor[2][4] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[3]);
        fala_mentor[2][4].registerOption({
            text: alerta_resposta[3],
            actionFunction: function () {
                core.closeDialog(4);
            }
        });

        fala_mentor[2][5] = new Dialog(
            "mentor", "char-mentor", alerta_mentor[4]);
        fala_mentor[2][5].registerOption({
            text: alerta_resposta[4],
            actionFunction: function () {
                core.closeDialog(5);
            }
        });

        corredor.registerDialogs(fala_mentor[0]);
        corredor.registerDialogs(fala_mentor[1]);
        corredor.registerDialog(fala_mentor[2][0]);
        corredor.registerDialog(fala_mentor[2][4]);
        corredor.registerDialog(fala_mentor[2][5]);

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
                    corredorActions(false);
                    corredorDialogos(false);
                    core.openDialog(1);
                }
                else if(level.getFlag("buscar_coxim").getValue() == true){
                    L.log("Mentor: Ação incorreta");
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
                    L.log("Mentor: Ação incorreta");
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
                    core.openDialog(3);
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
        function corredorDialogos(_status){
            L.log("Muda visibilidade dos Dialogos: " + _status);
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
        function ala_masculinaOnLoad(){
            if(flags_on == true){
                if(level.getFlag("posicionou_coxim").getValue() == false){
                    ala_masculinaAction(true);
                }
                else{
                    ala_masculinaAction(false);
                    level.getFlag("lavar_maos").setValue(false);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.setActionVisible("btn-ler_prontuario", true);
                }
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
            if(flags_on == true ){
                if(core.getFlag("examinou_paciente").getValue() == true)
                {
                    if(core.getFlag("lavar_maos").getValue() == true){
                        L.log("Ir corredor: depois examinar paciente");
                        core.changeScene(1);
                    }
                    else{
                        L.log("Erro: Lavar mãos necessario");
                        core.openDialog(1);
                    }
                }
                else{
                    L.log("Ir corredor: antes examinar paciente");
                    core.changeScene(1);
                }
            }
            else{
                core.changeScene(1);
            }
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
        function alaMasculinaLerProntuario(){
            L.log("Action: ler prontuario");
            if(flags_on){
                if(level.getFlag("lavar_maos").getValue() == true){
                    core.openModalScene("Prontuario");
                }
                else{
                    L.log("Desconta pontos - falta lavar mãos");
                    core.openDialog(2);
                }
            }else{

            }
        }
        function anotarProntuario(){
            L.log("Anotar prontuario");
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
            text: dialog_enfermaria[0][0],
            actionFunction: function() {
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_paciente[1] = new Dialog(
            "Paciente Carlos", "char-paciente-02",dialog_enfermaria[0][1]);
        fala_paciente[1].registerOption({
            text: dialog_enfermaria[0][2],
            actionFunction: function() {
                core.closeDialog(1);
                core.openDialog(2);
            }
        });

        fala_paciente[2] = new Dialog(
            "Paciente Carlos", "char-paciente-02",dialog_enfermaria[0][3]);
        fala_paciente[2].registerOption({
            text: dialog_enfermaria[0][4],
            actionFunction: function() {
                core.closeDialog(2);
                core.setActionVisible("btn-ir_ala_masculina", true);
                core.setActionVisible("btn-ver_pulseira", true);
                core.setActionVisible("btn-conversar_paciente", true);
            }
        });

        leito.registerDialogs(fala_paciente);

        // Functions
        function leitoOnLoad() {
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
            core.getFlag("lavar_maos").setValue(false);
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
        function leitoFirstActions(_status){
            L.log("Leito visibilidade acoes: " + _status);
            core.setActionVisible("btn-ir_ala_masculina", _status);
            core.setActionVisible("btn-ver_pulseira", _status);
            core.setActionVisible("btn-conversar_paciente", _status);
            core.setActionVisible("btn-examinar_paciente", _status);
        }
        function mudarPosicaoPaciente(){
            L.log("Action: mudar posição do paciente");
            core.setActionVisible("btn-mudar_posicao_paciente", false);
            core.setActionVisible("btn-posicionar_coxim", true);
        }
        function posicionarCoxim(){
            L.log("Action: posicionar coxim");
            level.getFlag("posicionou_coxim").setValue(true);
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

        /*
         Scene:  Fim do Level
         */
        var fim_level = new Scene("Fim da fase", "scene-fim-level",
            fimTutorialOnload, fimTutorialOnUnload);
        // Flags
        // Dialogs
        // Functions
        function fimTutorialOnload(){
            core.setActionVisible("btn-proxima_fase", true);
        }
        function fimTutorialOnUnload(){

        }

        function fimTutorialIrCorredor(){
            L.log("Proxima fase" + core);
            //core.changeLevelTo(2);
        }

        // Actions
        fim_level.registerAction(
            new Action("btn-proxima_fase", "Ir a recepção",
                "action-ir_recepcao", fimTutorialIrCorredor, visibility));


        // Registrar cenas no level
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(ala_masculina);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);
        level.registerScene(fim_level);

        // Cena inicial é recepcao
        level.setInitialScene(0);

        game.registerLevel(level, 1);

        L.groupEnd();
    });