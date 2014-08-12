/*
	This module has every wrold variable from each game level so it can be easily loaded inside the game.
	New levels can easily be made by adding new game levels.
	
*/

define(['stateMachine', 'Scene'], function(game, Scene)
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

	//Declare game levels functions
	game.addLevel(level1);
	game.setCurrentLevel(0);
	game.startCurrentLevel();
		
	
	function level1 ()
	{
		var nome = "bla";
		game.setCurrentScene("Recepcao");


	}

	
})