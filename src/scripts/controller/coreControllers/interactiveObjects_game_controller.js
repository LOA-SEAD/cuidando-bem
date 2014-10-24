define(['core', 'text!../html/templates/interactiveObjectTemplate.html'], function(core, interactiveObjectTemplate){

//Attributes

    var divSelector = "#interactiveObjects";
    var interactiveObjectSelector = ".interactiveObject";

//Methods
    function init(){

    }

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

    function changeToInteractiveObjects(_interactiveObjects){
        removeAllInteractiveObjects();
        addAllInteractiveObjects(_interactiveObjects);
    }

    function addInteractiveObject(_interactiveObject){
        var element = $($(interactiveObjectTemplate)[0]);

        element.click(_interactiveObject.getFunction());
        element.attr('title', _interactiveObject.getName());
        element.addClass(_interactiveObject.getCssClass());


        $(divSelector).append(element);
        if(!_interactiveObject.isVisible())
            element.hide();
    }

    function removeAllInteractiveObjects(){
        $(divSelector).empty();
    }

    function removeInteractiveObject(_interactiveObject){
        $('.'+_interactiveObject.getCssClass()).remove();
    }

//Getters

//Setters
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