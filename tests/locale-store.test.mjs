import assert from 'node:assert/strict'
import { after, beforeEach, test } from 'node:test'
import {
  LOCALE_STORAGE_KEY,
  useLocaleStore,
} from '../src/store/useLocaleStore.ts'

import { MUSIC_STORAGE_KEY } from '../src/store/preferences.ts'

const originalStorage = Object.getOwnPropertyDescriptor(
  globalThis,
  'localStorage',
)
let memory
beforeEach(() => {
  memory = new Map()
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => memory.set(key, value),
    },
  })
  useLocaleStore.setState({
    locale: 'en',
    initialized: false,
    dialogOpen: false,
  })
})
after(() => {
  if (originalStorage)
    Object.defineProperty(globalThis, 'localStorage', originalStorage)
  else delete globalThis.localStorage
})

test('a new visitor receives the chooser with English as the initial language', () => {
  assert.equal(useLocaleStore.getState().locale, 'en')
  assert.equal(useLocaleStore.getState().dialogOpen, false)
  useLocaleStore.getState().initialize()
  assert.equal(useLocaleStore.getState().locale, 'en')
  assert.equal(useLocaleStore.getState().dialogOpen, true)
})

test('a returning visitor keeps Thai without repeating the chooser', () => {
  memory.set(LOCALE_STORAGE_KEY, 'th')
  memory.set(MUSIC_STORAGE_KEY, 'off')
  useLocaleStore.getState().initialize()
  assert.equal(useLocaleStore.getState().locale, 'th')
  assert.equal(useLocaleStore.getState().dialogOpen, false)
})

test('an unsupported stored value falls back to the English chooser', () => {
  memory.set(LOCALE_STORAGE_KEY, 'invalid')
  useLocaleStore.getState().initialize()
  assert.equal(useLocaleStore.getState().locale, 'en')
  assert.equal(useLocaleStore.getState().dialogOpen, true)
})

test('selection closes the chooser and subsequent switching persists the new language', () => {
  useLocaleStore.getState().initialize()
  useLocaleStore.getState().selectLocale('th')
  assert.equal(useLocaleStore.getState().dialogOpen, false)
  assert.equal(useLocaleStore.getState().locale, 'th')
  assert.equal(memory.get(LOCALE_STORAGE_KEY), 'th')
  useLocaleStore.getState().selectLocale('en')
  assert.equal(useLocaleStore.getState().locale, 'en')
  assert.equal(memory.get(LOCALE_STORAGE_KEY), 'en')
  useLocaleStore.getState().initialize()
  assert.equal(useLocaleStore.getState().locale, 'en')
})

test('blocked browser storage does not prevent choosing or switching languages', () => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() {
      throw new Error('Storage blocked')
    },
  })
  assert.doesNotThrow(() => useLocaleStore.getState().initialize())
  assert.equal(useLocaleStore.getState().dialogOpen, true)
  assert.doesNotThrow(() => useLocaleStore.getState().selectLocale('th'))
  assert.equal(useLocaleStore.getState().locale, 'th')
  assert.equal(useLocaleStore.getState().dialogOpen, false)
})

test('an existing language preference receives the music question once', () => {
  memory.set(LOCALE_STORAGE_KEY, 'th')
  useLocaleStore.getState().initialize()
  assert.equal(useLocaleStore.getState().locale, 'th')
  assert.equal(useLocaleStore.getState().dialogOpen, true)
})
