
/*
	This module has every wrold variable from each game level so it can be easily loaded inside the game.
	New levels can easily be made by adding new game levels.
	
*/

define(['stateMachineInterface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag'],
        function(game, Scene, Action, Level, Dialog, InteractiveObject, Flag)
{
	console.log("gameConfig Module Loaded");

	var level1 = new Level("Level 1", isEndOfLevel1, getNextLevel1);

	function isEndOfLevel1(){}
	function getNextLevel1(){}

	//Registering Scenes of level 1
	level1.registerScene(new Scene("recepcao", "scene-recepcao",
                            function(){console.log("primeira fase carregada");}));
	level1.registerScene(new Scene("corredor", "scene-corredor"));
	level1.registerScene(new Scene("sala_de_leitos", "scene-sala_de_leitos"));
	level1.registerScene(new Scene("leito", "scene-leito"));
	level1.registerScene(new Scene("posto_de_enfermagem", "scene-posto_de_enfermagem"));
	
	level1.setInitialScene(0);

    // Flags
    level1.registerFlag(new Flag("conversar_paciente", false));
    level1.registerFlag(new Flag("pulseira_paciente", false));
    level1.registerFlag(new Flag("confirmar_paciente", false));

    // Dialogs
	// # 3 - Falar com recepcionista
    level1.registerDialog(new Dialog("recepcionista", "char-recepcionista", "Recepcionista: Fala numero 1"), 0);
    // # 5 - Falar com Mentor
    level1.registerDialog(new Dialog("mentor", "char-mentor", "Mentor: Fala numero 1"), 0);
    // # 8 - Conversar com paciente
    level1.registerDialog(new Dialog("paciente", "char-paciente", "Paciente: Fala numero 1"), 0);


    // Actions
    // # 4 - Ir para corredor
    level1.registerAction(new Action("ir_corredor", "action-ir_corredor",
                            function(){
                                console.log("Action: ir_corredor");
                            }));
    // # 6 - Ir para sala de leitos
    level1.registerAction(new Action("ir_sala_de_leitos", "action-ir_sala_de_leitos",
                            function(){
                                console.log("Action: ir_sala_de_leitos");
                            }));
    // # 7 - Ir para leito
    level1.registerAction(new Action("ir_leito", "action-ir_leito",
                            function(){
                                console.log("Action: ir_leito");
                            }));
    // # 8 - Conversar paciente
    level1.registerAction(new Action("conversar_paciente", "action-conversar_paciente",
                            function(){
                                // get dialog conversar_paciente
                                console.log("Action: conversar_paciente");
                                // altera flag conversar_paciente
                                level1.getFlags()[0] = true;
        }));
    // # 9 - Ver pulseira do paciente
    level1.registerAction(new Action("pulseira_paciente", "action-pulseira_paciente",
                            function(){
                                console.log("Action: pulseira_paciente");
                                // altera flag pulsiera_paciente
                                level1.getFlags()[1] = true;
                            }));



	game.registerLevel(level1);
	

	
})