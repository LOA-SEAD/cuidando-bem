/*
 This module has every wrold variable from each game level so it can be easily loaded inside the game.
 New levels can easily be made by adding new game levels.
 */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core) {
        console.groupCollapsed("Commons:");

        //TODO: Set css classes ("leito", "farmacia")
        var lib = {
            //region Scenes
            scenes : {
                //Default object of "recepcao"
                recepcao: new Scene("recepcao", "scene-recepcao")
                    .setCssClass("scene-lobby"),
                //Default object of "corredor"
                corredor: new Scene("corredor", "scene-corredor")
                    .setCssClass("scene-hallway"),
                //Default object of "alaMasculina"
                alaMasculina: new Scene("alaMasculina", "Ala Masculina")
                    .setCssClass("scene-maleRoom"),
                //Default object of "corredor"
                alaFeminina: new Scene("alaFeminina", "Ala Feminina")
                    .setCssClass("scene-femaleRoom"),
                //Default object of "corredor"
                leito: new Scene("leito", "Leito Genérico")
                    .setCssClass("scene-none"),
                //Default object of "corredor"
                postoDeEnfermagem: new Scene("postoDeEnfermagem", "Post de Enfermagem")
                    .setCssClass("scene-nursingStation"),
                //Default object of "corredor"
                centroCirurgico: new Scene("centroCirurgico", "Centro Cirúrgico")
                    .setCssClass("scene-surgeryCenter"),
                //Default object of "corredor"
                farmacia: new Scene("farmacia", "Farmácia")
                    .setCssClass("scene-none")



            },
            //endregion
            modalScenes : {

            },
            actions: {

            },
            objects: {

            },

            characters: {
                recepcionista: new Character("Recepcionista", ""),
                mentor: new Character("Mentor", ""),
                jogador: new Character("Jogador", ""),

                fase1: new Character("Fase 1", "")


            }
        };
        console.groupEnd();
        return lib;
    });