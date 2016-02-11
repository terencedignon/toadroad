(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  Logger.Pusher = new Pusher('74f1190e2fe3c6780c88', {
    authTransport: 'client',
    clientAuth: {
      key: '74f1190e2fe3c6780c88',
      secret: '8ca474b6876ed2be00c4',
      user_id: String(Math.random()),
      user_info: {}
    }
  });

  Logger.Channel = Logger.Pusher.subscribe('presence-test_channel');


  Logger.Channel.bind('my_event', function(data) {
    alert(data.message);
  });

  var GameView = Logger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();

  };

  GameView.MOVES = {
      "w": [0, -1],
      "a": [-1, 0],
      "s": [0,  1],
      "d": [1,  0]

    };

  GameView.prototype.bindKeyHandlers = function () {

    var frog = this.frog;



    Object.keys(GameView.MOVES).forEach(function(k) {
      var move = GameView.MOVES[k];
      // Logger.Channel.trigger("client-my_event");
      key(k, function () { frog.move(k, move); });
      // Logger.Channel.trigger("client-frog_moved", {k: k, id: frog.id, x: move[0], y: move[1]});
    }.bind(this));
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    var setID = setInterval(function () {

      if (typeof this.game.frog !== "undefined") {
        Logger.Channel.bind("pusher:subscription_succeeded", function (members) {

          this.game.frog.id = Logger.Channel.members.myID;

          Object.keys(Logger.Channel.members.members).forEach(function(member) {
            if (member !== Logger.Channel.members.myID && this.game.members.indexOf(member) === -1) {

              var newFrog = this.game.addFrog();
              newFrog.id = member;
              
              this.game.frogs.push(newFrog);
              this.game.members.push(member);
            }
          }.bind(this));
          clearInterval(setID);
        }.bind(this), 3000);
      }
    }.bind(this));
    // this.setBackground();
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function (time) {
    var timeDelta = time - this.lastTime;
    this.game.draw(this.ctx);
    this.lastTime = time;
    setTimeout(function() {
      requestAnimationFrame(this.animate.bind(this));
    }.bind(this), 1000/45);
  };





})();
