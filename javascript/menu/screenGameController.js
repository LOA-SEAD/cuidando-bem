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

define(["Stage","CuidandoBem","text!../../html/screens/configuration.html","./screenConfigurationController"],function(e,t,n,r){function s(){$("#configMenu").append(n),r.load(function(){i.play(i.audios.sfx.selecionarMenu),$("#configMenu").hide()}),$("#pauseButton").click(function(){i.play(i.audios.sfx.selecionarMenu),$("#pauseMenu").toggle()}),$(".quit.button").click(function(){i.stopAll(),i.play(i.audios.sfx.selecionarMenu),i.playInLoop(i.audios.musics.menu),e.changeScreen(6)}),$(".replay.button").click(function(){i.play(i.audios.sfx.selecionarMenu),t.restartLevel(),$("#pauseMenu").hide()}),$(".config.button").click(function(){i.play(i.audios.sfx.selecionarMenu),$("#pauseMenu").toggle(),$("#configMenu").show()}),$(".back.button").click(function(){i.play(i.audios.sfx.selecionarMenu),$("#pauseMenu").hide()}),t.init(),i.stopAll(),i.playInRange(i.audios.musics.inGame)}function o(){}var i=require("Player");return{load:s,unload:o}});