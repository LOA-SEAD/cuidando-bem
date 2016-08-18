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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","ScoresData","EquipoGotejamento","Ficha"],function(e,o,a,r,i,s,t,n,c,l,g,_,p,u){function f(){0==n.flag("pegarFolheto9Certos")?n.openDialog(2):(n.closeDialog(),n.changeScene(1))}function m(){n.openDialog(0)}function d(){n.changeScene(2)}function b(){1==n.flag("score_conferiu_medicacao")?n.changeScene(5):(0==n.flag("score_viu_prontuario")?n.openDialog(0):n.openDialog(2),0==n.flag("score_ir_posto_enfermagem_hora_errada")&&(n.registerScoreItem(_.irPostoEnfermagemHoraErrada),n.flag("score_ir_posto_enfermagem_hora_errada",!0)))}function C(){1==n.flag("score_pegou_prescricao_medica")&&1==n.flag("falarComPaciente")?n.changeScene(4):(n.openDialog(0),0==n.flag("score_ir_farmacia_hora_errada")&&(n.registerScoreItem(_.irFarmaciaHoraErrada),n.flag("score_ir_farmacia_hora_errada",!0)))}function w(){n.openDialog(1),0==n.flag("score_ir_ala_feminina")&&(n.registerScoreItem(_.irAlaFeminina),n.flag("score_ir_ala_feminina",!0))}function v(){0==n.flag("score_conferiu_medicacao")?(0==n.flag("score_nao_conferiu_medicacao")&&(n.registerScoreItem(_.naoConferirMedicamento),n.flag("score_nao_conferiu_medicacao",!0)),n.openDialog(4)):n.changeScene(1)}var h=require("DialogsData").fase5,S=require("DialogsData").alertas,_=require("ScoresData").fase5,O=require("Player"),j=new r("Level 5");j.setMaxPoints(_._sum);var M,V,D,I,y,F,P,x,k,A;M=c.scenes.recepcao.getClone().onLoad(function(){0==n.flag("conversar_recepcionista")&&(n.flag("conversar_recepcionista",!0),n.openDialog(0))}),M.registerDialogs([new i(c.characters.jogador).setText(h.recepcao[0]).registerOption("",function(){n.openDialog(1)}),new i(c.characters.recepcionista).setText(h.recepcao[1]).registerOption("",function(){n.closeDialog(1),n.setInteractiveObjectVisible("io-ir_corredor_esquerda",!0),n.setInteractiveObjectVisible("io-ir_corredor_direita",!0)}),new i(c.characters.recepcionista).setText(S.esqueceu.folheto9certos).registerOption("",function(){n.closeDialog()})]),M.registerInteractiveObjects([new s("intObj-conversar_recepcionista","Conversar com a Recepcionista").setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(m),new s("io-ir_corredor_esquerda","Ir ao corredor").setCssClass("intObj-lobbyToHallway-left no-glow").onClick(f).setVisibility(!0),new s("io-ir_corredor_direita","Ir ao corredor").setCssClass("intObj-lobbyToHallway-right no-glow").onClick(f).setVisibility(!0),new s("io-pegar_folheto_dos_9_certos","Pegar Folheto dos 9 Certos").setCssClass("intObj-9certos").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-pegar_folheto_dos_9_certos",!1),n.flag("pegarFolheto9Certos",!0),n.openModalScene("noveCertosMedicacao")}).setVisibility(!0)]),V=c.scenes.corredor.getClone().onLoad(function(){n.openCommandBar(),n.setActionVisible("btn-ir_recepcao",!0),O.stopAll(),O.play(O.audios.sfx.abrirPorta),O.playInLoop(O.audios.loops.recepcao)}).onUnload(function(){O.stopAll(),O.play(O.audios.sfx.abrirPorta),O.playInRange(O.audios.musics.inGame)}),V.registerActions([new a("btn-ir_recepcao","Voltar para a recepção").setCssClass("action-voltarRecepcao").onClick(function(){n.changeScene(0)}).setVisibility(!0)]),V.registerInteractiveObjects([new s("io-ir_sala_leitos","Ir à Enfermaria Masculina").setCssClass("intObj-goToBedroom").onClick(d).setVisibility(!0),new s("io-ir_posto_enfermagem","Ir ao Posto de Enfermagem").setCssClass("intObj-goToNursingStation").onClick(b).setVisibility(!0),new s("io-ir_farmacia","Ir à Farmácia").setCssClass("intObj-goToPharmacy").onClick(C).setVisibility(!0),new s("io-ir_ala_feminina","Ir à Enfermaria Feminina").setCssClass("intObj-goToAlaFeminina").onClick(w).setVisibility(!0)]),V.registerDialogs([new i(c.characters.mentor).setText(S.perdido.farmacia).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(S.perdido.alaFeminina).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(S.perdido.enfermagem[1]).registerOption("",function(){n.closeDialog()})]),D=new o("alaMasculina","scene-alaMasculina").setCssClass("scene-bedroom-level4").onLoad(function(){n.setInteractiveObjectVisible("io-ir_corredor",!0),n.setActionVisible("btn-ler_prontuario",!0),0==n.flag("score_falou_com_mentor")?n.openDialog(0):(n.setActionVisible("btn-lavarMaos",!0),n.setInteractiveObjectVisible("io-ir_leito",!0),n.setInteractiveObjectVisible("io-falar_com_paciente",!1),n.openCommandBar())}).onUnload(function(){n.closeCommandBar()}),D.registerActions([new a("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){O.play(O.audios.sfx.lavarMaos),0==n.flag("score_lavar_maos_antes_leito")&&(n.registerScoreItem(_.lavarMaosAntesLeito),n.flag("score_lavar_maos_antes_leito",!0))}).setVisibility(!1),new a("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){0==n.flag("score_viu_prontuario")&&(n.registerScoreItem(_.checarProntuario),n.flag("score_viu_prontuario",!0)),O.play(O.audios.sfx.pegarObjeto),0==n.flag("score_pegou_prescricao_medica")&&(n.registerScoreItem(_.pegarPrescricaoMedica),n.flag("score_pegou_prescricao_medica",!0)),g.open("prescMedica"),n.openModalScene("Prontuario")}).setVisibility(!0)]),D.registerDialogs([new i(c.characters.jogador).setText(h.alaMasculina[0]).registerOption("",function(){n.closeDialog()}),new i(c.characters.pacientes.pedroUnknow).setText(h.alaMasculina[1]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.jogador).setText("").registerOption(h.alaMasculina[2],function(){n.closeDialog(),n.openCommandBar()}).registerOption(h.alaMasculina[3],function(){n.openDialog(3)}).registerOption(h.alaMasculina[4],function(){n.openDialog(4)}).setRandomize(!0),new i(c.characters.mentor).setText(h.alaMasculina[5]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.mentor).setText(h.alaMasculina[6]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.mentor).setText(S.esqueceu.verProntuario[0]).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(S.lavarMaos.tipo1).registerOption("",function(){n.closeDialog()})]),D.registerInteractiveObjects([new s("io-ir_leito","Ir ao leito").setCssClass("intObj-ir_leito-fase4").onClick(function(){0==n.flag("score_lavar_maos_antes_leito")?(n.openDialog(6),0==n.flag("score_nao_lavar_maos_antes_leito")&&(n.registerScoreItem(_.naoLavarMaosAntesLeito),n.flag("score_nao_lavar_maos_antes_leito",!0))):n.changeScene(3)}).setVisibility(!1),new s("io-falar_com_paciente","Falar com o paciente").setCssClass("intObj-ir_leito-fase4").onClick(function(){n.openDialog(1),n.flag("falarComPaciente",!0)}).setVisibility(!1),new s("io-ir_corredor","Ir ao Corredor").setCssClass("intObj-bedroomToHallway").onClick(function(){0==n.flag("score_pegou_prescricao_medica")?(0==n.flag("score_nao_pegou_prescricao_medica")&&(n.registerScoreItem(_.naoPegarPrescricaoMedica),n.flag("score_nao_pegou_prescricao_medica",!0)),0==n.flag("score_viu_prontuario")&&0==n.flag("score_nao_viu_prontuario")&&(n.registerScoreItem(_.naoChecarProntuario),n.flag("score_nao_viu_prontuario",!0)),n.openDialog(5)):n.changeScene(1)}).setVisibility(!0),new s("io-ler_prontuario","Ler prontuário").setCssClass("intObj-prontuario-leito1-fase4").onClick(function(){0==n.flag("score_viu_prontuario")&&(n.registerScoreItem(_.checarProntuario),n.flag("score_viu_prontuario",!0)),g.open(),n.openModalScene("Prontuario")}).setVisibility(!0)]),I=c.scenes.leitos.pedro.getClone().onLoad(function(){n.setInteractiveObjectVisible("io-pulseira_paciente",!0),n.setActionVisible("btn-ir_sala_leitos",!0),n.openDialog(0)}).onUnload(function(){}),I.registerDialogs([new i(c.characters.jogador).setText(h.leitoPaciente[0]).registerOption("",function(){n.openDialog(1)}),new i(c.characters.pacientes.pedro).setText(h.leitoPaciente[1]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.jogador).setText("").registerOption(h.leitoPaciente[2],function(){n.openDialog(3)}).registerOption(h.leitoPaciente[3],function(){n.openDialog(6)}).registerOption(h.leitoPaciente[4],function(){n.openDialog(7)}).setRandomize(!0),new i(c.characters.pacientes.pedro).setText(h.leitoPaciente[5]).registerOption("",function(){n.openDialog(4)}),new i(c.characters.jogador).setText(h.leitoPaciente[6]).registerOption("",function(){n.openDialog(5)}),new i(c.characters.mentor).setText(h.leitoPaciente[7]).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(h.leitoPaciente[8]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.mentor).setText(h.leitoPaciente[9]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.mentor).setText(S.esqueceu.erroGotejamento).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(S.esqueceu.verPulseira).registerOption("",function(){n.closeDialog()})]),I.registerInteractiveObjects([new s("io-pulseira_paciente","Checar pulseira do paciente").setCssClass("intObj-paciente_05-checar_pulseira").onClick(function(){n.openModalScene("Pulseira"),0==n.flag("checar_pulseira")&&(n.registerScoreItem(_.checarPulseira),n.flag("checar_pulseira",!0)),l.open(),n.openCommandBar()}).setVisibility(!0),new s("io-conversar_paciente05","Falar com o paciente").setCssClass("intObj-conversar_paciente").onClick(function(){n.openDialog(0)}).setVisibility(!0)]),I.registerActions([new a("btn-ir_sala_leitos","Ir para sala de leitos").setCssClass("action-ir_sala_de_leitos").onClick(function(){0==n.flag("score_checar_pulseira")&&0==n.flag("score_nao_checar_pulseira")&&(n.registerScoreItem(_.naoChecarPulseira),n.flag("score_nao_checar_pulseira",!0)),n.changeScene(2),l.disable()}).setVisibility(!0),new a("btn-pegar_suporte_soro","Pegar Suporte de Soro").setCssClass("action-pegarSuporte").onClick(function(){n.changeSceneCssClassTo("scene-bedChar05b"),n.setActionVisible("btn-pegar_suporte_soro",!1)}).setVisibility(!0),new a("btn-colocarSoro","Colocar Soro").setCssClass("action-soro_fisiologico_1000ml").onClick(function(){n.changeSceneCssClassTo("scene-bedChar05c"),n.setActionVisible("btn-colocarSoro",!1)}).setVisibility(!0),new a("btn-administrarMedicamento","Administrar medicamento").setCssClass("action-admnistrar_medicacao").onClick(function(){0==n.flag("checar_pulseira")?n.openDialog(9):0==n.flag("score_administrar_medicacao")&&(n.registerScoreItem(_.administrarMedicacao),n.flag("score_administrar_medicacao",!0))}).setVisibility(!0),new a("btn-realizarGotejamento","Realizar gotejamento de soro no equipo").setCssClass("action-colocarSoro").onClick(function(){0==n.flag("checar_pulseira")?n.openDialog(9):(0==n.flag("score_gotejar_soro_equipo")&&(n.registerScoreItem(_.gotejarSoroEquipo),n.flag("score_gotejar_soro_equipo",!0)),p.open(),n.openModalScene("equipoSoro"))}).setVisibility(!0),new a("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){O.play(O.audios.sfx.lavarMaos),0==n.flag("score_lavar_maos_antes_prontuario")&&(n.registerScoreItem(_.lavarMaosAntesProntuario),n.flag("score_lavar_maos_antes_prontuario",!0)),0==n.flag("score_gotejar_soro_equipo")&&0==n.flag("score_nao_gotejar_soro_equipo")&&(n.registerScoreItem(_.naoGotejarSoroEquipo),n.flag("score_nao_gotejar_soro_equipo",!0))}).setVisibility(!0),new a("btn-ler_prontuario","Anotar prontuario").setCssClass("action-ler_prontuario").onClick(function(){g.open(),n.openModalScene("Prontuario"),0==n.flag("score_lavar_maos_antes_prontuario")&&0==n.flag("score_nao_lavar_maos_antes_prontuario")&&(n.registerScoreItem(_.naoLavarMaosAntesProntuario),n.flag("score_nao_lavar_maos_antes_prontuario",!0))}).setVisibility(!0)]),farmacia=new o("farmacia","scene-pharmacy").setCssClass("scene-pharmacy").onLoad(function(){1==n.flag("ja_falou_farmaceutico")&&(n.setInteractiveObjectVisible("io-keflin_medicamento",!n.flag("score_pegou_medicamento")),n.setActionVisible("btn-keflinMedicamento",!0),n.openCommandBar()),1==n.flag("score_pegou_prescricao_medica")&&0==n.flag("ja_falou_farmaceutico")&&(n.flag("ja_falou_farmaceutico",!0),n.openDialog(0))}).onUnload(function(){n.closeCommandBar()}),farmacia.registerActions([new a("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){v()}).setVisibility(!0),new a("io-ler_prontuario","Ler prontuário").setCssClass("action-ler_prontuario").onClick(function(){g.open(),n.openModalScene("Prontuario")}).setVisibility(!0)]),farmacia.registerInteractiveObjects([new s("io-keflin_medicamento","Pegar Medicamento").setCssClass("intObj-keflin_medicamento").onClick(function(){O.play(O.audios.sfx.pegarObjeto),0==n.flag("score_pegou_medicamento")&&(n.registerScoreItem(_.pegarMedicamento),n.flag("score_pegou_medicamento",!0)),n.setActionVisible("btn-keflinMedicamento",!0),n.setInteractiveObjectVisible("io-keflin_medicamento",!1)}).setVisibility(!1)]),farmacia.registerActions([new a("btn-keflinMedicamento","Conferir Medicamento").setCssClass("action-keflin_medicamento").onClick(function(){0==n.flag("score_conferiu_medicacao")&&(n.registerScoreItem(_.conferirMedicamento),n.flag("score_conferiu_medicacao",!0)),n.openModalScene("conferirKeflin")}).setVisibility(!1)]),farmacia.registerDialogs([new i(c.characters.paulo).setText(h.farmacia[0]).registerOption("",function(){n.openDialog(1)}),new i(c.characters.jogador).setText(h.farmacia[1]).registerOption("",function(){n.openDialog(2)}),new i(c.characters.paulo).setText(h.farmacia[2]).registerOption("",function(){n.openDialog(3)}),new i(c.characters.jogador).setText(h.farmacia[3]).registerOption("",function(){n.closeDialog(),n.setInteractiveObjectVisible("io-keflin_medicamento",!0),n.openCommandBar()}),new i(c.characters.mentor).setText(S.esqueceu.verificarMedicamento3).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(h.lugarIncorreto[2]).registerOption("",function(){n.closeDialog(),n.changeScene(1)})]),y=c.scenes.postoDeEnfermagem.getClone().onLoad(function(){n.openCommandBar(),n.setActionVisible("btn-lavarMaos",!0),n.setActionVisible("btn-ir_corredor",!0),n.setActionVisible("btn-visualizarFolheto",!0),n.openDialog(0)}).onUnload(function(){n.closeCommandBar()}),y.registerActions([new a("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){0==n.flag("score_pegou_soro")||0==n.flag("score_pegou_algodao")||0==n.flag("score_pegou_luvas")||0==n.flag("score_pegou_seringa_5ml")||0==n.flag("score_pegou_ampola_soro")||0==n.flag("score_pegou_alcool")||0==n.flag("score_pegou_seringa_10ml")||0==n.flag("score_pegou_agulha")||0==n.flag("score_pegou_equipo_soro")?n.openDialog(4):1==n.flag("score_conferiu_medicacao_posto")&&1==n.flag("score_preparar_medicacao")&&1==n.flag("score_identificar_medicacao")?n.changeScene(1):n.openDialog(8)}).setVisibility(!0),new a("btn-lavarMaos","Lavar as mãos").setCssClass("action-lavarMaos").onClick(function(){O.play(O.audios.sfx.lavarMaos),0==n.flag("score_lavar_maos_posto_enfermagem")&&(n.registerScoreItem(_.lavarMaos),n.flag("score_lavar_maos_posto_enfermagem",!0))}).setVisibility(!0),new a("btn-confirmarMedicamento","Confirmar medicação com o mentor").setCssClass("action-keflin_medicamento").onClick(function(){0==n.flag("score_conferiu_medicacao_posto")&&(n.registerScoreItem(_.confirmarMedicacaoPosto),n.flag("score_conferiu_medicacao_posto",!0)),n.openModalScene("conferirKeflin")}).setVisibility(!1),new a("btn-prepararMedicacao","Preparar medicação").setCssClass("action-preparar_medicacao").onClick(function(){0==n.flag("score_preparar_medicacao")&&(n.registerScoreItem(_.prepararMedicacao),n.flag("score_preparar_medicacao",!0))}).setVisibility(!1),new a("btn-identificarMedicacao","Identificar medicação").setCssClass("action-fichaMedicacao").onClick(function(){u.open("soro",5),n.openModalScene("identificarMedicacao")}).setVisibility(!1),new a("btn-ler_prontuario","Ler prontuario").setCssClass("action-ler_prontuario").onClick(function(){O.play(O.audios.sfx.pegarObjeto),g.open("prescMedica"),n.openModalScene("Prontuario")}).setVisibility(!0),new a("btn-visualizarFolheto","Visualizar o folheto dos 9 certos").setCssClass("action-9certos").onClick(function(){n.openModalScene("noveCertosMedicacao")}).setVisibility(!1)]),y.registerDialogs([new i(c.characters.jogador).setText("").registerOption(h.postoDeEnfermagem[0],function(){0==n.flag("score_calculou_valor_medicamento")&&(n.registerScoreItem(_.calcularValorMedicamento),n.flag("score_calculou_valor_medicamento",!0)),n.closeDialog()}).registerOption(h.postoDeEnfermagem[1],function(){n.openDialog(1)}).registerOption(h.postoDeEnfermagem[2],function(){n.openDialog(1)}).setRandomize(!0),new i(c.characters.mentor).setText(h.postoDeEnfermagem[3]).registerOption("",function(){0==n.flag("score_calculou_errado_valor_medicamento")&&(n.registerScoreItem(_.calcularErradoValorMedicamento),n.flag("score_calculou_errado_valor_medicamento",!0)),n.openDialog(0)}),new i(c.characters.jogador).setText(h.postoDeEnfermagem[4]).registerOption("",function(){n.openDialog(3)}),new i(c.characters.mentor).setText(h.postoDeEnfermagem[5]).registerOption("",function(){n.openCommandBar(),n.closeDialog()}),new i(c.characters.mentor).setText(h.postoDeEnfermagem[6]).registerOption("",function(){n.openCommandBar(),n.closeDialog()}),new i(c.characters.mentor).setText(h.lugarIncorreto[0]).registerOption("",function(){n.closeDialog(),n.changeScene(1)}),new i(c.characters.mentor).setText(h.lugarIncorreto[1]).registerOption("",function(){n.closeDialog(),n.changeScene(1)}),new i(c.characters.mentor).setText(S.esqueceu.pegarBandeja).registerOption("",function(){n.closeDialog()}),new i(c.characters.mentor).setText(S.esqueceu.verificarTudoPostoEnfermagem).registerOption("",function(){n.closeDialog()})]),y.registerInteractiveObjects([new s("io-abrir_gaveta_esquerda","Abrir gaveta").setCssClass("intObj-openDrawer_left").onClick(function(){1!=n.flag("score_pegou_bandeja")?n.openDialog(7):(O.play(O.audios.sfx.abrirGaveta),0==n.flag("score_lavar_maos_posto_enfermagem")&&0==n.flag("score_nao_lavar_maos_posto_enfermagem")&&(n.registerScoreItem(_.naoLavarMaos),n.flag("score_nao_lavar_maos_posto_enfermagem",!0)),n.openModalScene("gaveta"),n.openCommandBar(),n.setInteractiveObjectVisible("io-soro",!n.flag("score_pegou_soro")),n.setInteractiveObjectVisible("io-algodao",!n.flag("score_pegou_algodao")),n.setInteractiveObjectVisible("io-luvas",!n.flag("score_pegou_luvas")),n.setInteractiveObjectVisible("io-seringa5ml",!n.flag("score_pegou_seringa_5ml")),n.setInteractiveObjectVisible("io-ampola_soro",!n.flag("score_pegou_ampola_soro")),n.setInteractiveObjectVisible("io-alcool",!n.flag("score_pegou_alcool")),n.setInteractiveObjectVisible("io-seringa10ml",!n.flag("score_pegou_seringa_10ml")),n.setInteractiveObjectVisible("io-agulha",!n.flag("score_pegou_agulha")),n.setInteractiveObjectVisible("io-equipo_soro",!n.flag("score_pegou_equipo_soro")))}).setVisibility(!0),new s("io-pegar_bandeja","Pegar bandeja").setCssClass("intObj-bandeja").onClick(function(){O.play(O.audios.sfx.pegarObjeto),0==n.flag("score_lavar_maos_posto_enfermagem")&&0==n.flag("score_nao_lavar_maos_posto_enfermagem")&&(n.registerScoreItem(_.naoLavarMaos),n.flag("score_nao_lavar_maos_posto_enfermagem",!0)),0==n.flag("score_pegou_bandeja")&&(n.registerScoreItem(_.pegarBandeja),n.flag("score_pegou_bandeja",!0)),n.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),equipoSoro=new o("equipoSoro","EquipamentoSoro");var q=0;equipoSoro.registerActions([new a("btn-fecharEquipoSoro","Fechar Equipamento de Soro").setCssClass("action-colocarSoro").onClick(function(){p.isValueRight()?(0==n.flag("score_gotejar_soro")&&(n.registerScoreItem(_.gotejarSoroEquipo),n.flag("score_gotejar_soro",!0)),p.close(),n.closeModalScene("equipoSoro")):(n.closeCommandBar(),n.openDialog(8),q+=1,3==q&&(n.registerScoreItem(_.naoGotejarSoroEquipo),q=-100))}).setVisibility(!0)]),F=new o("gaveta","Gaveta").setCssClass("modalScene-drawer"),F.registerActions([new a("btn-fecharGaveta","Fechar gaveta").setCssClass("action-fecharGaveta").onClick(function(){1==n.flag("score_pegou_soro")&&1==n.flag("score_pegou_algodao")&&1==n.flag("score_pegou_luvas")&&1==n.flag("score_pegou_seringa_5ml")&&1==n.flag("score_pegou_ampola_soro")&&1==n.flag("score_pegou_alcool")&&1==n.flag("score_pegou_seringa_10ml")&&1==n.flag("score_pegou_agulha")&&1==n.flag("score_pegou_equipo_soro")&&0==n.flag("score_falou_com_mentor")?(n.flag("pegou_todos_instrumentos",!0),n.flag("score_falou_com_mentor",!0),O.play(O.audios.sfx.fecharGaveta),n.closeModalScene("Gaveta"),n.openDialog(2),n.setActionVisible("btn-confirmarMedicamento",!0),n.setActionVisible("btn-prepararMedicacao",!0),n.setActionVisible("btn-identificarMedicacao",!0),n.setActionVisible("btn-visualizarFolheto",!1),n.setActionVisible("btn-lavarMaos",!1)):(n.flag("pegou_todos_instrumentos",!1),n.flag("score_falou_com_mentor",!1),O.play(O.audios.sfx.fecharGaveta),n.closeModalScene("Gaveta"),n.setActionVisible("btn-visualizarFolheto",!0),n.setActionVisible("btn-lavarMaos",!0))}).setVisibility(!0)]),F.registerInteractiveObjects([new s("io-soro","Pegar soro fisiológico 0,9% (100 ml)").setCssClass("intObj-soro_fisiologico_100_ml").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-soro",!1),0==n.flag("score_pegou_soro")&&(n.registerScoreItem(_.pegarSoroFisiologico),n.flag("score_pegou_soro",!0))}).setVisibility(!0),new s("io-algodao","Pegar algodão").setCssClass("intObj-algodao_seco").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-algodao",!1),0==n.flag("score_pegou_algodao")&&(n.registerScoreItem(_.pegarAlgodao),n.flag("score_pegou_algodao",!0))}).setVisibility(!0),new s("io-luvas","Pegar luvas de procedimento").setCssClass("intObj-luvas_de_procedimento_fase5").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-luvas",!1),0==n.flag("score_pegou_luvas")&&(n.registerScoreItem(_.pegarLuvas),n.flag("score_pegou_luvas",!0))}).setVisibility(!0),new s("io-seringa5ml","Pegar seringa de 5 ml").setCssClass("intObj-seringa_5_ml").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-seringa5ml",!1),0==n.flag("score_pegou_seringa_5ml")&&(n.registerScoreItem(_.pegarSeringa5),n.flag("score_pegou_seringa_5ml",!0))}).setVisibility(!0),new s("io-ampola_soro","Pegar ampola de soro Fisiológico 0,9% (10ml)").setCssClass("intObj-cloreto_de_sodio_20__10_ml_").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-ampola_soro",!1),0==n.flag("score_pegou_ampola_soro")&&(n.registerScoreItem(_.pegarAmpolaSF),n.flag("score_pegou_ampola_soro",!0))}).setVisibility(!0),new s("io-alcool","Pegar álcool 70%").setCssClass("intObj-frasco_de_alcool").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-alcool",!1),0==n.flag("score_pegou_alcool")&&(n.registerScoreItem(_.pegarAlcool),n.flag("score_pegou_alcool",!0))}).setVisibility(!0),new s("io-seringa10ml","Pegar seringa de 10 ml").setCssClass("intObj-seringa_de_10_ml_fase4").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-seringa10ml",!1),0==n.flag("score_pegou_seringa_10ml")&&(n.registerScoreItem(_.pegarSeringa10),n.flag("score_pegou_seringa_10ml",!0))}).setVisibility(!0),new s("io-agulha","Pegar agulha 40X12").setCssClass("intObj-agulha_40x12").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-agulha",!1),0==n.flag("score_pegou_agulha")&&(n.registerScoreItem(_.pegarAgulha),n.flag("score_pegou_agulha",!0))}).setVisibility(!0),new s("io-equipo_soro","Pegar equipo de soro macrogotas").setCssClass("intObj-equipo_de_soro_fase4").onClick(function(){O.play(O.audios.sfx.pegarObjeto),n.setInteractiveObjectVisible("io-equipo_soro",!1),0==n.flag("score_pegou_equipo_soro")&&(n.registerScoreItem(_.pegarEquipoSoroMacrogotas),n.flag("score_pegou_equipo_soro",!0))}).setVisibility(!0)]),P=new o("Prontuario","Prontuario").onLoad(function(){n.openCommandBar(),n.setActionVisible("btn-fechar_prontuario",!0),n.setActionVisible("btn-pegar_prescricao_medica",!0)}),P.registerActions([new a("btn-fechar_prontuario","Fechar prontuário").setCssClass("action-ler_prontuario").onClick(function(){1==n.flag("score_gotejar_soro_equipo")&&(n.unlockLevel(6),n.closeCommandBar(),n.showEndOfLevel(),O.stopAll(),O.play(O.audios.sfx.missaoCumprida)),n.closeModalScene("Prontuario"),1!=n.flag("score_viu_prontuario")||0!=n.flag("score_gotejar_soro_equipo")||n.flag("mostraPaciente")||(n.setInteractiveObjectVisible("io-falar_com_paciente",!0),n.flag("mostraPaciente",!0)),0==n.flag("score_anotou_prontuario")&&g.isDataValid()&&(n.registerScoreItem(_.anotarNoProntuario),n.flag("score_anotou_prontuario",!0)),g.close()}).setVisibility(!0)]),x=new o("Pulseira","Pulseira"),x.registerActions([new a("btn-largar_pulseira","Fechar pulseira").setCssClass("action-pulseira_paciente").onClick(function(){n.closeModalScene("Pulseira"),l.close(),0==n.flag("score_checar_pulseira")&&(n.registerScoreItem(_.checarPulseira),n.flag("score_checar_pulseira",!0))}).setVisibility(!0)]),k=new o("conferirKeflin","Conferir Keflin").setCssClass("modalScene-keflinMedicamento"),k.registerActions([new a("btn-fechar_zoom","Finalizar conferição").setCssClass("action-keflin_medicamento").onClick(function(){n.closeModalScene("conferirKeflin")})]),A=new o("noveCertosMedicacao","Visualizar o folheto dos 9 certos").setCssClass("modalScene-noveCertosMedicacao"),A.registerActions([new a("btn-fechar_zoom","Fechar folheto").setCssClass("action-9certos").onClick(function(){n.closeModalScene("noveCertosMedicacao")})]),fichaMedicacao=new o("identificarMedicacao","Identificar Medicação"),fichaMedicacao.registerActions([new a("btn-fecharFicha","Fechar ficha").setCssClass("action-fichaMedicacao").onClick(function(){n.closeModalScene("identificarMedicacao"),u.close(),u.isDataValid()&&0==n.flag("score_identificar_medicacao")&&(n.registerScoreItem(_.identificarMedicacao),n.flag("score_identificar_medicacao",!0))})]),j.registerScene(M),j.registerScene(V),j.registerScene(D),j.registerScene(I),j.registerScene(farmacia),j.registerScene(y),j.registerModalScene(x),j.registerModalScene(P),j.registerModalScene(F),j.registerModalScene(A),j.registerModalScene(k),j.registerModalScene(equipoSoro),j.registerModalScene(fichaMedicacao),j.setSetupScript(function(){g.setNome("Pedro Alcídes Mendonça"),g.setSexo("M"),g.setEstadoCivil("Solteiro"),g.setDataNascimento("03/06/1962"),g.setIdade("52 anos"),g.setProfissao("Professor"),g.setPai("Aldair Mendonça"),g.setMae("Ana Laura Alcídes Mendonça "),g.setAlergiaMedicamentosa(!1,""),g.setDisableAlergiaMedicamentosa(!0),g.setDataInternacao("10/10/2015"),g.setLeito("01 - Enfermaria Masculina"),g.setAntecedentes("Ausência"),g.setHipotese("Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório."),g.setObservacoes("Está no 2.º dia de uso de Cefalotina Sódica (Keflin®)"),g.setPeso("62"),g.setAltura("1,77"),g.setCircunferenciaAbdominal("91"),g.setPrescMedicaRowData(0,"","Cefalotina sódica (Keflin®)","Endovenosa","800 mg diluído em 100 ml de SF (soro fisiológico) 0,9% em 01 hora","6/6h",!1,!1),g.setPrescMedicaRowData(1,"","","","","",!1,!0),g.setPrescMedicaRowData(2,"","","","","",!1,!0),g.setPrescMedicaRowData(3,"","","","","",!1,!0),g.setPrescEnfermagemState(["risco_infeccao"]),g.setSsvvRowData(0,"","110x70","55","16","96","37.3",!0),g.setSsvvRowData(1,"","","","","","",!0),g.setAnotacaoEnfermagemRowData("",""),l.setNameRegExp(/^Pedro Alc(í|i)des Mendon(ç|c)a$/i),l.setLeitoRegExp(/0*1/),l.setDataRegExp(/03\/06\/1962/),l.setName("Pedro Alcides Mendonça"),l.setLeito("01"),l.setData("03/06/1962"),l.disable(),p.setRightValue(35),u.setEnfermeiraRegexp(/^Masculina$/i),u.setPacienteRegexp(/^Pedro Alc(í|i)des Mendon(ç|c)a$/i),u.setLeitoRegexp(/0?1/),u.setVolumeRegexp(/104/),u.setDuracao(1),u.setGotasRegexp(/34,66/),u.setGotasAproxRegexp(/35/)}),j.registerFlag(new t("pegarFolheto9Certos",!1)),j.registerFlag(new t("score_ir_posto_enfermagem_hora_errada",!1)),j.registerFlag(new t("score_ir_farmacia_hora_errada",!1)),j.registerFlag(new t("score_ir_ala_feminina",!1)),j.registerFlag(new t("score_viu_prontuario",!1)),j.registerFlag(new t("score_nao_viu_prontuario",!1)),j.registerFlag(new t("score_lavar_maos_antes_leito",!1)),j.registerFlag(new t("score_nao_lavar_maos_antes_leito",!1)),j.registerFlag(new t("ja_falou_farmaceutico",!1)),j.registerFlag(new t("score_pegou_medicamento",!1)),j.registerFlag(new t("score_nao_pegou_medicamento",!1)),j.registerFlag(new t("score_conferiu_medicacao",!1)),j.registerFlag(new t("score_pegou_prescricao_medica",!1)),j.registerFlag(new t("score_nao_conferiu_medicacao",!1)),j.registerFlag(new t("score_lavar_maos_posto_enfermagem",!1)),j.registerFlag(new t("score_nao_lavar_maos_posto_enfermagem",!1)),j.registerFlag(new t("score_pegou_bandeja",!1)),j.registerFlag(new t("score_pegou_soro",!1)),j.registerFlag(new t("score_pegou_algodao",!1)),j.registerFlag(new t("score_pegou_luvas",!1)),j.registerFlag(new t("score_pegou_seringa_5ml",!1)),j.registerFlag(new t("score_pegou_ampola_soro",!1)),j.registerFlag(new t("score_pegou_alcool",!1)),j.registerFlag(new t("score_pegou_seringa_10ml",!1)),j.registerFlag(new t("score_pegou_agulha",!1)),j.registerFlag(new t("score_pegou_equipo_soro",!1)),j.registerFlag(new t("score_nao_pegou_todos_instrumentos",!1)),j.registerFlag(new t("score_falou_com_mentor",!1)),j.registerFlag(new t("score_lavar_maos",!1)),j.registerFlag(new t("score_nao_pegou_prescricao_medica",!1)),j.registerFlag(new t("score_calculou_valor_medicamento",!1)),j.registerFlag(new t("score_calculou_errado_valor_medicamento",!1)),j.registerFlag(new t("score_checar_pulseira",!1)),j.registerFlag(new t("score_nao_checar_pulseira",!1)),j.registerFlag(new t("score_lavar_maos_antes_prontuario",!1)),j.registerFlag(new t("score_nao_lavar_maos_antes_prontuario",!1)),j.registerFlag(new t("score_conferiu_medicacao_posto",!1)),j.registerFlag(new t("score_preparar_medicacao",!1)),j.registerFlag(new t("score_calculou_gotejamento",!1)),j.registerFlag(new t("score_identificar_medicacao",!1)),j.registerFlag(new t("score_administrar_medicacao",!1)),j.registerFlag(new t("score_nao_administrar_medicacao",!1)),j.registerFlag(new t("score_gotejar_soro_equipo",!1)),j.registerFlag(new t("score_nao_gotejar_soro_equipo",!1)),j.registerFlag(new t("score_anotou_prontuario",!1)),j.registerFlag(new t("pegou_todos_instrumentos",!1)),j.registerFlag(new t("score_gotejar_soro",!1)),j.registerFlag(new t("conversar_recepcionista",!1)),j.registerFlag(new t("checar_pulseira",!1)),j.registerFlag(new t("mostraPaciente",!1)),j.registerFlag(new t("falarComPaciente",!1)),j.setInitialScene(0),e.registerLevel(j,5)});