# Cuidando Bem

A point and click game using HTML5

### Dev. Dependencies:
* [node](http://nodejs.org/)
* [grunt](http://gruntjs.com/)
* [bower](http://bower.io/)

### Building the project

First install the Dev. dependencies and run

```

npm install
bower install

```

### Building

    grunt build

or

    grunt build --target dev

Will build the project so it can be easily changed and tested.
After running this command once, check the file "dev.env.json" to speed up your testing for particular game levels or screens

    grunt build --target prod

Will build the project as it should be deployed, with all minifications configured. It ignores "dev.env.json" config. It removes all console logs.

    grunt build --target rel

Will update the project version based on --v variable and compress all files into a .zip for easily deploying on a web server.

### Running

    grunt serve

or

    grunt serve --target dev

Will create an http serving the game 'dev' version on localhost:8080 so you can test it and actually read the source files

    grunt serve --target prod

Will run the game as you would see it published, also on localhost:8080

### Documentation

The project is documented using JSDOC commenting style

To see our documentation you will have to run

    grunt docs

