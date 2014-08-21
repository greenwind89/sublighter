define([
], function() {
    'use strict';
    
    var stopWordsList = [ "", "-", "a", "am", "an", "and", "are", "aren't", "as", "at", "be", "been", "being", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "for", "from", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "me", "mustn't", "my", "no", "not", "of", "off", "on", "or", "our", "ours ", "ourselves", "out", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "they", "they'd", "they'll", "they're", "they've", "this", "to", "too", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves" ];

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

            var splitter            = /\n\n|\r\n\r\n/,
                theWholeAsSentences = [],
                words               = [],
                sentences           = [],
                totalWords          = 0,
                totalSentences      = 0,
                returnedSentences   = [],
                lastSentence,
                theWhole,
                groupOfTimeAndSentences;


            // grouping by heuristic of subtitle files
            groupOfTimeAndSentences = data.split(splitter);

            for(var i = 0, len = groupOfTimeAndSentences.length; i < len; i++) {

                var group     = groupOfTimeAndSentences[i] ,
                    times     = group.match(/\d\d:\d\d:\d\d,\d\d\d/g) ,
                    sentence  = group.replace(/.+(\r\n|\n).+-->.+(\r\n|\n)/, '') ,
                    startTime = this.getTime(times ? times[0] : null) ,
                    endTime   = this.getTime(times ? times[1] : null) ,
                    tokens    = [];
                
                if(sentence) {
                    lastSentence = sentences.push({
                        'content'          : sentence,
                        'timeString'       : times,
                        'startHour'        : startTime.hour,
                        'startMinute'      : startTime.minute,
                        'startSecond'      : startTime.second,
                        'startMillisecond' : startTime.millisecond,
                        'timeStamp'        : util.time.getTimeStamp(startTime.hour, startTime.minute, startTime.second) 
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
            var parts       = str.split(':'),
                result      = {},
                secondParts = parts[2].split(',');

            result.hour        = parseInt(parts[0], 10);
            result.minute      = parseInt(parts[1], 10);
            result.second      = parseInt(secondParts[0], 10);
            result.millisecond = parseInt(secondParts[1], 10);

            return unit ? result[unit] : result;
        },

        getWordsInSentence: function(sentence) {

            var str = sentence.replace(/(\r\n|\n|\r)/gm,' '), //remove newline characters
                units = str.split(' '),
                wordsInSentence = [];

            _.each(units, function(unit) {
                var cleanWord = this.cleanInsignificantSymbols(unit);

                wordsInSentence.push({
                    original: unit, 
                    rootWord: this.getRootWord(cleanWord), 
                    isQualify: !this.isStopWord(cleanWord)
                });
                
            }, this);

            return wordsInSentence;
        },

        cleanInsignificantSymbols: function(clumsyWord) {
            var cleanWord;
            // replace non alphabetic characater at front and rear
            clumsyWord = clumsyWord.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');

            // remove money symbol
            clumsyWord = clumsyWord.replace(/^(\$|\243|\245)\d+^/g, '');

            //remove number
            clumsyWord = clumsyWord.replace(/^\d+$/g, '');

            // trim remaining space
            cleanWord = clumsyWord.trim();

            return cleanWord;
        },

        getRootWord: function(str) {
            return str;
        },

        isStopWord: function(word) {

            return stopWordsList.indexOf(word.toLowerCase()) !== -1;
        }

    };
});
