(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Truck = Logger.Truck = function (options) {
    function setRandom (array) {
        return Math.floor(Math.random() * array.length);
    }

    var coinFlip = Math.random() * 100 >= 50;
    var image_array;
    var selectY;
    var randomX;

    if (coinFlip) {
      image_array = [
        "car.png", "police_car.png", "green_car.png", "blue_car.png", "porsche.png", "van.png"];
        this.image = options.image || image_array[setRandom(image_array)];
        this.speed = Math.random() * 10;
        randomX = Math.random() * -10000;
        selectY = [140, 230, 300];
        this.position = [randomX, selectY[setRandom(selectY)]];

    } else {
      image_array = [
        "car_rev.png", "police_car_rev.png", "green_car_rev.png", "blue_car_rev.png", "porsche_rev.png", "van_rev.png"];
        this.image = options.image || image_array[setRandom(image_array)];
        this.speed = Math.random() * -10;
        randomX = Math.random() * 20000;
        selectY = [430, 500];
        this.position = [randomX, selectY[setRandom(selectY)]];

    }

    setTimeout(function () {
    setInterval(function() {
        this.setMovement();
      }.bind(this), 20);
    }.bind(this), Math.random() * 30000);
  };

  Truck.prototype.setMovement = function () {
    setTimeout(function () {
      this.position[0] += this.speed;
      setTimeout(function () {
        this.position[0] += this.speed;
        setTimeout(function () {
          this.position[0] += this.speed;
        }.bind(this), 20);
      }.bind(this), 20);
    }.bind(this), 20);
    if (this.speed > 0) {
    if (this.position[0] >= 1000) {
      this.position[0] = Math.random() * -10000;
    }
  } else {
    if (this.position[0] <= -100) {
      this.position[0] = Math.random() * 10000;
    }
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
