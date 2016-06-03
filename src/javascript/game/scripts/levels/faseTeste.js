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

 */
define([ "levelsData", "Scene", "Action", "Level", "Dialog", "InteractiveObject", "Flag", "CuidandoBem", "Commons", "Pulseira", "Prontuario", "FreqRespiratoria", "EquipoGotejamento", "Ficha" ],
    function( game, Scene, Action, Level, Dialog, InteractiveObject, Flag, core, lib, Pulseira, Prontuario, FreqRespiratoria, EquipoGotejamento, Ficha ) {


        var Dialogs = require("DialogsData").fase1;
        var Alerts = require("DialogsData").alertas;


        var level = new Level("Level TESTE");
        console.groupCollapsed( level.getName() );

        var flagsOn = true;
        var visibility = false;


        level.setSetupScript(function() {

            Pulseira.setNameRegExp( /João Manoel Ribeiro/ );
            Pulseira.setLeitoRegExp( /0*2/ );
            Pulseira.setDataRegExp( /07\/06\/1956/ );
            Pulseira.disable();
            Pulseira.setName("Testando setName de pulseira");

            Prontuario.setNome("João Manoel Ribeiro");
            Prontuario.setSexo("M");
            Prontuario.setEstadoCivil("Casado");
            Prontuario.setDataNascimento("07/06/1956");
            Prontuario.setIdade("58 anos");
            Prontuario.setProfissao("Comerciante");
            Prontuario.setPai("Joaquim Casagrande");
            Prontuario.setMae("Lúcia Moraes Casagrande");

            Prontuario.setAlergiaMedicamentosa( true, "Dipirona");
            Prontuario.setDisableAlergiaMedicamentosa( true );
            Prontuario.setDataInternacao("13/05/2015");
            Prontuario.setLeito("02 - Leito Masculino");
            Prontuario.setAntecedentes("Ocorrência de internação em 2004, devido a suspeita de infarto agudo do miocárdio (IAM)");
            Prontuario.setHipotese("Crise hipertensiva");
            Prontuario.setObservacoes("");

            Prontuario.setPeso("87");
            Prontuario.setAltura("1,62");
            Prontuario.setCircunferenciaAbdominal("115");

            Prontuario.setPrescMedicaRowData( 0, "15/03", "Captopril", "Oral", "comp 75 mg", "2x dia", "");
            Prontuario.setPrescMedicaRowData( 1, "15/03", "Ácido acetilsalicílico (AAS)", "Oral", "comp 100 mg", "1x dia", "");


            Prontuario.setSsvvRowData( 0, "15/03", "", "", "", "", "", false );
            Prontuario.setSsvvRowData( 1, "", "", "", "", "", "", true );

            Prontuario.setPrescEnfermagemState("decubito");

            Prontuario.setSsvvRowRegExp( 0,
                new RegExp(""),
                new RegExp(""),
                new RegExp(""),
                new RegExp(""),
                new RegExp(""),
                new RegExp("")
            );

            Prontuario.setAnotacaoEnfermagemRowData("15/03", "");
        });


        var recepcao = new Scene("recepcao", "scene-recepcao")
            .setCssClass("scene-lobby")
            .onLoad(function() {
                // Pulseira.open();
                // core.openModalScene("modalOximetro");
                // Prontuario.open();
                // freqRespiratoria.open();

                // core.showEndOfLevel();
                // EquipoGotejamento.setMode( "dieta" );
                // EquipoGotejamento.open();
                Ficha.open( "soro", 2 );
            });


        recepcao.registerActions([
            new Action("btn-ir_corredor", "Ir ao corredor")
                .setCssClass("action-ir_corredor")
                .onClick(function() {
                    console.log("Action: ir_corredor");
                    core.changeScene( 1 );
                })
                .setVisibility( true )
        ]);

        var corredor = lib.scenes.corredor;

        var oximetro = new Scene("modalOximetro", "Oxímetro")
            .setCssClass("modalScene-oximetro")
            .setTemplate("<span class='oximetro-text'>valor unidade</span>");


        level.registerScene( recepcao );

        level.registerModalScene( oximetro );


        level.setInitialScene( 0 );


        game.registerLevel( level, 13 );

        console.groupEnd();
    });
