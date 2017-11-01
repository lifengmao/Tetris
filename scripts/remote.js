(function() {
  var App = window.App || {};
  var game;

  var doms = {
    gameDiv:document.getElementById('remote_game'),
    nextDiv:document.getElementById('remote_next'),
    timeSpan:document.getElementById('remote_time'),
    scoreSpan:document.getElementById('remote_score'),
    gameoverDiv:document.getElementById('remote_gameover')
  };
  var Remote = function(socket,game) {
    this.cur = {};
    this.next = {};
  };

  Remote.prototype.bindEvents = function(socket,game) {
    var id = this;
    socket.on('init',function(data) {
      start(game,data.type,data.dir,id);
    });
    socket.on('next',function(data) {
      game.performNext(data.type,data.dir,id);
    });
    socket.on('rotate',function(data) {
      game.rotate(id);
    });
    socket.on('right',function(data) {
      game.right(id);
    });
    socket.on('left',function(data) {
      game.left(id);
    });
    socket.on('down',function(data) {
      game.down(id);
    });
    socket.on('fall',function(data) {
      game.fall(id);
    });
    socket.on('fixed',function(data) {
      game.fixed(id);
    });
    socket.on('score',function(data) {
      game.checkClear(id);
      game.addScore(data,doms.scoreSpan);
    });
    socket.on('time',function(data) {
      //console.log(data);
      game.setTime(data,doms.timeSpan);

    });
    socket.on('lose',function(data) {
      game.gameOver(doms.gameoverDiv,false);

    });
    socket.on('addTailLines',function(data) {
      game.addTailLines(data,id);
    });





  };

  var start = function(game,type,dir,id) {

    game.init(doms,type,dir,id);
  };

  App.Remote = Remote;
  window.App = App;
})();
