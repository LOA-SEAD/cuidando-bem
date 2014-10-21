/*

 Logger adds custom functions that help you logging and debuging your app

 */

function Logger(){

    var debug_mode = true;

    function group(id, collapse){
        if(debug_mode) {
            if (collapse === true) {
                console.groupCollapsed(id);
            } else {
                console.group(id);
            }
        }
    }

    function groupEnd(){
        if(debug_mode){
            console.groupEnd();
        }
    }

    function count(id){
        if(debug_mode) {
            console.count(id);
        }
    }

    function dir(obj) {
        if (debug_mode){
            console.dir(obj);
        }
    }

    function error(msg, ident){
        if(debug_mode) {
            console.error(makeIdentation(ident), msg);
        }
    }

    function info(msg, ident){
        if(debug_mode){
            console.info(makeIdentation(ident), msg);
        }
    }

    function log(msg, ident){
        if(debug_mode){
            console.log(makeIdentation(ident), msg);
        }

    }

    function warn(msg, ident){
        if(debug_mode){
            console.warn(makeIdentation(ident), msg);
        }
    }

    function table(msg, ident){
        if(debug_mode){
            console.table(makeIdentation(ident), msg);
        }
    }

    function time(id){
        if(debug_mode){
            console.time(id);
        }
    }

    function timeEnd(id, ident){
        if(debug_mode){
            console.timeEnd(id);
        }
    }

    function makeIdentation(level){

        if(typeof level != "number")
            level = 0;

        var ident = "";
        var i;

        for(i = 0; i< level; i++){
            ident += "  ";
        }

        if(ident == "")
            return "";
        else
            return ident;
    }

    return {
        group: group,
        groupEnd: groupEnd,
        count: count,
        dir: dir,
        error: error,
        info: info,
        log: log,
        warn: warn,
        table: table,
        time: time,
        timeEnd: timeEnd
    }

}

var Logger = new Logger();
var L = Logger;
