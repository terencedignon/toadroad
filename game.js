(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Game = Logger.Game = function (ctx) {
    this.ctx = ctx;
    this.trucks = [];
    this.frogs = [];
    this.gameOver = false;


    this.addTrucks();
  };

  Game.NUM_TRUCKS = 10;
  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;

  Game.prototype.addFrog = function () {

    this.frog = new Logger.Frog(this);
    // this.add(frog);
    return this.frog;

  };

  Game.prototype.addTrucks = function () {
    for (var i = 0; i < Game.NUM_TRUCKS; i++) {

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

  Game.prototype.setFrogImage = function (coords) {
    var frog = new Image();
    frog.src = this.frog.image;
    frog.addEventListener("load", function () {
      this.ctx.drawImage(frog, this.frog.position[0], this.frog.position[1])
    }.bind(this));
  };

  Game.prototype.draw = function () {
    this.setBackground();
    this.setFrogImage();
    this.moveTrucks();
    this.checkCollisions()
    if (this.gameOver) {
      var gameOver = new Image();
      gameOver.src = "gameover.png";
      gameOver.addEventListener("load", function () {
        this.ctx.drawImage(gameOver, 10, 50);
      }.bind(this));

    }

    this.setTrucksImage();

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
           this.gameOver = true;
         }
    }.bind(this));
    return false;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.frogs, this.trucks);
  };


})();
