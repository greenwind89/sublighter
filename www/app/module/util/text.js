define([
], function() {
    'use strict';
    
    return {
        extractNameSeasonAndEpisode: function(text) {
            var season = null,
                str = text.toLowerCase(),
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

        parseSubtitleToSentences: function(data) {

            var splitter            = /\n\n|\r\n\r\n/
              , theWholeAsSentences = []
              , words               = [] // returned
              , sentences           = []
              , totalWords          = 0 //inluding stop words
              , totalSentences      = 0
              , returnedSentences   = [] //returned
              , lastSentence
              , theWhole
              , groupOfTimeAndSentences
            // data = data.replace(/[^A-Za-z]/g, ' ');


            // grouping by heuristic of subtitle files
            groupOfTimeAndSentences = data.split(splitter);

            for(var i = 0, len = groupOfTimeAndSentences.length; i < len; i++) {

                var group     = groupOfTimeAndSentences[i]
                  , times     = group.match(/\d\d:\d\d:\d\d,\d\d\d/g)
                  , sentence  = group.replace(/.+(\r\n|\n).+-->.+(\r\n|\n)/, '')
                  , startTime = this.getTime(times ? times[0] : null)
                  , endTime   = this.getTime(times ? times[1] : null)
                  , tokens    = []

                
                if(sentence) {
                    lastSentence = sentences.push({
                        'content'          : sentence,
                        'timeString'       : times,
                        'startHour'        : startTime['hour'],
                        'startMinute'      : startTime['minute'],
                        'startSecond'      : startTime['second'],
                        'startMillisecond' : startTime['millisecond'],
                        'timeStamp'        : util.time.getTimeStamp(startTime['hour'], startTime['minute'], startTime['second']) // 'words'             : words
                    });
                }

            }

            //let the last sentence be the total time of this movie
            if(lastSentence) {
                sentences.totalTime = lastSentence.timeStamp;
            } else {
                sentences.totalTime = 0;
            }

            return sentences;
        },

        getTime: function(str, unit){
            if(!str) return false;
            var parts       = str.split(':')
              , result      = {}
              , secondParts = parts[2].split(',')

            result['hour']        = parseInt(parts[0], 10);
            result['minute']      = parseInt(parts[1], 10);
            result['second']      = parseInt(secondParts[0], 10);
            result['millisecond'] = parseInt(secondParts[1], 10);

            return unit ? result[unit] : result;
        },

    };
});
