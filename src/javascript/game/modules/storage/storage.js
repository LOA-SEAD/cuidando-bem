/**
 * @name SaveLoadGame
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "SimpleStorage" ], function( Storage ) {
    console.info("SaveLoadGame - module loaded");

    var
        MINLEVEL = 0,
        MAXLEVEL = 9;


    function SaveObject( name ) {
        this.name = name;
        this.empty = true;

        this.lastLevel = -1;

        this.levels = [
            undefined,
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

        this.getClone = function() {
            var clone = new SaveObject( this.name );
            clone.empty = this.empty;
            clone.lastLevel = this.lastLevel;
            clone.levels = this.levels;

            return clone;
        };
    }

    var emptySlot = new SaveObject("Novo Jogo");

    var Errors = {
        idOutRange: "Save id must be: 0 <= id <= 2. Passed id: "
    };

    var SAVES_CONTAINER_EMPTY_SLOTS = [ undefined, undefined, undefined ];

    var KEY_SAVES_CONTAINER = "saves_container";
    var KEY_MUTED = "is_muted";
    var KEY_SELECTED_ID = "selected_id";

    var saves;
    var loadedId;
    var selectedId;

    var muted;

    function init() {
        // Get saves data from storage module
        saves = Storage.get( KEY_SAVES_CONTAINER );

        // "SavesContainer" does not exist
        if ( saves === undefined || !(saves instanceof Array) || saves.length !== 3 ) {
            // Create "Saves"
            creatEmptySaves();
        }
        for ( i in saves ) {
            var save = saves[ i ];
            if ( !save instanceof SaveObject || save === null ) {
                save = emptySlot.getClone();
                saves[ i ] = save;
            }
        }
        saveSlots();

        // Get is muted data from storage module
        muted = Storage.get( KEY_MUTED );

        if ( muted === undefined || typeof muted !== "boolean") {
            muted = false;
            Storage.set( KEY_MUTED, muted );
        }

        selectedId = Storage.get( KEY_SELECTED_ID );

        if ( selectedId === undefined || typeof selectedId !== "number" || selectedId < 0 || selectedId > 3 ) {
            selectedId = 0;
            Storage.set( KEY_SELECTED_ID );
        } else {

        }
    }

    init();

    function creatEmptySaves() {
        saves = [
            emptySlot.getClone(),
            emptySlot.getClone(),
            emptySlot.getClone()
        ];

        Storage.set( KEY_SAVES_CONTAINER, saves );
    }

    // console.groupCollapsed("Loading saved files:");
    for ( i in saves ) {
        var save = saves[ i ];
        if ( save !== undefined && save !== null ) {
            console.log("Slot #" + i + " = " + save.name );
        } else {
            console.log("Slot #" + i + " is empty");
        }
    }
    // console.groupEnd();

    function load() {
        console.log("Loading all data");

        return saves;
    }

    function loadSlot( id ) {
        if ( id < 0 || id > 2 ) {
            throw new Error( Errors.idOutRange + id );
        }

        console.log("Loading save from: " + saves[ id ].name + " id: " + id );
        loadedId = id;
        return saves[ id ];
    }

    function getLoadedSlot() {
        return saves[ loadedId ];
    }

    function resetAll() {
        Storage.flush();
        init();
    }

    function reset( id ) {
        if ( id < 0 || id > 2 ) {
            throw new Error( Errors.idOutRange + id );
        }

        saves[ id ] = emptySlot.getClone();
        Storage.set( KEY_SAVES_CONTAINER, saves );
    }

    function saveSlots() {
        Storage.set( KEY_SAVES_CONTAINER, saves );
    }

    function addScore( levelId, score ) {
        if ( levelId < MINLEVEL || levelId > MAXLEVEL ) {
            throw new Error("LevelId Failed");
        }

        var level = saves[ loadedId ].levels[ levelId ];

        if ( level === undefined ) {
            level = [ score ];
        } else if ( level instanceof Array ) {
            level.push( score );
        } else {
            console.error("This should never happen.");
        }

        saves[ loadedId ].levels[ levelId ] = level;
    }

    function resetScore( levelId ) {
        if ( levelId < MINLEVEL || levelId > MAXLEVEL ) {
            throw new Error("LevelId Failed");
        }

        saves[ loadedId ].levels[ levelId ] = undefined;
    }

    function setupSlot( id, name ) {
        var save = saves[ id ];
        save.name = name;
        save.empty = false;

        saves[ id ] = save;

        saveSlots();
    }

    function setSelectedId( _id ) {
        selectedId = _id;
        Storage.set( KEY_SELECTED_ID, selectedId );
    }

    function toggleMute() {
        muted = !muted;
        Storage.set( KEY_MUTED, muted );
    }

    function isMuted() {
        return muted;
    }

    function getSelectedId() {
        return selectedId;
    }

    function unlockLevel( _id ) {
        var sav = saves[ loadedId ];

        if ( sav.lastLevel < _id ) {
            sav.lastLevel = _id - 1;
        }

        saveSlots();
    }

    // @dev {

    Storage.flush();

    saves[ 0 ] = new SaveObject("Testing");
    saves[ 0 ].lastLevel = MAXLEVEL;
    saves[ 0 ].empty = false;

    saveSlots();

    // }

    // Public Interface for returning saved files
    return {
        load: load,
        loadSlot: loadSlot,
        save: saveSlots,
        setupSlot: setupSlot,
        reset: reset,
        resetAll: resetAll,
        unlockLevel: unlockLevel,

        addScore: addScore,
        resetScore: resetScore,

        toggleMute: toggleMute,
        isMuted: isMuted,

        getLoadedSlot: getLoadedSlot,
        setSelectedId: setSelectedId,
        getSelectedId: getSelectedId
    };
});
