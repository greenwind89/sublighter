define([
], function() {
    'use strict';
    var rootURL = 'http://api.urbandictionary.com/v0/define?term=';

    return {
        retrieveDefinition: function(word) {
            var deferred = $.Deferred();
            util.api.get(rootURL + word).done(function(response) {
                var defs = [];
                _.each(response.list, function(def) {
                    defs.push({
                        definition: def.definition, 
                        example: def.example
                    });
                }, this);

                deferred.resolve(defs);
            });

            return deferred.promise();
        }
    };
});
