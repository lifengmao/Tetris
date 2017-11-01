(function() {
  'use strict';
  var App = window.App || {};
  function Square(){
    //方块数据
    this.data = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    //原点
    this.origin = {
      x:0,
      y:0
    };
    //方向
    this.dir = 0;
    //旋转
    /* this.rotates = [
      [
        [0,2,0,0],
        [0,2,0,0],
        [0,2,0,0],
        [0,2,0,0]
      ],
      [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,0,0],
        [0,2,0,0],
        [0,2,0,0],
        [0,2,0,0]
      ],
      [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ] */
  };

  Square.prototype.canDown = function(isValid,gameData) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test,this.data,gameData);
  }
  Square.prototype.down = function() {
    this.origin.x = this.origin.x + 1;
  }
  Square.prototype.canLeft = function(isValid,gameData) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test,this.data,gameData);
  }
  Square.prototype.left = function() {
    this.origin.y = this.origin.y - 1;
  }
  Square.prototype.canRight = function(isValid,gameData) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test,this.data,gameData);
  }
  Square.prototype.right = function() {
    this.origin.y = this.origin.y + 1;
  }
  //旋转
  Square.prototype.canRotate = function(isValid,gameData) {
    var d = (this.dir + 1) % 4;

    var test = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    for (var i = 0; i < this.data.length; i++) {
      for(var j = 0; j < this.data[0].length; j++) {
        test[i][j] = this.rotates[d][i][j];
      }
    }
    return isValid(this.origin,test,gameData);
  }
  Square.prototype.rotate = function(num) {
    if(!num) num = 1;
    this.dir = (this.dir + num) % 4;
    var data = this.data;
    var rotates = this.rotates;
    for (var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[0].length; j++) {
        data[i][j] = rotates[this.dir][i][j];
      }
    }
  }
  App.Square = Square;
  window.App = App;
})(window);
