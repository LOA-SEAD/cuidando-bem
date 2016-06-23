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

define(["text!../html/ficha/ficha.html"],function(e){function k(t){$(t).append(e),$(b).on("keyup paste change",function(){$(w).val($(this).val())}),$(w).on("keyup paste change",function(){$(b).val($(this).val())}),$(p).mask("00/00/0000"),$(v).mask("00"),$(b).mask("000"),$(w).mask("000"),$(x).mask("00"),$(C).mask("00,00"),$(N).mask("000"),$(g).mask("00:00"),$(y).mask("00:00"),$(y).mask("00:00")}function L(e,t){if(typeof e=="undefined"||typeof e=="undefined")throw new Error("You must define a state to open ficha and the level");r=e;if(r==="soro")$(".soro").show(),$(".oral").hide();else{if(r!=="oral")throw new Error("Estado da ficha não existe.");$(".oral").show(),$(".soro").hide()}$(".titulo > span").hide(),$(".corpo > div > div").hide(),$(".ficha-l"+t).show(),$(n).show()}function A(){$(n).hide()}function O(){var e=new Date,n=e.getHours(),u=e.getMinutes(),a=$(p).val().split("/");if(a[0]!=e.getDate())return!1;if(a[1]!=e.getMonth()+1)return!1;if(a[2]!=e.getYear()+1900)return!1;var w=$(d).val();if(!i.test(w))return!1;var E=$(v).val();if(!o.test(E))return!1;var k=$(m).val();if(!s.test(k))return!1;var L=t.getLoadedSlot().name.toLowerCase(),A=$(T).val().toLowerCase();if(L!==A)return!1;if(r==="soro"){var O=$(g).val().split(":");if(O[0]!=n)return!1;if(O[1]!=u)return!1;var M=$(y).val().split(":");if(M[0]!=(n+l)%24)return!1;if(M[1]!=u)return!1;var _=$(b).val();if(!f.test(_))return!1;var D=$(x).val();if(l!=D)return!1;var P=$(C).val();if(!c.test(P))return!1;var H=$(N).val();if(!h.test(H))return!1}else if(r==="oral"){var B=$(S).val().split(":");if(B[0]!=n)return!1;if(B[1]!=u)return!1}return!0}function M(e){i=e}function _(e){s=e}function D(e){o=e}function P(e){u=e}function H(e){a=e}function B(e){f=e}function j(e){l=e}function F(e){c=e}function I(e){h=e}function q(){return i}function R(){return nomeRegexp}function U(){return o}function z(){return u}function W(){return a}function X(){return f}function V(){return tempoRegexp}function J(){return c}function K(){return h}var t=require("Storage");t.loadSlot(0);var n="#ficha_medicacao",r,i,s,o,u,a,f,l,c,h,p=".in_data",d=".in_enfermaria",v=".in_leito",m=".in_paciente",g=".in_ini",y=".in_ter",b=".in_volume1",w=".in_volume2",E=".in_tempo",S=".in_horario",x=".in_duracao",T=".in_funcionario",N=".in_gtsAprox",C=".in_gts";return{init:k,open:L,close:A,isDataValid:O,setEnfermeiraRegexp:M,setPacienteRegexp:_,setLeitoRegexp:D,setInicioRegexp:P,setTerminoRegexp:H,setVolumeRegexp:B,setDuracao:j,setGotasRegexp:F,setGotasAproxRegexp:I,getEnfermeiraRegexp:q,getNomeRegexp:R,getLeitoRegexp:U,getInicioRegexp:z,getTerminoRegexp:W,getVolumeRegexp:X,getTempoRegexp:V,getGotasRegexp:J,getGotasAproxRegexp:K}});