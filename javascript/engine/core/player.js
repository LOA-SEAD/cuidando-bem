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

define([],function(){function x(t,n){T(t,n,w),e&&X()}function T(e,n,r){var i;for(i in n)if(typeof n[i]=="object")n[i]instanceof Array?r[i]=[]:r[i]={_name:i,_volume:1},T(e,n[i],r[i]);else{var s=n[i],o=s.split("."),u=o[0],a=o[1];r[i]=new Audio(e+s),sound=r[i],sound.loop=!1,sound.volume=(r._volume||1)*t,sound.vol=sound.volume,sound.load()}}function N(e){var t=[];if(typeof e=="object")if(e instanceof Array)t=t.concat(e);else{var n;for(n in e)t=t.concat(N(e[n]))}else t.push(e);return t}function C(e){var t=N(e),n=Math.floor(Math.random()*t.length),r=t[n];L(r)}function k(e){window.chrome?e.load():e.currentTime=0}function L(e){r=e,k(r),r.play()}function A(e){e.play()}function O(){r.pause()}function M(e,t){return e++,e>=t&&(e=0),e}function _(e){if(!u){s=N(e),u=!0,o=0,a=s[o];var t=s[M(o,s.length)];f=new Audio(t.getAttribute("src")),f.volume=s[M(o,s.length)].vol,f.vol=s[M(o,s.length)].vol,k(f),l=a,c=setInterval(H,4),L(a)}}function D(){u&&(u=!1,a.pause(),clearInterval(c))}function P(){o=M(o,s.length),l!==undefined&&clearInterval(c),l=a,a=f,f=new Audio(s[o].getAttribute("src")),f.volume=s[o].volume,k(f),A(a),u&&(c=setInterval(H,4))}function H(){var e=a.currentTime*100/a.duration;e>=E&&P()}function B(e){v||(h=N(e),v=!0,F())}function j(){v&&(v=!1,m.pause())}function F(){var e=[],t;for(t in h)e.push(t);d=p,d!==undefined&&e.splice(d,1);var n=Math.floor(Math.random()*e.length);p=e[n],l!==undefined&&(l.pause(),clearInterval(b)),y=m,m=h[p],A(m),v&&(c=setInterval(I,4))}function I(){var e=m.currentTime*100/m.duration;e>=S&&F()}function q(e,n){var r=N(e),i;for(i in r){var s=r[i];s.vol=n,s.volume=n*t}}function R(){var e=N(w),n;for(n in e){var r=e[n];r.volume=r.vol*t}}function U(e){t=e,R()}function z(e,n){e._volume=n;for(sound in e)q(e[sound],n*t)}function W(){SaveLoadGame.toggleMute(),e=!e,X()}function X(){e?(n=t,U(0)):U(n)}function V(){O(),D(),j()}var e=!1,t=1,n=1,r=undefined,i=undefined,s,o,u=!1,a=undefined,f=undefined,l=undefined,c,h,p,d,v=!1,m=undefined,g=undefined,y=undefined,b,w={},E=99.9,S=98.5;return{audios:w,load:x,play:C,stop:O,mute:W,setVolumeOfTo:q,setVolumeToCategory:z,setMasterVolumeTo:U,playInLoop:_,stopLoop:D,playInRange:B,stopRange:j,stopAll:V}});