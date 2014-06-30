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
        
    }
});
//Init the app when everything is ready
require( ["jquery"], function($) 
{
    $('document').ready(function()
    {
    //When everything is loaded ...
 
    });   
});




