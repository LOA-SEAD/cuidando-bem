/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */
define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core', 'Commons'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, Commons) {

        //region Imports
        var Dialogs = require('Dialogs').fase1;
        var Alerts = require('Dialogs').alertas;
        //endregion

        var level = new Level("Level 1");
        console.groupCollapsed(level.getName());

        var flags_on = true;
        var visibility = false;

        //region Scenes

        //region Recepcao
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
        //endregion

        //region Corredor
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

                        console.log("Muda visibilidade de Actions: " + false);
                        core.setActionVisible("btn-ir_ala_masculina", false);
                        core.setActionVisible("btn-ir_posto_enfermagem", false);

                        console.log("Muda visibilidade dos Dialogos: " + false);
                        core.setActionVisible("btn-falar_mentor_01", false);
                        core.setActionVisible("btn-falar_mentor_02", false);

                        core.openDialog(1);
                    }
                    else if(level.getFlag("buscar_coxim").getValue() == true){
                        console.log("Mentor: Ação incorreta");
                        core.openDialog(5);
                    }
                    else if(level.getFlag("pegou_coxim").getValue() == true){
                        console.log("Muda visibilidade dos Dialogos: " + false);
                        core.setActionVisible("btn-falar_mentor_01", false);
                        core.setActionVisible("btn-falar_mentor_02", false);
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

        corredor.registerDialogs([
            new Dialog("mentor", "char-mentor")
                .setText(Dialogs.corredor.fala1[0])
                .registerOption(Dialogs.corredor.fala1[1], function () {
                    core.closeDialog(0);

                    console.log("Muda visibilidade de Actions: " + true);
                    core.setActionVisible("btn-ir_ala_masculina", true);
                    core.setActionVisible("btn-ir_posto_enfermagem", true);

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

                    console.log("Muda visibilidade de Actions: " + true);
                    core.setActionVisible("btn-ir_ala_masculina", true);
                    core.setActionVisible("btn-ir_posto_enfermagem", true);
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
        corredor.registerActions([
            new Action("btn-falar_mentor_01", "Falar com mentor")
                .setCssClass("action-abrir_dialogo")
                .setFunction(function(){core.openDialog(0);})
                .setVisible(visibility),


            new Action("btn-falar_mentor_02", "Falar com mentor")
                .setCssClass("action-abrir_dialogo")
                .setFunction(function(){core.openDialog(1);})
                .setVisible(visibility),


            new Action("btn-ir_ala_masculina", "Ir para a ala masculina")
                .setCssClass("action-ir_sala_de_leitos")
                .setFunction( function () {
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
                })
                .setVisible(visibility),


            new Action("btn-ir_posto_enfermagem", "Ir para o posto de enfermagem")
                .setCssClass("action-ir_posto_de_enfermagem")
                .setFunction(function () {
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
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Ala Masculina
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

        ala_masculina.registerDialogs([
            new Dialog("mentor", "char-mentor")
                .setText(alerta_mentor[1])
                .registerOption(alerta_resposta[1], function () {
                    core.closeDialog(0);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(alerta_mentor[2])
                .registerOption(alerta_resposta[2], function () {
                    core.closeDialog(1);
                }),

            new Dialog("mentor", "char-mentor")
                .setText(alerta_mentor[5])
                .registerOption(alerta_resposta[5], function () {
                    core.closeDialog(2);
                })
        ]);

        ala_masculina.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .setFunction( function (){
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
                })
                .setVisible(visibility),

            new Action("btn-ir_leito", "Ir ao leito")
                .setCssClass("action-leito-char-02")
                .setFunction(function (){
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
                })
                .setVisible(visibility),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .setFunction(function (){
                    console.log("Action: lavar as maos");
                    core.getFlag("lavar_maos").setValue(true);
                })
                .setVisible(visibility),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .setFunction( function (){
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
                })
                .setVisible(visibility)
        ]);

        function ala_masculinaAction(_status){
            core.setActionVisible("btn-ir_corredor", _status);
            core.setActionVisible("btn-ir_leito", _status);
            core.setActionVisible("btn-lavar_maos", _status);
        }

        //endregion

        //region Leito
        var leito = new Scene("leito", "scene-leito-char-02", leitoOnLoad, leitoOnUnload)
            .setLoadFunction(function (){
                if(flags_on == true){
                    if(level.getFlag("conversar_paciente").getValue() == true){
                        level.getFlag("conversar_paciente").setValue(false);
                        core.openDialog(0);
                    }
                    else{
                        if(level.getFlag("pegou_coxim").getValue() == true){

                            console.log("Leito visibilidade acoes: " + false);
                            core.setActionVisible("btn-ir_ala_masculina", false);
                            core.setActionVisible("btn-ver_pulseira", false);
                            core.setActionVisible("btn-conversar_paciente", false);
                            core.setActionVisible("btn-examinar_paciente", false);

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

        leito.registerDialogs([
            new Dialog("Jogador", "char-jogador")
                .setText("")
                .registerOption(Dialogs.enfermaria[0], function() {
                    core.closeDialog(0);
                    core.openDialog(1);
                }),

            new Dialog("Paciente Carlos", "char-paciente-02")
                .setText(Dialogs.enfermaria[1])
                .registerOption(Dialogs.enfermaria[2], function() {
                    core.closeDialog(1);
                    core.openDialog(2);
                }),


            new Dialog("Paciente Carlos", "char-paciente-02")
                .setText(Dialogs.enfermaria[3])
                .registerOption(Dialogs.enfermaria[4], function() {
                    core.closeDialog(2);
                    core.setActionVisible("btn-ir_ala_masculina", true);
                    core.setActionVisible("btn-ver_pulseira", true);
                    core.setActionVisible("btn-conversar_paciente", true);
                })

        ]);

        leito.registerActions([
            new Action("btn-ir_ala_masculina", "Ir para ala masculina")
                .setCssClass("action-ir_sala_de_leitos")
                .setFunction(function (){
                    console.log("Action: action-ir_ala_masculina");
                    core.changeScene(2);
                })
                .setVisible(visibility),

            new Action("btn-ver_pulseira", "Ver pulseira")
                .setCssClass("action-pulseira_paciente")
                .setFunction(function (){
                    console.log("Action: Ver pulsiera");
                    core.openModalScene("Pulseira");
                    core.setActionVisible("btn-largar_pulseira", true);
                    core.setActionVisible("btn-confirmar_pulseira", true);
                })
                .setVisible(visibility),

            new Action("btn-conversar_paciente", "Conversar paciente")
                .setCssClass("action-abrir_dialogo")
                .setFunction(  function dialogarPaciente(){
                    core.openDialog(0);
                })
                .setVisible(visibility),

            new Action("btn-examinar_paciente", "Examinar paciente")
                .setCssClass("action-examinar_paciente")
                .setFunction( function (){
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
                })
                .setVisible(visibility),

            new Action("btn-mudar_posicao_paciente", "Mudar posição do paciente")
                .setCssClass("action-mudar_posicao_paciente")
                .setFunction( function (){
                    console.log("Action: mudar posição do paciente");
                    core.setActionVisible("btn-mudar_posicao_paciente", false);
                    core.changeSceneCssClassTo("scene-leito-char-02-virado");
                    core.setActionVisible("btn-posicionar_coxim", true);
                })
                .setVisible(visibility),

            new Action("btn-posicionar_coxim", "Posicionar coxim e o travesseiro")
                .setCssClass("action-posicionar_coxim")
                .setFunction( function (){
                    console.log("Action: posicionar coxim");
                    level.getFlag("posicionou_coxim").setValue(true);
                    core.changeSceneCssClassTo("scene-leito-char-02-coxim");
                    core.setActionVisible("btn-posicionar_coxim", false);
                    core.setActionVisible("btn-ir_ala_masculina", true);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Posto de Enfermagem
        var posto_de_enfermagem = new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem")
            .setLoadFunction(function (){
                core.setActionVisible("btn-abrir_gaveta", true);
                core.setActionVisible("btn-ir_corredor", true);
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
                .setFunction(function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("Gaveta");
                    gavetaActions(true);

                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Fim Alfa
        var fim_alfa = new Scene("Fim da fase", "scene-fim-alfa")
            .setLoadFunction(core.setActionVisible("btn-voltar_menu", true));

        fim_alfa.registerActions([
            new Action("btn-voltar_menu", "Voltar ao Menu Principal")
                .setCssClass("action-voltar_menu")
                .setFunction(function (){
                    console.log("Voltar ao menu");
                    core.goBackToMenu();
                })
                .setVisible(visibility)
        ]);
        //endregion

        //endregion

        //region Modal Scene

        //region Prontuario
        var prontuario = new Scene("Prontuario", "modalScene-prontuario_carlos");

        prontuario.registerActions([
            new Action("btn-anotar_prontuario", "Anotar prontuário")
                .setCssClass("action-anotar_prontuario")
                .setFunction(function (){
                    console.log("Anotar prontuario");
                    // Fim do level
                    core.closeModalScene("Prontuario");
                    core.changeScene(5);
                })
                .setVisible(true)
        ]);
        //endregion

        //region Paciente
        var carlos_esme_gouvea = new Scene("Carlos Esme Gouvea", "modalScene-carlos_esme_gouvea");
        carlos_esme_gouvea.registerActions([
            new Action("btn-fechar_carlos", "Fechar Carlos")
                .setCssClass("action-fechar_modal")
                .setFunction(function() {core.closeModalScene("Carlos Esme Gouvea");})
                .setVisible(true)
        ]);
        //endregion

        //region Pulseira
        var pulseira = new Scene("Pulseira", "modalScene-pulseira");

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Largar pulseira")
                .setCssClass("action-pulseira_paciente")
                .setFunction( function (){
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    if(level.getFlag("confirmar_pulseira").getValue() == true){
                        core.setActionVisible("btn-examinar_paciente", true);
                    }
                })
                .setVisible(visibility),

            new Action("btn-confirmar_pulseira", "Confirmar pulseira")
                .setCssClass("action-confirmar_pulseira")
                .setFunction(function (){
                    console.log("Ação: Confirmar pulseira");
                    level.getFlag("confirmar_pulseira").setValue(true);
                })
                .setVisible(visibility)
        ]);
        //endregion

        //region Gaveta
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
        var gaveta = new Scene("Gaveta", "modalScene-gaveta");
        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .setFunction(function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                    gavetaActions(false);
                })
                .setVisible(visibility),

            new Action("btn-coxim", "Pegar coxim")
                .setCssClass("action-pegar_coxim")
                .setFunction(function (){
                    console.log("Action: pegar coxim");
                    level.getFlag("buscar_coxim").setValue(false);
                    level.getFlag("pegou_coxim").setValue(true);
                    core.setActionVisible("btn-coxim", false);
                    core.setInteractiveObjectVisible("io-coxim", false);
                })
                .setVisible(visibility),

            new InteractiveObject("io-coxim", "Coxim")
                .setCssClass("intObj-coxim")
                .setFunction(function (){
                    console.log("Action: pegar coxim");
                    level.getFlag("buscar_coxim").setValue(false);
                    level.getFlag("pegou_coxim").setValue(true);
                    core.setActionVisible("btn-coxim", false);
                    core.setInteractiveObjectVisible("io-coxim", false);
                })
        ]);
        //endregion
        //endregion

        //region Level
        level.registerScene(corredor);
        level.registerScene(ala_masculina);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);
        level.registerScene(fim_alfa);

        level.registerModalScene(prontuario);
        level.registerModalScene(gaveta);
        level.registerModalScene(carlos_esme_gouvea);
        level.registerModalScene(pulseira);

        level.registerFlag(new Flag("lavar_maos", false));
        level.registerFlag(new Flag("examinou_paciente", false));

        level.registerFlag(new Flag("conversar_paciente", true));
        level.registerFlag(new Flag("confirmar_pulseira", false));
        level.registerFlag(new Flag("paciente_carlos", 0));
        level.registerFlag(new Flag("posicionou_coxim", false));

        level.registerFlag(new Flag("pegou_coxim", false));

        level.registerFlag(new Flag("mentor_dialogo", true));
        level.registerFlag(new Flag("buscar_coxim", false));

        level.registerScene(recepcao);

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 1);

        console.groupEnd();
    });