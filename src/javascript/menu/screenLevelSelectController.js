/**
 * This method adds all the events to the levelSelect screen
 *
 * @name Screen_levelSelect_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage", "levelsData" ], function( Stage, game ) {

    var Player = require("Player");
    var Storage = require("Storage");
    var Dialogs = require("DialogsData");
    var Lib = require("Commons");

    var save;

    var text = "Selecione uma fase";

    var levelNames = [
        "1 - Identificação do Paciente",
        "2 - Prevenção de úlcera por pressão",
        "3 - Prevenção de quedas",
        "4 - Cirurgia segura",
        "5 - Medicação segura",
        "6 - Higienização das mãos",
        "7 - Infusão de dieta segura",
        "8 - Segurança na admnistração de medicação",
        "9 - Segurança em procedimentos cirúrgicos",
        "10 - Admnistração segura de medicação"
    ];

    /**
     * This method is called when the screen levelSelect is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_levelSelect_Controller
     */
    function load() {
        text = "Selecione uma fase";
        save = Storage.getLoadedSlot();

        // Change player name to save slot name
        Lib.characters.jogador.setName( save.name );


        var i;
        for ( i in save.levels ) {
            if ( i > save.lastLevel + 1 ) {
                $( $(".level")[ i ] ).addClass("disabled");
            }
        }

        $(".image", $(".level")[ save.lastLevel + 2 ] ).addClass("next");

        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 5 );
        });

        $(".level").click(function() {
            var index = $(".level").index( this );
            var levelId = index;

            if ( levelId <= save.lastLevel + 1 ) {
                text = levelNames[ index ];
                $("p.title").text( text );

                if ( $( this ).hasClass("selected") ) {
                    game.setCurrentLevel( levelId );
                    Stage.changeScreen( 1 );
                } else {
                    $(".level").removeClass("selected");
                    $( this ).addClass("selected");
                }
            }
        });

        $(".level").hover(
            function() {
                var index = $(".level").index( this );
                var levelId = index;

                if ( levelId <= save.lastLevel + 1 ) {
                    $("p.title").text( levelNames[ index ] );
                }
            },
            function() {
                var index = $(".level").index( this );
                var levelId = index;

                if ( levelId <= save.lastLevel + 1 ) {
                    $("p.title").text( text );
                }
            }
        );


    }

    /**
     * This method is called when the screen levelSelect is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_levelSelect_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
