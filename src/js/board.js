class Board {
  constructor(size, mines, game) {
    this.size = size
    this.game = game
    this.mines = mines
    this.element = document.getElementById('board')
    this.board = []

    this.generate()
  }

  generate() {
    this.element.innerHTML = null
    const fragment = document.createDocumentFragment()

    // Wypełnianie planszy
    for(let x = 0; x < this.size; x++) {
      this.board[x] = []
      for(let y = 0; y < this.size; y++) {
        this.board[x].push(new Tile({x, y}, this.game))
      }
    }

    // Generowanie min
    for(let i = 0; i<this.mines; i++) {
      let x = Math.floor(Math.random() * this.size)
      let y = Math.floor(Math.random() * this.size)
      
      if(this.board[x][y].type != 'mine')
        this.board[x][y] = new Mine({x: y}, this.game)
      else i--
    }

    // Tworzenie DOM
    for(let x = 0; x < this.size; x++)
      for(let y = 0; y < this.size; y++)
      fragment.appendChild(this.board[x][y].element)

    
    this.element.append(fragment)

    this.initDistances()
  }

  initDistances() {
    for(let i = 0; i< this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        const tile = this.board[i][j]
        tile.element.innerHTML = tile.calculateDistance(this.board)
      }
    }
      
  }
}