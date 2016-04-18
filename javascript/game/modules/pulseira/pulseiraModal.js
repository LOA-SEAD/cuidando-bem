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

define(["text!../html/pulseira/pulseira.html"],function(e){function p(t){$(t).append(e)}function d(){a=!0,$(t).show(),$(o).mask("00/00/0000")}function v(){a=!1,$(t).hide()}function m(){m=!0,$(o).prop("disabled",!0),$(i).prop("disabled",!0),$(n).prop("disabled",!0)}function g(){m=!1,$(o).prop("disabled",!1),$(i).prop("disabled",!1),$(n).prop("disabled",!1)}function y(){return a}function b(){return r}function w(){return u}function E(){return s}function S(){var e=!0,t=$(o).val().toLowerCase(),r=$(i).val().toLowerCase(),s=$(n).val().toLowerCase();return e=e&&f.test(s),e=e&&l.test(r),e=e&&c.test(t),e}function x(e){return f=e,this}function T(e){$(n).val(e)}function N(e){return c=e,this}function C(e){$(o).val(e)}function k(e){return l=e,this}function L(e){$(i).val(e)}function A(){T(""),L(""),C("")}var t="#pulseira_modal",n="#name_input",r=!1,i="#leito_input",s=!1,o="#data_input",u=!1,a=!1,f,l,c,h=!1;return{init:p,close:v,open:d,disable:m,enable:g,isShowing:y,isNameValid:b,isDataValid:w,isLeitoValid:E,isAllDataValid:S,resetData:A,setNameRegExp:x,setDataRegExp:N,setLeitoRegExp:k,setName:T,setLeito:L,setData:C}});