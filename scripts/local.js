(function(){
  'use strict';
  var App = window.App || {};
  var timer = null; //计时器
  var INTERVAL = 2000;
  var timeCount = 0; //时间计数器
  var time = 0; //时间
  var score = 0;
  var doms = {
    gameDiv:document.getElementById('local_game'),
    nextDiv: document.getElementById('local_next'),
    timeSpan:document.getElementById('local_time'),
    scoreSpan:document.getElementById('local_score'),
    gameoverDiv:document.getElementById('local_gameover')
  };
  var waiting = document.getElementById('waiting');
  function Local() {
    this.cur = {};
    this.next = {};
  };

  Local.prototype.ready = function(socket,game) {
    socket.on('start',function() {
      waiting.innerHTML = '';
      start(socket,game,this);
    });
    socket.on('lose',function() {
      game.gameOver(doms.gameoverDiv,true);
      stop();
    });
    socket.on('leave',function() {
      doms.gameoverDiv.innerHTML = '对方已掉线';
      document.getElementById('remote_gameover').innerHTML = '已掉线';
      stop();
    });
    socket.on('bottomLines',function(data) {
      game.addTailLines(data,this);
      socket.emit('addTailLines',data);
    })
  };

  var bindKeyEvent = function(game,id,socket) {
    var cur = id.cur;
    document.onkeydown = function(e) {
      if(e.keyCode === 38) {  //up
        game.rotate(id);
        socket.emit('rotate');
      }else if (e.keyCode ===39){ //right
        game.right(id);
        socket.emit('right');
      }else if(e.keyCode === 40) { //down
        game.down(id);
        socket.emit('down');
      }else if(e.keyCode ===37) { //left
        game.left(id);
        socket.emit('left');
      }else if(e.keyCode === 32) { // space
        game.fall(id);
        socket.emit('fall');
      }
    }
  };
  var start = function(socket,game,id) {
    var type = generateType();
    var dir = generateDir();
    game.init(doms,type,dir,id);

    socket.emit('init',{type:type,dir:dir});
    bindKeyEvent(game,id,socket);
    var next_t = generateType();
    var next_d = generateDir();
    game.performNext(next_t,next_d,id);
    socket.emit('next',{type:next_t,dir:next_d});
    timer = setInterval(function() {
      move(game,id,socket);
    },INTERVAL);
  };

  var move = function(game,id,socket) {
    timeFunc(game,id,socket);
    if(!game.down(id)) {
      game.fixed(id);
      socket.emit('fixed');
      var line = game.checkClear(id);
      if(line > 0) {
        switch(line) {
          case 1: score = score + 10;break;
          case 2: score = score + 30; break;
          case 3: score = score + 60; break;
          case 4: score = score + 100; break;
          default:break;
        }
        game.addScore(score,doms.scoreSpan);
        socket.emit('score',score);
        if(line > 1) {
          var bottomLines = generateBottomLine(line-1);
          socket.emit('bottomLines',bottomLines);
        }
      }
      var gameOver = game.checkGameOver();
      if(gameOver) {
        game.gameOver(doms.gameoverDiv,false);
        document.getElementById('remote_gameover').innerHTML = '你赢了！';
        socket.emit('lose');
        stop();
      }else {
        var t = generateType();
        var d = generateDir();
        game.performNext(t,d,id);
        socket.emit('next',{type:t,dir:d});
      }
    }else {
      socket.emit('down');
    }
  };
  //随机生成干扰行
  var generateBottomLine = function(lineNum) {
    var lines = [];
    for(var i = 0; i < lineNum; i++) {
      var line = [];
      for(var j = 0; j < 10; j++) {
        line.push( Math.ceil( Math.random() * 2) - 1);
      }
      lines.push(line);
    }
    return lines;
  };
  //设置时间
  var timeFunc = function(game,id,socket) {
    timeCount = timeCount + 1;
    if(timeCount >= (1000/INTERVAL)) {
      time = time + 1;
      timeCount = 0;
      game.setTime(time,doms.timeSpan);
      socket.emit('time',time);
    }

  };
  //结束游戏
  var stop = function() {
    if(timer) {
      clearInterval(timer);
      timer = null
    }
    document.onkeydown = null;
  };
  //随机生成一个方块种类
  var generateType = function() {
    return Math.ceil(Math.random() * 7 - 1);
  };
  //随机生成一个旋转次数
  var generateDir = function() {
    return Math.ceil(Math.random() * 4 - 1);
  };


  App.Local = Local;
  window.App = App;

})(window);
