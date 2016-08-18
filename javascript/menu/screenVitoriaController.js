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

define(["Stage"],function(o){function a(){$(".menuButton").click(function(){i.play(i.audios.sfx.selecionarMenu)}),$(".backButton").click(function(){o.changeScreen(6)}),e()}function n(){var o="#screen-vitoria",a=$(".cena.recepcao",o),n=$(".cena.corredor",o),t=$(".cena.escritorio",o),e=$(".cena.mesa",o);a.css("opacity",1),$(".balao",a).hide(),n.css("opacity",0),$(".porta",n).css("transform","rotateY(0deg)"),n.css("transform","scale(1.0, 1.0)"),t.css("opacity",0),$(".mentor1",t).show(),$(".mentor2",t).hide(),$(".braco",t).hide(),$(".antebraco",t).hide(),$(".balao",t).hide(),e.css("opacity",0),$(".balao",e).hide(),$(".mao",e).css("top","-58%"),$(".contrato",e).css("top","-27%")}function t(o,a){setTimeout(a,o)}function e(){n(),i.stopAll();var a="#screen-vitoria",e=$(".cena.recepcao",a),c=$(".cena.corredor",a),s=$(".cena.escritorio",a),u=$(".cena.mesa",a);t(1e3,function(){$(".balao",e).show(),t(2e3,function(){e.animate({opacity:0},1e3,"swing",function(){c.animate({opacity:1},1e3,"swing",function(){var a=$(".porta",c);t(200,function(){a.css("transform","rotateY(45deg)"),i.play(i.audios.sfx.abrirPorta),t(300,function(){c.animate({opacity:0},{step:function(o,a){var n=1+(.5-o/2);c.css("transform","scale("+n+","+n+")")},duration:2700}),t(1300,function(){s.animate({opacity:1},2e3,"swing",function(){t(500,function(){$(".mentor1",s).hide(),$(".mentor2",s).show(),$(".braco",s).show(),$(".antebraco",s).show(),$(".balao",s).show(),t(1500,function(){$(u).animate({opacity:1},1e3,"swing"),t(200,function(){$(".contrato",u).animate({top:"14%"},2200),$(".mao",u).animate({top:"-17%"},2200,function(){s.css("opacity",0),$(".balao",u).show(),$(".mao",u).animate({top:"-58%"},1800),t(1500,function(){$(".balao",u).hide(),$(u).animate({opacity:0},2e3,"swing",function(){r.seeCredits(),o.changeScreen(3)})})})})})})})})})})})})})})}function c(){}var i=require("Player"),r=require("Storage");return{load:a,unload:c}});