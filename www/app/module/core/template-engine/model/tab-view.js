define([
], function() { 
    'use strict';

    var View = Backbone.Model.extend({
        defaults: {
            name: '', // name as appeared on navigator items
            viewObj: null, // reference to backbone view object
            url: '', // ex: search/url, note that NO '#'
            isCurrent: false,
            $tempView: null,  // jquery object content the view that contains view of this tab
        }
    });

    return View;
});

