/*


 */

define([], function () {

    var generalPath = "../scripts//gameConfig/";
    var filePaths = [
        "file1",
        "file2"
    ];

    for(i = 0; i< filePaths.length; i++){
        require([generalPath+ filePaths[i]]);
    }
});