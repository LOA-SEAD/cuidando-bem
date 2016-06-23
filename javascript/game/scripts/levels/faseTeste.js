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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","EquipoGotejamento","Ficha"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){var d=require("DialogsData").fase1,v=require("DialogsData").alertas,m=new r("Level TESTE");console.groupCollapsed(m.getName());var g=!0,y=!1;m.setSetupScript(function(){f.setNameRegExp(/João Manoel Ribeiro/),f.setLeitoRegExp(/0*2/),f.setDataRegExp(/07\/06\/1956/),f.disable(),f.setName("Testando setName de pulseira"),l.setNome("João Manoel Ribeiro"),l.setSexo("M"),l.setEstadoCivil("Casado"),l.setDataNascimento("07/06/1956"),l.setIdade("58 anos"),l.setProfissao("Comerciante"),l.setPai("Joaquim Casagrande"),l.setMae("Lúcia Moraes Casagrande"),l.setAlergiaMedicamentosa(!0,"Dipirona"),l.setDisableAlergiaMedicamentosa(!0),l.setDataInternacao("13/05/2015"),l.setLeito("02 - Leito Masculino"),l.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)"),l.setHipotese("Crise hipertensiva"),l.setObservacoes(""),l.setPeso("87"),l.setAltura("1,62"),l.setCircunferenciaAbdominal("115"),l.setPrescMedicaRowData(0,"15/03","Captopril","Oral","comp 75 mg","2x dia",""),l.setPrescMedicaRowData(1,"15/03","Ácido acetilsalicílico (AAS)","Oral","comp 100 mg","1x dia",""),l.setSsvvRowData(0,"15/03","","","","","",!1),l.setSsvvRowData(1,"","","","","","",!0),l.setPrescEnfermagemState("decubito"),l.setSsvvRowRegExp(0,new RegExp(""),new RegExp(""),new RegExp(""),new RegExp(""),new RegExp(""),new RegExp("")),l.setAnotacaoEnfermagemRowData("15/03",""),p.setEnfermeiraRegexp(/Masculina/i),p.setPacienteRegexp(/Pedro Alc(í|i)des Mendon(ç|c)a/i),p.setLeitoRegexp(/0?1/),p.setVolumeRegexp(/104/),p.setDuracao(1),p.setGotasRegexp(/34,66/),p.setGotasAproxRegexp(/35/)});var b=(new t("recepcao","scene-recepcao")).setCssClass("scene-lobby").onLoad(function(){p.open("soro",5),u.openCommandBar()});b.registerActions([(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){console.log("Action: ir_corredor"),alert(p.isDataValid())}).setVisibility(!0)]);var w=a.scenes.corredor,E=(new t("modalOximetro","Oxímetro")).setCssClass("modalScene-oximetro").setTemplate("<span class='oximetro-text'>valor unidade</span>");m.registerScene(b),m.registerModalScene(E),m.setInitialScene(0),e.registerLevel(m,13),console.groupEnd()});