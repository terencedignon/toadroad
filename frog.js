(function () {
  if (typeof Logger === "undefined") {
    window.Logger = {};
  }

  var Frog = Logger.Frog = function (game) {
    this.position = [0, 50];
    this.image = "frog_up1.png";
    // this.src = ["frog_up1.png, frog_up2.png, frog_up3.png"];
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
    if (!this.game.gameOver) {
    console.log(this.position);
    if (k === "w") this.moveHelper(k, "frog_up", direction);
    if (k === "s") this.moveHelper(k, "frog_down", direction);
    if (k === "a" || k === "d") {

      if (this.lastMove === "w") this.moveHelper(k, "frog_up", direction);
      if (this.lastMove === "s") this.moveHelper(k, "frog_sideways", direction);
      };
    };
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
