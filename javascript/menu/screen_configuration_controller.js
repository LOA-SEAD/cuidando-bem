define(["Stage"],function(e){function n(){$(".menuButton").click(function(){t.play(t.audios.sfx.selecionar_menu)}),$("#muteSoundButton").click(function(){t.mute()}),$(".backButton").click(function(){e.changeScreen(0)})}function r(){}var t=require("Player");return{load:n,unload:r}});