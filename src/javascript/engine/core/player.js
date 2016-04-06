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
    var pastMasterVolume;

    var normalSound = undefined;
    var pastNormalSound = undefined;

    var loopList;
    var loopId;
    var isSoundLooping = false;
    var loopSound = undefined;
    var loopSoundBuffer = undefined;
    var pastLoopSound = undefined;
    var loopInterval;

    var rangeList;
    var rangeSoundId;
    var pastRangeSoundId;
    var isRangePlaying = false;
    var rangeSound = undefined;
    var rangeSoundBuffer = undefined;
    var pastRangeSound = undefined;
    var rangeInterval;

    var audios = {};

    var AUDIO_PERCENTAGE_TO_NEXT_IN_LOOP = 99.9;
    var AUDIO_PERCENTAGE_TO_NEXT_IN_RANGE = 98.5;


    function load( baseDir, pathsObj ) {
        console.groupCollapsed("Loading Sounds: ");
        deepCopy( baseDir, pathsObj, audios );
        if ( isMuted ) {
            setSoundToMuted();
        }
        console.groupEnd();
    }

    function deepCopy( baseDir, from, to ) {
        var audio;
        for ( audio in from ) {
            if ( typeof from[ audio ] === "object") {
                if ( from[ audio ] instanceof Array ) {
                    to[ audio ] = [];
                } else {
                    to[ audio ] = {};
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
                sound.volume = masterVolume;
                sound.vol = sound.volume;
                sound.load();
            }
        }
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

            loopSound = loopList[ loopId ];

            var nextInLoop = loopList[ nextId( loopId, loopList.length ) ];

            loopSoundBuffer = new Audio( nextInLoop.getAttribute("src") );
            loopSoundBuffer.volume = loopList[ nextId( loopId, loopList.length ) ].vol;
            prepare( loopSoundBuffer );

            pastLoopSound = loopSound;
            // loopSound.addEventListener('timeupdate', shouldPlayNextInLoop, false);
            loopInterval = setInterval( shouldPlayNextInLoop, 4 );

            play( loopSound );
            // playNextInLoop();
        }
    }

    function stopLoop() {
        if ( isSoundLooping ) {
            isSoundLooping = false;
            loopSound.pause();
            clearInterval( loopInterval );
        }
    }

    function playNextInLoop() {
        loopId = nextId( loopId, loopList.length );

        if ( pastLoopSound !== undefined ) {
            clearInterval( loopInterval );
            // console.log("CLEAR");
            // pastLoopSound.pause();
            // loopSound.removeEventListener('timeupdate', shouldPlayNextInLoop, false);
            // loopSoundBuffer.removeEventListener('timeupdate', shouldPlayNextInLoop, false);
            // pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }

        pastLoopSound = loopSound;
        loopSound = loopSoundBuffer;
        delete loopSoundBuffer;
        loopSoundBuffer = new Audio( loopList[ loopId ].getAttribute("src") );
        loopSoundBuffer.volume = loopList[ loopId ].volume;
        // loopSoundBuffer = loopList[loopId];

        prepare( loopSoundBuffer );
        justPlay( loopSound );

        if ( isSoundLooping ) {
            loopInterval = setInterval( shouldPlayNextInLoop, 4 );
        }
    }

    function shouldPlayNextInLoop() {
        var percentage = (loopSound.currentTime * 100) / loopSound.duration;
        // console.log(loopSound.duration, loopSound.currentTime, percentage+"%");

        if ( percentage >= AUDIO_PERCENTAGE_TO_NEXT_IN_LOOP ) {
            playNextInLoop();
        }
    }

    function playInRange( obj ) {
        if ( !isRangePlaying ) {
            rangeList = getAsArray( obj );
            isRangePlaying = true;

            playNextInRange();
        }
    }

    function stopRange() {
        if ( isRangePlaying ) {
            isRangePlaying = false;
            rangeSound.pause();
        }
    }

    function playNextInRange() {
        console.log( "Play Next in Range" );
        var rangeIdArray = [];
        var i;

        for ( i in rangeList ) {
            rangeIdArray.push( i );
        }

        pastRangeSoundId = rangeSoundId;

        if ( pastRangeSoundId !== undefined ) {
            rangeIdArray.splice( pastRangeSoundId, 1 );
        }

        var randomId = Math.floor( Math.random() * rangeIdArray.length );
        console.log( randomId );
        rangeSoundId = rangeIdArray[ randomId ];

        if ( pastLoopSound !== undefined ) {
            pastLoopSound.pause();
            clearInterval( rangeInterval );
        }

        pastRangeSound = rangeSound;
        rangeSound = rangeList[ rangeSoundId ];

        justPlay( rangeSound );

        if ( isRangePlaying ) {
            loopInterval = setInterval( shouldPlayNextInRange, 4 );
        }
    }

    function shouldPlayNextInRange() {
        var percentage = (rangeSound.currentTime * 100) / rangeSound.duration;

        if ( percentage >= AUDIO_PERCENTAGE_TO_NEXT_IN_RANGE ) {
            playNextInRange();
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
        setMasterVolumeTo: setMasterVolumeTo,

        playInLoop: playInLoop,
        stopLoop: stopLoop,

        playInRange: playInRange,
        stopRange: stopRange,

        stopAll: stopAll
    };
});
