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

define(["text!../html/dialog/dialog.html","text!../html/dialog/dialogButtonTemplate.html"],function(e,t){function a(t){$(t).append(e)}function i(e){m?n(e):o(e)}function o(e){dialog=e,$(p).show(),$(g).show("fade",{duration:200,complete:function(){n(e)}}),m=!0,$(document).keydown(function(e){switch(e.which){case 38:$(".dialog_reread").click();break;case 40:$(".dialog_right").click();break;case 49:$(".dialog_button[value='1']").click();break;case 50:$(".dialog_button[value='2']").click();break;case 51:$(".dialog_button[value='3']").click();break;case 52:$(".dialog_button[value='4']").click();break;case 53:$(".dialog_button[value='5']").click()}})}function n(e){$(u).text(e.getSpeakerName()),$(f).removeClass(),$(f).addClass(e.getSpeakerCssClass()),$(f).show(),$(b).text(e.getText()),$(".dialog_reread").click(function(){$("<span>"+e.getSpeakerName()+": </span>").appendTo("#accessible_log"),""!=e.getText()&&$("<span>"+e.getText()+"</span><br>").appendTo("#accessible_log")}),$(".dialog_reread").click(),c(e.getOptions(),e.getRandomize());0==m?($(g+" div").hide(),$(u).first().show(),$(f).show(),$(b).show(),$(k).show()):($(b).hide(),$(k).hide(),$(u).first().show(),$(f).show(),$(b).show(),$(k).show())}function c(e,t){if(h(),1==e.length&&""==e[0].text){var a=$(v);a.click(e[0].actionFunction),a.on(),$(v).removeClass("off"),$(v).addClass("on"),$(v).append(a)}else r(e,t)}function l(){if($(document).unbind("keydown"),$(u).hide(),$(f).hide(),$(b).hide(),$(k).hide(),$(p).hide(),$(g).hide("fade",200),m=!1,!m){var e=0;$(document).keydown(function(t){if($(".action_button:visible").length)var a=$.merge($(".interactiveObject:visible"),$(".action_button:visible"));else var a=$(".interactiveObject:visible");0!=a.length&&(40==t.which?(e>=a.length-1?e=0:e++,$(a[e]).focus()):38==t.which?(e>0?e--:e=a.length-1,$(a[e]).focus()):13==t.which&&-1!=e&&$(a[e]).click())})}}function s(e,a){var i=$(t);i.click(e.actionFunction),$(".text",i).text(e.text),i.attr("value",a),$(k).append(i)}function d(e){for(var t,a,i=e.length;i;)a=Math.floor(Math.random()*i--),t=e[i],e[i]=e[a],e[a]=t;return e}function r(e,t){var a,i;for(t&&(e=d(e)),a=0;a<e.length;a++)s(e[a],a+1),i=1==e.length?"única":a+1,$("<span>Opção "+i+": "+e[a].text+"</span><br>").appendTo("#accessible_log")}function h(){$(k).empty(),$(v).empty(),$(v).off(),$(v).removeClass("on"),$(v).addClass("off")}var g="#dialogBar",u=".dialog_charName",f="#dialog_charImg",p="#dialogBar-mask",b=".dialog_mainText",k=".dialog_options",v=".dialog_right",m=!1;return{init:a,show:i,close:l}});