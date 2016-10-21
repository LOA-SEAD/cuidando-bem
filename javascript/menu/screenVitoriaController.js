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

define(["Stage","AccessibleNavigationMenus"],function(a,o){function n(){$(".menuButton").click(function(){s.play(s.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){a.changeScreen(6)}),c()}function e(){var a="#screen-vitoria",o=$(".cena.recepcao",a),n=$(".cena.corredor",a),e=$(".cena.escritorio",a),t=$(".cena.mesa",a);o.css("opacity",1),$(".balao",o).hide(),n.css("opacity",0),$(".porta",n).css("transform","rotateY(0deg)"),n.css("transform","scale(1.0, 1.0)"),e.css("opacity",0),$(".mentor1",e).show(),$(".mentor2",e).hide(),$(".braco",e).hide(),$(".antebraco",e).hide(),$(".balao",e).hide(),t.css("opacity",0),$(".balao",t).hide(),$(".mao",t).css("top","-58%"),$(".contrato",t).css("top","-27%")}function t(a,o){setTimeout(o,a)}function c(){e(),s.stopAll(),s.play(s.audios.endgame.victory);var o="#screen-vitoria",n=$(".cena.recepcao",o),c=$(".cena.corredor",o),i=$(".cena.escritorio",o),u=$(".cena.mesa",o);t(1e3,function(){$(".balao",n).show(),t(2e3,function(){n.animate({opacity:0},1e3,"swing",function(){c.animate({opacity:1},1e3,"swing",function(){var o=$(".porta",c);s.play(s.audios.sfx.batendoNaPorta),t(500,function(){o.css("transform","rotateY(45deg)"),t(300,function(){c.animate({opacity:0},{step:function(a,o){var n=1+(.5-a/2);c.css("transform","scale("+n+","+n+")")},duration:2700}),t(1300,function(){i.animate({opacity:1},2e3,"swing",function(){t(500,function(){$(".mentor1",i).hide(),$(".mentor2",i).show(),$(".braco",i).show(),$(".antebraco",i).show(),$(".balao",i).show(),t(1500,function(){$(u).animate({opacity:1},1e3,"swing"),t(200,function(){s.play(s.audios.sfx.deslizarPapel),$(".contrato",u).animate({top:"14%"},2200),$(".mao",u).animate({top:"-17%"},2200,function(){i.css("opacity",0),$(".balao",u).show(),$(".mao",u).animate({top:"-58%"},1800),t(1500,function(){$(".balao",u).hide(),t(3e3,function(){$(u).animate({opacity:0},2e3,"swing",function(){r.seeCredits(),a.changeScreen(3)})})})})})})})})})})})})})})})}function i(){}var s=require("Player"),r=require("Storage");return{load:n,unload:i}});