/**
 *
 * @name Stage_Controller
 * @module
 */
define(function () {
    console.info("Stage - module loaded");
    //Imports
    var Errors = {
        undefinedContainer: "'container' is undefined and Stage can't continue without a place to load its content"
    };

    /**
     * An array that stores all Screen objects
     * @private
     * @type {Array}
     *
     * @memberOf module:Stage_Controller
     */
    var screens = [];

    /**
     * Html path
     * @private
     * @type {string}
     *
     * @memberOf module:Stage_Controller
     */
    var htmlPath;
    /**
     * The path where the Stage controller will look for the js controllers
     * @private
     * @type {string}
     *
     * @memberOf module:Stage_Controller
     */
    var controllerPath;

    /**
     * Container should be an id on the html page to be the base for all other html content
     * @private
     * @type {string}
     *
     * @memberOf module:Stage_Controller
     */
    var containerId;

    var startingScreenId = 0;
    /**
     * This function is called to init this module
     * @method start
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function start() {
        if(containerId == undefined)
            throw new Error(Errors.undefinedContainer);

        changeScreen(startingScreenId);
    }

    /**
     * This class stores the name of the page, its html path and its controller path
     * @class Screen
     * @param {string} _name
     * @param {string} _htmlPage
     * @param {string} _controllerName
     * @return ObjectExpression
     * @private
     *
     * @memberOf module:Stage_Controller
     */
    function Screen(_name, _htmlPage, _controllerName) {

        /**
         * The screen name
         * @private
         * @type {string}
         *
         * @memberOf module:Stage_Controller.Screen
         */
        var name = _name;
        /**
         * The screen html path
         * @private
         * @type {string}
         *
         * @memberOf module:Stage_Controller.Screen
         */
        var htmlPage = _htmlPage;
        /**
         * The screen controller path
         * @private
         * @type {string}
         *
         * @memberOf module:Stage_Controller.Screen
         */
        var controllerName = _controllerName;

        /**
         * @method getHtmlPage
         * @return {string} htmlPage
         * @public
         *
         * @memberOf module:Stage_Controller.Screen
         */
        function getHtmlPage() {
            return htmlPage;
        }

        /**
         * @method getControllerName
         * @return {string} controllerName
         * @public
         *
         * @memberOf module:Stage_Controller.Screen
         */
        function getControllerName() {
            return controllerName;
        }

        return {
            getHtmlPage: getHtmlPage,
            getControllerName: getControllerName
        }
    }

    /**
     * Adds a screen object to screens array
     * @method addScreen
     * @param {string} _name
     * @param {string} _htmlPage
     * @param {string} _controller
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function addScreen(_name, _htmlPage, _controller) {
        console.log('\tAdding Screen: ', _name, _htmlPage, _controller);
        screens.push(new Screen(_name, _htmlPage, _controller));
    }

    /**
     * This function changes the screen that is rendered
     * @method changeScreen
     * @param {int} nextScreenId
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function changeScreen(nextScreenId) {
        var nextScreen = screens[nextScreenId];

        //console.log('text!'+htmlPath+nextScreen.getHtmlPage());


        require(['text!' + htmlPath + nextScreen.getHtmlPage(), controllerPath + nextScreen.getControllerName()], function (page, controller) {
            console.log("Actual Screen Name: " + nextScreen.getControllerName());
            $('#stage').empty();
            $('#stage').append(page);
            controller.load();
        });
    }

    /**
     * Sets the base html path
     * @method setHtmlPath
     * @param {string} _path
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function setHtmlPath(_path) {
        htmlPath = _path;
    }

    /**
     * Container setter
     *
     * @param _id
     */
    function setContainer(_id){
        containerId = _id;
    }

    function setStartingScreenId(_id){
        startingScreenId = _id;
    }

    function getContainer(){
        return containerId;
    }

    /**
     * Sets the base controller path
     * @method setControllersPath
     * @param {string} _path
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function setControllersPath(_path) {
        controllerPath = _path;
    }

    return {
        start: start,
        addScreen: addScreen,
        changeScreen: changeScreen,

        setHtmlPath: setHtmlPath,
        setControllersPath: setControllersPath,
        setStartingScreenId: setStartingScreenId,

        setContainer: setContainer,
        getContainer: getContainer
    }
});