define(["Images"], function(Images){
    console.info("ImageLoader - module loaded");
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

    var paths = getAsArray(Images.paths);
    console.info("Images to load: ", paths.length);
    var loaded = 0;


    function onLoad(event){
        loaded++;
        console.log("Loaded Image", event.path[0].src);

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