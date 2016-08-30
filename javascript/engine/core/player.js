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

define([],function(){function o(o,e,t){return n(o,e,K),C&&w(),R=t,B}function n(o,t,u){var i;for(i in t)if("object"==typeof t[i])t[i]instanceof Array?u[i]=[]:u[i]={_name:i,_volume:1},n(o,t[i],u[i]);else{var a=t[i],r=a.split(".");r[0],r[1];u[i]=new Audio(o+a),sound=u[i],sound.loop=!1,sound.volume=(u._volume||1)*G,sound.vol=sound.volume,sound.addEventListener("canplaythrough",e,!0),sound.load(),B++}}function e(o){R(),o.target.removeEventListener("canplaythrough",e,!0)}function t(o){var n=[];if("object"==typeof o)if(o instanceof Array)n=n.concat(o);else{var e;for(e in o)n=n.concat(t(o[e]))}else n.push(o);return n}function u(o){var n=t(o),e=Math.floor(Math.random()*n.length),u=n[e];a(u)}function i(o){window.chrome?o.load():o.currentTime=0}function a(o){S=o,i(S),S.play()}function r(o){o.play()}function l(){S.pause()}function v(o,n){return o++,o>=n&&(o=0),o}function c(o){k||(_=t(o),k=!0,b=0,x=_[b],s())}function f(){k&&(k=!1,q.pause(),clearTimeout(V))}function s(){b=v(b,_.length),void 0!==z&&clearTimeout(V),z=q,q=x,x=new Audio(_[b].getAttribute("src")),x.volume=_[b].volume,i(x),r(q),k&&(V=setTimeout(s,1e3*q.duration-N))}function d(o){D||(j=t(o),D=!0,E=p(),H=j[E],h())}function m(){D&&(D=!1,F.pause())}function p(){var o,n=[];for(o in j)n.push(o);void 0!==E&&n.splice(E,1);var e=Math.floor(Math.random()*n.length);return n[e]}function h(){E=p(),void 0!==J&&clearTimeout(I),J=F,F=H,H=new Audio(j[E].getAttribute("src")),H.volume=j[E].volume,i(H),D&&(r(F),I=setTimeout(h,1e3*F.duration-N))}function g(o,n){var e,u=t(o);for(e in u){var i=u[e];i.vol=n,i.volume=n*G}}function y(){var o,n=t(K);for(o in n){var e=n[o];e.volume=e.vol*G}}function T(o){G=o,y()}function A(o,n){o._volume=n,"musics"==o._name&&(void 0!==x&&(x.vol=n,x.volume=n*G),void 0!==H&&(H.vol=n,H.volume=n*G));for(sound in o)g(o[sound],n*G)}function M(){SaveLoadGame.toggleMute(),C=!C,w()}function w(){C?(O=G,T(0)):T(O)}function L(){l(),f(),m()}var _,b,V,j,E,I,R,C=!1,G=1,O=1,S=void 0,k=!1,q=void 0,x=void 0,z=void 0,B=0,D=!1,F=void 0,H=void 0,J=void 0,K={},N=25;return{audios:K,load:o,play:u,stop:l,mute:M,setVolumeOfTo:g,setVolumeToCategory:A,setMasterVolumeTo:T,playInLoop:c,stopLoop:f,playInRange:d,stopRange:m,stopAll:L}});