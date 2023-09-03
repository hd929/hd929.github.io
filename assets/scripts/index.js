const playBtn = document.querySelector('.play-btn')
const pauseBtn = document.querySelector('.pause-btn')
const avatar = document.querySelector('.profile__avatar img')

const lobbySong = new Audio('/assets/sounds/bluearchive-01.mp3')
const hoshinoAudio1 = new Audio(
  'https://static.miraheze.org/bluearchivewiki/e/e1/Hoshino_LogIn_1.ogg'
)
const hoshinoAudio2 = new Audio(
  'https://static.miraheze.org/bluearchivewiki/f/ff/Hoshino_LogIn_2.ogg'
)

lobbySong.loop = true
lobbySong.volume = 0.5
let firstPlay = false
let isPlaying = false

document.addEventListener('click', () => {
  if (!firstPlay) {
    lobbySong.play()
    firstPlay = true
  }
})

playBtn.addEventListener('click', () => {
  lobbySong.play()
})

pauseBtn.addEventListener('click', () => {
  lobbySong.pause()
})

hoshinoAudio1.addEventListener('ended', () => {
  isPlaying = false
})

hoshinoAudio2.addEventListener('ended', () => {
  isPlaying = false
})

avatar.addEventListener('click', () => {
  if (!isPlaying) {
    const random = Math.floor(Math.random() * 2)
    if (random === 0) {
      hoshinoAudio1.play()
      isPlaying = true
    } else {
      hoshinoAudio2.play()
      isPlaying = true
    }
  }
})
