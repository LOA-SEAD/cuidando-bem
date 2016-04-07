define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){function A(){u.changeScene(6),m.getFlag("score_irCentroCirurgico_horaErrada").getValue()==0&&(m.getFlag("score_irCentroCirurgico_horaErrada").setValue(!0),console.log("PERDEU 25 PONTOS"))}function O(){u.changeScene(7),m.getFlag("score_iralaFeminina_horaErrada").getValue()==0&&(m.getFlag("score_iralaFeminina_horaErrada").setValue(!0),console.log("PERDEU 25 PONTOS"))}function M(){console.log("Ir para o corredor"),u.changeScene(1)}function _(){}function D(){m.getFlag("ler_prontuario").getValue()==1&&u.changeScene(4)}function P(){u.changeScene(5)}function H(){u.changeScene(2)}var p=require("DialogsData").fase9,d=require("DialogsData").alertas,h=require("ScoresData").level9,v=require("Player"),m=new r("Level 9");console.groupCollapsed(m.getName());var g,y,b,w,E,S,x,T,N,C,k,L,w=a.scenes.centroCirurgico.getClone().onLoad(function(){console.log("Load scene: "+w.getName())}),b=a.scenes.alaFeminina.getClone().onLoad(function(){}),g=a.scenes.recepcao.getClone().onLoad(function(){console.log("Load scene: "+g.getName())});g.registerInteractiveObjects([(new s("intObj-conversar_recepcionista","Conversar com a Recepcionista")).setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(_),(new s("io-ir_corredor_esquerda","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-left no-glow").onClick(M).setVisibility(!0),(new s("io-ir_corredor_direita","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-right no-glow").onClick(M).setVisibility(!0)]),g.registerDialogs([]),y=a.scenes.corredor.getClone().onLoad(function(){}).onUnload(function(){console.log("Saindo do corredor")}),y.registerDialogs([]),y.registerInteractiveObjects([(new s("io-ir_centro_cirurgico","Ir para o Centro Cirurgico")).setCssClass("intObj-goToCentroCirurgico").onClick(A).setVisibility(!0),(new s("io-ir_farmacia","Ir para a Farmacia")).setCssClass("intObj-goToFarmacia").onClick(D).setVisibility(!0),(new s("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")).setCssClass("intObj-goToPostoEnfermagem").onClick(P).setVisibility(!0),(new s("io-ir_ala_feminina","Ir para a Ala Feminina")).setCssClass("intObj-goToAlaFeminina").onClick(O).setVisibility(!0),(new s("io-ir_ala_masculina","Ir para a Ala Masculina")).setCssClass("intObj-goToAlaMasculina").onClick(H).setVisibility(!0)]);var B=a.scenes.alaMasculina.getClone().onLoad(function(){m.getFlag("falar_paciente").getValue()==0?(m.getFlag("falar_paciente").setValue(!0),u.openDialog(0)):m.getFlag("pegou_tudo_postoEnfermagem").getValue()==1,console.log("Load scene: "+B.getName())});B.registerDialogs([(new i(a.characters.jogador)).setText("").registerOption("",function(){u.openDialog(1)}).registerOption("",function(){u.openDialog(4)}).setRandomize(!0),(new i(a.characters.pacientes.francisco)).setText("").registerOption("",function(){u.openDialog(2)}),(new i(a.characters.jogador)).setText("").registerOption("",function(){u.openDialog(3)}),(new i(a.characters.pacientes.francisco)).setText("").registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText("").registerOption("",function(){u.openDialog(0)})]),B.registerInteractiveObjects([(new s("io-ir_corredor","Ir ao corredor")).setCssClass("intObj-irAlaMasculina_corredor").onClick(function(){console.log("voltando para corredor"),u.changeScene(1)})]),B.registerActions([(new n("btn-ler_prontuario","Ler prontuario")).setCssClass("action-ler_prontuario").onClick(function(){m.getFlag("ler_prontuario").getValue()==0&&(m.getFlag("ler_prontuario").setValue(!0),u.registerScoreItem(h.lerProntuario)),l.open(),u.openModalScene("Prontuario"),u.registerScoreItem(h.verProntuario)}).setVisibility(!0)]);var T=a.scenes.farmacia.getClone().onLoad(function(){console.log("Load scene: "+T.getName())});T.registerDialogs([(new i(a.characters.paulo)).setText(p.farmacia[0]).registerOption("",function(){u.openDialog(1)}),(new i(a.characters.jogador)).setText(p.farmacia[1]).registerOption("",function(){u.openDialog(2)}),(new i(a.characters.paulo)).setText(p.farmacia[2]).registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText(p.farmacia[3]).registerOption("",function(){u.closeDialog()})]),T.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){m.getFlag("verificar_medicamento").getValue()==1&&u.changeScene(1)}),(new n("btn-pegarFrascoDieta","Pegar Frasco de SG 5%")).setCssClass("action-frasco_dieta").onClick(function(){v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegarFrascoSG").getValue()==0&&(m.getFlag("pegarFrascoSG").setValue(!0),u.registerScoreItem(h.pegarFrascoSG))}),(new n("btn-cloretoSodio_20_10ml","Pegar NaCL 20%")).setCssClass("action-cloretoSodio_20_10ml").onClick(function(){v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegarNACL").getValue()==0&&(m.getFlag("pegarNACL").setValue(!0),u.registerScoreItem(h.pegarNACL))}),(new n("btn-conferirMedicamento","Conferir Medicamento")).setCssClass("action-conferirMedicamento").onClick(function(){m.getFlag("pegarFrascoSG").getValue()==0||m.getFlag("pegarNACL").getValue()==0?u.openDialog(3):m.getFlag("conferirMedicamento").getValue()==0&&(m.getFlag("conferirMedicamento").setValue(!0),u.registerScoreItem(h.conferirDieta))})]);var x=a.scenes.postoDeEnfermagem.getClone().onLoad(function(){console.log("Load scene: "+x.getName())});x.registerDialogs([(new i(a.characters.mentor)).setText(d.esqueceu.pegarBandeja).registerOption("",function(){u.closeDialog()})]),x.registerInteractiveObjects([(new s("io-abrir_gaveta","Abrir gaveta")).setCssClass("intObj-openDrawer").onClick(function(){v.play(v.audios.sfx.abrirGaveta),m.getFlag("pegar_bandeja").getValue()==0?u.openDialog(0):(console.log("Action: abrir_gaveta"),u.openModalScene("gaveta"),u.openCommandBar())}).setVisibility(!0),(new s("io-pegar_bandeja","Pegar Bandeja")).setCssClass("intObj-bandeja").onClick(function(){console.log("Action: Pegar bandeja"),v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegar_bandeja").setValue(!0),u.setInteractiveObjectVisible("io-pegar_bandeja",!1)}).setVisibility(!0)]),x.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){m.getFlag("pegou_tudo_postoEnfermagem").getValue()==0?u.openDialog(0):u.changeScene(1)}),(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){v.play(v.audios.sfx.lavarMaos),m.getFlag("score_lavarMaos1").getValue()==0&&u.registerScoreItem(h.lavarMaos1),m.getFlag("score_lavarMaos1").setValue(!0)}).setVisibility(!0)]),k=new t("Prontuario","Prontuario"),k.registerActions([(new n("btn-fechar_prontuario","Fechar prontuário")).setCssClass("action-ler_prontuario").onClick(function(){l.close(),u.setActionVisible("btn-fechar_prontuario",!1),console.log("Action: Fechar prontuario"),u.closeModalScene("Prontuario")}).setVisibility(!0)]),N=(new t("gaveta","Gaveta")).setCssClass("modalScene-drawer"),N.registerActions([(new n("btn-fechar_gaveta","Fechar gaveta")).setCssClass("action-fechar_gaveta").onClick(function(){console.log("Action: fechar_gaveta"),v.play(v.audios.sfx.fecharGaveta),u.closeModalScene("Gaveta"),m.getFlag("pegar_seringa").getValue()==1&&m.getFlag("pegar_agulha").getValue()==1&&m.getFlag("pegar_ampola").getValue()==1&&m.getFlag("pegar_equipoSoro").getValue()==1&&m.getFlag("pegou_tudo_postoEnfermagem").setValue(!0)}).setVisibility(!0)]),N.registerInteractiveObjects([(new s("io-seringa","Seringa")).setCssClass("intObj-seringa_de_10_ml").onClick(function(){console.log("IntObj: io-seringa"),v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegar_seringa").setValue(!0),u.setInteractiveObjectVisible("io-seringa",!1),u.registerScoreItem(h.pegarSeringa)}).setVisibility(!0),(new s("io-agulha","Agulha 40X12")).setCssClass("intObj-agulha_40x12").onClick(function(){console.log("intObj-agulha_40x12"),v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegar_agulha").setValue(!0),u.setInteractiveObjectVisible("io-agulha",!1),u.registerScoreItem(h.pegarAgulha)}).setVisibility(!0),(new s("io-ampola","Ampola de Glicose 50%")).setCssClass("glicose_30_10ml").onClick(function(){console.log("intObj-glicose"),v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegar_ampola").setValue(!0),u.setInteractiveObjectVisible("io-ampola",!1),u.registerScoreItem(h.pegarAmpola)}).setVisibility(!0),(new s("io-equipoSoro","Equipamento de Soro Macrogotas")).setCssClass("???????????????").onClick(function(){console.log("intObj-equipoSoro"),v.play(v.audios.sfx.pegarObjeto),m.getFlag("pegar_equipoSoro").setValue(!0),u.setInteractiveObjectVisible("io-equipoSoro",!1),u.registerScoreItem(h.pegarSoro)}).setVisibility(!0)]),m.registerScene(g),m.registerScene(y),m.registerScene(B),m.registerScene(S),m.registerScene(T),m.registerScene(x),m.registerScene(w),m.registerScene(b),m.registerModalScene(k),m.registerModalScene(N),m.setSetupScript(function(){m.getFlag("score_iralaFeminina_horaErrada").setValue(!1),m.getFlag("score_irCentroCirurgico_horaErrada").setValue(!1),l.setNome("Pedro Alcides Mendonça"),l.setSexo("M"),l.setEstadoCivil("Solteiro"),l.setDataNascimento("03/06/1962"),l.setIdade("52 anos"),l.setProfissao("Professor"),l.setPai("Aldair Mendonça"),l.setMae("Ana Laura Alcídes Mendonça"),l.setAlergiaMedicamentosa(!1,""),l.setDisableAlergiaMedicamentosa(!0),l.setDataInternacao("27/12/2015"),l.setLeito("01 - Enfermaria Masculina"),l.setAntecedentes("Ocorrência de internação por Infecção no trato respiratório por Streptococcus sp.  e desconforto respiratório no mês de outubro"),l.setHipotese("Desidratação de grau moderado"),l.setObservacoes("Grande perda de eletrólitos"),l.setPeso("62"),l.setAltura("1,77"),l.setCircunferenciaAbdominal("91"),l.setPrescMedicaRowData(0,"","Soro Glicosado 5%","Endovenosa","800ml","",!1,!0),l.setPrescMedicaRowData(1,"","NaCL 20%","Endovenosa","20ml","",!1,!0),l.setSsvvRowData(0,"","130X70","82","19","96","35.9",!0),l.setSsvvRowData(1,"","","","","","",!0)}),m.registerFlag(new o("score_iralaFeminina_horaErrada"),!1),m.registerFlag(new o("score_irCentroCirurgico_horaErrada"),!1),m.setInitialScene(0),e.registerLevel(m,9),console.groupEnd()});