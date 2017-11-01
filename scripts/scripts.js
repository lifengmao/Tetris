(function() {
  'use strict';
  var App = window.App;
  var Game = App.Game;

  var socket = io('ws://localhost:3000');

  var SquareFactory = App.SquareFactory;
  var Local = App.Local;
  var Remote = App.Remote;
  var game_local = new Game;
  var game_remote = new Game;
  var local = new Local();
  var remote = new Remote();
  //var squareFactory = new SquareFactory;
  //App.squareFactory = squareFactory;

  socket.on('waiting',function(str) {
    var waiting = document.getElementById('waiting');
    waiting.innerHTML = str;
  });
  local.ready(socket,game_local);
  remote.bindEvents(socket,game_remote);

  //local.start(game);
})();
