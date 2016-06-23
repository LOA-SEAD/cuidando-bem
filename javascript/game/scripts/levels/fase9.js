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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData","Ficha"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){function O(){console.log("Funcao: recepcao_ir_corredor"),u.changeScene(1)}function M(){u.openDialog(0)}function _(){u.changeScene(2)}function D(){u.flag("score_pegou_medicamento")==0&&u.flag("score_ir_posto_hora_errada")==0&&(u.registerScoreItem(h.irPostoEnfermagemHoraErrada),u.flag("score_ir_posto_hora_errada",!0)),u.changeScene(5)}function P(){u.flag("score_ir_ala_feminina_hora_errada")==0&&(u.registerScoreItem(h.irAlaFemininaHoraErrada),u.flag("score_ir_ala_feminina_hora_errada",!0)),u.changeScene(7)}function H(){u.flag("score_viu_prontuario")==0&&u.flag("score_ir_farmacia_hora_errada")==0&&(u.registerScoreItem(h.irFarmaciaHoraErrada),u.flag("score_ir_farmacia_hora_errada",!0)),u.changeScene(4)}function B(){u.flag("levou_yuri_centro_cirurgico")==0?(u.flag("score_ir_centro_cirurgico_hora_errada")==0&&(u.registerScoreItem(h.irCentroCirurgicoHoraErrada),u.flag("score_ir_centro_cirurgico_hora_errada",!0)),u.changeScene(6)):(u.flag("entrou_centro_cirurgico",!0),u.changeScene(8))}function j(){console.log("Funcao: farmacia_ir_corredor"),console.log("Ir ao corredor"),u.flag("ja_falou_farmaceutico")==1&&u.flag("score_conferiu_medicacao")==0&&u.flag("score_nao_conferiu_medicacao")==0&&(u.registerScoreItem(h.naoConferirMedicacao),u.flag("score_nao_conferiu_medicacao",!0)),u.changeScene(1)}var d=require("DialogsData").fase9,v=require("DialogsData").alertas,h=require("ScoresData").fase9,m=require("Player"),g=new r("Level 9");g.setMaxPoints(h._sum),console.groupCollapsed(g.getName());var y,b,w,E,S,x,T,N,C,k,L,A;y=a.scenes.recepcao.getClone().onLoad(function(){console.log("Load scene: "+y.getName()),u.flag("conversar_recepcionista")==0&&(u.flag("conversar_recepcionista",!0),u.openDialog(0))}),y.registerInteractiveObjects([(new s("intObj-conversar_recepcionista","Recepcionista")).setCssClass("intObj-talkToReceptionist").onClick(M).setVisibility(!0),(new s("io-ir_corredor_esquerda","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-left no-glow").onClick(O).setVisibility(!0),(new s("io-ir_corredor_direita","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-right no-glow").onClick(O).setVisibility(!0)]),y.registerDialogs([(new i(a.characters.recepcionista)).setText(d.recepcao[0]).registerOption("",function(){u.closeDialog()})]),b=a.scenes.corredor.getClone().onLoad(function(){u.openCommandBar(),u.setActionVisible("btn-ir_recepcao",!0),console.log("Entrando no corredor"),m.stopAll(),m.play(m.audios.sfx.abrirPorta),m.playInLoop(m.audios.loops.recepcao)}).onUnload(function(){console.log("Saindo do corredor"),m.stopAll(),m.play(m.audios.sfx.abrirPorta),m.playInRange(m.audios.musics.inGame)}),b.registerActions([(new n("btn-ir_recepcao","Voltar para a recepção")).setCssClass("action-voltarRecepcao").onClick(function(){u.changeScene(0)}).setVisibility(!0)]),b.registerInteractiveObjects([(new s("io-ir_sala_leitos","Ir à Enfermaria Masculina")).setCssClass("intObj-goToBedroom").onClick(_).setVisibility(!0),(new s("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem")).setCssClass("intObj-goToNursingStation").onClick(D).setVisibility(!0),(new s("io-ir_ala_feminina","Ir à Enfermaria Feminina")).setCssClass("intObj-goToAlaFeminina").onClick(P).setVisibility(!0),(new s("io-ir_farmacia","Ir à Farmácia")).setCssClass("intObj-goToPharmacy").onClick(H).setVisibility(!0),(new s("io-ir_centro_cirurgico","Ir ao Centro Cirurgico")).setCssClass("intObj-goToCentroCirurgico").onClick(B).setVisibility(!0)]),w=(new t("salaDeLeitos","scene-salaDeLeitos")).setCssClass("scene-bedroom-level8").onLoad(function(){console.log("Load scene: Ala Masculina"),u.flag("ja_falou_paciente")==1&&u.openCommandBar(),u.flag("ja_falou_paciente")==0&&(u.flag("ja_falou_paciente",!0),u.openDialog(0)),u.flag("pegou_copo")==1&&u.flag("pegou_agua")==1&&u.flag("levou_yuri_centro_cirurgico")==0&&(u.setActionVisible("btn-lavarMaos",!0),u.setInteractiveObjectVisible("io-ir_leito",!0),u.openCommandBar()),u.flag("levou_yuri_centro_cirurgico")==1&&(u.setInteractiveObjectVisible("io-ir_leito",!1),u.setActionVisible("btn-ler_prontuario",!1),u.setActionVisible("btn-lavarMaos",!1),u.changeSceneCssClassTo("scene-bedroom-level8b"))}).onUnload(function(){console.log("Ala Masculina: OnUnload"),u.closeCommandBar()}),w.registerInteractiveObjects([(new s("io-ir_corredor","Ir ao Corredor")).setCssClass("intObj-bedroomToHallway").onClick(function(){u.changeScene(1)}).setVisibility(!0),(new s("io-ir_leito","Ir ao leito")).setCssClass("intObj-irLeitoEsquerda").onClick(function(){u.flag("score_lavar_maos_antes_leito")==0&&u.flag("score_nao_lavar_maos_antes_leito")==0&&(u.registerScoreItem(h.naoLavarMaosAntesLeito),u.flag("score_nao_lavar_maos_antes_leito",!0)),u.changeScene(3)}).setVisibility(!1)]),w.registerActions([(new n("btn-ler_prontuario","Ler prontuario")).setCssClass("action-ler_prontuario").onClick(function(){console.log("Action: ler prontuario"),u.flag("score_viu_prontuario")==0&&(u.registerScoreItem(h.verProntuario),u.flag("score_viu_prontuario",!0)),l.open(),u.openModalScene("Prontuario")}).setVisibility(!0),(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){console.log("Action: Lavar as mãos"),m.play(m.audios.sfx.lavarMaos),u.flag("score_lavar_maos_antes_leito")==0&&(u.registerScoreItem(h.lavarMaosAntesLeito),u.flag("score_lavar_maos_antes_leito",!0))}).setVisibility(!1)]),w.registerDialogs([(new i(a.characters.jogador)).setText(d.alaMasculina[0]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.pacientes.yuri)).setText(d.alaMasculina[1]).registerOption("",function(){u.openDialog(2)}),(new i(a.characters.jogador)).setText(d.alaMasculina[2]).registerOption("",function(){u.openDialog(3)}),(new i(a.characters.pacientes.yuri)).setText(d.alaMasculina[3]).registerOption("",function(){u.openDialog(4)}),(new i(a.characters.jogador)).setText(d.alaMasculina[4]).registerOption("",function(){u.openDialog(5)}),(new i(a.characters.pacientes.yuri)).setText(d.alaMasculina[5]).registerOption("",function(){u.openDialog(6)}),(new i(a.characters.jogador)).setText(d.alaMasculina[6]).registerOption("",function(){u.closeDialog()})]),E=a.scenes.leitos.yuri.getClone().onLoad(function(){u.openCommandBar(),console.log("Leito: Onload"),u.flag("score_pegou_agua")==1&&u.flag("score_pegou_copo")==1&&u.setActionVisible("btn-oferecer_copo",!0),u.flag("score_pegou_medicamento")==1&&u.setActionVisible("btn-administrar_medicamento",!0)}).onUnload(function(){console.log("Leito: OnUnload"),u.closeCommandBar()}),E.registerInteractiveObjects([(new s("io-pulseira_paciente","Checar pulseira do paciente")).setCssClass("intObj-paciente_09-checar_pulseira").onClick(function(){console.log("IO: pulseira_paciente"),u.flag("score_verificar_pulseira")==0&&(u.flag("score_verificar_pulseira",!0),u.registerScoreItem(h.verificarPulseira)),u.openModalScene("pulseira"),f.open()}).setVisibility(!0),(new s("io-conversar_paciente09","Falar com o paciente")).setCssClass("intObj-conversar_paciente").onClick(function(){u.openDialog(0),u.closeCommandBar()}).setVisibility(!0)]),E.registerDialogs([(new i(a.characters.jogador)).setText(d.leitoPaciente[0]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.pacientes.yuri)).setText(d.leitoPaciente[1]).registerOption("",function(){u.openDialog(2)}),(new i(a.characters.jogador)).setText(d.leitoPaciente[2]).registerOption("",function(){u.closeDialog()}),(new i(a.characters.jogador)).setText(d.leitoPaciente[3]).registerOption("",function(){u.closeDialog()})]),E.registerActions([(new n("btn-oferecer_copo","Oferecer copo com água para o paciente")).setCssClass("action-copo_descartavel").onClick(function(){console.log("Action: Oferecer copo com água para o paciente"),u.flag("score_ofereceu_copo")==0&&(u.registerScoreItem(h.oferecerCopo),u.flag("score_ofereceu_copo",!0))}).setVisibility(!0),(new n("btn-administrar_medicamento","Administrar o medicamento")).setCssClass("action-midazolam_medicamento").onClick(function(){console.log("Action: Administrar o medicamento"),u.flag("score_ofereceu_copo")==0&&u.flag("score_nao_ofereceu_copo")==0&&(u.registerScoreItem(h.naoOferecerCopo),u.flag("score_nao_ofereceu_copo",!0)),u.flag("score_administrou_medicamento")==0&&(u.registerScoreItem(h.administrarMedicamento),u.flag("score_administrou_medicamento",!0))}).setVisibility(!1),(new n("btn-anotarProntuario","Anotar prontuario")).setCssClass("action-anotar_prontuario").onClick(function(){console.log("Action: Anotar prontuario"),u.flag("score_administrou_medicamento")==0&&u.flag("score_nao_administrou_medicamento")==0&&(u.registerScoreItem(h.naoAdministrarMedicamento),u.flag("score_nao_administrou_medicamento",!0)),u.flag("score_anotar_prontuario")==0&&(u.registerScoreItem(h.anotarProntuario),u.flag("score_anotar_prontuario",!0)),l.open(),u.openModalScene("Prontuario")}).setVisibility(!0),(new n("btn-ir_sala_leitos","Ir para sala de leitos")).setCssClass("action-ir_sala_de_leitos").onClick(function(){console.log("Action: Voltar para a ala masculina"),u.flag("score_anotar_prontuario")==0&&u.flag("score_nao_anotar_prontuario")==0&&(u.registerScoreItem(h.naoAnotarProntuario),u.flag("score_nao_anotar_prontuario",!0)),u.changeScene(2)}).setVisibility(!1)]),S=(new t("farmacia","scene-pharmacy")).setCssClass("scene-pharmacy").onLoad(function(){console.log("Load scene: Ala Masculina"),u.flag("ja_falou_farmaceutico")==1&&(u.setInteractiveObjectVisible("io-midazolam_medicamento",!u.flag("score_pegou_medicamento")),u.setActionVisible("btn-conferir_midazolam",!0),u.openCommandBar()),u.flag("score_viu_prontuario")==1&&u.flag("ja_falou_farmaceutico")==0&&(u.flag("ja_falou_farmaceutico",!0),u.openDialog(0))}).onUnload(function(){console.log("Ala Masculina: OnUnload")}),S.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){j()}).setVisibility(!0),(new n("btn-conferir_midazolam","Conferir Medicamento")).setCssClass("action-midazolam_medicamento").onClick(function(){console.log("Action: Conferir Medicamento"),u.flag("score_pegou_medicamento")==0&&u.flag("score_nao_pegou_medicamento")==0&&(u.registerScoreItem(h.naoPegarMedicamento),u.flag("score_nao_pegou_medicamento",!0)),u.flag("score_conferiu_medicacao")==0&&(u.registerScoreItem(h.conferirMedicacao),u.flag("score_conferiu_medicacao",!0)),u.openModalScene("conferirMidazolam")}).setVisibility(!1)]),S.registerInteractiveObjects([(new s("io-midazolam_medicamento","Pegar Medicamento")).setCssClass("intObj-midazolam_medicamento").onClick(function(){console.log("Action: Pegar Medicamento"),m.play(m.audios.sfx.pegarObjeto),u.registerScoreItem(h.pegarMedicamento),u.flag("score_pegou_medicamento",!0),u.setInteractiveObjectVisible("io-midazolam_medicamento",!1),u.setActionVisible("btn-conferir_midazolam",!0)}).setVisibility(!1)]),S.registerDialogs([(new i(a.characters.paulo)).setText(d.farmacia[0]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.jogador)).setText(d.farmacia[1]).registerOption("",function(){u.openDialog(2)}),(new i(a.characters.paulo)).setText(d.farmacia[2]).registerOption("",function(){u.closeDialog(),u.setInteractiveObjectVisible("io-midazolam_medicamento",!0),u.openCommandBar()})]),x=a.scenes.postoDeEnfermagem.getClone().onLoad(function(){console.log("Load scene: Posto de enfermagem"),u.openCommandBar(),u.flag("score_pegou_medicamento")==1&&(u.setActionVisible("btn-lavarMaos",!0),u.openCommandBar())}).onUnload(function(){console.log("Posto de enfermagem: OnUnload"),u.closeCommandBar()}),x.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),u.flag("score_pegou_medicamento")==1&&(u.flag("score_pegou_agua")==0&&u.flag("score_nao_pegou_agua")==0&&(u.registerScoreItem(h.naoPegarAguaPotavel),u.flag("score_nao_pegou_agua",!0)),u.flag("score_pegou_copo")==0&&u.flag("score_nao_pegou_copo")==0&&(u.registerScoreItem(h.naoPegarCopoDescartavel),u.flag("score_nao_pegou_copo",!0))),u.changeScene(1)}).setVisibility(!0),(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){console.log("Action: lavarMaos"),m.play(m.audios.sfx.lavarMaos),u.flag("score_lavar_maos_posto_enfermagem")==0&&(u.registerScoreItem(h.lavarMaosPostoEnfermagem),u.flag("score_lavar_maos_posto_enfermagem",!0))}).setVisibility(!1)]),x.registerInteractiveObjects([(new s("io-abrirGaveta","Abrir gaveta")).setCssClass("intObj-openDrawer").onClick(function(){u.flag("pegou_bandeja")!=1?u.openDialog(1):(console.log("Action: abrirGaveta"),m.play(m.audios.sfx.abrirGaveta),u.openModalScene("gaveta"),u.openCommandBar())}).setVisibility(!0),(new s("io-pegar_bandeja","Pegar bandeja")).setCssClass("intObj-bandeja").onClick(function(){console.log("Action: Pegar bandeja"),m.play(m.audios.sfx.pegarObjeto),u.flag("pegou_bandeja",!0),u.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),x.registerDialogs([(new i(a.characters.mentor)).setText(v.esqueceu.pegarBandeja).registerOption("",function(){u.closeDialog()})]),centroCirurgico=a.scenes.centroCirurgico.getClone().onLoad(function(){console.log("Load scene: Centro cirurgico"),u.openCommandBar()}).onUnload(function(){console.log("Centro cirurgico: OnUnload"),u.closeCommandBar()}),centroCirurgico.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),u.changeScene(1)}).setVisibility(!0)]),N=a.scenes.alaFeminina.getClone().setCssClass("scene-bedroom-level7").onLoad(function(){console.log("Load scene: Ala feminina")}).onUnload(function(){console.log("Ala feminina: OnUnload")}),N.registerInteractiveObjects([(new s("io-ir_corredor","Ir ao Corredor")).setCssClass("intObj-bedroomToHallway").onClick(function(){u.changeScene(1)}).setVisibility(!0)]),C=a.scenes.centroCirurgicoYuri.getClone().onLoad(function(){console.log("Load scene: Centro cirurgico Yuri"),u.closeCommandBar(),u.openDialog(0),u.setInteractiveObjectVisible("io-carrinho_anestesico",!0)}).onUnload(function(){console.log("Centro cirurgico: OnUnload"),u.closeCommandBar()}),C.registerInteractiveObjects([(new s("io-conversar_circulante","Conversar com Circulante")).setCssClass("intObj-talkToCirculante").onClick(function(){u.openDialog(0)}).setVisibility(!0),(new s("io-carrinho_anestesico","Testar Equipamentos")).setCssClass("intObj-carrinho_anestesico").onClick(function(){m.play(m.audios.sfx.bip),u.flag("score_testou_equipamentos")==0&&(u.registerScoreItem(h.testarEquipamentos),u.flag("score_testou_equipamentos",!0))}).setVisibility(!1)]),C.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),u.changeScene(1)}).setVisibility(!0),(new n("btn-lavar_maos_cirurgia","Lavar as mãos técnica cirúrgica")).setCssClass("action-lavar_maos_escova").onClick(function(){console.log("Action: Lavar as mãos técnica cirúrgica"),m.play(m.audios.sfx.lavarMaos),u.flag("score_lavar_maos_tecnica_cirurgica")==0&&(u.registerScoreItem(h.lavarMaosTecnicaCirurgica),u.flag("score_lavar_maos_tecnica_cirurgica",!0))}).setVisibility(!0),(new n("btn-mudar_posicao_paciente","Mudar posição do paciente")).setCssClass("action-mudar_posicao_paciente").onClick(function(){console.log("Action: Mudar posição do paciente"),m.play(m.audios.sfx.roupaRocando),u.flag("score_fez_lista_verificacao")==0&&u.flag("score_nao_fez_lista_verificacao")==0&&(u.registerScoreItem(h.naoFazerListaVerificacao),u.flag("score_nao_fez_lista_verificacao",!0)),u.flag("score_mudou_posicao_paciente")==0&&(u.registerScoreItem(h.mudarPosicaoPaciente),u.flag("score_mudou_posicao_paciente",!0))}).setVisibility(!0),(new n("btn-colocar_placa","Colocar placa neutra")).setCssClass("action-placa_neutra").onClick(function(){console.log("Action: Colocar placa neutra"),u.flag("score_mudou_posicao_paciente")==0&&u.flag("score_nao_mudou_posicao_paciente")==0&&(u.registerScoreItem(h.naoMudarPosicaoPaciente),u.flag("score_nao_mudou_posicao_paciente",!0)),u.flag("score_colocou_placa_neutra")==0&&(u.registerScoreItem(h.colocarPlacaNeutra),u.flag("score_colocou_placa_neutra",!0))}).setVisibility(!0),(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){console.log("Action: Lavar as mãos"),m.play(m.audios.sfx.lavarMaos),u.flag("score_colocou_placa_neutra")==0&&u.flag("score_nao_colocou_placa_neutra")==0&&(u.registerScoreItem(h.naoColocarPlacaNeutra),u.flag("score_nao_colocou_placa_neutra",!0)),u.flag("score_lavar_maos_centro_cirurgico")==0&&(u.registerScoreItem(h.lavarMaosCentroCirurgico),u.flag("score_lavar_maos_centro_cirurgico",!0))}).setVisibility(!0),(new n("btn-anotarProntuario","Anotar prontuario")).setCssClass("action-anotar_prontuario").onClick(function(){console.log("Action: Anotar prontuario"),u.flag("score_lavar_maos_centro_cirurgico")==0&&u.flag("score_nao_lavar_maos_centro_cirurgico")==0&&(u.registerScoreItem(h.naoLavarMaosCentroCirurgico),u.flag("score_nao_lavar_maos_centro_cirurgico",!0)),u.flag("score_anotar_prontuario_centro_cirurgico")==0&&(u.registerScoreItem(h.anotarProntuarioCentroCirurgico),u.flag("score_anotar_prontuario_centro_cirurgico",!0)),l.open(),u.openModalScene("Prontuario")}).setVisibility(!0)]),C.registerDialogs([(new i(a.characters.jogador)).setText("").registerOption(d.centroCirurgico[0],function(){u.openDialog(1)}).registerOption(d.centroCirurgico[1],function(){u.openDialog(2)}).setRandomize(!0),(new i(a.characters.mentor)).setText(d.centroCirurgico[2]).registerOption("",function(){u.openDialog(0)}),(new i(a.characters.circulante)).setText(d.centroCirurgico[3]).registerOption("",function(){u.openDialog(3)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[4]).registerOption("",function(){u.openDialog(4)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[5]).registerOption("",function(){u.openDialog(5)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[6]).registerOption("",function(){u.openDialog(6)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[7]).registerOption("",function(){u.openDialog(7)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[8]).registerOption("",function(){u.openDialog(8)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[9]).registerOption("",function(){u.openDialog(9)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[10]).registerOption("",function(){u.openDialog(10)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[11]).registerOption("",function(){u.openDialog(11)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[12]).registerOption("",function(){u.openDialog(12)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[13]).registerOption("",function(){u.openDialog(13)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[14]).registerOption("",function(){u.openDialog(14)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[15]).registerOption("",function(){u.openDialog(15)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[16]).registerOption("",function(){u.openDialog(16)}),(new i(a.characters.pacientes.yuri)).setText(d.centroCirurgico[17]).registerOption("",function(){u.openDialog(17)}),(new i(a.characters.jogador)).setText(d.centroCirurgico[18]).registerOption("",function(){u.closeDialog(),u.openCommandBar()})]),k=new t("pulseira","pulseira"),k.registerInteractiveObjects([]),k.registerActions([(new n("btn-largar_pulseira","Fechar pulseira")).setCssClass("action-pulseira_paciente").onClick(function(){console.log("Ação: Fechar modal pulseira"),u.closeModalScene("Pulseira"),f.close()}).setVisibility(!0)]),L=new t("Prontuario","Prontuario"),L.registerActions([(new n("btn-fechar_prontuario","Fechar prontuário")).setCssClass("action-ler_prontuario").onClick(function(){console.log("Action: Fechar prontuario"),l.close(),u.flag("score_anotar_prontuario")==1&&u.flag("entrou_centro_cirurgico")==0&&(l.close(),u.closeModalScene("Prontuario"),u.openDialog(3),u.flag("levou_yuri_centro_cirurgico",!0),u.setActionVisible("btn-ir_sala_leitos",!0)),u.flag("entrou_centro_cirurgico")==1?(u.unlockLevel(10),u.closeCommandBar(),u.showEndOfLevel(),m.stopAll(),m.play(m.audios.sfx.missaoCumprida)):u.closeModalScene("Prontuario")}).setVisibility(!0)]),A=(new t("conferirMidazolam","Conferir Midazolam")).setCssClass("modalScene-midazolamMedicamento"),A.registerActions([(new n("btn-fechar_zoom","Finalizar conferição")).setCssClass("action-midazolam_medicamento").onClick(function(){console.log("Action: Finalizar conferição"),u.closeModalScene("conferirMidazolam")})]),gaveta=(new t("gaveta","Gaveta")).setCssClass("modalScene-drawer"),gaveta.registerActions([(new n("btn-fecharGaveta","Fechar gaveta")).setCssClass("action-fecharGaveta").onClick(function(){console.log("Action: fecharGaveta"),m.play(m.audios.sfx.fecharGaveta),u.closeModalScene("Gaveta")}).setVisibility(!0)]),gaveta.registerInteractiveObjects([(new s("io-copo_descartavel","Copo Descartável")).setCssClass("intObj-copoDescartavel").onClick(function(){console.log("IntObj: io-copo_descartavel"),m.play(m.audios.sfx.pegarObjeto),u.setInteractiveObjectVisible("io-copo_descartavel",!1),u.registerScoreItem(h.pegarCopoDescartavel),u.flag("pegou_copo",!0)}).setVisibility(!0),(new s("io-agua_potavel","Água Potável")).setCssClass("intObj-aguaPotavel").onClick(function(){console.log("IntObj: io-agua_potavel"),m.play(m.audios.sfx.pegarObjeto),u.setInteractiveObjectVisible("io-agua_potavel",!1),u.registerScoreItem(h.pegarAguaPotavel),u.flag("pegou_agua",!0)}).setVisibility(!0)]),g.registerScene(y),g.registerScene(b),g.registerScene(w),g.registerScene(E),g.registerScene(S),g.registerScene(x),g.registerScene(centroCirurgico),g.registerScene(N),g.registerScene(C),g.registerModalScene(k),g.registerModalScene(L),g.registerModalScene(A),g.registerModalScene(gaveta),g.setSetupScript(function(){f.setNameRegExp(/Yuri de Souza Almeida/),f.setLeitoRegExp(/0*1/),f.setDataRegExp(/16\/03\/1993/),f.setName("Yuri de Souza Almeida"),f.setLeito("01"),f.setData("16/03/1993"),f.disable(),l.setNome("Yuri de Souza Almeida"),l.setSexo("M"),l.setEstadoCivil("Solteiro"),l.setDataNascimento("16/03/1993"),l.setIdade("22 anos"),l.setProfissao("Estudante"),l.setPai("Miguel Augusto Briganti Almeida"),l.setMae("Mariana Soares Almeida"),l.setAlergiaMedicamentosa(!0,"Dipirona, sulfa."),l.setDisableAlergiaMedicamentosa(!0),l.setDataInternacao("27/09/2015"),l.setLeito("01 - Enfermaria masculina"),l.setAntecedentes(""),l.setHipotese("Cirurgia de reconstrução do ligamento cruzado anterior (LCA), no MMII direito."),l.setObservacoes("Acidente automobilístico."),l.setPeso("73"),l.setAltura("1,80"),l.setCircunferenciaAbdominal("90"),l.setPrescMedicaRowData(0,"","Midazolam","Oral","15 mg","01x/dia antes do procedimento cirúrgico",!1,!0),l.setPrescMedicaRowData(1,"","","","","",!1,!0),l.setPrescMedicaRowData(2,"","","","","",!1,!0),l.setPrescMedicaRowData(3,"","","","","",!1,!0),l.clearPrescEnfermagemState(),l.setPrescEnfermagemState("encaminhar_paciente_cc"),l.setPrescEnfermagemState("check_list_cirurgia"),l.setPrescEnfermagemState("placa_neutra"),l.setSsvvRowData(0,"","120x70","72","16","96","35,5",!0),l.setSsvvRowData(1,"","","","","","",!0),l.setAnotacaoEnfermagemRowData("",""),p.setEnfermeiraRegexp(/Masculina/i),p.setPacienteRegexp(/Yuri de Souza Almeida/i),p.setLeitoRegexp(/0?1/)}),g.registerFlag(new o("ja_falou_farmaceutico",!1)),g.registerFlag(new o("pegou_bandeja",!1)),g.registerFlag(new o("ja_falou_paciente",!1)),g.registerFlag(new o("ja_falou_paciente_leito",!1)),g.registerFlag(new o("levou_yuri_centro_cirurgico",!1)),g.registerFlag(new o("entrou_centro_cirurgico",!1)),g.registerFlag(new o("score_ir_posto_hora_errada",!1)),g.registerFlag(new o("score_ir_farmacia_hora_errada",!1)),g.registerFlag(new o("score_ir_ala_feminina_hora_errada",!1)),g.registerFlag(new o("score_ir_centro_cirurgico_hora_errada",!1)),g.registerFlag(new o("score_viu_prontuario",!1)),g.registerFlag(new o("score_nao_viu_prontuario",!1)),g.registerFlag(new o("score_pegou_medicamento",!1)),g.registerFlag(new o("score_nao_pegou_medicamento",!1)),g.registerFlag(new o("score_conferiu_medicacao",!1)),g.registerFlag(new o("score_nao_conferiu_medicacao",!1)),g.registerFlag(new o("score_lavar_maos_posto_enfermagem",!1)),g.registerFlag(new o("score_nao_lavar_maos_posto_enfermagem",!1)),g.registerFlag(new o("score_pegou_agua",!1)),g.registerFlag(new o("score_nao_pegou_agua",!1)),g.registerFlag(new o("score_pegou_copo",!1)),g.registerFlag(new o("score_nao_pegou_copo",!1)),g.registerFlag(new o("score_lavar_maos_antes_leito",!1)),g.registerFlag(new o("score_nao_lavar_maos_antes_leito",!1)),g.registerFlag(new o("score_verificar_pulseira",!1)),g.registerFlag(new o("score_nao_verificar_pulseira",!1)),g.registerFlag(new o("score_ofereceu_copo",!1)),g.registerFlag(new o("score_nao_ofereceu_copo",!1)),g.registerFlag(new o("score_administrou_medicamento",!1)),g.registerFlag(new o("score_nao_administrou_medicamento",!1)),g.registerFlag(new o("score_anotar_prontuario",!1)),g.registerFlag(new o("score_nao_anotar_prontuario",!1)),g.registerFlag(new o("score_lavar_maos_tecnica_cirurgica",!1)),g.registerFlag(new o("score_nao_lavar_maos_tecnica_cirurgica",!1)),g.registerFlag(new o("score_testou_equipamentos",!1)),g.registerFlag(new o("score_nao_testou_equipamentos",!1)),g.registerFlag(new o("score_fez_lista_verificacao",!1)),g.registerFlag(new o("score_nao_fez_lista_verificacao",!1)),g.registerFlag(new o("score_mudou_posicao_paciente",!1)),g.registerFlag(new o("score_nao_mudou_posicao_paciente",!1)),g.registerFlag(new o("score_colocou_placa_neutra",!1)),g.registerFlag(new o("score_nao_colocou_placa_neutra",!1)),g.registerFlag(new o("score_lavar_maos_centro_cirurgico",!1)),g.registerFlag(new o("score_nao_lavar_maos_centro_cirurgico",!1)),g.registerFlag(new o("score_anotar_prontuario_centro_cirurgico",!1)),g.registerFlag(new o("pegou_copo",!1)),g.registerFlag(new o("pegou_agua",!1)),g.registerFlag(new o("conversar_recepcionista",!1)),g.setInitialScene(0),e.registerLevel(g,9),console.groupEnd()});