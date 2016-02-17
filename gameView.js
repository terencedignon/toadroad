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

  Logger.Channel = Logger.Pusher.subscribe('presence-frog_dash');


  // Logger.Channel.bind('my_event', function(data) {
  //   alert(data.message);
  // });

  var GameView = Logger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();

  };

  GameView.MOVES = {
      "w": [0, -1],
      "a": [-1, 0],
      "s": [0,  1],
      "d": [1,  0],
      "enter": []
    };

  GameView.prototype.bindKeyHandlers = function () {
    var frog = this.frog;
    Object.keys(GameView.MOVES).forEach(function(k) {
      var move = GameView.MOVES[k];
      key(k, function () { frog.move(k, move); });
    }.bind(this));
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;

    var setID = setInterval(function () {
      if (typeof this.game.frog !== "undefined") {
        Logger.Channel.bind("pusher:subscription_succeeded", function (members) {
          this.game.frog.id = Logger.Channel.members.myID;
          // if (Logger.Channel.members.count > 1) {
          //
          //   Logger.Channel.bind("client-get_game", function (data) {
          //     this.game.trucks = [];
          //
          //     data.trucks.forEach(function(truck) {
          //       this.game.trucks.push(new Logger.Truck(truck));
          //     }.bind(this));
          //   }.bind(this));

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
    }.bind(this), 1000/60);

    if (this.game.gameOver) {
      setTimeout(function () {
        this.game = new Logger.Game(this.ctx);
        new Logger.GameView(game, this.ctx).start();
      }.bind(this), 5000);
    }
  };


})();
