define([
    'core/api/subtitle/collection/search-result',
    'core/api/subtitle/model/search-result',
    'pako'
], function() {
    'use strict';

    var SearchResult = require('core/api/subtitle/model/search-result').extend({
            downloadSubtitle: function() {
                return apis.downloadSubtitle({
                    subtitleFileId: this.get('subtitleFileId')
                });
            }
        }),
        SearchResults = require('core/api/subtitle/collection/search-result').extend({
            model: SearchResult
        }),
        pako = require('pako');

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
                    var searchResults = new SearchResults();
                    //adapt 
                    _.each(res[0].data, function(sub) {
                        searchResults.add({
                            providerMovieId: sub.IDMovie,
                            movieLanguageName: sub.LanguageName, 
                            moviewUploadedName: sub.MovieReleaseName,
                            movieKind: sub.MovieKind, 
                            movieYear: sub.MovieYear,
                            moviewOfficalName: sub.MovieName,

                            // custome for only opensubtitle
                            subtitleFileId: sub.IDSubtitleFile,

                        });
                    }, this);

                    deferred.resolve(searchResults);
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


            downloadSubtitle: function(params) {
                var deferred = $.Deferred();

                if(!subAPIToken) {
                    util.debug.error('This function call requries Token');
                    return false;
                }

                $.xmlrpc({
                    'url': baseUrl,
                    'methodName': 'DownloadSubtitles',
                    'User-Agent': userAgent,
                    params: [
                        subAPIToken,
                        [ params.subtitleFileId],
                    ]
                }).fail(handleFail).done(function(res) {
                    var content = pako.inflate(atob(res[0].data[0].data), {to: 'string'});
                    deferred.resolve(content);
                });

                return deferred.promise();
            },


        };

    apis.logIn();

    return apis;
});
