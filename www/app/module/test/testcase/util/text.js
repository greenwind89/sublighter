define([
], function() {
    'use strict';
    
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

            (result.season === null).should.be.true;
            (result.episode === null).should.be.true;
            result.name.should.equal('breaking bad');
        });
    });
});
