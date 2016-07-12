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

define(["Stage","CuidandoBem","text!../../html/screens/configuration.html","./screenConfigurationController"],function(n,e,u,o){function i(){$("#configMenu").append(u),o.load(function(){c.play(c.audios.sfx.selecionarMenu),$("#configMenu").hide()}),$("#pauseButton").click(function(){c.play(c.audios.sfx.selecionarMenu),$("#pauseMenu").toggle()}),$(".quit.button").click(function(){c.stopAll(),c.play(c.audios.sfx.selecionarMenu),c.playInLoop(c.audios.musics.menu),n.changeScreen(6)}),$(".replay.button").click(function(){c.play(c.audios.sfx.selecionarMenu),e.restartLevel(),$("#pauseMenu").hide()}),$(".config.button").click(function(){c.play(c.audios.sfx.selecionarMenu),$("#pauseMenu").toggle(),$("#configMenu").show()}),$(".back.button").click(function(){c.play(c.audios.sfx.selecionarMenu),$("#pauseMenu").hide()}),e.init(),c.stopAll(),c.playInRange(c.audios.musics.inGame)}function a(){}var c=require("Player");return{load:i,unload:a}});