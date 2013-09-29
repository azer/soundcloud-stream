var loadScript = require("load-script");
var sdkLoadQueue = require('pubsub')();
var isSDKLoading = false;
var isSDKLoaded = false;

module.exports = init;

function stream (url, callback) {
  loadSDK(function () {
    resolve(url, function (error, track) {
      if (error) return callback(error);

      SC.stream("/tracks/" + track.id, function(sound){
        callback(undefined, sound);
      });
    });
  });
}

function init (id) {
  loadSDK(function () {
    SC.initialize({
      client_id: id
    });
  });

  return stream;
}

function resolve (url, callback) {
  SC.get('/resolve', { url: url }, function(track) {
    callback(undefined, track);
  });
}

function loadSDK (callback) {
  if (isSDKLoaded) return callback();
  sdkLoadQueue(callback);

  if (isSDKLoading) return;
  isSDKLoading = true;

  loadScript('http://connect.soundcloud.com/sdk.js', sdkLoadQueue.publish);
}
