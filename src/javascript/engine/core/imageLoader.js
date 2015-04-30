/**
 * This module ensures that all the images that are going to be used during the game are already loaded in cache before
 * they are requested. This way there is no load time between scenes.
 *
 * For this module to work properly it must receive a json object with all images urls
 * @name Image Loader
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([], function(){
    console.info("ImageLoader - module loaded");

    var loading = false;
    var loaded = 0;
    var imagesToLoad = 0;
    var callback;

    function getAsArray(baseDir, obj){
        var arr = [];
        if(typeof obj === "object"){
            if(obj instanceof Array){
                arr = arr.concat(obj);
            }else {
                for (x in obj) {
                    arr = arr.concat(getAsArray(baseDir, obj[x]));
                }
            }
        }else{
            arr.push(baseDir + obj);
        }

        return arr;
    }

    function onLoad(){
        var evt = arguments[0];

        loaded++;
        //console.log(arguments.length, arguments[0]);
        console.log("Loaded Image: " + evt.target.src);

        if(loaded == imagesToLoad) {
            console.groupEnd();
            loading = false;
            callback();
        }
    }


    function load(baseDir, pathObject, _callback){
        if(loading){
            throw new Error("Can't load two path objects at the same time");
        }
        else{
            loading = true;
            loaded = 0;


            callback = _callback;

            var paths = getAsArray(baseDir, pathObject);
            imagesToLoad = paths.length;

            console.info("Images to load: ", imagesToLoad);
            console.groupCollapsed("Loading Images: ");


            for(id in paths){
                var path = paths[id];
                var image = new Image();


                image.onload = onLoad;
                image.src = path;
            }
        }
    }

    return {
        load: load
    }
});