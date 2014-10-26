/**
 *
 * @name InteractiveObjects_Game_Controller
 * @module
*/
define(['core', 'text!../html/templates/interactiveObjectTemplate.html'], function(core, interactiveObjectTemplate){

//Attributes

    var divSelector = "#interactiveObjects";
    var interactiveObjectSelector = ".interactiveObject";

//Methods
    /**
     * Description
     * @method init
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function init(){

    }

    /**
     * Description
     * @method addAllInteractiveObjects
     * @param {} _interactiveObjects
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function addAllInteractiveObjects(_interactiveObjects){
        L.group("Adding Interactive Objects:", true);

        var i;
        for(i=0;i<_interactiveObjects.length;i++)
        {
            L.log("Adding interactive object #"+i+": "+_interactiveObjects[i].getName());
            var interactiveObject = _interactiveObjects[i];
            addInteractiveObject(interactiveObject);
        }

        L.groupEnd();
    }

    /**
     * Description
     * @method changeToInteractiveObjects
     * @param {} _interactiveObjects
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function changeToInteractiveObjects(_interactiveObjects){
        removeAllInteractiveObjects();
        addAllInteractiveObjects(_interactiveObjects);
    }

    /**
     * Description
     * @method addInteractiveObject
     * @param {} _interactiveObject
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function addInteractiveObject(_interactiveObject){
        var element = $($(interactiveObjectTemplate)[0]);

        element.click(_interactiveObject.getFunction());
        element.attr('title', _interactiveObject.getName());
        element.addClass(_interactiveObject.getCssClass());
        if(_interactiveObject.isEnabled())
            element.addClass("enabled");
        else
            element.addClass("disabled");

        $(divSelector).append(element);
        if(!_interactiveObject.isVisible())
            element.hide();
    }

    /**
     * Description
     * @method removeAllInteractiveObjects
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function removeAllInteractiveObjects(){
        $(divSelector).empty();
    }

    /**
     * Description
     * @method removeInteractiveObject
     * @param {} _interactiveObject
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function removeInteractiveObject(_interactiveObject){
        $('.'+_interactiveObject.getCssClass()).remove();
    }

//Getters

//Setters
    /**
     * Description
     * @method setInteractiveObjectVisible
     * @param {} _action
     * @param {} _value
     * @memberOf module:InteractiveObjects_Game_Controller
*/
    function setInteractiveObjectVisible(_action, _value){
        var actionClass = _action.getCssClass();

        if(_value)
            $("."+actionClass).show();
        else
            $("."+actionClass).hide();
    }

//Public Interface
    return {
        init: init,

        addInteractiveObject: addInteractiveObject,
        addAllInteractiveObjects: addAllInteractiveObjects,

        changeToInteractiveObjects: changeToInteractiveObjects,

        removeAllInteractiveObjects: removeAllInteractiveObjects,
        removeInteractiveObject: removeInteractiveObject,

        setInteractiveObjectVisible: setInteractiveObjectVisible
    }

});