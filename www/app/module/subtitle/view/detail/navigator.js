define([
    'jade!subtitle/template/detail/navigator',
    'subtitle/model/navigator',
    'subtitle/model/search-sentence-result'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/navigator'),
        NavigatorModel = require('subtitle/model/navigator'),
        SearchSentenceResult = require('subtitle/model/search-sentence-result');

    var Navigator = Backbone.View.extend({
        template: tpl,

        // className: 'panel panel-default',

        // for internal use
        intervalFunction: function() { }, // auto play function
        isPlaying: false,

        events: {
            'click #js-forward': 'handleClickOnForward',
            'click #js-backward': 'handleClickOnBackward',
            'click #js-play-pause': 'handleClickOnPlayPause',
            'click #js-search-direction': 'handleClickOnSearchDirection',
            'click #js-analyzer-expand-collapse-btn': 'handleClickOnCollapseExpandBtn',
        },

        initialize: function() {
            var isScrolling = false,
                that = this,
                setupScrolling;

            this.sentences = this.model.getSentences();
            this.sentences.setCurrent(this.sentences.first()); // Init with first sentence as current sentence

            this.navigator = new NavigatorModel();
            this.navigator.on('change:isPlaying', this.handleChangePlayingStatus, this);

            $(window).on('scroll', function() { 
                isScrolling || setupScrolling();
            });

            setupScrolling = function() {
                isScrolling = true;
                setTimeout(function() { // after a period, assume that it stopped scrolling
                    isScrolling = false;
                    setTimeout(function() { // we assume that user stopped scrolling but it should wait a short amount of time to make sure
                        // console.log('Move to new scrolled screen');
                        isScrolling || that.setCurrentItemForCurrentView();
                        isScrolling = true;
                        setTimeout(function() {
                            isScrolling = false;
                        }, 500);
                    }, 300);
                }, 500);
            };

            // this.sentences.on('current-change', function() {
            //     that.isLockAutoScrolling= true;

            //     setTimeout(function() { // lock scrolling for 1 second
            //         that.isLockAutoScrolling = false;
            //     }, 1000);

            // }, this);

            return this;
        },

        render: function() {
            var that = this;

            this.$el.html(this.template());

            this.$searchInput = $('#js-navigator-search-input', this.$el);
            this.searchResult = new SearchSentenceResult();

            util.input.autoTrigger(this.$searchInput, function() {
                that.search();
            }, 1000);

            return this;
        },

        handleClickOnForward: function() {
            this.go(1);
        },

        handleClickOnBackward: function() {
            this.go(-1);
        },

        handleClickOnPlayPause: function() {
            if(this.navigator.get('isPlaying') === false) {
                this.play();
            } else {
                this.pause();
            }
        },

        go: function(step) {
            var step                = step || 1,
                current             = this.sentences.getCurrent(),
                next                = this.sentences.at(this.sentences.indexOf(current) + step);

            if(next) {
                this.sentences.setCurrent(next);
            } else {
                util.debug.log('Outbound! Should be being at first or last sentences');
            }
        },

        play: function(step, time) {
            var current             = this.sentences.getCurrent(),
                currentTimeInSecond = current.get('timeStamp'),
                step                = step || 1,
                time                = time || 1000,
                that                = this,
                next                = this.sentences.at(this.sentences.indexOf(current) + step);
            
            if(next) {
                that.navigator.set('isPlaying', true);
                that.intervalFunction = setInterval(function(){
                    currentTimeInSecond++;
                    if(currentTimeInSecond >= next.get('timeStamp')) {
                        that.sentences.setCurrent(next);
                        next = that.sentences.at(that.sentences.indexOf(next) + step);
                        if(!next) {
                            that.pause();
                        }
                    }

                }, time);
            }
        },

        pause: function() {
            this.navigator.set('isPlaying', false);
            clearInterval(this.intervalFunction);
        },

        handleChangePlayingStatus: function() {
            if(this.navigator.get('isPlaying') === true) {
                $('#js-play-pause', this.$el).html('Pause');
            } else {
                $('#js-play-pause', this.$el).html('Play');
            }
        },

        setCurrentItemForCurrentView: function() {
            var count = 0,
                scrollY = window.scrollY + util.constants.NAVIGATOR_AND_HEADER_HEIGHT; //mo

            if(this.isCurrentElementInViewport()) {

                // console.log('Current element is in view port, will not scroll automatically');
                return this;
            }

            // console.log('Set current by scrolling');

            $('.sentence').each(function(idx, el) {
                if($(el).offset().top >= scrollY) {
                    count++;
                }
                if(count >= 3) {
                    $(el).trigger('set-current');
                    return false;
                }
            });
        },

        isCurrentElementInViewport: function() {
            return this.isElementInViewport($('.current').get(0));
        },

        isElementInViewport: function(el) {
            if(!el) return false;
            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)  /*or $(window).height() */
                // rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        },

        search: function() {
            var keyword = this.$searchInput.val().trim(),
                matches = [],
                isBackward = this.navigator.get('searchDirection') === 'backward',
                matches = keyword.match(/(\d+):(\d+)(:\d+)?/), // check search by time
                result;

            this.navigator.resetSearchIndex();
            if(matches) { // it is search time
                var hour   = 0,
                    minute = 0,
                    second = 0;

                if(matches.length === 4) { // [whole, hour, minute, second] or [whole, minute, second, undefined]
                    if(matches[3]) { // there is 3 numbers
                        hour   = parseInt(matches[1], 10) || 0;
                        minute = parseInt(matches[2], 10) || 0,
                        second = parseInt(matches[3], 10) || 0;
                    } else {
                        minute = parseInt(matches[1], 10) || 0,
                        second = parseInt(matches[2], 10) || 0;
                    }
                } else {
                    util.debug.error('Something is wrong');
                    return false;
                }

                result = [this.sentences.getClosestByTime(hour, minute, second, isBackward)];
            } else {
                result = this.sentences.query({
                    content: {
                        $likeI: keyword // case insensitive
                    }
                }, {
                    sortBy: 'id',
                    order: isBackward ? 'desc' : 'asc'
                });
            }

            this.navigator.set('searchResults', result);
            this.navigator.set('searchKeyword', keyword);

            this.gotoNextResult();
        },

        gotoNextResult: function() {
            
            !this.navigator.hasNextSearchResult() || this.sentences.setCurrent(this.navigator.getNextSearchResult());
        },

        handleClickOnSearchDirection: function(evt) {
            var $el = $(evt.currentTarget); //the one listening to the click

            if($el.data('direction') === 'forward') {
                $el.data('direction', 'backward');
                $el.html('&lt;&lt;');
                this.navigator.set('searchDirection', 'backward');
                this.search();
            } else {
                $el.data('direction', 'forward');
                $el.html('&gt;&gt;');
                this.navigator.set('searchDirection', 'forward');
                this.search();
            }
        },

        handleClickOnCollapseExpandBtn: function() {
        }

    });

    return Navigator;
});

