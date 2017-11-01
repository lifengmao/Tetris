(function () {
  'use strict';
  var App = window.App;
  var Square = App.Square;
  function Square1() {
    this.rotates = [
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
    ];
  }
  Square1.prototype = new Square;

  function Square2() {
    this.rotates = [
      [
        [0,2,0,0],
        [2,2,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,0,0,0],
        [2,2,0,0],
        [2,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,2,0],
        [0,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,0,0],
        [2,2,0,0],
        [0,2,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square2.prototype = new Square;

  function Square3() {
    this.rotates = [
      [
        [2,2,2,0],
        [0,0,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,0,0],
        [0,2,0,0],
        [2,2,0,0],
        [0,0,0,0]
      ],
      [
        [2,0,0,0],
        [2,2,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,0,0,0],
        [2,0,0,0],
        [2,2,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square3.prototype = new Square;


  function Square4() {
    this.rotates = [
      [
        [2,2,2,0],
        [2,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [0,2,0,0],
        [0,2,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,2,0],
        [2,2,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [2,0,0,0],
        [2,0,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square4.prototype = new Square;

  function Square5() {
    this.rotates = [
      [
        [2,2,0,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square5.prototype = new Square;

  function Square6() {
    this.rotates = [
      [
        [0,2,2,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,0,0,0],
        [2,2,0,0],
        [0,2,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,2,0],
        [2,2,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,0,0,0],
        [2,2,0,0],
        [0,2,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square6.prototype = new Square;

  function Square7() {
    this.rotates = [
      [
        [2,2,0,0],
        [0,2,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,0,0],
        [2,2,0,0],
        [2,0,0,0],
        [0,0,0,0]
      ],
      [
        [2,2,0,0],
        [0,2,2,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,2,0,0],
        [2,2,0,0],
        [2,0,0,0],
        [0,0,0,0]
      ]
    ];
  }
  Square7.prototype = new Square;

  function SquareFactory() {}

  SquareFactory.prototype.make = function (index,dir) {
  //  console.log(index,dir);
    var s;
    index = index + 1;
    if(index < 1 || index >7) {
      console.log("输入错误！");
    }
    switch (index) {
      case 1:
        s = new Square1;
        break;
      case 2:
        s = new Square2;
        break;
      case 3:
        s = new Square3;
        break;
      case 4:
        s = new Square4;
        break;
      case 5:
        s = new Square5;
        break;
      case 6:
        s = new Square6;
        break;
      case 7:
        s = new Square7;
        break;
      default:
        break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
  }

  App.SquareFactory = SquareFactory;
  window.App = App;
})(window);
