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

require(["requireConfig"],function(){require(["ImageLoader","ImagesUrls"],function(e,o){e.load(o.baseDir,o.paths,function(){})}),require(["Storage"],function(e){require(["Player","SoundsUrls"],function(o,i){o.setMasterVolumeTo(i.masterVolume),o.load(i.baseDir,i.paths),e.isSfxMuted()?o.setVolumeToCategory(o.audios.sfx,0):o.setVolumeToCategory(o.audios.sfx,e.getSfxVolume()),e.isMusicMuted()?o.setVolumeToCategory(o.audios.musics,0):o.setVolumeToCategory(o.audios.musics,e.getMusicVolume())})}),require(["jquery"],function(e){window.$=e,require(["jqueryui","jquerymask"],function(){require(["Stage","stageConfig","IsMobile"],function(o){require(["gameConfig","CuidandoBem","DialogsData"],function(i){i.load(function(){e("document").ready(function(){o.setContainer("#stage"),o.start();var i=e("#stage").width(),t=i/150;t=+t.toFixed(2),e("html").css("font-size",t+"px"),e(window).resize(function(){var o=e("#stage").width(),i=o/150;i=+i.toFixed(2),e("html").css("font-size",i+"px")})})})})})})})});