define([
    'subtitle/view/search/index',
    'subtitle/view/detail/index',
    'subtitle/collection/subtitle'
],function() {
    'use strict';

    var SearchView = require('subtitle/view/search/index'),
        searchView = new SearchView(),
        DetailView = require('subtitle/view/detail/index'),
        CachedSubtitles = require('subtitle/collection/subtitle').extend({
            localStorage: new Backbone.LocalStorage("CachedSubtitles")
        });

    core.router.route('subtitle/search', function() {
        core.templateEngine.setMainPage(searchView); 
    });

    core.router.route('subtitle/detail/:id', function(id) {
        var sub = core.global.cachedSubtitles.findWhere({
                providerMovieId: id
            }),
            detailView = new DetailView({
                model: sub
            });

        core.templateEngine.setMainPage(detailView); 
    });

    core.global.cachedSubtitles = new CachedSubtitles();
    core.global.cachedSubtitles.fetch();
});
