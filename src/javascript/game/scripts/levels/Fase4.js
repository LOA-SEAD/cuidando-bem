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
                core.closeDialog();
                core.changeScene(1);
                console.log("Ir para o corredor");
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
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.recepcao[0], function(){
                    core.openDialog(1);
                }),

            // Dialog 1
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

        //Corredor
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([

        ]);

        function corredorIrSalaLeitos () {
            console.log("Va para sala de leitos");
            core.changeScene(2);
        }

        function corredorIrPostoEnfermagem () {
            if(level.getFlag("conversar_paciente").getValue() == false) {
                alert("Mentor corrige");
            } else {
                core.changeScene(4);
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
                .setVisibility(true)

        ]);
        //endregion

        //region Sala de Leitos
        var sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")

            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Load scene: " + sala_de_leitos.getName());
                    core.setInteractiveObjectVisible("io-ir_leito", true);
                    core.setInteractiveObjectVisible("io-ir_corredor", true);

            })

        sala_de_leitos.registerActions([
            /*new Action("btn-falar_com_paciente_ala", "Falar com paciente")
                .setCssClass("action-falar_com_paciente_pedro")
                .onClick(function (){
                   
                })
                .setVisibility(true),*/

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: lavar_maos");
                    if(level.getFlag("lavar-maos").getValue() == false){
                        level.getFlag("lavar-maos").setValue(true);

                        //temp
                        alert("Lavou a mão uma vez");
                    }else{
                        // temp
                        alert("Já lavou a mão");
                    }
                   
                })
                .setVisibility(true)

        ]);

        sala_de_leitos.registerDialogs([

        ]);

        sala_de_leitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-fase4")
                .onClick(function (){
                    core.changeScene(3);
                })
                .setVisibility(visibility),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    core.changeScene(1);
                })
                .setVisibility(visibility),

            new InteractiveObject("io-ler_prontuario", "Ler prontuário")
                .setCssClass("intObj-prontuario-leito1-fase4")
                .onClick(function () {
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(true)

        ]);

        //endregion

        //region Leito
        var leito = lib.scenes.leitos.pedro.getClone()
            .onLoad(function () {
                console.log("Leito: Onload");
                core.setInteractiveObjectVisible("io-pulseira_paciente", true);
                core.openDialog(0);

                //force case 1
                //level.getFlag("visita-leito").setValue(1);
                // delete here

                switch (level.getFlag("visita-leito").getValue()){
                    case 0:
                        core.openDialog(0);
                        break;
                    case 1:
                        core.setActionVisible("btn-ir_sala_leitos", false);
                        core.openDialog(11);
                        level.getFlag("termometro").setValue(false);
                        level.getFlag("medidor-pressao").setValue(false);
                        level.getFlag("oximetro").setValue(false);
                        level.getFlag("relogio").setValue(false);
                        break;
                }
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                level.getFlag("visita-leito").setValue(1);
                core.closeCommandBar();
            });

        //region Leito - Dialogs
        leito.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.ala_masculina[0], function(){
                    core.openDialog(1);
                }),
            // Dialog 1
            new Dialog(lib.characters.pacientes.pedro)
                .setText(Dialogs.ala_masculina[1])
                .registerOption("", function () {
                    core.openDialog(2);
                }),
            // Dialog 2
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.ala_masculina[2], function () {
                    core.closeDialog();
                })
                .registerOption(Dialogs.ala_masculina[3], function () {
                    core.closeDialog();
                })
                .registerOption(Dialogs.ala_masculina[4], function () {
                    core.closeDialog();
                })
                .setRandomize(true)
        ]);
        //endregion

        //region Leito - interactiveObjects and Actions
        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_01-checar_pulseira")
                .onClick(function () {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                    if(level.getFlag("pulseira").getValue() == false)
                        core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
                })
                .setVisibility(visibility)

        ]);

        leito.registerActions([

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    if(Pulseira.isAllDataValid()){
                        console.log("Action: action-ir_sala_de_leitos");
                        core.registerScoreItem(Scores.tutorial.identificarPaciente);
                        core.setActionVisible("btn-perguntar_nome_do_paciente", false);
                        core.changeScene(2);
                        Pulseira.disable();
                    }else{
                        core.closeCommandBar();
                        core.openDialog(17);
                        console.log("Alguns dados da pulseira estão incorretos");
                    }
                })
                .setVisibility(true),

            new Action("btn-perguntar_nome_do_paciente", "Perguntar nome do paciente")
                .setCssClass("action-perguntar_nome_char1")
                .onClick(function (){
                    core.openDialog(18);
                    core.closeCommandBar();
                })
                .setVisibility(true),
            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    console.log("Action: lavar_maos");

                    //TODO Clean this mess PLEASE
                    switch (level.getFlag("lavar-maos").getValue()){
                        case 0:
                            level.getFlag("lavar-maos").setValue(1);
                            core.registerScoreItem(Scores.tutorial.lavarMaosAntes);
                            core.setActionVisible("btn-frequencia_respiratoria", true);
                            core.setActionVisible("btn-medir_pulso", true);
                            core.setActionVisible("btn-medir_temperatura", true);
                            core.setActionVisible("btn-saturacao_02", true);
                            core.setActionVisible("btn-ler_prontuario", true);
                            //core.setActionVisible("btn-lavar_maos", false);
                            break;
                        case 2:
                            // level.getFlag("lavar-maos").setValue(3);
                            // core.registerScoreItem(Scores.tutorial.lavarMaosDepois);
                            // core.setActionVisible("btn-lavar_maos", false);
                            // core.setActionVisible("btn-ler_prontuario", true);
                            break;
                    }

                    if(checouTodosAparelhos()) {
                        level.getFlag("lavar-maosDepois").setValue(true);
                        core.registerScoreItem(Scores.tutorial.lavarMaosDepois);
                    }

                })
                .setVisibility(visibility),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(true)
        ]);
        //endregion

        // region prontuario
        prontuario = new Scene("Prontuario", "modalScene-prontuario_pedro");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                })

        ]);
        //endregion

        level.setSetupScript(function(){

            Prontuario.setNome("Pedro Alcídes Mendonça");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Solteiro");
            Prontuario.setDataNascimento("03/06/1962");
            Prontuario.setIdade("62 anos");
            Prontuario.setProfissao("Professor");
            Prontuario.setPai("Aldair Mendonça");
            Prontuario.setMae("Ana Laura Alcídes Mendonça ");

            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("10/10/2015");
            Prontuario.setLeito("01 - Leito Masculino");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório.");
            Prontuario.setObservacoes("Está no 2.º dia de uso de Cefalotina Sódica (Keflin®)");

            Prontuario.setPeso("62");
            Prontuario.setAltura("1,77");
            Prontuario.setCircunferenciaAbdominal("91");

            Prontuario.setPrescEnfermagemState("decubito");

            Prontuario.setPrescMedicaRowData(0, "15/03", "Cefalotina sódica (Keflin®)", "Endovenosa", "800 mg diluído em 100 ml de SF (soro fisiológico) 0,9% em 01 hora", "6/6h", "Administrado medicação sem intercorrência<br />(X) Administrado medicação com intercorrência", true);
            Prontuario.setPrescMedicaRowData(1, '', '', '', '', '', '', false);

            Prontuario.setSsvvRowData(0, '15/03', '110x70', '55', '16', '96', '37.3', true);
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
        });

        //region Register Scenes

        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
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
        level.registerFlag(new Flag("folheto_dos_nove_certos", false));
        level.registerFlag(new Flag("passagem_sala-de-leitos", 0));
        level.registerFlag(new Flag("visita-leito", 0));
        // level.registerFlag(new Flag("pulseira", false));
        level.registerFlag(new Flag("lavar-maos", false));
        level.registerFlag(new Flag("lavar-maosDepois", false));
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