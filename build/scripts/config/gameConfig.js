
/*
	This module has every wrold variable from each game level so it can be easily loaded inside the game.
	New levels can easily be made by adding new game levels.
	
*/

define(['stateMachineInterface', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag'], function(game, Scene, Action, Level, Dialog, InteractiveObject, Flag)
{
	

	var level1 = new Level("Level 1", isEndOfLevel1, getNextLevel1);

	function isEndOfLevel1(){}
	function getNextLevel1(){}

	//Registering Scenes of level 1
	level1.registerScene(new Scene("Recepção", "scene-recepcao", function(){
        
    }));
	level1.registerScene(new Scene("Corredro", "scene-corredor"));
	level1.registerScene(new Scene("Sala de leitos", "scene-sala_de_leitos"));
	level1.registerScene(new Scene("Leito 1", "scene-leito"));
	level1.registerScene(new Scene("Posto de Enfermagem", "scene-posto_de_enfermagem"));
	
	level1.setInitialScene(0);

	level1.registerDialog(new Dialog("Rose", "char-speak-recepcionista", "Fala numero 1. Testando o dialog"), 0);





	game.registerLevel(level1);
	

	
})