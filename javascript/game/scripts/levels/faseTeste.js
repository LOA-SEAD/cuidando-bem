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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Commons","Pulseira","Prontuario","FreqRespiratoria","EquipoGotejamento","Ficha"],function(e,a,s,t,o,i,r,n,c,l,d,p,g,m){var x=(require("DialogsData").fase1,require("DialogsData").alertas,new t("Level TESTE"));x.setSetupScript(function(){l.setNameRegExp(/João Manoel Ribeiro/),l.setLeitoRegExp(/0*2/),l.setDataRegExp(/07\/06\/1956/),l.disable(),l.setName("Testando setName de pulseira"),d.setNome("João Manoel Ribeiro"),d.setSexo("M"),d.setEstadoCivil("Casado"),d.setDataNascimento("07/06/1956"),d.setIdade("58 anos"),d.setProfissao("Comerciante"),d.setPai("Joaquim Casagrande"),d.setMae("Lúcia Moraes Casagrande"),d.setAlergiaMedicamentosa(!0,"Dipirona"),d.setDisableAlergiaMedicamentosa(!0),d.setDataInternacao("13/05/2015"),d.setLeito("02 - Leito Masculino"),d.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)"),d.setHipotese("Crise hipertensiva"),d.setObservacoes(""),d.setPeso("87"),d.setAltura("1,62"),d.setCircunferenciaAbdominal("115"),d.setPrescMedicaRowData(0,"15/03","Captopril","Oral","comp 75 mg","2x dia",""),d.setPrescMedicaRowData(1,"15/03","Ácido acetilsalicílico (AAS)","Oral","comp 100 mg","1x dia",""),d.setSsvvRowData(0,"15/03","","","","","",!1),d.setSsvvRowData(1,"","","","","","",!0),d.setPrescEnfermagemState("decubito"),d.setSsvvRowRegExp(0,new RegExp(""),new RegExp(""),new RegExp(""),new RegExp(""),new RegExp(""),new RegExp("")),d.setAnotacaoEnfermagemRowData("15/03",""),m.setEnfermeiraRegexp(/Masculina/i),m.setPacienteRegexp(/Pedro Alc(í|i)des Mendon(ç|c)a/i),m.setLeitoRegexp(/0?1/),m.setVolumeRegexp(/104/),m.setDuracao(1),m.setGotasRegexp(/34,66/),m.setGotasAproxRegexp(/35/)});var R=new a("recepcao","scene-recepcao").setCssClass("scene-lobby").onLoad(function(){d.open("sinaisVitais")});R.registerActions([new s("btn-ir_corredor","Ir ao corredor").setCssClass("action-ir_corredor").onClick(function(){alert(m.isDataValid())}).setVisibility(!0)]);var u=(c.scenes.corredor,new a("modalOximetro","Oxímetro").setCssClass("modalScene-oximetro").setTemplate("<span class='oximetro-text'>valor unidade</span>"));x.registerScene(R),x.registerModalScene(u),x.setInitialScene(0),e.registerLevel(x,13)});