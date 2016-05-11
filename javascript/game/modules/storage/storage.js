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

define(["SimpleStorage"],function(e){function r(e){this.name=e,this.empty=!0,this.lastLevel=-1,this.levels=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],this.getClone=function(){var e=new r(this.name);return e.empty=this.empty,e.lastLevel=this.lastLevel,e.levels=this.levels,e}}function E(){d=e.get(a),(d===undefined||!(d instanceof Array)||d.length!==3)&&S();for(i in d){var t=d[i];if(!t instanceof r||t===null)t=s.getClone(),d[i]=t}A(),g=e.get(f);if(g===undefined||typeof g!="boolean")g=!1,e.set(f,g);b=e.get(c);if(b===undefined||typeof b!="boolean")b=!1,e.set(c,b);y=e.get(l);if(y===undefined||typeof y!="number")y=1,e.set(l,y);w=e.get(h);if(w===undefined||typeof w!="number")w=1,e.set(h,w);m=e.get(p);if(m===undefined||typeof m!="number"||m<0||m>3)m=0,e.set(p)}function S(){d=[s.getClone(),s.getClone(),s.getClone()],e.set(a,d)}function T(){return d}function N(e){if(e<0||e>2)throw new Error(o.idOutRange+e);return v=e,d[e]}function C(){return d[v]}function k(){e.flush(),E()}function L(t){if(t<0||t>2)throw new Error(o.idOutRange+t);d[t]=s.getClone(),e.set(a,d)}function A(){e.set(a,d)}function O(e,r){if(e<t||e>n)throw new Error("LevelId Failed");var i=d[v].levels[e];i?i instanceof Array&&i.push(r):i=[r],d[v].levels[e]=i}function M(e){if(e<t||e>n)throw new Error("LevelId Failed");d[v].levels[e]=undefined}function _(e,t){var n=d[e];n.name=t,n.empty=!1,d[e]=n,A()}function D(t){m=t,e.set(p,m)}function P(){g=!g,e.set(f,g)}function H(){b=!b,e.set(c,b)}function B(){return g}function j(){return b}function F(){return y}function I(){return w}function q(t){t>=0&&t<=1?y=t:y=1,e.set(l,y)}function R(t){t>=0&&t<=1?w=t:w=1,e.set(h,w)}function U(){return m}function z(e){var t=d[v];t.lastLevel<e&&(t.lastLevel=e-1),A()}var t=1,n=10,s=new r("Novo Jogo"),o={idOutRange:"Save id must be: 0 <= id <= 2. Passed id: "},u=[undefined,undefined,undefined],a="saves_container",f="sfx_muted",l="sfx_volume",c="music_muted",h="music_volume",p="selected_id",d,v,m,g,y,b,w;E();for(i in d){var x=d[i];x!==undefined&&x!==null}return{load:T,loadSlot:N,save:A,setupSlot:_,reset:L,resetAll:k,unlockLevel:z,addScore:O,resetScore:M,setSfxVolume:q,getSfxVolume:F,setMusicVolume:R,getMusicVolume:I,toggleSfxMute:P,toggleMusicMute:H,isSfxMuted:B,isMusicMuted:j,getLoadedSlot:C,setSelectedId:D,getSelectedId:U}});