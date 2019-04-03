class Game {
  constructor({ size, mines, mode } = {}) {

    this.config = {
      size: size || 16,
      mines: mines || 24,
      mode: mode || 'standard'
    }

    this.board = null
    this.running = false

    this.toReveal = mines

    this.start()
  }

  start() {
    this.board = new Board(this.config.size, this.config.mines, this)
    document.getElementById('mines').innerHTML = this.toReveal

    this.revealed = 0

    this.clockStart()
    this.running = true
  }

  destroy() {
    clearInterval(this.clock)
    document.getElementById('time').innerHTML = 0
  }

  clockStart() {
    const time = document.getElementById('time')
    let seconds = 0;

    this.clock = setInterval(() => {
      seconds++
      time.innerHTML = seconds
    }, 1000)
  }

  handleClick(tile) {
    if(tile.type == 'mine') this.gameOver()
    else {
      this.revealed++

      if(this.revealed == this.config.size*this.config.size - this.config.mines) this.gameWon()
    }
  }

  handleMark(tile) {
    if(tile.marked) this.toReveal--
    else this.toReveal++

    document.getElementById('mines').innerHTML = this.toReveal < 0 ? 0 : this.toReveal
  }

  gameOver() {
    alert('Game Over!')
    clearInterval(this.clock)
    this.running = false

    for(let x = 0; x < this.config.size; x++)
      for(let y = 0; y < this.config.size; y++) {
        const tile = this.board.board[x][y]
        if(tile.type == 'mine') {
          tile.reveal()
        }
      }
  }

  gameWon() {
    alert("You've won!")
    clearInterval(this.clock)
    this.running = false
  }
  
}