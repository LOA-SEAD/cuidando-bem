define(function(){
    console.info("Player - module loaded");

    var Sounds = require('Sounds');

    var isMuted = false;
    var pastMasterVolume;

    var loopList;
    var loopId;
    var isSoundLooping  = false;
    var loopSound = undefined;
    var pastLoopSound = undefined;

    var rangeList;
    var rangeSoundId;
    var pastRangeSoundId;
    var isRangePlaying = false;
    var rangeSound = undefined;
    var pastRangeSound = undefined;

    var audios = {};
    var masterVolume = Sounds.masterVolume;

    function deepCopy(from, to){
        for(audio in from){
            if(typeof from[audio] === "object"){
                if(from[audio] instanceof Array){
                    to[audio] = [];
                }else{
                    to[audio] = {};
                }
                deepCopy(from[audio], to[audio]);
            }else{
                var path = from[audio];
                var parser = path.split('.');
                var fileName = parser[0];
                var extension = parser[1];


                to[audio] = new Audio(Sounds.baseDir + path);
                sound = to[audio];

                console.log("\tName: " + fileName, "Extension: " + extension);

                sound.loop = false;
                sound.volume = Sounds.masterVolume;
                sound.load();
            }
        }
    }

    console.groupCollapsed("Loading Sounds: ");
    deepCopy(Sounds.paths, audios);
    console.groupEnd();

    function getAsArray(obj){
        var arr = [];
        if(typeof obj === "object"){
            if(obj instanceof Array){
                arr = arr.concat(obj);
            }else {
                for (x in obj) {
                    arr = arr.concat(getAsArray(obj[x]));
                }
            }
        }else{
            arr.push(obj);
        }

        return arr;
    }

    function playRandom(obj){
        var playList = getAsArray(obj);

        var randomId = Math.floor(Math.random() * playList.length);

        var sound = playList[randomId];

        play(sound);
    }

    function play(sound){
        if (window.chrome) {
            sound.load();
        }else{
            sound.currentTime = 0;
        }
        sound.play();

        console.log(sound);
    }

    function playInLoop(obj){
        if(!isSoundLooping){
            loopList = getAsArray(obj);
            isSoundLooping = true;
            loopId = -1;

            playNextInLoop()
        }
    }

    function stopLoop(){
        isSoundLooping = false;
        loopSound.pause();
    }

    function playNextInLoop(){

        loopId++;
        if(loopId >= loopList.length)
            loopId = 0;

        if(pastLoopSound !== undefined) {
            pastLoopSound.pause();
            pastLoopSound.removeEventListener('timeupdate', shouldPlayNextInLoop, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }

        pastLoopSound = loopSound;
        loopSound = loopList[loopId];

        play(loopSound);
        if(isSoundLooping) {
            loopSound.addEventListener('timeupdate', shouldPlayNextInLoop, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }
    }

    function shouldPlayNextInLoop(){
        var percentage = (this.currentTime*100)/this.duration;
        console.log(this.duration, this.currentTime, percentage+"%");

        if(percentage >= 98)
            playNextInLoop();
    }

    function playInRange(obj){
        if(!isRangePlaying){
            rangeList = getAsArray(obj);
            isRangePlaying = true;

            playNextInRange()
        }
    }

    function stopRange(){
        isRangePlaying = false;
        rangeSound.pause();
    }

    function playNextInRange(){
        rangeSoundId = Math.floor(Math.random() * rangeList.length);

        if(pastLoopSound !== undefined) {
            pastLoopSound.pause();
            pastLoopSound.removeEventListener('timeupdate', shouldPlayNextInRange, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }

        pastRangeSound = rangeSound;
        rangeSound = rangeList[rangeSoundId];

        play(rangeSound);
        if(isRangePlaying) {
            rangeSound.addEventListener('timeupdate', shouldPlayNextInRange, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }
    }

    function shouldPlayNextInRange(){
        var percentage = (this.currentTime*100)/this.duration;
        //console.log(this.duration, this.currentTime, percentage+"%");

        if(percentage >= 99)
            playNextInRange();
    }

    function setVolume(obj, volume){
        var playList = getAsArray(obj);

        for(sound in playList)
            playList[sound].volume = volume * masterVolume;
    }

    function mute(){
        if(!isMuted){

            isMuted = true;
        }
    }

    return{
        audios: audios,

        play: playRandom,
        setVolume: setVolume,

        playInLoop: playInLoop,
        stopLoop: stopLoop,

        playInRange:playInRange,
        stopRange: stopRange
    }
});