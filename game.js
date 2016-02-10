(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Game = Logger.Game = function (ctx) {
    this.level = 1;
    this.ctx = ctx;
    this.splat_positions = [];
    this.trucks = [];
    this.frogs = [];
    this.gameOver = false;
    this.timer = 60;

    this.addTrucks(5);
    this.timerInt = setInterval(function () {
      this.timer -= 1;

      if (this.timer < 1) {
        this.gameOver = true;
        clearInterval(this.timerInt);
      }
    }.bind(this), 1000);
  };

  Game.NUM_TRUCKS = 10;
  // Game.DIM_X = 1000;
  // Game.DIM_Y = 1000;

  Game.prototype.addFrog = function () {

    this.frog = new Logger.Frog(this);
    // this.add(frog);
    return this.frog;

  };

  Game.prototype.addTrucks = function (num) {
    for (var i = 0; i < num; i++) {

      this.add(new Logger.Truck({ game: this }));
    }
  };


  Game.prototype.add = function (object) {
    this.trucks.push(object);
  };

  Game.prototype.moveTrucks = function () {
    this.trucks.forEach(function(truck) {
      truck.position = [truck.position[0] - 1, truck.position[1]];
    });
  };

  Game.prototype.setBackground = function () {
      var background = new Image();
      background.src = 'background2.png';

      background.addEventListener("load", function () {
        this.ctx.drawImage(background, 0, 0);
      }.bind(this), false);
    };

    Game.prototype.setHeader = function () {
      var background = new Image();
      background.src = 'banner.png';

      background.addEventListener("load", function () {
        this.ctx.drawImage(background, 90, 30);
      }.bind(this), false);

    };

  Game.prototype.setFrogImage = function (coords) {
    var frog = new Image();
    frog.src = this.frog.image;
    frog.addEventListener("load", function () {
      this.ctx.drawImage(frog, this.frog.position[0], this.frog.position[1])
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
    this.level += 1;
    this.trucks.forEach(function(truck) {
      truck.speed *= 1.2;
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

  Game.prototype.setTimer = function () {
    var width = 680;
    clockString = String(this.timer).split("");
    clockString.forEach(function(num) {
      var clock = new Image();
      clock.src = num + ".png";
      clock.addEventListener("load", function () {
        this.ctx.drawImage(clock, width, 90);
        width += 30;
      }.bind(this));

    }.bind(this));

  };

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
    if (this.gameOver) {
      var gameOver = new Image();
      gameOver.src = "gameover.png";
      gameOver.addEventListener("load", function () {
        this.ctx.drawImage(gameOver, 30, 50);
      }.bind(this));

    }

    this.setTrucksImage();

  };

  Game.prototype.drawLevel = function () {
    var gameOver = new Image();
    gameOver.src = "lvl" + this.level + ".png";
    gameOver.addEventListener("load", function () {
      this.ctx.drawImage(gameOver, 670, 30);
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
           this.frog.position = [10000, 10000]
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
