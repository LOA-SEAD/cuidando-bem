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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData","EquipoGotejamento","Ficha"],function(e,a,o,i,r,t,s,n,c,l,g,p,f,u,_){function d(){n.changeScene(6),0==n.flag("score_irCentroCirurgico_horaErrada")&&(n.flag("score_irCentroCirurgico_horaErrada",!0),n.registerScoreItem(f.irCentroCirurgico_horaErrada))}function b(){n.changeScene(7),0==n.flag("score_iralaFeminina_horaErrada")&&(n.flag("score_iralaFeminina_horaErrada",!0),n.registerScoreItem(f.irAlaFeminina_horaErrada))}function m(){n.changeScene(1)}function C(){n.openDialog(0)}function S(){n.changeScene(4)}function w(){n.changeScene(5)}function v(){1==n.flag("pegou_tudo_postoEnfermagem")&&0==n.flag("trocou_de_leito")?n.changeScene(9):(1==n.flag("trocou_de_leito")||0==n.flag("conversar_paciente")||1==n.flag("conferirMedicamento"))&&n.changeScene(2)}function O(){l.setNameRegExp(/Pedro Alcides Mendonça/),l.setLeitoRegExp(/0*1/),l.setDataRegExp(/03\/06\/1962/),l.setName("Pedro Alcides Mendonça"),l.setLeito("01"),l.setData("03/06/1962"),l.disable()}var j=require("DialogsData").fase10,h=require("DialogsData").alertas,f=require("ScoresData").fase10,D=require("Player"),V=new i("Level 10");V.setMaxPoints(f._sum);var M,I,A,F,P,x,y,E,k,T,L,G,q,R,N,x=c.scenes.centroCirurgico.getClone().onLoad(function(){n.openCommandBar()});x.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){n.changeScene(1)}).setVisibility(!0)]);var P=new a("alaFeminina","Ala Feminina").setCssClass("scene-bedroom-level7").onLoad(function(){});P.registerInteractiveObjects([new t("io-ir_corredor","Ir ao corredor").setCssClass("intObj-irAlaMasculina_corredor").onClick(function(){n.changeScene(1)})]);var M=c.scenes.recepcao.getClone().onLoad(function(){0==n.flag("conversar_recepcionista")&&(n.flag("conversar_recepcionista",!0),n.openDialog(0))});M.registerDialogs([new r(c.characters.recepcionista).setText(j.recepcao[0]).registerOption("",function(){n.closeDialog()})]),M.registerInteractiveObjects([new t("intObj-conversar_recepcionista","Conversar com a Recepcionista").setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(C),new t("io-ir_corredor_esquerda","Ir ao corredor").setCssClass("intObj-lobbyToHallway-left no-glow").onClick(m).setVisibility(!0),new t("io-ir_corredor_direita","Ir ao corredor").setCssClass("intObj-lobbyToHallway-right no-glow").onClick(m).setVisibility(!0)]),I=c.scenes.corredor.getClone().onLoad(function(){n.openCommandBar(),n.setActionVisible("btn-ir_recepcao",!0),D.stopAll(),D.play(D.audios.sfx.abrirPorta),D.playInLoop(D.audios.loops.recepcao)}).onUnload(function(){D.stopAll(),D.play(D.audios.sfx.abrirPorta),D.playInRange(D.audios.musics.inGame)}),I.registerActions([new o("btn-ir_recepcao","Voltar para a recepção").setCssClass("action-voltarRecepcao").onClick(function(){n.changeScene(0)}).setVisibility(!0)]),I.registerDialogs([]),I.registerInteractiveObjects([new t("io-ir_centro_cirurgico","Ir ao Centro Cirurgico").setCssClass("intObj-goToCentroCirurgico").onClick(d).setVisibility(!0),new t("io-ir_farmacia","Ir à Farmacia").setCssClass("intObj-goToFarmacia").onClick(S).setVisibility(!0),new t("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem").setCssClass("intObj-goToPostoEnfermagem").onClick(w).setVisibility(!0),new t("io-ir_ala_feminina","Ir à Enfermaria Feminina").setCssClass("intObj-goToAlaFeminina").onClick(b).setVisibility(!0),new t("io-ir_ala_masculina","Ir à Enfermaria Masculina").setCssClass("intObj-goToAlaMasculina").onClick(v).setVisibility(!0)]);var F=c.scenes.alaMasculina.getClone().setCssClass("scene-bedroom-level9").onLoad(function(){n.setInteractiveObjectVisible("io-ir_ao_leito",!0),n.setActionVisible("btn-lavarMaos",!0)});F.registerInteractiveObjects([new t("io-ir_ao_leito","Ir ao leito").setCssClass("intObj-irLeitoEsquerda").onClick(function(){1==n.flag("lavar_maos")?n.changeScene(3):n.openDialog(0)}).setVisibility(!1)]),F.registerActions([new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){D.play(D.audios.sfx.lavarMaos),0==n.flag("lavar_maos")&&(n.flag("lavar_maos",!0),n.registerScoreItem(f.lavarMaos))}).setVisibility(!1)]),F.registerDialogs([new r(c.characters.mentor).setText(h.lavarMaos.tipo1).registerOption("",function(){n.closeDialog()})]);var A=c.scenes.alaMasculina.getClone().setCssClass("scene-bedroom-level9-trocado").onLoad(function(){1==n.flag("trocou_de_leito")&&(n.setInteractiveObjectVisible("io-ir_ao_leito1",!0),n.setInteractiveObjectVisible("io-falarPaciente",!1),n.setActionVisible("btn-ler_prontuario",!1))});A.registerDialogs([new r(c.characters.jogador).setText("").registerOption(j.alaMasculina[0],function(){n.openDialog(1)}).registerOption(j.alaMasculina[1],function(){n.openDialog(4)}).setRandomize(!0),new r(c.characters.pacientes.francisco).setText(j.alaMasculina[2]).registerOption("",function(){n.openDialog(2)}),new r(c.characters.jogador).setText(j.alaMasculina[3]).registerOption("",function(){n.openDialog(3)}),new r(c.characters.pacientes.francisco).setText(j.alaMasculina[4]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(j.alaMasculina[5]).registerOption("",function(){n.openDialog(0)}),new r(c.characters.mentor).setText(j.alaMasculina[6]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.lavarMaos.tipo1).registerOption("",function(){n.closeDialog()})]),A.registerInteractiveObjects([new t("io-ir_corredor","Ir ao corredor").setCssClass("intObj-irAlaMasculina_corredor").onClick(function(){0==n.flag("pegar_prescricao_medica")?n.openDialog(5):n.changeScene(1)}),new t("io-ir_ao_leito1","Ir ao leito").setCssClass("intObj-irLeitoEsquerda").onClick(function(){n.changeScene(8)}).setVisibility(!1),new t("io-falarPaciente","Falar com o paciente").setCssClass("intObj-irLeitoEsquerda").onClick(function(){0==n.flag("conversar_paciente")&&(n.openDialog(0),n.flag("conversar_paciente",!0)),n.setActionVisible("btn-ler_prontuario",!0)}).setVisibility(!0)]),A.registerActions([new o("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){0==n.flag("ler_prontuario")&&(n.flag("ler_prontuario",!0),n.registerScoreItem(f.lerProntuario)),0==n.flag("pegar_prescricao_medica")&&(n.flag("pegar_prescricao_medica",!0),n.registerScoreItem(f.pegarPrescricaoMedica)),g.open("prescMedica"),n.openModalScene("Prontuario")}).setVisibility(!1)]);var T=c.scenes.farmacia.getClone().onLoad(function(){0==n.flag("pegar_prescricao_medica")?(n.openDialog(4),n.setInteractiveObjectVisible("io-pegarFrascoDieta",!1),n.setInteractiveObjectVisible("io-cloretoSodio_20_10ml",!1),0==n.flag("score_ir_farmacia_horaErrada")&&(n.flag("score_ir_farmacia_horaErrada",!0),n.registerScoreItem(f.irFarmaciaHoraErrada))):1==n.flag("pegou_tudo_postoEnfermagem")||1==n.flag("trocou_de_leito")||1==n.flag("conferirMedicamento")?(n.setInteractiveObjectVisible("io-pegarFrascoDieta",!1),n.setInteractiveObjectVisible("io-cloretoSodio_20_10ml",!1)):n.openDialog(0)});T.registerDialogs([new r(c.characters.paulo).setText(j.farmacia[0]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.jogador).setText(j.farmacia[1]).registerOption("",function(){n.openDialog(2)}),new r(c.characters.paulo).setText(j.farmacia[2]).registerOption("",function(){n.closeDialog(),n.setInteractiveObjectVisible("io-pegarFrascoDieta",!0),n.setInteractiveObjectVisible("io-cloretoSodio_20_10ml",!0)}),new r(c.characters.mentor).setText(j.farmacia[3]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.perdido.farmacia).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.verificarMedicamento3).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(j.farmacia[4]).registerOption("",function(){n.closeDialog()})]),T.registerInteractiveObjects([new t("io-pegarFrascoDieta","Pegar Frasco de SG 5%").setCssClass("intObj-soro_glicofisiologico_1000_ml").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.flag("pegarFrascoSG",!0),n.registerScoreItem(f.pegarFrascoSG),n.setInteractiveObjectVisible("io-pegarFrascoDieta",!1),n.setActionVisible("btn-conferirSoro",!0)}).setVisibility(!1),new t("io-cloretoSodio_20_10ml","Pegar NaCL 20%").setCssClass("intObj-cloreto_de_sodio_10__10_ml_").onClick(function(){D.play(D.audios.sfx.pegarObjeto),0==n.flag("pegarNACL")&&(n.flag("pegarNACL",!0),n.registerScoreItem(f.pegarNACL),n.setInteractiveObjectVisible("io-cloretoSodio_20_10ml",!1),n.setActionVisible("btn-conferirCloreto",!0))}).setVisibility(!1)]),T.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){0==n.flag("pegar_prescricao_medica")?n.changeScene(1):(0==n.flag("pegarNACL")||0==n.flag("pegarFrascoSG"))&&n.openDialog(6),1==n.flag("pegarNACL")&&1==n.flag("pegarFrascoSG")&&(1==n.flag("conferirNACL")||1==n.flag("conferirFrascoSG")?(n.registerScoreItem(f.conferirDieta),n.flag("conferirMedicamento",!0),n.changeScene(1)):(n.flag("conferirMedicamento",!0),n.changeScene(1)))}).setVisibility(!0),new o("btn-conferirSoro","Conferir Soro Glicofisiológico").setCssClass("action-soro_glicofisiologico_1000ml").onClick(function(){n.openModalScene("conferirSoroGlicofisiologico1000"),n.openModalScene("conferirSoroGlicofisiologico1000")}).setVisibility(!1),new o("btn-conferirCloreto","Conferir Cloreto de Sodio").setCssClass("action-cloreto_sodio_20_10ml").onClick(function(){n.openModalScene("conferirCloretoSodio")}).setVisibility(!1)]);var k=c.scenes.postoDeEnfermagem.getClone().onLoad(function(){n.setInteractiveObjectVisible("io-pegar_bandeja",!1),n.setInteractiveObjectVisible("io-abrir_gaveta",!1),1==n.flag("conferirMedicamento")?(n.setInteractiveObjectVisible("io-pegar_bandeja",!0),n.setInteractiveObjectVisible("io-abrir_gaveta",!0),(1==n.flag("pegou_tudo_postoEnfermagem")||1==n.flag("pegar_bandeja"))&&(n.setInteractiveObjectVisible("io-pegar_bandeja",!1),n.setInteractiveObjectVisible("io-abrir_gaveta",!0))):(n.openDialog(2),0==n.flag("score_irPosto_horaErrada")&&(n.flag("score_irPosto_horaErrada",!0),n.registerScoreItem(f.irPosto_horaErrada)))});k.registerDialogs([new r(c.characters.mentor).setText(h.esqueceu.pegarBandeja).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(j.postoDeEnfermagem[0]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.pegarMedicamento).registerOption("",function(){n.closeDialog()})]),k.registerInteractiveObjects([new t("io-abrir_gaveta","Abrir gaveta").setCssClass("intObj-openDrawer").onClick(function(){D.play(D.audios.sfx.abrirGaveta),0==n.flag("pegar_bandeja")?n.openDialog(0):(n.openModalScene("gaveta"),n.openCommandBar())}).setVisibility(!0),new t("io-pegar_bandeja","Pegar Bandeja").setCssClass("intObj-bandeja").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.flag("pegar_bandeja",!0),n.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),k.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){n.changeScene(1)}).setVisibility(!0),new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){D.play(D.audios.sfx.lavarMaos),0==n.flag("score_lavarMaos1")&&(n.flag("score_lavarMaos1",!0),n.registerScoreItem(f.lavarMaos1))}).setVisibility(!0)]),y=c.scenes.leitos.raul_leito01.getClone().onLoad(function(){}).onUnload(function(){}),y.registerActions([new o("btn-ir_ala_masculina","Voltar a Ala Masculina").setCssClass("action-ir_sala_de_leitos").onClick(function(){1==n.flag("trocou_de_leito")?n.changeScene(2):n.openDialog(7)}).setVisibility(!1)]),y.registerInteractiveObjects([new t("io-falar_paciente","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){0==n.flag("trocou_de_leito")&&(n.openDialog(0),n.flag("trocou_de_leito",!0),n.setActionVisible("btn-ir_ala_masculina",!0),n.enableInteractiveObject("io-pulseira_paciente",!0))}).setVisibility(!0),new t("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_03-checar_pulseira").onClick(function(){n.openModalScene("Pulseira"),l.open(),n.openCommandBar()}).setVisibility(!0).setEnable(!1)]),y.registerDialogs([new r(c.characters.jogador).setText(j.leitoPaciente[0]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.pacientes.francisco).setText(j.leitoPaciente[1]).registerOption("",function(){n.openDialog(2)}),new r(c.characters.jogador).setText(j.leitoPaciente[2]).registerOption("",function(){n.openDialog(3)}),new r(c.characters.pacientes.francisco).setText(j.leitoPaciente[3]).registerOption("",function(){n.openDialog(4)}),new r(c.characters.jogador).setText("").registerOption(j.leitoPaciente[4],function(){n.closeDialog()}).registerOption(j.leitoPaciente[5],function(){n.openDialog(5)}).setRandomize(!0),new r(c.characters.mentor).setText(j.leitoPaciente[6]).registerOption("",function(){n.openDialog(4)}),new r(c.characters.mentor).setText(j.leitoPaciente[7]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.falarPaciente).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.erroGotejamento).registerOption("",function(){n.closeDialog()})]),E=c.scenes.leitos.francisco.getClone().onLoad(function(){}).onUnload(function(){}),E.registerDialogs([new r(c.characters.jogador).setText(j.leitoPaciente1[0]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.pacientes.francisco).setText(j.leitoPaciente1[1]).registerOption("",function(){n.openDialog(2)}),new r(c.characters.jogador).setText(j.leitoPaciente1[2]).registerOption("",function(){n.openDialog(3)}),new r(c.characters.pacientes.francisco).setText(j.leitoPaciente1[3]).registerOption("",function(){n.openDialog(4)}),new r(c.characters.jogador).setText(j.leitoPaciente1[4]).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.lavarMaos.tipo3).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.erroGotejamento).registerOption("",function(){n.closeDialog()}),new r(c.characters.mentor).setText(h.esqueceu.verPulseira).registerOption("",function(){n.closeDialog()})]),E.registerInteractiveObjects([new t("io-falar_paciente","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){n.enableInteractiveObject("io-pulseira_paciente",!0),n.openDialog(0),0==n.flag("falar_paciente_correto")&&(n.flag("falar_paciente_correto",!0),n.registerScoreItem(f.conversarPacienteLeito)),n.setActionVisible("btn-pegar_suporte_soro",!0),n.setActionVisible("btn-administrar_medicamente",!0)}).setVisibility(!0),new t("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_05-checar_pulseira").onClick(function(){O(),n.flag("verificar_pulseira",!0),0==n.flag("score_verPulseira")&&(n.flag("score_verPulseira",!0),n.registerScoreItem(f.verPulseira)),n.openModalScene("Pulseira"),l.open(),n.openCommandBar()}).setVisibility(!0).setEnable(!1)]),E.registerActions([new o("btn-pegar_suporte_soro","Pegar Suporte de Soro").setCssClass("action-pegarSuporte").onClick(function(){1==n.flag("verificar_pulseira")?0==n.flag("pegar_suporte_soro")&&(n.flag("pegar_suporte_soro",!0),n.registerScoreItem(f.pegarSuporteSoro),n.changeSceneCssClassTo("scene-bedChar10B"),n.setActionVisible("btn-pegar_suporte_soro",!1),n.setActionVisible("btn-colocarSoro",!0)):(0==n.flag("score_pulseira")&&(n.flag("score_pulseira",!0),n.registerScoreItem(f.naoVerificarPulseira)),n.openDialog(7))}).setVisibility(!1),new o("btn-colocarSoro","Colocar Soro").setCssClass("action-soro_fisiologico_1000ml").onClick(function(){n.changeSceneCssClassTo("scene-bedChar10C"),n.setActionVisible("btn-colocarSoro",!1),n.setActionVisible("btn-realizar_gotejamento",!0)}).setVisibility(!1),new o("btn-administrar_medicamente","Administrar Medicamento").setCssClass("action-admnistrar_medicacao").onClick(function(){1==n.flag("verificar_pulseira")?0==n.flag("administrar_medicamento")&&(n.flag("administrar_medicamento",!0),n.registerScoreItem(f.administrarMedicamento)):(0==n.flag("score_pulseira")&&(n.flag("score_pulseira",!0),n.registerScoreItem(f.naoVerificarPulseira)),n.openDialog(7))}).setVisibility(!1),new o("btn-realizar_gotejamento","Realizar Gotejamento de Soro").setCssClass("action-colocarSoro").onClick(function(){0==n.flag("realizar_gotejamento")&&(n.flag("realizar_gotejamento",!0),n.registerScoreItem(f.realizarGotejamento)),u.open(),n.openModalScene("equipoSoro")}).setVisibility(!1),new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){1==n.flag("verificar_pulseira")?(D.play(D.audios.sfx.lavarMaos),0==n.flag("lavar_maos3")&&(n.flag("lavar_maos3",!0),n.registerScoreItem(f.lavarMaos3))):(0==n.flag("score_pulseira")&&(n.flag("score_pulseira",!0),n.registerScoreItem(f.naoVerificarPulseira)),n.openDialog(7))}).setVisibility(!1),new o("btn-anotar_prontuario","Anotar prontuario").setCssClass("action-anotar_prontuario").onClick(function(){1==n.flag("verificar_pulseira")?0==n.flag("lavar_maos3")?n.openDialog(5):(g.open(),n.openModalScene("Prontuario"),0==n.flag("score_anotar_prontuario")&&(n.registerScoreItem(f.anotarNoProntuario),n.flag("score_anotar_prontuario",!0))):(0==n.flag("score_pulseira")&&(n.flag("score_pulseira",!0),n.registerScoreItem(f.naoVerificarPulseira)),n.openDialog(7))}).setVisibility(!1)]),G=new a("Pulseira","Pulseira"),G.registerInteractiveObjects([]),G.registerActions([new o("btn-largar_pulseira","Fechar pulseira").setCssClass("action-pulseira_paciente").onClick(function(){n.closeModalScene("Pulseira"),l.close()}).setVisibility(!0)]),q=new a("Prontuario","Prontuario"),q.registerActions([new o("btn-fechar_prontuario","Fechar prontuário").setCssClass("action-ler_prontuario").onClick(function(){1==n.flag("score_anotar_prontuario")?(g.close(),n.closeModalScene("Prontuario"),n.setActionVisible("btn-pegar_suporte_soro",!1),n.setActionVisible("btn-administrar_medicamente",!1),n.setActionVisible("btn-realizar_gotejamento",!1),n.setActionVisible("btn-lavarMaos",!1),n.setActionVisible("btn-anotar_prontuario",!1),n.closeCommandBar(),n.showEndOfLevel(),D.stopAll(),D.play(D.audios.sfx.missaoCumprida)):g.close(),n.closeModalScene("Prontuario")}).setVisibility(!0)]),equipoSoro=new a("equipoSoro","EquipamentoSoro");var z=0;equipoSoro.registerActions([new o("btn-fecharEquipoSoro","Fechar Equipamento de Soro").setCssClass("action-colocarSoro").onClick(function(){u.isValueRight()?(0==n.flag("score_gotejar_soro")&&(n.registerScoreItem(f.gotejarSoroEquipo),n.flag("score_gotejar_soro",!0)),u.close(),n.closeModalScene("equipoSoro"),n.setActionVisible("btn-lavarMaos",!0),n.setActionVisible("btn-anotar_prontuario",!0),n.setActionVisible("btn-realizar_gotejamento",!1)):(n.closeCommandBar(),n.openDialog(6),z+=1,3==z&&(n.registerScoreItem(f.naoGotejarSoroEquipo),z=-100))}).setVisibility(!0)]),L=new a("gaveta","Gaveta").setCssClass("modalScene-drawer"),L.registerActions([new o("btn-fechar_gaveta","Fechar gaveta").setCssClass("action-fecharGaveta").onClick(function(){D.play(D.audios.sfx.fecharGaveta),n.closeModalScene("Gaveta"),1==n.flag("pegar_seringa")&&1==n.flag("pegar_agulha")&&1==n.flag("pegar_ampola")&&1==n.flag("pegar_equipoSoro")&&(n.setActionVisible("btn-lavarMaos",!1),n.flag("pegou_tudo_postoEnfermagem",!0))}).setVisibility(!0)]),L.registerInteractiveObjects([new t("io-seringa","Seringa").setCssClass("intObj-seringa_de_10_ml").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.registerScoreItem(f.pegarSeringa),n.flag("pegar_seringa",!0),n.setInteractiveObjectVisible("io-seringa",!1)}).setVisibility(!0),new t("io-agulha","Agulha 40X12").setCssClass("intObj-agulha_40x12").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.registerScoreItem(f.pegarAgulha),n.flag("pegar_agulha",!0),n.setInteractiveObjectVisible("io-agulha",!1)}).setVisibility(!0),new t("io-ampola","Ampola de Glicose 50%").setCssClass("intObj-ampola_glicose_50").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.registerScoreItem(f.pegarGlicose),n.flag("pegar_ampola",!0),n.setInteractiveObjectVisible("io-ampola",!1)}).setVisibility(!0),new t("io-equipoSoro","Equipamento de Soro Macrogotas").setCssClass("intObj-equipo_de_soro").onClick(function(){D.play(D.audios.sfx.pegarObjeto),n.registerScoreItem(f.pegarSoro),n.flag("pegar_equipoSoro",!0),n.setInteractiveObjectVisible("io-equipoSoro",!1)}).setVisibility(!0)]),R=new a("conferirSoroGlicofisiologico1000","Conferir Soro Glicofisiologico").setCssClass("modalScene-soroGlicofisiologico1000"),R.registerActions([new o("btn-fechar_zoom","Finalizar conferição").setCssClass("action-soro_glicofisiologico_1000ml").onClick(function(){n.flag("conferirFrascoSG",!0),n.closeModalScene("conferirSoroGlicofisiologico1000")})]),N=new a("conferirCloretoSodio","Conferir Cloreto de Sodio").setCssClass("modalScene-cloretoSodio20"),N.registerActions([new o("btn-fechar_zoom","Finalizar conferição").setCssClass("action-cloreto_sodio_20_10ml").onClick(function(){n.flag("conferirNACL",!0),n.closeModalScene("conferirCloretoSodio")})]),V.registerModalScene(q),V.registerModalScene(L),V.registerModalScene(G),V.registerModalScene(equipoSoro),V.registerModalScene(R),V.registerModalScene(N),V.registerScene(M),V.registerScene(I),V.registerScene(A),V.registerScene(y),V.registerScene(T),V.registerScene(k),V.registerScene(x),V.registerScene(P),V.registerScene(E),V.registerScene(F),V.setSetupScript(function(){g.setNome("Pedro Alcides Mendonça"),g.setSexo("M"),g.setEstadoCivil("Solteiro"),g.setDataNascimento("03/06/1962"),g.setIdade("52 anos"),g.setProfissao("Professor"),g.setPai("Aldair Mendonça"),g.setMae("Ana Laura Alcídes Mendonça"),g.setAlergiaMedicamentosa(!1,""),g.setDisableAlergiaMedicamentosa(!0),g.setDataInternacao("27/12/2015"),g.setLeito("01 - Enfermaria Masculina"),g.setAntecedentes("Ocorrência de internação por Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório no mês de outubro"),g.setHipotese("Desidratação de grau moderado"),g.setObservacoes("Grande perda de eletrólitos"),g.setPeso("62"),g.setAltura("1,77"),g.setCircunferenciaAbdominal("91"),g.setPrescMedicaRowData(0,"","Soro Glicosado 5%","Endovenosa","800ml","",!1,!1),g.setPrescMedicaRowData(1,"","NaCL 20%","Endovenosa","20ml","",!1,!1),g.setPrescMedicaRowData(2,"","Glicose 50%","Endovenosa","30ml","",!1,!1),g.setPrescMedicaRowData(3,"","","","","",!1,!0),g.setPrescEnfermagemState(["desiquilibrio_eletrolitico_fase9"]),g.setSsvvRowData(0,"","130X70","82","19","96","35.9",!0),g.setSsvvRowData(1,"","","","","","",!0),l.setNameRegExp(/Raul Gonzales Rodrigues/),l.setLeitoRegExp(/0*3/),l.setDataRegExp(/24\/07\/1937/),l.setName("Raul Gonzales Rodrigues"),l.setLeito("03"),l.setData("24/07/1937"),l.disable(),u.setRightValue(12),_.setEnfermeiraRegexp(/Masculina/i),_.setPacienteRegexp(/Pedro Alc(í|i)des Mendon(ç|c)a/i),_.setLeitoRegexp(/0?1/),_.setVolumeRegexp(/850/),_.setDuracao(24),_.setGotasRegexp(/11,80/),_.setGotasAproxRegexp(/12/)}),V.registerFlag(new s("score_iralaFeminina_horaErrada",!1)),V.registerFlag(new s("score_irCentroCirurgico_horaErrada",!1)),V.registerFlag(new s("conversar_paciente",!1)),V.registerFlag(new s("score_ir_farmacia_horaErrada",!1)),V.registerFlag(new s("score_irPosto_horaErrada",!1)),V.registerFlag(new s("pegar_prescricao_medica",!1)),V.registerFlag(new s("ler_prontuario",!1)),V.registerFlag(new s("pegarFrascoSG",!1)),V.registerFlag(new s("pegarNACL",!1)),V.registerFlag(new s("conferirMedicamento",!1)),V.registerFlag(new s("pegar_bandeja",!1)),V.registerFlag(new s("pegar_seringa",!1)),V.registerFlag(new s("pegar_agulha",!1)),V.registerFlag(new s("pegar_ampola",!1)),V.registerFlag(new s("pegar_equipoSoro",!1)),V.registerFlag(new s("pegou_tudo_postoEnfermagem",!1)),V.registerFlag(new s("lavar_maos",!1)),V.registerFlag(new s("trocou_de_leito",!1)),V.registerFlag(new s("falar_paciente_correto",!1)),V.registerFlag(new s("lavar_maos2",!1)),V.registerFlag(new s("realizar_gotejamento",!1)),V.registerFlag(new s("pegar_suporte_soro",!1)),V.registerFlag(new s("administrar_medicamento",!1)),V.registerFlag(new s("lavar_maos3",!1)),V.registerFlag(new s("score_anotar_prontuario",!1)),V.registerFlag(new s("irCentroCirurgicoHoraErrada",!1)),V.registerFlag(new s("score_lavarMaos1",!1)),V.registerFlag(new s("conferirFrascoSG",!1)),V.registerFlag(new s("conferirNACL",!1)),V.registerFlag(new s("score_verPulseira",!1)),V.registerFlag(new s("score_gotejar_soro",!1)),V.registerFlag(new s("conversar_recepcionista",!1)),V.registerFlag(new s("verificar_pulseira",!1)),V.registerFlag(new s("score_pulseira",!1)),V.setInitialScene(0),e.registerLevel(V,10)});