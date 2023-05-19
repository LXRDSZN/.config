'use strict';
function log(m) {
    console.log(m)
}


var d = (function (storage) {
    var CACHE = Object.freeze({last_used: 'cacheLastUsed', likes: 'cacheLikes',tab: 'cacheTabs',filter:'cacheFilter', payed: 'cachePayed', theme: 'cacheTheme'});
    var FILTERS = Object.freeze({all: 0, movies: 1, tv: 2, anime: 3});
    var TABS = Object.freeze({favorite: 1, last_used: 2, full: 3, popular: 4});

    var settings = {
        liked: Object.create(null),
        lastUsed: new Map(),
        activeTab: TABS.popular,
        activeFilter: FILTERS.all,
        payed: false,
        theme: false
    };

    var k = storage.getL(CACHE.last_used);
    k && (settings.lastUsed = new Map(JSON.parse(k)));

    k = storage.getL(CACHE.likes);
    k && (settings.liked = JSON.parse(k));

    k = storage.getL(CACHE.tab);
    k && (settings.activeTab = parseInt(k));

    k = storage.getL(CACHE.filter);
    k && (settings.activeFilter = parseInt(k));

    k = storage.getL(CACHE.theme);
    k && (settings.theme = k === 'true');

    storage.get(CACHE.payed,function(v){
        v && (settings.payed = true);
    });

    function doBuy() {
        storage.set(CACHE.payed,true);
        chrome.tabs.create({ url: 'https://simkl.com' });
    }

    return {
        'doBuy': doBuy,
        'storage': storage,
        'settings': settings,
        //const
        'CACHE': CACHE,
        'FILTERS': FILTERS,
        'TABS': TABS
    };
})(storageClass());
