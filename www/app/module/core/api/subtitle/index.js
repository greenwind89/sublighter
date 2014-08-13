define([
    'core/api/subtitle/opensubtitle'
], function() {
    'use strict';
    var openSubtitleApi = require('core/api/subtitle/opensubtitle');

    return _.extend({
        search: function(params) { }
    }, openSubtitleApi);
});
