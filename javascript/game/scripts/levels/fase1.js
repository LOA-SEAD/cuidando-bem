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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData"],function(e,o,a,i,r,t,s,n,c,l,g,p,m){function d(){D?n.flag("conversar_recepcionista")&&(n.closeDialog(0),n.closeDialog(1),n.changeScene(1)):(n.closeDialog(0),n.closeDialog(1),n.changeScene(1))}function u(){n.openDialog(0)}function f(){D&&n.flag("conversar_mentor")&&n.changeScene(2)}function b(){n.changeScene(4)}function v(){return n.flag("mediuTemperatura")&&n.flag("mediuPressao")&&n.flag("mediuFreqRespiratoria")&&n.flag("mediuBatimentosESaturacao")}var C=require("DialogsData").fase1,_=require("DialogsData").alertas,w=require("Player");m=m.fase1;var O=new i("Level 1 - Tutorial");O.setMaxPoints(m._sum);var D=!0,x=!1;D||(x=!0);var V=c.scenes.recepcao.getClone().onLoad(function(){n.flag("conversar_recepcionista")||(n.flag("conversar_recepcionista",!0),n.openDialog(0))});V.registerDialogs([new r(c.characters.recepcionistaUnknow).setText(C.recepcao[0]).registerOption("",function(){n.flag("conversar_recepcionista",!0),n.openDialog(1)}),new r(c.characters.jogador).setText("").registerOption(C.recepcao[1],function(){n.openDialog(2)}),new r(c.characters.recepcionista).setText(C.recepcao[2]).registerOption("",function(){n.closeDialog(3),n.setInteractiveObjectVisible("io-ir_corredor_esquerda",!0),n.setInteractiveObjectVisible("io-ir_corredor_direita",!0)})]),V.registerInteractiveObjects([new t("intObj-conversar_recepcionista","Conversar com a Recepcionista").setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(u),new t("io-ir_corredor_direita","Ir ao corredor").setCssClass("intObj-porta").onClick(d).setVisibility(!0)]);var j=c.scenes.corredor.getClone().onLoad(function(){switch(n.openCommandBar(),n.setActionVisible("btn-ir_recepcao",!0),w.play(w.audios.sfx.abrirPorta),w.playInLoop(w.audios.sfx.recepcao),n.flag("passagem_corredor")){case 0:n.setInteractiveObjectVisible("io-conversar_mentor",!0),n.openDialog(0);break;case 1:n.setInteractiveObjectVisible("io-ir_posto_enfermagem",!0),n.setInteractiveObjectVisible("io-ir_sala_leitos",!1),n.setInteractiveObjectVisible("io-conversar_mentor",!1);break;case 2:n.setInteractiveObjectVisible("io-ir_posto_enfermagem",!1),n.setInteractiveObjectVisible("io-ir_sala_leitos",!0)}}).onUnload(function(){switch(w.stopLoop(),w.play(w.audios.sfx.abrirPorta),n.flag("passagem_corredor")){case 0:n.flag("passagem_corredor",1);break;case 2:n.flag("passagem_corredor",3)}});j.registerActions([new a("btn-ir_recepcao","Voltar para a recepção").setCssClass("action-voltarRecepcao").onClick(function(){n.changeScene(0)}).setVisibility(!0)]),j.registerDialogs([new r(c.characters.mentor).setText(C.corredor[0]).registerOption("",function(){n.flag("conversar_mentor",!0),n.openDialog(1)}),new r(c.characters.jogador).setText("").registerOption(C.corredor[1],function(){n.flag("conversar_mentor",!0),n.openDialog(4)}).registerOption(C.corredor[2],function(){n.flag("conversar_mentor",!0),n.openDialog(2)}).registerOption(C.corredor[4],function(){n.flag("conversar_mentor",!0),n.openDialog(3)}).setRandomize(!0),new r(c.characters.mentor).setText(C.corredor[3]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.mentor).setText(C.corredor[5]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.mentor).setText(C.corredor[6]).registerOption("",function(){n.closeDialog(4),n.setInteractiveObjectVisible("io-ir_sala_leitos",!0),n.setInteractiveObjectVisible("io-conversar_mentor",!0)})]),j.registerInteractiveObjects([new t("io-ir_sala_leitos","Ir à Enfermaria Masculina").setCssClass("intObj-goToBedroom").onClick(f).setVisibility(x),new t("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem").setCssClass("intObj-goToNursingStation").onClick(b).setVisibility(x),new t("io-conversar_mentor","Conversar com Mentor").setCssClass("intObj-talkToMentor").onClick(function(){n.openDialog(0)}).setVisibility(x)]);var S=new o("salaDeLeitos","scene-salaDeLeitos").setCssClass("scene-bedroom-level1").onLoad(function(){switch(n.flag("passagem_sala-de-leitos")){case 0:n.setInteractiveObjectVisible("io-ir_leito",!0),n.setInteractiveObjectVisible("io-ir_corredor",!1);break;case 1:n.setInteractiveObjectVisible("io-ir_leito",!1),n.setInteractiveObjectVisible("io-ir_corredor",!0);break;case 2:n.setInteractiveObjectVisible("io-ir_leito",!0),n.setInteractiveObjectVisible("io-ir_corredor",!1)}}).onUnload(function(){switch(n.flag("passagem_sala-de-leitos")){case 0:n.flag("passagem_sala-de-leitos",1);break;case 1:n.flag("passagem_sala-de-leitos",2)}});S.registerInteractiveObjects([new t("io-ir_leito","Ir ao leito").setCssClass("intObj-ir_leito-tutorial").onClick(function(){n.changeScene(3)}).setVisibility(x),new t("io-ir_corredor","Ir ao Corredor").setCssClass("intObj-bedroomToHallway").onClick(function(){n.changeScene(1)}).setVisibility(x)]);var h=c.scenes.leitos.joao.getClone().onLoad(function(){switch(n.setInteractiveObjectVisible("io-pulseira_paciente",!0),n.flag("visita-leito")){case 0:n.openDialog(0);break;case 1:n.setActionVisible("btn-ir_sala_leitos",!1),n.setActionVisible("btn-lavarMaos",!0),n.setInteractiveObjectVisible("io-conversar_paciente",!1),n.flag("termometro",!1),n.flag("medidor-pressao",!1),n.flag("oximetro",!1),n.flag("relogio",!1),n.openCommandBar()}}).onUnload(function(){n.flag("visita-leito",1),n.closeCommandBar()});h.registerDialogs([new r(c.characters.mentor).setText(C.leito.conversa1[0]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.jogador).setText("").registerOption(C.leito.conversa1[1],function(){n.openDialog(4)}).registerOption(C.leito.conversa1[2],function(){n.openDialog(2)}).registerOption(C.leito.conversa1[4],function(){n.openDialog(3)}).setRandomize(!0),new r(c.characters.mentor).setText(C.leito.conversa1[3]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.mentor).setText(C.leito.conversa1[5]).registerOption("",function(){n.openDialog(1)}),new r(c.characters.pacientes.joao).setText(C.leito.conversa1[6]).registerOption("",function(){n.openDialog(5)}),new r(c.characters.jogador).setText("").registerOption(C.leito.conversa1[7],function(){n.openDialog(8)}).registerOption(C.leito.conversa1[8],function(){n.openDialog(6)}).registerOption(C.leito.conversa1[10],function(){n.openDialog(7)}).setRandomize(!0),new r(c.characters.mentor).setText(C.leito.conversa1[9]).registerOption("",function(){n.openDialog(5)}),new r(c.characters.mentor).setText(C.leito.conversa1[11]).registerOption("",function(){n.openDialog(5)}),new r(c.characters.pacientes.joao).setText(C.leito.conversa1[12]).registerOption("",function(){n.openDialog(9)}),new r(c.characters.jogador).setText("").registerOption(C.leito.conversa1[13],function(){n.openDialog(10)}),new r(c.characters.mentor).setText(C.leito.conversa1[14]).registerOption("",function(){n.closeDialog(10),n.openCommandBar()}),new r(c.characters.jogador).setText("").registerOption(C.leito.conversa2[0],function(){n.openDialog(14)}).registerOption(C.leito.conversa2[1],function(){n.openDialog(12)}).registerOption(C.leito.conversa2[3],function(){n.openDialog(13)}).setRandomize(!0),new r(c.characters.mentor).setText(C.leito.conversa2[2]).registerOption("",function(){n.openDialog(11)}),new r(c.characters.mentor).setText(C.leito.conversa2[4]).registerOption("",function(){n.openDialog(11)}),new r(c.characters.pacientes.joao).setText(C.leito.conversa2[5]).registerOption("",function(){n.openDialog(15)}),new r(c.characters.jogador).setText("").registerOption(C.leito.conversa2[6],function(){n.openDialog(16)}),new r(c.characters.mentor).setText(C.leito.conversa2[7]).registerOption("",function(){n.closeDialog(16),n.setInteractiveObjectVisible("io-conversar_paciente",!1),n.openCommandBar()}),new r(c.characters.mentor).setText(C.leito.pulseiraIncorreta).registerOption("",function(){n.closeDialog(),n.openCommandBar()}),new r(c.characters.jogador).setText(C.leito.perguntarNome).registerOption("",function(){n.openDialog(19)}),new r(c.characters.pacientes.joao).setText(C.leito.conversa1[12]).registerOption("",function(){n.closeDialog(),n.openCommandBar()}),new r(c.characters.mentor).setText("Algumas informações do prontuário estão incorretas. Verifique-as e volte a conversar comigo.").registerOption("",function(){n.closeDialog(),g.open(),n.openCommandBar()}),new r(c.characters.mentor).setText("Você ainda não mediu algum dos SSVV. Meça-os antes de anotar no prontuário.").registerOption("",function(){n.closeDialog(),g.open(),n.openCommandBar()}),new r(c.characters.mentor).setText("Você deve lavar as mãos após aferir os sinais vitais do paciente.").registerOption("",function(){n.closeDialog(),n.openCommandBar()})]),h.registerInteractiveObjects([new t("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_01-checar_pulseira").onClick(function(){n.openModalScene("pulseira"),l.open(),n.openCommandBar(),!n.flag("pulseira"),n.flag("score_checar_pulseira")||(n.flag("score_checar_pulseira",!0),n.registerScoreItem(m.identificarPaciente))}).setVisibility(x),new t("io-conversar_paciente","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){n.openDialog(18),n.closeCommandBar()}).setVisibility(!0)]),h.registerActions([new a("btn-ir_sala_leitos","Ir para sala de leitos").setCssClass("action-ir_sala_de_leitos").onClick(function(){n.changeScene(2)}).setVisibility(x),new a("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){switch(w.play(w.audios.sfx.lavarMaos),n.flag("lavar-maos")){case 0:n.flag("lavar-maos",1),n.registerScoreItem(m.lavarMaosAntes),n.setActionVisible("btn-frequencia_respiratoria",!0),n.setActionVisible("btn-medir_pulso",!0),n.setActionVisible("btn-medir_temperatura",!0),n.setActionVisible("btn-saturacao_02",!0),n.setActionVisible("btn-ler_prontuario",!0);break;case 2:}n.flag("lavar-maosDepois",!0)}).setVisibility(x),new a("btn-medir_pulso","Ver pressão").setCssClass("action-medir_pulso").onClick(function(){w.play(w.audios.sfx.bombinha),n.flag("lavar-maos")>=1&&(n.openModalScene("modalMedidor_pressao"),$("#accessible_log").empty(),$("<span>160x100 mmHg.</span><br>").appendTo("#accessible_log"),n.flag("medidor-pressao",!0),n.flag("mediuPressao")||(n.flag("mediuPressao",!0),n.registerScoreItem(m.verPressao)),n.flag("lavar-maosDepois",!1))}).setVisibility(x),new a("btn-saturacao_02","Ver saturação de O2").setCssClass("action-medir_saturacao_02").onClick(function(){w.play(w.audios.sfx.bipOximetro),n.flag("lavar-maos")>=1&&(n.openModalScene("modalOximetro"),$("#accessible_log").empty(),$("<span>Saturação de oxigênio: 97%.</span><br>").appendTo("#accessible_log"),$("<span>69 bpm.</span><br>").appendTo("#accessible_log"),n.flag("oximetro",!0),n.flag("mediuBatimentosESaturacao")||(n.flag("mediuBatimentosESaturacao",!0),n.registerScoreItem(m.verSaturacao)),n.flag("lavar-maosDepois",!1))}).setVisibility(x),new a("btn-frequencia_respiratoria","Ver frequência respiratória").setCssClass("action-medir_freq_respiratoria").onClick(function(){n.flag("lavar-maos")>=1&&(n.flag("relogio",!0),n.flag("mediuFreqRespiratoria")||(n.flag("mediuFreqRespiratoria",!0),n.registerScoreItem(m.verFrequenciaRespiratoria)),n.flag("lavar-maosDepois",!1),p.open(),n.openModalScene("freqRespiratoria"))}).setVisibility(x),new a("btn-medir_temperatura","Ver temperatura").setCssClass("action-medir_temperatura").onClick(function(){w.play(w.audios.sfx.bipTermometro),n.flag("lavar-maos")>=1&&(n.openModalScene("modalTermometro"),$("#accessible_log").empty(),$("<span>35,7° Celsius.</span><br>").appendTo("#accessible_log"),n.flag("termometro",!0),n.flag("mediuTemperatura")||(n.flag("mediuTemperatura",!0),n.registerScoreItem(m.verTemperatura)),n.flag("lavar-maosDepois",!1))}).setVisibility(x),new a("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){n.flag("lavar-maosDepois")?(v()&&(n.flag("lavar-maosDepoisScore")||(n.flag("lavar-maosDepoisScore",!0),n.registerScoreItem(m.lavarMaosDepois))),g.open(),n.openModalScene("Prontuario")):(g.close(),n.closeCommandBar(),n.openDialog(22))}).setVisibility(x)]);var I=c.scenes.postoDeEnfermagem.getClone().onLoad(function(){n.setInteractiveObjectVisible("io-abrirGaveta",!0)}).onUnload(function(){n.closeCommandBar()});I.registerInteractiveObjects([new t("io-abrirGaveta","Abrir gaveta").setCssClass("intObj-openDrawer").onClick(function(){n.flag("pegou_bandeja")?(w.play(w.audios.sfx.abrirGaveta),n.openModalScene("Gaveta"),n.openCommandBar(),n.setActionVisible("btn-fecharGaveta",!0),n.flag("termometro")||n.setInteractiveObjectVisible("io-termometro",!0),n.flag("medidor-pressao")||n.setInteractiveObjectVisible("io-medidorPressao",!0),n.flag("oximetro")||n.setInteractiveObjectVisible("io-oximetro",!0),n.flag("relogio")||n.setInteractiveObjectVisible("io-relogio",!0)):n.openDialog(0)}).setVisibility(x),new t("io-pegar_bandeja","Pegar bandeja").setCssClass("intObj-bandeja").onClick(function(){w.play(w.audios.sfx.pegarObjeto),n.flag("pegou_bandeja",!0),n.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),I.registerDialogs([new r(c.characters.mentor).setText(_.esqueceu.pegarBandeja).registerOption("",function(){n.closeDialog()})]),I.registerActions([new a("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){n.flag("passagem_corredor",2),n.changeScene(1)}).setVisibility(x)]);var T=c.scenes.finalDeFase.getClone().onLoad(function(){n.setActionVisible("btn-proxima_fase",!0)});T.registerActions([new a("btn-proxima_fase","Ir a recepção").setCssClass("action-ir_recepcao").onClick(function(){n.changeLevelTo(1)}).setVisibility(x)]);var y=new o("Gaveta","Gaveta").setCssClass("modalScene-drawer");y.registerActions([new a("btn-fecharGaveta","Fechar gaveta").setCssClass("action-fecharGaveta").onClick(function(){w.play(w.audios.sfx.fecharGaveta),n.closeModalScene("Gaveta"),n.flag("termometro")&&n.flag("oximetro")&&n.flag("medidor-pressao")&&n.flag("relogio")&&(n.setActionVisible("btn-ir_corredor",!0),n.openCommandBar())}).setVisibility(x)]),y.registerInteractiveObjects([new t("io-termometro","Pegar termômetro").setCssClass("intObj-thermometer").onClick(function(){w.play(w.audios.sfx.pegarObjeto),n.registerScoreItem(m.pegarTermometro),n.setInteractiveObjectVisible("io-termometro",!1),n.flag("termometro",!0)}).setVisibility(x),new t("io-medidorPressao","Pegar medidor de pressão").setCssClass("intObj-bloodPressureMonitor").onClick(function(){w.play(w.audios.sfx.pegarObjeto),n.registerScoreItem(m.pegarAparelhoPressao),n.setInteractiveObjectVisible("io-medidorPressao",!1),n.flag("medidor-pressao",!0)}).setVisibility(x),new t("io-oximetro","Pegar oxímetro").setCssClass("intObj-oximeter").onClick(function(){w.play(w.audios.sfx.pegarObjeto),n.registerScoreItem(m.pegarOximetro),n.setInteractiveObjectVisible("io-oximetro",!1),n.flag("oximetro",!0)}).setVisibility(x),new t("io-relogio","Pegar relógio").setCssClass("intObj-watch").onClick(function(){w.play(w.audios.sfx.pegarObjeto),n.registerScoreItem(m.pegarRelogio),n.setInteractiveObjectVisible("io-relogio",!1),n.flag("relogio",!0)}).setVisibility(x)]);var M=new o("Prontuario","modalScene-prontuario_joao");M.registerActions([new a("btn-fechar_prontuario","Fechar prontuário").setCssClass("action-ler_prontuario").onClick(function(){g.close(),n.closeModalScene("Prontuario")}),new a("btn-terminar_fase","Conversar com Mentor").setCssClass("action-abrir_dialogo").onClick(function(){n.flag("lavar-maosDepois")?v()?g.isDataValid()?(n.registerScoreItem(m.anotarNoProntuario),g.close(),n.closeCommandBar(),n.showEndOfLevel(),n.unlockLevel(2),w.stopAll(),w.play(w.audios.sfx.missaoCumprida)):(g.close(),n.closeCommandBar(),n.openDialog(20)):(g.close(),n.closeCommandBar(),n.openDialog(21)):(g.close(),n.closeCommandBar(),n.openDialog(22))})]);var k=new o("pulseira","pulseira");k.registerInteractiveObjects([]),k.registerActions([new a("btn-largar_pulseira","Fechar pulseira").setCssClass("action-pulseira_paciente").onClick(function(){n.closeModalScene("Pulseira"),l.close(),l.isAllDataValid()?(0==n.flag("visita-leito")&&n.setActionVisible("btn-ir_sala_leitos",!0),l.disable(),0==n.flag("conversouPacienteSegundaVez")&&(n.flag("conversouPacienteSegundaVez",!0),n.openDialog(11))):(n.closeCommandBar(),n.openDialog(17))}).setVisibility(!0)]);var R=new o("modalTermometro","modalTermometro").setCssClass("modalScene-termometro").setTemplate("<span class='temp_termometro'>35.7º</span>");R.registerActions([new a("btn-largar_termometro","Fechar termômetro").setCssClass("action-largar_termometro").onClick(function(){n.closeModalScene("modalTermometro")}).setVisibility(!0)]);var A=new o("modalMedidor_pressao","modalMedidor_pressao").setCssClass("modalScene-medidorPressao").setTemplate("<span class='pressao'>160x100 mmHg</span>");A.registerActions([new a("btn-largar_medidor_pressao","Fechar medidor de pressão").setCssClass("action-largar_medidor_pressao").onClick(function(){n.closeModalScene("modalMedidor_pressao")}).setVisibility(!0)]);var P=new o("modalOximetro","Oxímetro").setCssClass("modalScene-oximetro").setTemplate("<span class='oximetro-st-text'>97% Sat.O2</span><span class='oximetro-fc-text'>69 bpm</span>");P.registerActions([new a("btn-largar_oximetro","Fechar Oxímetro").setCssClass("action-largar_oximetro").onClick(function(){n.closeModalScene("modalOximetro")}).setVisibility(!0)]);var F=new o("freqRespiratoria","Frequência Respiratória").setCssClass("modalScene-freqRespiratoria");F.registerActions([new a("btn-largar_relogio","Fechar Relógio").setCssClass("action-largar_relogio").onClick(function(){p.close(),n.closeModalScene("freqRespiratoria"),w.stop(),w.playInRange(w.audios.musics.inGame)}).setVisibility(!0)]),O.setSetupScript(function(){p.setFr(17),l.setNameRegExp(/^jo(ã|a)o manoel ribeiro$/i),l.setLeitoRegExp(/0*2/),l.setDataRegExp(/07\/06\/1956/),g.setNome("João Manoel Ribeiro"),g.setSexo("M"),g.setEstadoCivil("Casado"),g.setDataNascimento("07/06/1956"),g.setIdade("58 anos"),g.setProfissao("Comerciante"),g.setPai("Joaquim Ribeiro"),g.setMae("Adelaide Moraes Ribeiro"),g.setAlergiaMedicamentosa(!0,"Dipirona"),g.setDisableAlergiaMedicamentosa(!0),g.setDataInternacao("15/03/2015"),g.setLeito("02 - Enfermaria Masculina"),g.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)"),g.setHipotese("Crise hipertensiva"),g.setObservacoes(""),g.setPeso("87"),g.setAltura("1,62"),g.setCircunferenciaAbdominal("115"),g.setPrescMedicaRowData(0,"","Captopril","Oral","comp 75 mg","2x dia",!1,!0),g.setPrescMedicaRowData(1,"","Ácido acetilsalicílico (AAS)","Oral","comp 100 mg","1x dia",!1,!0),g.setPrescMedicaRowData(2,"","","","","",!1,!0),g.setPrescMedicaRowData(3,"","","","","",!1,!0),g.setSsvvRowData(0,"","","","","","",!1),g.setSsvvRowRegExp(0,new RegExp("15/03"),new RegExp("160x100"),new RegExp("69"),new RegExp("17"),new RegExp("97"),new RegExp("35.7")),g.setSsvvRowData(1,"","","","","","",!0),g.setAnotacaoEnfermagemRowData("",""),g.setPrescEnfermagemState(["decubito_visual"])}),O.registerScene(V),O.registerScene(j),O.registerScene(S),O.registerScene(h),O.registerScene(I),O.registerScene(T),O.registerModalScene(k),O.registerModalScene(M),O.registerModalScene(F),O.registerModalScene(y),O.registerModalScene(R),O.registerModalScene(A),O.registerModalScene(P),O.registerFlag(new s("conversar_recepcionista",!1)),O.registerFlag(new s("conversar_mentor",!1)),O.registerFlag(new s("passagem_corredor",0)),O.registerFlag(new s("passagem_sala-de-leitos",0)),O.registerFlag(new s("visita-leito",0)),O.registerFlag(new s("pulseira",!1)),O.registerFlag(new s("lavar-maos",0)),O.registerFlag(new s("lavar-maosDepois",!1)),O.registerFlag(new s("lavar-maosDepoisScore",!1)),O.registerFlag(new s("pegou_bandeja",!1)),O.registerFlag(new s("termometro",!1)),O.registerFlag(new s("medidor-pressao",!1)),O.registerFlag(new s("oximetro",!1)),O.registerFlag(new s("relogio",!1)),O.registerFlag(new s("conversouPacienteSegundaVez",!1)),O.registerFlag(new s("score_checar_pulseira",!1)),O.registerFlag(new s("mediuTemperatura",!1)),O.registerFlag(new s("mediuPressao",!1)),O.registerFlag(new s("mediuFreqRespiratoria",!1)),O.registerFlag(new s("mediuBatimentosESaturacao",!1)),O.setInitialScene(0),e.registerLevel(O,1)});