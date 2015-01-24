define([
    'util/debug',
    'util/text',
    'util/time',
    'util/input',
    'util/constants',
    'util/api',
    'util/data',
], function() {
    'use strict';

    var debug = require('util/debug'),
        text  = require('util/text'),
        time  = require('util/time'),
        input = require('util/input'),
        constants = require('util/constants'),
        api = require('util/api'),
        data = require('util/data'),
        observer = _.extend({}, Backbone.Events),

        util  = {
            debug: debug,
            text: text,
            time: time,
            input: input,
            constants: constants,
            observer: observer,
            api: api,
            data: data
        };

    window.util = util;
});
