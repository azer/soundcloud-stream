var sdk = require("require-sdk")('http://connect.soundcloud.com/sdk.js', 'SC');

module.exports = init;

function stream (url, callback) {
  sdk(function (error, api) {
    resolve(url, function (error, track) {
      if (error) return callback(error);

      api.stream("/tracks/" + track.id, function(sound){
        callback(undefined, sound);
      });
    });
  });
}

function init (id) {
  sdk(function (error, api) {
    api.initialize({
      client_id: id
    });
  });

  return stream;
}

function resolve (url, callback) {
  sdk(function (error, api) {
    api.get('/resolve', { url: url }, function(track) {
      callback(undefined, track);
    });
  });
}
