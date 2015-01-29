define(['Stage'], function (Stage) {

    var Player = require('Player');
    var SaveLoadGame = require('SaveLoadGame');
    var saves = SaveLoadGame.load();

    var selectedId = SaveLoadGame.getSelectedId();

    var isSelectedEmpty = saves[selectedId].empty;

    var deleteDialogSelector = "#dialog-confirmDelete";
    var typeNameDialogSelector = "#dialog-typeName";
    var nameInputSelector = "#nameInput";

    var defaultNameInputValue = 'Cuidando Bem';



    /**
     * Description
     * @method load
     * @memberOf module:LoadGame_Screen_Controller
     */
    function load() {

        //region Setup Dialogs
        //region Delete Slot
        $(deleteDialogSelector).dialog({
            resizable: false,
            autoOpen: false,
            height:140,
            modal: true,
            draggable: false,
            buttons: {
                "Voltar": function() {
                    $( this ).dialog( "close" );
                },
                "Apagar": function() {
                    $( this ).dialog( "close" );
                    SaveLoadGame.reset(selectedId);

                    $(slotsSel[selectedId]).removeClass("filled");
                    $(slotsSel[selectedId]).addClass("empty");

                    saves[selectedId] = SaveLoadGame.loadSlot(selectedId);
                    var save = saves[selectedId];
                    isSelectedEmpty = save.empty;
                    $(slotsSel[selectedId]).text(save.name);
                    checkIfSlotIsEmpty();
                }
            }
        });

        $(deleteDialogSelector)
            .dialog()
            .dialog( "widget" )
            .find( ".ui-dialog-titlebar-close" )
            .hide();

        //endregion
        //region Type Name
        $(typeNameDialogSelector).dialog({
            resizable: false,
            autoOpen: false,
            height:140,
            modal: true,
            draggable: false,
            buttons: {
                "Voltar": function() {
                    $( this ).dialog( "close" );
                    $(nameInputSelector).val(defaultNameInputValue);
                },
                "Confirmar": function() {
                    $( this ).dialog( "close" );
                     var name = $(nameInputSelector).val();
                     if(name === null || name === undefined || name === '' || name === defaultNameInputValue)
                        name = defaultNameInputValue +" "+ (selectedId + 1);

                     SaveLoadGame.setupSlot(selectedId, name);

                     SaveLoadGame.loadSlot(selectedId);

                     isSelectedEmpty = false;
                     checkIfSlotIsEmpty();
                     Stage.changeScreen(6);
                }
            }
        });

        $(typeNameDialogSelector)
            .dialog()
            .dialog( "widget" )
            .find( ".ui-dialog-titlebar-close" )
            .hide();
        //endregion
        //endregion



        var slotsSel = $('.slot');

        $(slotsSel[selectedId]).addClass("selected");

        checkIfSlotIsEmpty();

        for(i in saves){
            var save = saves[i];

            if(save.empty){
                $(slotsSel[i]).addClass("empty");
            }else{
                $(slotsSel[i]).addClass("filled");
            }

            $(slotsSel[i]).text(save.name);
        }

        $('.menuButton').click(function(){
            Player.play(Player.audios.sfx.selecionar_menu);
        });

        $('.backButton').click(function () {
            Stage.changeScreen(0);
        });

        $('#deleteSlot').click(function(){
            if(!isSelectedEmpty) {
                $("#dialog-confirmDelete")
                    .dialog("open");
            }
        });

        $('#loadSlot').click(function(){
            if(!isSelectedEmpty) {
                SaveLoadGame.loadSlot(selectedId);
                Stage.changeScreen(6);
            }else{
                $(typeNameDialogSelector)
                    .dialog("open");
            }
        });

        slotsSel.click(function () {
            var slotsSel = $('.slot');
            selectedId = slotsSel.index(this);
            slotsSel.removeClass('selected');

            $(this).addClass('selected');
            var save = saves[selectedId];
            isSelectedEmpty = save.empty;
            checkIfSlotIsEmpty();

            SaveLoadGame.setSelectedId(selectedId);
        });
    }

    function checkIfSlotIsEmpty()
    {
        if(isSelectedEmpty) {
            $('#deleteSlot').addClass('disabled');

            $('#loadSlot').text('Iniciar');
        }else{
            $('#deleteSlot').removeClass('disabled');

            $('#loadSlot').text('Carregar');
        }
    }

    /**
     * Description
     * @method unload
     * @memberOf module:LoadGame_Screen_Controller
     */
    function unload() {

    }

    return {
        load: load,
        unload: unload
    }

});
