require(["stage", "core", "gameConfig", "stageConfig"], function (stage, core) {
    $('document').ready(function () {
        //When everything is loaded ...
        stage.setContainer('game');
        stage.start();
        stage.changeScreen(0);
    });
});
