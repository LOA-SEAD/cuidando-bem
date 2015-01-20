define(function(){
    console.info("Player - module loaded");

    var Sounds = require('Sounds');

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

    function play(obj){
        var playList = getAsArray(obj);

        var randomId = Math.floor(Math.random() * playList.length);

        var sound = playList[randomId].cloneNode();

        sound.currentTime = 0;
        sound.play();

        console.log(sound);
    }

    function setVolume(obj, volume){
        var playList = getAsArray(obj);

        for(sound in playList)
            playList[sound].volume = volume * masterVolume;
    }

    function setLoop(obj, loop){
        var playList = getAsArray(obj);

        for(sound in playList)
            playList[sound].loop = loop;
    }

    return{
        audios: audios,
        play: play,
        setVolume: setVolume,
        setLoop: setLoop
    }
});