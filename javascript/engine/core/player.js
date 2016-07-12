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

define([],function(){function o(o,t){n(o,t,H),G&&T()}function n(o,t,e){var u;for(u in t)if("object"==typeof t[u])t[u]instanceof Array?e[u]=[]:e[u]={_name:u,_volume:1},n(o,t[u],e[u]);else{var i=t[u],a=i.split(".");a[0],a[1];e[u]=new Audio(o+i),sound=e[u],sound.loop=!1,sound.volume=(e._volume||1)*O,sound.vol=sound.volume,sound.load()}}function t(o){var n=[];if("object"==typeof o)if(o instanceof Array)n=n.concat(o);else{var e;for(e in o)n=n.concat(t(o[e]))}else n.push(o);return n}function e(o){var n=t(o),e=Math.floor(Math.random()*n.length),u=n[e];i(u)}function u(o){window.chrome?o.load():o.currentTime=0}function i(o){k=o,u(k),k.play()}function a(o){o.play()}function r(){k.pause()}function l(o,n){return o++,o>=n&&(o=0),o}function v(o){if(!q){b=t(o),q=!0,_=0,x=b[_];var n=b[l(_,b.length)];z=new Audio(n.getAttribute("src")),z.volume=b[l(_,b.length)].vol,z.vol=b[l(_,b.length)].vol,u(z),B=x,L=setInterval(s,4),i(x)}}function c(){q&&(q=!1,x.pause(),clearInterval(L))}function f(){_=l(_,b.length),void 0!==B&&clearInterval(L),B=x,x=z,z=new Audio(b[_].getAttribute("src")),z.volume=b[_].volume,u(z),a(x),q&&(L=setInterval(s,4))}function s(){var o=100*x.currentTime/x.duration;o>=J&&f()}function d(o){D||(V=t(o),D=!0,p())}function m(){D&&(D=!1,E.pause())}function p(){var o,n=[];for(o in V)n.push(o);R=j,void 0!==R&&n.splice(R,1);var t=Math.floor(Math.random()*n.length);j=n[t],void 0!==B&&(B.pause(),clearInterval(C)),F=E,E=V[j],a(E),D&&(L=setInterval(g,4))}function g(){var o=100*E.currentTime/E.duration;o>=K&&p()}function h(o,n){var e,u=t(o);for(e in u){var i=u[e];i.vol=n,i.volume=n*O}}function y(){var o,n=t(H);for(o in n){var e=n[o];e.volume=e.vol*O}}function A(o){O=o,y()}function I(o,n){o._volume=n;for(sound in o)h(o[sound],n*O)}function M(){SaveLoadGame.toggleMute(),G=!G,T()}function T(){G?(S=O,A(0)):A(S)}function w(){r(),c(),m()}var b,_,L,V,j,R,C,G=!1,O=1,S=1,k=void 0,q=!1,x=void 0,z=void 0,B=void 0,D=!1,E=void 0,F=void 0,H={},J=99.9,K=98.5;return{audios:H,load:o,play:e,stop:r,mute:M,setVolumeOfTo:h,setVolumeToCategory:I,setMasterVolumeTo:A,playInLoop:v,stopLoop:c,playInRange:d,stopRange:m,stopAll:w}});