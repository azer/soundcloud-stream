## soundcloud-stream

Stream any URL at Soundcloud

```js
stream = require('soundcloud-stream')('client-id')

stream('https://soundcloud.com/veyasin/heydouglas-live-in-europe-set', function (error, sound){

  sound.play()
  sound.pause()
  sound.mute()
  sound.setVolume()

});
```

## Install

```bash
$ npm install soundcloud-stream
```
