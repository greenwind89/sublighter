define([
], function() { 
    'use strict';

    var Setting = Backbone.Model.extend({
        defaults: {
            name: '',
            value: ''
        }
    });

    return Setting;
});

