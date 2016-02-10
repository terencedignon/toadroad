(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Truck = Logger.Truck = function (game) {
    this.image = "car.png";
    this.game = game;
    var start_positions = [175, 310, 425];
    // this.position = [-500, start_positions[Math.floor(Math.random() * start_positions.length)]];
    this.position = [500, 500]
    setTimeout(function() {
      setInterval(function() {
        this.setMovement();
      }.bind(this), 20);
    }.bind(this), Math.random() * 30000);
  };

  Truck.prototype.setMovement = function () {

    setTimeout(function () {
      this.image = "car.png";
      this.position[0] += 5;
    // this.position[1] += 10 * direction[1];
      setTimeout(function () {
        this.image = "car.png";
        console.log(this.image);
        this.position[0] += 5;
        // this.position[1] += 10 * direction[1];
        setTimeout(function () {
          this.image = "car.png"
          this.position[0] += 5;
          // this.position[1] += 10 * direction[1];
        }.bind(this), 20);
      }.bind(this), 20);
    }.bind(this), 20);
    // this.image = "horse1.png";
    if (this.position[0] >= 1000) {
      this.position[0] = -10000;
    }
  };


  Truck.prototype.collidedWith = function (frog) {
    if ((frog.position[0] <= this.position[0] + 100 && frog.position[0] >= this.position[0]) &&
    (frog.position[1] <= this.position[1] + 50 && frog.position[1] >= this.position[1]))  {
      return true;
      }
      return false;
  };


})();
