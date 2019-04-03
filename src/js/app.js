let game = null

const init = () => {
  if(game instanceof Game) game.destroy()

  game = new Game({
    size: 16,
    mines: document.getElementById('mines-val').value,
    mode: document.getElementById('mode').value
  })
}

document.body.onload = () => {
  init()
}

document.getElementById('reset').addEventListener('click', () => {
  init()
})

document.getElementById('toggle-settings').addEventListener('click', () => {
  document.querySelector('.settings').classList.toggle('settings--hidden')
})

document.getElementById('debug').addEventListener('change', () => {
  document.querySelector('.board').classList.toggle('board--debug')
})