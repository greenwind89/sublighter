define([
    'subtitle/view/search/index'
],function() {
    'use strict';

    var SearchView = require('subtitle/view/search/index'),
        searchView = new SearchView();

    core.router.route('', function() {
        core.templateEngine.setMainPage(searchView); 
    });
});
