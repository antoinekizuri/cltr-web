'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Anton, Poppins } from 'next/font/google'
import { Menu, X, MapPin, Mail, MessageCircle, ArrowRight, ArrowUpRight } from 'lucide-react'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins', display: 'swap' })

export const SITE_NAME = "BANTU CLTR"

const LOGO = "https://yejeustukvivoacbkfde.supabase.co/storage/v1/object/public/chat-uploads/71c71eac-c67a-4e8d-b11e-471e90f52417/1791546111777-kqkvmjtl.jpeg"
const WHATSAPP = "https://wa.me/27783562462"
const MAPS = "https://www.google.com/maps/search/?api=1&query=233+Florida+Road+Durban"

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
  { label: 'Visit', href: '#visit' },
]

const TICKER = ['Fades', 'Razor bald', 'Beard care', 'Line ups', 'Hot towel', 'Kids cuts', 'Colour', 'Bleach']

// Hero video: one file per form factor, chosen on the client so a phone never
// downloads the desktop cut (and vice versa). Reduced-motion visitors get the
// still poster.
const HERO = {
  desktop: { src: '/media/hero-desktop.mp4', poster: '/media/hero-desktop-poster.jpg' },
  mobile: { src: '/media/hero-mobile.mp4', poster: '/media/hero-mobile-poster.jpg' },
}

const imgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (!img.dataset.retried) {
    img.dataset.retried = 'true'
    img.src = img.src + (img.src.includes('?') ? '&' : '?') + 'retry=1'
  } else {
    img.style.display = 'none'
    if (img.parentElement) img.parentElement.classList.add('bg-zinc-800')
  }
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [poster, setPoster] = useState(HERO.desktop.poster)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const pick = isMobile ? HERO.mobile : HERO.desktop
    setPoster(pick.poster)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.src = pick.src
    video.play().catch(() => { /* autoplay refused: the poster stays */ })
  }, [])

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
    />
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p data-kizuri-edit="194pjh6" className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-copper-light">
      <span data-kizuri-edit="1g5nwyn" aria-hidden="true" className="h-px w-8 bg-copper" />
      {children}
    </p>
  )
}

