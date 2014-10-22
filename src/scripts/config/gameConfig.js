/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 */

define(['levelsData_interface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'core'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {

        L.group("Game Config:", true);

        var level1 = new Level("Level 1", isEndOfLevel1, getNextLevel1);
        L.group(level1.getName(), true);

        function isEndOfLevel1() {
        }

        function getNextLevel1() {
        }

        /*
         Scenes for level 1
         */

        level1.registerScene(new Scene("recepcao", "scene-recepcao"));                      // 0    - Recepcao
        level1.registerScene(new Scene("corredor", "scene-corredor"));                      // 1    - Corredor
        level1.registerScene(new Scene("sala_de_leitos", "scene-sala_de_leitos"));          // 2    - Sala de Leitos
        level1.registerScene(new Scene("leito", "scene-leito"));                            // 3    - Leito
        level1.registerScene(new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem"));// 4    - Posto de Enferm
        level1.setInitialScene(0);

        // Scene novaCena; --> declarar as tretas aqui dentro

        /*
         Flags for level 1
         */

        level1.registerFlag(new Flag("conversar_paciente", false), 3);                  // 0    - Convers. Pacient
        level1.registerFlag(new Flag("pulseira_paciente", false), 3);                   // 1    - Pulseira Pacient
        level1.registerFlag(new Flag("confirmar_paciente", false), 3);                  // 2    - Confirm. Pacient
        level1.registerFlag(new Flag("conversar_mentor", false), 3);                    // 3    - Convers. Mentor
        level1.registerFlag(new Flag("termometro", false), 4);                          // 4    - Termometro
        level1.registerFlag(new Flag("medidor_pressao", false), 4);                     // 5    - Med. Pressao
        level1.registerFlag(new Flag("oximetro", false), 4);                            // 6    - Oximetro
        level1.registerFlag(new Flag("lavar_maos", false), 3);                          // 7    - Lavar maos
        level1.registerFlag(new Flag("medir_temperatura", false), 3);                   // 8    - Medir temp.
        level1.registerFlag(new Flag("medir_pulso", false), 3);                         // 9    - Medir pulso
        level1.registerFlag(new Flag("medir_freq_respiratoria", false), 3);             // 10   - Medir freq. resp.
        level1.registerFlag(new Flag("mentor_finaliza", false), 3);                     // 11   - Mentor finaliza

        /*
         Dialogs
         */

        /*
         Character:  Recepcionista
         */

        // # 3 - Falar com recepcionista
        var fala_recepcionista = new Dialog("recepcionista", "char-recepcionista", "Bom dia, você parece novo por aqui. Como posso ajudá-lo?");
        fala_recepcionista.registerOption({
            text: "Bom dia, sou o novo técnico de enfermagem contratado.",
            actionFunction: function () {
                L.log("uhul");
            }});
        fala_recepcionista.registerOption({
            text: "Fechar diálogo",
            actionFunction: function () {
                core.closeDialog();
            }});
        level1.registerDialog(fala_recepcionista, 0);


        /*
         Character:  Mentor
         */

        // # 5 - Falar com Mentor
        level1.registerDialog(new Dialog("mentor", "char-mentor", "Mentor: Fala numero 1"), 1);
        // # 12 - Conversar com o Mentor
        level1.registerDialog(new Dialog("mentor", "char-mentor", "Mentor: Fala numero 2"), 3);


        /*
         Character:  Paciente
         */
        // # 8 - Conversar com paciente
        level1.registerDialog(new Dialog("paciente", "char-paciente", "Paciente: Fala numero 1"), 3);

        /*
         Actions
         */

        /*
         Scene:  Recepcao    -   0
         */
        // # 4 - Ir para corredor
        level1.registerAction(new Action("Ir ao corredor", "action-ir_corredor",
            function () {
                L.log("Action: ir_corredor #4");
                core.changeScene(1);
                core.closeDialog(0, 0);
            }), 0); // recepcao

        level1.registerAction(new Action("Fechar dialogo", "action-fechar_dialogo",
            function () {
                L.log("Abrir dialogo");
                core.openDialog(0, 0);
            }), 0); // recepcao


        /*
         Scene:  Corredor    -   1
         */

        // # 6 # 21 - Ir para sala de leitos
        level1.registerAction(new Action("ir_sala_de_leitos", "action-ir_sala_de_leitos",
            function () {
                L.log("Action: ir_sala_de_leitos");
                core.changeScene(2);
            }), 1); // corredor
        // # 14 - Ir para posto de enfermagem
        level1.registerAction(new Action("ir_posto_de_enfermagem", "action-ir_posto_de_enfermagem",
            function () {
                L.log("Action: ir_posto_de_enfermagem");
                core.changeScene(4);
            }), 1); // corredor

        /*
         Scene:  Sala de Leito   -   2
         */

        // # 13.2 - Ir para o corredor
        level1.registerAction(new Action("Ir ao corredor", "action-ir_corredor",
            function () {
                L.log("Action: ir_corredor #13");
                core.changeScene(1)
            }), 2); // leito
        // # 7 # 22 - Ir para leito
        level1.registerAction(new Action("ir_leito", "action-ir_leito",
            function () {
                L.log("Action: ir_leito");
                core.changeScene(3);
            }), 2); // sala de leitos

        /*
         Scene:  Leito   -   3
         */

        // # 13.1 - Ir para o corredor --> substituida por ir para sala de leitos
        level1.registerAction(new Action("Ir para sala de leitos", "action-ir_sala_de_leitos",
            function () {
                L.log("Action: action-ir_sala_de_leitos #13");
                core.changeScene(2)
            }), 3); // leito
        // # 8 - Conversar paciente
        level1.registerAction(new Action("conversar_paciente", "action-conversar_paciente",
            function () {
                // get dialog conversar_paciente
                L.log("Action: conversar_paciente");
                // altera flag conversar_paciente
                level1.getFlags()[0] = true;
            }), 3); // leito
        // # 9 - Ver pulseira do paciente (exibe interactiveObject)
        level1.registerAction(new Action("pulseira_paciente", "action-pulseira_paciente",
            function () {
                L.log("Action: pulseira_paciente");
                // altera flag pulseira_paciente
                level1.getFlags()[1] = true;
            }), 3); // leito
        // # 10 - Confirmar Paciente
        level1.registerAction(new Action("confirmar_paciente", "action-confirmar_paciente",
            function () {
                L.log("Action: confirmar_paciente");
                // selecionar resposta ??
                // necessita conversar_paciente e pulseira_paciente para liberar
                if (level1.getFlags()[0] == true && level1.getFlags()[1] == true) {
                    level1.getFlags()[2] = true; // confirmar_paciente
                }
            }), 3); // leito
        // # 11 - Fechar janela da pulseira
        level1.registerAction(new Action("fechar_pulseira", "action-fechar_pulseira",
            function () {
                L.log("Action: fechar_pulseira");
            }), 3); // leito
        // # 12 # 27 - Conversar com o Mentor
        level1.registerAction(new Action("conversar_mentor", "action-conversar_mentor",
            function () {
                L.log("Action: conversar_mentor");
                // get dialog conversar_mentor

                // Acao #12
                // necessita de "confirmar_paciente"
                if (level1.getFlags()[2] == true) {
                    level1.getFlags()[3] = true; // conversar_mentor
                }
                // Acao #27
                if (level1.getFlags()[8] == true &&      // medir_temperatura
                    level1.getFlags()[9] == true &&     // medir_pulso
                    level1.getFlags()[10] == true) {     // medir_freq_respiratoria
                    level1.getFlags()[11] == true;  // mentor_finaliza
                }
            }), 3); // leito
        // # 23 - Lavar as maos
        level1.registerAction(new Action("lavar_maos", "action-lavar_maos",
            function () {
                L.log("Action: lavar_maos");
                level1.getFlags()[7] = true;    // lavar_maos
            }), 3); // leito
        // # 24 - Medir temperatura
        level1.registerAction(new Action("medir_temperatura", "action-medir_temperatura",
            function () {
                L.log("Action: medir_temperatura");
                // precisa de termometro e lavar_maos
                if (level1.getFlags()[4] == true && level1.getFlags()[7] == true) {
                    level1.getFlags()[8] = true; // medir_temperatura
                }
            }), 3); // leito
        // # 25 - Medir pulso
        level1.registerAction(new Action("medir_pulso", "action-medir_pulso",
            function () {
                L.log("Action: medir_pulso");
                // precisa de medidor pressao e lavar_maos
                if (level1.getFlags()[5] == true && level1.getFlags()[7] == true) {
                    level1.getFlags()[9] = true; // medir_pulso
                }
            }), 3); // leito
        // # 26 - medir frequencia respiratoria
        level1.registerAction(new Action("medir_freq_respiratoria", "action-medir_freq_respiratoria",
            function () {
                L.log("Action: medir_freq_respiratoria");
                // precisa de oximetro e lavar_maos
                if (level1.getFlags()[6] == true && level1.getFlags()[7] == true) {
                    level1.getFlags()[10] = true; // medir_fred_respiratoria
                }
            }), 3); // leito

        /*
         Scene:  Posto de Enfermagem  -   4
         */

        // # 15 - Abrir gaveta
        // # 20 - Ir para o corredor
        level1.registerAction(new Action("Ir ao corredor", "action-ir_corredor",
            function () {
                L.log("Action: ir_corredor");
                core.changeScene(1);
            }), 4); // posto de enfermagem
        level1.registerAction(new Action("abrir_gaveta", "action-abrir_gaveta",
            function () {
                L.log("Action: abrir_gaveta");
                // abrir janela de objeto
            }), 4); // posto de enfermagem
        // # 16 - Pegar termometro
        level1.registerAction(new Action("pegar_termometro", "action-pegar_termometro",
            function () {
                L.log("Action: pegar_termometro");
                if (level1.getFlags()[3] == true) {
                    level1.getFlags()[4] = true;    // termometro
                    level1.getFlags()[7] = false;   // nega - lavar_maos
                }
            }), 4); // posto de enfermagem
        // # 17 - Pegar Medidor de Pressao
        level1.registerAction(new Action("pegar_medidor_pressao", "action-pegar_medidor_pressao",
            function () {
                L.log("Action: pegar_medidor_pressao");
                if (level1.getFlags()[3] == true) {
                    level1.getFlags()[5] = true;    // medidor_pressao
                    level1.getFlags()[7] = false;   // nega - lavar_maos
                }
            }), 4); // posto de enfermagem
        // # 18 - Pegar Oximetro
        level1.registerAction(new Action("pegar_oximetro", "action-pegar_oximetro",
            function () {
                L.log("Action: pegar_oximetro");
                if (level1.getFlags()[3] == true) {
                    level1.getFlags()[6] = true;    // oximetro
                    level1.getFlags()[7] = false;   // nega - lavar_maos
                }
            }), 4); // posto de enfermagem
        // # 19 - Fechar gaveta
        level1.registerAction(new Action("fechar_gaveta", "action-fechar_gaveta",
            function () {
                L.log("Action: fechar_gaveta");
                // fechar janela de objeto
            }), 4); // posto de enfermagem

        /*
         Interactive Objects
         */

        /*
         Scene:  Recepcao
         */
        // # 3 - Falar com recepcionista
        level1.registerInteractiveObject(new InteractiveObject("Falar com recepcionista", "intObj-falar_com_recepcionista",
            function () {
                L.log("intObj: falar com recepcionista");
                core.openDialog(0, 0);
            }), 0); // recepcao

        level1.registerInteractiveObject(new InteractiveObject("Ir para o corredor", "intObj-ir_corredor_esq",
            function () {
                L.log("intObj: Ir para o corredor esquerda");
                core.changeScene(1);
            }), 0); // recepcao

        level1.registerInteractiveObject(new InteractiveObject("Ir para o corredor", "intObj-ir_corredor_dir",
            function () {
                L.log("intObj: Ir para o corredor direita");
                core.changeScene(1);
            }), 0); // recepcao

        /*
         Scene:  Corredor
         */
        level1.registerInteractiveObject(new InteractiveObject("Ir para o posto de enfermagem", "intObj-ir_posto_de_enfermagem",
            function () {
                L.log("intObj: Ir para o posto de enfermagem");
                core.changeScene(4);
            }), 1); // corredor

        level1.registerInteractiveObject(new InteractiveObject("Ir para a sala de leitos", "intObj-ir_sala_de_leitos",
            function () {
                L.log("intObj: Ir para a sala de leitos");
                core.changeScene(2);
            }), 1); // corredor

        /*
         Scene:  Leito
         */

        // # 9 - Ver pulseira do paciente]
        /*
         level1.registerInteractiveObject("pulseira_paciente", "object-pulseira_paciente",
         new Action("pulseira_paciente", "action-pulseira_paciente",
         function(){
         L.log("Action: pulseira_paciente");
         // altera flag pulseira_paciente
         level1.getFlags()[1] = true;
         }), 3);
         */

        game.registerLevel(level1);
        L.groupEnd();
        L.groupEnd();
    });