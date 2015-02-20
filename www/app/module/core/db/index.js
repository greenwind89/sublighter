define([

], function() {
    'use strict';
    

    // tableNAme : {collection: Collection to contain table}
    var tableList = {
    };


    return {
        get: function(tableName) {
            var deferred = $.Deferred();
            var Col = tableList[tableName].Collection.extend({
                localStorage:  new Backbone.LocalStorage(tableName)
            });
            var col = new Col();
            col.fetch({
                success: function() {
                    deferred.resolve(col);
                },
                error: function() {
                    deferred.resolve(col);
                }
            });

            return deferred.promise();
        },

        registerTable: function(tableName, Collection) {
            tableList[tableName] = {Collection: Collection};
        }
    };
});


