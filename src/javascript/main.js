require(["Stage", "CuidandoBem", "Storage", "gameConfig", "stageConfig"], function (Stage, core, Storage) {
    $('document').ready(function () {
        //When everything is loaded ...
        console.log("OTHO SAVE: " + Storage.get("Otho"));
        Storage.set("Otho", "SAVE SALVO");

        Stage.setContainer('Stage');
        Stage.start();
    });
});
