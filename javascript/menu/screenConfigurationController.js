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

define(["Stage","Storage"],function(e,t){function l(e){r=t.isSfxMuted(),i=t.getSfxVolume(),s=t.isMusicMuted(),o=t.getMusicVolume(),u=t.getSfxVolume(),a=t.getMusicVolume(),$(".menuButton").click(function(){n.play(n.audios.sfx.selecionarMenu)}),e?$(".backButton").click(e):$(".backButton").click(f),$(".slider.sfx").slider({value:i*100,max:100}),$(".slider.music").slider({value:o*100,max:100}),r&&$(".mute.sfx").addClass("desactive"),s&&$(".mute.music").addClass("desactive"),$(".slider.sfx").on("slide",function(e,r){t.setSfxVolume(r.value/100),n.setVolumeToCategory(n.audios.sfx,r.value/100),i=r.value/100}),$(".slider.music").on("slide",function(e,r){t.setMusicVolume(r.value/100),n.setVolumeToCategory(n.audios.musics,r.value/100),o=r.value/100}),$(".mute.sfx").on("click",function(e){r?($(this).removeClass("desactive"),n.setVolumeToCategory(n.audios.sfx,u),i=u):($(this).addClass("desactive"),u=i,n.setVolumeToCategory(n.audios.sfx,0),i=0),t.toggleSfxMute(),r=!r}),$(".mute.music").on("click",function(e){s?($(this).removeClass("desactive"),n.setVolumeToCategory(n.audios.musics,a),o=a):($(this).addClass("desactive"),a=o,n.setVolumeToCategory(n.audios.musics,0),o=0),t.toggleMusicMute(),s=!s})}function c(){}var n=require("Player"),r=t.isSfxMuted(),i=t.getSfxVolume(),s=t.isMusicMuted(),o=t.getMusicVolume(),u=t.getSfxVolume(),a=t.getMusicVolume(),f=function(){n.play(n.audios.sfx.selecionarMenu),e.changeScreen(0)};return{load:l,unload:c}});