/*
    This file is required by require.js to work properly. It configures all file paths so it is easier
to import them inside each module.

*/

//Configure all files paths, so inside each module the files address are shorter
require.config({
    baseUrl: 'scripts/',
    paths: {        
        jquery: 'libs/jquery-min',
        text: 'libs/text',

        less: 'libs/less',
        
    }
});
//Init the app when everything is ready
require( ["jquery",  "text!../html/container.html", "less"], function($, container) 
{
    $('document').ready(function()
    {
    //When everything is loaded ...
        $('#game_cuidando_bem').append(container);
 
    });   
});




