define([
    'util/debug',
    'util/text',
    'util/time',
    'util/input',
    'util/constants',
], function() {
    'use strict';

    var debug = require('util/debug'),
        text  = require('util/text'),
        time  = require('util/time'),
        input = require('util/input'),
        constants = require('util/constants'),
        util  = {
            debug: debug,
            text: text,
            time: time,
            input: input,
            constants: constants
        };

    window.util = util;
});
