/**
 *
 * @name Stage_Controller
 * @module
 */
define(['text!../html/container.html'], function (container) {


    /**
     * An array that stores all Screen objects
     * @private
     * @type {array}
     *
     * @memberOf module:Stage_Controller
     */
    var screens = [];
    /**
     * The path where the stage controller will look for the html pages
     * @private
     * @type {string}
     *
     * @memberOf module:Stage_Controller
     */
    var htmlPath;
    /**
     * The path where the stage controller will look for the js controllers
     * @private
     * @type {string}
     *
     * @memberOf module:Stage_Controller
     */
    var controllerPath;

    /**
     * This function is called to init this module
     * @method start
     * @param {string} id The id from the main html page that the stage controller will append its own container for the rest of the pages
     * @public
     *
     * @memberOf module:Stage_Controller
     */
    function start(id) {
        $('#' + id).append(container);
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
         * @private
         *
         * @memberOf module:Stage_Controller.Screen
         */
        var name = _name;
        /**
         * The screen html path
         * @private
         * @type {string}
         * @private
         *
         * @memberOf module:Stage_Controller.Screen
         */
        var htmlPage = _htmlPage;
        /**
         * The screen controller path
         * @private
         * @type {string}
         * @private
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
        L.log(['Adding Screen: ', _name, _htmlPage, _controller], 1);
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

        //L.log('text!'+htmlPath+nextScreen.getHtmlPage());


        require(['text!' + htmlPath + nextScreen.getHtmlPage(), controllerPath + nextScreen.getControllerName()], function (page, controller) {
            L.log("Actual Screen Name: " + nextScreen.getControllerName());
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
        setControllersPath: setControllersPath
    }
});