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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData"],function(e,a,o,i,t,r,s,l,n,c,g,_,u){function p(){1==l.flag("conversar_recepcionista")&&l.changeScene(1)}function d(){l.openDialog(0)}function f(){0==l.flag("pegou_tudo_gaveta")?l.openDialog(5):l.changeScene(2)}function b(){0==l.flag("checar_prontuario")?(l.openDialog(2),0==l.flag("score_ir_posto_hora_errada")&&l.flag("score_ir_posto_hora_errada",!0)):l.changeScene(4)}function m(){l.openDialog(3),0==l.flag("score_ir_ala_feminina_hora_errada")&&l.flag("score_ir_ala_feminina_hora_errada",!0)}function C(){l.openDialog(4),0==l.flag("score_ir_farmacia_hora_errada")&&l.flag("score_ir_farmacia_hora_errada",!0)}var v=require("DialogsData").fase3,w=require("DialogsData").alertas,u=require("ScoresData").fase3,V=require("Player"),h=new i("Level 3");h.setMaxPoints(u._sum);var x,A,j,D,O,F,I,S,M;x=n.scenes.recepcao.getClone().onLoad(function(){0==l.flag("conversar_recepcionista")&&(l.flag("conversar_recepcionista",!0),l.openDialog(0))}),x.registerDialogs([new t(n.characters.recepcionista).setText(v.recepcao[0]).registerOption("",function(){l.flag("conversar_recepcionista",!0),l.closeDialog(),l.setInteractiveObjectVisible("io-ir_corredor_esquerda",!0),l.setInteractiveObjectVisible("io-ir_corredor_direita",!0)})]),x.registerInteractiveObjects([new r("intObj-conversar_recepcionista","Conversar com a Recepcionista").setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(d),new r("io-ir_corredor_direita","Ir ao corredor").setCssClass("intObj-porta").onClick(p).setVisibility(!0)]),A=n.scenes.corredor.getClone().onLoad(function(){l.openCommandBar(),l.setActionVisible("btn-ir_recepcao",!0),V.play(V.audios.sfx.abrirPorta),V.playInLoop(V.audios.sfx.recepcao),1==l.flag("score_anotar_prontuario")&&l.setInteractiveObjectVisible("io-conversar_mentor",!0)}).onUnload(function(){V.stopLoop(),V.play(V.audios.sfx.abrirPorta)}),A.registerActions([new o("btn-ir_recepcao","Voltar para a recepção").setCssClass("action-voltarRecepcao").onClick(function(){l.changeScene(0)}).setVisibility(!0)]),A.registerDialogs([new t(n.characters.jogador).setText(v.corredor[0]).registerOption("",function(){l.openDialog(1)}),new t(n.characters.mentor).setText(v.corredor[1]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.perdido.farmacia).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.perdido.alaFeminina).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.perdido.enfermagem[1]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.objetoQualquer).registerOption("",function(){l.closeDialog()})]),A.registerInteractiveObjects([new r("io-ir_sala_leitos","Ir à Enfermaria Masculina").setCssClass("intObj-goToAlaMasculina").onClick(f).setVisibility(!0),new r("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem").setCssClass("intObj-goToNursingStation").onClick(b).setVisibility(!0),new r("io-ir_ala_feminina","Ir à Enfermaria Feminina").setCssClass("intObj-goToAlaFeminina").onClick(m).setVisibility(!0),new r("io-ir_farmacia","Ir à Farmácia").setCssClass("intObj-goToPharmacy").onClick(C).setVisibility(!0),new r("io-conversar_mentor","Conversar com Mentor").setCssClass("intObj-talkToMentor").onClick(function(){l.openDialog(0)}).setVisibility(!1)]),j=new a("salaDeLeitos","scene-salaDeLeitos").setCssClass("scene-bedroom-level3").onLoad(function(){1==l.flag("segunda_ida_leito_paciente")&&(l.setInteractiveObjectVisible("io-ir_leito",!0),l.setInteractiveObjectVisible("io-falarPaciente",!1),0==l.flag("tem_fala")&&l.openCommandBar()),1==l.flag("score_explicou_resultado")&&(l.setActionVisible("btn-jogar_algodao_lixo",!0),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!0),l.setActionVisible("btn-elevar_grade_cama",!0),l.setActionVisible("btn-ler_prontuario",!1),l.setActionVisible("btn-anotarProntuario",!1),l.openCommandBar()),1==l.flag("descartar_algodao")&&l.setActionVisible("btn-jogar_algodao_lixo",!1),1==l.flag("descartar_agulha")&&l.setActionVisible("btn-jogar_agulha_perfuro",!1)}).onUnload(function(){l.flag("segunda_ida_leito_paciente",!0)}),j.registerInteractiveObjects([new r("io-falarPaciente","Falar com o paciente").setCssClass("intObj-ir_leito-fase2").onClick(function(){l.openDialog(0)}).setVisibility(!0),new r("io-ir_leito","Ir ao leito").setCssClass("intObj-ir_leito-fase2").onClick(function(){0==l.flag("lavar_maos2")?l.openDialog(3):l.changeScene(3)}).setVisibility(!1),new r("io-ir_corredor","Ir ao Corredor").setCssClass("intObj-bedroomToHallway").onClick(function(){1==l.flag("checar_prontuario")?l.changeScene(1):l.openDialog(8)}).setVisibility(!0)]),j.registerActions([new o("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){V.play(V.audios.sfx.lavarMaos),0==l.flag("segunda_ida_leito_paciente")?(0==l.flag("lavarMaos")&&l.flag("lavarMaos",!0),0==l.flag("score_lavar_maos_antes_do_prontuario")&&(l.registerScoreItem(u.lavaMaosAntes),l.flag("score_lavar_maos_antes_do_prontuario",!0))):0==l.flag("score_explicou_resultado")?(0==l.flag("lavar_maos2")&&l.flag("lavar_maos2",!0),0==l.flag("score_lavar_maos_antes_de_ir_no_leito")&&(l.registerScoreItem(u.lavarMaosAntesLeito),l.flag("score_lavar_maos_antes_de_ir_no_leito",!0))):1==l.flag("score_elevou_grade_cama")?(0==l.flag("lavar_maos_apos_lixo")&&l.flag("lavar_maos_apos_lixo",!0),0==l.flag("score_lavou_maos_apos_lixo")&&(l.registerScoreItem(u.lavarMaosAposLixos),l.flag("score_lavou_maos_apos_lixo",!0))):(l.closeCommandBar(),l.openDialog(5))}).setVisibility(!1),new o("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){0==l.flag("lavarMaos")?(l.closeCommandBar(),l.openDialog(6)):(0==l.flag("score_checar_prontuario")&&(l.registerScoreItem(u.checarProntuario),l.flag("score_checar_prontuario",!0)),g.open(),l.openModalScene("Prontuario"))}).setVisibility(!1),new o("btn-jogar_agulha_perfuro","Descartar Agulhas").setCssClass("action-agulhas").onClick(function(){l.flag("descartar_agulha",!0),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!1),l.setActionVisible("btn-elevar_grade_cama",!1),l.setActionVisible("btn-ler_prontuario",!1),l.setActionVisible("btn-anotarProntuario",!1),l.setActionVisible("btn-lixoComum",!0),l.setActionVisible("btn-lixoInfectante",!0),l.setActionVisible("btn-perfuroCortante",!0)}).setVisibility(!1),new o("btn-jogar_algodao_lixo","Descartar Algodão").setCssClass("action-algodao_seco").onClick(function(){l.flag("descartar_algodao",!0),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!1),l.setActionVisible("btn-elevar_grade_cama",!1),l.setActionVisible("btn-ler_prontuario",!1),l.setActionVisible("btn-anotarProntuario",!1),l.setActionVisible("btn-lixoComum",!0),l.setActionVisible("btn-lixoInfectante",!0),l.setActionVisible("btn-perfuroCortante",!0)}).setVisibility(!1),new o("btn-elevar_grade_cama","Elevar grade da cama").setCssClass("action-elevarGrade").onClick(function(){1==l.flag("descartar_agulha")?0==l.flag("score_elevou_grade_cama")&&(l.flag("score_elevou_grade_cama",!0),l.registerScoreItem(u.elevarGradeDaCama),l.changeSceneCssClassTo("scene-bedroom-level3b"),l.setActionVisible("btn-elevar_grade_cama",!1),l.setActionVisible("btn-anotarProntuario",!0),l.setActionVisible("btn-lavarMaos",!0)):(l.closeCommandBar(),l.openDialog(4))}).setVisibility(!1),new o("btn-anotarProntuario","Anotar prontuario").setCssClass("action-anotar_prontuario").onClick(function(){0==l.flag("lavar_maos_apos_lixo")?(l.closeCommandBar(),l.openDialog(6)):(g.open(),l.openModalScene("Prontuario"))}).setVisibility(!1),new o("btn-lixoComum","Lixo Comum").setCssClass("action-lixo_comum").onClick(function(){l.setActionVisible("btn-lixoComum",!1),l.setActionVisible("btn-lixoInfectante",!1),l.setActionVisible("btn-perfuroCortante",!1),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-elevar_grade_cama",!0),l.setActionVisible("btn-anotarProntuario",!1),l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!1)),l.flag("descartar_algodao")&&!l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!0)),!l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!0),l.setActionVisible("btn-jogar_agulha_perfuro",!1))}).setVisibility(!1),new o("btn-lixoInfectante","Lixo Infectante").setCssClass("action-lixo_infectante").onClick(function(){l.setActionVisible("btn-lixoComum",!1),l.setActionVisible("btn-lixoInfectante",!1),l.setActionVisible("btn-perfuroCortante",!1),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-elevar_grade_cama",!0),l.setActionVisible("btn-anotarProntuario",!1),l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!1),l.flag("score_algodao")||(l.flag("score_algodao",!0),l.registerScoreItem(u.algodaoLixoCerto))),l.flag("descartar_algodao")&&!l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!0),l.flag("score_algodao")||(l.flag("score_algodao",!0),l.registerScoreItem(u.algodaoLixoCerto))),!l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!0),l.setActionVisible("btn-jogar_agulha_perfuro",!1))}).setVisibility(!1),new o("btn-perfuroCortante","Perfuro Cortante").setCssClass("action-lixo_perfuro_cortante").onClick(function(){l.setActionVisible("btn-lixoComum",!1),l.setActionVisible("btn-lixoInfectante",!1),l.setActionVisible("btn-perfuroCortante",!1),l.setActionVisible("btn-lavarMaos",!1),l.setActionVisible("btn-elevar_grade_cama",!0),l.setActionVisible("btn-anotarProntuario",!1),l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!1),l.flag("score_agulha")||(l.flag("score_agulha",!0),l.registerScoreItem(u.agulhaLixoCerto))),l.flag("descartar_algodao")&&!l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!1),l.setActionVisible("btn-jogar_agulha_perfuro",!0)),!l.flag("descartar_algodao")&&l.flag("descartar_agulha")&&(l.setActionVisible("btn-jogar_algodao_lixo",!0),l.setActionVisible("btn-jogar_agulha_perfuro",!1),l.flag("score_agulha")||(l.flag("score_agulha",!0),l.registerScoreItem(u.agulhaLixoCerto)))}).setVisibility(!1)]),j.registerDialogs([new t(n.characters.jogador).setText(v.alaMasculina[0]).registerOption("",function(){l.openDialog(1)}),new t(n.characters.pacientes.raulUnknow).setText(v.alaMasculina[1]).registerOption("",function(){l.setInteractiveObjectVisible("io-ir_leito",!1),l.setActionVisible("btn-ler_prontuario",!0),l.setActionVisible("btn-lavarMaos",!0),l.closeDialog(),l.openCommandBar()}),new t(n.characters.jogador).setText(v.alaMasculina[2]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.lavarMaos.tipo3).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.descarte.objetos).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.elevarGrade[0]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.lavarMaos.tipo3).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(v.alaMasculina[3]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(v.alaMasculina[4]).registerOption("",function(){l.closeDialog()})]),D=n.scenes.leitos.raul.getClone().onLoad(function(){l.openCommandBar(),l.setInteractiveObjectVisible("io-pulseira_paciente",!0)}).onUnload(function(){l.closeCommandBar()}),D.registerInteractiveObjects([new r("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_03-checar_pulseira").onClick(function(){l.flag("score_falar_paciente")?(l.flag("verificar_pulseira",!0),l.openModalScene("pulseira"),c.open(),l.openCommandBar()):(l.closeCommandBar(),l.openDialog(15))}).setVisibility(!0).setEnable(!1),new r("io-conversar_paciente03","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){l.flag("conversar_paciente2")?l.flag("score_utilizou_algodao2")?(l.flag("score_explicou_resultado")||(l.flag("score_explicou_resultado",!0),l.registerScoreItem(u.explicarResultado)),l.openDialog(6),l.flag("tem_fala",!1)):(l.flag("score_nao_utilizou_algodao2")||l.flag("score_nao_utilizou_algodao2",!0),l.closeCommandBar(),l.openDialog(12)):(l.flag("score_falar_paciente")||(l.registerScoreItem(u.falarComPaciente),l.flag("score_falar_paciente",!0)),l.closeCommandBar(),l.openDialog(0),l.enableInteractiveObject("io-pulseira_paciente",!0))}).setVisibility(!0)]),D.registerDialogs([new t(n.characters.jogador).setText(v.leitoPaciente[0]).registerOption("",function(){l.openDialog(1)}),new t(n.characters.pacientes.raulUnknow).setText(v.leitoPaciente[1]).registerOption("",function(){l.openDialog(2)}),new t(n.characters.jogador).setText(v.leitoPaciente[2]).registerOption("",function(){l.openDialog(3)}),new t(n.characters.pacientes.raul).setText(v.leitoPaciente[3]).registerOption("",function(){l.openDialog(4)}),new t(n.characters.jogador).setText(v.leitoPaciente[4]).registerOption("",function(){l.openDialog(5)}),new t(n.characters.pacientes.raul).setText(v.leitoPaciente[5]).registerOption("",function(){l.closeDialog(),l.setActionVisible("btn-por_luvas",!0),l.setActionVisible("btn-utilizar_algodao",!0),l.setActionVisible("btn-realizar_teste_glicemia",!0),l.setActionVisible("btn-ir_sala_leitos",!0),l.openCommandBar()}),new t(n.characters.pacientes.raul).setText(v.leitoPaciente[6]).registerOption("",function(){l.openDialog(7)}),new t(n.characters.jogador).setText("").registerOption(v.leitoPaciente[7],function(){l.openDialog(8)}).registerOption(v.leitoPaciente[9],function(){l.closeDialog()}).registerOption(v.leitoPaciente[10],function(){l.openDialog(9)}).setRandomize(!0),new t(n.characters.mentor).setText(v.leitoPaciente[8]).registerOption("",function(){l.openDialog(7)}),new t(n.characters.mentor).setText(v.leitoPaciente[11]).registerOption("",function(){l.openDialog(7)}),new t(n.characters.mentor).setText(w.esqueceu.verPulseira).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.luvas).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.algodão).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.teste[0]).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.paciente).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.falarPaciente).registerOption("",function(){l.closeDialog()})]),D.registerActions([new o("btn-por_luvas","Colocar Luvas").setCssClass("action-luvas_de_procedimento").onClick(function(){V.play(V.audios.sfx.colocarLuvas),l.flag("verificar_pulseira")?l.flag("score_vestiu_luvas")||(l.flag("score_vestiu_luvas",!0),l.registerScoreItem(u.porLuvas),l.setActionVisible("btn-por_luvas",!1)):(l.flag("score_pulseira")||l.flag("score_pulseira",!0),l.openDialog(10))}).setVisibility(!1),new o("btn-utilizar_algodao","Utilizar Algodão").setCssClass("action-algodao_seco").onClick(function(){l.flag("verificar_pulseira")?l.flag("utilizar_algodao2")?l.flag("score_realizou_teste_glicemia")?l.flag("score_utilizou_algodao2")||(l.flag("score_utilizou_algodao2",!0),l.registerScoreItem(u.usarAlgodao2)):(l.flag("score_nao_realizou_teste_glicemia")||l.flag("score_nao_realizou_teste_glicemia",!0),l.closeCommandBar(),l.openDialog(13)):l.flag("score_vestiu_luvas")?(l.flag("score_utilizou_algodao1")||(l.flag("score_utilizou_algodao1",!0),l.registerScoreItem(u.usarAlgodao)),l.flag("utilizar_algodao2",!0)):(l.flag("score_nao_vestiu_luvas")||l.flag("score_nao_vestiu_luvas",!0),l.closeCommandBar(),l.openDialog(11)):(l.flag("score_pulseira")||l.flag("score_pulseira",!0),l.openDialog(10))}).setVisibility(!1),new o("btn-verificar_teste_glicemia","Verificar resultado").setCssClass("action-realizar_teste_glicemia").onClick(function(){V.play(V.audios.sfx.bip),l.openModalScene("modalGlicosimetro")}).setVisibility(!1),new o("btn-realizar_teste_glicemia","Realizar teste de glicemia capilar").setCssClass("action-realizar_teste_glicemia").onClick(function(){l.flag("verificar_pulseira")?(V.play(V.audios.sfx.bip),l.flag("score_utilizou_algodao1")?(l.flag("conversar_paciente2",!0),l.flag("score_realizou_teste_glicemia")||(l.flag("score_realizou_teste_glicemia",!0),l.registerScoreItem(u.realizarTesteGlicemia)),l.openModalScene("modalGlicosimetroComFita")):(l.flag("score_nao_utilizou_algodao1")||l.flag("score_nao_utilizou_algodao1",!0),l.openDialog(12))):(l.flag("score_pulseira")||l.flag("score_pulseira",!0),l.openDialog(10))}).setVisibility(!1),new o("btn-ir_sala_leitos","Ir para sala de leitos").setCssClass("action-ir_sala_de_leitos").onClick(function(){l.flag("score_explicou_resultado")?l.changeScene(2):(l.flag("tem_fala",!0),l.flag("score_nao_explicou_resultado")||l.flag("score_nao_explicou_resultado",!0),l.closeCommandBar(),l.openDialog(14))}).setVisibility(!0)]),O=n.scenes.postoDeEnfermagem.getClone().onLoad(function(){l.openCommandBar()}).onUnload(function(){l.closeCommandBar()}),O.registerActions([new o("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){l.flag("score_pegou_kit_glicemia")&&l.flag("score_pegou_algodao")&&l.flag("score_pegou_luvas")&&l.flag("pegou_agulhas")?(l.flag("pegou_tudo_gaveta",!0),l.changeScene(1)):(l.flag("pegou_tudo_gaveta",!1),l.openDialog(1))}).setVisibility(!0)]),O.registerInteractiveObjects([new r("io-abrirGaveta","Abrir gaveta").setCssClass("intObj-openDrawer").onClick(function(){l.flag("pegou_bandeja")?(V.play(V.audios.sfx.abrirGaveta),l.openModalScene("gaveta"),l.openCommandBar(),l.setInteractiveObjectVisible("io-kit_glicemia",!l.flag("score_pegou_kit_glicemia")),l.setInteractiveObjectVisible("io-algodao",!l.flag("score_pegou_algodao")),l.setInteractiveObjectVisible("io-luvas",!l.flag("score_pegou_luvas"))):l.openDialog(0)}).setVisibility(!0),new r("io-pegar_bandeja","Pegar bandeja").setCssClass("intObj-bandeja").onClick(function(){V.play(V.audios.sfx.pegarObjeto),l.flag("pegou_bandeja",!0),l.flag("score_pegou_bandeja")||(l.registerScoreItem(u.pegarBandeja),l.flag("score_pegou_bandeja",!0)),l.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),O.registerDialogs([new t(n.characters.mentor).setText(w.esqueceu.pegarBandeja).registerOption("",function(){l.closeDialog()}),new t(n.characters.mentor).setText(w.esqueceu.objetosGaveta).registerOption("",function(){l.closeDialog()})]),I=new a("pulseira","pulseira"),I.registerInteractiveObjects([]),I.registerActions([new o("btn-largar_pulseira","Fechar pulseira").setCssClass("action-pulseira_paciente").onClick(function(){l.closeModalScene("Pulseira"),l.flag("score_verificar_pulseira")||(l.flag("score_verificar_pulseira",!0),l.registerScoreItem(u.verificarPulseira)),c.close()}).setVisibility(!0)]),F=new a("gaveta","Gaveta").setCssClass("modalScene-drawer"),F.registerActions([new o("btn-fecharGaveta","Fechar gaveta").setCssClass("action-fecharGaveta").onClick(function(){V.play(V.audios.sfx.fecharGaveta),l.closeModalScene("Gaveta"),l.setActionVisible("btn-ir_corredor",!0),l.openCommandBar()}).setVisibility(!0)]),F.registerInteractiveObjects([new r("io-kit_glicemia","Pegar Kit de glicemia").setCssClass("intObj-aparelhoGlicemia").onClick(function(){V.play(V.audios.sfx.pegarObjeto),l.registerScoreItem(u.pegarKitGlicemia),l.setInteractiveObjectVisible("io-kit_glicemia",!1),l.flag("score_pegou_kit_glicemia",!0)}).setVisibility(!0),new r("io-agulhas","Pegar Agulhas").setCssClass("intObj-agulhas").onClick(function(){V.play(V.audios.sfx.pegarObjeto),l.setInteractiveObjectVisible("io-agulhas",!1),l.flag("pegou_agulhas",!0)}).setVisibility(!0),new r("io-algodao","Pegar algodao").setCssClass("intObj-algodao_seco").onClick(function(){V.play(V.audios.sfx.pegarObjeto),l.registerScoreItem(u.pegarAlgodao),l.setInteractiveObjectVisible("io-algodao",!1),l.flag("score_pegou_algodao",!0)}).setVisibility(!0),new r("io-luvas","Pegar luvas").setCssClass("intObj-luvas_de_procedimento").onClick(function(){V.play(V.audios.sfx.pegarObjeto),l.registerScoreItem(u.pegarLuvas),l.setInteractiveObjectVisible("io-luvas",!1),l.flag("score_pegou_luvas",!0)}).setVisibility(!0)]),S=new a("Prontuario","Prontuario"),S.registerActions([new o("btn-fechar_prontuario","Fechar prontuário").setCssClass("action-ler_prontuario").onClick(function(){g.close(),l.closeModalScene("Prontuario"),l.setInteractiveObjectVisible("io-ir_corredor",!0),l.flag("checar_prontuario",!0),l.flag("score_falar_paciente")||l.flag("frase_apos_prontuario")||(l.flag("frase_apos_prontuario",!0),l.openDialog(2)),0==l.flag("score_anotar_prontuario")&&g.isDataValid()&&(l.registerScoreItem(u.anotarNoProntuario),l.flag("score_anotar_prontuario",!0)),l.flag("lavar_maos_apos_lixo")&&(l.unlockLevel(4),l.closeCommandBar(),l.showEndOfLevel(),V.stopAll(),V.play(V.audios.sfx.missaoCumprida))}).setVisibility(!0)]),glicosimetroComFita=new a("modalGlicosimetroComFita","modalGlicosimetroComFita").setCssClass("modalScene-glicosimetroComFita").setTemplate("<span class='glicosimetro-text'>180 mg/dl</span>"),glicosimetroComFita.registerActions([new o("btn-realizar_teste_glicemia","Terminar teste de glicemia capilar").setCssClass("action-realizar_teste_glicemia").onClick(function(){l.closeModalScene("modalGlicosimetroComFita"),l.setActionVisible("btn-realizar_teste_glicemia",!1),l.setActionVisible("btn-verificar_teste_glicemia",!0)}).setVisibility(!0)]),M=new a("modalGlicosimetro","modalGlicosimetro").setCssClass("modalScene-glicosimetro").setTemplate("<span class='glicosimetro-text'>180 mg/dl</span>"),M.registerActions([new o("btn-realizar_teste_glicemia","Fechar verificação").setCssClass("action-realizar_teste_glicemia").onClick(function(){l.closeModalScene("modalGlicosimetro")}).setVisibility(!0)]),h.registerScene(x),h.registerScene(A),h.registerScene(j),h.registerScene(D),h.registerScene(O),h.registerModalScene(I),h.registerModalScene(F),h.registerModalScene(S),h.registerModalScene(glicosimetroComFita),h.registerModalScene(M),h.setSetupScript(function(){c.setNameRegExp(/^Raul Gonzales Rodrigues$/i),c.setLeitoRegExp(/0*3/),c.setDataRegExp(/24\/07\/1937/),c.setName("Raul Gonzales Rodrigues"),c.setLeito("03"),c.setData("24/07/1937"),c.disable(),g.setNome("Raul Gonzales Rodrigues"),g.setSexo("M"),g.setEstadoCivil("Casado"),g.setDataNascimento("24/07/1937"),g.setIdade("78 anos"),g.setProfissao("Aposentado (operário)"),g.setPai("Roberto Cruz Rodrigues"),g.setMae("Rebeca Gonzales"),g.setAlergiaMedicamentosa(!1,""),g.setDisableAlergiaMedicamentosa(!0),g.setDataInternacao("17/06/2015"),g.setLeito("03 - Enfermaria Masculina"),g.setAntecedentes("Ocorrência de duas internações em 2013 por crise hipertensiva e uma internação em 2014 por hiperglicemia."),g.setHipotese("Acidose metabólica (Glicemia capilar no momento de internação 649 mg/dl)."),g.setObservacoes("Portador de Diabetes Mellitus II há 33 anos e Hipertensão Arterial Sistêmica há 15 anos."),g.setPeso("77"),g.setAltura("1,63"),g.setCircunferenciaAbdominal("147"),g.setPrescMedicaRowData(0,"","Metmorfina","Oral","500 mg (2x ao dia)","07h - 17h",!0,!0),g.setPrescMedicaRowData(1,"","Glibenclamida","Oral","4 mg (2x ao dia)","08h - 18h",!0,!0),g.setPrescMedicaRowData(2,"","Bicarbonato de sódio","Endovenoso","8,4 g + Água destilada 100 ml","Tempo de 4 horas",!0,!0),g.setPrescMedicaRowData(3,"","","","","",!1,!0),g.setPrescEnfermagemState(["verificar_glicemia","levantar_grade"]),g.setSsvvRowData(0,"","130x70","58","28","95","36,2",!0),g.setSsvvRowData(1,"","","","","","",!0),g.setAnotacaoEnfermagemRowData("","")}),h.registerFlag(new s("conversar_recepcionista",!1)),h.registerFlag(new s("conversarPaciente",!0)),h.registerFlag(new s("lavarMaos",!1)),h.registerFlag(new s("checar_prontuario",!1)),h.registerFlag(new s("frase_apos_prontuario",!1)),h.registerFlag(new s("pegou_bandeja",!1)),h.registerFlag(new s("pegou_tudo_gaveta",!0)),h.registerFlag(new s("segunda_ida_leito_paciente",!1)),h.registerFlag(new s("lavar_maos2",!1)),h.registerFlag(new s("conversar_paciente2",!1)),h.registerFlag(new s("selecionar_bandeja",!1)),h.registerFlag(new s("por_luvas",!1)),h.registerFlag(new s("utilizar_algodao1",!1)),h.registerFlag(new s("realizar_teste_glicemia",!1)),h.registerFlag(new s("utilizar_algodao2",!1)),h.registerFlag(new s("explicar_resultado",!1)),h.registerFlag(new s("voltar_alaMasculina",!1)),h.registerFlag(new s("lixo_algodao",!1)),h.registerFlag(new s("lixo_agulha",!1)),h.registerFlag(new s("elevarGrade",!1)),h.registerFlag(new s("lavar_maos_apos_lixo",!1)),h.registerFlag(new s("tem_fala",!1)),h.registerFlag(new s("score_ir_posto_hora_errada",!1)),h.registerFlag(new s("score_ir_farmacia_hora_errada",!1)),h.registerFlag(new s("score_ir_ala_feminina_hora_errada",!1)),h.registerFlag(new s("score_falar_paciente",!1)),h.registerFlag(new s("score_lavar_maos_antes_do_prontuario",!1)),h.registerFlag(new s("score_checar_prontuario",!1)),h.registerFlag(new s("score_pegou_kit_glicemia",!1)),h.registerFlag(new s("score_pegou_algodao",!1)),h.registerFlag(new s("score_pegou_luvas",!1)),h.registerFlag(new s("score_pegou_bandeja",!1)),h.registerFlag(new s("score_lavar_maos_antes_de_ir_no_leito",!1)),h.registerFlag(new s("score_verificar_pulseira",!1)),h.registerFlag(new s("score_selecionou_bandeja",!1)),h.registerFlag(new s("score_vestiu_luvas",!1)),h.registerFlag(new s("score_utilizou_algodao1",!1)),h.registerFlag(new s("score_realizou_teste_glicemia",!1)),h.registerFlag(new s("score_utilizou_algodao2",!1)),h.registerFlag(new s("score_explicou_resultado",!1)),h.registerFlag(new s("score_nao_verificar_pulseira",!1)),h.registerFlag(new s("score_nao_selecionou_bandeja",!1)),h.registerFlag(new s("score_nao_vestiu_luvas",!1)),h.registerFlag(new s("score_nao_utilizou_algodao1",!1)),h.registerFlag(new s("score_nao_realizou_teste_glicemia",!1)),h.registerFlag(new s("score_nao_utilizou_algodao2",!1)),h.registerFlag(new s("score_nao_explicou_resultado",!1)),h.registerFlag(new s("score_jogou_algodao_lixo",!1)),h.registerFlag(new s("score_jogou_agulha_perfuro",!1)),h.registerFlag(new s("score_elevou_grade_cama",!1)),h.registerFlag(new s("score_lavou_maos_apos_lixo",!1)),h.registerFlag(new s("score_anotar_prontuario",!1)),h.registerFlag(new s("descartar_algodao",!1)),h.registerFlag(new s("descartar_agulha",!1)),h.registerFlag(new s("score_agulha",!1)),h.registerFlag(new s("score_algodao",!1)),h.registerFlag(new s("score_jogou_agulha_errado",!1)),h.registerFlag(new s("score_jogou_algodao_errado",!1)),h.registerFlag(new s("pegou_agulhas",!1)),h.registerFlag(new s("fez_teste_glicemia",!1)),h.registerFlag(new s("verificar_pulseira",!1)),h.registerFlag(new s("score_pulseira",!1)),h.setInitialScene(0),e.registerLevel(h,3)});