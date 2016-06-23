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

define(["Stage"],function(e){function n(){t.playInLoop(t.audios.musics.menu),console.log("Configuring main menu listeners"),$(".menuButton").click(function(){t.play(t.audios.sfx.selecionarMenu)}),$("#initGame_btn").click(function(){console.log(this),t.play(t.audios.sfx.selecionarMenu),e.changeScreen(5)}),$("#conteudo_btn").click(function(){console.log(this),t.play(t.audios.sfx.selecionarMenu),e.changeScreen(7)}),$("#config_btn").click(function(){console.log(this),t.play(t.audios.sfx.selecionarMenu),e.changeScreen(4)}),$("#credits_btn").click(function(){console.log(this),t.play(t.audios.sfx.selecionarMenu),e.changeScreen(3)})}function r(){}var t=require("Player");return{load:n,unload:r}});