require(['requireConfig'], function(){


    require(['ImageLoader', 'Images_urls'], function(imageLoader, urls) {

        imageLoader.load(urls.baseDir, urls.paths, function () {
            console.log("Fine by me");
            require(['SaveLoadGame', 'Sounds_urls'], function (storage, urls) {
                require(['Player'], function (player) {

                    player.setMasterVolumeTo(urls.masterVolume);
                    player.load(urls.baseDir, urls.paths);

                    require(["jquery", "less"], function () {
                        console.group("Cuidando Bem Log:");
                        require(['jqueryui'], function() {
                            require(["Stage", "CuidandoBem", "gameConfig", "stageConfig", "Dialogs_data"],
                                function (Stage) {
                                    $('document').ready(function () {
                                        Stage.setContainer('#stage');
                                        Stage.start();
                                    });
                                });
                        });
                    });
                });
            });
        });

    });
});
