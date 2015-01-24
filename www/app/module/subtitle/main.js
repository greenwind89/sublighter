define([
    'subtitle/view/search/index',
    'subtitle/view/detail/index',
    'subtitle/collection/subtitle',
    'subtitle/view/list/search-history',
    'word/view/list/saved',
    'word/collection/definition'
],function() {
    'use strict';

    var SearchView = require('subtitle/view/search/index'),
        searchView = new SearchView(),
        DetailView = require('subtitle/view/detail/index'),
        HistoryView = require('subtitle/view/list/search-history'),
        historyView = new HistoryView(),
        CachedSubtitles = require('subtitle/collection/subtitle').extend({
            localStorage: new Backbone.LocalStorage("CachedSubtitles")
        }),
        SavedDefs = require('word/collection/definition').extend({
            localStorage: new Backbone.LocalStorage("SavedDefs")
        }),
        SavedWordsList = require('word/view/list/saved'),
        savedWordsList = new SavedWordsList();


    core.router.route('word/list/saved', function() {
        core.templateEngine.setMainPageByUrl('word/list/saved'); 
    });

    core.router.route('subtitle/search', function() {
        core.templateEngine.setMainPageByUrl('subtitle/search'); 
    });

    core.router.route('subtitle/history', function() {
        core.templateEngine.setMainPageByUrl('subtitle/history'); 
    });

    core.router.route('subtitle/detail/:id', function(id) {
        var sub = core.global.cachedSubtitles.findWhere({
                providerMovieId: id
            }),
            pageLevel = 2,
            detailView = new DetailView({
                model: sub
            });

        core.templateEngine.setMainPage(detailView, pageLevel); 
    });

    core.global.cachedSubtitles = new CachedSubtitles();
    core.global.cachedSubtitles.fetch();

    core.global.savedDefs = new SavedDefs();
    core.global.savedDefs.fetch();

    core.templateEngine.setItemsOnLevel1([
        {
            url: 'subtitle/history',
            viewObj: historyView, 
            name: 'History'
        },{
            url: 'subtitle/search',
            viewObj: searchView, 
            name: 'Search',
        }, {
            url: 'word/list/saved',
            viewObj: savedWordsList, 
            name: 'Words'
    }]);
});
