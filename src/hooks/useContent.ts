import * as englishContent from '../content/portfolio'
import { thaiContent } from '../content/th'
import { thaiMessages, type Message } from '../content/messages'
import { useLocaleStore } from '../store/useLocaleStore'

export function useContent() {
  const locale = useLocaleStore((state) => state.locale)
  const content = locale === 'th' ? thaiContent : englishContent
  const t = (message: Message): string =>
    locale === 'th' ? thaiMessages[message] : message
  return { ...content, locale, t }
}
