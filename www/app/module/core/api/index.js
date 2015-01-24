define([
    'core/api/subtitle/index',
    'core/api/dictionary/index'
], function() {
    'use strict';

    var subtitleApi = require('core/api/subtitle/index'),
        dictionaryApi = require('core/api/dictionary/index');

    return {
        subtitle: subtitleApi,
        dictionary: dictionaryApi
    };
});
