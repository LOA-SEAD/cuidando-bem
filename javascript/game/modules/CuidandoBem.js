define(["Stage","levelsData","commandBar","dialogModal","interactiveObjects","modalScene","scene","endOfLevel","Prontuario","Pulseira","FreqRespiratoria"],function(e,t,n,r,i,s,o,u,a,f,l){function E(e,t){this.title=e,this.score=t}function S(){o.init(h),s.init(h),i.init(h),u.init(h),a.init(h),f.init(h),l.init(h),r.init(h),n.init(h),C(t.getCurrentLevel()),L(),n.hide()}function x(e){k(e)}function T(){j(),C(t.getCurrentLevel()),L()}function N(){return p}function C(e){p=e.getClone(),p.setup(),b=p.getCurrentSceneId()}function k(e){t.setCurrentLevel(e),C(t.getCurrentLevel()),L()}function L(){p.setCurrentSceneById(b),d=p.getCurrentScene(),v=p.getActions(b),g=p.getDialogs(b),m=p.getInteractiveObjects(b),y=p.getFlags(),w=[],o.setScene(d),n.changeToActionsButtons(v),i.changeToInteractiveObjects(m),d.load()}function A(e){var t=d;p.setCurrentSceneById(e),d=p.getCurrentScene(),b=e,v=p.getActions(b),g=p.getDialogs(b),m=p.getInteractiveObjects(b),y=p.getFlags(),t.unload(),o.changeScene(d),n.changeToActionsButtons(v),i.changeToInteractiveObjects(m),d.load()}function O(e){var t=p.getModalScene(e);d=t,s.open(t),n.changeToActionsButtons(t.getActions()),i.changeToInteractiveObjects(t.getInteractiveObjects())}function M(){s.close(),n.changeToActionsButtons(v),i.changeToInteractiveObjects(m),d=p.getCurrentScene()}function _(){n.show()}function D(){n.hide()}function P(e){var t=g[e];r.show(t),F(),I(),D()}function H(){r.close(),R(),q(),_()}function B(){u.show(w)}function j(){u.close()}function F(){n.disableAllActionButtons(v)}function I(){i.disableAllInteractiveObjects(m)}function q(){i.updateAllInteractiveObjects(m)}function R(){n.updateAllActionButtons(v)}function U(e){var t=d.getAction(e);t.setEnable(!1),n.disableActionButton(t,_value)}function z(e){var t=d.getAction(e);t.setEnable(!0),n.enableActionButton(t)}function W(e){var t=d.getInteractiveObject(e);t.setEnable(!1),i.disableActionButton(action,_value)}function X(e){var t=d.getInteractiveObject(e);t.setEnable(!0),i.enableActionButton(action)}function V(e){return p.getFlag(e)}function J(e,t){p.setFlag(e,t)}function K(e,t){var n=d.getAction(e);t?z(n):U(n)}function Q(e,t){var r=d.getAction(e);r.setVisibility(t),n.setActionVisible(r,t)}function G(e){var t=d.getAction(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),n.setActionVisible(t,t.isVisible())}function Y(e,t){var n=d.getInteractiveObject(e);n.setVisibility(t),i.setInteractiveObjectVisible(n,t)}function Z(e){var t=d.getInteractiveObject(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),i.setInteractiveObjectVisible(t,t.isVisible())}function et(e){w.push(e),c.addScore(t.getCurrentLevelId(),e)}function tt(){e.changeScreen(0)}function nt(e){var t="."+d.getCssClass(),n="."+e;$(t).addClass(e),$(n).removeClass(d.getCssClass()),d.setCssClass(e)}function rt(e){c.unlockLevel(e)}var c=require("Storage"),h="#gameStage",p,d,v,m,g,y,b,w,it={init:S,start:x,restartLevel:T,changeScene:A,changeLevelTo:k,openDialog:P,closeDialog:H,openModalScene:O,closeModalScene:M,showEndOfLevel:B,closeEndOfLevel:j,openCommandBar:_,closeCommandBar:D,unlockLevel:rt,enableActionButton:z,disableActionButton:U,enableInteractiveObject:X,disableInteractiveObject:W,setActionEnable:K,getCurrentLevel:N,getFlag:V,setFlag:J,setActionVisible:Q,toggleActionVisible:G,setInteractiveObjectVisible:Y,toggleInteractiveObjectVisible:Z,registerScoreItem:et,disableAllActionButtons:F,updateAllActionButtons:R,disableAllInteractiveObjects:I,updateAllInteractiveObjects:q,goBackToMenu:tt,changeSceneCssClassTo:nt};return window.gameShark={Stage:e,game:t,CommandBar:n,Dialog:r,InteractiveObject:i,ModalScene:s,Scene_con:o,endOfLevel:u,Player:require("Player"),core:it},it});