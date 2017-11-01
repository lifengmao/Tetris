(function(){
  'use strict';
  var App = window.App || {};
  var squareFactory = new App.SquareFactory;
   function Game() {
    this.gameData = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
    this.gameDivs = [];
    this.nextDivs = [];
  }
  Game.prototype.init=function(doms,type,dir,id) {
    var gameDiv = doms.gameDiv;
    var nextDiv = doms.nextDiv;
    var gameoverDiv = doms.gameoverDiv;
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var nextDivs = this.nextDivs;

    id.next = squareFactory.make(type,dir);
    initDiv(gameDiv,gameData,gameDivs);
    initDiv(nextDiv,id.next.data,nextDivs);
    //setData(gameData);
    //console.log(gameData);
    //refreshDiv(gameData,gameDivs);
    refreshDiv(id.next.data,nextDivs);
  };
  //游戏结束
  Game.prototype.gameOver = function(div,win) {
    var s = win ? '你赢了！':'你输了 TOT';
    div.innerHTML = s;
  };
  //底部增加行
  Game.prototype.addTailLines = function(lines,id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    for (var i = 0; i < gameData.length - lines.length; i++) {
      gameData[i] = gameData[i + lines.length];
    }
    for (var i = 0; i < lines.length; i++) {
      gameData[gameData.length - lines.length + i] = lines[i];
    }
    id.cur.origin.x = id.cur.origin.x - lines.length;
    if(id.cur.origin.x < 0) {
      id.cur.origin.x = 0;
    }
    refreshDiv(gameData,gameDivs);
  };
  //下移
  Game.prototype.down = function(id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var cur = id.cur;
    if(cur.canDown(isValid,gameData)) {
      clearData(gameData,id);
      cur.down();
      setData(gameData,id);
      refreshDiv(gameData,gameDivs);
      return true;
    } else {
      return false;
    }

  };
  // 左移
  Game.prototype.left = function(id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var cur = id.cur;
    if(cur.canLeft(isValid,gameData)) {
      clearData(gameData,id);
      cur.left();
      setData(gameData,id);
      refreshDiv(gameData,gameDivs);
    }

  }
  // 右移
  Game.prototype.right = function(id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var cur = id.cur;

    if(cur.canRight(isValid,gameData)) {
      clearData(gameData,id);
      cur.right();
      setData(gameData,id);
      refreshDiv(gameData,gameDivs);
    }

  }
  // 旋转
  Game.prototype.rotate = function(id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var cur = id.cur;

    if(cur.canRotate(isValid,gameData)) {
      clearData(gameData,id);
      cur.rotate();
      setData(gameData,id);
      refreshDiv(gameData,gameDivs);
    }

  };
  //下落
  Game.prototype.fall = function(id) {
    while(this.down(id));
  };
  //移动到底部时，固定方块
  Game.prototype.fixed = function(id) {
    var cur = id.cur;
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    for (var i = 0; i < cur.data.length; i++) {
      for(var j = 0; j < cur.data[0].length; j++) {
        if(check(cur.origin,i,j,gameData)){
          if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;

          }
        }
      }
    }
    refreshDiv(gameData,gameDivs);
  };
  //消行
  Game.prototype.checkClear = function() {
    //console.log('clearing');
    var line = 0;
    var gameData = this.gameData;
    for (var i = gameData.length - 1; i >= 0 ; i--) {
      var clear = true;
      for(var j = 0; j < gameData[0].length; j++) {
        if(gameData[i][j] != 1) {
          clear = false;
          break;
        }
      }
      if(clear) {
        line = line + 1;
        for(var m = i; m > 0; m--) {
          for(var n = 0; n < gameData[0].length; n++) {
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for(var n = 0; n < gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }

    }
    return line;
  };
  //判断游戏是否结束
  Game.prototype.checkGameOver = function() {
    var gameData = this.gameData;
    var gameOver = false;
    for (var i = 0; i < gameData[0].length; i++) {
      if(gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver;
  };
  //使用下一个方块
  Game.prototype.performNext = function(type,dir,id) {
    var gameData = this.gameData;
    var gameDivs = this.gameDivs;
    var nextDivs = this.nextDivs;
  //var squareFactory = new App.squareFactory;
    id.cur = id.next;
    setData(gameData,id);
    id.next = squareFactory.make(type,dir);
    refreshDiv(gameData,gameDivs);
    refreshDiv(id.next.data,nextDivs);
  }
  //设置时间
  Game.prototype.setTime = function(time,timeSpan) {
    timeSpan.innerHTML = time;
  };
  //设置分数
  Game.prototype.addScore = function(score,scoreSpan) {
    scoreSpan.innerHTML = score;
  }
  //检测数据是否合法
  var isValid = function(pos,data,gameData) {
    for(var i = 0; i < data.length; i++ ) {
      for(var j =0; j < data[0].length; j++) {
        if(data[i][j] != 0) {
          if(!check(pos,i,j,gameData)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  //检测点是否合法
  var check = function(pos,x,y,gameData) {
    //console.log(gameData);
    if(pos.x + x < 0) {
      return false;
    }else if(pos.x + x >= gameData.length) {
      return false;
    }else if(pos.y + y < 0) {
      return false;
    }else if(pos.y + y >= gameData[0].length) {
      return false;
    }else if(gameData[pos.x + x][pos.y + y] ===1) {
      return false;
    }
    return true;
  }
  // 清楚数据
  var clearData = function(gameData,id) {
    var cur = id.cur;
    for(var i = 0; i < cur.data.length; i++) {
      for(var j = 0; j < cur.data[0].length; j++) {
        if(check(cur.origin,i,j,gameData)){
          gameData[cur.origin.x+i][cur.origin.y+j] = 0;
        }
      }
    }
  }
  // 设置数据
  var setData = function(gameData,id) {
    var cur = id.cur;
    for(var i = 0; i < cur.data.length; i++) {
      for(var j = 0; j < cur.data[0].length; j++) {
        if(check(cur.origin,i,j,gameData)) {
          gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
        }
      }
    }
  }


  var initDiv = function(container,data,divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i*20)+'px';
        newNode.style.left = (j*20)+'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }

  //刷新div
  var refreshDiv = function(data,divs){
    for (var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[0].length; j++) {
        if(data[i][j] === 0 ){
          divs[i][j].className = 'none';
        }else if(data[i][j] === 1 ){
          divs[i][j].className = 'done';
        }else if(data[i][j] === 2 ){
          divs[i][j].className = 'current';
        }
      }
    }
  }
  App.Game = Game;
  window.App = App;
})(window);
