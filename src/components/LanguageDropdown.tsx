import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { useLocaleStore, type Locale } from '../store/useLocaleStore'
import { usePortfolioStore } from '../store/usePortfolioStore'

const options: { locale: Locale; label: string; description: string }[] = [
  { locale: 'en', label: 'English', description: 'ภาษาอังกฤษ' },
  { locale: 'th', label: 'ภาษาไทย', description: 'Thai' },
]

export function LanguageDropdown() {
  const { locale, t } = useContent()
  const selectLocale = useLocaleStore((state) => state.selectLocale)
  const closeNavigation = usePortfolioStore((state) => state.setMenuOpen)
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const choices = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  useEffect(() => {
    if (!open) return
    choices.current[
      options.findIndex((option) => option.locale === locale)
    ]?.focus()
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !wrapper.current?.contains(event.target)
      )
        setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open, locale])

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      trigger.current?.focus()
      return
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (!open) {
      closeNavigation(false)
      setOpen(true)
      return
    }
    const index = choices.current.findIndex(
      (item) => item === document.activeElement,
    )
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? options.length - 1
          : (index + (event.key === 'ArrowUp' ? -1 : 1) + options.length) %
            options.length
    choices.current[next]?.focus()
  }

  return (
    <div
      ref={wrapper}
      className="language-dropdown"
      onKeyDown={handleKey}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-toggle"
        aria-label={t('Choose website language')}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          closeNavigation(false)
          setOpen((value) => !value)
        }}
      >
        <Languages size={16} aria-hidden="true" />
        <span lang="en">{locale.toUpperCase()}</span>
        <ChevronDown
          className="language-chevron"
          size={14}
          aria-hidden="true"
        />
      </button>
      <div
        id={id}
        className="language-dropdown-panel"
        role="group"
        aria-label={t('Website language')}
        hidden={!open}
      >
        <p className="language-dropdown-heading">{t('Website language')}</p>
        {options.map((option, index) => (
          <button
            key={option.locale}
            ref={(element) => {
              choices.current[index] = element
            }}
            type="button"
            className="language-dropdown-option"
            aria-pressed={locale === option.locale}
            onClick={() => {
              selectLocale(option.locale)
              setOpen(false)
              trigger.current?.focus()
            }}
          >
            <span className="language-dropdown-code" lang="en">
              {option.locale.toUpperCase()}
            </span>
            <span className="language-dropdown-copy">
              <strong lang={option.locale}>{option.label}</strong>
              <small lang={option.locale === 'en' ? 'th' : 'en'}>
                {option.description}
              </small>
            </span>
            <Check
              className="language-dropdown-check"
              size={18}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
