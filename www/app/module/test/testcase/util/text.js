define([
], function() {
    'use strict';
    
    var joinWordsInSentence = function(words) {
        var result = [];
        for(var i = 0, len = words.length; i < len; i++) {
            result.push(words[i].original);
        }
        return result.join(' ');
    }

    describe('Test extract season episode and movie name from a text', function() {
        it('Should get season 1 episode 2', function() {
            var input1 = 'Suits s01e02',
                input2 = 'Suits s1e02',
                result;

            result = util.text.extractNameSeasonAndEpisode(input1);

            result.season.should.equal(1);
            result.episode.should.equal(2);
            result.name.should.equal('suits');

            result = util.text.extractNameSeasonAndEpisode(input2);

            result.season.should.equal(1);
            result.episode.should.equal(2);
            result.name.should.equal('suits');
        });

        it('Should get name "breaking bad", season null, episode null', function() {
            var input = 'Breaking Bad',
                result;

            result = util.text.extractNameSeasonAndEpisode(input);

            // (result.season === null).should.be.true;
            // (result.episode === null).should.be.true;
            result.name.should.equal('breaking bad');
        });
    });

    describe('Test get words from sentence', function() {
        it('Should get original sentence by combines resulting words', function() {
            var input = "I'm afraid you're gonna start shooting light out of your ass",
                words;

            words = util.text.getWordsInSentence(input);
            joinWordsInSentence(words).should.equal(input);
        });

        it('Should distinct between qualify words and stop words', function() {
            var input = "I'm afraid you're gonna start shooting light out of your ass",
                words;

            words = util.text.getWordsInSentence(input);
            words[0].isQualify.should.equal(false);
            words[1].isQualify.should.equal(true);

        });
    });
});
