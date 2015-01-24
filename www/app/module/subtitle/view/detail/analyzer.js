define([
    'jade!subtitle/template/detail/analyzer',
    'word/model/definition',
    'jade!subtitle/template/detail/definition-item',
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/analyzer');
    var definitionItemTpl = require('jade!subtitle/template/detail/definition-item');
    var Definition = require('word/model/definition');

    var AnalyzerView = Backbone.View.extend({
        template: tpl,

        initialize: function() {
            util.observer.on('view-definition', this.showDefinition, this);
            this.isCollapsed = false;
        },

        events: {
            'click #js-analyzer-expand-collapse-btn': 'handleClickOnCollapseExpandBtn'
        },


        // className: 'panel panel-default',

        render: function() {
            this.$el.html(this.template());
            this.$currentWordTitle = $('#js-current-word-title', this.$el);
            this.$definitionHolder = $('#js-word-definition-holder', this.$el);
            this.$panelHolder = $('#js-analyzer-panel', this.$el);
            this.$collapseExpandBtn = $('#js-analyzer-expand-collapse-btn', this.$el);

            this.setStateToExpanded();
            return this;
        },

        handleClickOnCollapseExpandBtn: function() {
            if(this.isCollapsed) {
                this.setStateToExpanded();
            } else {
                this.setStateToCollapsed();
            }
        },

        setStateToExpanded: function() {
            this.$panelHolder.show();
            this.isCollapsed = false;
            this.$collapseExpandBtn.html('&gt;');
        },

        setStateToCollapsed: function() {
            this.$panelHolder.hide();
            this.isCollapsed = true;
            this.$collapseExpandBtn.html('&lt;');
        },

        changeCurrentWordTitle: function(title) {
            this.$currentWordTitle.html(title);
        },

        showDefinition: function(str) {
            var that = this;
            this.changeCurrentWordTitle(str);
            core.api.dictionary.retrieveDefinition(str).done(function(defs) {
                that.$definitionHolder.html('');
                _.each(defs, function(def) {
                    that.$definitionHolder.append(new DefinitionItemView({
                        model: new Definition({
                            word: str,
                            content: def.definition
                        })
                    }).render().el);
                });
            });
        }
    });

    var DefinitionItemView = Backbone.View.extend({
        className: 'list-group-item',

        template: definitionItemTpl,

        events: {
            'click .js-save-btn': 'saveDef',
        },

        saveDef: function() {
            core.global.savedDefs.create(this.model);
            this.$saveBtn.hide();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$content = $('.content', this.$el);
            this.$saveBtn = $('.js-save-btn', this.$el);

            // this.$content.html(this.model);

            return this;
        }

    });

    return AnalyzerView;
});

