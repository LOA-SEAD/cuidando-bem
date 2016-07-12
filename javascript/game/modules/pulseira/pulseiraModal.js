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

define(["text!../html/pulseira/pulseira.html"],function(e){function t(t){$(t).append(e)}function n(){E=!0,$(L).show(),$(V).mask("00/00/0000");var e=$(V).val().toLowerCase(),t=$(x).val().toLowerCase(),n=$(C).val().toLowerCase();if($('<span>Data: <time datetime="'+e.replace(/\//g,"-")+'">'+e+"</time></span><br>").appendTo("#accessible_log"),$("<span>Leito: "+t+"</span><br>").appendTo("#accessible_log"),$("<span>Nome: "+n+"</span><br>").appendTo("#accessible_log"),E){var a=0;$(document).keydown(function(e){if($(".action_button:visible").length)var t=$.merge($("#pulseira_modal input"),$(".action_button:visible"));else var t=$("#pulseira_modal input");0!=t.length&&(40==e.which?(a>=t.length-1?a=0:a++,$(t[a]).focus()):38==e.which?(a>0?a--:a=t.length-1,$(t[a]).focus()):13==e.which&&(-1!=a&&"action_button"==$(t[a]).attr("class")?($(t[a]).click(),E=!1):(a>=t.length-1?a=0:a++,$(t[a]).focus())))})}}function a(){E=!1,$(L).hide()}function i(){i=!0,$(V).prop("disabled",!0),$(x).prop("disabled",!0),$(C).prop("disabled",!0)}function o(){i=!1,$(V).prop("disabled",!1),$(x).prop("disabled",!1),$(C).prop("disabled",!1)}function s(){return E}function l(){return D}function r(){return k}function u(){return N}function p(){var e=!0,t=$(V).val().toLowerCase(),n=$(x).val().toLowerCase(),a=$(C).val().toLowerCase();return e=e&&g.test(a),e=e&&w.test(n),e=e&&_.test(t)}function c(e){return g=e,this}function d(e){$(C).val(e)}function f(e){return _=e,this}function b(e){$(V).val(e)}function h(e){return w=e,this}function v(e){$(x).val(e)}function m(){d(""),v(""),b(""),o()}var g,w,_,L="#pulseira_modal",C="#name_input",D=!1,x="#leito_input",N=!1,V="#data_input",k=!1,E=!1;return{init:t,close:a,open:n,disable:i,enable:o,isShowing:s,isNameValid:l,isDataValid:r,isLeitoValid:u,isAllDataValid:p,resetData:m,setNameRegExp:c,setDataRegExp:f,setLeitoRegExp:h,setName:d,setLeito:v,setData:b}});