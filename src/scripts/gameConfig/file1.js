/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData_interface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {
        var debug_mode = true;

        var level = new Level("Level Tutorial", isEndOfLevel1, getNextLevel1);
        L.group(level.getName(), debug_mode);

        function isEndOfLevel1() {
        }

        function getNextLevel1() {
        }

        var flags_on = true;    // if false it wont check for flags -- tests purpose

        if (flags_on)
            var visibility = false;
        else
            var visibility = true;


        /*
        Dialogos
         */
        var dialog_recep = [[]];
        // Recepcionista
        dialog_recep[0][0] = "Bom dia! Você é novo por aqui? Como posso ajudá-lo?";
        // Jogador
        dialog_recep[0][1] = "Bom dia. Sou o novo técnico de enfermagem.";
        // Recepcionista
        dialog_recep[0][2] = "Ah, sim! Seja bem vindo! O Enfermeiro mentor está te esperando no corredor.";
        // Jogador
        dialog_recep[0][3] = "Obrigado!";

        var dialog_corredor = [[]];
        // Mentor
        dialog_corredor[0][0] = "Olá! Seja bem-vindo ao Hospital Cuidando Bem! Aqui nossa missão é a " +
        "garantia da segurança de nossos pacientes através dos protocolos. Você fará um estágio de " +
        "experiência e, caso se saia bem, será contratado em definitivo pelo hospital.";
        // Jogador
        dialog_corredor[0][1] = "Obrigado! Espero conseguir atender suas expectativas.";
        // Mentor
        dialog_corredor[0][2] = "Agora me acompanhe, começaremos pela enfermaria masculina.";
        // Jogador
        dialog_corredor[0][3] = "Sim, vamos lá!";

        var dialog_leito_masc = [[],[]];
        // Mentor
        dialog_leito_masc[0][0] = "Este é o Sr. João, seu primeiro paciente. Um dos principais protocolos " +
        "de segurança é a sua apresentação ao paciente e a certificação de que a identificação dele está " +
        "correta.";
        // Jogador
        dialog_leito_masc[0][1] = "Olá Sr. João. Sou o novo técnico de enfermagem e cuidarei do Sr. hoje. " +
        "Como está se sentindo?";
        // Paciente
        dialog_leito_masc[0][2] = "Estou com muita dor de cabeça e passei muito nervoso hoje, acho que " +
        "minha pressão subiu. É a primeira vez que preciso ser internado em um hospital e estou com um " +
        "pouco de medo.";
        // Jogador
        dialog_leito_masc[0][3] = "Vamos fazer o que for possível para que sua estadia aqui seja rápida " +
        "e que se sinta em casa. Porém, primeiro  o seu nome completo e da sua data de nascimento, tudo bem?!";
        // Paciente
        dialog_leito_masc[0][4] = "Meu nome é  João Manoel Ribeiro, nasci no dia 07-06-1956.";
        // Jogador
        dialog_leito_masc[0][5] = "Ok! Obrigado";
        // Mentor
        dialog_leito_masc[0][6] = "Sua primeira missão é admitir o Sr. João nesta enfermaria, " +
        "identificando-o com uma pulseira e verificando os seus sinais vitais. Antes de começar, " +
        "vá até o posto de enfermagem retirar os instrumentos necessários.";
        // Jogador
        dialog_leito_masc[0][7] = "Claro! Agora mesmo.";

        // Jogador
        dialog_leito_masc[1][0] = "Sr. João, esta pulseira agora é a sua identificação aqui dentro do " +
        "hospital, ela é importante para que ninguém o confunda com outro paciente. Daqui em diante quando " +
        "for submetido a um procedimento médico, peça ao profissional de saúde para verificar essa " +
        "identificação. Agora preciso verificar seus sinais vitais: a pressão arterial, a frequência " +
        "cardíaca, frequência respiratória, saturação de oxigênio e temperatura, ok?";
        // Paciente
        dialog_leito_masc[1][1] = "Ok. Obrigado.";
        // Jogador
        dialog_leito_masc[1][2] = "De nada.";
        // Mentor
        dialog_leito_masc[1][3] = "Parabéns, você conseguiu admitir o paciente neste hospital! Agora falta " +
        "algo muito importante: anotar os procedimentos realizados e os dados obtidos dos sinais vitais " +
        "(SSVV) do paciente. Vamos lá?";
        // Jogador
        dialog_leito_masc[1][4] = "Pode deixar, vou anotar imediatamente no prontuário.";

        /*
         Scene:  Recepcao
         */
        var recepcao = new Scene("recepcao", "scene-recepcao",
            recepcaoOnLoad, recepcaoOnUnload);
        // Flags
        level.registerFlag(new Flag("conversar_recepcionista"), false);

        // Dialogs
        var fala_recepcionista = [];
        fala_recepcionista[0] = new Dialog(
            "recepcionista", "char-recepcionista",dialog_recep[0][0]);
        fala_recepcionista[0].registerOption({
            text: dialog_recep[0][1],
            actionFunction: function () {
                level.getFlag("conversar_recepcionista").setValue(true);
                L.log("Selecionado 1a opção diálogo: " + level.getFlag("conversar_recepcionista").getValue());
                core.closeDialog(0);
                core.openDialog(1);
            }});

        fala_recepcionista[1] = new Dialog(
            "recepcionista", "char-recepcionista", dialog_recep[0][2]);
        fala_recepcionista[1].registerOption({
            text: dialog_recep[0][3],
            actionFunction: function () {
                L.log("Encerrar o diálogo");
                core.closeDialog(1);
                core.setActionVisible("btn-ir_corredor", true);
                core.setActionVisible("btn-conversar_recepcionista", true);
                core.setInteractiveObjectVisible("io-conversar_recepcionista", true);
                core.setInteractiveObjectVisible("io-corredor_esquerda", true);
                core.setInteractiveObjectVisible("io-corredor_direita", true);
            }});

        recepcao.registerDialogs(fala_recepcionista);

        // Functions
        function recepcaoOnLoad() {
            core.openDialog(0);
        }

        function recepcaoOnUnload() {
            core.closeDialog(0);
            core.closeDialog(1);
        }

        function recepcaoIrCorredor() {
            L.log("Funcao: recepcao_ir_corredor");
            if (!flags_on) {  // wont check for flags
                core.closeDialog(0);
                core.closeDialog(1);
                core.changeScene(1);
                L.log("Ir para o corredor");
            }
            else {
                if (level.getFlag("conversar_recepcionista").getValue() == true) {
                    core.closeDialog(0);
                    core.closeDialog(1);
                    core.changeScene(1);
                    L.log("Ir para o corredor");
                }
                else
                    L.log("Necessita ação: conversar com a recepcionista");
            }
        }

        function conversarRecepcionista() {
            L.log("action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        // Actions
        recepcao.registerAction(
            new Action("btn-ir_corredor","Ir ao corredor",
                "action-ir_corredor", recepcaoIrCorredor, visibility));

        recepcao.registerAction(
            new Action("btn-conversar_recepcionista","Conversar com a recepcionista",
                "action-abrir_dialogo", conversarRecepcionista, visibility));

        // Interactive Objects
        // # 3 - Falar com recepcionista
        recepcao.registerInteractiveObject(
            new InteractiveObject("io-conversar_recepcionista","Conversar com a recepcionista",
                "intObj-falar_com_recepcionista", conversarRecepcionista, visibility));

        recepcao.registerInteractiveObject(
            new InteractiveObject("io-corredor_esquerda", "Ir ao corredor",
                "intObj-ir_corredor_esq", recepcaoIrCorredor, visibility));

        recepcao.registerInteractiveObject(
            new InteractiveObject("io-corredor_direita", "Ir ao corredor",
                "intObj-ir_corredor_dir", recepcaoIrCorredor, visibility));

        /*
         Scene:  Corredor
         */
        var corredor = new Scene("corredor", "scene-corredor", corredorOnLoad, corredorOnUnLoad);

        // Flags
        level.registerFlag(new Flag("conversar_mentor", false));
        level.registerFlag(new Flag("passagem_corredor", 0));

        // Dialogs
        var fala_mentor = [];
        fala_mentor[0] = new Dialog(
            "mentor", "char-mentor", dialog_corredor[0][0]);
        fala_mentor[0].registerOption({
            text: dialog_corredor[0][1],
            actionFunction: function () {
                level.getFlag("conversar_mentor").setValue(true);
                core.closeDialog(0);
                core.openDialog(1);
            }
        });
        fala_mentor[1] = new Dialog(
            "mentor", "char-mentor",dialog_corredor[0][2]);
        fala_mentor[1].registerOption({
            text: dialog_corredor[0][3],
            actionFunction: function () {
                core.closeDialog(1);
                core.setActionVisible("btn-ir_sala_leitos", true);
                core.setActionVisible("btn-conversar_mentor", true);
                core.setInteractiveObjectVisible("io-ir_sala_leitos", true);
            }
        });

        corredor.registerDialogs(fala_mentor);

        // Functions
        function corredorOnLoad() {
            switch (level.getFlag("passagem_corredor").getValue()){
                case 0: // first time at 'corredor'
                    core.setInteractiveObjectVisible("io-conversar_mentor", true);
                    core.openDialog(0);
                    break;
                case 1: // second time at 'corredor'
                    core.setActionVisible("btn-ir_posto_enfermagem", true);
                    core.setActionVisible("btn-ir_sala_leitos", false);
                    core.setActionVisible("btn-conversar_mentor", false);
                    core.setInteractiveObjectVisible("io-conversar_mentor", false);
                    break;
                case 2:
                    core.setActionVisible("btn-ir_posto_enfermagem", false);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                    break;
            }
        }

        function corredorOnUnLoad(){
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
        }

        function corredorIrSalaLeitos() {
            if (!flags_on) {
                L.log("Action: corredorIrSalaLeitos");
                core.changeScene(2);
            } else {
                if (level.getFlag("conversar_mentor").getValue() == true) {
                    core.changeScene(2);
                    L.log("Action: corredorIrSalaLeitos");
                } else {
                    L.log("Necessita ação: falar com mentor");
                }
            }
        }

        function corredorIrPostoEnfermagem() {
                L.log("Action: corredorIrPostoEnfermagem");
                core.changeScene(4);
        }

        function dialogarMentor(){
            L.log("Abrir diálogo com o mentor");
            core.openDialog(0);
        }

        // Actions
        corredor.registerAction(
            new Action("btn-conversar_mentor","Conversar com Mentor",
                "action-abrir_dialogo", dialogarMentor, visibility));

        corredor.registerAction(
            new Action("btn-ir_sala_leitos","Ir para a sala de leitos masculino",
                "action-ir_sala_de_leitos", corredorIrSalaLeitos, visibility));

        corredor.registerAction(
            new Action("btn-ir_posto_enfermagem","Ir para o posto de enfermagem",
                "action-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de leitos masculino",
                "intObj-ir_sala_de_leitos", corredorIrSalaLeitos, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("io-ir_posto_enfermagem","Ir para o posto de enfermagem",
                "intObj-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("io-conversar_mentor","Conversar com Mentor",
                "intObj-conversar-mentor", dialogarMentor, visibility));

        /*
         Scene:  Sala de Leitos
         */
        var sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos", salaLeitosOnLoad, salaLeitosOnUnload);

        // Flags
        level.registerFlag(new Flag("passagem_sala-de-leitos", 0));

        // Dialogs

        // Functions
        function salaLeitosOnLoad(){
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
        }
        function salaLeitosOnUnload(){
            switch (level.getFlag("passagem_sala-de-leitos").getValue()){
                case 0:
                    level.getFlag("passagem_sala-de-leitos").setValue(1);
                    break;
                case 1:
                    level.getFlag("passagem_sala-de-leitos").setValue(0);
                    break;
            }
        }
        function salaLeitosIrCorredor(){
            core.changeScene(1);
        }
        function salaLeitosIrLeito(){
            core.changeScene(3);
        }
        // Actions
        sala_de_leitos.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor", salaLeitosIrCorredor, visibility));
        sala_de_leitos.registerAction(
            new Action("btn-ir_leito", "Ir ao leito",
                "action-leito-char-01", salaLeitosIrLeito, visibility));

        /*
         Scene: Leito
         */
        var leito = new Scene("leito", "scene-leito-char-01", leitoOnLoad, leitoOnUnload);

        // Flags
        level.registerFlag(new Flag("visita-leito", 0));
        level.registerFlag(new Flag("lavar-maos", 0));

        // Dialogs
        var fala_cena3_leito_masculino = [];
        fala_cena3_leito_masculino[0] = new Dialog(
            "mentor", "char-mentor", dialog_leito_masc[0][0]);
        fala_cena3_leito_masculino[0].registerOption({
            text: dialog_leito_masc[0][1],
            actionFunction: function () {
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_cena3_leito_masculino[1] = new Dialog(
            "paciente", "char-paciente-01",dialog_leito_masc[0][2]);
        fala_cena3_leito_masculino[1].registerOption({
            text: dialog_leito_masc[0][3],
            actionFunction: function () {
                core.closeDialog(1);
                core.openDialog(2);
            }
        });

        fala_cena3_leito_masculino[2] = new Dialog(
            "paciente", "char-paciente-01",dialog_leito_masc[0][4]);
        fala_cena3_leito_masculino[2].registerOption({
            text: dialog_leito_masc[0][5],
            actionFunction: function () {
                core.closeDialog(2);
                core.openDialog(3);
            }
        });

        fala_cena3_leito_masculino[3] = new Dialog(
            "mentor", "char-mentor",dialog_leito_masc[0][6]);
        fala_cena3_leito_masculino[3].registerOption({
            text: dialog_leito_masc[0][7],
            actionFunction: function () {
                core.closeDialog(3);
                core.setActionVisible("btn-pulseira_paciente", true);
            }
        });

        var fala_cena4_leito_masculino = [];

        fala_cena4_leito_masculino[0] = new Dialog(
            "jogador", "char-jogador","");
        fala_cena4_leito_masculino[0].registerOption({
            text: dialog_leito_masc[1][0],
            actionFunction: function () {
                core.closeDialog(4);
                core.openDialog(5);
            }
        });

        fala_cena4_leito_masculino[1] = new Dialog(
            "paciente", "char-paciente-01",dialog_leito_masc[1][1]);
        fala_cena4_leito_masculino[1].registerOption({
            text: dialog_leito_masc[1][2],
            actionFunction: function () {
                core.closeDialog(5);
                core.openDialog(6);
            }
        });

        fala_cena4_leito_masculino[2] = new Dialog(
            "mentor", "char-mentor",dialog_leito_masc[1][3]);
        fala_cena4_leito_masculino[2].registerOption({
            text: dialog_leito_masc[1][4],
            actionFunction: function () {
                core.closeDialog(6);
                core.setActionVisible("btn-lavar_maos", true);
            }
        });


        leito.registerDialogs(fala_cena3_leito_masculino);
        leito.registerDialogs(fala_cena4_leito_masculino);

        // Functions
        function leitoOnLoad() {
            L.log("Leito: Onload");
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
        }
        function leitoOnUnload(){
            L.log("Leito: OnUnload");
            level.getFlag("visita-leito").setValue(1);
        }

        function leitoIrCorredor(){
            L.log("Action: action-ir_sala_de_leitos");
            core.changeScene(2);
        }

        function leitoLavarMaos(){
            L.log("Action: lavar_maos");
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
                    core.setActionVisible("btn-anotar_prontuario", true);
                    break;
            }
        }

        function leitoMedirTemperatura(){
            L.log("Action: medir_temperatura");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("termometro").setValue(true);
                core.setActionVisible("btn-medir_temperatura", false);

                if(level.getFlag("oximetro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                {
                    core.setActionVisible("btn-lavar_maos", true);
                    core.getFlag("lavar-maos").setValue(2);
                }
            }
        }

        function leitoMedirPulso(){
            L.log("Action: medir_pulso");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("medidor-pressao").setValue(true);
                core.setActionVisible("btn-medir_pulso", false);

                if(level.getFlag("termometro").getValue() == true && level.getFlag("oximetro").getValue() == true)
                {
                    core.setActionVisible("btn-lavar_maos", true);
                    core.getFlag("lavar-maos").setValue(2);
                }
            }
        }

        function leitoMedirFreqRespiratoria(){
            L.log("Action: medir_freq_respiratoria");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("oximetro").setValue(true);
                core.setActionVisible("btn-frequencia_respiratoria", false);

                if(level.getFlag("termometro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                {
                    core.setActionVisible("btn-lavar_maos", true);
                    core.getFlag("lavar-maos").setValue(2);
                }
            }
        }

        function anotarProntuario(){
            L.log("Action: anotar prontuario");
            core.changeScene(5);
        }

        function leitoPulseiraPaciente(){
            L.log("Action: pulseira_paciente");
            core.openModalScene("Pulseira");
            core.setActionVisible("btn-confirmar_pulseira", true);
            core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
        }

        // Actions

        leito.registerAction(
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos",
                "action-ir_sala_de_leitos", leitoIrCorredor, visibility));

        leito.registerAction(
            new Action("btn-pulseira_paciente", "Checar pulseira paciente",
                "action-pulseira_paciente", leitoPulseiraPaciente, visibility));

        leito.registerAction(
            new Action("btn-lavar_maos", "Lavar as mãos",
                "action-lavar_maos", leitoLavarMaos, visibility));

        leito.registerAction(
            new Action("btn-medir_temperatura", "Medir temperatura",
                "action-medir_temperatura", leitoMedirTemperatura, visibility));

        leito.registerAction(
            new Action("btn-medir_pulso", "Medir pulso",
                "action-medir_pulso", leitoMedirPulso, visibility));

        leito.registerAction(
            new Action("btn-frequencia_respiratoria", "Medir frequência respiratória",
                "action-medir_freq_respiratoria", leitoMedirFreqRespiratoria, visibility));

        leito.registerAction(
            new Action("btn-anotar_prontuario", "Anotar prontuario",
                "action-anotar_prontuario", anotarProntuario, visibility));

        /*
            Modal
         */

        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        function leitoLargarPulseira(){
            L.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");
            core.setActionVisible("btn-ir_sala_leitos", true);
            core.setActionVisible("btn-pulseira_paciente", false);
        }

        function leitoConfirmarPulseira(){
            L.log("Ação: Confirmar pulseira");
            core.setActionVisible("btn-confirmar_pulseira", false);
            core.setInteractiveObjectVisible("io-confirmar_pulseira", false);
            core.setActionVisible("btn-largar_pulseira", true);
        }

        pulseira.registerAction(
            new Action("btn-largar_pulseira", "Largar pulseira",
                "action-pulseira_paciente", leitoLargarPulseira, visibility));

        pulseira.registerAction(
            new Action("btn-confirmar_pulseira", "Confirmar pulseira",
                "action-confirmar_pulseira", leitoConfirmarPulseira, visibility));

        pulseira.registerInteractiveObject(
            new Action("io-confirmar_pulseira", "Confirmar pulseira",
                "intObj-confirmar_pulseira", leitoConfirmarPulseira, visibility));

        level.registerModalScene(pulseira);

        /*
         Scene: Posto de Enfermagem
         */
        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem",
            postoEnfermagemOnload, postoEnfermagemOnUnload);

        // Flags
        level.registerFlag(new Flag("termometro", false));
        level.registerFlag(new Flag("medidor-pressao", false));
        level.registerFlag(new Flag("oximetro", false));
        // Dialogs

        // Functions
        function postoEnfermagemOnload(){
            core.setActionVisible("btn-abrir_gaveta", true);
        }

        function postoEnfermagemOnUnload(){

        }

        function postoEnfermagemIrCorredor(){
                L.log("Action: ir_corredor");
                core.changeScene(1);
        }

        function postoEnfermagemAbrirGaveta() {
            L.log("Action: abrir_gaveta");
            core.openModalScene("Gaveta");

            core.setActionVisible("btn-fechar_gaveta", true);
            if(core.getFlag("termometro").getValue() != true)
                core.setActionVisible("btn-termometro", true);
            if(core.getFlag("medidor-pressao").getValue() != true)
                core.setActionVisible("btn-medidor_pressao", true);
            if(core.getFlag("oximetro").getValue() != true)
                core.setActionVisible("btn-oximetro", true);
        }

        function postoEnfermagemPegarTermometro() {
            L.log("Action: pegar_termometro");
            core.setInteractiveObjectVisible("io-termometro", false);
            core.setActionVisible("btn-termometro", false);
            core.getFlag("termometro").setValue(true);
        }

        function postoEnfermagemPegarMedidorPressao() {
            L.log("O medidor de pressão foi ativado");
            core.setInteractiveObjectVisible("io-medidor_pressao", false);
            core.setActionVisible("btn-medidor_pressao", false);
            core.getFlag("medidor-pressao").setValue(true);
        }

        function postoEnfermagemPegarOximetro() {
            L.log("Action: pegar_oximetro");
            core.setInteractiveObjectVisible("io-oximetro", false);
            core.setActionVisible("btn-oximetro", false);
            core.getFlag("oximetro").setValue(true);
        }

        function postoEnfermagemFecharGaveta() {
            L.log("Action: fechar_gaveta");
            core.closeModalScene("Gaveta");
            if(level.getFlag("termometro").getValue() == true &&
                level.getFlag("oximetro").getValue() == true &&
                level.getFlag("medidor-pressao").getValue() == true)
                core.setActionVisible("btn-ir_corredor", true);
        }

        // Actions
        posto_de_enfermagem.registerAction(
            new Action("btn-ir_corredor", "Ir ao corredor",
                "action-ir_corredor",postoEnfermagemIrCorredor, visibility));

        posto_de_enfermagem.registerAction(
            new Action("btn-abrir_gaveta", "Abrir gaveta",
                "action-abrir_gaveta", postoEnfermagemAbrirGaveta, visibility));

        var gaveta = new Scene("Gaveta", "modalScene-gaveta");

        gaveta.registerAction(
            new Action("btn-fechar_gaveta", "Fechar gaveta",
                "action-fechar_gaveta", postoEnfermagemFecharGaveta, visibility));

        gaveta.registerAction(
            new Action("btn-termometro", "Pegar termômetro",
                "action-pegar_termometro", postoEnfermagemPegarTermometro, visibility));

        gaveta.registerAction(
            new Action("btn-medidor_pressao", "Pegar medidor pressão",
                "action-pegar_medidor_pressao", postoEnfermagemPegarMedidorPressao, visibility));

        gaveta.registerAction(
            new Action("btn-oximetro", "Pegar oxímetro",
                "action-pegar_oximetro", postoEnfermagemPegarOximetro, visibility));

        gaveta.registerInteractiveObject(
            new InteractiveObject("io-termometro", "Termômetro",
                "intObj-termometro", postoEnfermagemPegarTermometro));

        gaveta.registerInteractiveObject(
            new InteractiveObject("io-medidor_pressao", "Medidor de pressão",
                "intObj-medidor_pressao", postoEnfermagemPegarMedidorPressao));

        gaveta.registerInteractiveObject(
            new InteractiveObject("io-oximetro", "Oxímetro",
                "intObj-oximetro", postoEnfermagemPegarOximetro));

        level.registerModalScene(gaveta);

        /*
         Scene:  Fim do Tutorial
         */
        var fim_tutorial = new Scene("Fim da fase", "scene-fim-level",
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
            core.changeLevelTo(1);
        }

        // Actions
        fim_tutorial.registerAction(
            new Action("btn-proxima_fase", "Ir a recepção",
                "action-ir_recepcao", fimTutorialIrCorredor, visibility));

        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);
        level.registerScene(fim_tutorial);

        level.setInitialScene(0);

        game.registerLevel(level, 0);
        L.groupEnd();
    });