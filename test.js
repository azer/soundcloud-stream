var api = require("./");
var stream;

before(function(done){
  stream = api('3865ac569946ca11ed3745ed08c676d0', done);
});


it('plays the given soundcloud url', function(done){
  stream('https://soundcloud.com/veyasin/mode-xl-bul-karayi', function (error, sound) {
    if (error) return done(error);
    sound.play();
    expect(sound.playState).to.equal(1);
    sound.pause();
    expect(sound.paused).to.be.true;
    done();
  });
});
