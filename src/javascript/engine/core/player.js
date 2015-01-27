define(function(){
    console.info("Player - module loaded");

    var Sounds = require('Sounds');
    var SaveLoadGame = require('SaveLoadGame');

    var isMuted = SaveLoadGame.isMuted();
    var masterVolume = Sounds.masterVolume;
    var pastMasterVolume;

    var normalSound = undefined;
    var pastNormalSound = undefined;

    var loopList;
    var loopId;
    var isSoundLooping  = false;
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

    var audios = {};

    var AUDIO_PERCENTAGE_TO_NEXT_IN_LOOP = 99.9;
    var AUDIO_PERCENTAGE_TO_NEXT_IN_RANGE = 98.5;



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
                sound.vol = sound.volume;
                sound.load();
            }
        }
    }

    console.groupCollapsed("Loading Sounds: ");
    deepCopy(Sounds.paths, audios);
    if(isMuted)
        setSoundToMuted();
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

    function prepare(sound){
        if (window.chrome) {
            sound.load();
        }else{
            sound.currentTime = 0;
        }
    }

    function play(sound){
        normalSound = sound;

        prepare(normalSound);

        normalSound.play();

        //console.log(sound);
    }

    function justPlay(sound){
        sound.play();
    }

    function stop(){
        normalSound.pause();
    }

    function nextId(now, max){
        now++;
        if(now >= max)
            now = 0;

        return now;
    }

    function playInLoop(obj){
        if(!isSoundLooping){
            loopList = getAsArray(obj);
            isSoundLooping = true;
            loopId = 0;

            loopSound = loopList[loopId];

            loopSoundBuffer = new Audio(loopList[nextId(loopId, loopList.length)].getAttribute('src'));
            loopSoundBuffer.volume = loopList[nextId(loopId, loopList.length)].vol;
            prepare(loopSoundBuffer);

            pastLoopSound = loopSound;
            //loopSound.addEventListener('timeupdate', shouldPlayNextInLoop, false);
            loopInterval = setInterval(shouldPlayNextInLoop, 4);

            play(loopSound);
            //playNextInLoop();
        }
    }

    function stopLoop(){
        if(isSoundLooping) {
            isSoundLooping = false;
            loopSound.pause();
            clearInterval(loopInterval);
        }
    }

    function playNextInLoop(){
        loopId = nextId(loopId, loopList.length);

        if(pastLoopSound !== undefined) {
            clearInterval(loopInterval);
            //console.log("CLEAR");
            //pastLoopSound.pause();
            //loopSound.removeEventListener('timeupdate', shouldPlayNextInLoop, false);
            //loopSoundBuffer.removeEventListener('timeupdate', shouldPlayNextInLoop, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }

        pastLoopSound = loopSound;
        loopSound = loopSoundBuffer;
        delete loopSoundBuffer;
        loopSoundBuffer = new Audio(loopList[loopId].getAttribute('src'));
        loopSoundBuffer.volume = loopList[loopId].volume;
        //loopSoundBuffer = loopList[loopId];


        prepare(loopSoundBuffer);
        justPlay(loopSound);

        if(isSoundLooping) {
            console.log("PLAY");
            loopInterval = setInterval(shouldPlayNextInLoop, 4);
            //loopSound.addEventListener('timeupdate', shouldPlayNextInLoop, false);
            //loopSoundBuffer.addEventListener('timeupdate', shouldPlayNextInLoop, false);
            //pastLoopSound.removeEventListener('ended', playNextInLoop, false);
        }
    }

    function shouldPlayNextInLoop(){
        var percentage = (loopSound.currentTime*100)/loopSound.duration;
        //console.log(loopSound.duration, loopSound.currentTime, percentage+"%");

        if(percentage >= AUDIO_PERCENTAGE_TO_NEXT_IN_LOOP)
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
        if(isRangePlaying) {
            isRangePlaying = false;
            rangeSound.pause();
        }
    }

    function playNextInRange(){
        var rangeIdArray = [];
        for(i in rangeList)
            rangeIdArray.push(i);

        pastRangeSoundId = rangeSoundId;

        if(pastRangeSoundId !== undefined) {
            rangeIdArray.splice(pastRangeSoundId, 1);
        }

        rangeSoundId = rangeIdArray[Math.floor(Math.random() * rangeIdArray.length)];

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

        if(percentage >= AUDIO_PERCENTAGE_TO_NEXT_IN_RANGE)
            playNextInRange();
    }

    function setVolumeOfTo(obj, volume){
        var playList = getAsArray(obj);

        for(soundId in playList) {
            var sound = playList[soundId];
            sound.vol = volume;
            sound.volume = volume * masterVolume;
        }
    }

    function resetAllVolumes(){
        var playList = getAsArray(audios);

        for(soundId in playList) {
            var sound = playList[soundId];

            sound.volume = sound.vol * masterVolume;
        }
    }

    function setMasterVolumeTo(volume){
        masterVolume = volume;

        resetAllVolumes();
    }

    function mute(){
        SaveLoadGame.toggleMute();
        isMuted = !isMuted;

        setSoundToMuted();
    }
    function setSoundToMuted(){
        if (isMuted) {
            pastMasterVolume = masterVolume;

            setMasterVolumeTo(0);
        } else {
            setMasterVolumeTo(pastMasterVolume);
        }
    }

    function stopAll(){
        stop();
        stopLoop();
        stopRange();
    }

    return{
        audios: audios,

        play: playRandom,
        stop: stop,
        mute: mute,

        setVolumeOfTo: setVolumeOfTo,
        setMasterVolumeTo: setMasterVolumeTo,

        playInLoop: playInLoop,
        stopLoop: stopLoop,

        playInRange:playInRange,
        stopRange: stopRange,

        stopAll: stopAll
    }
});