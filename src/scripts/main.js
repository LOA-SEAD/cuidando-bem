require( ["stage", "core", "gameConfig", "stageConfig"], function(stage, core){
    L.log("\n");
    L.log("APP: 'Cuidando Bem' Log:");
    L.log("\n");
    $('document').ready(function(){
    //When everything is loaded ...

        stage.start('game');
        stage.changeScreen(0);
    });
});
