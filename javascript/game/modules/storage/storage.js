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

define(["SimpleStorage"],function(e){function t(e){this.name=e,this.empty=!0,this.lastLevel=0,this.credits=!1,this.levels=[void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0],this.getClone=function(){var e=new t(this.name);return e.empty=this.empty,e.lastLevel=this.lastLevel,e.levels=this.levels,e}}function n(){V=e.get(B),void 0!==V&&V instanceof Array&&3===V.length||o();for(i in V){var n=V[i];(!n instanceof t||null===n)&&(n=q.getClone(),V[i]=n)}v(),R=e.get(D),(void 0===R||"boolean"!=typeof R)&&(R=!1,e.set(D,R)),k=e.get(H),(void 0===k||"boolean"!=typeof k)&&(k=!1,e.set(H,k)),F=e.get(G),(void 0===F||"number"!=typeof F)&&(F=1,e.set(G,F)),J=e.get(K),(void 0===J||"number"!=typeof J)&&(J=1,e.set(K,J)),O=e.get(Q),(void 0===O||"number"!=typeof O||0>O||O>3)&&(O=0,e.set(Q))}function o(){V=[q.getClone(),q.getClone(),q.getClone()],e.set(B,V)}function r(){return V}function s(e){if(0>e||e>2)throw new Error(z.idOutRange+e);return A=e,V[e]}function u(){return V[A]}function l(){e.flush(),n()}function f(t){if(0>t||t>2)throw new Error(z.idOutRange+t);V[t]=q.getClone(),e.set(B,V)}function v(){e.set(B,V)}function d(e,t){if(N>e||e>P)throw new Error("LevelId Failed");var n=e-1,o=V[A].levels[n];o?o instanceof Array&&o.push(t):o=[t],V[A].levels[n]=o}function c(e){if(N>e||e>P)throw new Error("LevelId Failed");var t=e-1;V[A].levels[t]=void 0}function a(e,t){var n=V[e];n.name=t,n.empty=!1,V[e]=n,v()}function g(t){O=t,e.set(Q,O)}function m(){R=!R,e.set(D,R)}function h(){k=!k,e.set(H,k)}function S(){return R}function p(){return k}function y(){return F}function w(){return J}function L(t){F=t>=0&&1>=t?t:1,e.set(G,F)}function C(t){J=t>=0&&1>=t?t:1,e.set(K,J)}function M(){return O}function b(e){var t=V[A];t.lastLevel<e&&(t.lastLevel=e-1),v()}function x(){var e=V[A],t=0;for(i=0;i<e.levels.length-1;i++)if("undefined"!=typeof e.levels[i])for(j=0;j<e.levels[i].length-1;j++)t+=e.levels[i][j].score;return t}function _(e){var t=V[A],n=t.levels[e],o=0;if("undefined"!=typeof n)for(j=0;j<n.length-1;j++)o+=n[j].score;return o}function E(){var e=V[A];return e.credits}function I(){var e=V[A];e.credits=!0}var V,A,O,R,F,k,J,N=1,P=10,q=new t("Novo Jogo"),z={idOutRange:"Save id must be: 0 <= id <= 2. Passed id: "},B="saves_container",D="sfx_muted",G="sfx_volume",H="music_muted",K="music_volume",Q="selected_id";n();for(i in V)var T=V[i];return{load:r,loadSlot:s,save:v,setupSlot:a,reset:f,resetAll:l,unlockLevel:b,addScore:d,resetScore:c,getScoreSum:x,getLevelScoreSum:_,setSfxVolume:L,getSfxVolume:y,setMusicVolume:C,getMusicVolume:w,toggleSfxMute:m,toggleMusicMute:h,isSfxMuted:S,isMusicMuted:p,hasSeenCredits:E,seeCredits:I,getLoadedSlot:u,setSelectedId:g,getSelectedId:M}});