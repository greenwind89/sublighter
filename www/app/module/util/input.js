define([
], function() {
    'use strict';
    return {
        // if user stop x seconds on the input, the callback will be triggered
        autoTrigger: function($el, callback, timeout) {
            //setup before functions
            var typingTimer,                //timer identifier
                doneTypingInterval = timeout || 2000;  //time in ms, 2 seconsd for example

            //on keyup, start the countdown
            $el.keyup(function(){
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });

            //on keydown, clear the countdown 
            $el.keydown(function(){
                clearTimeout(typingTimer);
            });

            //user is "finished typing," do something
            function doneTyping () {
                //do something
                callback();
            }

        },
    };
});
