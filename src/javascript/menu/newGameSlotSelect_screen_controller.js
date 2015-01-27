define(['Stage'], function (Stage) {

    var Player = require('Player');
    var SaveLoadGame = require('SaveLoadGame');
    var saves = SaveLoadGame.load();

    var selectedId = SaveLoadGame.getSelectedId();

    var isSelectedEmpty = saves[selectedId].empty;



    /**
     * Description
     * @method load
     * @memberOf module:LoadGame_Screen_Controller
     */
    function load() {

        $( "#dialog-confirmDelete" ).dialog({
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

        $( "#dialog-confirmDelete" )
            .dialog()
            .dialog( "widget" )
            .find( ".ui-dialog-titlebar-close" )
            .hide();

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
            if(save.empty) {
                var name = prompt("Please enter your name", "Type name here");
                if(name != null){
                    SaveLoadGame.setupSlot(selectedId, name);

                    SaveLoadGame.loadSlot(selectedId);

                    isSelectedEmpty = false;
                    checkIfSlotIsEmpty();
                    Stage.changeScreen(6);
                }
            }
        });
    }

    function checkIfSlotIsEmpty()
    {
        if(isSelectedEmpty) {
            $('#deleteSlot').addClass('disabled');
            $('#loadSlot').addClass('disabled');
        }else{
            $('#deleteSlot').removeClass('disabled');
            $('#loadSlot').removeClass('disabled');
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
