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

require(["requireConfig"],function(){require(["ImageLoader","ImagesUrls"],function(e,t){e.load(t.baseDir,t.paths,function(){})}),require(["Storage"],function(e){require(["Player","SoundsUrls"],function(t,n){t.setMasterVolumeTo(n.masterVolume),t.load(n.baseDir,n.paths),e.isSfxMuted()?t.setVolumeToCategory(t.audios.sfx,0):t.setVolumeToCategory(t.audios.sfx,e.getSfxVolume()),e.isMusicMuted()?t.setVolumeToCategory(t.audios.musics,0):t.setVolumeToCategory(t.audios.musics,e.getMusicVolume())})}),require(["jquery"],function(e){window.$=e,require(["jqueryui","jquerymask"],function(){require(["Stage","stageConfig","IsMobile"],function(t){require(["gameConfig","CuidandoBem","DialogsData"],function(n){n.load(function(){e("document").ready(function(){t.setContainer("#stage"),t.start();var n=e("#stage").width(),r=n/150;r=+r.toFixed(2),e("html").css("font-size",r+"px"),e(window).resize(function(){var t=e("#stage").width(),n=t/150;n=+n.toFixed(2),e("html").css("font-size",n+"px")})})})})})})})});