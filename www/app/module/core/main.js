define([
    'core/template-engine/index', 
    'core/api/index', 
    'core/collection/setting'
], function() {
    'use strict';

    var templateEngine = require('core/template-engine/index'),
        api            = require('core/api/index'),
        Settings       = require('core/collection/setting'),
        settings       = new Settings(),
        Router = Backbone.Router.extend({}),
        contenHolderId = '#content';

    // Set up template skeleton
    $(contenHolderId).html(templateEngine.getTemplate());

    // settings.fetch();

    window.core = {
        templateEngine: templateEngine,
        api           : api,
        settings      : settings,
        router: new Router(),
    };
});