export default function CltrBarbershop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div data-kizuri-edit="145idqc" className={`${anton.variable} ${poppins.variable} cltr min-h-screen bg-obsidian font-body text-silver antialiased`}>
      {/* NAVBAR */}
      <header data-kizuri-section="1xx8uns" data-kizuri-edit="1xx8uns" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-obsidian/85 backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <a data-kizuri-edit="oizs8s" href="#home" className="flex items-center gap-3" aria-label="CLTR home">
            <img data-kizuri-edit="16ts2b8" src={LOGO} alt="BANTU CLTR logo" onError={imgError} className="h-10 w-10 rounded-full object-cover ring-1 ring-copper/50" />
            <span data-kizuri-edit="1vx9ous" className="font-display text-xl tracking-[0.2em] text-white">CLTR</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <a data-kizuri-edit="wzna1e" key={i} data-kizuri-nav-item={String(i)} href={item.href}
                className="text-sm tracking-wide text-silver/80 transition-colors hover:text-copper-light">{item.label}</a>
            ))}
            <a data-kizuri-edit="oiztxa" href="#book" className="cltr-btn-primary px-5 py-2.5 text-sm">
              <span data-kizuri-edit="zojlmb">Book a chair</span>
            </a>
          </div>
          <button data-kizuri-edit="13j3nyq" className="-mr-2 p-2 text-white md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu data-kizuri-edit="r0ktuh" data-kizuri-kind="icon" className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div data-kizuri-edit="3d375t" className="fixed inset-0 z-[60] flex flex-col bg-obsidian md:hidden">
          <div data-kizuri-edit="3d3802" className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <span data-kizuri-edit="13lyx06" className="font-display text-xl tracking-[0.2em] text-white">CLTR</span>
            <button data-kizuri-edit="13j3osz" onClick={() => setMenuOpen(false)} className="-mr-2 p-2 text-white" aria-label="Close menu"><X data-kizuri-edit="1ab9u82" data-kizuri-kind="icon" className="h-6 w-6" /></button>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-6">
            {NAV_ITEMS.map((item, i) => (
              <a data-kizuri-edit="1gkfitw" key={i} data-kizuri-nav-item={String(i)} href={item.href} onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-3 font-display text-4xl tracking-wide text-white transition-colors hover:text-copper-light">{item.label}</a>
            ))}
            <a data-kizuri-edit="oizvls" href="#book" onClick={() => setMenuOpen(false)} className="cltr-btn-primary mt-auto w-full py-4 text-base">
              <span data-kizuri-edit="1j9buet">Book a chair</span>
            </a>
          </div>
        </div>
      )}

      <main>
        {/* HERO */}
        <section data-kizuri-section="56ug6c" data-kizuri-edit="56ug6c" id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
          <HeroVideo />
          <div data-kizuri-edit="3d38ub" aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-black/30" />
          <div data-kizuri-edit="3d39ok" aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent md:block" />
          <div aria-hidden="true" className="cltr-grain absolute inset-0" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-20">
            <div className="max-w-2xl cltr-rise">
              <Eyebrow>Florida Road, Durban</Eyebrow>
              <h1 data-kizuri-edit="132bum0" className="mt-5 font-display text-[22vw] leading-[0.82] tracking-tight text-white sm:text-[11rem] lg:text-[13rem]">
                CUT<span data-kizuri-edit="1fzed75" className="text-copper">.</span>
              </h1>
              <p data-kizuri-edit="1t9x2t0" className="mt-6 max-w-lg text-base leading-relaxed text-silver/90 sm:text-lg">
                A barber&apos;s chair is where a neighbourhood tells its stories. CLTR is a Durban grooming house built on the blade, the conversation, and the craft passed on.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a data-kizuri-edit="oizwg1" href="#book" className="cltr-btn-primary group px-7 py-4 text-base">
                  <span data-kizuri-edit="lqfc7e">Book Your Cut</span>
                  <ArrowRight data-kizuri-edit="1r1ddpx" data-kizuri-kind="icon" aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a data-kizuri-edit="oizxaa" href="#services" className="cltr-btn-ghost px-7 py-4 text-base">
                  <span data-kizuri-edit="zt939k">See prices</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <section data-kizuri-section="56uh0l" data-kizuri-edit="56uh0l" aria-label="What we do" className="overflow-hidden border-y border-copper/30 bg-copper py-3 text-obsidian">
          <div className="cltr-marquee flex w-max gap-10 whitespace-nowrap font-display text-xl uppercase tracking-[0.15em] sm:text-2xl">
            {[...TICKER, ...TICKER].map((word, i) => (
              <span data-kizuri-edit="5g186y" key={i} aria-hidden={i >= TICKER.length} className="flex items-center gap-10">
                {word}<span data-kizuri-edit="1ljemrr" aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-obsidian/60" />
              </span>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section data-kizuri-section="56uhuu" data-kizuri-edit="56uhuu" id="services" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>The price list</Eyebrow>
                <h2 data-kizuri-edit="1dswi72" className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-6xl">THE PRICE LIST</h2>
                <p data-kizuri-edit="1vkgonr" className="mt-5 max-w-md text-base leading-relaxed text-silver/75">
                  Every cut, laid out plain — Three tiers built for however you want to walk out the door.
                </p>
                <p data-kizuri-edit="1pwhipv" className="mt-6 max-w-md text-sm leading-relaxed text-silver/55">
                  Tap Book on any service to jump straight to an open slot.
                </p>
              </div>
              <div data-kizuri-shop="price-list" className="cltr-price-list"></div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section data-kizuri-section="56uip3" data-kizuri-edit="56uip3" id="gallery" className="border-t border-white/5 bg-obsidian-2 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
              <div>
                <Eyebrow>From the chair</Eyebrow>
                <h2 data-kizuri-edit="kofmqb" className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-6xl">THE WORK</h2>
              </div>
              <a data-kizuri-edit="oizy4j" href={WHATSAPP} className="inline-flex items-center gap-2 text-sm font-medium text-copper-light transition-colors hover:text-white">
                <span data-kizuri-edit="1nbpooy">Send us your reference cut</span>
                <ArrowUpRight data-kizuri-edit="p6bftw" data-kizuri-kind="icon" aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 md:grid-cols-4">
              <div className="cltr-tile col-span-2 row-span-2">
                <img data-kizuri-edit="oyxtu7" src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&q=80" alt="Fresh fade" onError={imgError} loading="lazy" />
              </div>
              <div className="cltr-tile">
                <img data-kizuri-edit="biuchu" src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80" alt="Beard trim" onError={imgError} loading="lazy" />
              </div>
              <div className="cltr-tile row-span-2">
                <img data-kizuri-edit="cm9605" src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80" alt="Razor line up" onError={imgError} loading="lazy" />
              </div>
              <div className="cltr-tile">
                <img data-kizuri-edit="12s9lb1" src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=600&q=80" alt="Clean bald razor finish" onError={imgError} loading="lazy" />
              </div>
              <div className="cltr-tile col-span-2 md:col-span-1">
                <img data-kizuri-edit="1dl4e8l" src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80" alt="Inside the shop" onError={imgError} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section data-kizuri-section="56ujjc" data-kizuri-edit="56ujjc" id="book" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <Eyebrow>Book online</Eyebrow>
                <h2 data-kizuri-edit="1aymxbr" className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-6xl">BOOK YOUR SEAT</h2>
                <p data-kizuri-edit="ze7p1h" className="mt-5 max-w-md text-base leading-relaxed text-silver/75">Pick a service, choose a time, lock it in. We&apos;ll be ready.</p>
                <ol className="mt-10 space-y-6">
                  {[
                    ['01', 'Pick your service', 'Prime, Lux or an add-on — prices are right here.'],
                    ['02', 'Choose a time', 'Only open slots show, so what you see is free.'],
                    ['03', 'Pay and pull up', 'Pay securely online and your slot is confirmed.'],
                  ].map(([n, title, body]) => (
                    <li data-kizuri-edit="1eo0d0k" key={n} className="flex gap-5">
                      <span data-kizuri-edit="144lzx2" className="font-display text-3xl leading-none text-copper">{n}</span>
                      <div>
                        <h3 data-kizuri-edit="2fmld6" className="font-semibold text-white">{title}</h3>
                        <p data-kizuri-edit="1ff1wh1" className="mt-1 text-sm text-silver/60">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="cltr-booking">
                <div data-kizuri-shop="booking"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-kizuri-section="56ukdl" data-kizuri-edit="56ukdl" className="relative overflow-hidden border-y border-white/5 bg-obsidian-2">
          <div aria-hidden="true" className="cltr-glow absolute inset-0" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <h2 data-kizuri-edit="1j44zk9" className="font-display text-4xl leading-[0.95] text-white sm:text-6xl">PULL UP A CHAIR.</h2>
            <a data-kizuri-edit="oizyys" href={WHATSAPP} className="cltr-btn-primary px-7 py-4 text-base">
              <MessageCircle data-kizuri-edit="1il85tr" data-kizuri-kind="icon" aria-hidden="true" className="h-5 w-5" />
              <span data-kizuri-edit="lyycap">WhatsApp us</span>
            </a>
          </div>
        </section>
      </main>

      {/* VISIT / FOOTER */}
      <footer data-kizuri-section="gnlftq" data-kizuri-edit="gnlftq" id="visit" className="bg-black pb-8 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div className="flex items-center gap-3">
                <img data-kizuri-edit="16ts7cq" src={LOGO} alt="BANTU CLTR logo" onError={imgError} className="h-12 w-12 rounded-full object-cover ring-1 ring-copper/50" />
                <span data-kizuri-edit="1eiwym9" className="font-display text-2xl tracking-[0.2em] text-white">BANTU CLTR</span>
              </div>
              <p data-kizuri-edit="wnc9vp" className="mt-5 max-w-sm text-sm leading-relaxed text-silver/55">Sharp cuts rooted in culture. Serving Durban from Florida Road since 1997.</p>
            </div>
            <div>
              <h3 data-kizuri-edit="10kv16" className="text-xs font-semibold uppercase tracking-[0.3em] text-copper-light">Find us</h3>
              <a data-kizuri-edit="oizzt1" href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-start gap-3 text-sm text-silver/75 transition-colors hover:text-white">
                <MapPin data-kizuri-edit="1s2zux5" data-kizuri-kind="icon" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                <span data-kizuri-edit="vkbem2">233 Florida Road, Durban</span>
              </a>
            </div>
            <div>
              <h3 data-kizuri-edit="1h18vrx" className="text-xs font-semibold uppercase tracking-[0.3em] text-copper-light">Reach us</h3>
              <a data-kizuri-edit="s2k165" href={WHATSAPP} className="mt-5 flex items-center gap-3 text-sm text-silver/75 transition-colors hover:text-white">
                <MessageCircle data-kizuri-edit="1lz5y00" data-kizuri-kind="icon" aria-hidden="true" className="h-4 w-4 shrink-0 text-copper" />
                <span data-kizuri-edit="1yenhmb">WhatsApp: +27 78 356 2462</span>
              </a>
              <a data-kizuri-edit="s2k20e" href="mailto:jordy@cltr.co.za" className="mt-3 flex items-center gap-3 text-sm text-silver/75 transition-colors hover:text-white">
                <Mail data-kizuri-edit="18fe91f" data-kizuri-kind="icon" aria-hidden="true" className="h-4 w-4 shrink-0 text-copper" />
                <span data-kizuri-edit="158p8aj">jordy@cltr.co.za</span>
              </a>
              <p data-kizuri-edit="1u6xnmz" className="mt-4 text-xs text-silver/40">WhatsApp only — no calls, please.</p>
            </div>
          </div>
          <div data-kizuri-edit="3d3ait" className="mt-14 border-t border-white/10 pt-6 text-xs text-silver/40">
            <p data-kizuri-edit="1ej68f3">© {new Date().getFullYear()} BANTU CLTR · 233 Florida Road, Durban</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
