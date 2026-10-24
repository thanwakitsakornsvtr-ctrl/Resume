import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createMusicPlayer } from '../src/lib/backgroundMusic.ts'

class MockAudio extends EventTarget {
  src = ''
  loop = false
  volume = 1
  preload = 'auto'
  paused = true
  async play() {
    this.paused = false
  }
  pause() {
    this.paused = true
    this.dispatchEvent(new Event('pause'))
  }
}

test('music is lazy, loops quietly, and pauses from the control', async () => {
  let count = 0
  const statuses = []
  const audio = new MockAudio()
  const player = createMusicPlayer(
    '/audio/test.mp3',
    (s) => statuses.push(s),
    () => {
      count++
      return audio
    },
  )
  assert.equal(count, 0)
  await player.play()
  assert.equal(count, 1)
  assert.equal(audio.src, '/audio/test.mp3')
  assert.equal(audio.preload, 'none')
  assert.equal(audio.loop, true)
  assert.equal(audio.volume, 0.18)
  assert.equal(statuses.at(-1), 'playing')
  player.pause()
  assert.equal(audio.paused, true)
  assert.equal(statuses.at(-1), 'paused')
  await player.play()
  assert.equal(count, 1)
  player.dispose()
})

test('autoplay rejection reports blocked and allows an explicit retry', async () => {
  const statuses = []
  const audio = new MockAudio()
  audio.play = async () => {
    throw new DOMException('Gesture required', 'NotAllowedError')
  }
  const player = createMusicPlayer(
    'test.mp3',
    (s) => statuses.push(s),
    () => audio,
  )
  await player.play()
  assert.equal(statuses.at(-1), 'blocked')
  audio.play = async () => {
    audio.paused = false
  }
  await player.play()
  assert.equal(statuses.at(-1), 'playing')
  player.dispose()
})

test('switching off while play is pending cannot start late audio', async () => {
  const statuses = []
  const audio = new MockAudio()
  let complete
  audio.play = () =>
    new Promise((resolve) => {
      complete = () => {
        audio.paused = false
        resolve()
      }
    })
  const player = createMusicPlayer(
    'test.mp3',
    (s) => statuses.push(s),
    () => audio,
  )
  const pending = player.play()
  player.pause()
  complete()
  await pending
  assert.equal(audio.paused, true)
  assert.equal(statuses.at(-1), 'paused')
  player.dispose()
})

test('a broken media source reports an error instead of claiming playback', async () => {
  const statuses = []
  const audio = new MockAudio()
  const player = createMusicPlayer(
    'test.mp3',
    (s) => statuses.push(s),
    () => audio,
  )
  await player.play()
  audio.dispatchEvent(new Event('error'))
  assert.equal(audio.paused, true)
  assert.equal(statuses.at(-1), 'error')
  player.dispose()
  audio.dispatchEvent(new Event('error'))
  assert.equal(statuses.at(-1), 'error')
})
