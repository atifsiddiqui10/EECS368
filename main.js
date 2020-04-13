
$(document).ready(function() {
  const connect4 = new Connect4('#connect4');
 // div text appears on every move
  connect4.onPlayerMove = function() {
      $('#player').text(connect4.player); 
    }

// restart
    $('#retry').click(function() {
      connect4.restart();
    })
})
