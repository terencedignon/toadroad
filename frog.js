(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Frog = Logger.Frog = function (game, level) {
    this.position = [Math.random() * 600, Math.random() * 120];
    this.lives = 3;
    this.level = level || 1;
    this.image = "./images/frog_down1.png";
    this.src = ["./images/frog_up1.png", "./images/frog_up2.png", "./images/frog_up3.png"];
    this.game = game;
  };


  Frog.prototype.moveHelper = function (k, string, direction) {

    setTimeout(function () {
    this.image = string + "1.png"
    this.position[0] += 10 * direction[0];
    this.position[1] += 10 * direction[1];
      setTimeout(function () {
        this.image = string + "3.png"
        this.position[0] += 10 * direction[0];
        this.position[1] += 10 * direction[1];
        setTimeout(function () {
          this.image = string + "2.png"
          this.position[0] += 10 * direction[0];
          this.position[1] += 10 * direction[1];
        }.bind(this), 50);
      }.bind(this), 50);
    }.bind(this), 50);
    this.image = string + "1.png";
    if (k === "w" || k === "s") this.lastMove = k;
  };

  Frog.prototype.move = function (k, direction) {


    if (this === this.game.frog) {
      Logger.Channel.trigger("client-frog_moved", {move_id: Math.random(), level: this.level, splat_positions: this.game.splats, dx: direction[0], dy: direction[1], k: k, id: this.id, x: this.position[0], y: this.position[1]});
    }

    if (this.position[1] >= 600) {

      if (this.id === this.game.frog.id) this.game.upLevel();
      this.position = [this.position[0], 0];

    }


    if (!this.game.gameOver) {
    if (k === "w") this.moveHelper(k, "./images/frog_up", direction);
    if (k === "s") this.moveHelper(k, "./images/frog_down", direction);
    if (k === "a" || k === "d") {
      if (this.lastMove === "w") this.moveHelper(k, "./images/frog_up", direction);
      if (this.lastMove === "s") this.moveHelper(k, "./images/frog_sideways", direction);
      };
    };
    this.lastDirection = direction;
  };
//
//
//
//     setTimeout(function () {
//     this.image = "frog_up1.png"
//     this.position[0] += 10 * direction[0];
//     this.position[1] += 10 * direction[1];
//       setTimeout(function () {
//         this.image = "frog_up3.png"
//         this.position[0] += 10 * direction[0];
//         this.position[1] += 10 * direction[1];
//         setTimeout(function () {
//           this.image = "frog_up1.png"
//           this.position[0] += 10 * direction[0];
//           this.position[1] += 10 * direction[1];
//         }.bind(this), 75);
//       }.bind(this), 75);
//   }.bind(this), 75);
// };


})();
