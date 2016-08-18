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
/**
 * This method adds all the events to the loadGame screen
 *
 * @name Screen_loadGame_Controller
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "Stage" ], function( Stage ) {

    var Player = require("Player");
    var Storage = require("Storage");

    /**
     * This method is called when the screen loadGame is loaded
     *
     * @method load
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function load() {
        $(".menuButton").click(function() {
            Player.play( Player.audios.sfx.selecionarMenu );
        });

        $(".backButton").click(function() {
            Stage.changeScreen( 6 );
        });

        animation();
    }

    function resetAnimation() {
      var container = "#screen-vitoria";
      var recepcao = $(".cena.recepcao", container);
      var corredor = $(".cena.corredor", container);
      var escritorio = $(".cena.escritorio", container);
      var mesa = $(".cena.mesa", container);

      recepcao.css("opacity", 1.0);
      $(".balao", recepcao).hide();
      corredor.css("opacity", 0);
      $(".porta", corredor).css("transform", "rotateY(0deg)");
      corredor.css("transform", "scale(1.0, 1.0)");
      escritorio.css("opacity", 0);
      $(".mentor1", escritorio).show();
      $(".mentor2", escritorio).hide();
      $(".braco", escritorio).hide();
      $(".antebraco", escritorio).hide();
      $(".balao", escritorio).hide();
      mesa.css("opacity", 0);
      $(".balao", mesa).hide();
      $(".mao", mesa).css("top", "-58%");
      $(".contrato", mesa).css("top", "-27%");

    }

    function wait( time, callback ) {
      setTimeout( callback, time );
    }

    function animation() {
      resetAnimation();
      // Parar todos os sons
      Player.stopAll();
      // Tocar música da animação

      //
      var container = "#screen-vitoria";
      var recepcao = $(".cena.recepcao", container);
      var corredor = $(".cena.corredor", container);
      var escritorio = $(".cena.escritorio", container);
      var mesa = $(".cena.mesa", container);
      wait( 1000, function() {
        $(".balao", recepcao).show();

        wait( 2000, function() {
          recepcao.animate({
            opacity: 0.0
          }, 1000, "swing", function () {
            // Aparecer porta do escritório
            corredor.animate({
              opacity: 1.0
            }, 1000, "swing", function () {
              var porta = $(".porta", corredor);
              Player.play(Player.audios.sfx.batendoNaPorta);
              wait( 500, function() {
                // Abrir porta
                porta.css("transform", "rotateY(45deg)");
                wait( 300, function() {
                  // Passar pela porta
                  corredor.animate({
                    opacity: 0.0,
                  }, {
                    step: function( now, fx ) {
                      var value = 1.0 + (0.5 - (now / 2));
                      corredor.css("transform", "scale(" + value + "," + value + ")");
                    },
                    duration: 2700
                  });
                  wait( 1300, function() {
                    escritorio.animate( {
                      opacity: 1.0
                    }, 2000, "swing", function() {
                      wait( 500, function() {
                        $(".mentor1", escritorio).hide();
                        $(".mentor2", escritorio).show();
                        $(".braco", escritorio).show();
                        $(".antebraco", escritorio).show();
                        $(".balao", escritorio).show();
                        wait( 1500, function() {
                          $(mesa).animate({
                            opacity: 1.0
                          }, 1000, "swing");
                          wait( 200, function() {
                            Player.play(Player.audios.sfx.deslizarPapel);
                            $(".contrato", mesa).animate({
                              top: "14%"
                            }, 2200);
                            $(".mao", mesa).animate({
                              top: "-17%"
                            }, 2200, function() {
                              escritorio.css("opacity", 0);
                              $(".balao", mesa).show();
                              $(".mao", mesa).animate({
                                top: "-58%"
                              }, 1800);
                              wait( 1500, function() {
                                $(".balao", mesa).hide();
                                wait( 3000, function() {
                                  $(mesa).animate({
                                    opacity: 0.0
                                  }, 2000, "swing", function() {
                                    Storage.seeCredits();
                                    Stage.changeScreen( 3 );
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        })
      })

    }

    /**
     * This method is called when the screen loadGame is unloaded
     *
     * @method unload
     * @public
     *
     * @memberOf module:Screen_loadGame_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    };

});
