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

require(["requireConfig"],function(){require(["jquery","Player","Storage"],function(e,o,t){window.$=e,require(["jqueryui","jquerymask"],function(){require(["Stage","stageConfig","IsMobile"],function(i){e("document").ready(function(){i.setContainer("#stage"),i.start();var o=e("#stage").width(),t=o/150;t=+t.toFixed(2),e("html").css("font-size",t+"px"),e(window).resize(function(){var o=e("#stage").width(),t=o/150;t=+t.toFixed(2),e("html").css("font-size",t+"px")})}),require(["ImageLoader","ImagesUrls","SoundsUrls","./menu/screenPreloaderController"],function(e,i,s,u){o.setMasterVolumeTo(s.masterVolume);var a=0;a+=o.load(s.baseDir,s.paths,function(){u.fileLoaded()}),a+=e.load(i.baseDir,i.paths,function(){},function(){u.fileLoaded()}),u.setTotalFiles(a),u.setCallBack(function(){require(["gameConfig","CuidandoBem","DialogsData"],function(e){e.load(function(){})})}),t.isSfxMuted()?o.setVolumeToCategory(o.audios.sfx,0):o.setVolumeToCategory(o.audios.sfx,t.getSfxVolume()),t.isMusicMuted()?o.setVolumeToCategory(o.audios.musics,0):o.setVolumeToCategory(o.audios.musics,t.getMusicVolume())})})})})});