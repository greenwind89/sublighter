define([
    'jade!subtitle/template/detail/analyzer/def-list',
    'jade!subtitle/template/detail/definition-item',
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/analyzer/def-list')
    var definitionItemTpl = require('jade!subtitle/template/detail/definition-item');

    var DefList = Backbone.View.extend({
        template: tpl,

        initialize: function() {
            this.model.on('change', function() {
                this.render();
            }, this);
        },

        render: function() {
            this.$el.html(this.template());
            this.$definitionHolder = $('#js-definition-list-holder', this.$el);
            _.each(this.model.get('word').get('definitions'), function(def) {
                this.$definitionHolder.append(new DefinitionItemView({
                    model: def,
                    defList: this.model
                }).render().el);
            }, this);
            return this;
        }
    });

    var DefinitionItemView = Backbone.View.extend({
        className: 'list-group-item',

        template: definitionItemTpl,

        initialize: function(params) {
            this.defList = params.defList;
        },

        events: {
            'click .js-save-btn': 'saveDef',
        },

        saveDef: function() {
            // core.global.savedDefs.create(this.model);
            this.defList.trigger('save-def', this.model);
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
    return DefList;
});

