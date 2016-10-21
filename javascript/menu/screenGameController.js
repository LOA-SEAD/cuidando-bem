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

define(["Stage","AccessibleNavigationMenus","CuidandoBem","text!../../html/screens/configuration.html","./screenConfigurationController"],function(n,e,i,o,u){function a(){$("#configMenu").append(o),u.load(function(){s.play(s.audios.sfx.selecionarMenu),$("#configMenu").hide()}),$("#pauseButton").click(function(){s.play(s.audios.sfx.selecionarMenu),$("#pauseMenu").toggle()}),$(".quit.button").click(function(){s.stopAll(),s.play(s.audios.sfx.selecionarMenu),s.playInLoop(s.audios.musics.menu),n.changeScreen(6)}),$(".replay.button").click(function(){s.play(s.audios.sfx.selecionarMenu),i.restartLevel(),$("#pauseMenu").hide()}),$(".config.button").click(function(){s.play(s.audios.sfx.selecionarMenu),$("#pauseMenu").toggle(),$("#configMenu").show()}),$(".back.button").click(function(){s.play(s.audios.sfx.selecionarMenu),$("#pauseMenu").hide()}),s.stopAll(),i.init(),e.startAccessibleNavigationMenus()}function c(){}var s=require("Player");return{load:a,unload:c}});