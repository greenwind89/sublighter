define([
    'core/template-engine/index'
], function() {
    'use strict';

    var templateEngine = require('core/template-engine/index'),
        contenHolderId = '#content';

    // Set up template skeleton
    $(contenHolderId).html(templateEngine.getTemplate());

    window.core = {
        templateEngine: templateEngine
    };
});
