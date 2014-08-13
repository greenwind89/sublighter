define([
    'test/model/suite',
], function() { 
    'use strict';

    var SuiteModel = require('test/model/suite');

    var SuiteCollection = Backbone.Collection.extend({
        model: SuiteModel
    });

    return SuiteCollection;
});


