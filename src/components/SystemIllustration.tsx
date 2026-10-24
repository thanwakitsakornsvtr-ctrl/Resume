import { useContent } from '../hooks/useContent'
export function SystemIllustration() {
  const { t } = useContent()
  return (
    <div className="system-illustration" aria-hidden="true">
      <div className="illustration-caption">
        <span className="tiny-dot" />
        {t('THE THINKING BEHIND THE INTERFACE')}
      </div>
      <svg viewBox="0 0 520 440" fill="none" className="system-svg">
        <defs>
          <linearGradient
            id="plane-top"
            x1="90"
            y1="72"
            x2="400"
            y2="230"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#F0F5FF" />
          </linearGradient>
          <linearGradient
            id="plane-middle"
            x1="100"
            y1="200"
            x2="400"
            y2="310"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F8FBFF" />
            <stop offset="1" stopColor="#DFEBFF" />
          </linearGradient>
          <linearGradient
            id="plane-bottom"
            x1="80"
            y1="260"
            x2="400"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E5EFFF" />
            <stop offset="1" stopColor="#BBD4FF" />
          </linearGradient>
          <filter
            id="plane-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="220%"
          >
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="16"
              floodColor="#194387"
              floodOpacity=".09"
            />
          </filter>
          <pattern
            id="blueprint-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path d="M32 0H0V32" stroke="#DCE5F1" strokeWidth=".75" />
          </pattern>
        </defs>
        <ellipse
          cx="260"
          cy="362"
          rx="190"
          ry="45"
          fill="#D9E6FA"
          opacity=".25"
        />
        <path
          d="M25 324 260 196 495 324 260 452Z"
          fill="url(#blueprint-grid)"
          opacity=".7"
        />
        <g filter="url(#plane-shadow)">
          <path
            d="m89 294 157-86a28 28 0 0 1 28 0l157 86q17 10 0 20l-157 86a28 28 0 0 1-28 0L89 314q-17-10 0-20Z"
            fill="url(#plane-bottom)"
            stroke="#A7C3EC"
          />
        </g>
        <path
          d="m158 302 102 56 105-57M260 358v32"
          stroke="#81A7DF"
          strokeWidth="1.5"
        />
        <g fill="#F4F8FF" stroke="#95B5E4">
          <path d="m224 277 36-20 36 20v21l-36 20-36-20Z" />
          <path d="m224 277 36 20 36-20M260 297v21" />
        </g>
        <path
          d="M260 258V156M158 300V197M363 300V197"
          stroke="#8BADE0"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <g filter="url(#plane-shadow)">
          <path
            d="m89 208 157-86a28 28 0 0 1 28 0l157 86q17 10 0 20l-157 86a28 28 0 0 1-28 0L89 228q-17-10 0-20Z"
            fill="url(#plane-middle)"
            stroke="#B8CDEC"
          />
        </g>
        <path
          d="m157 215 103-56 103 56-103 57Z"
          stroke="#9FBEEB"
          strokeWidth="1.5"
        />
        <path
          d="m158 215 102 56 103-56M260 159v112"
          stroke="#9FBEEB"
          strokeWidth="1.5"
        />
        <g fill="#0071E3" stroke="white" strokeWidth="3">
          <circle cx="158" cy="215" r="5" />
          <circle cx="260" cy="159" r="5" />
          <circle cx="363" cy="215" r="5" />
          <circle cx="260" cy="271" r="5" />
        </g>
        <g filter="url(#plane-shadow)">
          <path
            d="m89 122 157-86a28 28 0 0 1 28 0l157 86q17 10 0 20l-157 86a28 28 0 0 1-28 0L89 142q-17-10 0-20Z"
            fill="url(#plane-top)"
            stroke="#C1D1E7"
          />
        </g>
        <g transform="matrix(.866 .5 -.866 .5 239 70)">
          <rect width="144" height="112" rx="8" fill="white" stroke="#C4D5EC" />
          <path d="M0 24h144" stroke="#DCE5F1" />
          <circle cx="12" cy="12" r="3" fill="#A7B9D2" />
          <circle cx="23" cy="12" r="3" fill="#C1CDDE" />
          <circle cx="34" cy="12" r="3" fill="#DCE5F1" />
          <rect x="12" y="36" width="32" height="64" rx="4" fill="#EFF4FC" />
          <rect x="56" y="36" width="76" height="20" rx="4" fill="#DAE9FF" />
          <rect x="56" y="68" width="32" height="32" rx="4" fill="#F0F4FA" />
          <rect x="100" y="68" width="32" height="32" rx="4" fill="#F0F4FA" />
          <path
            d="M20 48h16M20 60h12M20 72h16M64 46h48"
            stroke="#88ABDF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g stroke="#A7BAD4" strokeWidth="1">
          <path d="M405 140h64M406 226h63M406 313h63" />
          <circle cx="405" cy="140" r="2" fill="#A7BAD4" />
          <circle cx="406" cy="226" r="2" fill="#A7BAD4" />
          <circle cx="406" cy="313" r="2" fill="#A7BAD4" />
        </g>
      </svg>
      <div className="plane-label label-experience">
        01 <span>{t('Experience')}</span>
      </div>
      <div className="plane-label label-system">
        02 <span>{t('Systems')}</span>
      </div>
      <div className="plane-label label-foundation">
        03 <span>{t('Foundations')}</span>
      </div>
      <div className="illustration-bottom">
        <span>{t('Clarity at every layer.')}</span>
        <span className="diagram-cross">+</span>
      </div>
    </div>
  )
}
