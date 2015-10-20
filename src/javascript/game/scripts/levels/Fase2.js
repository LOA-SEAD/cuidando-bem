/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores) {

        //region Imports
        var Dialogs = require("Dialogs_data").fase2;
        //var Alertas = require("Dialogs_data").alertas;
        // var Scores = require("Scores_data").fase2;
        //endregion

        var level = new Level("Level 2");
        console.groupCollapsed(level.getName());

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

        //region Recepcao
        function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
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
                    core.closeDialog();
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

        //Corredor
        function corredorIrSalaLeitos () {
            console.log("Va para sala de leitos");
            core.changeScene(2);
        }

        function corredorIrPostoEnfermagem () {
            if(level.getFlag("conversar_paciente").getValue() == false) {
                alert("Mentor corrige");
                if(level.getFlag("score_ir_posto_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            } else {
                core.changeScene(4);
            }
        }
    
        // esperar estar pronto a farmacia
        function corredorIrFarmacia () {
            if(level.getFlag("conversar_paciente").getValue() == false) {
                alert("Mentor corrige");
                if(level.getFlag("score_ir_farmacia_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irFarmacia_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            } else {
                core.changeScene(4);
            }
        }
    
        // esperar estar pronto a alaFeminina
        function corredorIrAlaFeminina () {
            if(level.getFlag("conversar_paciente").getValue() == false) {
                alert("Mentor corrige");
                if(level.getFlag("score_ir_ala_feminina_hora_errada").getValue() == false) {
                    core.registerScoreItem(Scores.irAlaFeminina_horaErrada);
                    level.getFlag("score_ir_posto_hora_errada").setValue(true);
                }
            } else {
                core.changeScene(4);
            }
        }

        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });

        corredor.registerDialogs([

        ]);

        corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")
                .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrSalaLeitos)
                .setVisibility(true),

            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToNursingStation")
                .onClick(corredorIrPostoEnfermagem)
                .setVisibility(true),

            //TODO: Adicionar ir ala feminina
            new InteractiveObject("io-ir_ala_feminina","Ir para a Ala Feminina")
               // .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrFarmacia)
                .setVisibility(true),
                
            //TODO: Adicionar ir Farmácia
            new InteractiveObject("io-ir_farmacia","Ir para a Farmacia")
               // .setCssClass("intObj-goToBedroom")
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true)


        ]);
        //endregion

        //region Sala de leitos
        sala_de_leitos = new Scene("sala_de_leitos", "scene-sala_de_leitos")
            .setCssClass("scene-bedroom")
            .onLoad(function (){
                console.log("Entrando na sala de leitos");
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
                    core.changeScene(3);
                })
                .setVisibility(false),

            new InteractiveObject("io-ir_corredor", "Ir ao Corredor")
                .setCssClass("intObj-bedroomToHallway")
                .onClick(function () {
                    //Já checou o prontuario
                    if(level.getFlag("checar_prontuario").getValue() == true){
                        //Volte para o corredor
                        core.changeScene(1);
                    }else{
                        alert("Você deveria checar o prontuario");
                    }
                })
                .setVisibility(false)
        ]);

        sala_de_leitos.registerActions([
            new Action("btn-falar_com_paciente_ala", "Falar com paciente")
                .setCssClass("")
                .onClick(function (){
                   core.openDialog(0);
                   core.closeCommandBar();
                   level.getFlag("conversar_paciente").setValue(true);
                })
                .setVisibility(true),

            new Action("btn-lavar_maos", "Lavar as mãos")
                .setCssClass("action-lavar_maos")
                .onClick(function (){
                   level.getFlag("lavar_maos").setValue(true);
                })
                .setVisibility(false),

            new Action("btn-ler_prontuario", "Ler prontuario")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: ler prontuario");
                    if(level.getFlag("lavar_maos").getValue() == false){
                        //alert("Jogador perde pontos por não ter lavador as mãos antes de abrir prontuario");
                    }else{
                    }
                    Prontuario.open();
                    core.openModalScene("Prontuario");
                })
                .setVisibility(false)
        ]);

        sala_de_leitos.registerDialogs([
            new Dialog(lib.characters.jogador)
                .setText(Dialogs.ala_masculina[0])
                .registerOption("", function() {
                    core.openDialog(1);
                }),
            new Dialog(lib.characters.pacientes.raul_unknow)
                .setText(Dialogs.ala_masculina[1])
                .registerOption("", function() {
                    core.setActionVisible("btn-ler_prontuario", true);
                    core.setActionVisible("btn-lavar_maos", true);
                    core.closeDialog();
                    core.openCommandBar();
                })
        ]);
        //endregion

        //region Leito
        leito = lib.scenes.leitos.char2.getClone()
            .onLoad(function () {
                core.openCommandBar();
                console.log("Leito: Onload");

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
            
        ]);

        leito.registerActions([
            /*new Action("btn-examinar_paciente", "Examinar Paciente")
                .setCssClass("action-examinar_paciente")
                .onClick(function () {
                    console.log("Action: btn-examinar_paciente");
                    core.openModalScene("zoomChar2");
                    level.getFlag("examinar_paciente").setValue(true);
                    core.setActionVisible("btn-ir_sala_leitos", true);
                })
                .setVisibility(false),*/
            new Action("btn-falar_paciente", "Conversar com Paciente")
                .setCssClass("action-leito-char-02") //Vai ser outro
                .onClick(function () {
                    console.log("Action: btn-conversar_paciente");

                    if(level.getFlag("score_falar_paciente").getValue() == false) {
                        core.registerScoreItem(Scores.falarComPaciente);
                        level.getFlag("score_falar_paciente").setValue(true);
                    }

                    core.openDialog(0);
                    core.closeCommandBar();
                })
                .setVisibility(true),
                //Mais actions
        ]);
        //endregion

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
                    if(level.getFlag().getValue() == true
                    && level.getFlag().getValue() == true
                    && level.getFlag().getValue() == true
                    && level.getFlag().getValue() == true) {
                        core.changeScene(1);
                    }else{
                        alert("Você esqueceu de pegar algo. Tem que revisar se realmente deve travar aqui")
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

                    core.setInteractiveObjectVisible("io-kitGlicemia", !(level.getFlag("pegou_kit_glicemia").getValue()));
                    core.setInteractiveObjectVisible("io-algodao", !(level.getFlag("pegou_algodao").getValue()));
                    core.setInteractiveObjectVisible("io-luvas", !(level.getFlag("pegou_luvas").getValue()));
                    core.setInteractiveObjectVisible("io-bandeja", !(level.getFlag("pegou_bandeja").getValue()));
                })
                .setVisibility(true)
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
                    if(level.getFlag("confirmou_pulseira").getValue() == false) {
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
            //Kit glicemia
            new InteractiveObject("io-kitGlicemia","Pegar Kit de glicemia")
                .setCssClass("")
                .onClick(function () {
                    console.log("Action: pegar kit de glicemia");

                    level.getFlag("pegou_kit_glicemia").setValue(true);

                    core.setInteractiveObjectVisible("io-kitGlicemia", false);
                })
                .setVisibility(true),

            //Algodao
            new InteractiveObject("io-algodao","Pegar algodao")
                .setCssClass("")
                .onClick(function () {
                    console.log("Action: pegar algodao ");

                    level.getFlag("pegou_algodao").setValue(true);

                    core.setInteractiveObjectVisible("io-algodao", false);
                })
                .setVisibility(true),

            //Luvas
            new InteractiveObject("io-luvas","Pegar luvas")
                .setCssClass("")
                .onClick(function () {
                    console.log("Action: pegar luvas");

                    level.getFlag("pegou_luvas").setValue(true);

                    core.setInteractiveObjectVisible("io-luvas", false);
                })
                .setVisibility(true),

            //Bandeja
            new InteractiveObject("io-bandeja","Pegar bandeja")
                .setCssClass("")
                .onClick(function () {
                    console.log("Action: pegar bandeja");

                    level.getFlag("pegou_bandeja").setValue(true);

                    core.setInteractiveObjectVisible("io-bandeja", false);
                })
                .setVisibility(true)
        ]);

        prontuario = new Scene("Prontuario", "Prontuario");

        prontuario.registerActions([
            new Action("btn-fechar_prontuario", "Fechar prontuário")
                .setCssClass("action-ler_prontuario")
                .onClick(function (){
                    console.log("Action: Fechar prontuario");
                    level.getFlag("checar_prontuario").setValue(true);
                    Prontuario.close();
                    core.closeModalScene("Prontuario");
                    core.setInteractiveObjectVisible("io-ir_corredor", true);
                })
                .setVisibility(true),

            // new Action("btn-terminar_fase", "Conversar com Mentor")
            //     .setCssClass("action-abrir_dialogo")
            //     .onClick(function (){
            //         console.log("Action: Fechar prontuario");
            //         Prontuario.close();
            //         alert(Prontuario.isDataValid() + " Final da fase");
            //         core.registerScoreItem(Scores.tutorial.identificarPaciente);
            //         core.closeCommandBar();
            //         core.showEndOfLevel();
            //     })
        ]);

        //Register in level
        //0
        level.registerScene(recepcao);
        //1
        level.registerScene(corredor);
        //2
        level.registerScene(sala_de_leitos);
        //3
        level.registerScene(leito);
        //4
        level.registerScene(posto_de_enfermagem);

        level.registerModalScene(pulseira);
        level.registerModalScene(gaveta);
        level.registerModalScene(prontuario);
        //level init script
        level.setSetupScript(function(){

            level.getFlag("conversar_recepcionista").setValue(false);
            level.getFlag("conversar_paciente").setValue(false);
            level.getFlag("lavar_maos").setValue(false);
            level.getFlag("checar_prontuario").setValue(false);
            level.getFlag("pegou_kit_glicemia").setValue(false);
            level.getFlag("pegou_algodao").setValue(false);
            level.getFlag("pegou_luvas").setValue(false);
            level.getFlag("pegou_bandeja").setValue(false);
            level.getFlag("lavar_maos2").setValue(false);
            level.getFlag("conversar_paciente2").setValue(false);
            level.getFlag("usou_bandeja").setValue(false);
            level.getFlag("usou_luvas").setValue(false);
            level.getFlag("usou_algodao").setValue(false);
            level.getFlag("usou_kit_glicemia").setValue(false);
            level.getFlag("usou_algodao2").setValue(false);
            //Explicar resultados para paciente
            level.getFlag("conversar_paciente3").setValue(false);
            //Jogar fora itens usados nos devidos lixos
            level.getFlag("lixo_algodao").setValue(false);
            level.getFlag("lixo_agulha").setValue(false);
            level.getFlag("elevar_grade").setValue(false);
            level.getFlag("lavar_maos3").setValue(false);
            level.getFlag("anotar_prontuario").setValue(false);
            level.getFlag("score_ir_posto_hora_errada").setValue(false);
            level.getFlag("score_ir_farmacia_hora_errada").setValue(false);
            level.getFlag("score_ir_ala_feminina_hora_errada").setValue(false);
            level.getFlag("score_falar_paciente").setValue(false);

            Pulseira.setNameRegExp(/Raul Gonzales Rodrigues/);
            Pulseira.setLeitoRegExp(/0*1/);
            Pulseira.setDataRegExp(/01\/12\/1945/);

            Prontuario.setNome("Raul Gonzales Rodrigues");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("01/12/1945");
            Prontuario.setIdade("78 anos");
            Prontuario.setProfissao("Operário Aposentado");

            //TODO: Atualizar isso com informações corretas dos pacientes
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
        level.registerFlag(new Flag("conversar_paciente"), false);
        level.registerFlag(new Flag("lavar_maos"), false);
        level.registerFlag(new Flag("checar_prontuario"), false);
        level.registerFlag(new Flag("pegou_kit_glicemia"), false);
        level.registerFlag(new Flag("pegou_algodao"), false);
        level.registerFlag(new Flag("pegou_luvas"), false);
        level.registerFlag(new Flag("pegou_bandeja"), false);
        level.registerFlag(new Flag("lavar_maos2"), false);
        level.registerFlag(new Flag("conversar_paciente2"), false);
        level.registerFlag(new Flag("usou_bandeja"), false);
        level.registerFlag(new Flag("usou_luvas"), false);
        level.registerFlag(new Flag("usou_algodao"), false);
        level.registerFlag(new Flag("usou_kit_glicemia"), false);
        level.registerFlag(new Flag("usou_algodao2"), false);
        //Explicar resultados para paciente
        level.registerFlag(new Flag("conversar_paciente3"), false);
        //Jogar fora itens usados nos devidos lixos
        level.registerFlag(new Flag("lixo_algodao"), false);
        level.registerFlag(new Flag("lixo_agulha"), false);
        level.registerFlag(new Flag("elevar_grade"), false);
        level.registerFlag(new Flag("lavar_maos3"), false);
        level.registerFlag(new Flag("anotar_prontuario"), false);
        level.registerFlag(new Flag("score_ir_posto_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_farmacia_hora_errada"), false);
        level.registerFlag(new Flag("score_ir_ala_feminina_hora_errada"), false);
        level.registerFlag(new Flag("score_falar_paciente"), false);

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 2);

        console.groupEnd();
    }
);
