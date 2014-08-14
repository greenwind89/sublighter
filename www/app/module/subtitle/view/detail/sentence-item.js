define([
    'jade!subtitle/template/detail/sentence-item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/sentence-item')

    var Sentence = Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return Sentence;
});

