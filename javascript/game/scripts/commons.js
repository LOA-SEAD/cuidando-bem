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

define(["levelsData","Scene","Action","Level","Dialog","InteractiveObject","Flag","CuidandoBem","Character"],function(e,t,n,r,i,s,o,u,a){var f={scenes:{recepcao:(new t("recepcao","scene-recepcao")).setCssClass("scene-lobby"),corredor:(new t("corredor","scene-corredor")).setCssClass("scene-hallway"),alaMasculina:(new t("alaMasculina","Ala Masculina")).setCssClass("scene-bedroom"),alaFeminina:(new t("alaFeminina","Ala Feminina")).setCssClass("scene-bedroom"),postoDeEnfermagem:(new t("postoDeEnfermagem","Posto de Enfermagem")).setCssClass("scene-nursingStation"),centroCirurgico:(new t("centroCirurgico","Centro Cirúrgico")).setCssClass("scene-surgeryCenter"),centroCirurgicoYuri:(new t("centroCirurgicoYuri","Centro Cirúrgico Yuri")).setCssClass("scene-surgeryCenter-yuri"),farmacia:(new t("farmacia","Farmácia")).setCssClass("scene-pharmacy"),finalDeFase:(new t("Fim da fase","scene-fim-level")).setCssClass("scene-fim-level"),leitos:{joao:(new t("leito_01","scene-leito-char-01")).setCssClass("scene-bedChar01"),carlos:(new t("leito_02","scene-leito-char-02")).setCssClass("scene-bedChar02"),raul:(new t("leito_03","scene-leito-char-03")).setCssClass("scene-bedChar03"),raul_leito01:(new t("leito_01","scene-leito-char-03-01")).setCssClass("scene-bedChar03-01"),regina:(new t("leito_04","scene-leito-char-04")).setCssClass("scene-bedChar04"),pedro:(new t("leito_05","scene-leito-char-05")).setCssClass("scene-bedChar05"),esther:(new t("leito_06","scene-leito-char-06")).setCssClass("scene-bedChar06"),josivaldo:(new t("leito_07","scene-leito-char-07")).setCssClass("scene-bedChar07"),ana:(new t("leito_08","scene-leito-char-08")).setCssClass("scene-bedChar08"),yuri:(new t("leito_09","scene-leito-char-09")).setCssClass("scene-bedChar09"),francisco:(new t("leito_10","scene-leito-char-10")).setCssClass("scene-bedChar10")}},modalScenes:{},actions:{irCorredor:(new n("btn-ir_corredor","Ir ao corredor")).setCssClass("action-ir_corredor").onClick(function(){u.changeScene(1)})},objects:{},characters:{recepcionistaUnknow:new a("Recepcionista","char-receptionist"),recepcionista:new a("Clarice","char-receptionist"),mentor:new a("Mentor","char-mentor"),jogador:new a("Jogador","char-player"),circulante:new a("Circulante","char-circulante"),paulo:new a("Paulo","char-paulo"),pacientes:{joao:new a("Sr. João","char-paciente_01"),carlos:new a("Sr. Carlos","char-paciente_02"),raul:new a("Sr. Raul","char-paciente_03"),regina:new a("Sra. Regina","char-paciente_04"),pedro:new a("Sr. Pedro","char-paciente_05"),esther:new a("Sra. Esther","char-paciente_06"),josivaldo:new a("Sr. Josivaldo","char-paciente_07"),ana:new a("Sra. Ana","char-paciente_08"),yuri:new a("Sr. Yuri","char-paciente_09"),francisco:new a("Sr. Pedro","char-paciente_10"),joaoUnknow:new a("Paciente","char-paciente_01"),carlosUnknow:new a("Paciente","char-paciente_02"),raulUnknow:new a("Paciente","char-paciente_03"),reginaUnknow:new a("Paciente","char-paciente_04"),pedroUnknow:new a("Paciente","char-paciente_05"),estherUnknow:new a("Paciente","char-paciente_06"),josivaldoUnknow:new a("Paciente","char-paciente_07"),anaUnknow:new a("Paciente","char-paciente_08"),yuriUnknow:new a("Paciente","char-paciente_09"),franciscoUnknow:new a("Paciente","char-paciente_10")}}};return f});