define(["SimpleStorage"],function(e){function r(e){this.name=e,this.empty=!0,this.lastLevel=-1,this.levels=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],this.getClone=function(){var e=new r(this.name);return e.empty=this.empty,e.lastLevel=this.lastLevel,e.levels=this.levels,e}}function v(){c=e.get(a),(c===undefined||!(c instanceof Array)||c.length!==3)&&m();for(i in c){var t=c[i];if(!t instanceof r||t===null)t=s.getClone(),c[i]=t}x(),d=e.get(f);if(d===undefined||typeof d!="boolean")d=!1,e.set(f,d);p=e.get(l);if(p===undefined||typeof p!="number"||p<0||p>3)p=0,e.set(l)}function m(){c=[s.getClone(),s.getClone(),s.getClone()],e.set(a,c)}function y(){return console.log("Loading all data"),c}function b(e){if(e<0||e>2)throw new Error(o.id_out_range+e);return console.log("Loading save from: "+c[e].name+" id: "+e),h=e,c[e]}function w(){return c[h]}function E(){e.flush(),v()}function S(t){if(t<0||t>2)throw new Error(o.id_out_range+t);c[t]=s.getClone(),e.set(a,c)}function x(){e.set(a,c)}function T(e,r){if(e<t||e>n)throw new Error("LevelId Failed");var i=c[h].levels[e];i===undefined?i=[r]:i instanceof Array?i.push(r):console.error("This should never happen."),c[h].levels[e]=i}function N(e){if(e<t||e>n)throw new Error("LevelId Failed");c[h].levels[e]=undefined}function C(e,t){var n=c[e];n.name=t,n.empty=!1,c[e]=n,x()}function k(t){p=t,e.set(l,p)}function L(){d=!d,e.set(f,d)}function A(){return d}function O(){return p}function M(e){var t=c[h];t.lastLevel<e&&(t.lastLevel=e-1),x()}console.info("SaveLoadGame - module loaded");var t=0,n=9,s=new r("Novo Jogo"),o={id_out_range:"Save id must be: 0 <= id <= 2. Passed id: "},u=[undefined,undefined,undefined],a="saves_container",f="is_muted",l="selected_id",c,h,p,d;v();for(i in c){var g=c[i];g!==undefined&&g!==null?console.log("Slot #"+i+" = "+g.name):console.log("Slot #"+i+" is empty")}return e.flush(),c[0]=new r("Testing"),c[0].lastLevel=n,c[0].empty=!1,x(),{load:y,loadSlot:b,save:x,setupSlot:C,reset:S,resetAll:E,unlockLevel:M,addScore:T,resetScore:N,toggleMute:L,isMuted:A,getLoadedSlot:w,setSelectedId:k,getSelectedId:O}});