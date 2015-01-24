define([
], function() {
    'use strict';
    
    describe('Test basic functions of circle data structure', function() {
        it('Should return 2 for right, 1 for left', function() {
            var circle = new util.data.Circle(); 
            circle.push(1);
            circle.push(2);
            circle.push(3);
            circle.setCurrentIndex(0);

            var left = circle.goLeft();
            var current1 = circle.getCurrent();

            var right = circle.goRight();
            var current2 = circle.getCurrent();

            left.should.equal(3);
            current1.should.equal(3);

            right.should.equal(1);
            current2.should.equal(1);

        });

        it('Should return null', function() {
            var circle = new util.data.Circle(); 

            var left = circle.goLeft();
            var right = circle.goRight();

            (left === null).should.be.ok;
            (right === null).should.be.ok;
        });

        it('Should return the only item in set', function() {
            var circle = new util.data.Circle(); 
            circle.push(1);

            var left = circle.goLeft();
            var current1 = circle.getCurrent();

            var right = circle.goRight();
            var current2 = circle.getCurrent();

            left.should.equal(1);
            current1.should.equal(1);

            right.should.equal(1);
            current2.should.equal(1);

        });
    });

});
