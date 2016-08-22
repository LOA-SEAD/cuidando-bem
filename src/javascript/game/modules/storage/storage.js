/*
 This file is part of Cuidando Bem.

 Cuidando Bem is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Cuidando Bem is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @name SaveLoadGame
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([ "SimpleStorage" ], function( Storage ) {
  console.info("SaveLoadGame - module loaded");

  var
    MINLEVEL = 1,
    MAXLEVEL = 10;


  function SaveObject( name ) {
    this.name = name;
    this.empty = true;

    this.lastLevel = 0;
    this.credits = false;

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
  var KEY_SFX_MUTED = "sfx_muted";
  var KEY_SFX_VOLUME = "sfx_volume";
  var KEY_MUSIC_MUTED = "music_muted";
  var KEY_MUSIC_VOLUME = "music_volume";
  var KEY_SELECTED_ID = "selected_id";

  var saves;
  var loadedId;
  var selectedId;

  var sfxMuted;
  var sfxVolume;

  var musicMuted;
  var musicVolume;

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

    // Get if sfx is muted data from storage module
    sfxMuted = Storage.get( KEY_SFX_MUTED );
    console.log( sfxMuted );

    if ( sfxMuted === undefined || typeof sfxMuted !== "boolean") {
      sfxMuted = false;
      Storage.set( KEY_SFX_MUTED, sfxMuted );
    }

    // Get if music is muted data from storage module
    musicMuted = Storage.get( KEY_MUSIC_MUTED );
    console.log( musicMuted );

    if ( musicMuted === undefined || typeof musicMuted !== "boolean") {
      musicMuted = false;
      Storage.set( KEY_MUSIC_MUTED, musicMuted );
    }

    // Get sfx volume data from storage module
    sfxVolume = Storage.get( KEY_SFX_VOLUME );
    console.log( sfxVolume );

    if ( sfxVolume === undefined || typeof sfxVolume !== "number") {
      sfxVolume = 1;
      Storage.set( KEY_SFX_VOLUME, sfxVolume );
    }

    // Get music volume data from storage module
    musicVolume = Storage.get( KEY_MUSIC_VOLUME );
    console.log( musicVolume );

    if ( musicVolume === undefined || typeof musicVolume !== "number") {
      musicVolume = 1;
      Storage.set( KEY_MUSIC_VOLUME, musicVolume );
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

  function addScore( _levelId, score ) {
    if ( _levelId < MINLEVEL || _levelId > MAXLEVEL ) {
      throw new Error("LevelId Failed");
    }
    var levelId = _levelId - 1;

    var level = saves[ loadedId ].levels[ levelId ];

    if ( !!!level ) {
      level = [ score ];
    } else if ( level instanceof Array ) {
      level.push( score );
    } else {
      console.error("This should never happen.");
    }

    saves[ loadedId ].levels[ levelId ] = level;
  }

  function resetScore( _levelId ) {
    if ( _levelId < MINLEVEL || _levelId > MAXLEVEL ) {
      throw new Error("LevelId Failed");
    }
    var levelId = _levelId - 1;

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

  function toggleSfxMute() {
    sfxMuted = !sfxMuted;
    Storage.set( KEY_SFX_MUTED, sfxMuted );
  }

  function toggleMusicMute() {
    musicMuted = !musicMuted;
    Storage.set( KEY_MUSIC_MUTED, musicMuted );
  }

  function isSfxMuted() {
    return sfxMuted;
  }

  function isMusicMuted() {
    return musicMuted;
  }

  function getSfxVolume() {
    return sfxVolume;
  }

  function getMusicVolume() {
    return musicVolume;
  }

  function setSfxVolume( value ) {
    if ( value >= 0 && value <= 1 ) {
      sfxVolume = value;
    } else {
      sfxVolume = 1;
    }

    Storage.set( KEY_SFX_VOLUME, sfxVolume );
  }

  function setMusicVolume( value ) {
    if ( value >= 0 && value <= 1 ) {
      musicVolume = value;
    } else {
      musicVolume = 1;
    }

    Storage.set( KEY_MUSIC_VOLUME, musicVolume );
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

  function getScoreSum() {
    var sav = saves[ loadedId ];
    var sum = 0;
    for ( i = 0; i < sav.levels.length - 1; i++ ) {
      if ( typeof sav.levels[ i ] !== "undefined") {
        for ( j = 0; j < sav.levels[ i ].length - 1; j++ ) {
          sum += sav.levels[ i ][ j ].score;
        }
      }
    }

    return sum;
  }

  function getLevelScoreSum( levelId ) {
    var sav = saves[ loadedId ];
    var level = sav.levels[ levelId ];
    var sum = 0;

    if ( typeof level !== "undefined") {
      for ( j = 0; j < level.length - 1; j++ ) {
        sum += level[ j ].score;
      }
    }

    return sum;
  }

  function hasSeenCredits() {
    var sav = saves[ loadedId ];
    return sav.credits;
  }

  function seeCredits() {
    var sav = saves[ loadedId ];
    sav.credits = true;
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
    getScoreSum: getScoreSum,
    getLevelScoreSum: getLevelScoreSum,

    setSfxVolume: setSfxVolume,
    getSfxVolume: getSfxVolume,
    setMusicVolume: setMusicVolume,
    getMusicVolume: getMusicVolume,
    toggleSfxMute: toggleSfxMute,
    toggleMusicMute: toggleMusicMute,
    isSfxMuted: isSfxMuted,
    isMusicMuted: isMusicMuted,
    hasSeenCredits: hasSeenCredits,
    seeCredits: seeCredits,

    getLoadedSlot: getLoadedSlot,
    setSelectedId: setSelectedId,
    getSelectedId: getSelectedId
  };
});
