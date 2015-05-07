define(["Stage","levelsData","commandBar","dialogModal","interactiveObjects","modalScene","scene","endOfLevel","Prontuario","Pulseira"],function(e,t,n,r,i,s,o,u,a,f){function b(e,t){this.title=e,this.score=t}function w(){o.init(l),s.init(l),i.init(l),u.init(l),a.init(l),f.init(l),r.init(l),n.init(l),x(t.getCurrentLevel()),N(),n.hide()}function E(e){T(e)}function S(){return c}function x(e){c=e.getClone(),g=c.getCurrentSceneId()}function T(e){t.setCurrentLevel(e),x(t.getCurrentLevel()),N()}function N(){c.setCurrentSceneById(g),h=c.getCurrentScene(),p=c.getActions(g),v=c.getDialogs(g),d=c.getInteractiveObjects(g),m=c.getFlags(),y=[],o.setScene(h),n.changeToActionsButtons(p),i.changeToInteractiveObjects(d),h.load()}function C(e){var t=h;c.setCurrentSceneById(e),h=c.getCurrentScene(),g=e,p=c.getActions(g),v=c.getDialogs(g),d=c.getInteractiveObjects(g),m=c.getFlags(),t.unload(),o.changeScene(h),n.changeToActionsButtons(p),i.changeToInteractiveObjects(d),h.load()}function k(e){var t=c.getModalScene(e);h=t,s.open(t),n.changeToActionsButtons(t.getActions()),i.changeToInteractiveObjects(t.getInteractiveObjects())}function L(){s.close(),n.changeToActionsButtons(p),i.changeToInteractiveObjects(d),h=c.getCurrentScene()}function A(){n.show()}function O(){n.hide()}function M(e){var t=v[e];r.show(t),H(),B()}function _(){r.close(),F(),j()}function D(){u.show(y)}function P(){u.close()}function H(){n.disableAllActionButtons(p)}function B(){i.disableAllInteractiveObjects(d)}function j(){i.updateAllInteractiveObjects(d)}function F(){n.updateAllActionButtons(p)}function I(e){var t=h.getAction(e);t.setEnable(!1),n.disableActionButton(t,_value)}function q(e){var t=h.getAction(e);t.setEnable(!0),n.enableActionButton(t)}function R(e){return c.getFlag(e)}function U(e,t){c.setFlag(e,t)}function z(e,t){var n=h.getAction(e);t?q(n):I(n)}function W(e,t){var r=h.getAction(e);r.setVisibility(t),n.setActionVisible(r,t)}function X(e){var t=h.getAction(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),n.setActionVisible(t,t.isVisible())}function V(e,t){var n=h.getInteractiveObject(e);n.setVisibility(t),i.setInteractiveObjectVisible(n,t)}function J(e){var t=h.getInteractiveObject(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),i.setInteractiveObjectVisible(t,t.isVisible())}function K(e,t){y.push(new b(e,t))}function Q(){e.changeScreen(0)}function G(e){var t="."+h.getCssClass(),n="."+e;$(t).addClass(e),$(n).removeClass(h.getCssClass()),h.setCssClass(e)}var l="#gameStage",c,h,p,d,v,m,g,y,Y={init:w,start:E,changeScene:C,changeLevelTo:T,openDialog:M,closeDialog:_,openModalScene:k,closeModalScene:L,showEndOfLevel:D,closeEndOfLevel:P,openCommandBar:A,closeCommandBar:O,enableActionButton:q,disableActionButton:I,setActionEnable:z,getCurrentLevel:S,getFlag:R,setFlag:U,setActionVisible:W,toggleActionVisible:X,setInteractiveObjectVisible:V,toggleInteractiveObjectVisible:J,registerScoreItem:K,disableAllActionButtons:H,updateAllActionButtons:F,disableAllInteractiveObjects:B,updateAllInteractiveObjects:j,goBackToMenu:Q,changeSceneCssClassTo:G};return window.gameShark={Stage:e,game:t,CommandBar:n,Dialog:r,InteractiveObject:i,ModalScene:s,Scene_con:o,endOfLevel:u,Player:require("Player"),core:Y},Y});