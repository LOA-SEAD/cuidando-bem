define(["Images"], function(Images){

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
    var loaded = 0;


    function onLoad(){
        loaded++;
    }

    for(image in paths)
        console.log(paths[image]);
	
	
});