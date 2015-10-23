/* by Wellyson */

define(['levelsData', 'Scene', 'Action', 'Level', 'Dialog', 'InteractiveObject', 'Flag', 'CuidandoBem', 'Commons', 'Pulseira', 'Prontuario', 'FreqRespiratoria', 'Scores_data'],
    function (game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, Scores){

        //region Imports
        var Dialogs = require("Dialogs_data").fase3;
        // var Scores = require("Scores_data").fase3;
        //endregion

        var level = new Level("Level 3");
        console.groupCollapsed(level.getName());
    
    
        var
        recepcao,
        corredor,
        alaFeminina,
        centroCirurgico,
        sala_de_leitos,
        leito,
        posto_de_enfermagem,
        farmacia,
        gaveta,
        pulseira,
        prontuario,
        zoom;
    
    

        //region Scenes

        //region Recepcao
    
    
         function recepcaoIrCorredor() {
            console.log("Funcao: recepcao_ir_corredor");
            if ( level.getFlag("conversar_recepcionista").getValue() == true ) {  // wont check for flags
                core.closeDialog();
                core.changeScene(1);
                console.log("Ir para o corredor");
            } else {
                console.log("Necessita ação: conversar com a recepcionista");
            }
        }
    
    
        function conversarRecepcionista() {
            console.log("Action: Conversar com a recepcionista");
            core.openDialog(0);
        }
    

        var recepcao = lib.scenes.recepcao.getClone()
            .onLoad(function () {
                console.log("Load scene: " + recepcao.getName());
                core.openDialog(0);
            });

        recepcao.registerDialogs([
            // Dialog 0
            new Dialog(lib.characters.recepcionista)
                .setText(Dialogs.recepcao[0])
                .registerOption("", function(){
                    core.closeDialog();
                })
        ]);
    
    
         recepcao.registerInteractiveObjects([
            new InteractiveObject("intObj-conversar_recepcionista", "Conversar com a Recepcionista")
                .setCssClass("intObj-talkToReceptionist")
                .setVisibility(true)
                .onClick(conversarRecepcionista),


            new InteractiveObject("io-ir_corredor_esquerda", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-left")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true),


            new InteractiveObject("io-ir_corredor_direita", "Ir ao corredor")
                .setCssClass("intObj-lobbyToHallway-right")
                .onClick(recepcaoIrCorredor)
                .setVisibility(true)
        ]);
    
    
       //Corredor
    
    
        corredor = lib.scenes.corredor.getClone()
            .onLoad(function () {
                console.log("Entrando no corredor");
                if(level.getFlag("conversar_mentor").getValue() == false){
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(0);
                }else if(level.getFlag("testar_equipamentos").getValue() == true && level.getFlag("conversar_mentor2").getValue() == false){
                    core.openDialog(5);
                }
            })
            .onUnload(function (){
                console.log("Saindo do corredor");
            });
    
    
            // DIALOGOS
    
        corredor.registerDialogs([
            //Primeira passada pelo corredor
            
            // 0
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[0])
                .registerOption("", function(){
                    level.getFlag("conversar_mentor").setValue(true);
                    core.openDialog(1);
                }),
            
            //1 
             new Dialog(lib.characters.jogador)
                .setText("")
                .registerOption(Dialogs.corredor.fala1[1], function(){
                    core.openDialog(4);
                })
                .registerOption(Dialogs.corredor.fala1[2], function(){
                    core.openDialog(3);
                })
                .registerOption(Dialogs.corredor.fala1[3], function(){
                    core.openDialog(2);
                })
                .setRandomize(true),
                        
                        
            // 2 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[6])
                .registerOption("", function(){
                    core.openDialog(1);
                }),
            // 3 Mentor Corrige
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[5])
                .registerOption("", function(){
                    core.openDialog(1);
                }),
            // 4 Mentor fala
            new Dialog(lib.characters.mentor)
                .setText(Dialogs.corredor.fala1[4])
                .registerOption("", function(){
                    core.closeDialog();
                }),
                    
            
            //Segunda passada pelo corredor
                     
                        
                //5       
              new Dialog(lib.characters.jogador)
                .setText(Dialogs.corredor.fala2[0])
                .registerOption("", function(){
                    level.getFlag("conversar_mentor2").setValue(true);
                    core.closeDialog();
                }),
                        
                        
            //6 
                new Dialog(lib.characters.mentor)
                    .setText(Dialogs.corredor.fala2[1])
                    .registerOption("", function(){
                        level.getFlag("conversar_mentor2").setValue(true);
                        core.closeDialog();
                    });
                      
             ]);
    
    
           
      //FUNCOES
    
    
      function corredorIrCentroCirurgico() {
            console.log("Action: corredorIrCentroCirurgico");
            if(level.getFlag("ir_corredor_centro_cirurgico").getValue() == false){
                 level.getFlag("ir_corredor_centro_cirurgico").setValue(true);
                 core.changeScene(2);
                 
            }
          else {
                 //core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                   // core.changeScene(2);  corrigir
                   }          
            }
        
    
       function corredorIrAlaFeminina() {
            console.log("Action: corredorIrAlaFeminina");
            if(level.getFlag("testar_equipamentos").getValue() == false){
                    level.getFlag("ir_corredor_ala_feminina").setValue(true);
                     //core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    core.changeScene(3);
            }
            else  {
                    level.getFlag("ir_corredor_ala_feminina").setValue(true);
                     core.changeScene(3);
            }
        }
    
    
          function corredorIrFarmacia() {
            console.log("Action: corredorIrFarmaciaHoraErrada");
            if(level.getFlag("ir_corredor_farmacia_hora_errada").getValue() == false){
                //    level.getFlag("ir_corredor_farmacia_hora_errada").setValue(true);
                    //core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                    core.changeScene(5);
                
            }
       
        }
    
    
          function corredorIrPostoEnfermagem() {
            console.log("Action: corredorIrPostoEnfermagem");
            if(level.getFlag("ir_corredor_posto_enfermagem_hora_errada").getValue() == false){
                //level.getFlag("ir_corredor_posto_enfermagem_hora_errada").setValue(true);
                  //core.registerScoreItem(Scores.irPostoEnfermagem_horaErrada);
                 core.changeScene(6);             
            },
                
          }
    
    
    
    // FALTA CHECAR FUNCOES E SCORES
    
    
    
    //OBJETOS INTERATIVOS
    
          corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_centro_cirurgico","Ir para o Centro Cirurgico")
                .setCssClass("intObj-goToBedroom")   //arrumar
                .onClick(corredorIrCentroCirurgico)      
                .setVisibility(true),
              
    
               corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_farmacia","Ir para a Farmacia")
                .setCssClass("intObj-goToBedroom")   //arrumar
                .onClick(corredorIrFarmacia)        
                .setVisibility(true),
                   
    
    
                    corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_posto_enfermagem","Ir para o Posto de Enfermagem")
                .setCssClass("intObj-goToBedroom")   //arrumar
                .onClick(corredorIrPostoEnfermagem)    
                .setVisibility(true),
                        
    
    
                    corredor.registerInteractiveObjects([
            new InteractiveObject("io-ir_ala_feminina","Ir para a ala Feminina")
                .setCssClass("intObj-goToBedroom")   //arrumar
                .onClick(corredorIrAlaFeminina)
                .setVisibility(true),
    
    
    
    // Centro Cirurgico
                        
          centroCirurgico = lib.scenes.centrocirurgico.getClone()     // checar nome do arquivo
            .onLoad(function () {
                console.log("Load scene: " + centrocirurgico.getName());
                core.openDialog(0);
            });    
                        
                        
   
                        
    
    

    

        //endregion

        //endregion

        //region ModalScenes

        //endregion

        //region Level

        //region Register Scenes

        level.registerScene(recepcao);  // id 0
        level.registerScene(corredor);  // id 1
        level.registerScene(centroCirurgico); // id 2
        level.registerScene(alaFeminina); // id 3
        level.registerScene(leito); // id 4
        level.registerScene(farmacia); // id 5
        level.registerScene(posto_de_enfermagem); // id 6

        // endregion

        //region Register Modal Scenes

        //endregion

        //region Flags

        //endregion

        level.setSetupScript(function () {
            //Script that runs once when the level is loaded or reloaded
        });

        level.setInitialScene(0);
        //endregion

        game.registerLevel(level, 3);

        console.groupEnd();

    });