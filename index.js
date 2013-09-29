var loadScript = require("load-script");

module.exports = init;

function stream (url, callback) {
  resolve(url, function (error, track) {
    if (error) return callback(error);

    SC.stream("/tracks/" + track.id, function(sound){
      callback(undefined, sound);
    });
  });
}

function init (id, callback) {
  loadSDK(function () {
    SC.initialize({
      client_id: id
    });
    callback();
  });

  return stream;
}

function resolve (url, callback) {
  SC.get('/resolve', { url: url }, function(track) {
    callback(undefined, track);
  });
}

function loadSDK (callback) {
  loadScript('http://connect.soundcloud.com/sdk.js', callback);
}
