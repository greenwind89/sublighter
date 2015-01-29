
/**
 *
 * The default navigation engine contains 2 kind of page 
 * 1: level 1 pages, which can go to level 2 or change to other level 1 pages by swipe action 
 * 2: level 2 pages mostly are detail pages in which common action is backing 
 *
 * For more information about pyramid navigation model refer to Designing Interface
 *
 */ 
define([
    'jade!core/template-engine/default/index',
    'jade!core/template-engine/default/level2-template'
], function() { 
    'use strict';
    
    var tpl = require('jade!core/template-engine/default/index');
    var level2Tpl = require('jade!core/template-engine/default/level2-template');

    var IndexView = Backbone.View.extend({
        template: tpl,
        level2Template: level2Tpl,

        itemsInLevel1: new util.data.Circle(),

        events: {
            'click .back-btn': 'goBack'
        },

        render: function() {
            var that = this;
            this.$el.html(this.template());
            this.$main = $('#main', indexView.$el);

            // Hammer(this.$main.get(0)).on('swipeleft', function(event) {
            //     console.log('goleft');
            //     that.goRight();
            // });

            // Hammer(this.$main.get(0)).on('swiperight', function(event) {
            //     console.log('goright');
            //     that.goLeft();
            // });

            this.$leftItem = $('#js-left-nav-item', this.$el);
            this.$rightItem = $('#js-right-nav-item', this.$el);
            this.$centerItem = $('#js-center-nav-item', this.$el);

            this.renderNavigator();
            return this;
        },

        renderNavigator: function() {
            // asumme #items >= 3
            if(!this.itemsInLevel1.isEmpty()) { 
                this.$leftItem.html('<a href="#' + this.itemsInLevel1.getLeft().url + '">' + this.itemsInLevel1.getLeft().name + '</a>');
                this.$rightItem.html('<a href="#' + this.itemsInLevel1.getRight().url + '">' + this.itemsInLevel1.getRight().name + '</a>');
                this.$centerItem.html(this.itemsInLevel1.getCurrent().name);
            }
        },

        goLeft: function() {
            var currentItem = this.itemsInLevel1.goLeft();
            this.goToItemUsingItsUrl(currentItem);
        },

        goRight: function() {
            var currentItem = this.itemsInLevel1.goRight();
            this.goToItemUsingItsUrl(currentItem);
        },

        goToItemUsingItsUrl: function(item) {
            window.location = '#' + item.url;
        },

        goBack: function() {
            window.history.back();
        },

        renderLevel2: function() {
            this.$el.html(this.level2Template());
            return this;
        },

        setMainPage: function(view, level) {
            if(level == 2) {
                this.renderLevel2();
            } else {
                this.render();
            }

            this.$main.html(view.render().el);
        },

        setMainPageByUrl: function(url, level) {
            var item = this.itemsInLevel1.setCurrentByItemProperty('url', url);
            // this.$main.html(item.viewObj.render().el);
            this.setMainPage(item.viewObj, level);
        }


    });

    var indexView = new IndexView();

    return {
        getTemplate: function() {
            return indexView.render().el;
        },

        setMainPage: function(view, level) {
            indexView.setMainPage(view, level);
        },

        setMainPageByUrl: function(url, level) {
            indexView.setMainPageByUrl(url, level);
        },

        /**
         * {url, viewObj, name} 
         */
        setItemsOnLevel1: function(items) {
            for(var i = 0, len = items.length; i < len; i++) {
                indexView.itemsInLevel1.push(items[i]);
            }
        },
        indexView: indexView
    };
});


