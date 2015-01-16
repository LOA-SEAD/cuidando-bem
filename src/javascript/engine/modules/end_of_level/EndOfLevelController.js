/**
 *
 * @name EndOfLevel_Game_Controller
 * @module
 */
define(['text!../assets/html/templates/scoreItemTemplate.html'], function (scoreItemHtml) {

//Attributes

    var modalSelector = "#endOfLevel";
    var scoreListSelector = "#scoreList";

    var titleSelector = ".title";
    var scoreSelector = ".score";

    var isOpen = false;
//Methods
    //Init
    /**
     * Description
     * @method init
     * @memberOf module:EndOfLevel_Game_Controller
     */
    function init() {

    }

    function show(_scoreList) {
        if(!isOpen) {
            $(modalSelector).show();

            for (i = 0; i < _scoreList.length; i++) {
                var scoreItem = _scoreList[i];

                var element = $($(scoreItemHtml)[0]);
                var score = $(scoreSelector, element);
                var title = $(titleSelector, element);

                score.html(scoreItem.score);
                title.html(scoreItem.title);

                $(scoreListSelector).append(element);
            }

            isOpen = true;
        }
    }

    function close(){
        $(scoreListSelector).empty();
        $(modalSelector).hide();
        isOpen = false;
    }

//Getters
//Setters
//Public Interface
    return {
        init: init,
        show: show,
        close: close
    }

});