
/*
  calls constructor and initiallises variables and calls the fuction to build a grid
*/
class Connect4 {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'red';
    this.selector = selector;
    this.gameover = false;
    this.gridBuilder();
    this.play();
    this.onPlayerMove = function() {};
  }

/*
  buids the grid
*/
  gridBuilder() {
    const $board = $(this.selector);
    $board.empty(); // empty board
    this.gameover = false;
    this.player = 'red';
    /*
    creating 6 rows and 7 cols
    */
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>')
        .addClass('row');
      for (let col = 0; col < this.COLS; col++) {
        const $col = $('<div>')
          .addClass('col empty')
          .attr('data-col', col) // grabing the attribute of the each row and col
          .attr('data-row', row);
        $row.append($col);
      }
      $board.append($row);
    }

  }

  play() {
    const $board = $(this.selector);
    const that = this;
    /*
      Find empty cell where move is possible. Starts checking for the last empty cell in the col and loops in up direction till a valid position is found
    */
    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`); // grabing the attr of cell
      for (let i = cells.length - 1; i >= 0; i--)
      {
        const $cell = $(cells[i]);
        if ($cell.hasClass('empty')) {
          return $cell;
        }
      }
      return null;
    }

  /*
    Click triger
    Find last empty cell, remove any class attached to it (empty) and add a class of the player.
    Check for Winner on each click triger
  */
    $board.on('click', '.col.empty', function() {

      if (that.gameover) return;
      const col = $(this).data('col');
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data('player', that.player);


      const winner = that.WinnerCheck($lastEmptyCell.data('row'), $lastEmptyCell.data('col'))

      if (winner) {
        // if gameove gives and alert and
        that.gameover = true;
        alert(`Game Over! Player ${that.player} has won!`);
        //$('.col.empty').removeClass('empty');
        return;
      }

      that.player = (that.player === 'red') ? 'blue' : 'red';

       that.onPlayerMove();

    });
  }
/*

  checks for winner
  returns a check in 4 directions( H, V, D1, D2)

*/
  WinnerCheck(row, col)
  {
    const that = this;
    function $getCell(i, j){
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function Verticalcheck()
    {
      return foundFour({i: -1, j: 0}, {i: 1, j: 0});
    }

    function Horizontalcheck()
    {
      return foundFour({i: 0, j: -1}, {i: 0, j: 1});
    }

    function Diagonal1check()
    {
      return foundFour({i: 1, j: 1}, {i: -1, j: -1}); // TL to BR
    }
    function Diagonal2check()
    {
      return foundFour({i: 1, j: -1}, {i: 1, j: 1}) // BL to TR
    }
/*

*/
    function foundFour(dirA, dirB)
    {
      const total = 1 + checkinDirection(dirA) + checkinDirection(dirB);
      if (total >= 4){
        return that.player;
      }
      else { return null;}
    }
    /*
    checks in a passed direction
    loops while the next cell in the passed direction is equal to that of the player
    return a total
    */
    function checkinDirection(direction)
    {
      let i = row + direction.i;
      let j = col + direction.j;
      let $nextcell = $getCell(i,j);
      let total = 0;
      while ( i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS && $nextcell.data('player') === that.player )
      {
        total ++;
        i += direction.i;
        j += direction.j;
        $nextcell = $getCell(i,j);
      }
      return total;
    }

    return Verticalcheck() || Horizontalcheck() || Diagonal1check() || Diagonal2check();
  }

    restart () {
    this.gridBuilder();
    this.onPlayerMove();
  }

}
