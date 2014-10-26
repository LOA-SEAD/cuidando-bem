/**
 *
 * @name Stage_Controller
 * @module
 */
define(['text!../html/container.html'], function (container) {
    /**
     * Description
     * @method start
     * @param {} id
     * @memberOf module:Stage_Controller
     */
    function start(id) {
        $('#' + id).append(container);
    }

    /**
     * Description
     * @method Screen
     * @param {} _name
     * @param {} _htmlPage
     * @param {} _controllerName
     * @return ObjectExpression
     * @memberOf module:Stage_Controller
     */
    function Screen(_name, _htmlPage, _controllerName) {
        var name = _name;
        var htmlPage = _htmlPage;
        var controllerName = _controllerName;

        /**
         * Description
         * @method getHtmlPage
         * @return htmlPage
         * @memberOf module:Stage_Controller
         */
        function getHtmlPage() {
            return htmlPage;
        }

        /**
         * Description
         * @method getControllerName
         * @return controllerName
         * @memberOf module:Stage_Controller
         */
        function getControllerName() {
            return controllerName;
        }

        return {
            getHtmlPage: getHtmlPage,
            getControllerName: getControllerName
        }
    }

    var screens = [];
    var htmlPath;
    var controllerPath;


    /**
     * Description
     * @method addScreen
     * @param {} _name
     * @param {} _htmlPage
     * @param {} _controller
     * @memberOf module:Stage_Controller
     */
    function addScreen(_name, _htmlPage, _controller) {
        L.log(['Adding Screen: ', _name, _htmlPage, _controller], 1);
        screens.push(new Screen(_name, _htmlPage, _controller));
    }

    /**
     * Description
     * @method changeScreen
     * @param {} nextScreenId
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
     * Description
     * @method setHtmlPath
     * @param {} path
     * @memberOf module:Stage_Controller
     */
    function setHtmlPath(path) {
        htmlPath = path;
    }

    /**
     * Description
     * @method setControllersPath
     * @param {} path
     * @memberOf module:Stage_Controller
     */
    function setControllersPath(path) {
        controllerPath = path;
    }

    return {

        start: start,
        addScreen: addScreen,
        changeScreen: changeScreen,

        setHtmlPath: setHtmlPath,
        setControllersPath: setControllersPath,
    }
});