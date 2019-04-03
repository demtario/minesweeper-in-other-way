class Tile {
  constructor(coords, game) {
    this.coords = coords
    this.game = game
    this.type = 'tile'
    this.marked = false
    this.revealed = false
    this.element = this.createDOM()
  }

  createDOM() {
    const element = document.createElement('div')
    element.classList = 'tile tile--unclicked'

    element.addEventListener('click', () => {
      this.handleClick()
    })

    element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.handleMark()
    })
    return element
  }

  calculateDistance(board) {
    this.distance = 0
    this.count = 0

    while(this.count == 0 && this.distance<this.game.config.size) {
      this.distance++

      for(let x = this.coords.x - this.distance; x < this.coords.x+1+this.distance; x++)
        for(let y = this.coords.y - this.distance; y < this.coords.y+1+this.distance; y++) {
          if(x < 0 || y < 0 || x >= this.game.config.size || y >= this.game.config.size) {}
          else if(board[x][y].type == 'mine') 
            this.count++
        }
    }

    // return `<span>${this.distance}</span><sup>${this.count}</sup>`

    if(this.game.config.mode == 'alternative') {
      this.distance--
      this.count = this.distance==0 ? 0 : this.count
    }

    if(this.distance<4)
      return `<span>${this.distance}</span><sup>${this.count>1 ? this.count : ''}</sup>`
    else return ""
  }

  handleClick() {
    if(!this.game.running) return
    if(this.revealed || this.marked) return
    
    this.reveal()
    this.revealInDistance()

    this.game.handleClick(this)
  }

  revealInDistance() {
    const mod = this.game.config.mode == 'alternative' ? 0 : 1

    for(let x = this.coords.x - this.distance + mod; x < this.coords.x+1+this.distance - mod; x++)
      for(let y = this.coords.y - this.distance + mod; y < this.coords.y+1+this.distance - mod; y++) {
        if(x < 0 || y < 0 || x >= this.game.config.size || y >= this.game.config.size) {}
        else this.game.board.board[x][y].reveal()
      }
  }

  handleMark() {
    if(!this.game.running) return

    this.marked = !this.marked

    if(this.marked) 
      this.element.classList.add('tile--marked')
    else
      this.element.classList.remove('tile--marked')

    this.game.handleMark(this)
  }

  reveal() {
    this.element.classList.remove('tile--unclicked')
    this.revealed = true
  }
}

class Mine extends Tile {
  constructor(coords, game) {
    super(coords, game)
    this.type = 'mine'
  }

  createDOM() {
    const element = document.createElement('div')
    element.classList = 'tile tile--unclicked tile--mine'

    element.addEventListener('click', () => {
      this.handleClick()
    })

    element.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.handleMark()
    })
    return element
  }

  calculateDistance() {
    return '<div class="mine">*</div>'
  }
}