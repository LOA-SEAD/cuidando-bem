/*

 Logger adds custom functions that help you logging and debuging your app

 */

function Logger(){

    var debug_mode = true;

    function debug(){
        if(debug_mode) {
            return function () {
                debugger;
            }
        }
    }

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
            exec(msg, ident, 'error');
        }
    }

    function info(msg, ident){
        if(debug_mode){
            exec(msg, ident, 'info');
        }
    }

    function log(msg, ident){
        if(debug_mode){
            exec(msg, ident, 'log');
        }

    }

    function warn(msg, ident){
        if(debug_mode){
            exec(msg, ident, 'warn');
        }
    }

    function table(msg, ident){
        if(debug_mode){
            exec(msg, ident, 'table');
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

    function exec(msg, ident, command){
        var loggerCounter;
        var iden = makeIdentation(ident);
        var arg = "";

        if(iden != "") {
            arg += '"' + iden + '"';
            if(typeof msg == "string")
                arg+= '+';
        }



        if(typeof msg == 'object'){
            for (loggerCounter = 0; loggerCounter < msg.length; loggerCounter++) {
                if (loggerCounter == 0 && arg == "")
                    arg += "msg["+loggerCounter+"]";
                else
                    arg += ", " + "msg["+loggerCounter+"]";
            }
        }else{
            arg += '"'+msg+'"';
        }

        var fullCommand  ='console.'+command+'('+arg+');';
        eval(fullCommand);
    }

    return {
        debug: debug,
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
