/**
 * This method adds all the events to the configuration screen
 *
 * @name Screen_configuration_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage", "Storage" ], function( Stage, Storage ) {

    var Player = require("Player");

    var sfxMuted = Storage.isSfxMuted();
    var sfxVolume = Storage.getSfxVolume();
    var musicMuted = Storage.isMusicMuted();
    var musicVolume = Storage.getMusicVolume();

    var sfxVolumeBeforeMute = Storage.getSfxVolume();
    var musicVolumeBeforeMute = Storage.getMusicVolume();

    /**
     * This method is called when the screen Configuration is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_configuration_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 0 );
        });

        $(".slider.sfx").slider({
            value: sfxVolume * 100,
            max: 100
        });

        $(".slider.music").slider({
            value: musicVolume * 100,
            max: 100
        });

        if ( sfxMuted ) {
            $(".mute.sfx").addClass( "desactive" );
        }

        if ( musicMuted ) {
            $(".mute.music").addClass( "desactive" );
        }

        $(".slider.sfx").on( "slide", function( event, ui ) {
            Storage.setSfxVolume( ui.value / 100 );
            Player.setVolumeToCategory( Player.audios.sfx, ui.value / 100 );
            sfxVolume = ui.value / 100;
        });

        $(".slider.music").on( "slide", function( event, ui ) {
            Storage.setMusicVolume( ui.value / 100 );
            Player.setVolumeToCategory( Player.audios.musics, ui.value / 100 );
            musicVolume = ui.value / 100;
        });

         $(".mute.sfx").on( "click", function( event ) {
            if ( !sfxMuted ) {
                $( this ).addClass( "desactive" );
                sfxVolumeBeforeMute = sfxVolume;
                Player.setVolumeToCategory( Player.audios.sfx, 0 );
                sfxVolume = 0;
            } else {
                $( this ).removeClass( "desactive" );
                Player.setVolumeToCategory( Player.audios.sfx, sfxVolumeBeforeMute );
                sfxVolume = sfxVolumeBeforeMute;
            }
            Storage.toggleSfxMute();
            sfxMuted = !sfxMuted;
        });

        $(".mute.music").on( "click", function( event ) {
            if ( !musicMuted ) {
                $( this ).addClass( "desactive" );
                musicVolumeBeforeMute = musicVolume;
                Player.setVolumeToCategory( Player.audios.musics, 0 );
                musicVolume = 0;
            } else {
                $( this ).removeClass( "desactive" );
                Player.setVolumeToCategory( Player.audios.musics, musicVolumeBeforeMute );
                musicVolume = musicVolumeBeforeMute;
            }
            Storage.toggleMusicMute();

            musicMuted = !musicMuted;
        });
    }

    /**
     * This method is called when the screen Configuration is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_configuration_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
