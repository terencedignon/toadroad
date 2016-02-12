(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }


  var Game = Logger.Game = function (ctx) {
    this.members = [];
    this.carPositions = [];
    this.ctx = ctx;
    this.splat_positions = [];
    this.trucks = [];
    this.frogs = [];
    this.gameOver = false;
    this.timer = 60;
    this.addTrucks(20);
    setTimeout(this.setPusherBindings(), 5000);
    // this.timerInt = setInterval(function () {
    //   this.timer -= 1;
    //
    //   if (this.timer < 1) {
    //     this.gameOver = true;
    //     clearInterval(this.timerInt);
    //   }
    // }.bind(this), 1000);
  };

  Game.NUM_TRUCKS = 10;
  // Game.DIM_X = 1000;
  // Game.DIM_Y = 1000;

  // Game.prototype.hello = function () {
  //
  // };



  Game.prototype.setPusherBindings = function () {
    // Logger.Channel.bind("client-frog_moved", function(data) {
    //   var frog = this.frogs[this.members.indexOf(data.id)];
    //   if (frog.move_id !== data.move_id) {
    //     frog.position = [data.x, data.y];
    //     frog.move(data.k, [data.dx, data.dy]);
    //   }
    //   frog.move_id = data.move_id;
    // }.bind(this));

    function multiMove(data) {
      Logger.Channel.unbind("client-frog_moved", multiMove);
      setTimeout(function () {
        Logger.Channel.bind("client-frog_moved", multiMove);
      }, 200);

      var frog = this.frogs[this.members.indexOf(data.id)];
      if (frog.move_id !== data.move_id) {
  
        this.splat_positions.concat(data.splat_positions);
        frog.level = data.level;
        frog.position = [data.x, data.y];
        frog.move(data.k, [data.dx, data.dy]);
      }
      frog.move_id = data.move_id;
    }
    Logger.Channel.bind("client-frog_moved", multiMove.bind(this));


    Logger.Channel.bind("pusher:member_added", function (member) {

      Logger.Channel.trigger("client-get_game", {trucks: this.trucks});
      if (this.members.indexOf(member.id) === -1) {
        var newFrog = this.addFrog();
        newFrog.id = member.id;
        this.frogs.push(newFrog);
        this.members.push(member.id);
      }
    }.bind(this));

    Logger.Channel.bind("pusher:member_removed", function (member) {
      var remainingFrogs = [];
      this.members.splice(this.members.indexOf(member.id), 1);
      this.frogs.forEach(function(frog) {
        if (frog.id !== member.id) remainingFrogs.push(member);
      }.bind(this));
      this.frogs = remainingFrogs;
    }.bind(this));
  };

  Game.prototype.addFrog = function () {
    if (typeof this.frog === "undefined") {
      this.frog = new Logger.Frog(this);
      return this.frog;
    } else {
      var frog = new Logger.Frog(this);
      return frog;
    }
  };

  Game.prototype.addTrucks = function (num) {
    for (var i = 0; i < num; i++) {
      this.add(new Logger.Truck(this.carPositions));
    }
  };


  Game.prototype.add = function (object) {
    this.trucks.push(object);
    this.carPositions.push(object.position);
  };

  Game.prototype.moveTrucks = function () {
    this.trucks.forEach(function(truck) {
      truck.position = [truck.position[0] - 1, truck.position[1]];
    });
  };

  Game.prototype.setBackground = function () {
      var background = new Image();
      background.src = 'background3.png';

      background.addEventListener("load", function () {
        this.ctx.drawImage(background, 0, 0);
      }.bind(this), false);
    };

    Game.prototype.setHeader = function () {
      var background = new Image();
      background.src = 'banner2.png';

      background.addEventListener("load", function () {
        this.ctx.drawImage(background, 90, 20);
      }.bind(this), false);

    };

  // Game.prototype.setFrogsImage = function () {
  //   this.frogs.forEach(function(frog) {
  //     var frogIMG = new Image();
  //     frogIMG.src = this.frog.image;
  //     frogIMG.addEventListener("load", function () {
  //       this.ctx.drawImage(frogIMG, frog.position[0], frog.position[1])
  //     }.bind(this));
  //     }.bind(this));
  //   });
  // }

  Game.prototype.setFrogImage = function () {
    this.frogs.concat(this.frog).forEach(function(frog) {

      var frogIMG = new Image();
      frogIMG.src = frog.image;
      frogIMG.addEventListener("load", function () {
        this.ctx.drawImage(frogIMG, frog.position[0], frog.position[1]);
      }.bind(this));
      if (frog !== this.frog) {
      var lvlIMG = new Image();
      lvlIMG.src = frog.level + ".png";
      lvlIMG.addEventListener("load", function () {
        this.ctx.drawImage(lvlIMG, frog.position[0] - 45, frog.position[1] - 35);
      }.bind(this));
      }
    }.bind(this));

    // var numIMG = new Image();
    // numIMG.src = "9.png";
    // numIMG.addEventListener("load", function () {
    //   this.ctx.drawImage(numIMG, this.frog.position[0] + 25, this.frog.position[1] - 30);
    // }.bind(this));


  };


    Game.prototype.upLevel = function () {
      this.frog.level += 1;
      this.trucks.forEach(function(truck) {
        truck.speed *= 1.1;
      }.bind(this));

    };

  Game.prototype.setLivesImage = function () {
    var heart = new Image();
    heart.src = "heart.png";

    if (this.frog.lives === 3) {
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 750, 10);
    }.bind(this));
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 710, 10);
    }.bind(this));
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 670, 10);
    }.bind(this));
  } else if (this.frog.lives === 2) {
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 750, 10);
    }.bind(this));
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 710, 10);
    }.bind(this));
  } else if (this.frog.lives === 1) {
    heart.addEventListener("load", function () {
      this.ctx.drawImage(heart, 750, 10);
    }.bind(this));
  }
};



  Game.prototype.upLevel = function () {

    this.frog.level += 1;
    this.trucks.forEach(function(truck) {
      truck.speed *= 1.1;
    }.bind(this));

  };

  Game.prototype.setSplats = function () {
    if (this.splat_positions.length > 0) {
    this.splat_positions.forEach(function(position) {
      var splat = new Image();
      splat.src = "splatter.png";
      splat.addEventListener("load", function () {
        this.ctx.drawImage(splat, position[0], position[1]);
      }.bind(this));
    }.bind(this));
  }

  };

  // Game.prototype.setTimer = function () {
  //   var width = 680;
  //   clockString = String(this.timer).split("");
  //   clockString.forEach(function(num) {
  //     var clock = new Image();
  //     clock.src = num + ".png";
  //     clock.addEventListener("load", function () {
  //       this.ctx.drawImage(clock, width, 90);
  //       width += 30;
  //     }.bind(this));
  //   }.bind(this));
  //
  // };

  Game.prototype.draw = function () {


    this.setBackground();
    this.setHeader();
    this.setFrogImage();
    this.moveTrucks();
    this.setLivesImage();
    // this.setTimer();
    this.setSplats();
    this.drawLevel();
    this.checkCollisions();

    this.setTrucksImage();
    this.endGame();

  };

  Game.prototype.endGame = function () {
    if (this.gameOver) {
      var gameOver = new Image();
      gameOver.src = "gameover.png";
      gameOver.addEventListener("load", function () {
        this.ctx.drawImage(gameOver, 0, 0);
      }.bind(this));

    }
  };

  Game.prototype.drawLevel = function () {
    var gameOver = new Image();
    gameOver.src = "lvl" + this.frog.level + ".png";
    gameOver.addEventListener("load", function () {
      this.ctx.drawImage(gameOver, 670, 20);
    }.bind(this));
    // this.ctx.beginPath();
    //  this.ctx.rect(188, 50, 200, 100);
    //  this.ctx.fillStyle = 'yellow';
    //  this.ctx.fill();
    //  this.ctx.lineWidth = 7;
    //  this.ctx.strokeStyle = 'black';
    //  this.ctx.stroke();
    //

  };

  Game.prototype.setTrucksImage = function () {
    this.trucks.forEach(function(truck) {
      var truckIMG = new Image();
      truckIMG.src = truck.image;
      truckIMG.addEventListener("load", function () {
        this.ctx.drawImage(truckIMG, truck.position[0], truck.position[1]);
      }.bind(this));
    }.bind(this));
  };

  Game.prototype.checkCollisions = function () {

    this.trucks.forEach(function (truck) {
      if (truck.collidedWith(this.frog)) {

           this.frog.lives -= 1;
           if (this.frog.lives === 0) {
             this.gameOver = true;
           }
           this.splat_positions.push(this.frog.position);
           this.frog.position = [10000, 50];

           setTimeout(function () {
             this.frog.position = [350, 100];
           }.bind(this), 2000);

         }
    }.bind(this));
    return false;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.frogs, this.trucks);
  };


})();
