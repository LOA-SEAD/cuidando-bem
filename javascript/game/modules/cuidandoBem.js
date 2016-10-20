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

define(["Stage","levelsData","commandBar","dialogModal","interactiveObjects","modalInteractiveObjects","modalScene","scene","endOfLevel","Prontuario","Pulseira","FreqRespiratoria","EquipoGotejamento","Ficha"],function(e,t,i,n,c,s,a,o,l,r,u,g,b,v){function d(){o.init(re),c.init(re),a.init(re),s.init(re),l.init(re),r.init(re),u.init(re),g.init(re),b.init(re),v.init(re),n.init(re),i.init(re),p(t.getCurrentLevel()),C()}function f(){return $("#pauseMenu").is(":visible")?(ge=$("#pauseMenu .button"),"pause"):$("#commandBar").is(":visible")?(ge=$.merge($("#interactiveObjects div[class!='disabled']:visible"),$("#commandBar .action_button[class!='disabled']:visible")),"interactiveObjectsAndActions"):(ge=$("#interactiveObjects div[class!='disabled']:visible"),"interactiveObjectsOnly")}function A(e){if(op=f(),e==ve)return je>=ge.length-1?je=0:je++,$(ge[je]).trigger("screenReader"),!1;if(e==be)return je>0?je--:je=ge.length-1,$(ge[je]).trigger("screenReader"),!1;if(e==de){if(je!=-1)return $(ge[je]).click(),!1}else if($("#pauseButton").is(":visible")&&e==fe)return $("#pauseButton").click(),!1}function h(){$(window).off("keydown"),$(window).on("keydown",function(e){return!$("#dialogBar").is(":visible")||$("#pauseMenu").is(":visible")?A(e.which):e.which==be&&$(".dialog_reread").is(":visible")?($(".dialog_reread").click(),!1):e.which==ve&&$(".dialog_right").is(":visible")?($(".dialog_right").click(),!1):e.which==Ae&&$(".dialog_button[value='1']").is(":visible")?($(".dialog_button[value='1']").click(),!1):e.which==he&&$(".dialog_button[value='2']").is(":visible")?($(".dialog_button[value='2']").click(),!1):e.which==Oe&&$(".dialog_button[value='3']").is(":visible")?($(".dialog_button[value='3']").click(),!1):$("#pauseButton").is(":visible")&&e.which==fe?($("#pauseButton").click(),!1):void 0})}function O(e){B(e)}function j(){_(),p(t.getCurrentLevel()),C()}function I(){return ee}function p(e){ee=e.getClone(),u.resetData(),ee.setup(),n.close(),ae=ee.getCurrentSceneId()}function B(e){t.setCurrentLevel(e),p(t.getCurrentLevel()),C()}function C(){ee.setCurrentSceneById(ae),te=ee.getCurrentScene(),ie=ee.getActions(ae),ce=ee.getDialogs(ae),ne=ee.getInteractiveObjects(ae),se=ee.getFlags(),oe=[],o.setScene(te),i.changeToActionsButtons(ie),c.changeToInteractiveObjects(ne),l.close(),r.close(),u.close(),g.close(),b.close(),v.close(),n.close(),i.hide(),te.load(),ue.playInRange(ue.audios.musics.inGame),h()}function m(e){var t=te;ee.setCurrentSceneById(e),te=ee.getCurrentScene(),ae=e,ie=ee.getActions(ae),ce=ee.getDialogs(ae),ne=ee.getInteractiveObjects(ae),se=ee.getFlags(),t.unload(),o.changeScene(te),i.changeToActionsButtons(ie),c.changeToInteractiveObjects(ne),te.load()}function S(e){var t=ee.getModalScene(e);te=t,a.open(t),s.open(),i.changeToActionsButtons(t.getActions()),c.disableAllInteractiveObjects(ne),s.changeToInteractiveObjects(t.getInteractiveObjects())}function V(){a.close(),s.close(),i.changeToActionsButtons(ie),s.removeAllInteractiveObjects(),c.updateAllInteractiveObjects(ne),te=ee.getCurrentScene(),h()}function y(){i.show()}function w(){i.hide()}function k(e){var t=ce[e];n.show(t),ue.play(ue.audios.sfx.avancarMensagens),F(),T(),w()}function L(){n.close(),ue.play(ue.audios.sfx.avancarMensagens),D(),E(),y()}function M(){l.show(oe,ee.getMaxPoints())}function _(){l.close()}function F(){i.disableAllActionButtons(ie)}function T(){c.disableAllInteractiveObjects(ne)}function E(){c.updateAllInteractiveObjects(ne)}function D(){i.updateAllActionButtons(ie)}function q(e){var t=te.getAction(e);t.setEnable(!1),i.disableActionButton(t)}function P(e){var t=te.getAction(e);t.setEnable(!0),i.enableActionButton(t)}function R(e){var t=te.getInteractiveObject(e);t.setEnable(!1),c.disableInteractiveObject(t)}function x(e){var t=te.getInteractiveObject(e);t.setEnable(!0),c.enableInteractiveObject(t)}function G(e){return ee.getFlag(e)}function z(e,t){return"undefined"==typeof t?ee.getFlag(e).getValue():void ee.getFlag(e).setValue(t)}function H(e,t){ee.setFlag(e,t)}function J(e,t){var i=te.getAction(e);"undefined"!=typeof t?P(i):q(i)}function K(e,t){var n=te.getAction(e);n.setVisibility(t),i.setActionVisible(n,t)}function N(e){var t=te.getAction(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),i.setActionVisible(t,t.isVisible())}function Q(e,t){var i=te.getInteractiveObject(e);i.setVisibility(t),c.setInteractiveObjectVisible(i,t)}function U(e){var t=te.getInteractiveObject(e);t.isVisible()?t.setVisibility(!1):t.setVisibility(!0),c.setInteractiveObjectVisible(t,t.isVisible())}function W(e){e&&$.inArray(e,oe)<0&&(oe.push(e),le.addScore(t.getCurrentLevelId(),e))}function X(){e.changeScreen(6)}function Y(e){var t="."+te.getCssClass(),i="."+e;$(t).addClass(e),$(i).removeClass(te.getCssClass()),te.setCssClass(e)}function Z(e){le.unlockLevel(e)}var ee,te,ie,ne,ce,se,ae,oe,le=require("Storage"),re="#gameStage",ue=require("Player"),ge=null;const be=38,ve=40,de=13,fe=27,Ae=49,he=50,Oe=51;var je=0,Ie={init:d,start:O,restartLevel:j,changeScene:m,changeLevelTo:B,openDialog:k,closeDialog:L,openModalScene:S,closeModalScene:V,showEndOfLevel:M,closeEndOfLevel:_,openCommandBar:y,closeCommandBar:w,unlockLevel:Z,enableActionButton:P,disableActionButton:q,enableInteractiveObject:x,disableInteractiveObject:R,setActionEnable:J,getCurrentLevel:I,getFlag:G,setFlag:H,flag:z,setActionVisible:K,toggleActionVisible:N,setInteractiveObjectVisible:Q,toggleInteractiveObjectVisible:U,registerScoreItem:W,disableAllActionButtons:F,updateAllActionButtons:D,disableAllInteractiveObjects:T,updateAllInteractiveObjects:E,goBackToMenu:X,changeSceneCssClassTo:Y};return Ie});