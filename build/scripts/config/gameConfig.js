/*
	This module has every wrold variable from each game level so it can be easily loaded inside the game.
	New levels can easily be made by adding new game levels.
	
*/

define(['stateMachineInterface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'ModalScene'], function(game, Scene, Action, Level, Dialog, InteractiveObject, ModalScene)
{
	//Declare game Scenes
	

	game.addScene(new Scene("Ala Masculina", "scene-ala_masculina"));
	game.addScene(new Scene("Ala Feminina", "scene-ala_feminina"));
	game.addScene(new Scene("Centro Cirurgico", "scene-centro_cirurgico"));
	game.addScene(new Scene("Corredor", "scene-corredor"));
	game.addScene(new Scene("Enfermaria", "scene-enfermaria"));
	game.addScene(new Scene("Posto de Enfermagem", "scene-posto_de_enfermagem"));
	game.addScene(new Scene("Recepcao", "scene-recepcao"));

	
	//Declare game Modal Scenes
	;

	//Declare game Interactive Objects
	;

	//Declare game Actions
	;		

	//Declare game levels functions
	;

	var level = new Level("level0", 6, 7);

	level.addAction(new Action("irParaCorredor", "corredor", function(){;


	game.addLevel(level);
	

	
})