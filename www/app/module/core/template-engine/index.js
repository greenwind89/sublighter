define([
    'core/template-engine/default/index'
], function() {
    'use strict';
    var engine = require('core/template-engine/default/index');

    return _.extend({
        //Set of signatures of template engine
        setMainPage: function(view) {
        },

        getTemplate: function() {
        }
    }, engine);
});
