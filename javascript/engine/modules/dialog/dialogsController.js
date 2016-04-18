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

define(["text!../html/dialog/dialog.html","text!../html/dialog/dialogButtonTemplate.html"],function(e,t){function l(t){$(t).append(e)}function c(e){f?p(e):h(e)}function h(e){dialog=e,$(s).show(),$(n).show("fade",{duration:200,complete:function(){p(e)}}),f=!0}function p(e){function l(){$(r).first().show(t,{duration:a,progress:function(){$(i.show(t))},complete:function(){e.getText()!=""?$(o).show(s,{duration:a,complete:function(){$(u).show(s)}}):$(u).show(s)}})}$(r).text(e.getSpeakerName()),$(i).removeClass(),$(i).addClass(e.getSpeakerCssClass()),$(i).show(),$(o).text(e.getText()),d(e.getOptions(),e.getRandomize());var t="blind",s="clip",a=250;f==0?($(n+" div").hide(),$(r).first().show(),$(i).show(),$(o).show(),$(u).show()):($(o).hide(),$(u).hide(),$(r).first().show(),$(i).show(),$(o).show(),$(u).show())}function d(e,t){S();if(e.length==1&&e[0].text==""){var n=$(a);n.click(e[0].actionFunction),n.on(),$(a).removeClass("off"),$(a).addClass("on"),$(a).append(n)}else w(e,t)}function v(){$(document).unbind("keydown"),$(r).hide(),$(i).hide(),$(o).hide(),$(u).hide(),$(s).hide(),$(n).hide("fade",200),f=!1}function m(){}function g(){}function y(e){var n=$(t);n.click(e.actionFunction),$(".text",n).text(e.text),$(u).append(n)}function b(e){var t=e.length,n,r;while(t)r=Math.floor(Math.random()*t--),n=e[t],e[t]=e[r],e[r]=n;return e}function w(e,t){var n;t&&(e=b(e));for(n=0;n<e.length;n++)y(e[n])}function E(e){$("."+e.getCssClass(),element).remove()}function S(){$(u).empty(),$(a).empty(),$(a).off(),$(a).removeClass("on"),$(a).addClass("off")}var n="#dialogBar",r=".dialog_charName",i="#dialog_charImg",s="#dialogBar-mask",o=".dialog_mainText",u=".dialog_options",a=".dialog_right",f=!1;return{init:l,show:c,close:v}});