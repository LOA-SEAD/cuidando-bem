/*
    This file is required by require.js to work properly. It configures all file paths so it is easier
to import them inside each module.

    Date: 30/06/2014
    Author: Otho - Marcelo Lopes Lotufo;

    Last Revision: (date)
    Last Revisor: (name)


*/

//Configure all files paths, so inside each module the files adress are shorter
require.config({
    baseUrl: 'scripts/',
    paths: {        
        jquery: 'libs/jquery-min',
        text: 'libs/text',
        
    }
});
//Init the app when everything is ready
require( ["jquery", "mainController"], function($, mainController, test) 
{
    $('document').ready(function()
    {
    //When everything is loaded ...
 
    });   
});




