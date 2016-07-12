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

define(["text!../html/ficha/ficha.html"],function(e){function t(t){$(t).append(e),$(j).on("keyup paste change",function(){$(z).val($(this).val())}),$(z).on("keyup paste change",function(){$(j).val($(this).val())}),$(Y).mask("00/00/0000"),$(H).mask("00"),$(j).mask("000"),$(z).mask("000"),$(F).mask("00"),$(O).mask("00,00"),$(K).mask("000"),$(P).mask("00:00"),$(b).mask("00:00"),$(b).mask("00:00")}function n(e,t){if("undefined"==typeof e||"undefined"==typeof e)throw new Error("You must define a state to open ficha and the level");if(L=e,"soro"===L)$(".soro").show(),$(".oral").hide();else{if("oral"!==L)throw new Error("Estado da ficha não existe.");$(".oral").show(),$(".soro").hide()}$(".titulo > span").hide(),$(".corpo > div > div").hide(),$(".ficha-l"+t).show(),$(M).show()}function i(){$(M).hide()}function r(){var e=new Date,t=e.getHours(),n=e.getMinutes(),i=$(Y).val().split("/");if(i[0]!=e.getDate())return!1;if(i[1]!=e.getMonth()+1)return!1;if(i[2]!=e.getYear()+1900)return!1;var r=$(q).val();if(!y.test(r))return!1;var o=$(H).val();if(!G.test(o))return!1;var a=$(N).val();if(!D.test(a))return!1;var u=E.getLoadedSlot().name.toLowerCase(),f=$(J).val().toLowerCase();if(u!==f)return!1;if("soro"===L){var s=$(P).val().split(":");if(s[0]!=t)return!1;if(s[1]!=n)return!1;var c=$(b).val().split(":");if(c[0]!=(t+V)%24)return!1;if(c[1]!=n)return!1;var l=$(j).val();if(!T.test(l))return!1;var p=$(F).val();if(V!=p)return!1;var g=$(O).val();if(!C.test(g))return!1;var v=$(K).val();if(!I.test(v))return!1}else if("oral"===L){var m=$(B).val().split(":");if(m[0]!=t)return!1;if(m[1]!=n)return!1}return!0}function o(e){y=e}function a(e){D=e}function u(e){G=e}function f(e){A=e}function s(e){S=e}function c(e){T=e}function l(e){V=e}function p(e){C=e}function g(e){I=e}function v(){return y}function m(){return nomeRegexp}function h(){return G}function d(){return A}function x(){return S}function R(){return T}function _(){return tempoRegexp}function k(){return C}function w(){return I}var E=require("Storage");E.loadSlot(0);var L,y,D,G,A,S,T,V,C,I,M="#ficha_medicacao",Y=".in_data",q=".in_enfermaria",H=".in_leito",N=".in_paciente",P=".in_ini",b=".in_ter",j=".in_volume1",z=".in_volume2",B=".in_horario",F=".in_duracao",J=".in_funcionario",K=".in_gtsAprox",O=".in_gts";return{init:t,open:n,close:i,isDataValid:r,setEnfermeiraRegexp:o,setPacienteRegexp:a,setLeitoRegexp:u,setInicioRegexp:f,setTerminoRegexp:s,setVolumeRegexp:c,setDuracao:l,setGotasRegexp:p,setGotasAproxRegexp:g,getEnfermeiraRegexp:v,getNomeRegexp:m,getLeitoRegexp:h,getInicioRegexp:d,getTerminoRegexp:x,getVolumeRegexp:R,getTempoRegexp:_,getGotasRegexp:k,getGotasAproxRegexp:w}});