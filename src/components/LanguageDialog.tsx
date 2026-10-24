import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Languages, Music2 } from 'lucide-react'
import { useLocaleStore, type Locale } from '../store/useLocaleStore'
import { useMusicStore } from '../store/useMusicStore'

export function LanguageDialog() {
  const dialog = useRef<HTMLDialogElement>(null)
  const open = useLocaleStore((state) => state.dialogOpen)
  const selectLocale = useLocaleStore((state) => state.selectLocale)
  const [chosenLanguage, setSelection] = useState<Locale>()
  const [music, setMusic] = useState(false)
  const setMusicEnabled = useMusicStore((state) => state.setEnabled)
  const locale = useLocaleStore((state) => state.locale)
  const selection = chosenLanguage ?? locale

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) element.showModal()
    if (!open && element.open) element.close()
  }, [open])

  return (
    <dialog
      ref={dialog}
      className="language-dialog"
      aria-labelledby="language-title"
      aria-describedby="language-description"
      onCancel={(event) => {
        event.preventDefault()
        selectLocale(selection)
        setMusicEnabled(false)
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          selectLocale(selection)
          setMusicEnabled(music)
        }}
      >
        <div className="language-dialog-top">
          <span className="language-dialog-icon">
            <Languages size={24} aria-hidden="true" />
          </span>
          <span className="dialog-wordmark" lang="en">
            <span>Thanwa</span> Kitsakorn<span>.</span>
          </span>
        </div>
        <p className="dialog-eyebrow" lang="en">
          A LITTLE CLARITY, FROM THE START.
        </p>
        <h2 id="language-title">
          <span lang="en">Make yourself at home.</span>
          <span lang="th">เลือกภาษาที่คุณถนัด</span>
        </h2>
        <p id="language-description">
          <span lang="en">Choose your language. You can switch anytime.</span>
          <span lang="th">
            เลือกภาษาสำหรับเว็บไซต์ เปลี่ยนได้เสมอที่แถบเมนู
          </span>
        </p>
        <fieldset className="language-options">
          <legend className="sr-only">
            Website language / ภาษาของเว็บไซต์
          </legend>
          <label className="language-option">
            <input
              type="radio"
              name="language"
              value="en"
              checked={selection === 'en'}
              onChange={() => setSelection('en')}
              autoFocus
            />
            <span className="language-option-code" lang="en">
              EN
            </span>
            <span className="language-option-text">
              <strong lang="en">English</strong>
              <small lang="th">ภาษาอังกฤษ</small>
            </span>
            <span className="language-option-check" aria-hidden="true">
              <Check size={16} />
            </span>
          </label>
          <label className="language-option">
            <input
              type="radio"
              name="language"
              value="th"
              checked={selection === 'th'}
              onChange={() => setSelection('th')}
            />
            <span className="language-option-code" lang="en">
              TH
            </span>
            <span className="language-option-text">
              <strong lang="th">ภาษาไทย</strong>
              <small lang="en">Thai</small>
            </span>
            <span className="language-option-check" aria-hidden="true">
              <Check size={16} />
            </span>
          </label>
        </fieldset>
        <label className="music-choice">
          <span className="music-choice-icon" aria-hidden="true">
            <Music2 size={20} />
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={music}
            aria-checked={music}
            onChange={(event) => setMusic(event.target.checked)}
            aria-describedby="music-choice-note"
          />
          <span className="music-choice-copy">
            <strong>
              <span lang="en">Add a little quiet piano?</span>
              <span lang="th">ต้องการฟังเปียโนเบา ๆ ไหม?</span>
            </strong>
            <small id="music-choice-note">
              <span lang="en">Soft piano. Switch off anytime.</span>
              <span lang="th">เปียโนเบา ๆ ปิดได้ทุกเมื่อที่แถบเมนู</span>
            </small>
          </span>
          <span className="music-choice-switch" aria-hidden="true">
            <span />
          </span>
        </label>
        <div className="language-dialog-actions">
          <button
            className="button button-primary language-continue"
            type="submit"
            lang={selection}
          >
            {selection === 'en'
              ? 'Continue in English'
              : 'เข้าสู่เว็บไซต์ภาษาไทย'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="language-dialog-note">
            <span lang="en">
              Your language and music choices stay in this browser.
            </span>
            <span lang="th">จดจำภาษาและตัวเลือกเพลงไว้ในเบราว์เซอร์นี้</span>
          </p>
        </div>
      </form>
    </dialog>
  )
}
