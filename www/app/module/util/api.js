define(function(){
	var _defaults = {
		cache: false,
		dataType: 'json',
		type: 'POST',
		timeout: 30e3,
		data: {},
		beforeSend: function(){}
	};
	return {
		post: function(url, data, settings){
			settings  = $.extend({},_defaults,{type:'POST', data: data}, settings);

            return $.ajax(url, settings)
                .fail(this._handleFail)
                .done(this._printResponse); 
		},

		get: function(url, data, settings){
			settings  = $.extend({}, _defaults,{type:'GET', data: data}, settings);
	
            return $.ajax(url, settings)
                .fail(this._handleFail)
                .done(this._printResponse); 
		},

        _handleFail: function(xhr, statusText, jqXHR) {
			
			if(statusText && statusText == 'abort') return ; // user canceled request
			
            util.debug.log('FAILED: ', statusText, jqXHR);
       },

       _printResponse: function(data, status, jqXHR) {
           util.debug.log('RESPONSE: ', data);
       }
    }
});
