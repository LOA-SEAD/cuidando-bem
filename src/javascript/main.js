require(["Stage", "CuidandoBem", "SimpleStorage", "gameConfig", "stageConfig"], function (Stage, core, Storage) {
    $('document').ready(function () {
        //When everything is loaded ...
        Stage.setContainer('Stage');
        Stage.start();
    });
});
