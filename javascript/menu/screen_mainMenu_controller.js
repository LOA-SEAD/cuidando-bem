define(["Stage"],function(e){function n(){$(".menuButton").click(function(){t.play(t.audios.sfx.selecionar_menu)}),$("#initGame_btn").click(function(){e.changeScreen(5)}),$("#conteudo_btn").click(function(){e.changeScreen(7)}),$("#config_btn").click(function(){e.changeScreen(4)}),$("#credits_btn").click(function(){e.changeScreen(3)})}function r(){}var t=require("Player");return{load:n,unload:r}});