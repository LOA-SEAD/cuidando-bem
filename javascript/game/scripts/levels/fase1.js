define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","ScoresData"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){function k(){console.log("Funcao: recepcao_ir_corredor"),m.getFlag("conversar_recepcionista").getValue()==1?(u.closeDialog(),u.changeScene(1),console.log("Ir para o corredor")):console.log("Necessita ação: conversar com a recepcionista")}function L(){console.log("Action: Conversar com a recepcionista"),u.openDialog(0)}function A(){console.log("Action: corredorIrPostoEnfermagem"),m.getFlag("examinar_paciente").getValue()==0?(u.openDialog(10),m.getFlag("score_ir_posto_hora_errada").getValue()==0&&(u.registerScoreItem(h.irPostoEnfermagemHoraErrada),m.getFlag("score_ir_posto_hora_errada").setValue(!0))):u.changeScene(4)}function O(){m.getFlag("conversar_mentor").getValue()==1?(m.getFlag("examinar_paciente").getValue()==0?u.changeScene(2):m.getFlag("coxim").getValue()==1?u.changeScene(2):u.openDialog(11),console.log("Action: corredorIrSalaLeitos")):console.log("Necessita ação: falar com mentor")}var p=require("DialogsData").fase1,d=require("DialogsData").alertas,v=require("Player");h=h.level1;var m=new r("Level 1");console.groupCollapsed(m.getName());var g,y,b,w,E,S,x,T,N,C;g=a.scenes.recepcao.getClone().onLoad(function(){console.log("Load scene: "+g.getName()),u.openDialog(0)}),g.registerDialogs([(new i(a.characters.recepcionista)).setText(p.recepcao[0]).registerOption("",function(){m.getFlag("conversar_recepcionista").setValue(!0),u.openDialog(1)}),(new i(a.characters.jogador)).setText(p.recepcao[1]).registerOption("",function(){u.closeDialog()})]),g.registerInteractiveObjects([(new s("intObj-conversar_recepcionista","Conversar com a Recepcionista")).setCssClass("intObj-talkToReceptionist").setVisibility(!0).onClick(L),(new s("io-ir_corredor_esquerda","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-left no-glow").onClick(k).setVisibility(!0),(new s("io-ir_corredor_direita","Ir ao corredor")).setCssClass("intObj-lobbyToHallway-right no-glow").onClick(k).setVisibility(!0)]),y=a.scenes.corredor.getClone().onLoad(function(){console.log("Entrando no corredor"),m.getFlag("conversar_mentor").getValue()==0?(m.getFlag("conversar_mentor").setValue(!0),u.openDialog(0)):m.getFlag("examinar_paciente").getValue()==1&&m.getFlag("conversar_mentor2").getValue()==0&&u.openDialog(2)}).onUnload(function(){console.log("Saindo do corredor")}),y.registerDialogs([(new i(a.characters.mentor)).setText(p.corredor.fala1[0]).registerOption("",function(){m.getFlag("conversar_mentor").setValue(!0),u.openDialog(1)}),(new i(a.characters.jogador)).setText(p.corredor.fala1[1]).registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText(p.corredor.fala2[0]).registerOption("",function(){u.openDialog(3)}),(new i(a.characters.jogador)).setText("").registerOption(p.corredor.fala2[1],function(){u.openDialog(6)}).registerOption(p.corredor.fala2[2],function(){u.openDialog(4)}).registerOption(p.corredor.fala2[4],function(){u.openDialog(5)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.corredor.fala2[3]).registerOption("",function(){u.openDialog(3)}),(new i(a.characters.mentor)).setText(p.corredor.fala2[5]).registerOption("",function(){u.openDialog(3)}),(new i(a.characters.mentor)).setText(p.corredor.fala2[6]).registerOption("",function(){u.openDialog(7)}),(new i(a.characters.jogador)).setText("").registerOption(p.corredor.fala2[7],function(){u.closeDialog(),u.openCommandBar(),m.getFlag("conversar_mentor2").setValue(!0),m.getFlag("score_falar_com_mentor").getValue()==0&&(u.registerScoreItem(h.falarComMentorApos),m.getFlag("score_falar_com_mentor").setValue(!0))}).registerOption(p.corredor.fala2[8],function(){u.openDialog(8)}).registerOption(p.corredor.fala2[10],function(){u.openDialog(9)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.corredor.fala2[9]).registerOption("",function(){u.openDialog(7)}),(new i(a.characters.mentor)).setText(p.corredor.fala2[11]).registerOption("",function(){u.openDialog(7)}),(new i(a.characters.mentor)).setText(d.enfermariaMasculina).registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText(d.perdido.enfermagem[0]).registerOption("",function(){u.closeDialog()})]),y.registerInteractiveObjects([(new s("io-ir_sala_leitos","Ir para a sala de Leitos Masculino")).setCssClass("intObj-goToBedroom").onClick(O).setVisibility(!0),(new s("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")).setCssClass("intObj-goToNursingStation").onClick(A).setVisibility(!0),(new s("io-conversar_mentor","Conversar com Mentor")).setCssClass("intObj-talkToMentor").onClick(function(){u.closeCommandBar(),console.log("Abrir diálogo com o mentor"),m.getFlag("examinar_paciente").getValue()==0?(m.getFlag("conversar_mentor").setValue(!0),u.openDialog(0)):m.getFlag("examinar_paciente").getValue()==1&&u.openDialog(2)}).setVisibility(!0)]),w=(new t("salaDeLeitos","scene-salaDeLeitos")).setCssClass("scene-bedroom").onLoad(function(){console.log("Entrando na sala de leitos"),m.getFlag("colocou_coxim").getValue()==1&&u.setActionVisible("btn-ler_prontuario",!0),u.openCommandBar()}).onUnload(function(){console.log("Saindo da sala de leitos"),u.closeCommandBar()}),w.registerInteractiveObjects([(new s("io-ir_leito","Ir ao leito")).setCssClass("intObj-ir_leito-fase1").onClick(function(){m.getFlag("lavarMaos").getValue()==0?u.openDialog(0):u.changeScene(3)}).setVisibility(!0),(new s("io-ir_corredor","Ir ao Corredor")).setCssClass("intObj-bedroomToHallway").onClick(function(){m.getFlag("foi_ao_leito").getValue()==0?u.changeScene(1):m.getFlag("lavar_maos2").getValue()==1?u.changeScene(1):u.openDialog(1)}).setVisibility(!0)]),w.registerActions([(new n("btn-lavarMaos","Lavar as mãos")).setCssClass("action-lavarMaos").onClick(function(){v.play(v.audios.sfx.lavarMaos),m.getFlag("lavarMaos").getValue()==0?(console.log("Action: lavarMaos"),m.getFlag("lavarMaos").setValue(!0),m.getFlag("score_lavar_maos_antes_exame").getValue()==0&&(u.registerScoreItem(h.lavarMaosAntes),m.getFlag("score_lavar_maos_antes_exame").setValue(!0))):m.getFlag("lavar_maos2").getValue()==0&&m.getFlag("examinar_paciente").getValue()==1?(console.log("Action: lavar_maos2"),m.getFlag("lavar_maos2").setValue(!0),m.getFlag("score_lavar_maos_depois_exame").getValue()==0&&(u.registerScoreItem(h.lavarMaosDepois),m.getFlag("score_lavar_maos_depois_exame").setValue(!0))):m.getFlag("lavar_maos3").getValue()==0&&m.getFlag("colocou_coxim").getValue()==1&&(console.log("Action: lavar_maos3"),m.getFlag("lavar_maos3").setValue(!0),m.getFlag("score_lavar_maos_prontuario").getValue()==0&&(u.registerScoreItem(h.lavarMaosProntuario),m.getFlag("score_lavar_maos_prontuario").setValue(!0)))}).setVisibility(!0),(new n("btn-ler_prontuario","Ler prontuario")).setCssClass("action-ler_prontuario").onClick(function(){m.getFlag("lavar_maos3").getValue()==0?u.openDialog(2):(console.log("Action: ler prontuario"),l.open(),u.openModalScene("Prontuario"))}).setVisibility(!1)]),w.registerDialogs([(new i(a.characters.mentor)).setText(d.lavarMaos.tipo1).registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText(d.lavarMaos.tipo2).registerOption("",function(){u.closeDialog()}),(new i(a.characters.mentor)).setText(d.lavarMaos.tipo3).registerOption("",function(){u.closeDialog()})]),E=a.scenes.leitos.carlos.getClone().onLoad(function(){u.openCommandBar(),console.log("Leito: Onload"),m.getFlag("examinar_paciente").getValue()==0&&u.setInteractiveObjectVisible("io-pulseira_paciente",!0),m.getFlag("conversar_mentor2").getValue()==1&&(u.setActionVisible("btn-examinar_paciente",!1),m.getFlag("coxim").getValue()==1&&(m.getFlag("mudar_posicao_paciente").getValue()==0?u.setActionVisible("btn-mudar_posicao",!0):m.getFlag("colocou_coxim").getValue()==0&&(u.setActionVisible("btn-mudar_posicao",!1),u.setInteractiveObjectVisible("io-pulseira_paciente",!1),u.setActionVisible("btn-posicionar_coxim_e_travesseiro",!0))))}).onUnload(function(){console.log("Leito: OnUnload"),u.closeCommandBar()}),E.registerInteractiveObjects([(new s("io-pulseira_paciente","Checar pulseira do paciente")).setCssClass("intObj-paciente_02-checar_pulseira").onClick(function(){console.log("IO: pulseira_paciente"),u.openModalScene("pulseira"),f.open(),u.openCommandBar()}).setVisibility(!0).setEnable(!1),(new s("io-conversar_paciente02","Falar com o paciente")).setCssClass("intObj-conversar_paciente").onClick(function(){m.getFlag("score_falar_paciente").getValue()==0&&(u.registerScoreItem(h.falarComPaciente),m.getFlag("score_falar_paciente").setValue(!0)),u.openDialog(0),u.closeCommandBar()}).setVisibility(!0)]),E.registerDialogs([(new i(a.characters.jogador)).setText("").registerOption(p.enfermaria[0],function(){u.openDialog(3)}).registerOption(p.enfermaria[1],function(){u.openDialog(1)}).registerOption(p.enfermaria[3],function(){u.openDialog(2)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.enfermaria[2]).registerOption("",function(){u.openDialog(0)}),(new i(a.characters.mentor)).setText(p.enfermaria[4]).registerOption("",function(){u.openDialog(0)}),(new i(a.characters.pacientes.carlos)).setText(p.enfermaria[5]).registerOption("",function(){u.openDialog(4)}),(new i(a.characters.jogador)).setText("").registerOption(p.enfermaria[6],function(){u.openDialog(7)}).registerOption(p.enfermaria[7],function(){u.openDialog(5)}).registerOption(p.enfermaria[9],function(){u.openDialog(6)}).setRandomize(!0),(new i(a.characters.mentor)).setText(p.enfermaria[8]).registerOption("",function(){u.openDialog(4)}),(new i(a.characters.mentor)).setText(p.enfermaria[10]).registerOption("",function(){u.openDialog(4)}),(new i(a.characters.pacientes.carlos)).setText(p.enfermaria[11]).registerOption(p.enfermaria[12],function(){u.openCommandBar(),u.closeDialog(),m.getFlag("conversarPaciente").setValue(!0),u.enableInteractiveObject("io-pulseira_paciente",!0),u.setActionVisible("btn-ir_sala_leitos",!0),u.setActionVisible("btn-falarPaciente",!1)}),(new i(a.characters.jogador)).setText(p.perguntarNome).registerOption("",function(){u.openDialog(9)}),(new i(a.characters.pacientes.carlos)).setText(p.enfermaria[11]).registerOption("Obrigado.",function(){u.openCommandBar(),u.closeDialog()})]),E.registerActions([(new n("btn-examinar_paciente","Examinar Paciente")).setCssClass("action-examinar_paciente").onClick(function(){console.log("Action: btn-examinar_paciente"),v.play(v.audios.sfx.objeto),u.openModalScene("zoomChar2"),m.getFlag("examinar_paciente").setValue(!0),u.setActionVisible("btn-ir_sala_leitos",!0)}).setVisibility(!1),(new n("btn-perguntar_nome","Perguntar nome do paciente")).setCssClass("action-leito-char-02").onClick(function(){console.log("Action: btn-perguntar_nome"),u.closeCommandBar(),u.openDialog(8)}).setVisibility(!1),(new n("btn-ir_sala_leitos","Ir para sala de leitos")).setCssClass("action-ir_sala_de_leitos").onClick(function(){m.getFlag("examinar_paciente").getValue()&&u.disableInteractiveObject("io-pulseira_paciente"),u.changeScene(2)}).setVisibility(!1),(new n("btn-mudar_posicao","Mudar posição do paciente")).setCssClass("action-mudar_posicao_paciente").onClick(function(){u.changeSceneCssClassTo("scene-bedChar02-turned"),u.setActionVisible("btn-mudar_posicao",!1),u.setInteractiveObjectVisible("io-pulseira_paciente",!1),u.setActionVisible("btn-posicionar_coxim_e_travesseiro",!0),m.getFlag("mudar_posicao_paciente").setValue(!0)}).setVisibility(!1),(new n("btn-posicionar_coxim_e_travesseiro","Posicionar coxim e travesseiro")).setCssClass("action-posicionar_coxim").onClick(function(){u.changeSceneCssClassTo("scene-bedChar02-cushion"),u.setActionVisible("btn-posicionar_coxim_e_travesseiro",!1),m.getFlag("colocou_coxim").setValue(!0)}).setVisibility(!1)]),S=a.scenes.postoDeEnfermagem.getClone().onLoad(function(){u.openCommandBar()}).onUnload(function(){u.closeCommandBar()}),S.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),m.getFlag("coxim").getValue()==1?u.changeScene(1):u.openDialog(0)}).setVisibility(!0)]),S.registerInteractiveObjects([(new s("io-abrirGaveta","Abrir gaveta")).setCssClass("intObj-openDrawer").onClick(function(){console.log("Action: abrirGaveta"),v.play(v.audios.sfx.abrirGaveta),u.openModalScene("gaveta"),u.openCommandBar(),u.setInteractiveObjectVisible("io-coxim",!m.getFlag("coxim").getValue())}).setVisibility(!0)]),S.registerDialogs([(new i(a.characters.mentor)).setText(d.esqueceu.coxim).registerOption("",function(){u.closeDialog()})]),C=(new t("zoomChar2","Examinando paciente")).setCssClass("modalScene-zoom-char2"),C.registerActions([(new n("btn-fechar_zoom","Terminar exame")).setCssClass("action-terminar_exame").onClick(function(){console.log("Action: Terminar Exame"),u.closeModalScene("zoomChar2"),u.setActionVisible("btn-ir_sala_leitos",!0),m.getFlag("score_examinar_paciente").getValue()==0&&(u.registerScoreItem(h.examinarPaciente),m.getFlag("score_examinar_paciente").setValue(!0))})]),T=new t("pulseira","pulseira"),T.registerInteractiveObjects([]),T.registerActions([(new n("btn-largar_pulseira","Fechar pulseira")).setCssClass("action-pulseira_paciente").onClick(function(){console.log("Ação: Fechar modal pulseira"),u.closeModalScene("Pulseira"),m.getFlag("confirmou_pulseira").getValue()==0&&m.getFlag("conversarPaciente").getValue()==1&&(m.getFlag("confirmou_pulseira").setValue(!0),u.setActionVisible("btn-examinar_paciente",!0),m.getFlag("score_verificar_pulseira").getValue()==0&&(u.registerScoreItem(h.verificarPulseira),m.getFlag("score_verificar_pulseira").setValue(!0))),f.close()}).setVisibility(!0)]),x=(new t("gaveta","Gaveta")).setCssClass("modalScene-drawer"),x.registerActions([(new n("btn-fecharGaveta","Fechar gaveta")).setCssClass("action-fecharGaveta").onClick(function(){console.log("Action: fecharGaveta"),v.play(v.audios.sfx.fecharGaveta),u.closeModalScene("Gaveta")}).setVisibility(!0)]),x.registerInteractiveObjects([(new s("io-coxim","Coxim")).setCssClass("intObj-cushion").onClick(function(){console.log("IntObj: io-coxim"),m.getFlag("coxim").setValue(!0),v.play(v.audios.sfx.pegarObjeto),u.setInteractiveObjectVisible("io-coxim",!1),m.getFlag("score_pegar_coxim").getValue()==0&&(u.registerScoreItem(h.pegarCoxim),m.getFlag("score_pegar_coxim").setValue(!0))}).setVisibility(!0)]),N=new t("Prontuario","Prontuario"),N.registerActions([(new n("btn-fechar_prontuario","Fechar prontuário")).setCssClass("action-ler_prontuario").onClick(function(){console.log("Action: Fechar prontuario"),l.close(),u.closeModalScene("Prontuario")}),(new n("btn-terminar_fase","Conversar com Mentor")).setCssClass("action-abrir_dialogo").onClick(function(){console.log("Action: Fechar prontuario"),u.registerScoreItem(h.anotarNoProntuario),l.close(),u.unlockLevel(2),u.closeCommandBar(),u.showEndOfLevel()})]),m.registerScene(g),m.registerScene(y),m.registerScene(w),m.registerScene(E),m.registerScene(S),m.registerModalScene(T),m.registerModalScene(x),m.registerModalScene(N),m.registerModalScene(C),m.setSetupScript(function(){m.getFlag("conversar_recepcionista").setValue(!1),m.getFlag("conversar_mentor").setValue(!1),m.getFlag("conversar_mentor2").setValue(!1),m.getFlag("foi_ao_leito").setValue(!1),m.getFlag("conversarPaciente").setValue(!1),m.getFlag("confirmou_pulseira").setValue(!1),m.getFlag("examinar_paciente").setValue(!1),m.getFlag("mudar_posicao_paciente").setValue(!1),m.getFlag("lavarMaos").setValue(!1),m.getFlag("lavar_maos2").setValue(!1),m.getFlag("lavar_maos3").setValue(!1),m.getFlag("coxim").setValue(!1),m.getFlag("colocou_coxim").setValue(!1),m.getFlag("score_lavar_maos_antes_exame").setValue(!1),m.getFlag("score_lavar_maos_depois_exame").setValue(!1),m.getFlag("score_lavar_maos_prontuario").setValue(!1),m.getFlag("score_ir_posto_hora_errada").setValue(!1),m.getFlag("score_falar_paciente").setValue(!1),m.getFlag("score_verificar_pulseira").setValue(!1),m.getFlag("score_examinar_paciente").setValue(!1),m.getFlag("score_falar_com_mentor").setValue(!1),m.getFlag("score_pegar_coxim").setValue(!1),m.getFlag("score_anotar_prontuario").setValue(!1),m.getFlag("score_nao_lavar_maos_prontuario").setValue(!1),f.setNameRegExp(/Carlos Esme Gouv(e|ê)a/),f.setLeitoRegExp(/0*3/),f.setDataRegExp(/01\/12\/1945/),f.setName("Carlos Esme Gouvêa"),f.setLeito("03"),f.setData("01/12/1945"),f.disable(),l.setNome("Carlos Esme Gouvêa"),l.setSexo("M"),l.setEstadoCivil("Casado"),l.setDataNascimento("01/12/1945"),l.setIdade("69 anos"),l.setProfissao("Advogado aposentado"),l.setPai("Leonardo Gouvêa"),l.setMae("Maria Clara Esme Gouvêa"),l.setAlergiaMedicamentosa(!1,""),l.setDisableAlergiaMedicamentosa(!0),l.setDataInternacao("15/06/2015"),l.setLeito("02 - Enfermaria Masculina"),l.setAntecedentes("Nenhum"),l.setHipotese("Pneumonia brônquica, insuficiência respiratória e anemia ferropriva."),l.setObservacoes("Possui incontinência urinária, acamado."),l.setPrescEnfermagemState("decubito"),l.setPeso("72"),l.setAltura("1,68"),l.setCircunferenciaAbdominal("135"),l.setPrescMedicaRowData(0,"","Sulfato ferroso","Oral","drágea 250 mg","2x dia",!0,!0),l.setPrescMedicaRowData(1,"","Azitromicina","Oral","comp 500 mg","1x dia",!0,!0),l.setSsvvRowData(0,"","130x80","65","14","94","36",!0),l.setSsvvRowData(1,"","","","","","",!0),l.setAnotacaoEnfermagemRowData("","")}),m.registerFlag(new o("conversar_recepcionista"),!1),m.registerFlag(new o("conversar_mentor"),!1),m.registerFlag(new o("conversar_mentor2"),!1),m.registerFlag(new o("foi_ao_leito"),!1),m.registerFlag(new o("conversarPaciente"),!1),m.registerFlag(new o("confirmou_pulseira"),!1),m.registerFlag(new o("examinar_paciente"),!1),m.registerFlag(new o("mudar_posicao_paciente"),!1),m.registerFlag(new o("lavarMaos"),!1),m.registerFlag(new o("lavar_maos2"),!1),m.registerFlag(new o("lavar_maos3"),!1),m.registerFlag(new o("coxim"),!1),m.registerFlag(new o("colocou_coxim"),!1),m.registerFlag(new o("score_lavar_maos_antes_exame"),!1),m.registerFlag(new o("score_lavar_maos_depois_exame"),!1),m.registerFlag(new o("score_lavar_maos_prontuario"),!1),m.registerFlag(new o("score_ir_posto_hora_errada"),!1),m.registerFlag(new o("score_falar_paciente"),!1),m.registerFlag(new o("score_verificar_pulseira"),!1),m.registerFlag(new o("score_examinar_paciente"),!1),m.registerFlag(new o("score_falar_com_mentor"),!1),m.registerFlag(new o("score_pegar_coxim"),!1),m.registerFlag(new o("score_anotar_prontuario"),!1),m.registerFlag(new o("score_nao_lavar_maos_prontuario"),!1),m.setInitialScene(0),e.registerLevel(m,1),console.groupEnd()});