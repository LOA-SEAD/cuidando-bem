/*
This file is part of Cuidando Bem.

    Cuidando Bem is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Cuidando Bem is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 This file loads all modules that are required for the game to work.

 @authro Otho - Marcelo Lopes Lotufo
 */

// Load requireConfig
require([ "requireConfig" ], function() {
    console.group("Cuidando Bem Log:");

    // Load jquery
    require([ "jquery", "Player", "Storage" ], function( $, player, storage ) {
        window.$ = $;

        // Load jqueryui
        require([ "jqueryui", "jquerymask" ], function() {
            // Load Stage module, stage configuration, game main Module, game configuration and all dialogs that will be used in game
            require([ "Stage", "stageConfig", "IsMobile" ], function( Stage ) {
                $("document").ready(function() {
                    // As soon as the html has been loaded, set the container for the Stage module and start it

                    Stage.setContainer("#stage");
                    Stage.start();

                    var width = $("#stage").width(),
                        fontSize =  width / 150 ;

                    fontSize = +fontSize.toFixed( 2 );

                    $("html").css("font-size", fontSize + "px");
                    $( window ).resize(function() {
                        var width = $("#stage").width(),
                            fontSize =  width / 150 ;

                        fontSize = +fontSize.toFixed( 2 );

                        $("html").css("font-size", fontSize + "px");
                    });
                });
                // Load imageLoader and ImagesUrls
                require([ "ImageLoader", "ImagesUrls", "SoundsUrls", "./menu/screenPreloaderController" ], function( imageLoader, images, sounds, preloader ) {
                    // Set SoundPlayer master volume
                    player.setMasterVolumeTo( sounds.masterVolume );
                    // Load all sound files ind SoundsUrls
                    var totalFilesToLoad = 0;

                    totalFilesToLoad += player.load( sounds.baseDir, sounds.paths,
                    function() {
                      preloader.fileLoaded();
                    });

                    // Asyncronosly load all the images in Image_urls
                    totalFilesToLoad += imageLoader.load( images.baseDir, images.paths, function() {
                        console.log("All images have been loaded");
                    },
                    function() {
                      preloader.fileLoaded();
                    });

                    preloader.setTotalFiles( totalFilesToLoad );

                    // Load Storage module
                    if ( storage.isSfxMuted() ) {
                        player.setVolumeToCategory( player.audios.sfx, 0 );
                    } else {
                        player.setVolumeToCategory( player.audios.sfx, storage.getSfxVolume() );
                    }

                    if ( storage.isMusicMuted() ) {
                        player.setVolumeToCategory( player.audios.musics, 0 );
                    } else {
                        player.setVolumeToCategory( player.audios.musics, storage.getMusicVolume() );
                    }
                    require([ "gameConfig", "CuidandoBem", "DialogsData" ], function( config ) {
                        config.load(function() {});
                    });
                });
            });
        });
    });
});
