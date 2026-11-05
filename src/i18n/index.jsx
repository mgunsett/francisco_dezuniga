// ─────────────────────────────────────────────────────────────
// Traducciones · ES (predeterminado) / EN / IT / FR
// El texto en español es la clave: t('Contacto') → 'Contact' en inglés.
// Si una frase no tiene traducción, se muestra en español.
// Variables: t('{n} fotos', { n: 15 }).
// ─────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import it from './it'
import fr from './fr'

export const LANGS = [
  { code: 'es', short: 'ES', label: 'Español',  locale: 'es-AR' },
  { code: 'en', short: 'EN', label: 'English',  locale: 'en-GB' },
  { code: 'it', short: 'IT', label: 'Italiano', locale: 'it-IT' },
  { code: 'fr', short: 'FR', label: 'Français', locale: 'fr-FR' },
]
const DICTS = { es: {}, en, it, fr }
const STORAGE_KEY = 'fz-lang'

const format = (str, vars) =>
  vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : str

export function translate(lang, str, vars) {
  if (str === undefined || str === null || str === '') return str
  if (typeof str !== 'string') return str
  const out = DICTS[lang]?.[str]
  if (out === undefined && lang !== 'es' && import.meta.env.DEV) {
    // ayuda a detectar textos sin traducir durante el desarrollo
    console.warn(`[i18n:${lang}] falta traducción:`, str)
  }
  return format(out ?? str, vars)
}

const readInitial = () => {
  try {
    const url = new URLSearchParams(window.location.search).get('lang')
    if (url && DICTS[url]) return url
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && DICTS[saved]) return saved
  } catch { /* sin storage: queda el predeterminado */ }
  return 'es'
}

const I18nContext = createContext({ lang: 'es', setLang: () => {}, t: (s) => s })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitial)
  const setLang = useCallback((l) => {
    if (!DICTS[l]) return
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const value = useMemo(() => ({
    lang,
    setLang,
    locale: LANGS.find((l) => l.code === lang)?.locale,
    t: (str, vars) => translate(lang, str, vars),
  }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
export const useT = () => useContext(I18nContext).t
