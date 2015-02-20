define([
    'subtitle/model/subtitle'
], function() { 
    'use strict';

    var Subtitle = require('subtitle/model/subtitle');

    var Subtitles = Backbone.Collection.extend({

        model: Subtitle,

        defaults: {
            content: '',
            title: ''
        },

        localStorage: new Backbone.LocalStorage(util.constants.SUBTITLE_TABLE_NAME),


        createIfNotExistFromSearchResult: function(searchResultModel) {
            var deferred = $.Deferred(),
                sub;

            sub = this.findWhere({
                providerMovieId: searchResultModel.get('providerMovieId')
            });

            if(!sub) {
                searchResultModel.downloadSubtitle().done(function(content) {
                    sub = new Subtitle(searchResultModel.toJSON());
                    sub.set('content', content);
                    sub.set('title', searchResultModel.get('moviewUploadedName'));
                    deferred.resolve(sub);
                });
            } else {
                deferred.resolve(sub);
            }

            return deferred.promise();
        }
    });

    return Subtitles;
});

