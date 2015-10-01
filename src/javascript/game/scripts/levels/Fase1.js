/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores) {

        //region Imports
        var Dialogs = require("Dialogs_data").fase1;
        var Alertas = require("Dialogs_data").alertas;
        // var Scores = require("Scores_data").tutorial;
        //endregion

        var level = new Level("Level 1");
        console.groupCollapsed(level.getName());

        var flags_on = true;    // if false it wont check for flags -- tests purpose
        var visibility = false;
        if (!flags_on)
            visibility = true;


        //Scenes

        var
        recepcao,
        corredor,
        alaMasculina,
        sala_de_leitos,
        leito,
        posto_de_enfermagem,
        gaveta,
        pulseira,
        prontuario;


        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( !flags_on || level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
                core.closeDialog();
                core.changeScene(1);
                console.log("Ir para o corredor");
            } else {
                console.log("Necessita ação: conversar com a recepcionista");
            }
        }

        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }

        recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    level.getFlag("conversar_recepcionista").setValue(true);
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.recepcao[1])
                .registerOption("", function(){
                    core.closeDialog();
                }),
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

        //Corredor
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if(level.getFlag("conversar_mentor").getValue() == false){
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(0);
                }else if(level.getFlag("examinar_paciente").getValue() == true && level.getFlag("conversar_mentor2").getValue() == false){
                    core.openDialog(2);
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([
            //Primeira passada pelo corredor
            // 0
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[0])
                .registerOption("", function(){
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(1);
                }),
            // 1
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor.fala1[1])
                .registerOption("", function(){
                    core.closeDialog();
                }),
            //Segunda passada pelo corredor
            // 2 Mentor fala
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[0])
                .registerOption("", function(){
                    core.openDialog(3);
                }),
            // 3 Jogador responde
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.corredor.fala2[1], function(){
                    core.openDialog(6);
                })
                .registerOption(Dialogs.corredor.fala2[2], function(){
                    core.openDialog(4);
                })
                .registerOption(Dialogs.corredor.fala2[4], function(){
                    core.openDialog(5);
                })
                .setRandomize(true),
            // 4 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[3])
                .registerOption("", function(){
                    core.openDialog(3);
                }),
            // 5 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[5])
                .registerOption("", function(){
                    core.openDialog(3);
                }),
            // 6 Mentor fala
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[6])
                .registerOption("", function(){
                    core.openDialog(7);
                }),
            // 7 Jogador responde
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.corredor.fala2[7], function(){
                    core.closeDialog();
                    core.openCommandBar();
                    level.getFlag("conversar_mentor2").setValue(true);
                })
                .registerOption(Dialogs.corredor.fala2[8], function(){
                    core.openDialog(8);
                })
                .registerOption(Dialogs.corredor.fala2[10], function(){
                    core.openDialog(9);
                })
                .setRandomize(true),
            // 8 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[9])
                .registerOption("", function(){
                    core.openDialog(7);
                }),
            // 9 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala2[11])
                .registerOption("", function(){
                    core.openDialog(7);
                }),
            // 10 Mentor Ação errada: Ir ao posto de enfermagem
            new Dialog(lib.characters.mentor)
                .setText(Alertas.enfermaria_masculina)
                .registerOption("", function (){
                    core.closeDialog();
                }),
            // 11 - Mentor Ação errada "Você deveria estar indo para o posto de enfermagem"
            new Dialog(lib.characters.mentor)
                .setText(Alertas.perdido.enfermagem[0])
                .registerOption("", function (){
                    core.closeDialog();
                })
        ]);

        function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            if(level.getFlag("examinar_paciente").getValue() == false){
                //aviso de caminho errado
                core.openDialog(10);
            }else{
                //va para posto de enfermagem
                core.changeScene(4);
            }
        }

        function corredorIrSalaLeitos() {
            if (level.getFlag("conversar_mentor").getValue() == true) {
                if(level.getFlag("examinar_paciente").getValue() == false) {
                    core.changeScene(2);
                } else {
                    if(level.getFlag("coxim").getValue() == true) {
                        core.changeScene(2);
                    }else{
                        core.openDialog(11);
                    }
                }
                console.log("Action: corredorIrSalaLeitos");
            } else {
                console.log("Necessita ação: falar com mentor");
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
                .setVisibility(true),

            new InteractiveObject("io-conversar_mentor","Conversar com Mentor")
                .setCssClass("intObj-talkToMentor")
                .onClick(function (){
                    core.closeCommandBar();
                    console.log("Abrir diálogo com o mentor");
                    if(level.getFlag("examinar_paciente").getValue() == false){
                        level.getFlag("conversar_mentor").setValue(true);
                        core.openDialog(0);
                    }else if(level.getFlag("examinar_paciente").getValue() == true){
                        core.openDialog(2);
                        alert("O mentor deve sumir daqui ou deve continuar para repetição do dialogo?");
                    }
                })
                .setVisibility(true)
        ]);

        //Sala de leitos
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Entrando na sala de leitos");
                if(level.getFlag("colocou_coxim").getValue() == true){
                    core.setActionVisible("btn-ler_prontuario", true);
                }
                core.openCommandBar();
            })
            .onUnload( function (){
                console.log("Saindo da sala de leitos");
                core.closeCommandBar();
            });

        sala_de_leitos.registerInteractiveObjects([
            new InteractiveObject("io-ir_leito", "Ir ao leito")
                .setCssClass("intObj-ir_leito-fase1")
                .onClick(function (){
                    if(level.getFlag("lavar_maos").getValue() == false) {
                        //Mentor corrige
                        core.openDialog(0);
                    } else {
                        // Va para leito
                        core.changeScene(3);
                    }
                })
                .setVisibility(true),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    if( level.getFlag("foi_ao_leito").getValue() == false ) {
                        core.changeScene(1);
                    } else {
                        if( level.getFlag("lavar_maos2").getValue() == true ) {
                            core.changeScene(1);
                        } else {
                            core.openDialog(1);
                        }
                    }
                })
                .setVisibility(true)
        ]);

        sala_de_leitos.registerActions([
            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                    if(level.getFlag("lavar_maos").getValue() == false){
                        console.log("Action: lavar_maos");
                        level.getFlag("lavar_maos").setValue(true);
                        //core.setInteractiveObjectVisible("io-ir_leito", true);
                    }else if(level.getFlag("lavar_maos2").getValue() == false && level.getFlag("examinar_paciente").getValue() == true){
                        console.log("Action: lavar_maos2");
                        level.getFlag("lavar_maos2").setValue(true);
                        //core.setActionVisible("ir_corredor", true);
                    }else if(level.getFlag("lavar_maos3").getValue() == false && level.getFlag("colocou_coxim").getValue() == true){
                        console.log("Action: lavar_maos3");
                        level.getFlag("lavar_maos3").setValue(true);
                    }
                })
                .setVisibility(true),
            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    if(level.getFlag("lavar_maos3").getValue() == false){
                        core.openDialog(2);
                    }else{
                        console.log("Action: ler prontuario");
                        Prontuario.open();
                        core.openModalScene("Prontuario");
                    }
                })
                .setVisibility(false)
        ]);

        sala_de_leitos.registerDialogs([
            // 0 - Mentor
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo1)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 1 - Mentor
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo2)
                .registerOption("", function() {
                    core.closeDialog();
                }),
            // 2 - Mentor: Não lavou mãos antes de pegar no prontuário
            new Dialog(lib.characters.mentor)
                .setText(Alertas.lavar_maos.tipo3)
                .registerOption("", function () {
                    core.closeDialog();
                })
        ]);

        leito = lib.scenes.leitos.char2.getClone()
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");
                if(level.getFlag('examinar_paciente').getValue() == false){
                    core.setInteractiveObjectVisible("io-pulseira_paciente", true);
                }
                if(level.getFlag("conversar_mentor2").getValue() == true) {
                    core.setActionVisible("btn-examinar_paciente", false);

                    if(level.getFlag("coxim").getValue() == true) {
                        core.setActionVisible("btn-mudar_posicao", true);
                    }
                }
            })
            .onUnload(function (){
                console.log("Leito: OnUnload");
                core.closeCommandBar();
            });

        leito.registerInteractiveObjects([
            new InteractiveObject("io-pulseira_paciente", "Checar pulseira do paciente")
                .setCssClass("intObj-paciente_02-checar_pulseira")
                .onClick(function () {
                    console.log("IO: pulseira_paciente");
                    core.openModalScene("pulseira");
                    Pulseira.open();
                    core.openCommandBar();
                })
                .setVisibility(true)
        ]);

        leito.registerDialogs([
            // 0 Jogador escolhe fala
            new Dialog(lib.characters.jogador)
                .setText('')
                .registerOption(Dialogs.enfermaria[0], function(){
                    core.openDialog(3);
                })
                .registerOption(Dialogs.enfermaria[1], function(){
                    core.openDialog(1);
                })
                .registerOption(Dialogs.enfermaria[3], function(){
                    core.openDialog(2);
                })
                .setRandomize(true),
            // 1 Mentor corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.enfermaria[2])
                .registerOption('', function(){
                    core.openDialog(0);
                }),
            // 2
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.enfermaria[4])
                .registerOption('', function(){
                    core.openDialog(0);
                }),
            // 3 Paciente Fala
            new Dialog(lib.characters.pacientes.carlos)
                .setText(Dialogs.enfermaria[5])
                .registerOption("", function(){
                    core.openDialog(4);
                }),
            // 4 Jogador responde
            new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.enfermaria[6], function(){
                    core.openDialog(7);
                })
                .registerOption(Dialogs.enfermaria[7], function(){
                    core.openDialog(5);
                })
                .registerOption(Dialogs.enfermaria[9], function(){
                    core.openDialog(6);
                })
                .setRandomize(true),
            // 5 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.enfermaria[8])
                .registerOption('', function(){
                    core.openDialog(4);
                }),
            // 6
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.enfermaria[10])
                .registerOption('', function(){
                    core.openDialog(4);
                }),
            // 7
            new Dialog(lib.characters.pacientes.carlos)
                .setText(Dialogs.enfermaria[11])
                .registerOption(Dialogs.enfermaria[12], function(){
                    core.openCommandBar();
                    core.closeDialog();
                    //core.setActionVisible("btn-examinar_paciente", true);
                    level.getFlag("conversar_paciente").setValue(true);
                    core.setActionVisible("btn-perguntar_nome", true);
                    core.setActionVisible("btn-falar_paciente", false);
                }),
            // 8
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.perguntarNome)
                .registerOption("", function() {
                    core.openDialog(9);
                }),
            new Dialog(lib.characters.pacientes.carlos)
                .setText(Dialogs.enfermaria[11])
                .registerOption("Obrigado.", function() {
                    core.openCommandBar();
                    core.closeDialog();
                })
        ]);

        leito.registerActions([
            new Action("btn-examinar_paciente", "Examinar Paciente")
                .setCssClass("action-examinar_paciente")
                .onClick(function () {
                    console.log("Action: btn-examinar_paciente");
                    alert("Examinou Paciente. Como deve aparecer para o usuário que ele examinou realmente o paciente?");
                    level.getFlag("examinar_paciente").setValue(true);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                })
                .setVisibility(false),
            new Action("btn-falar_paciente", "Conversar com Paciente")
                .setCssClass("action-leito-char-02")
                .onClick(function () {
                    console.log("Action: btn-conversar_paciente");
                    core.openDialog(0);
                    core.closeCommandBar();
                })
                .setVisibility(true),
            new Action("btn-perguntar_nome", "Perguntar nome do paciente")
                .setCssClass("action-leito-char-02")
                .onClick(function () {
                    console.log("Action: btn-perguntar_nome");
                    core.closeCommandBar();
                    core.openDialog(8);
                })
                .setVisibility(false),
            new Action("btn-ir_sala_leitos", "Ir para sala de leitos")
                .setCssClass("action-ir_sala_de_leitos")
                .onClick(function (){
                    core.changeScene(2);
                })
                .setVisibility(false),
            new Action("btn-mudar_posicao", "Mudar posição do paciente")
                .setCssClass("action-mudar_posicao_paciente")
                .onClick(function () {
                    core.changeSceneCssClassTo("scene-bedChar02-turned");
                    core.setActionVisible("btn-mudar_posicao", false);
                    core.setActionVisible("btn-posicionar_coxim_e_travesseiro", true);
                })
                .setVisibility(false),
            new Action("btn-posicionar_coxim_e_travesseiro", "Posicionar coxim e travesseiro")
                .setCssClass("action-posicionar_coxim")
                .onClick(function () {
                    core.changeSceneCssClassTo("scene-bedChar02-cushion");
                    core.setActionVisible("btn-posicionar_coxim_e_travesseiro", false);
                    level.getFlag("colocou_coxim").setValue(true);
                })
                .setVisibility(false)
        ]);

        posto_de_enfermagem = lib.scenes.postoDeEnfermagem.getClone()
            .onLoad(function (){
                core.openCommandBar();
            })
            .onUnload(function() {
                core.closeCommandBar();
            });

        posto_de_enfermagem.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function (){
                    console.log("Action: ir_corredor");
                    if(level.getFlag("coxim").getValue() == true){
                        core.changeScene(1);
                    }else{
                        core.openDialog(0);
                    }
                })
                .setVisibility(true)
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

        posto_de_enfermagem.registerDialogs([
            // 0 - Mentor: Esqueceu coxim
            new Dialog(lib.characters.mentor)
                .setText(Alertas.esqueceu.coxim)
                .registerOption("", function() {
                    core.closeDialog();
                })
        ]);


        //Modal scenes

        pulseira = new Scene("pulseira", "pulseira");

        pulseira.registerInteractiveObjects([

        ]);

        pulseira.registerActions([
            new Action("btn-largar_pulseira", "Fechar pulseira")
                .setCssClass("action-pulseira_paciente")
                .onClick(function () {
                    console.log("Ação: Fechar modal pulseira");
                    core.closeModalScene("Pulseira");
                    if(level.getFlag("confirmou_pulseira").getValue() == false && level.getFlag("conversar_paciente").getValue() == true) {
                        level.getFlag("confirmou_pulseira").setValue(true);
                        core.setActionVisible("btn-examinar_paciente", true);
                    }

                    Pulseira.close();
                })
                .setVisibility(true)
        ]);

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
                    level.getFlag("coxim").setValue(true);
                    core.setInteractiveObjectVisible("io-coxim", false);
                })
                .setVisibility(true)
        ]);

        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                }),

            new Action("btn-terminar_fase", "Conversar com Mentor")
                .setCssClass("action-abrir_dialogo")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    Prontuario.close();
                    alert(Prontuario.isDataValid() + " Final da fase");
                    core.registerScoreItem(Scores.tutorial.identificarPaciente);
                    core.closeCommandBar();
                    core.showEndOfLevel();
                })
        ]);

        //Register in level
        level.registerScene(recepcao);
        level.registerScene(corredor);
        level.registerScene(sala_de_leitos);
        level.registerScene(leito);
        level.registerScene(posto_de_enfermagem);

        level.registerModalScene(pulseira);
        level.registerModalScene(gaveta);
        level.registerModalScene(prontuario);
        //level init script
        level.setSetupScript(function(){

            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("conversar_mentor").setValue(false);
            level.getFlag("conversar_mentor2").setValue(false);
            level.getFlag("foi_ao_leito").setValue(false);
            level.getFlag("conversar_paciente").setValue(false);
            level.getFlag("confirmou_pulseira").setValue(false);
            level.getFlag("examinar_paciente").setValue(false);
            level.getFlag("lavar_maos").setValue(false);
            level.getFlag("lavar_maos2").setValue(false);
            level.getFlag("lavar_maos3").setValue(false);
            level.getFlag("coxim").setValue(false);
            level.getFlag("colocou_coxim").setValue(false);

            Pulseira.setNameRegExp(/Carlos Esme Gouv(e|ê)a/);
            Pulseira.setLeitoRegExp(/0*3/);
            Pulseira.setDataRegExp(/01\/12\/1945/);

            Pulseira.setName("Carlos Esme Gouvêa");
            Pulseira.setLeito("03");
            Pulseira.setData("01/12/1945");
            Pulseira.disable();

            Prontuario.setNome("Carlos Esme Gouvêa");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Viúvo");
            Prontuario.setDataNascimento("01/12/1945");
            Prontuario.setIdade("69 anos");
            Prontuario.setProfissao("Advogado Aposentado");
            Prontuario.setPai("Leonardo Gouvêa");
            Prontuario.setMae("Maria Clara Esme Gouvêa");

            Prontuario.setAlergiaMedicamentosa(false, "");
            Prontuario.setDisableAlergiaMedicamentosa(true);
            Prontuario.setDataInternacao("15/06/2015");
            Prontuario.setLeito("03 - Leito Masculino");
            Prontuario.setAntecedentes("Nenhum");
            Prontuario.setHipotese("Pneumonia brônquica, insuficiência respiratória e anemia ferropriva.");
            Prontuario.setObservacoes("Possui incontinência urinária, acamado.");

            Prontuario.setPeso("72");
            Prontuario.setAltura("1,68");
            Prontuario.setCircunferenciaAbdominal("135");

            Prontuario.setPrescMedicaRowData(0, "15/03", "Sulfato ferroso", "Oral", "drágea 250 mg", "2x dia", "x");
            Prontuario.setPrescMedicaRowData(1, "15/03", "Azitromicina", "Oral", "comp 500 mg", "1x dia", "x");

            Prontuario.setSsvvRowData(0, '15/03', '130x80', '65', '14', '94', '36', true);
            //Disable 2 row
            Prontuario.setSsvvRowData(1, '', '', '', '', '', '', true);

            Prontuario.setAnotacaoEnfermagemRowData('15/03', '');
        });

        //Flags

        level.registerFlag(new Flag("conversar_recepcionista"), false);
        level.registerFlag(new Flag("conversar_mentor"), false);
        level.registerFlag(new Flag("conversar_mentor2"), false);
        level.registerFlag(new Flag("foi_ao_leito"), false);
        level.registerFlag(new Flag("conversar_paciente"), false);
        level.registerFlag(new Flag("confirmou_pulseira"), false);
        level.registerFlag(new Flag("examinar_paciente"), false);
        level.registerFlag(new Flag("lavar_maos"), false);
        level.registerFlag(new Flag("lavar_maos2"), false);
        level.registerFlag(new Flag("lavar_maos3"), false);
        level.registerFlag(new Flag("coxim"), false);
        level.registerFlag(new Flag("colocou_coxim"), false);


        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 1);

        console.groupEnd();


    }
);