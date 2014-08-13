define([
    'util/debug',
    'util/text'
], function() {
    'use strict';

    var debug = require('util/debug'),
        text = require('util/text'),
        util = {
            debug: debug,
            text: text
        };

    window.util = util;
});
