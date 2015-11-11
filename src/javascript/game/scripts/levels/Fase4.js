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
                .setVisibility(true),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true)
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
            console.log("Vá para sala de leitos");
            core.changeScene(2);
        }

        function corredorIrPostoEnfermagem () {
            console.log("Vá para o posto de enfermagem");
            core.changeScene(5);
        }

        function corredorIrFarmacia () {
            console.log("Vá para a farmácia");
            core.changeScene(4);
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

            new InteractiveObject("io-ir_farmacia","Ir para a Farmácia")
                .setCssClass("intObj-goToPharmacy")
                .onClick(corredorIrFarmacia)
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
            .onUnload(function (){
                level.getFlag("lavar-maos").setValue(false);
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
                .setVisibility(true),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    core.changeScene(1);
                })
                .setVisibility(true),

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
                core.setActionVisible("btn-ir_sala_leitos", true);

                if(level.getFlag("pegou_prescricao_medica").getValue() == true && level.getFlag("pegou_prescricao_medica").getValue() == true){
                    // after first visit
                    core.openDialog(3);
                }
                else{
                    // the first visit
                    core.openDialog(0);
                }
                    
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                level.getFlag("visita-leito").setValue(true);
                level.getFlag("lavar-maos").setValue(false);
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
                .setRandomize(true),

            // dialog 3
            // after first visit
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito_paciente[0], function(){
                    core.openDialog(4);
                }),
            // Dialog 4
            new Dialog(lib.characters.pacientes.pedro)
                .setText(Dialogs.leito_paciente[1])
                .registerOption("", function () {
                    core.openDialog(5);
                }),
            // Dialog 5
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito_paciente[2], function () {
                    core.openDialog(6);
                })
                .registerOption(Dialogs.leito_paciente[3], function () {
                    core.openDialog(6);
                })
                .registerOption(Dialogs.leito_paciente[4], function () {
                    core.openDialog(6);
                })
                .setRandomize(true),
            // Dialog 6
            new Dialog(lib.characters.pacientes.pedro)
                .setText(Dialogs.leito_paciente[5])
                .registerOption("", function () {
                    core.openDialog(7);
                }),
            // Dialog 7
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.leito_paciente[6], function(){
                    core.openDialog(8);
                }),
            // Dialog 8
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.leito_paciente[7])
                .registerOption("", function(){
                    core.closeDialog();
                })
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
                    if(level.getFlag("verificou_pulseira").getValue() == false)
                        core.setInteractiveObjectVisible("io-confirmar_pulseira", true);
                })
                .setVisibility(true)

        ]);

        leito.registerActions([

            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    if(level.getFlag("verificou_pulseira").getValue() == false){
                        core.registerScoreItem(Scores.tutorial.identificarPaciente);
                    }
                    console.log("Action: action-ir_sala_de_leitos");
                    core.changeScene(2);
                    Pulseira.disable();
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

        //region Farmácia
        function farmaciaIrCorredor() {
            console.log("Funcao: farmacia_ir_corredor");
                core.closeDialog();
                core.changeScene(1);
                console.log("Ir para o corredor");
        }

        var farmacia = new Scene("farmacia", "scene-pharmacy")

        .setCssClass("scene-pharmacy")

        .onLoad(function (){
            if(level.getFlag("pegou_prescricao_medica").getValue() == true){
                core.openDialog(0);
            }
            core.setInteractiveObjectVisible("io-ir_corredor_esquerda", true);
            core.setInteractiveObjectVisible("io-ir_corredor_direita", true);
        });

        farmacia.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.paulo)
                .setText(Dialogs.farmacia[0])
                .registerOption("", function(){
                    core.openDialog(1);
                }),
            // Dialog 1
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.farmacia[1], function () {
                    core.openDialog(2);
                }),
            // Dialog 2
            new Dialog(lib.characters.paulo)
                .setText(Dialogs.farmacia[2])
                .registerOption("", function(){
                    core.openDialog(3);
                }),
            // Dialog 3
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.farmacia[3], function () {
                    core.closeDialog();
                })
        ]);

        farmacia.registerInteractiveObjects([

            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick(farmaciaIrCorredor)
                .setVisibility(true),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(farmaciaIrCorredor)
                .setVisibility(true)

        ]);

        //endregion

        //region Posto de Enfermagem
        posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
                level.getFlag("lavar-maos").setValue(false);
            });

        posto_de_enfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    core.changeScene(1);
                })
                .setVisibility(true),

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

        posto_de_enfermagem.registerDialogs([
            // Dialog 0

        ]);

        posto_de_enfermagem.registerInteractiveObjects([

            new InteractiveObject("io-abrir_gaveta","Abrir gaveta")
                .setCssClass("intObj-openDrawer")
                .onClick(function () {
                    console.log("Action: abrir_gaveta");
                    core.openModalScene("gaveta");
                    core.openCommandBar();

                    core.setInteractiveObjectVisible("io-coxim", !(level.getFlag("coxim").getValue()));
                })
                .setVisibility(true)

        ]);
        //endregion

        //region gaveta
        gaveta = new Scene("gaveta", "Gaveta")
            .setCssClass("modalScene-drawer");

        gaveta.registerActions([
            new Action("btn-fechar_gaveta", "Fechar gaveta")
                .setCssClass("action-fechar_gaveta")
                .onClick( function () {
                    console.log("Action: fechar_gaveta");
                    core.closeModalScene("Gaveta");
                })
                .setVisibility(true)
        ]);

        gaveta.registerInteractiveObjects([
            new InteractiveObject("io-coxim", "Coxim")
                .setCssClass("intObj-cushion")
                .onClick(function () {
                    console.log("IntObj: io-coxim");
                    //level.getFlag("coxim").setValue(true);
                   // core.setInteractiveObjectVisible("io-coxim", false);

                   // if(level.getFlag("score_pegar_coxim").getValue() == false) {
                   //     core.registerScoreItem(Scores.pegarCoxim);
                   // level.getFlag("score_pegar_coxim").setValue(true);
                   // }
                })
                .setVisibility(true)
        ]);

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
                .setVisibility(true),

            new Action("btn-pegar_prescricao_medica", "Pegar prescrição médica")
                .setCssClass("action-pegar_prescricao_medica")
                .onClick(function (){
                    console.log("Action: Pegar prescrição médica");
                    level.getFlag("pegou_prescricao_medica").setValue(true);
                    setVisibility(false);
                })
                .setVisibility(true)
        ]);
        //endregion

        //region pulseira

        var pulseira = new Scene("pulseira", "pulseira");

        pulseira.registerInteractiveObjects([

        ]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function () {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                        level.getFlag("verificou_pulseira").setValue(true);

                        if(level.getFlag("score_verificar_pulseira").getValue() == false) {
                            core.registerScoreItem(Scores.verificarPulseira);
                            level.getFlag("score_verificar_pulseira").setValue(true);
                        }
                    }

                    Pulseira.close();
                })
                .setVisibility(true)
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

            Pulseira.setNameRegExp(/Pedro Alcides Mendonça/);
            Pulseira.setLeitoRegExp(/0*1/);
            Pulseira.setDataRegExp(/03\/06\/1962/);

            Pulseira.setName("Pedro Alcides Mendonça");
            Pulseira.setLeito("13");
            Pulseira.setData("03/06/1962");
            Pulseira.disable(); 

        });

        //region Register Scenes

        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
        level.registerScene(farmacia);
        level.registerScene(posto_de_enfermagem);

        // endregion

        //region Register Modal Scenes

        level.registerModalScene(pulseira);
        level.registerModalScene(prontuario);
        // level.registerModalScene(freqRespiratoria);
        level.registerModalScene(gaveta);
        // level.registerModalScene(termometro);
        // level.registerModalScene(medidor_pressao);
        // level.registerModalScene(oximetro);

        //endregion

        //region Flags
        level.registerFlag(new Flag("folheto_dos_nove_certos", false));
        level.registerFlag(new Flag("passagem_sala-de-leitos", false));
        level.registerFlag(new Flag("visita-leito", false));
        level.registerFlag(new Flag("verificou_pulseira", false));
        level.registerFlag(new Flag("pegou_prescricao_medica", false));
        level.registerFlag(new Flag("lavar-maos", false));
        level.registerFlag(new Flag("lavar-maosDepois", false));
        level.registerFlag(new Flag("score_verificar_pulseira", false));

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