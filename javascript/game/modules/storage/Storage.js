define(["SimpleStorage"],function(e){function t(e){this.name=e,this.empty=!0,this.lastLevel=-1,this.levels=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],this.getClone=function(){var e=new t(this.name);return e.empty=this.empty,e.lastLevel=this.lastLevel,e.levels=this.levels,e}}function p(){f=e.get(o),(f===undefined||!(f instanceof Array)||f.length!==3)&&d();for(i in f){var r=f[i];if(!r instanceof t||r===null)r=n.getClone(),f[i]=r}E(),h=e.get(u);if(h===undefined||typeof h!="boolean")h=!1,e.set(u,h);c=e.get(a);if(c===undefined||typeof c!="number"||c<0||c>3)c=0,e.set(a)}function d(){f=[n.getClone(),n.getClone(),n.getClone()],e.set(o,f)}function m(){return f}function g(e){if(e<0||e>2)throw new Error(r.id_out_range+e);return l=e,f[e]}function y(){return f[l]}function b(){e.flush(),p()}function w(t){if(t<0||t>2)throw new Error(r.id_out_range+t);f[t]=n.getClone(),e.set(o,f)}function E(){e.set(o,f)}function S(e,t){if(e<0||e>8)throw new Error("LevelId Failed");var n=f[l].levels[e];n===undefined?n=[t]:n instanceof Array&&n.push(t),f[l].levels[e]=n}function x(e){if(e<0||e>8)throw new Error("LevelId Failed");f[l].levels[e]=undefined}function T(e,t){var n=f[e];n.name=t,n.empty=!1,f[e]=n,E()}function N(t){c=t,e.set(a,c)}function C(){h=!h,e.set(u,h)}function k(){return h}function L(){return c}var n=new t("Novo Jogo"),r={id_out_range:"Save id must be: 0 <= id <= 2. Passed id: "},s=[undefined,undefined,undefined],o="saves_container",u="is_muted",a="selected_id",f,l,c,h;p();for(i in f){var v=f[i];v!==undefined&&v!==null}return e.flush(),f[0]=new t("Testing"),f[0].lastLevel=8,f[0].empty=!1,E(),{load:m,loadSlot:g,save:E,setupSlot:T,reset:w,resetAll:b,addScore:S,resetScore:x,toggleMute:C,isMuted:k,getLoadedSlot:y,setSelectedId:N,getSelectedId:L}});