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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){function b(){console.log("Funcao: recepcao_ir_corredor"),g?u.flag("conversar_recepcionista")==1?(u.closeDialog(0),u.closeDialog(1),u.changeScene(1),console.log("Ir ao corredor")):console.log("Necessita ação: conversar com a recepcionista"):(u.closeDialog(0),u.closeDialog(1),u.changeScene(1),console.log("Ir ao corredor"))}function w(){console.log("action: Conversar com a recepcionista"),u.openDialog(0)}function S(){g?u.flag("conversar_mentor")==1?(console.log("Action: corredorIrSalaLeitos"),u.changeScene(2)):console.log("Necessita ação: falar com mentor"):console.log("Action: corredorIrSalaLeitos")}function T(){console.log("Action: corredorIrPostoEnfermagem"),u.changeScene(4)}function O(){return u.flag("mediuTemperatura")&&u.flag("mediuPressao")&&u.flag("mediuFreqRespiratoria")&&u.flag("mediuBatimentosESaturacao")}var p=require("DialogsData").fase1,d=require("DialogsData").alertas,v=require("Player");h=h.fase1;var m=new r("Level 1 - Tutorial");m.setMaxPoints(h._sum),console.groupCollapsed(m.getName());var g=!0,y=!1;g||(y=!0);var E=a.scenes.recepcao.getClone().onLoad(function(){console.log("Load scene: "+E.getName()),u.flag("conversar_recepcionista")==0&&(u.flag("conversar_recepcionista",!0),u.openDialog(0))});E.registerDialogs([(new i(a.characters.recepcionistaUnknow)).setText(p.recepcao[0]).registerOption("",function(){u.flag("conversar_recepcionista",!0),u.openDialog(1)}),(new i(a.characters.jogador)).setText("").registerOption(p.recepcao[1],function(){u.openDialog(2)}),(new i(a.characters.recepcionista)).setText(p.recepcao[2]).registerOption("",function(){console.log("Encerrar o diálogo"),u.closeDialog(3),u.setInteractiveObjectVisible("io-ir_corredor_esquerda",!0),u.setInteractiveObjectVisible("io-ir_corredor_direita",!0)})]),E.registerInteractiveObjects([(new s("intObj-conversar_recepcionista","Conversar com a Recepcionista")).setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(w),(new s("io-ir_corredor_esquerda","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-left no-glow").onClick(b).setVisibility(y),(new s("io-ir_corredor_direita","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-right no-glow").onClick(b).setVisibility(y)]);var x=a.scenes.corredor.getClone().onLoad(function(){u.openCommandBar(),u.setActionVisible("btn-ir_recepcao",!0),v.stopAll(),v.play(v.audios.sfx.abrirPorta),v.playInLoop(v.audios.loops.recepcao);switch(u.flag("passagem_corredor")){case 0:u.setInteractiveObjectVisible("io-conversar_mentor",!0),u.openDialog(0);break;case 1:u.setInteractiveObjectVisible("io-ir_posto_enfermagem",!0),u.setInteractiveObjectVisible("io-ir_sala_leitos",!1),u.setInteractiveObjectVisible("io-conversar_mentor",!1);break;case 2:u.setInteractiveObjectVisible("io-ir_posto_enfermagem",!1),u.setInteractiveObjectVisible("io-ir_sala_leitos",!0)}}).onUnload(function(){v.stopAll(),v.play(v.audios.sfx.abrirPorta),v.playInRange(v.audios.musics.inGame);switch(u.flag("passagem_corredor")){case 0:u.flag("passagem_corredor",1);break;case 1:u.flag("passagem_corredor",2);break;case 2:u.flag("passagem_corredor",3)}});x.registerActions([(new n("btn-ir_recepcao","Voltar para a recepção")).setCssClass("action-voltarRecepcao").onClick(function(){u.changeScene(0)}).setVisibility(!0)]),x.registerDialogs([(new i(a.characters.mentor)).setText(p.corredor[0]).registerOption("",function(){u.flag("conversar_mentor",!0),u.openDialog(1)}),(new i(a.characters.jogador)).setText("").registerOption(p.corredor[1],function(){u.flag("conversar_mentor",!0),u.openDialog(4)}).registerOption(p.corredor[2],function(){u.flag("conversar_mentor",!0),u.openDialog(2)}).registerOption(p.corredor[4],function(){u.flag("conversar_mentor",!0),u.openDialog(3)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.corredor[3]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.mentor)).setText(p.corredor[5]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.mentor)).setText(p.corredor[6]).registerOption("",function(){u.closeDialog(4),u.setInteractiveObjectVisible("io-ir_sala_leitos",!0),u.setInteractiveObjectVisible("io-conversar_mentor",!0)})]),x.registerInteractiveObjects([(new s("io-ir_sala_leitos","Ir à Enfermaria Masculina")).setCssClass("intObj-goToBedroom").onClick(S).setVisibility(y),(new s("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem")).setCssClass("intObj-goToNursingStation").onClick(T).setVisibility(y),(new s("io-conversar_mentor","Conversar com Mentor")).setCssClass("intObj-talkToMentor").onClick(function(){console.log("Abrir diálogo com o mentor"),u.openDialog(0)}).setVisibility(y)]);var N=(new t("salaDeLeitos","scene-salaDeLeitos")).setCssClass("scene-bedroom-level0").onLoad(function(){switch(u.flag("passagem_sala-de-leitos")){case 0:u.setInteractiveObjectVisible("io-ir_leito",!0),u.setInteractiveObjectVisible("io-ir_corredor",!1);break;case 1:u.setInteractiveObjectVisible("io-ir_leito",!1),u.setInteractiveObjectVisible("io-ir_corredor",!0);break;case 2:u.setInteractiveObjectVisible("io-ir_leito",!0),u.setInteractiveObjectVisible("io-ir_corredor",!1)}}).onUnload(function(){switch(u.flag("passagem_sala-de-leitos")){case 0:u.flag("passagem_sala-de-leitos",1);break;case 1:u.flag("passagem_sala-de-leitos",2)}});N.registerInteractiveObjects([(new s("io-ir_leito","Ir ao leito")).setCssClass("intObj-ir_leito-tutorial").onClick(function(){u.changeScene(3)}).setVisibility(y),(new s("io-ir_corredor","Ir ao Corredor")).setCssClass("intObj-bedroomToHallway").onClick(function(){u.changeScene(1)}).setVisibility(y)]);var C=a.scenes.leitos.joao.getClone().onLoad(function(){console.log("Leito: Onload"),u.setInteractiveObjectVisible("io-pulseira_paciente",!0);switch(u.flag("visita-leito")){case 0:u.openDialog(0);break;case 1:u.setActionVisible("btn-ir_sala_leitos",!1),u.setActionVisible("btn-lavarMaos",!0),u.setInteractiveObjectVisible("io-conversar_paciente",!1),u.flag("termometro",!1),u.flag("medidor-pressao",!1),u.flag("oximetro",!1),u.flag("relogio",!1),u.openCommandBar()}}).onUnload(function(){console.log("Leito: OnUnload"),u.flag("visita-leito",1),u.closeCommandBar()});C.registerDialogs([(new i(a.characters.mentor)).setText(p.leito.conversa1[0]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.jogador)).setText("").registerOption(p.leito.conversa1[1],function(){u.openDialog(4)}).registerOption(p.leito.conversa1[2],function(){u.openDialog(2)}).registerOption(p.leito.conversa1[4],function(){u.openDialog(3)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.leito.conversa1[3]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.mentor)).setText(p.leito.conversa1[5]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.pacientes.joao)).setText(p.leito.conversa1[6]).registerOption("",function(){u.openDialog(5)}),(new i(a.characters.jogador)).setText("").registerOption(p.leito.conversa1[7],function(){u.openDialog(8)}).registerOption(p.leito.conversa1[8],function(){u.openDialog(6)}).registerOption(p.leito.conversa1[10],function(){u.openDialog(7)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.leito.conversa1[9]).registerOption("",function(){u.openDialog(5)}),(new i(a.characters.mentor)).setText(p.leito.conversa1[11]).registerOption("",function(){u.openDialog(5)}),(new i(a.characters.pacientes.joao)).setText(p.leito.conversa1[12]).registerOption("",function(){u.openDialog(9)}),(new i(a.characters.jogador)).setText("").registerOption(p.leito.conversa1[13],function(){u.openDialog(10)}),(new i(a.characters.mentor)).setText(p.leito.conversa1[14]).registerOption("",function(){u.closeDialog(10),u.openCommandBar()}),(new i(a.characters.jogador)).setText("").registerOption(p.leito.conversa2[0],function(){u.openDialog(14)}).registerOption(p.leito.conversa2[1],function(){u.openDialog(12)}).registerOption(p.leito.conversa2[3],function(){u.openDialog(13)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.leito.conversa2[2]).registerOption("",function(){u.openDialog(11)}),(new i(a.characters.mentor)).setText(p.leito.conversa2[4]).registerOption("",function(){u.openDialog(11)}),(new i(a.characters.pacientes.joao)).setText(p.leito.conversa2[5]).registerOption("",function(){u.openDialog(15)}),(new i(a.characters.jogador)).setText("").registerOption(p.leito.conversa2[6],function(){u.openDialog(16)}),(new i(a.characters.mentor)).setText(p.leito.conversa2[7]).registerOption("",function(){u.closeDialog(16),u.setInteractiveObjectVisible("io-conversar_paciente",!1),u.openCommandBar()}),(new i(a.characters.mentor)).setText(p.leito.pulseiraIncorreta).registerOption("",function(){u.closeDialog(),u.openCommandBar()}),(new i(a.characters.jogador)).setText(p.leito.perguntarNome).registerOption("",function(){u.openDialog(19)}),(new i(a.characters.pacientes.joao)).setText(p.leito.conversa1[12]).registerOption("",function(){u.closeDialog(),u.openCommandBar()}),(new i(a.characters.mentor)).setText("Algumas informações do prontuário estão incorretas. Verifique-as e volte a conversar comigo.").registerOption("",function(){u.closeDialog(),l.open(),u.openCommandBar()}),(new i(a.characters.mentor)).setText("Você ainda não mediu algum dos SSVV. Meça-os antes de anotar no prontuário.").registerOption("",function(){u.closeDialog(),l.open(),u.openCommandBar()}),(new i(a.characters.mentor)).setText("Você deve lavar as mãos após aferir os sinais vitais do paciente.").registerOption("",function(){u.closeDialog(),u.openCommandBar()})]),C.registerInteractiveObjects([(new s("io-pulseira_paciente","Checar pulseira do paciente")).setCssClass("intObj-paciente_01-checar_pulseira").onClick(function(){console.log("IO: pulseira_paciente"),u.openModalScene("pulseira"),f.open(),u.openCommandBar(),u.flag("pulseira")==0,u.flag("score_checar_pulseira")==0&&(u.flag("score_checar_pulseira",!0),u.registerScoreItem(h.identificarPaciente))}).setVisibility(y),(new s("io-conversar_paciente","Falar com o paciente")).setCssClass("intObj-conversar_paciente").onClick(function(){u.openDialog(18),u.closeCommandBar()}).setVisibility(!0)]),C.registerActions([(new n("btn-ir_sala_leitos","Ir para sala de leitos")).setCssClass("action-ir_sala_de_leitos").onClick(function(){u.changeScene(2)}).setVisibility(y),(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){console.log("Action: lavarMaos"),v.play(v.audios.sfx.lavarMaos);switch(u.flag("lavar-maos")){case 0:u.flag("lavar-maos",1),u.registerScoreItem(h.lavarMaosAntes),u.setActionVisible("btn-frequencia_respiratoria",!0),u.setActionVisible("btn-medir_pulso",!0),u.setActionVisible("btn-medir_temperatura",!0),u.setActionVisible("btn-saturacao_02",!0),u.setActionVisible("btn-ler_prontuario",!0);break;case 2:}u.flag("lavar-maosDepois",!0)}).setVisibility(y),(new n("btn-medir_pulso","Ver pressão")).setCssClass("action-medir_pulso").onClick(function(){console.log("Action: medir_pulso"),v.play(v.audios.sfx.bombinha),u.flag("lavar-maos")>=1&&(u.openModalScene("modalMedidor_pressao"),u.flag("medidor-pressao",!0),u.flag("mediuPressao")==0&&(u.flag("mediuPressao",!0),u.registerScoreItem(h.verPressao)),u.flag("lavar-maosDepois",!1))}).setVisibility(y),(new n("btn-saturacao_02","Ver saturação de O2")).setCssClass("action-medir_saturacao_02").onClick(function(){console.log("Action: medir_saturacao_02"),v.play(v.audios.sfx.bipOximetro),u.flag("lavar-maos")>=1&&(u.openModalScene("modalOximetro"),u.flag("oximetro",!0),u.flag("mediuBatimentosESaturacao")==0&&(u.flag("mediuBatimentosESaturacao",!0),u.registerScoreItem(h.verSaturacao)),u.flag("lavar-maosDepois",!1))}).setVisibility(y),(new n("btn-frequencia_respiratoria","Ver frequência respiratória")).setCssClass("action-medir_freq_respiratoria").onClick(function(){console.log("Action: medir_freq_respiratoria"),v.play(v.audios.sfx.ticTac),u.flag("lavar-maos")>=1&&(u.flag("relogio",!0),u.flag("mediuFreqRespiratoria")==0&&(u.flag("mediuFreqRespiratoria",!0),u.registerScoreItem(h.verFrequenciaRespiratoria)),u.flag("lavar-maosDepois",!1),c.open(),u.openModalScene("freqRespiratoria"))}).setVisibility(y),(new n("btn-medir_temperatura","Ver temperatura")).setCssClass("action-medir_temperatura").onClick(function(){console.log("Action: medir_temperatura"),v.play(v.audios.sfx.bipTermometro),u.flag("lavar-maos")>=1&&(u.openModalScene("modalTermometro"),u.flag("termometro",!0),u.flag("mediuTemperatura")==0&&(u.flag("mediuTemperatura",!0),u.registerScoreItem(h.verTemperatura)),u.flag("lavar-maosDepois",!1))}).setVisibility(y),(new n("btn-ler_prontuario","Ler prontuario")).setCssClass("action-ler_prontuario").onClick(function(){console.log("Action: ler prontuario"),u.flag("lavar-maosDepois")==1?(O()&&u.flag("lavar-maosDepoisScore")==1&&u.registerScoreItem(h.lavarMaosDepois),l.open(),u.openModalScene("Prontuario")):(l.close(),u.closeCommandBar(),u.openDialog(22))}).setVisibility(y)]);var k=a.scenes.postoDeEnfermagem.getClone().onLoad(function(){u.setInteractiveObjectVisible("io-abrirGaveta",!0)}).onUnload(function(){u.closeCommandBar()});k.registerInteractiveObjects([(new s("io-abrirGaveta","Abrir gaveta")).setCssClass("intObj-openDrawer").onClick(function(){u.flag("pegou_bandeja")!=1?u.openDialog(0):(console.log("Action: abrirGaveta"),v.play(v.audios.sfx.abrirGaveta),u.openModalScene("Gaveta"),u.openCommandBar(),u.setActionVisible("btn-fecharGaveta",!0),u.flag("termometro")!=1&&u.setInteractiveObjectVisible("io-termometro",!0),u.flag("medidor-pressao")!=1&&u.setInteractiveObjectVisible("io-medidorPressao",!0),u.flag("oximetro")!=1&&u.setInteractiveObjectVisible("io-oximetro",!0),u.flag("relogio")!=1&&u.setInteractiveObjectVisible("io-relogio",!0))}).setVisibility(y),(new s("io-pegar_bandeja","Pegar bandeja")).setCssClass("intObj-bandeja").onClick(function(){console.log("Action: Pegar bandeja"),v.play(v.audios.sfx.pegarObjeto),u.flag("pegou_bandeja",!0),u.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),k.registerDialogs([(new i(a.characters.mentor)).setText(d.esqueceu.pegarBandeja).registerOption("",function(){u.closeDialog()})]),k.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),u.changeScene(1)}).setVisibility(y)]);var L=a.scenes.finalDeFase.getClone().onLoad(function(){u.setActionVisible("btn-proxima_fase",!0)});L.registerActions([(new n("btn-proxima_fase","Ir a recepção")).setCssClass("action-ir_recepcao").onClick(function(){console.log("Proxima fase"+u),u.changeLevelTo(1)}).setVisibility(y)]);var A=(new t("Gaveta","Gaveta")).setCssClass("modalScene-drawer");A.registerActions([(new n("btn-fecharGaveta","Fechar gaveta")).setCssClass("action-fecharGaveta").onClick(function(){console.log("Action: fecharGaveta"),v.play(v.audios.sfx.fecharGaveta),u.closeModalScene("Gaveta"),u.flag("termometro")==1&&u.flag("oximetro")==1&&u.flag("medidor-pressao")==1&&u.flag("relogio")==1&&(console.log("Btn ir corredor"),u.setActionVisible("btn-ir_corredor",!0),u.openCommandBar())}).setVisibility(y)]),A.registerInteractiveObjects([(new s("io-termometro","Termômetro")).setCssClass("intObj-thermometer").onClick(function(){console.log("Action: pegar_termometro"),v.play(v.audios.sfx.pegarObjeto),u.registerScoreItem(h.pegarTermometro),u.setInteractiveObjectVisible("io-termometro",!1),u.flag("termometro",!0)}).setVisibility(y),(new s("io-medidorPressao","Medidor de pressão")).setCssClass("intObj-bloodPressureMonitor").onClick(function(){console.log("O medidor de pressão foi ativado"),v.play(v.audios.sfx.pegarObjeto),u.registerScoreItem(h.pegarAparelhoPressao),u.setInteractiveObjectVisible("io-medidorPressao",!1),u.flag("medidor-pressao",!0)}).setVisibility(y),(new s("io-oximetro","Oxímetro")).setCssClass("intObj-oximeter").onClick(function(){console.log("Action: pegar_oximetro"),v.play(v.audios.sfx.pegarObjeto),u.registerScoreItem(h.pegarOximetro),u.setInteractiveObjectVisible("io-oximetro",!1),u.flag("oximetro",!0)}).setVisibility(y),(new s("io-relogio","Relógio")).setCssClass("intObj-watch").onClick(function(){console.log("Action: pegar_relogio"),v.play(v.audios.sfx.pegarObjeto),u.registerScoreItem(h.pegarRelogio),u.setInteractiveObjectVisible("io-relogio",!1),u.flag("relogio",!0)}).setVisibility(y)]);var M=new t("Prontuario","modalScene-prontuario_joao");M.registerActions([(new n("btn-fechar_prontuario","Fechar prontuário")).setCssClass("action-ler_prontuario").onClick(function(){console.log("Action: Fechar prontuario"),l.close(),u.closeModalScene("Prontuario")}),(new n("btn-terminar_fase","Conversar com Mentor")).setCssClass("action-abrir_dialogo").onClick(function(){console.log("Action: Finalizar fase"),u.flag("lavar-maosDepois")==1?O()?l.isDataValid()?(u.registerScoreItem(h.anotarNoProntuario),l.close(),u.closeCommandBar(),u.showEndOfLevel(),u.unlockLevel(2),v.stopAll(),v.play(v.audios.sfx.missaoCumprida)):(l.close(),u.closeCommandBar(),u.openDialog(20)):(l.close(),u.closeCommandBar(),u.openDialog(21)):(l.close(),u.closeCommandBar(),u.openDialog(22))})]);var _=new t("pulseira","pulseira");_.registerInteractiveObjects([]),_.registerActions([(new n("btn-largar_pulseira","Fechar pulseira")).setCssClass("action-pulseira_paciente").onClick(function(){console.log("Ação: Fechar modal pulseira"),u.closeModalScene("Pulseira"),f.close(),f.isAllDataValid()?(console.log("Action: action-ir_sala_de_leitos"),u.flag("visita-leito")==0&&u.setActionVisible("btn-ir_sala_leitos",!0),f.disable(),u.flag("conversouPacienteSegundaVez")==0&&(u.flag("conversouPacienteSegundaVez",!0),u.registerScoreItem(h.identificarPaciente),u.openDialog(11))):(u.closeCommandBar(),u.openDialog(17),console.log("Alguns dados da pulseira estão incorretos"))}).setVisibility(!0)]);var D=(new t("modalTermometro","modalTermometro")).setCssClass("modalScene-termometro").setTemplate("<span class='temp_termometro'>35.7º</span>");D.registerActions([(new n("btn-largar_termometro","Fechar termômetro")).setCssClass("action-largar_termometro").onClick(function(){u.closeModalScene("modalTermometro")}).setVisibility(!0)]);var P=(new t("modalMedidor_pressao","modalMedidor_pressao")).setCssClass("modalScene-medidorPressao").setTemplate("<span class='pressao'>160x100 mmHg</span>");P.registerActions([(new n("btn-largar_medidor_pressao","Fechar medidor de pressão")).setCssClass("action-largar_medidor_pressao").onClick(function(){u.closeModalScene("modalMedidor_pressao")}).setVisibility(!0)]);var H=(new t("modalOximetro","Oxímetro")).setCssClass("modalScene-oximetro").setTemplate("<span class='oximetro-st-text'>97% Sat.O2</span><span class='oximetro-fc-text'>69 bpm</span>");H.registerActions([(new n("btn-largar_oximetro","Fechar Oxímetro")).setCssClass("action-largar_oximetro").onClick(function(){u.closeModalScene("modalOximetro")}).setVisibility(!0)]);var B=(new t("freqRespiratoria","Frequência Respiratória")).setCssClass("modalScene-freqRespiratoria");B.registerActions([(new n("btn-largar_relogio","Fechar Relógio")).setCssClass("action-largar_relogio").onClick(function(){c.close(),u.closeModalScene("freqRespiratoria"),v.stop()}).setVisibility(!0)]),m.setSetupScript(function(){c.setFr(17),f.setNameRegExp(/joão manoel ribeiro/),f.setLeitoRegExp(/0*2/),f.setDataRegExp(/07\/06\/1956/),l.setNome("João Manoel Ribeiro"),l.setSexo("M"),l.setEstadoCivil("Casado"),l.setDataNascimento("07/06/1956"),l.setIdade("58 anos"),l.setProfissao("Comerciante"),l.setPai("Joaquim Ribeiro"),l.setMae("Adelaide Moraes Ribeiro"),l.setAlergiaMedicamentosa(!0,"Dipirona"),l.setDisableAlergiaMedicamentosa(!0),l.setDataInternacao("15/03/2015"),l.setLeito("02 - Enfermaria Masculina"),l.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)"),l.setHipotese("Crise hipertensiva"),l.setObservacoes(""),l.setPeso("87"),l.setAltura("1,62"),l.setCircunferenciaAbdominal("115"),l.setPrescMedicaRowData(0,"","Captopril","Oral","comp 75 mg","2x dia",!1,!0),l.setPrescMedicaRowData(1,"","Ácido acetilsalicílico (AAS)","Oral","comp 100 mg","1x dia",!1,!0),l.setPrescMedicaRowData(2,"","","","","",!1,!0),l.setPrescMedicaRowData(3,"","","","","",!1,!0),l.setSsvvRowData(0,"","","","","","",!1),l.setSsvvRowRegExp(0,new RegExp("15/03"),new RegExp("160x100"),new RegExp("69"),new RegExp("17"),new RegExp("97"),new RegExp("35.7")),l.setSsvvRowData(1,"","","","","","",!0),l.setAnotacaoEnfermagemRowData("",""),l.clearPrescEnfermagemState(),l.setPrescEnfermagemState("vazio")}),m.registerScene(E),m.registerScene(x),m.registerScene(N),m.registerScene(C),m.registerScene(k),m.registerScene(L),m.registerModalScene(_),m.registerModalScene(M),m.registerModalScene(B),m.registerModalScene(A),m.registerModalScene(D),m.registerModalScene(P),m.registerModalScene(H),m.registerFlag(new o("conversar_recepcionista",!1)),m.registerFlag(new o("conversar_mentor",!1)),m.registerFlag(new o("passagem_corredor",0)),m.registerFlag(new o("passagem_sala-de-leitos",0)),m.registerFlag(new o("visita-leito",0)),m.registerFlag(new o("pulseira",!1)),m.registerFlag(new o("lavar-maos",0)),m.registerFlag(new o("lavar-maosDepois",!1)),m.registerFlag(new o("lavar-maosDepoisScore",!1)),m.registerFlag(new o("pegou_bandeja",!1)),m.registerFlag(new o("termometro",!1)),m.registerFlag(new o("medidor-pressao",!1)),m.registerFlag(new o("oximetro",!1)),m.registerFlag(new o("relogio",!1)),m.registerFlag(new o("conversouPacienteSegundaVez",!1)),m.registerFlag(new o("score_checar_pulseira",!1)),m.registerFlag(new o("mediuTemperatura",!1)),m.registerFlag(new o("mediuPressao",!1)),m.registerFlag(new o("mediuFreqRespiratoria",!1)),m.registerFlag(new o("mediuBatimentosESaturacao",!1)),m.setInitialScene(0),e.registerLevel(m,1),console.groupEnd()});