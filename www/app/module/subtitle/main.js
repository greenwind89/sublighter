define([
    'subtitle/view/search/index',
    'subtitle/view/detail/index',
    'subtitle/collection/subtitle',
    'subtitle/view/list/search-history',
    'word/view/list/saved',
    'word/collection/definition',
    'word/collection/word-list',
    'word/collection/word',
],function() {
    'use strict';

    var SearchView = require('subtitle/view/search/index'),
        searchView = new SearchView(),
        DetailView = require('subtitle/view/detail/index'),
        HistoryView = require('subtitle/view/list/search-history'),
        historyView = new HistoryView(),
        SavedWordsListView = require('word/view/list/saved'),
        savedWordsListView = new SavedWordsListView();


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
        core.db.get(util.constants.SUBTITLE_TABLE_NAME).done(function(subs) {
            var sub = subs.findWhere({
                    providerMovieId: id
                }),
                pageLevel = 2,
                detailView = new DetailView({
                    model: sub
                });

            core.templateEngine.setMainPage(detailView, pageLevel); 
        });
    });


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
            viewObj: savedWordsListView, 
            name: 'Words'
    }]);

    //register DB Tables
    core.db.registerTable(util.constants.SUBTITLE_TABLE_NAME, require('subtitle/collection/subtitle'));
    core.db.registerTable(util.constants.WORD_LIST_TABLE_NAME, require('word/collection/word-list'));

});
