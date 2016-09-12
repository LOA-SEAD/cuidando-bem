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
 * This module ensures that all the images that are going to be used during the game are already
 * loaded in cache before
 * they are requested. This way there is no load time between scenes.
 *
 * For this module to work properly it must receive a json object with all images urls
 * @name Image Loader
 * @module
 *
 * @author Otho - Marcelo Lopes Lotufo
 */
define([], function() {
  console.info("ImageLoader - module loaded");

  /**
   * This bool stores if the imageLoader is already loading an array of images or not
   *
   * @type {boolean}
   * @private
   *
   * @memberOf module:Image Loader
   */
  var loading = false;

  /**
   * This number controls how many images have been loaded
   *
   * @type {number}
   * @private
   *
   * @memberOf module:Image Loader
   */
  var loaded = 0;

  /**
   * This number controls how many images will be loaded
   *
   * @type {number}
   * @private
   *
   * @memberOf module:Image Loader
   */
  var imagesToLoad = 0;

  /**
   * This is a callback function that is called when the imageLoader has finished to load an array
   * of images
   *
   * @type {function}
   * @private
   *
   * @memberOf module:Image Loader
   */
  var callback;
  var imageLoadCallBack;

  /**
   * Receives a base path and an object filled with strings
   * This method will convert all of this in an array of paths to be loaded
   *
   * @param baseDir
   * @param obj
   * @returns {Array}
   * @private
   *
   * @memberOf module:Image Loader
   */
  function getAsArray( baseDir, obj ) {
    var arr = [];
    var x;
    if ( typeof obj === "object") {
      if ( obj instanceof Array ) {
        arr = arr.concat( obj );
      } else {
        for ( x in obj ) {
          arr = arr.concat( getAsArray( baseDir, obj[ x ] ) );
        }
      }
    } else {
      arr.push( obj );
    }

    return arr;
  }

  /**
   * When an image is loaded this function is called.
   * For each image loaded, count it in loaded and if loaded is equal to imagesToLoad call the
   * callback function
   *
   * @private
   *
   * @memberOf module:Image Loader
   */
  function onLoad() {
    var evt = arguments[ 0 ];

    loaded++;
    imageLoadCallBack();
    // console.log(arguments.length, arguments[0]);
    console.log("Loaded Image: " + evt.target.src );

    if ( loaded == imagesToLoad ) {
      console.groupEnd();
      loading = false;
      callback();
    }
  }


  /**
   * This function is called to load all the images inside the game
   *
   * @param baseDir
   * @param pathObject
   * @param _callback
   *
   * @public
   *
   * @memberOf module:Image Loader
   */
  function load( baseDir, pathObject, _callback, _imageLoadCallBack ) {
    if ( loading ) {
      throw new Error("Can't load two path objects at the same time");
    } else {
      var id;

      loading = true;
      loaded = 0;


      callback = _callback;
      imageLoadCallBack = _imageLoadCallBack;

      var paths = getAsArray( baseDir, pathObject );
      paths.forEach(function( e, i, arr ) {
        arr[ i ] = baseDir + e;
      });
      imagesToLoad = paths.length;

      console.info("Images to load: ", imagesToLoad );
      console.groupCollapsed("Loading Images: ");


      for ( id in paths ) {
        var path = paths[ id ];
        var image = new Image();

        image.onload = onLoad;
        image.src = path;
      }

      return imagesToLoad;
    }
  }

  return {
    load: load
  };
});
