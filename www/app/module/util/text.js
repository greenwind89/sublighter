define([
], function() {
    'use strict';
    
    return {
        extractNameSeasonAndEpisode: function(str) {
            var season = null,
                str = str.toLowerCase(str),
                episode = null,
                name = str,
                seasonMatches,
                episodeMatches;

            seasonMatches = str.match(/\ss(\d+)/);

            if(seasonMatches && seasonMatches[1]) {
                season = parseInt(seasonMatches[1], 10);

                episodeMatches = str.match(/(\d+)e(\d+)/);
                if(episodeMatches && episodeMatches[2]) {
                    episode = parseInt(episodeMatches[2], 10);
                }

                name = str.substring(0, seasonMatches.index);
            } 

            return {
                season: season,
                episode: episode,
                name: name
            };
        },


    };
});
