/**
 * This module ensures that all the images that are going to be used during the game are already loaded in cache before
 * they are requested. This way there is no load time between scenes.
 *
 * For this module works properly it must receive a json object with all images urls
 * @name Image Loader
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define(["Images"], function(Images){
    console.info("ImageLoader - module loaded");

    var paths = getAsArray(Images.paths);
    console.info("Images to load: ", paths.length);
    var loaded = 0;

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
            arr.push(Images.baseDir + obj);
        }

        return arr;
    }

    function onLoad(){
        var evt = arguments[0];

        loaded++;
        //console.log(arguments.length, arguments[0]);
        console.log("Loaded Image: " + evt.target.src);

        if(loaded == paths.length) {
            console.groupEnd();
            window.init();
        }
    }

    console.groupCollapsed("Loading Images: ");
    for(id in paths){
        var path = paths[id];
        var image = new Image();


        image.onload = onLoad;
        image.src = path;
    }

});