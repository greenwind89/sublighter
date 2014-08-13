define([
    'core/model/setting'
], function() { 
    'use strict';

    var SettingModel = require('core/model/setting');

    var Settings = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("settings"),
        model: SettingModel
    });

    return Settings;
});

