define([
    'subtitle/model/subtitle'
], function() { 
    'use strict';

    var Subtitle = require('subtitle/model/subtitle');

    var Subtitles = Backbone.Collection.extend({

        model: Subtitle,

        localStorage: new Backbone.LocalStorage("SubtitleCollection"),

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
                    core.global.cachedSubtitles.create(sub);
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

