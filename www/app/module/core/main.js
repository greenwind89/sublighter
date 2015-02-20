define([
    'core/template-engine/index', 
    'core/api/index', 
    'core/db/index', 
    'core/collection/setting',
    'core/model/global'
], function() {
    'use strict';

    var templateEngine = require('core/template-engine/index'),
        api            = require('core/api/index'),
        db             = require('core/db/index'),
        Settings       = require('core/collection/setting'),
        settings       = new Settings(),
        Router         = Backbone.Router.extend({}),
        contenHolderId = '#content',
        Global         = require('core/model/global');

    // Set up template skeleton
    $(contenHolderId).html(templateEngine.getTemplate());

    // settings.fetch();

    window.core = {
        templateEngine: templateEngine,
        api           : api,
        settings      : settings,
        router        : new Router(),
        global        : new Global(),
        db            : db
    };

    window.location = '#subtitle/search';
});
