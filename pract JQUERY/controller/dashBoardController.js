$('#item, #itemIMG').on('click', () => {
  playButtonAudio()
  hideContainer()
  $('.item-container').css({ display: 'flex' })
  $('#navID').css({ 'background-color': '#474787' })
  $('footer').css({ 'background-color': '#474787' })
})

$('#customer, #customerIMG').on('click', () => {
  playButtonAudio()
  hideContainer()
  $('.customer-container').css({ display: 'flex' })
  $('#navID').css({ 'background-color': '#2980b9' })
  $('footer').css({ 'background-color': '#2980b9' })
})

$('#placeOrder, #orderIMG').on('click', () => {
  playButtonAudio()
  hideContainer()
  $('.order-container').css({ display: 'flex' })
  $('#navID').css({ 'background-color': '#2c2c54' })
  $('footer').css({ 'background-color': '#2c2c54' })
})

$('#home').on('click', () => {
  playButtonAudio()
  hideContainer()
  $('.dashboard-container').css({ display: 'flex' })
  $('#navID').css({ 'background-color': '#27ae60' })
  $('footer').css({ 'background-color': '#27ae60' })
})

const hideContainer = () => {
  $(
    '.customer-container, .item-container, .order-container, .dashboard-container'
  ).css('display', 'none')
}

const saveBtnAudio = () => {
  const svBtnAudio = new Audio('../assets/audio/save.mp3')
  svBtnAudio.play()
}

const playButtonAudio = () => {
  const btnAudio = new Audio('../assets/audio/button.mp3')
  btnAudio.play()
}

const deleteBtnAudio = () => {
  const btnAudio = new Audio('../assets/audio/delete.mp3')
  btnAudio.play()
}

const updateBtnAudio = () => {
  const btnAudio = new Audio('../assets/audio/update.mp3')
  btnAudio.play()
}

const clearAllAudio = () => {
  const btnAudio = new Audio('../assets/audio/clearAll.mp3')
  btnAudio.play()
}
