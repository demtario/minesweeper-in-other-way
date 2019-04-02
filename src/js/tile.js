class Tile {
  constructor(coords, type, game) {
    this.coords = coords
    this.type = type
    this.game = game
    this.revealed = false
    this.element = this.createDOM()
  }

  createDOM() {
    const element = document.createElement('div')
    element.classList = 'tile tile--unclicked'
    // element.innerHTML = this.calculateDistance()
    element.addEventListener('click', () => {
      this.handleClick()
    })
    return element
  }

  calculateDistance(board) {
    if(this.type == 'mine') return '<div class="mine">*</div>'

    this.distance = 0
    this.count = 0
    debugger
    while(this.count == 0 && this.distance<this.game.size) {
      this.distance++

      for(let x = this.coords.x - this.distance; x < this.coords.x+1+this.distance; x++)
        for(let y = this.coords.y - this.distance; y < this.coords.y+1+this.distance; y++) {
          // console.log({x, y})
          if(x < 0 || y < 0 || x >= this.game.size || y >= this.game.size) {}
          else if(board[x][y].type == 'mine') 
            this.count++
            
        }
    }

    // return `<span>${this.distance}</span><sup>${this.count}</sup>`

    if(this.distance<5)
      return `<span>${this.distance}</span><sup>${this.count>1 ? this.count : ''}</sup>`
    else return ""
  }

  handleClick() {
    if(!this.game.running) return
    if(this.revealed) return
    
    this.reveal()

    this.game.handleClick(this)
  }

  reveal() {
    this.element.classList.remove('tile--unclicked')
    this.revealed = true
  }
}