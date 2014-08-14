define([
    'util/debug',
    'util/text',
    'util/time'
], function() {
    'use strict';

    var debug = require('util/debug'),
        text = require('util/text'),
        time = require('util/time'),
        util = {
            debug: debug,
            text: text,
            time: time
        };

    window.util = util;
});
