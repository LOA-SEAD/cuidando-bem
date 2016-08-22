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
/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.

 @author Otho - Marcelo Lopes Lotufo
 */

define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Character" ],
  function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, Character ) {
    console.groupCollapsed("Commons:");


    var lib = {

      scenes: {
        // Default object of "recepcao"
        recepcao: new Scene("recepcao", "scene-recepcao")
          .setCssClass("scene-lobby"),

        // Default object of "corredor"
        corredor: new Scene("corredor", "scene-corredor")
          .setCssClass("scene-hallway"),

        // Default object of "alaMasculina"
        alaMasculina: new Scene("alaMasculina", "Ala Masculina")
          .setCssClass("scene-bedroom"),

        // Default object of "alaFeminina"
        alaFeminina: new Scene("alaFeminina", "Ala Feminina")
          .setCssClass("scene-bedroom"),

        // Default object of "postoDeEnfermagem"
        postoDeEnfermagem: new Scene("postoDeEnfermagem", "Posto de Enfermagem")
          .setCssClass("scene-nursingStation"),

        // Default object of "centroCirurgico"
        centroCirurgico: new Scene("centroCirurgico", "Centro Cirúrgico")
          .setCssClass("scene-surgeryCenter"),

        // Default object of "centroCirurgico"
        centroCirurgicoYuri: new Scene("centroCirurgicoYuri", "Centro Cirúrgico Yuri")
          .setCssClass("scene-surgeryCenter-yuri"),

        // Default object of "farmacia"
        farmacia: new Scene("farmacia", "Farmácia")
          .setCssClass("scene-pharmacy"),

        finalDeFase: new Scene("Fim da fase", "scene-fim-level")
          .setCssClass("scene-fim-level"),

        // Default object of "leito"
        leitos: {
          joao: new Scene("leito_01", "scene-leito-char-01")
            .setCssClass("scene-bedChar01"),

          carlos: new Scene("leito_02", "scene-leito-char-02")
            .setCssClass("scene-bedChar02"),

          raul: new Scene("leito_03", "scene-leito-char-03")
            .setCssClass("scene-bedChar03"),

          raul_leito01: new Scene("leito_01", "scene-leito-char-03-01")
            .setCssClass("scene-bedChar03-01"),

          regina: new Scene("leito_04", "scene-leito-char-04")
            .setCssClass("scene-bedChar04"),

          pedro: new Scene("leito_05", "scene-leito-char-05")
            .setCssClass("scene-bedChar05"),

          esther: new Scene("leito_06", "scene-leito-char-06")
            .setCssClass("scene-bedChar06"),

          josivaldo: new Scene("leito_07", "scene-leito-char-07")
            .setCssClass("scene-bedChar07"),

          ana: new Scene("leito_08", "scene-leito-char-08")
            .setCssClass("scene-bedChar08"),

          yuri: new Scene("leito_09", "scene-leito-char-09")
            .setCssClass("scene-bedChar09"),

          francisco: new Scene("leito_10", "scene-leito-char-10")
            .setCssClass("scene-bedChar10")
        }
      },

      modalScenes: {},
      actions: {
        irCorredor: new Action("btn-ir_corredor", "Ir ao corredor")
          .setCssClass("action-ir_corredor")
          .onClick(function() {
            console.log("Action: 'Ir ao corredor'");
            core.changeScene( 1 );
          })
      },
      objects: {},

      characters: {
        recepcionistaUnknow: new Character("Recepcionista", "char-receptionist"),
        recepcionista: new Character("Clarice", "char-receptionist"),
        mentor: new Character("Mentor", "char-mentor"),
        jogador: new Character("Jogador", "char-player"),

        circulante: new Character("Circulante", "char-circulante"),
        // TODO: mudar 'paulo:' para 'farmaceutico:'
        paulo: new Character("Paulo", "char-farmaceutico"),

        pacientes: {
          joao: new Character("Sr. João", "char-paciente_01"),
          carlos: new Character("Sr. Carlos", "char-paciente_02"),
          raul: new Character("Sr. Raul", "char-paciente_03"),
          regina: new Character("Sra. Regina", "char-paciente_04"),
          pedro: new Character("Sr. Pedro", "char-paciente_05"),
          esther: new Character("Sra. Esther", "char-paciente_06"),
          josivaldo: new Character("Sr. Josivaldo", "char-paciente_07"),
          ana: new Character("Sra. Ana", "char-paciente_08"),
          yuri: new Character("Sr. Yuri", "char-paciente_09"),
          francisco: new Character("Sr. Pedro", "char-paciente_10"),

          joaoUnknow: new Character("Paciente", "char-paciente_01"),
          carlosUnknow: new Character("Paciente", "char-paciente_02"),
          raulUnknow: new Character("Paciente", "char-paciente_03"),
          reginaUnknow: new Character("Paciente", "char-paciente_04"),
          pedroUnknow: new Character("Paciente", "char-paciente_05"),
          estherUnknow: new Character("Paciente", "char-paciente_06"),
          josivaldoUnknow: new Character("Paciente", "char-paciente_07"),
          anaUnknow: new Character("Paciente", "char-paciente_08"),
          yuriUnknow: new Character("Paciente", "char-paciente_09"),
          franciscoUnknow: new Character("Paciente", "char-paciente_10")
        }
      }
    };

    var balcao = new InteractiveObject("intObj-balcao", "Conversar com a Recepcionista")
      .setCssClass("intObj-balcao")
      .setVisibility( true )
      .setEnable( false );

    lib.scenes.recepcao.registerInteractiveObject( balcao );
    console.groupEnd();

    return lib;
  });
