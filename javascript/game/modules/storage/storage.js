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

define(["SimpleStorage"],function(e){function t(e){this.name=e,this.empty=!0,this.lastLevel=0,this.levels=[void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0],this.getClone=function(){var e=new t(this.name);return e.empty=this.empty,e.lastLevel=this.lastLevel,e.levels=this.levels,e}}function n(){_=e.get(P),void 0!==_&&_ instanceof Array&&3===_.length||o();for(i in _){var n=_[i];(!n instanceof t||null===n)&&(n=J.getClone(),_[i]=n)}v(),V=e.get(q),(void 0===V||"boolean"!=typeof V)&&(V=!1,e.set(q,V)),O=e.get(B),(void 0===O||"boolean"!=typeof O)&&(O=!1,e.set(B,O)),A=e.get(z),(void 0===A||"number"!=typeof A)&&(A=1,e.set(z,A)),R=e.get(D),(void 0===R||"number"!=typeof R)&&(R=1,e.set(D,R)),I=e.get(G),(void 0===I||"number"!=typeof I||0>I||I>3)&&(I=0,e.set(G))}function o(){_=[J.getClone(),J.getClone(),J.getClone()],e.set(P,_)}function l(){return _}function u(e){if(0>e||e>2)throw new Error(N.idOutRange+e);return E=e,_[e]}function r(){return _[E]}function s(){e.flush(),n()}function f(t){if(0>t||t>2)throw new Error(N.idOutRange+t);_[t]=J.getClone(),e.set(P,_)}function v(){e.set(P,_)}function d(e,t){if(F>e||e>k)throw new Error("LevelId Failed");var n=e-1,o=_[E].levels[n];o?o instanceof Array&&o.push(t):o=[t],_[E].levels[n]=o}function c(e){if(F>e||e>k)throw new Error("LevelId Failed");var t=e-1;_[E].levels[t]=void 0}function a(e,t){var n=_[e];n.name=t,n.empty=!1,_[e]=n,v()}function g(t){I=t,e.set(G,I)}function m(){V=!V,e.set(q,V)}function h(){O=!O,e.set(B,O)}function S(){return V}function p(){return O}function y(){return A}function w(){return R}function L(t){A=t>=0&&1>=t?t:1,e.set(z,A)}function M(t){R=t>=0&&1>=t?t:1,e.set(D,R)}function b(){return I}function x(e){var t=_[E];t.lastLevel<e&&(t.lastLevel=e-1),v()}function C(){var e=_[E],t=0;for(i=0;i<e.levels.length-1;i++)if("undefined"!=typeof e.levels[i])for(j=0;j<e.levels[i].length-1;j++)t+=e.levels[i][j].score;return t}var _,E,I,V,A,O,R,F=1,k=10,J=new t("Novo Jogo"),N={idOutRange:"Save id must be: 0 <= id <= 2. Passed id: "},P="saves_container",q="sfx_muted",z="sfx_volume",B="music_muted",D="music_volume",G="selected_id";n();for(i in _)var H=_[i];return{load:l,loadSlot:u,save:v,setupSlot:a,reset:f,resetAll:s,unlockLevel:x,addScore:d,resetScore:c,getScoreSum:C,setSfxVolume:L,getSfxVolume:y,setMusicVolume:M,getMusicVolume:w,toggleSfxMute:m,toggleMusicMute:h,isSfxMuted:S,isMusicMuted:p,getLoadedSlot:r,setSelectedId:g,getSelectedId:b}});