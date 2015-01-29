define([
], function() { 
    'use strict';

    var Navigator = Backbone.Model.extend({
        defaults: {
            tabViews: [], // array of template-engine/model/view models
        },
        currentView: null,

        initialize: function() {
            this.on('i-am-current', function() {
                alert('Ah');
            });
        },

        setCurrentTabByProperty: function(name, value) {
            var view = this.getTabViewByProperty(name, value);
            this.setCurrentView(view);
            return view;
        },

        addTabView: function(tabViewModel) {
            this.get('tabViews').push(tabViewModel);
        },

        setCurrentView: function(view) {
            if(this.currentView) this.currentView.set('isCurrent', false);
            view.set('isCurrent', true);
            this.currentView = view;
        },

        getTabViewByProperty: function(name, value) {
            var tabViews = this.get('tabViews');
            if(tabViews.length > 0) {
                for(var i = 0, len = tabViews.length; i < len; i++) {
                    if(tabViews[i].get(name) !== void 0 && tabViews[i].get(name) === value) {
                        return tabViews[i];
                    }
                }
            }

            return false;
        }
    });

    return Navigator;
});

