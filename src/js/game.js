class Game {
  constructor(size, mines) {
    this.size = size
    this.mines = mines
    this.board = null
    this.running = false

    document.getElementById('reset').addEventListener('click', () => {
      clearInterval(this.clock)
      this.start()
    })

    this.start()
  }

  start() {
    this.board = new Board(this.size, this.mines, this)
    document.getElementById('mines').innerHTML = this.board.mines

    this.revealed = 0

    this.clockStart()
    this.running = true
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

      if(this.revealed == this.size*this.size - this.mines) this.gameWon()
    }
      
  }

  gameOver() {
    alert('Game Over!')
    clearInterval(this.clock)
    this.running = false
  }

  gameWon() {
    alert("You've won!")
    clearInterval(this.clock)
    this.running = false
  }
  
}