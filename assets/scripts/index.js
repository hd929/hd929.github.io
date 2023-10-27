const avatar = document.querySelector('.profile__avatar img')

const hoshinoAudio1 = new Audio('/assets/sounds/Hoshino_LogIn_1.mp3')
const hoshinoAudio2 = new Audio('/assets/sounds/Hoshino_LogIn_2.mp3')

lobbySong.loop = true
lobbySong.volume = 0.5
let firstPlay = false
let isPlaying = false

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
