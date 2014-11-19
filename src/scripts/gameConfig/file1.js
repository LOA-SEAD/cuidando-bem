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

        var flags_on = true;    // if false it wont check for flags -- tests purpose

        if (flags_on)
            var visibility = false;
        else
            var visibility = true;

        /*
         Scene:  Recepcao
         */
        var recepcao = new Scene("recepcao", "scene-recepcao",
            recepcaoOnLoad, recepcaoOnUnload);
        // Flags
        level.registerFlag(new Flag("conversar_recepcionista"), false);

        // Dialogs
        var fala_recepcionista = [];
        fala_recepcionista[0] = new Dialog("recepcionista", "char-recepcionista",
            "Bom dia, você parece novo por aqui. Como posso ajudá-lo?");
        fala_recepcionista[0].registerOption({
            text: "Bom dia, sou o novo técnico de enfermagem contratado",
            actionFunction: function () {
                level.getFlag("conversar_recepcionista").setValue(true);
                L.log("Selecionado 1a opção diálogo: " + level.getFlag("conversar_recepcionista").getValue());
                core.closeDialog(0);
                core.openDialog(1);
            }});

        fala_recepcionista[1] = new Dialog("recepcionista", "char-recepcionista",
            "A sim o funcionário novo! O Enfermeiro mentor está lhe esperando no corredor");
        fala_recepcionista[1].registerOption({
            text: "Obrigado",
            actionFunction: function () {
                L.log("Encerrar o diálogo");
                core.closeDialog(1);
                core.setActionVisible("Ir ao corredor", true);
                core.setActionVisible("Conversar com a recepcionista", true);
                core.setInteractiveObjectVisible("Ir para o corredor esquerda", true);
                core.setInteractiveObjectVisible("Ir para o corredor direita", true);
                core.setInteractiveObjectVisible("Conversar com a recepcionista", true);
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
            new Action("Ir ao corredor", "action-ir_corredor", recepcaoIrCorredor, visibility));

        recepcao.registerAction(
            new Action("Conversar com a recepcionista", "action-abrir_dialogo", conversarRecepcionista, visibility));

        // Interactive Objects
        // # 3 - Falar com recepcionista
        recepcao.registerInteractiveObject(
            new InteractiveObject("Conversar com a recepcionista", "intObj-falar_com_recepcionista", conversarRecepcionista, visibility));

        recepcao.registerInteractiveObject(
            new InteractiveObject("Ir para o corredor esquerda", "intObj-ir_corredor_esq", recepcaoIrCorredor, visibility));

        recepcao.registerInteractiveObject(
            new InteractiveObject("Ir para o corredor direita", "intObj-ir_corredor_dir", recepcaoIrCorredor, visibility));

        /*
         Scene:  Corredor
         */
        var corredor = new Scene("corredor", "scene-corredor", corredorOnLoad, corredorOnUnLoad);

        // Flags
        level.registerFlag(new Flag("conversar_mentor", false));
        level.registerFlag(new Flag("passagem_corredor", 0));

        // Dialogs
        var fala_mentor = [];
        fala_mentor[0] = new Dialog("mentor", "char-mentor",
                "Bom dia! Seja bem vindo ao Hospital Cuidando Bem! É um prazer tê-lo como parte integrante de nossa " +
                "equipe. Espero que dê tudo certo,  nesta instituição seguimos a missão e filosofia de garantir a " +
                "segurança de nossos clientes, utilizando os protocolos de segurança do paciente");
        fala_mentor[0].registerOption({
            text: "Obrigado! Espero conseguir atender suas expectativas",
            actionFunction: function () {
                level.getFlag("conversar_mentor").setValue(true);
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_mentor[1] = new Dialog("mentor", "char-mentor",
            "Agora por aqui, me acompanhe até a enfermaria masculina");
        fala_mentor[1].registerOption({
            text: "Encerrar diálogo",
            actionFunction: function () {
                core.closeDialog(1);
                core.setActionVisible("Ir para a sala de leitos masculino", true);
                core.setActionVisible("Conversar com Mentor", true);
                core.setInteractiveObjectVisible("Ir para a sala de leitos masculino", true);
            }
        });

        corredor.registerDialogs(fala_mentor);

        // Functions
        function corredorOnLoad() {
            switch (level.getFlag("passagem_corredor").getValue()){
                case 0: // first time at 'corredor'
                    core.setInteractiveObjectVisible("Conversar com Mentor", true);
                    core.openDialog(0);
                    break;
                case 1: // second time at 'corredor'
                    core.setActionVisible("Ir para o posto de enfermagem", true);
                    core.setActionVisible("Ir para a sala de leitos masculino", false);
                    core.setActionVisible("Conversar com Mentor", false);
                    core.setInteractiveObjectVisible("Conversar com Mentor", false);
                    break;
                case 2:
                    core.setActionVisible("Ir para o posto de enfermagem", false);
                    core.setActionVisible("Ir para a sala de leitos masculino", true);
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
            new Action("Conversar com Mentor", "action-abrir_dialogo", dialogarMentor, visibility));

        corredor.registerAction(
            new Action("Ir para a sala de leitos masculino", "action-ir_sala_de_leitos", corredorIrSalaLeitos, visibility));

        corredor.registerAction(
            new Action("Ir para o posto de enfermagem", "action-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("Ir para a sala de leitos masculino", "intObj-ir_sala_de_leitos", corredorIrSalaLeitos, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("Ir para o posto de enfermagem", "intObj-ir_posto_de_enfermagem", corredorIrPostoEnfermagem, visibility));

        corredor.registerInteractiveObject(
            new InteractiveObject("Conversar com Mentor", "intObj-conversar-mentor", dialogarMentor, visibility));

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
                    core.setActionVisible("Ir ao leito", true);
                    core.setActionVisible("Ir ao corredor", false);
                    break;
                case 1:
                    core.setActionVisible("Ir ao leito", false);
                    core.setActionVisible("Ir ao corredor", true);
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
            new Action("Ir ao corredor", "action-ir_corredor", salaLeitosIrCorredor, visibility));
        sala_de_leitos.registerAction(
            new Action("Ir ao leito", "action-ir_leito", salaLeitosIrLeito, visibility));

        /*
         Scene: Leito
         */
        var leito = new Scene("leito", "scene-leito", leitoOnLoad, leitoOnUnload);

        // Flags
        level.registerFlag(new Flag("visita-leito", 0));
        level.registerFlag(new Flag("lavar-maos", 0));

        // Dialogs
        var fala_cena3_leito_masculino = [];
        fala_cena3_leito_masculino[0] = new Dialog("mentor", "char-mentor",
            "Este é o Senhor Antônio, seu primeiro paciente. Um dos principais protocolos de segurança é " +
            "se certificar que a identificação dele está correta, ou seja, o paciente certo e também se apresentar");
        fala_cena3_leito_masculino[0].registerOption({
            text: "Olá Senhor Antônio, como você se sente hoje? " +
            "Sou o novo técnico de enfermagem que cuidará do senhor hoje",
            actionFunction: function () {
                core.closeDialog(0);
                core.openDialog(1);
            }
        });

        fala_cena3_leito_masculino[1] = new Dialog("paciente", "char-paciente",
            "Eu me sinto com muita dor de cabeça e passei muito nervoso hoje, acho que minha pressão subiu. " +
            "Estou assustado é a primeira vez que preciso ser internado em um hospital");
        fala_cena3_leito_masculino[1].registerOption({
            text: "Vamos fazer o que for possível para que sua estadia aqui seja rápida e o " +
            "mais confortável possível. Mas primeiro como é o nome completo seu e sua data de nascimento?",
            actionFunction: function () {
                core.closeDialog(1);
                core.openDialog(2);
            }
        });

        fala_cena3_leito_masculino[2] = new Dialog("paciente", "char-paciente",
            "Meu nome é Antônio Moraes Casagrande, nasci no dia 07-06-1956");
        fala_cena3_leito_masculino[2].registerOption({
            text: "Encerrar dialogo",
            actionFunction: function () {
                core.closeDialog(2);
                core.openDialog(3);
            }
        });

        fala_cena3_leito_masculino[3] = new Dialog("mentor", "char-mentor",
            "Está é a sua primeira missão! E você terá que admitir este paciente nesta enfermaria identificando " +
            "ele com a pulseira e aferir o SSVV. Mas antes você terá que ir até o posto de enfermagem retirar " +
            "os instrumentos para aferição dos sinais vitais");
        fala_cena3_leito_masculino[3].registerOption({
            text: "Encerrar dialogo",
            actionFunction: function () {
                core.closeDialog(3);
                core.setActionVisible("Checar pulseira paciente", true);
            }
        });

        var fala_cena4_leito_masculino = [];

        fala_cena4_leito_masculino[0] = new Dialog("jogador", "char-jogador",
            "");
        fala_cena4_leito_masculino[0].registerOption({
            text: "Senhor Antônio, vou identificar você com esta pulseira. Ela é necessária para identificarmos o " +
            "senhor corretamente, para que ninguém o confunda, é importante também a cada procedimento, você pedir " +
            "para que o profissional da saúde, confira se realmente é você o paciente, que ele realizará o " +
            "procedimento. Agora vou precisar ver os sinais vitais seu, que são a pressão arterial, a frequência " +
            "cardíaca, frequência respiratória, saturação de O2 e temperatura",
            actionFunction: function () {
                core.closeDialog(4);
                core.openDialog(5);
            }
        });

        fala_cena4_leito_masculino[1] = new Dialog("paciente", "char-paciente",
            "Tudo bem, agora o que estiver alterado você já pode ir me avisando");
        fala_cena4_leito_masculino[1].registerOption({
            text: "Encerrar Diálogo",
            actionFunction: function () {
                core.closeDialog(5);
                core.setActionVisible("Lavar as mãos", true);
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
                    core.setActionVisible("Ir para sala de leitos", false);
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
                    core.setActionVisible("Medir frequência respiratória", true);
                    core.setActionVisible("Medir pulso", true);
                    core.setActionVisible("Medir temperatura", true);
                    core.setActionVisible("Lavar as mãos", false);
                    break;
                case 2:
                    level.getFlag("lavar-maos").setValue(3);
                    core.setActionVisible("Lavar as mãos", false);
                    core.setActionVisible("Anotar prontuario", true);
                    break;
            }
        }

        function leitoMedirTemperatura(){
            L.log("Action: medir_temperatura");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("termometro").setValue(true);
                core.setActionVisible("Medir temperatura", false);

                if(level.getFlag("oximetro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                {
                    core.setActionVisible("Lavar as mãos", true);
                    core.getFlag("lavar-maos").setValue(2);
                }
            }
        }

        function leitoMedirPulso(){
            L.log("Action: medir_pulso");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("medidor-pressao").setValue(true);
                core.setActionVisible("Medir pulso", false);

                if(level.getFlag("termometro").getValue() == true && level.getFlag("oximetro").getValue() == true)
                {
                    core.setActionVisible("Lavar as mãos", true);
                    core.getFlag("lavar-maos").setValue(2);
                }
            }
        }

        function leitoMedirFreqRespiratoria(){
            L.log("Action: medir_freq_respiratoria");
            if(level.getFlag("lavar-maos").getValue() >= 1){

                level.getFlag("oximetro").setValue(true);
                core.setActionVisible("Medir frequência respiratória", false);

                if(level.getFlag("termometro").getValue() == true && level.getFlag("medidor-pressao").getValue() == true)
                {
                    core.setActionVisible("Lavar as mãos", true);
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
            core.setActionVisible("Confirmar pulseira", true);
            core.setInteractiveObjectVisible("Confirmar pulseira", true);
        }

        // Actions

        leito.registerAction(
            new Action("Ir para sala de leitos", "action-ir_sala_de_leitos", leitoIrCorredor, visibility));

        leito.registerAction(
            new Action("Checar pulseira paciente", "action-pulseira_paciente", leitoPulseiraPaciente, visibility));

        leito.registerAction(
            new Action("Lavar as mãos", "action-lavar_maos", leitoLavarMaos, visibility));

        leito.registerAction(
            new Action("Medir temperatura", "action-medir_temperatura", leitoMedirTemperatura, visibility));

        leito.registerAction(
            new Action("Medir pulso", "action-medir_pulso", leitoMedirPulso, visibility));

        leito.registerAction(
            new Action("Medir frequência respiratória", "action-medir_freq_respiratoria", leitoMedirFreqRespiratoria, visibility));

        leito.registerAction(
            new Action("Anotar prontuario", "action-anotar_prontuario", anotarProntuario, visibility));

        /*
            Modal
         */

        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        function postoEnfermagemLargarPulseira(){
            L.log("Ação: Fechar modal pulseira");
            core.closeModalScene("Pulseira");
            core.setActionVisible("Ir para sala de leitos", true);
            core.setActionVisible("Checar pulseira paciente", false);
        }

        function postoEnfermagemConfirmarPulseira(){
            L.log("Ação: Confirmar pulseira");
            core.setActionVisible("Confirmar pulseira", false);
            core.setInteractiveObjectVisible("Confirmar pulseira", false);
            core.setActionVisible("Largar pulseira", true);
        }

        pulseira.registerAction(
            new Action("Largar pulseira", "action-pulseira_paciente", postoEnfermagemLargarPulseira, visibility));

        pulseira.registerAction(
            new Action("Confirmar pulseira", "action-confirmar_pulseira", postoEnfermagemConfirmarPulseira, visibility));

        pulseira.registerInteractiveObject(
            new Action("Confirmar pulseira", "intObj-confirmar_pulseira", postoEnfermagemConfirmarPulseira, visibility));

        level.registerModalScene(pulseira);
        /*
        leito.registerAction(
            new Action("pulseira_paciente", "action-pulseira_paciente", leitoPulseiraPaciente));

        leito.registerAction(
            new Action("confirmar_paciente", "action-confirmar_paciente", leitoConfirmarPaciente));

        leito.registerAction(
            new Action("fechar_pulseira", "action-fechar_pulseira", leitoFecharPulseira));
        */

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
            core.setActionVisible("Abrir gaveta", true);
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

            core.setActionVisible("Fechar gaveta", true);
            if(core.getFlag("termometro").getValue() != true)
                core.setActionVisible("Pegar termômetro", true);
            if(core.getFlag("medidor-pressao").getValue() != true)
                core.setActionVisible("Pegar medidor pressão", true);
            if(core.getFlag("oximetro").getValue() != true)
                core.setActionVisible("Pegar oxímetro", true);
        }

        function postoEnfermagemPegarTermometro() {
            L.log("Action: pegar_termometro");
            core.setInteractiveObjectVisible("Termômetro", false);
            core.setActionVisible("Pegar termômetro", false);
            core.getFlag("termometro").setValue(true);
        }

        function postoEnfermagemPegarMedidorPressao() {
            L.log("O medidor de pressão foi ativado");
            core.setInteractiveObjectVisible("Medidor de pressão", false);
            core.setActionVisible("Pegar medidor pressão", false);
            core.getFlag("medidor-pressao").setValue(true);
        }

        function postoEnfermagemPegarOximetro() {
            L.log("Action: pegar_oximetro");
            core.setInteractiveObjectVisible("Oxímetro", false);
            core.setActionVisible("Pegar oxímetro", false);
            core.getFlag("oximetro").setValue(true);
        }

        function postoEnfermagemFecharGaveta() {
            L.log("Action: fechar_gaveta");
            core.closeModalScene("Gaveta");
            if(level.getFlag("termometro").getValue() == true &&
                level.getFlag("oximetro").getValue() == true &&
                level.getFlag("medidor-pressao").getValue() == true)
                core.setActionVisible("Ir ao corredor", true);
        }

        // Actions
        posto_de_enfermagem.registerAction(
            new Action("Ir ao corredor", "action-ir_corredor",postoEnfermagemIrCorredor, visibility));

        posto_de_enfermagem.registerAction(
            new Action("Abrir gaveta", "action-abrir_gaveta", postoEnfermagemAbrirGaveta, visibility));

        var gaveta = new Scene("Gaveta", "modalScene-gaveta");

        gaveta.registerAction(
            new Action("Fechar gaveta", "action-fechar_gaveta", postoEnfermagemFecharGaveta, visibility));

        gaveta.registerAction(
            new Action("Pegar termômetro", "action-pegar_termometro", postoEnfermagemPegarTermometro, visibility));

        gaveta.registerAction(
            new Action("Pegar medidor pressão", "action-pegar_medidor_pressao", postoEnfermagemPegarMedidorPressao, visibility));

        gaveta.registerAction(
            new Action("Pegar oxímetro", "action-pegar_oximetro", postoEnfermagemPegarOximetro, visibility));

        gaveta.registerInteractiveObject(
            new InteractiveObject("Termômetro", "intObj-termometro", postoEnfermagemPegarTermometro));

        gaveta.registerInteractiveObject(
            new InteractiveObject("Medidor de pressão", "intObj-medidor_pressao", postoEnfermagemPegarMedidorPressao));

        gaveta.registerInteractiveObject(
            new InteractiveObject("Oxímetro", "intObj-oximetro", postoEnfermagemPegarOximetro));

        level.registerModalScene(gaveta);

        /*
         Scene:  Fim do Tutorial
         */
        var fim_tutorial = new Scene("fim_tutorial", "scene-fim_tutorial",
            fimTutorialOnload, fimTutorialOnUnload);

        // Flags

        // Dialogs

        // Functions
        function fimTutorialOnload(){
            core.setActionVisible("Proxima fase", true);
        }

        function fimTutorialOnUnload(){

        }

        function fimTutorialIrCorredor(){

        }

        fim_tutorial.registerAction(
            new Action("Proxima fase", "action-proxima-fase", function(){

                }
        , visibility));

        // Actions
        fim_tutorial.registerAction(
            new Action("Ir ao corredor", "action-ir_corredor", fimTutorialIrCorredor, visibility));


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