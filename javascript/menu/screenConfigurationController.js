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

define(["Stage","Storage","AccessibleNavigationMenus"],function(e,s,u){function i(e){a=s.isSfxMuted(),l=s.getSfxVolume(),c=s.isMusicMuted(),n=s.getMusicVolume(),d=s.getSfxVolume(),m=s.getMusicVolume(),$(".menuButton").click(function(){o.play(o.audios.sfx.selecionarMenu)}),e?$(".backButton").click(e):$(".backButton").click(f),$(".slider.sfx").slider({value:100*l,max:100}),$(".slider.music").slider({value:100*n,max:100}),a&&$(".mute.sfx").addClass("desactive"),c&&$(".mute.music").addClass("desactive"),$(".slider.sfx").on("slide",function(e,u){s.setSfxVolume(u.value/100),o.setVolumeToCategory(o.audios.sfx,u.value/100),l=u.value/100}),$(".slider.music").on("slide",function(e,u){s.setMusicVolume(u.value/100),o.setVolumeToCategory(o.audios.musics,u.value/100),n=u.value/100}),$(".mute.sfx").on("click",function(e){a?($(this).removeClass("desactive"),o.setVolumeToCategory(o.audios.sfx,d),l=d):($(this).addClass("desactive"),d=l,o.setVolumeToCategory(o.audios.sfx,0),l=0),s.toggleSfxMute(),a=!a}),$(".mute.music").on("click",function(e){c?($(this).removeClass("desactive"),o.setVolumeToCategory(o.audios.musics,m),n=m):($(this).addClass("desactive"),m=n,o.setVolumeToCategory(o.audios.musics,0),n=0),s.toggleMusicMute(),c=!c}),u.startAccessibleNavigationMenus()}function t(){}var o=require("Player"),a=s.isSfxMuted(),l=s.getSfxVolume(),c=s.isMusicMuted(),n=s.getMusicVolume(),d=s.getSfxVolume(),m=s.getMusicVolume(),f=function(){o.play(o.audios.sfx.selecionarMenu),e.changeScreen(0)};return{load:i,unload:t}});