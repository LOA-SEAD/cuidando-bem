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
        //image.onload = function(){console.log("AAAAAAbAAAAAAAAAAAAAAAAAAAA")};
        image.src = path;
    }

});