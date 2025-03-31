const snTag = document.getElementById('sntag')
const audio = new Audio('./plankton-augh.mp3')

console.log(snTag)
snTag.addEventListener('click', (e) => {
  console.log("click")
  audio.play()
})

audio.addEventListener('ended', (e) => {
  audio.currentTime = 0
  audio.play()
})