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

    var html = require("text!../html/equipoGotejamento/equipoGotejamento.html");

    var canvasSelector = "#equipoGotejamento";

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
    breathing.x = 120;
    breathing.y = 0;
    breathing.width = 140;
    breathing.height = 610;
    breathing.srWidth = 314;
    breathing.srHeight = 1426;
    breathing.frameTotal = 20;
    breathing.cyclesPerMinute = 60;
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

        img.src = "./images/modalScenes/equipo/gotas_0" + i + ".png";
    }

    function init( selector ) {
        $( selector ).append( html );

        var canvas = $( canvasSelector )[ 0 ];
        canvas.setAttribute("width", 800 );
        canvas.setAttribute("height", 600 );

        $( ".less" ).click(function() {
            console.log("less");
            slower();
        });

        $( ".plus" ).click(function() {
            console.log("plus");
            faster();
        });

        console.info("FreqRespiratoria added to stage");
    }

    function open() {
        $( canvasSelector ).show();

        breathing.frameCounter = 0;

        tick.accumulator = 0;
        tick.last = new Date().getTime();
        state = STATES.playing;

        animationLoop();
    }

    function close() {
        $( canvasSelector ).hide();

        state = STATES.stopped;
    }


    function update() {
        breathing.update();
    }

    function draw( canvas ) {
        ctx = canvas.getContext("2d");
        ctx.clearRect( 0, 0, 800, 600 );

        breathing.draw( canvas );
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

    function faster() {
        breathing.cyclesPerMinute += 1;
        breathing.frameTime = 1000 * 60 / breathing.cyclesPerMinute / breathing.frameTotal;
    }

    function slower() {
        if ( breathing.cyclesPerMinute - 1 > 0 ) {
            breathing.cyclesPerMinute -= 1;
            breathing.frameTime = 1000 * 60 / breathing.cyclesPerMinute / breathing.frameTotal;
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
