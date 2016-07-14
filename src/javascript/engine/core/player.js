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
 * This module's purpose is to provide an easy way to play sounds in a html5 application
 * It comes with a set of functions to play sounds in loops, a sinlge time, control global and
 * single volumes, etc
 *
 * It loads all sounds and get them ready to be played
 * @name Player
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */

define(function() {
    console.info("Player - module loaded");

    var isMuted = false;
    var masterVolume = 1;
    var pastMasterVolume = 1;

    var normalSound = undefined;
    var pastNormalSound = undefined;

    var loopList;
    var loopId;
    var isSoundLooping = false;
    var loopSound = undefined;
    var loopSoundBuffer = undefined;
    var pastLoopSound = undefined;
    var loopInterval;
    var totalAudios = 0;

    var rangeList;
    var rangeSoundId;
    var pastRangeSoundId;
    var isRangePlaying = false;
    var rangeSound = undefined;
    var rangeSoundBuffer = undefined;
    var pastRangeSound = undefined;
    var rangeInterval;

    var soundLoadedCallback;

    var audios = {};

    var BUFFER_BEFORE_LOOP = 25;

    function load( baseDir, pathsObj, _soundLoadedCallback ) {
        console.groupCollapsed("Loading Sounds: ");
        deepCopy( baseDir, pathsObj, audios );
        if ( isMuted ) {
            setSoundToMuted();
        }

        soundLoadedCallback = _soundLoadedCallback;

        return totalAudios;
        console.groupEnd();
    }

    function deepCopy( baseDir, from, to ) {
        var audio;
        for ( audio in from ) {
            if ( typeof from[ audio ] === "object") {
                if ( from[ audio ] instanceof Array ) {
                    to[ audio ] = [];
                } else {
                    to[ audio ] = {
                        _name: audio,
                        _volume: 1
                    };
                }
                deepCopy( baseDir, from[ audio ], to[ audio ] );
            } else {
                var path = from[ audio ];
                var parser = path.split(".");
                var fileName = parser[ 0 ];
                var extension = parser[ 1 ];


                to[ audio ] = new Audio( baseDir + path );
                sound = to[ audio ];

                console.log("\tName: " + fileName, "Extension: " + extension );

                sound.loop = false;
                sound.volume = (to._volume || 1) * masterVolume;
                sound.vol = sound.volume;
                sound.addEventListener( "canplaythrough", loadedEvent, true );
                sound.load();
                totalAudios++;
            }
        }
    }

    function loadedEvent(e) {
        soundLoadedCallback();
        e.target.removeEventListener( "canplaythrough", loadedEvent, true );
    }

    function getAsArray( obj ) {
        var arr = [];
        if ( typeof obj === "object") {
            if ( obj instanceof Array ) {
                arr = arr.concat( obj );
            } else {
                var x;
                for ( x in obj ) {
                    arr = arr.concat( getAsArray( obj[ x ] ) );
                }
            }
        } else {
            arr.push( obj );
        }

        return arr;
    }

    function playRandom( obj ) {
        var playList = getAsArray( obj );

        var randomId = Math.floor( Math.random() * playList.length );

        var sound = playList[ randomId ];

        play( sound );
    }

    function prepare( sound ) {
        if ( window.chrome ) {
            sound.load();
        } else {
            sound.currentTime = 0;
        }
    }

    function play( sound ) {
        console.log( "Starting: ", sound );
        normalSound = sound;

        prepare( normalSound );

        normalSound.play();

    }

    function justPlay( sound ) {
        sound.play();
    }

    function stop() {
        normalSound.pause();
    }

    function nextId( now, max ) {
        now++;
        if ( now >= max ) {
            now = 0;
        }

        return now;
    }

    function playInLoop( obj ) {
        if ( !isSoundLooping ) {
            loopList = getAsArray( obj );
            isSoundLooping = true;
            loopId = 0;

            loopSoundBuffer = loopList[ loopId ];

            playNextInLoop();
        }
    }

    function stopLoop() {
        if ( isSoundLooping ) {
            isSoundLooping = false;
            loopSound.pause();
            clearTimeout( loopInterval );
        }
    }

    function playNextInLoop() {
        loopId = nextId( loopId, loopList.length );

        if ( pastLoopSound !== undefined ) {
            //pastLoopSound.pause();
            clearTimeout( loopInterval );
        }

        pastLoopSound = loopSound;
        loopSound = loopSoundBuffer;

        loopSoundBuffer = new Audio( loopList[ loopId ].getAttribute("src") );
        loopSoundBuffer.volume = loopList[ loopId ].volume;

        prepare( loopSoundBuffer );
        justPlay( loopSound );

        if ( isSoundLooping ) {
            console.log("play in", loopSound.duration * 1000);
            loopInterval = setTimeout( playNextInLoop, (loopSound.duration * 1000) - BUFFER_BEFORE_LOOP );
        }
    }

    function playInRange( obj ) {
        if ( !isRangePlaying ) {
            rangeList = getAsArray( obj );
            isRangePlaying = true;
            rangeSoundId = getNextInRange();

            rangeSoundBuffer = rangeList[ rangeSoundId ];

            playNextInRange();
        }
    }

    function stopRange() {
        if ( isRangePlaying ) {
            isRangePlaying = false;
            rangeSound.pause();
        }
    }

    function getNextInRange() {
      var rangeIdArray = [];
      var i;

      for ( i in rangeList ) {
          rangeIdArray.push( i );
      }

      if ( rangeSoundId !== undefined ) {
          rangeIdArray.splice( rangeSoundId, 1 );
      }

      var randomId = Math.floor( Math.random() * rangeIdArray.length );

      return rangeIdArray[ randomId ];
    }

    function playNextInRange() {
        console.log( "Play Next in Range" );

        rangeSoundId = getNextInRange();

        if ( pastRangeSound !== undefined ) {
            // pastRangeSound.pause();
            clearTimeout( rangeInterval );
        }

        pastRangeSound = rangeSound;
        rangeSound = rangeSoundBuffer;

        rangeSoundBuffer = new Audio( rangeList[ rangeSoundId ].getAttribute("src") );
        rangeSoundBuffer.volume = rangeList[ rangeSoundId ].volume;

        prepare( rangeSoundBuffer );
        justPlay( rangeSound );

        if ( isRangePlaying ) {
            rangeInterval = setTimeout( playNextInRange, (rangeSound.duration * 1000) - BUFFER_BEFORE_LOOP );
        }
    }

    function setVolumeOfTo( obj, volume ) {
        var playList = getAsArray( obj );

        var soundId;
        for ( soundId in playList ) {
            var sound = playList[ soundId ];

            sound.vol = volume;
            sound.volume = volume * masterVolume;
        }
    }

    function resetAllVolumes() {
        var playList = getAsArray( audios );

        var soundId;
        for ( soundId in playList ) {
            var sound = playList[ soundId ];

            sound.volume = sound.vol * masterVolume;
        }
    }

    function setMasterVolumeTo( volume ) {
        masterVolume = volume;

        resetAllVolumes();
    }

    function setVolumeToCategory( category, volume ) {
        category._volume = volume;

        for ( sound in category ) {
            setVolumeOfTo( category[ sound ], volume * masterVolume );
        }

    }

    function mute() {
        SaveLoadGame.toggleMute();
        isMuted = !isMuted;

        setSoundToMuted();
    }

    function setSoundToMuted() {
        if ( isMuted ) {
            pastMasterVolume = masterVolume;

            setMasterVolumeTo( 0 );
        } else {
            setMasterVolumeTo( pastMasterVolume );
        }
    }

    function stopAll() {
        stop();
        stopLoop();
        stopRange();
    }

    return {
        audios: audios,

        load: load,
        play: playRandom,
        stop: stop,
        mute: mute,

        setVolumeOfTo: setVolumeOfTo,
        setVolumeToCategory: setVolumeToCategory,
        setMasterVolumeTo: setMasterVolumeTo,

        playInLoop: playInLoop,
        stopLoop: stopLoop,

        playInRange: playInRange,
        stopRange: stopRange,

        stopAll: stopAll
    };
});
