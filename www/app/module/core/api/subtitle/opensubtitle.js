define([
], function() {
    'use strict';

    var baseUrl = 'http://api.opensubtitles.org/xml-rpc',

        userAgent = 'SubLighter JS',

        defaults = {
            'url': baseUrl,
            'methodName': 'ServerInfo',
            'User-Agent': userAgent
        },

        handleFail = function(xhr, statusText) {
            util.debug.error('XML-RPC failed, status: ' + statusText);
        },

        handleDone = function(res) {
            util.debug.log(res);
        },

        subAPIToken = '', // api token required by open subtitle

        apis = {
            
            search: function(params) {
                var deferred = $.Deferred();

                if(!subAPIToken) {
                    util.debug.error('This function call requries Token');
                    return false;
                }

                $.xmlrpc({
                    'url': baseUrl,
                    'methodName': 'SearchSubtitles',
                    'User-Agent': 'OS Test User Agent',
                    params: [
                        subAPIToken,
                        [
                            { 
                                'query': params.query || '',
                                'season': params.season || '',
                                'episode': params.episode || '',
                                'sublanguageid': params.subLanguage || 'eng'
                            }
                        ],
                        {
                            'limit': 10
                        }
                    ]
                }).fail(handleFail).done(handleDone).done(function(res) {
                    //adapt 
                    
                    deferred.resolve(res[0].data);
                });

               return deferred.promise();
            },

            logIn: function(params) {
                if(window.localStorage.getItem('subAPIToken')) {
                    subAPIToken = window.localStorage.getItem('subAPIToken');
                    return ;
                }

                return $.xmlrpc({
                    'url': baseUrl,
                    'methodName': 'LogIn',
                    'User-Agent': userAgent,
                    params: [
                        '',
                        '',
                        'en',
                        userAgent
                        
                    ]
                }).fail(handleFail).done(handleDone).done(function(res) {
                    subAPIToken = res[0].token;
                    // window.localStorage.setItem('subAPIToken', subAPIToken);
                });
            },

        };

    apis.logIn();

    return apis;
});
