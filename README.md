The core source code physical structure is modularized by RequireJS, the logical structure is constructed on Backbone, the DOM manipulations are performed by the assistance of jQuery. 

We use mocha as our main testing framework and implemented as a module in our core system. 

To install this project firstly you need to create a cordova project refer to http://cordova.apache.org/ for more detail how to set up a cordova project. Then installing  sublighter on your computer 

* Firsly install bower dependencies by `bower install`
* Then install some node js dependencies by `npm install` 
* To build `grunt build`
* To compile less to csss `grunt lessc`
* To run jshint `grunt jshint`

After that, you only need to create a symlink in cordova project pointing to www folder of sublither repository and you are safe to lauch sublighter as a part of a cordova project.
