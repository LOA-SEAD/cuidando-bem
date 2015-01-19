define(function(){
    console.info("LOADING PLAYER");
    var Sounds = require('Sounds');

    var audios = {};
    var masterVolume = Sounds.masterVolume;

    function deepCopy(from, to){
        //console.log("deep");
        for(audio in from){
            if(typeof from[audio] === "object"){
                //console.group(audio + " deeper");
                if(from[audio] instanceof Array){
                    to[audio] = [];
                }else{
                    to[audio] = {};
                }
                deepCopy(from[audio], to[audio]);
                //console.groupEnd();
            }else{
                //console.log(to);

                to[audio] = new Audio(Sounds.baseDir + from[audio]);
                sound = to[audio];
                sound.loop = false;
                sound.volume = Sounds.masterVolume;
                sound.load();
            }
        }
    }

    deepCopy(Sounds.paths, audios);

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

        playList[randomId].play();
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