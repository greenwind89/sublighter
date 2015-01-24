define([
], function() {
    'use strict';

    var Circle = function() {
        this.items = [];
        this.currentIndex = 0;

        this.push = function(item) {
            this.items.push(item);
        }

        this.goRight = function() {
            return this.getRight(true);
        }

        this.getRight = function(changeCurrent) {
            var nextIndex = null;
            changeCurrent = changeCurrent || false;
            if(this.items.length === 0) return null;
            if(this.items.length === 1) {
                nextIndex = 0;
            } else {
                nextIndex = (this.currentIndex + 1) % this.items.length;
            }

            if(changeCurrent) this.currentIndex = nextIndex;
            return this.items[nextIndex];
        }

        this.goLeft = function() {
            return this.getLeft(true);
        }

        this.getLeft = function(changeCurrent) {
            var nextIndex = null;
            changeCurrent = changeCurrent || false;
            if(this.items.length === 0) return null;

            if(this.currentIndex - 1 < 0) {
                nextIndex = this.items.length - 1;
            } else {
                nextIndex = this.currentIndex - 1;
            }

            if(changeCurrent) this.currentIndex = nextIndex;
            return this.items[nextIndex];
        }

        this.setCurrentIndex = function(index) {
            this.currentIndex = index;
        }

        this.getCurrent = function() {
            return this.items.length > 0 ? this.items[this.currentIndex] : null;
        }

        this.setCurrentByItemProperty = function(propName, propValue) {
            for(var i = 0, len = this.items.length; i < len; i++) {
                if(this.items[i][propName] === propValue) {
                    this.currentIndex = i;
                    return this.items[i];
                }
            }

            return false;
        }

        this.isEmpty = function(){
            return this.items.length === 0;
        }
    };

    return {
        Circle: Circle
    };
});

