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
    'jade!core/template-engine/default/level2-template',
    'core/template-engine/model/navigator',
    'core/template-engine/model/tab-view',
    'core/template-engine/default/nav-item',
], function() { 
    'use strict';
    
    var tpl = require('jade!core/template-engine/default/index');
    var level2Tpl = require('jade!core/template-engine/default/level2-template');
    var NavigatorModel = require('core/template-engine/model/navigator');
    var TabViewModel = require('core/template-engine/model/tab-view');
    var NavItemView = require('core/template-engine/default/nav-item');

    var IndexView = Backbone.View.extend({
        template: tpl,
        level2Template: level2Tpl,

        itemsInLevel1: new util.data.Circle(),

        events: {
            'click .back-btn': 'goBack'
        },

        initialize: function() {
            this.navigator = new NavigatorModel();
            this.isRenderedNavigator = false;
        },

        render: function() {
            var that = this;
            this.$el.html(this.template());
            this.$main = $('#main', this.$el);
            this.$navTabItems = $('#js-nav-tab-items', this.$el);

            this.$topNav = $('#js-template-navigator-top', this.$el);
            this.$bottomNav = $('#js-template-navigator-bottom', this.$el);

            this.$topNavTitle = $('#js-top-nav-title', this.$el);
            return this;
        },

        renderNavigator: function() {
            var tabViews = this.navigator.get('tabViews');
            for(var i = 0, len = tabViews.length; i < len; i++) {
                var $tempView = this.getTempView(i + 1);
                $tempView.html(tabViews[i].get('viewObj').render().el);
                tabViews[i].set('$tempView', $tempView);
                this.$navTabItems.append(new NavItemView({model: tabViews[i]}).render().el);
            }

            this.isRenderedNavigator = true;
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

        renderLevel2: function(view) {
            // this.$el.html(this.level2Template());
            // this.$main = $('#main', this.$el);
            this.turnOnTopNav();
            this.hideAllLevel1Views();
            var $tempViewLvl2 = $('#js-temp-view-level-2', this.$el);
            $tempViewLvl2.addClass('must-show');
            $tempViewLvl2.html(view.render().el);
            return this;
        },

        turnOnTopNav: function() {
            this.$topNav.addClass('must-show');
            this.$bottomNav.hide();
        },

        hideAllLevel1Views: function() {
            var tabViews = this.navigator.get('tabViews');
            if(tabViews.length > 0) {
                for(var i = 0, len = tabViews.length; i < len; i++) {
                    tabViews[i].get('$tempView').removeClass('must-show');
                }
            }
        },

        turnOnBottomNav: function() {
            this.$topNav.removeClass('must-show');
            this.$bottomNav.show();
        },

        renderLevel1: function(view) {
            this.turnOnBottomNav();
            $('#js-temp-view-level-2', this.$el).removeClass('must-show');

            this.isRenderedNavigator || this.renderNavigator();
            var tabViews = this.navigator.get('tabViews');
            if(tabViews.length > 0) {
                for(var i = 0, len = tabViews.length; i < len; i++) {
                    if(tabViews[i].get('viewObj') === view) {
                        // by default, temp view is hidden
                        tabViews[i].get('$tempView').addClass('must-show');;
                    } else {
                        tabViews[i].get('$tempView').removeClass('must-show');;
                    }
                }
            }
        },

        setMainPage: function(view, level) {
            if(level == 2) {
                this.renderLevel2(view);
            } else {
                this.renderLevel1(view);
            }

        },




        setMainPageByUrl: function(url, level) {
            var item = this.navigator.setCurrentTabByProperty('url', url);
            // this.$main.html(item.viewObj.render().el);
            this.setMainPage(item.get('viewObj'), level);
        },

        setItemsLevel1: function(items) {
            for(var i = 0, len = items.length; i < len; i++) {
                //! important to render it first so that we can just attach el of view to retain the content
                this.navigator.addTabView(new TabViewModel(items[i]));
            }
        },

        getTempView: function(index) {
            return $('#js-temp-view-' + index, this.$el);
        },

        setTitle: function(title) {
            this.$topNavTitle.html(title);
        }


    });

    var indexView = new IndexView();

    return {
        getTemplate: function() {
            return indexView.render().el;
        },

        setTitle: function(title) {
            indexView.setTitle(title);
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
            indexView.setItemsLevel1(items);
        },

        indexView: indexView
    };
});

