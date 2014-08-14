/**
 * This model is to create a global model in which other modules can register 
 * its global variables here
 *
 * This is the one and only custom variable that modules can plug into
 *
 */
define([
], function() { 
    'use strict';

    var Global = Backbone.Model.extend({
    });

    return Global;
});

