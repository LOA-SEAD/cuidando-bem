require(["stage", "core", "gameConfig", "stageConfig"], function (stage, core) {
    $('document').ready(function () {
        //When everything is loaded ...
        stage.setContainer('stage');
        stage.start();
    });
});
