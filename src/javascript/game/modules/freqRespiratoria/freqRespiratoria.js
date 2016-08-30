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
define(function( require ) {

  var html = require("text!../html/freqRespiratoria/freqRespiratoria.html");

  var canvasSelector = "#freqRespiratoria";

  var Player = require("Player");
  var respiracao;
  var bip;

  var STATES = {
    playing: 0,
    stopped: 1
  };

  var state = STATES.stopped;

  var tick = {
    last: undefined,
    passed: undefined,
    now: undefined,
    accumulator: 0,

    time: undefined,

    rate: 60
  };

  var clock = {
    x: 700,
    y: 300,
    radius: 60,
    angle: 0,
    line: 20,
    img: undefined,

    accumulator: 0,
    time: 1
  };
  tick.time = 1000 / tick.rate;

  function Animation() {
    this.x;
    this.y;

    this.frameTime;
    this.accumulator = 0;
    this.frameTotal;
    this.frameCounter = 0;
    this.cyclesPerMinute;

    this.img = [];
    this.hasToDraw = false;

    this.width;
    this.height;

    this.srWidth;
    this.srHeight;


    this.update = function() {

      this.accumulator += tick.time;

      while ( this.accumulator >= this.frameTime ) {

        this.frameCounter++;
        this.frameCounter = this.frameCounter % this.frameTotal;
        this.hasToDraw = true;

        this.accumulator -= this.frameTime;
      }
    };

    this.draw = function( canvas ) {
      if ( this.hasToDraw ) {
        var ctx = canvas.getContext("2d");

        var fx = this.frameCounter * this.width;

        var img = this.img[ this.frameCounter ];

        ctx.drawImage( img, 0, 0, this.srWidth, this.srHeight, this.x, this.y, this.width, this.height );
      }
    };
  }

  var breathing = new Animation();
  breathing.x = 50;
  breathing.y = 180;
  breathing.width = 400;
  breathing.height = 240;
  breathing.srWidth = 1920;
  breathing.srHeight = 1152;
  breathing.frameTotal = 12;
  breathing.cyclesPerMinute = 18;
  breathing.frameTime = 1000 * 60 / breathing.cyclesPerMinute / breathing.frameTotal;

  var imgsLoaded = 0;
  for ( i = 0; i < breathing.frameTotal; i++ ) {
    breathing.img.push( new Image() );

    breathing.img[ i ].onload = function() {
      console.log("Image " + i + " loaded");
      imgsLoaded++;
      // if(imgsLoaded==coin.frameTotal){
      // 	gameLoop();
      // }
    };

    var img = breathing.img[ i ];

    if ( i < 10 ) {
      i = "0" + i;
    }

    img.src = "./images/modalScenes/01_" + i + ".png";
  }

  clock.img = new Image();

  clock.img.src = "./images/modalScenes/relogioDigital.png";

  clock.img.onLoad = function() {
    console.log("Clock ('watch') image loaded");
  };


  function init( selector ) {
    $( selector ).append( html );

    var canvas = $( canvasSelector )[ 0 ];
    canvas.setAttribute("width", 800 );
    canvas.setAttribute("height", 600 );

    console.info("FreqRespiratoria added to stage");
  }

  function respira() {

    const HALF_TIME = ( 1000 * 60 / breathing.cyclesPerMinute ) / 2;

    Player.play( Player.audios.sfx.inspirando );
    var inspirou = true;
    var expirou = false;

    var count = 0;
    respiracao = setInterval(function() {

      if ( count == 0 ) {
        count = 1;
      } else if ( count == 1 ) {
        count = 0;
      }

      if ( count == 0 && !inspirou ) {
        Player.play( Player.audios.sfx.inspirando );
        inspirou = true;
        expirou = false;
      }

      if ( count == 1 && !expirou ) {
        Player.play( Player.audios.sfx.expirando );
        expirou = true;
        inspirou = false;
      }

    }, HALF_TIME );
  }

  function open() {
    // delay in seconds
    const DELAY = 8;

    Player.stopAll();
    $( canvasSelector ).show();

    clock.angle = -Math.PI / 2;
    clock.accumulator = 0;

    breathing.frameCounter = 0;

    tick.accumulator = 0;

    // AS SOLUÇÕES ACESSÍVEIS NÃO PODEM QUEBRAR O RESTO DO JOGO
    // NÃO PODE TER ESSE DELAY TODA VEZ QUE ALGUÉM ABRIR ESSA TELA
    // $("#accessible_log").empty();
    // $("<span>A respiração começará em " + DELAY + " segundos. Conte quantas vezes o paciente respira em 1 minuto. A cada minuto um bip é emitido.</span><br>").appendTo("#accessible_log");
    //
    // setTimeout(function() {
    //
    //   if ( $( canvasSelector ).is(":visible") ) {
    //
    state = STATES.playing;
    //
    tick.last = new Date().getTime();
    //
    animationLoop();
    //
    //     Player.playInLoop( Player.audios.sfx.ticTac );
    //
    //     bip = setInterval(function() {
    //       Player.play( Player.audios.sfx.bip );
    //     }, 60000 );
    //     respira();
    //   }
    //
    // }, DELAY * 1000 );
  }

  function close() {
    $( canvasSelector ).hide();
    state = STATES.stopped;
    Player.stop();
    clearInterval( bip );
    clearInterval( respiracao );
  }


  function update() {
    breathing.update();

    clock.accumulator += tick.time;
    while ( clock.accumulator >= clock.time ) {
      clock.angle += Math.PI * 2 / 1000 / 60;

      clock.accumulator -= clock.time;
    }
  }

  function draw( canvas ) {
    ctx = canvas.getContext("2d");
    ctx.clearRect( 0, 0, 800, 600 );

    breathing.draw( canvas );

    ctx.drawImage( clock.img, 0, 0, 350, 600, 601, 135, 200, 330 );

    ctx.beginPath();
    ctx.moveTo( clock.x, clock.y - clock.radius );
    ctx.lineTo( clock.x, clock.y - clock.radius + clock.line );

    ctx.moveTo( clock.x, clock.y + clock.radius );
    ctx.lineTo( clock.x, clock.y + clock.radius - clock.line );

    ctx.moveTo( clock.x - clock.radius, clock.y );
    ctx.lineTo( clock.x - clock.radius + clock.line, clock.y );

    ctx.moveTo( clock.x + clock.radius, clock.y );
    ctx.lineTo( clock.x + clock.radius - clock.line, clock.y );

    // ctx.arc(clock.x, clock.y, clock.radius, 0, Math.PI*2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0,0,0,130)";
    ctx.stroke();

    ctx.beginPath();
    px = Math.cos( clock.angle ) * clock.radius + clock.x;
    py = Math.sin( clock.angle ) * clock.radius + clock.y;

    ctx.moveTo( clock.x, clock.y );
    ctx.lineTo( px, py );

    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0,0,0,255)";
    ctx.stroke();
  }

  function animationLoop() {
    tick.now = new Date().getTime();
    tick.passed = tick.now - tick.last;
    tick.last = tick.now;

    tick.accumulator += tick.passed;

    while ( tick.accumulator >= tick.time ) {
      update();

      tick.accumulator -= tick.time;
    }

    draw( $( canvasSelector )[ 0 ] );

    if ( state == STATES.playing ) {
      window.requestAnimationFrame( animationLoop );
    }
  }

  function setFr( _fr ) {

    breathing.cyclesPerMinute = _fr;
    breathing.frameTime = 1000 * 60 / breathing.cyclesPerMinute / breathing.frameTotal;

  }

  return {
    init: init,
    setFr: setFr,

    open: open,
    close: close
  };
});
