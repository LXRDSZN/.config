// localstorage interface

var storageClass = function (){

	function setSetting(name, val, callback){
	  	log('setting ' + name + ' = ' + val);
	  	var obj = {};
	  	obj[name] = val;
		chrome.storage.sync.set(obj, callback);
	}

	function getSetting(name, callback) {
		chrome.storage.sync.get(name, function (items) {
			if (typeof name == 'string'){
				log('got storage ' + name + ': ' + items[name]);
				callback(typeof name == 'array'?items:items[name]);
			}else{
				log('got storage object ');
				callback(items);
			}

		});
	}


	function clear() {
		chrome.storage.sync.clear();
	}

	// LOCAL STORAGE
	function setLocal(name,value){
		localStorage.setItem(name,value);
	}

	function getLocal(name){
		return localStorage.getItem(name);
	}


	// public functions
	return {
		clear: function(){
			return clear();
		},
		set: function(name, value, onSave){
			return setSetting(name, value, onSave);
		},
		get: function(name, onGet){
			return getSetting(name, onGet);
		},
		setL: function(name,value){
			return setLocal(name,value);
		},
		getL: function(name){
			return getLocal(name);
		}
	};
};