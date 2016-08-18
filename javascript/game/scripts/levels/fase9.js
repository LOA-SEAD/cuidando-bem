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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData","Ficha"],function(e,a,o,r,i,t,n,s,c,l,g,_,u,p){function f(){s.changeScene(1)}function m(){s.openDialog(0)}function d(){s.changeScene(2)}function C(){0==s.flag("score_pegou_medicamento")&&0==s.flag("score_ir_posto_hora_errada")&&(s.registerScoreItem(u.irPostoEnfermagemHoraErrada),s.flag("score_ir_posto_hora_errada",!0)),s.changeScene(5)}function b(){0==s.flag("score_ir_ala_feminina_hora_errada")&&(s.registerScoreItem(u.irAlaFemininaHoraErrada),s.flag("score_ir_ala_feminina_hora_errada",!0)),s.changeScene(7)}function v(){0==s.flag("score_viu_prontuario")&&0==s.flag("score_ir_farmacia_hora_errada")&&(s.registerScoreItem(u.irFarmaciaHoraErrada),s.flag("score_ir_farmacia_hora_errada",!0)),s.changeScene(4)}function w(){0==s.flag("levou_yuri_centro_cirurgico")?(0==s.flag("score_ir_centro_cirurgico_hora_errada")&&(s.registerScoreItem(u.irCentroCirurgicoHoraErrada),s.flag("score_ir_centro_cirurgico_hora_errada",!0)),s.changeScene(6)):(s.flag("entrou_centro_cirurgico",!0),s.changeScene(8))}function O(){1==s.flag("ja_falou_farmaceutico")&&0==s.flag("score_conferiu_medicacao")&&0==s.flag("score_nao_conferiu_medicacao")&&(s.registerScoreItem(u.naoConferirMedicacao),s.flag("score_nao_conferiu_medicacao",!0)),s.changeScene(1)}var j=require("DialogsData").fase9,S=require("DialogsData").alertas,u=require("ScoresData").fase9,h=require("Player"),y=new r("Level 9");y.setMaxPoints(u._sum);var D,I,V,M,F,x,A,P,T,k,L;D=c.scenes.recepcao.getClone().onLoad(function(){0==s.flag("conversar_recepcionista")&&(s.flag("conversar_recepcionista",!0),s.openDialog(0))}),D.registerInteractiveObjects([new t("intObj-conversar_recepcionista","Recepcionista").setCssClass("intObj-talkToReceptionist").onClick(m).setVisibility(!0),new t("io-ir_corredor_esquerda","Ir ao corredor").setCssClass("intObj-lobbyToHallway-left no-glow").onClick(f).setVisibility(!0),new t("io-ir_corredor_direita","Ir ao corredor").setCssClass("intObj-lobbyToHallway-right no-glow").onClick(f).setVisibility(!0)]),D.registerDialogs([new i(c.characters.recepcionista).setText(j.recepcao[0]).registerOption("",function(){s.closeDialog()})]),I=c.scenes.corredor.getClone().onLoad(function(){s.openCommandBar(),s.setActionVisible("btn-ir_recepcao",!0),h.stopAll(),h.play(h.audios.sfx.abrirPorta),h.playInLoop(h.audios.loops.recepcao)}).onUnload(function(){h.stopAll(),h.play(h.audios.sfx.abrirPorta),h.playInRange(h.audios.musics.inGame)}),I.registerActions([new o("btn-ir_recepcao","Voltar para a recepção").setCssClass("action-voltarRecepcao").onClick(function(){s.changeScene(0)}).setVisibility(!0)]),I.registerInteractiveObjects([new t("io-ir_sala_leitos","Ir à Enfermaria Masculina").setCssClass("intObj-goToBedroom").onClick(d).setVisibility(!0),new t("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem").setCssClass("intObj-goToNursingStation").onClick(C).setVisibility(!0),new t("io-ir_ala_feminina","Ir à Enfermaria Feminina").setCssClass("intObj-goToAlaFeminina").onClick(b).setVisibility(!0),new t("io-ir_farmacia","Ir à Farmácia").setCssClass("intObj-goToPharmacy").onClick(v).setVisibility(!0),new t("io-ir_centro_cirurgico","Ir ao Centro Cirurgico").setCssClass("intObj-goToCentroCirurgico").onClick(w).setVisibility(!0)]),V=new a("salaDeLeitos","scene-salaDeLeitos").setCssClass("scene-bedroom-level8").onLoad(function(){1==s.flag("ja_falou_paciente")&&s.openCommandBar(),1==s.flag("pegou_copo")&&1==s.flag("pegou_agua")&&0==s.flag("levou_yuri_centro_cirurgico")&&(s.setActionVisible("btn-lavarMaos",!0),s.setInteractiveObjectVisible("io-ir_leito",!0),s.setInteractiveObjectVisible("io-falarPaciente",!1),s.openCommandBar()),1==s.flag("levou_yuri_centro_cirurgico")&&(s.setInteractiveObjectVisible("io-ir_leito",!1),s.setActionVisible("btn-ler_prontuario",!1),s.setActionVisible("btn-lavarMaos",!1),s.changeSceneCssClassTo("scene-bedroom-level8b"))}).onUnload(function(){s.closeCommandBar()}),V.registerInteractiveObjects([new t("io-ir_corredor","Ir ao Corredor").setCssClass("intObj-bedroomToHallway").onClick(function(){s.changeScene(1)}).setVisibility(!0),new t("io-ir_leito","Ir ao leito").setCssClass("intObj-irLeitoEsquerda").onClick(function(){0==s.flag("score_lavar_maos_antes_leito")?s.openDialog(7):s.changeScene(3)}).setVisibility(!1),new t("io-falarPaciente","Falar com o paciente").setCssClass("intObj-irLeitoEsquerda").onClick(function(){0==s.flag("ja_falou_paciente")&&(s.flag("ja_falou_paciente",!0),s.openDialog(0),s.setActionVisible("btn-ler_prontuario",!0))}).setVisibility(!0)]),V.registerActions([new o("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){0==s.flag("score_viu_prontuario")&&(s.registerScoreItem(u.verProntuario),s.flag("score_viu_prontuario",!0)),g.open(),s.openModalScene("Prontuario")}).setVisibility(!1),new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){h.play(h.audios.sfx.lavarMaos),0==s.flag("score_lavar_maos_antes_leito")&&(s.registerScoreItem(u.lavarMaosAntesLeito),s.flag("score_lavar_maos_antes_leito",!0))}).setVisibility(!1)]),V.registerDialogs([new i(c.characters.jogador).setText(j.alaMasculina[0]).registerOption("",function(){s.openDialog(1)}),new i(c.characters.pacientes.yuri).setText(j.alaMasculina[1]).registerOption("",function(){s.openDialog(2)}),new i(c.characters.jogador).setText(j.alaMasculina[2]).registerOption("",function(){s.openDialog(3)}),new i(c.characters.pacientes.yuri).setText(j.alaMasculina[3]).registerOption("",function(){s.openDialog(4)}),new i(c.characters.jogador).setText(j.alaMasculina[4]).registerOption("",function(){s.openDialog(5)}),new i(c.characters.pacientes.yuri).setText(j.alaMasculina[5]).registerOption("",function(){s.openDialog(6)}),new i(c.characters.jogador).setText(j.alaMasculina[6]).registerOption("",function(){s.closeDialog()}),new i(c.characters.mentor).setText(S.lavarMaos.tipo1).registerOption("",function(){s.closeDialog()})]),M=c.scenes.leitos.yuri.getClone().onLoad(function(){s.closeCommandBar(),1==s.flag("score_pegou_agua")&&1==s.flag("score_pegou_copo")&&s.setActionVisible("btn-oferecer_copo",!0),1==s.flag("score_pegou_medicamento")&&s.setActionVisible("btn-administrar_medicamento",!0)}).onUnload(function(){s.closeCommandBar()}),M.registerInteractiveObjects([new t("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_09-checar_pulseira").onClick(function(){s.flag("verificar_pulseira",!0),0==s.flag("score_verificar_pulseira")&&(s.flag("score_verificar_pulseira",!0),s.registerScoreItem(u.verificarPulseira)),s.openModalScene("pulseira"),l.open()}).setVisibility(!0).setEnable(!1),new t("io-conversar_paciente09","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){s.openDialog(0),s.enableInteractiveObject("io-pulseira_paciente",!0)}).setVisibility(!0)]),M.registerDialogs([new i(c.characters.jogador).setText(j.leitoPaciente[0]).registerOption("",function(){s.openDialog(1),s.openCommandBar()}),new i(c.characters.pacientes.yuri).setText(j.leitoPaciente[1]).registerOption("",function(){s.openDialog(2)}),new i(c.characters.jogador).setText(j.leitoPaciente[2]).registerOption("",function(){s.closeDialog()}),new i(c.characters.jogador).setText(j.leitoPaciente[3]).registerOption("",function(){s.closeDialog()}),new i(c.characters.mentor).setText(S.esqueceu.verPulseira).registerOption("",function(){s.closeDialog()})]),M.registerActions([new o("btn-oferecer_copo","Oferecer copo com água para o paciente").setCssClass("action-copo_descartavel").onClick(function(){1==s.flag("verificar_pulseira")?(0==s.flag("score_ofereceu_copo")&&(s.registerScoreItem(u.oferecerCopo),s.flag("score_ofereceu_copo",!0)),s.setActionVisible("btn-oferecer_copo",!1)):(0==s.flag("score_pulseira")&&(s.flag("score_pulseira",!0),s.registerScoreItem(u.naoVerificarPulseira)),s.openDialog(4))}).setVisibility(!0),new o("btn-administrar_medicamento","Administrar o medicamento").setCssClass("action-midazolam_medicamento").onClick(function(){1==s.flag("verificar_pulseira")?(0==s.flag("score_ofereceu_copo")&&0==s.flag("score_nao_ofereceu_copo")&&(s.registerScoreItem(u.naoOferecerCopo),s.flag("score_nao_ofereceu_copo",!0)),0==s.flag("score_administrou_medicamento")&&(s.registerScoreItem(u.administrarMedicamento),s.flag("score_administrou_medicamento",!0))):(0==s.flag("score_pulseira")&&(s.flag("score_pulseira",!0),s.registerScoreItem(u.naoVerificarPulseira)),s.openDialog(4))}).setVisibility(!1),new o("btn-anotarProntuario","Anotar prontuario").setCssClass("action-anotar_prontuario").onClick(function(){1==s.flag("verificar_pulseira")?(0==s.flag("score_administrou_medicamento")&&0==s.flag("score_nao_administrou_medicamento")&&(s.registerScoreItem(u.naoAdministrarMedicamento),s.flag("score_nao_administrou_medicamento",!0)),0==s.flag("score_anotar_prontuario")&&(s.registerScoreItem(u.anotarProntuario),s.flag("score_anotar_prontuario",!0)),g.open(),s.openModalScene("Prontuario")):(0==s.flag("score_pulseira")&&(s.flag("score_pulseira",!0),s.registerScoreItem(u.naoVerificarPulseira)),s.openDialog(4))}).setVisibility(!0),new o("btn-irCentroCirurgico","Ir para sala de cirurgia").setCssClass("action-irCentroCirurgico").onClick(function(){0==s.flag("score_anotar_prontuario")&&0==s.flag("score_nao_anotar_prontuario")&&(s.registerScoreItem(u.naoAnotarProntuario),s.flag("score_nao_anotar_prontuario",!0)),s.changeScene(8)}).setVisibility(!1)]),F=new a("farmacia","scene-pharmacy").setCssClass("scene-pharmacy").onLoad(function(){1==s.flag("ja_falou_farmaceutico")&&(s.setInteractiveObjectVisible("io-midazolam_medicamento",!s.flag("score_pegou_medicamento")),s.openCommandBar(),1==s.flag("score_conferiu_medicacao")&&s.setActionVisible("btn-conferir_midazolam",!1)),1==s.flag("score_viu_prontuario")&&0==s.flag("ja_falou_farmaceutico")&&(s.flag("ja_falou_farmaceutico",!0),s.openDialog(0))}).onUnload(function(){}),F.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){O()}).setVisibility(!0),new o("btn-conferir_midazolam","Conferir Medicamento").setCssClass("action-midazolam_medicamento").onClick(function(){0==s.flag("score_pegou_medicamento")&&0==s.flag("score_nao_pegou_medicamento")&&(s.registerScoreItem(u.naoPegarMedicamento),s.flag("score_nao_pegou_medicamento",!0)),0==s.flag("score_conferiu_medicacao")&&(s.registerScoreItem(u.conferirMedicacao),s.flag("score_conferiu_medicacao",!0)),s.openModalScene("conferirMidazolam")}).setVisibility(!1)]),F.registerInteractiveObjects([new t("io-midazolam_medicamento","Pegar Medicamento").setCssClass("intObj-midazolam_medicamento").onClick(function(){h.play(h.audios.sfx.pegarObjeto),s.registerScoreItem(u.pegarMedicamento),s.flag("score_pegou_medicamento",!0),s.setInteractiveObjectVisible("io-midazolam_medicamento",!1),s.setActionVisible("btn-conferir_midazolam",!0)}).setVisibility(!1)]),F.registerDialogs([new i(c.characters.paulo).setText(j.farmacia[0]).registerOption("",function(){s.openDialog(1)}),new i(c.characters.jogador).setText(j.farmacia[1]).registerOption("",function(){s.openDialog(2)}),new i(c.characters.paulo).setText(j.farmacia[2]).registerOption("",function(){s.closeDialog(),s.setInteractiveObjectVisible("io-midazolam_medicamento",!0),s.openCommandBar()})]),x=c.scenes.postoDeEnfermagem.getClone().onLoad(function(){s.setInteractiveObjectVisible("io-abrirGaveta",!1),s.setInteractiveObjectVisible("io-pegar_bandeja",!1),s.setActionVisible("btn-lavarMaos",!1),1==s.flag("score_conferiu_medicacao")&&(s.setInteractiveObjectVisible("io-abrirGaveta",!0),s.setInteractiveObjectVisible("io-pegar_bandeja",!0),s.setActionVisible("btn-lavarMaos",!0),1==s.flag("pegou_bandeja")&&s.setInteractiveObjectVisible("io-pegar_bandeja",!1),s.openCommandBar())}).onUnload(function(){s.closeCommandBar()}),x.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){1==s.flag("score_pegou_medicamento")&&(0==s.flag("score_pegou_agua")&&0==s.flag("score_nao_pegou_agua")&&(s.registerScoreItem(u.naoPegarAguaPotavel),s.flag("score_nao_pegou_agua",!0)),0==s.flag("score_pegou_copo")&&0==s.flag("score_nao_pegou_copo")&&(s.registerScoreItem(u.naoPegarCopoDescartavel),s.flag("score_nao_pegou_copo",!0))),s.changeScene(1)}).setVisibility(!0),new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){h.play(h.audios.sfx.lavarMaos),0==s.flag("score_lavar_maos_posto_enfermagem")&&(s.registerScoreItem(u.lavarMaosPostoEnfermagem),s.flag("score_lavar_maos_posto_enfermagem",!0))}).setVisibility(!1)]),x.registerInteractiveObjects([new t("io-abrirGaveta","Abrir gaveta").setCssClass("intObj-openDrawer").onClick(function(){1!=s.flag("pegou_bandeja")?s.openDialog(1):(h.play(h.audios.sfx.abrirGaveta),s.openModalScene("gaveta"),s.openCommandBar())}).setVisibility(!0),new t("io-pegar_bandeja","Pegar bandeja").setCssClass("intObj-bandeja").onClick(function(){h.play(h.audios.sfx.pegarObjeto),s.flag("pegou_bandeja",!0),s.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),x.registerDialogs([new i(c.characters.mentor).setText(S.esqueceu.pegarBandeja).registerOption("",function(){s.closeDialog()})]),centroCirurgico=c.scenes.centroCirurgico.getClone().onLoad(function(){s.openCommandBar()}).onUnload(function(){s.closeCommandBar()}),centroCirurgico.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){s.changeScene(1)}).setVisibility(!0)]),A=c.scenes.alaFeminina.getClone().setCssClass("scene-bedroom-level7").onLoad(function(){}).onUnload(function(){}),A.registerInteractiveObjects([new t("io-ir_corredor","Ir ao Corredor").setCssClass("intObj-bedroomToHallway").onClick(function(){s.changeScene(1)}).setVisibility(!0)]),P=c.scenes.centroCirurgicoYuri.getClone().onLoad(function(){0==s.flag("conversar_circulante")&&s.closeCommandBar()}).onUnload(function(){s.closeCommandBar()}),P.registerInteractiveObjects([new t("io-conversar_circulante","Conversar com Circulante").setCssClass("intObj-talkToCirculante").onClick(function(){s.openDialog(0),s.setInteractiveObjectVisible("io-carrinho_anestesico",!0),s.setInteractiveObjectVisible("io-conversar_paciente_cc",!0),s.flag("conversar_circulante",!0)}).setVisibility(!0),new t("io-carrinho_anestesico","Testar Equipamentos").setCssClass("intObj-carrinho_anestesico").onClick(function(){h.play(h.audios.sfx.bip),0==s.flag("score_testou_equipamentos")&&(s.registerScoreItem(u.testarEquipamentos),s.flag("score_testou_equipamentos",!0))}).setVisibility(!1),new t("io-conversar_paciente_cc","Falar com o paciente").setCssClass("intObj-talkToPacienteRegina").onClick(function(){s.openDialog(3)}).setVisibility(!1)]),P.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){s.changeScene(1)}).setVisibility(!0),new o("btn-lavar_maos_cirurgia","Lavar as mãos técnica cirúrgica").setCssClass("action-lavar_maos_escova").onClick(function(){h.play(h.audios.sfx.lavarMaos),0==s.flag("score_lavar_maos_tecnica_cirurgica")&&(s.registerScoreItem(u.lavarMaosTecnicaCirurgica),s.flag("score_lavar_maos_tecnica_cirurgica",!0))}).setVisibility(!0),new o("btn-colocar_placa","Colocar placa neutra").setCssClass("action-placa_neutra").onClick(function(){s.registerScoreItem(u.colocarPlacaNeutra),s.changeSceneCssClassTo("scene-surgeryCenter-yuriComPlaca"),s.setActionVisible("btn-colocar_placa",!1)}).setVisibility(!0),new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){h.play(h.audios.sfx.lavarMaos),0==s.flag("score_lavar_maos_centro_cirurgico")&&(s.registerScoreItem(u.lavarMaosCentroCirurgico),s.flag("score_lavar_maos_centro_cirurgico",!0))}).setVisibility(!0),new o("btn-anotarProntuario","Anotar no prontuario").setCssClass("action-anotar_prontuario").onClick(function(){1==s.flag("score_lavar_maos_centro_cirurgico")?(0==s.flag("score_anotar_prontuario_centro_cirurgico")&&(s.registerScoreItem(u.anotarProntuarioCentroCirurgico),s.flag("score_anotar_prontuario_centro_cirurgico",!0)),g.open(),s.openModalScene("Prontuario")):s.openDialog(18)}).setVisibility(!0)]),P.registerDialogs([new i(c.characters.jogador).setText("").registerOption(j.centroCirurgico[0],function(){s.openDialog(1)}).registerOption(j.centroCirurgico[1],function(){s.openDialog(2)}).setRandomize(!0),new i(c.characters.mentor).setText(j.centroCirurgico[2]).registerOption("",function(){s.openDialog(0)}),new i(c.characters.circulante).setText(j.centroCirurgico[3]).registerOption("",function(){s.closeDialog(),s.closeCommandBar()}),new i(c.characters.jogador).setText(j.centroCirurgico[4]).registerOption("",function(){s.openDialog(4)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[5]).registerOption("",function(){s.openDialog(5)}),new i(c.characters.jogador).setText(j.centroCirurgico[6]).registerOption("",function(){s.openDialog(6)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[7]).registerOption("",function(){s.openDialog(7)}),new i(c.characters.jogador).setText(j.centroCirurgico[8]).registerOption("",function(){s.openDialog(8)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[9]).registerOption("",function(){s.openDialog(9)}),new i(c.characters.jogador).setText(j.centroCirurgico[10]).registerOption("",function(){s.openDialog(10)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[11]).registerOption("",function(){s.openDialog(11)}),new i(c.characters.jogador).setText(j.centroCirurgico[12]).registerOption("",function(){s.openDialog(12)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[13]).registerOption("",function(){s.openDialog(13)}),new i(c.characters.jogador).setText(j.centroCirurgico[14]).registerOption("",function(){s.openDialog(14)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[15]).registerOption("",function(){s.openDialog(15)}),new i(c.characters.jogador).setText(j.centroCirurgico[16]).registerOption("",function(){s.openDialog(16)}),new i(c.characters.pacientes.yuri).setText(j.centroCirurgico[17]).registerOption("",function(){s.openDialog(17)}),new i(c.characters.jogador).setText(j.centroCirurgico[18]).registerOption("",function(){s.closeDialog(),s.openCommandBar()}),new i(c.characters.mentor).setText(S.lavarMaos.tipo2).registerOption("",function(){s.closeDialog()})]),T=new a("pulseira","pulseira"),T.registerInteractiveObjects([]),T.registerActions([new o("btn-largar_pulseira","Fechar pulseira").setCssClass("action-pulseira_paciente").onClick(function(){s.closeModalScene("Pulseira"),l.close()}).setVisibility(!0)]),k=new a("Prontuario","Prontuario"),k.registerActions([new o("btn-fechar_prontuario","Fechar prontuário").setCssClass("action-ler_prontuario").onClick(function(){g.close(),1==s.flag("score_anotar_prontuario")&&0==s.flag("score_anotar_prontuario_centro_cirurgico")&&(g.close(),s.closeModalScene("Prontuario"),s.openDialog(3),s.flag("levou_yuri_centro_cirurgico",!0),s.setActionVisible("btn-irCentroCirurgico",!0),s.setActionVisible("btn-anotarProntuario",!1),s.setActionVisible("btn-administrar_medicamento",!1),s.setActionVisible("btn-oferecer_copo",!1)),1==s.flag("score_anotar_prontuario_centro_cirurgico")?(s.unlockLevel(10),s.closeCommandBar(),s.showEndOfLevel(),h.stopAll(),h.play(h.audios.sfx.missaoCumprida)):s.closeModalScene("Prontuario")}).setVisibility(!0)]),L=new a("conferirMidazolam","Conferir Midazolam").setCssClass("modalScene-midazolamMedicamento"),L.registerActions([new o("btn-fechar_zoom","Finalizar conferição").setCssClass("action-midazolam_medicamento").onClick(function(){s.closeModalScene("conferirMidazolam")})]),gaveta=new a("gaveta","Gaveta").setCssClass("modalScene-drawer"),gaveta.registerActions([new o("btn-fecharGaveta","Fechar gaveta").setCssClass("action-fecharGaveta").onClick(function(){h.play(h.audios.sfx.fecharGaveta),s.closeModalScene("Gaveta")}).setVisibility(!0)]),gaveta.registerInteractiveObjects([new t("io-copo_descartavel","Copo Descartável").setCssClass("intObj-copoDescartavel").onClick(function(){h.play(h.audios.sfx.pegarObjeto),s.setInteractiveObjectVisible("io-copo_descartavel",!1),s.registerScoreItem(u.pegarCopoDescartavel),s.flag("pegou_copo",!0)}).setVisibility(!0),new t("io-agua_potavel","Água Potável").setCssClass("intObj-aguaPotavel").onClick(function(){h.play(h.audios.sfx.pegarObjeto),s.setInteractiveObjectVisible("io-agua_potavel",!1),s.registerScoreItem(u.pegarAguaPotavel),s.flag("pegou_agua",!0)}).setVisibility(!0)]),y.registerScene(D),y.registerScene(I),y.registerScene(V),y.registerScene(M),y.registerScene(F),y.registerScene(x),y.registerScene(centroCirurgico),y.registerScene(A),y.registerScene(P),y.registerModalScene(T),y.registerModalScene(k),y.registerModalScene(L),y.registerModalScene(gaveta),y.setSetupScript(function(){l.setNameRegExp(/^Yuri de Souza Almeida$/i),l.setLeitoRegExp(/0*1/),l.setDataRegExp(/16\/03\/1993/),l.setName("Yuri de Souza Almeida"),l.setLeito("01"),l.setData("16/03/1993"),l.disable(),g.setNome("Yuri de Souza Almeida"),g.setSexo("M"),g.setEstadoCivil("Solteiro"),g.setDataNascimento("16/03/1993"),g.setIdade("22 anos"),g.setProfissao("Estudante"),g.setPai("Miguel Augusto Briganti Almeida"),g.setMae("Mariana Soares Almeida"),g.setAlergiaMedicamentosa(!0,"Dipirona, sulfa."),g.setDisableAlergiaMedicamentosa(!0),g.setDataInternacao("27/09/2015"),g.setLeito("01 - Enfermaria masculina"),g.setAntecedentes(""),g.setHipotese("Cirurgia de reconstrução do ligamento cruzado anterior (LCA), no MMII direito."),g.setObservacoes("Acidente automobilístico."),g.setPeso("73"),g.setAltura("1,80"),g.setCircunferenciaAbdominal("90"),g.setPrescMedicaRowData(0,"","Midazolam","Oral","15 mg","01x/dia antes do procedimento cirúrgico",!1,!0),g.setPrescMedicaRowData(1,"","","","","",!1,!0),g.setPrescMedicaRowData(2,"","","","","",!1,!0),g.setPrescMedicaRowData(3,"","","","","",!1,!0),g.setPrescEnfermagemState(["placa_neutra2","encaminhar_paciente_cc","check_list_cirurgia"]),g.setSsvvRowData(0,"","120x70","72","16","96","35,5",!0),g.setSsvvRowData(1,"","","","","","",!0),g.setAnotacaoEnfermagemRowData("",""),p.setEnfermeiraRegexp(/^Masculina$/i),p.setPacienteRegexp(/^Yuri de Souza Almeida$/i),p.setLeitoRegexp(/0?1/)}),y.registerFlag(new n("ja_falou_farmaceutico",!1)),y.registerFlag(new n("pegou_bandeja",!1)),y.registerFlag(new n("ja_falou_paciente",!1)),y.registerFlag(new n("ja_falou_paciente_leito",!1)),y.registerFlag(new n("levou_yuri_centro_cirurgico",!1)),y.registerFlag(new n("entrou_centro_cirurgico",!1)),y.registerFlag(new n("score_ir_posto_hora_errada",!1)),y.registerFlag(new n("score_ir_farmacia_hora_errada",!1)),y.registerFlag(new n("score_ir_ala_feminina_hora_errada",!1)),y.registerFlag(new n("score_ir_centro_cirurgico_hora_errada",!1)),y.registerFlag(new n("score_viu_prontuario",!1)),y.registerFlag(new n("score_nao_viu_prontuario",!1)),y.registerFlag(new n("score_pegou_medicamento",!1)),y.registerFlag(new n("score_nao_pegou_medicamento",!1)),y.registerFlag(new n("score_conferiu_medicacao",!1)),y.registerFlag(new n("score_nao_conferiu_medicacao",!1)),y.registerFlag(new n("score_lavar_maos_posto_enfermagem",!1)),y.registerFlag(new n("score_nao_lavar_maos_posto_enfermagem",!1)),y.registerFlag(new n("score_pegou_agua",!1)),y.registerFlag(new n("score_nao_pegou_agua",!1)),y.registerFlag(new n("score_pegou_copo",!1)),y.registerFlag(new n("score_nao_pegou_copo",!1)),y.registerFlag(new n("score_lavar_maos_antes_leito",!1)),y.registerFlag(new n("score_nao_lavar_maos_antes_leito",!1)),y.registerFlag(new n("score_verificar_pulseira",!1)),y.registerFlag(new n("score_nao_verificar_pulseira",!1)),y.registerFlag(new n("score_ofereceu_copo",!1)),y.registerFlag(new n("score_nao_ofereceu_copo",!1)),y.registerFlag(new n("score_administrou_medicamento",!1)),y.registerFlag(new n("score_nao_administrou_medicamento",!1)),y.registerFlag(new n("score_anotar_prontuario",!1)),y.registerFlag(new n("score_nao_anotar_prontuario",!1)),y.registerFlag(new n("score_lavar_maos_tecnica_cirurgica",!1)),y.registerFlag(new n("score_nao_lavar_maos_tecnica_cirurgica",!1)),y.registerFlag(new n("score_testou_equipamentos",!1)),y.registerFlag(new n("score_nao_testou_equipamentos",!1)),y.registerFlag(new n("score_fez_lista_verificacao",!1)),y.registerFlag(new n("score_nao_fez_lista_verificacao",!1)),y.registerFlag(new n("score_mudou_posicao_paciente",!1)),y.registerFlag(new n("score_nao_mudou_posicao_paciente",!1)),y.registerFlag(new n("score_colocou_placa_neutra",!1)),y.registerFlag(new n("score_nao_colocou_placa_neutra",!1)),y.registerFlag(new n("score_lavar_maos_centro_cirurgico",!1)),y.registerFlag(new n("score_nao_lavar_maos_centro_cirurgico",!1)),y.registerFlag(new n("score_anotar_prontuario_centro_cirurgico",!1)),y.registerFlag(new n("pegou_copo",!1)),y.registerFlag(new n("pegou_agua",!1)),y.registerFlag(new n("conversar_recepcionista",!1)),y.registerFlag(new n("conversar_circulante",!1)),y.registerFlag(new n("score_pulseira",!1)),y.registerFlag(new n("verificar_pulseira",!1)),y.setInitialScene(0),e.registerLevel(y,9)});