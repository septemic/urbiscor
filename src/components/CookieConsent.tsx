import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  adsConsentKey, adsPreferencesEvent, getAdsConsent, initializeAdsConsent, refreshAdsConsent,
  setAdsConsent, type AdsConsent,
} from '@/lib/googleAds'

export function CookieConsent() {
  const [choice, setChoice] = useState<AdsConsent | null>(null)
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const panel = useRef<HTMLElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const saved = initializeAdsConsent()
    setChoice(saved)
    setOpen(saved === null)
    const onOpen = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setChoice(getAdsConsent())
      setOpen(true)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== adsConsentKey) return
      const saved = refreshAdsConsent()
      setChoice(saved)
      setOpen(saved === null)
    }
    window.addEventListener(adsPreferencesEvent, onOpen)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(adsPreferencesEvent, onOpen)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    if (open && returnFocus.current) panel.current?.focus()
  }, [open])

  function close() {
    setOpen(false)
    returnFocus.current?.focus()
    returnFocus.current = null
  }

  function choose(next: AdsConsent) {
    setAdsConsent(next)
    setChoice(next)
    setAnnouncement(next === 'accepted' ? 'Măsurarea reclamelor a fost acceptată.' : 'Măsurarea reclamelor a fost refuzată.')
    close()
  }

  return (
    <>
      <p role="status" className="sr-only">{announcement}</p>
      {open && (
        <section
          ref={panel}
          className="cookie-consent"
          aria-labelledby="cookie-consent-title"
          tabIndex={-1}
          onKeyDown={(event) => { if (event.key === 'Escape' && choice !== null) close() }}
        >
          <h2 id="cookie-consent-title" className="text-lg font-bold">Preferințe cookies</h2>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            Cu acordul tău, folosim cookie-uri Google Ads pentru a măsura solicitările venite din reclame.
            Poți refuza și folosi site-ul în continuare.{' '}
            <Link to="/politica-cookies" className="font-medium text-foreground underline underline-offset-4">Politica cookies</Link>.
          </p>
          {choice !== null && (
            <p className="mt-3 text-sm text-steel">Alegere curentă: {choice === 'accepted' ? 'măsurare acceptată' : 'măsurare refuzată'}.</p>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" className="btn btn-outline-dark" onClick={() => choose('rejected')}>Refuz</button>
            <button type="button" className="btn btn-outline-dark" onClick={() => choose('accepted')}>Accept măsurarea</button>
          </div>
          {choice !== null && <button type="button" onClick={close} className="mt-4 min-h-11 text-sm text-steel underline underline-offset-4">Închide</button>}
        </section>
      )}
    </>
  )
}
