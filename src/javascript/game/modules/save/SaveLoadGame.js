define(["SimpleStorage"], function(Storage){

    function SaveObject(name){
        this.name = name;

        this.lastLevel = 0;

        this.levels = [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined

        ];
    }

    var Errors = {
        id_out_range: "Save id must be: 0 <= id <= 2. Passed id: "
    };

    var SAVES_CONTAINER = "saves_container";
    var SAVES_CONTAINER_EMPTY_SLOTS = [undefined, undefined, undefined];

    var saves;
    var loadedId;

    saves = Storage.get(SAVES_CONTAINER);
    //"SavesContainer" not existe
    if(saves === undefined){
        //Create "Saves"
        creatEmptySaves();
    }

    function creatEmptySaves(){
        Storage.set(SAVES_CONTAINER, SAVES_CONTAINER_EMPTY_SLOTS);
        saves = SAVES_CONTAINER_EMPTY_SLOTS;
    }

    console.groupCollapsed("Loading saved files:");
    for(i in saves){
        var save = saves[i];
        if(save !== undefined){
            console.log("Slot #"+i+" = "+save.name);
        }else{
            console.log("Slot #"+i+" is empty");
        }
    }
    console.groupEnd();

    function load(id){
        if(id < 0 || id > 2)
            throw new Error(Errors.id_out_range+id);

        console.log("Loading save from: " + saves[id].name + " id: "+id);
        loadedId = id;
        return saves[id];
    }

    function resetAll(){
        Storage.flush();
        creatEmptySaves();
    }

    function reset(id){
        if(id < 0 || id > 2)
            throw new Error(Errors.id_out_range+id);

        saves[id] = undefined;
        Storage.set(SAVES_CONTAINER, saves);
    }

    function save(){
        Storage.set(SAVES_CONTAINER, saves);
    }

    function addScore(levelId, scoreId){
        if(levelId < 0 || levelId > 8)
            throw new Error("LevelId Failed");

        var level = saves[loadedId].levels[levelId];

        if(level === undefined){
            level = [scoreId];
        }else if(level instanceof Array){
            level.push(scoreId);
        }else{
            console.error("This should not happen");
        }

        saves[loadedId].levels[levelId] = level;
    }

    function resetScore(levelId){
        if(levelId < 0 || levelId > 8)
            throw new Error("LevelId Failed");

        saves[loadedId].levels[levelId] = undefined;
    }

    function setupSlot(id, name){
        saves[id] = new SaveObject(name);
        save();
    }

    console.log("Setupping new slot for test");
    setupSlot(0, "Otho");

    // Public Interface for returning saved files
    return {
        load: load,
        save: save,
        setupSlot: setupSlot,
        reset: reset,
        resetAll: resetAll,

        addScore: addScore,
        resetScore: resetScore
    };
});