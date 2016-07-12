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

define(["Stage","Storage"],function(e,s){function u(e){o=s.isSfxMuted(),a=s.getSfxVolume(),l=s.isMusicMuted(),c=s.getMusicVolume(),d=s.getSfxVolume(),n=s.getMusicVolume(),$(".menuButton").click(function(){t.play(t.audios.sfx.selecionarMenu)}),e?$(".backButton").click(e):$(".backButton").click(m),$(".slider.sfx").slider({value:100*a,max:100}),$(".slider.music").slider({value:100*c,max:100}),o&&$(".mute.sfx").addClass("desactive"),l&&$(".mute.music").addClass("desactive"),$(".slider.sfx").on("slide",function(e,u){s.setSfxVolume(u.value/100),t.setVolumeToCategory(t.audios.sfx,u.value/100),a=u.value/100}),$(".slider.music").on("slide",function(e,u){s.setMusicVolume(u.value/100),t.setVolumeToCategory(t.audios.musics,u.value/100),c=u.value/100}),$(".mute.sfx").on("click",function(e){o?($(this).removeClass("desactive"),t.setVolumeToCategory(t.audios.sfx,d),a=d):($(this).addClass("desactive"),d=a,t.setVolumeToCategory(t.audios.sfx,0),a=0),s.toggleSfxMute(),o=!o}),$(".mute.music").on("click",function(e){l?($(this).removeClass("desactive"),t.setVolumeToCategory(t.audios.musics,n),c=n):($(this).addClass("desactive"),n=c,t.setVolumeToCategory(t.audios.musics,0),c=0),s.toggleMusicMute(),l=!l})}function i(){}var t=require("Player"),o=s.isSfxMuted(),a=s.getSfxVolume(),l=s.isMusicMuted(),c=s.getMusicVolume(),d=s.getSfxVolume(),n=s.getMusicVolume(),m=function(){t.play(t.audios.sfx.selecionarMenu),e.changeScreen(0)};return{load:u,unload:i}});