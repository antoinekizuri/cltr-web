'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Scissors, Clock, MapPin, Mail, MessageCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

export const SITE_NAME = "BANTU CLTR"

const LOGO = "https://yejeustukvivoacbkfde.supabase.co/storage/v1/object/public/chat-uploads/71c71eac-c67a-4e8d-b11e-471e90f52417/1791546111777-kqkvmjtl.jpeg"

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
  { label: 'Visit', href: '#visit' },
]

const PRIME = [
  { name: "Adult Cut", desc: "A full grooming experience. Your cut includes a wash using shampoo and conditioner then finished with a hot towel treatment to leave you looking fresh.", price: "R140", duration: "50 min" },
  { name: "Bald Razor Cut", desc: "A clean, smooth razor finish for that sharp bald look. Includes a wash with shampoo to start and a hot towel treatment to finish it off right.", price: "R150", duration: "55 min" },
  { name: "Kids' Cut", desc: "A relaxed, friendly cut made for kids. Includes a wash with shampoo and conditioner, plus a hot towel finish to match the grown-up experience.", price: "R120", duration: "50 min" },
  { name: "Beard Treatment", desc: "A detailed and full beard treatment, using a hot towel and finishing with beard oil for hydration and clean growth.", price: "R70", duration: "30 min" },
  { name: "Line Up", desc: "A quick touch-up to sharpen your edges and clean up your hairline. Finished with a warm hot towel for that extra fresh feel.", price: "R70", duration: "25 min" },
]

const LUX = [
  { name: "Adult Luxury Cut", desc: "The CLTR experience taken up a notch. Includes your adult cut with wash and hot towel treatment, an express facial cleanse to refresh your skin, and a buff and shine for your nails.", price: "R600", duration: "100 min" },
  { name: "Luxurious Razor Bald Cut", desc: "A sharp, smooth razor finish paired with premium self-care. Includes your bald razor cut with wash and hot towel treatment, an express facial, and a buff and shine for your nails to complete the look.", price: "R650", duration: "100 min" },
]

const ADDON = [
  { name: "Bleach", desc: "Lighten things up with a professional service, done carefully to give you a bold look.", price: "From R150", duration: "45 min" },
  { name: "Colour", desc: "Add some colour and personality to your style. Whether it's a subtle or a bold change, tailored for you.", price: "From R250", duration: "100 min" },
]

const imgError = (e) => {
  const img = e.currentTarget
  if (!img.dataset.retried) {
    img.dataset.retried = 'true'
    img.src = img.src + (img.src.includes('?') ? '&' : '?') + 'retry=1'
  } else {
    img.style.display = 'none'
    if (img.parentElement) img.parentElement.classList.add('bg-zinc-800')
  }
}

function TribalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-1" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="w-2 h-2 rotate-45 border border-[#b87333]/60" />
      ))}
    </div>
  )
}

function ServiceRow({ s }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-zinc-800 last:border-0">
      <div className="flex-1">
        <h4 className="font-semibold text-zinc-100" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.name}</h4>
        <p className="text-sm text-zinc-400 mt-1 leading-relaxed max-w-xl">{s.desc}</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-500">
          <Clock className="w-3.5 h-3.5" />{s.duration}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <span className="text-xl font-bold text-[#c87a3f]" style={{ fontFamily: "'Anton', sans-serif" }}>{s.price}</span>
      </div>
    </div>
  )
}

export default function CltrBarbershop() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!document.querySelector('link[data-kodee-font]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.dataset.kodeeFont = 'true'
      link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600;700&display=swap'
      document.head.appendChild(link)
    }
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0f12] text-zinc-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* NAVBAR */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled ? 'bg-[#0d0f12]/90 backdrop-blur border-b border-zinc-800' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <img src={LOGO} alt="BANTU CLTR" onError={imgError} className="w-10 h-10 rounded-full object-cover" />
            <span className="text-lg tracking-widest text-zinc-100" style={{ fontFamily: "'Anton', sans-serif" }}>BANTU CLTR</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <a key={i} data-kizuri-nav-item={String(i)} href={item.href}
                className="text-sm tracking-wide text-zinc-400 hover:text-[#c87a3f] transition-colors">{item.label}</a>
            ))}
            <a href="#book">
              <Button className="bg-[#b87333] hover:bg-[#c87a3f] text-zinc-950 font-semibold rounded-lg">Book a chair</Button>
            </a>
          </div>
          <button className="md:hidden text-zinc-200 p-2" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0d0f12] md:hidden flex flex-col">
          <div className="h-16 px-4 flex items-center justify-between border-b border-zinc-800">
            <span className="text-lg tracking-widest text-zinc-100" style={{ fontFamily: "'Anton', sans-serif" }}>BANTU CLTR</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-zinc-200" aria-label="Close menu"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex flex-col p-6 gap-5">
            {NAV_ITEMS.map((item, i) => (
              <a key={i} data-kizuri-nav-item={String(i)} href={item.href} onClick={() => setMenuOpen(false)}
                className="text-2xl tracking-wide text-zinc-300 hover:text-[#c87a3f]" style={{ fontFamily: "'Anton', sans-serif" }}>{item.label}</a>
            ))}
            <a href="#book" onClick={() => setMenuOpen(false)} className="mt-4">
              <Button className="w-full bg-[#b87333] hover:bg-[#c87a3f] text-zinc-950 font-semibold rounded-lg">Book a chair</Button>
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-[100svh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1600&q=80"
          alt="Barber at work in the chair"
          onError={imgError}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f12] via-[#0d0f12]/80 to-[#0d0f12]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
          <div className="max-w-2xl">
            <TribalDivider />
            <p className="text-[#c87a3f] text-xs tracking-[0.35em] uppercase mb-4">Est. 1997 · Florida Road, Durban</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[0.92] text-zinc-50" style={{ fontFamily: "'Anton', sans-serif" }}>
              SHARP CUTS.<br />ROOTED IN<br /><span className="text-[#c87a3f]">CULTURE.</span>
            </h1>
            <p className="mt-6 text-zinc-300 text-base sm:text-lg max-w-md leading-relaxed">
              Fades, razors and beard work done right — wash, hot towel and all. Off Florida Road, where the chair's always warm.
            </p>
            <a href="#book">
              <Button size="lg" className="mt-8 bg-[#b87333] hover:bg-[#c87a3f] text-zinc-950 font-bold text-base px-8 rounded-lg">
                Book a chair <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-14 sm:py-20 bg-[#0d0f12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <TribalDivider />
            <h2 className="text-3xl sm:text-4xl text-zinc-50 mt-2" style={{ fontFamily: "'Anton', sans-serif" }}>THE PRICE LIST</h2>
            <p className="text-zinc-400 mt-3 max-w-md mx-auto">Three tiers. Every cut includes the full CLTR treatment — pick your lane.</p>
          </div>

          <Accordion type="single" collapsible defaultValue="prime" className="space-y-3">
            <AccordionItem value="prime" className="border border-zinc-800 rounded-xl bg-zinc-900/40 px-5">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <Scissors className="w-5 h-5 text-[#c87a3f]" />
                  <div>
                    <span className="text-xl text-zinc-50 block" style={{ fontFamily: "'Anton', sans-serif" }}>CLTR PRIME</span>
                    <span className="text-xs text-zinc-500 font-normal">Everyday cuts, done properly</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {PRIME.map((s, i) => <ServiceRow key={i} s={s} />)}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="lux" className="border border-zinc-800 rounded-xl bg-zinc-900/40 px-5">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <Scissors className="w-5 h-5 text-[#c87a3f]" />
                  <div>
                    <span className="text-xl text-zinc-50 block" style={{ fontFamily: "'Anton', sans-serif" }}>CLTR LUX</span>
                    <span className="text-xs text-zinc-500 font-normal">The full self-care sit-down</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {LUX.map((s, i) => <ServiceRow key={i} s={s} />)}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="addon" className="border border-zinc-800 rounded-xl bg-zinc-900/40 px-5">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <Scissors className="w-5 h-5 text-[#c87a3f]" />
                  <div>
                    <span className="text-xl text-zinc-50 block" style={{ fontFamily: "'Anton', sans-serif" }}>CLTR ADD-ON</span>
                    <span className="text-xs text-zinc-500 font-normal">Colour & bleach, your call</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                {ADDON.map((s, i) => <ServiceRow key={i} s={s} />)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-14 sm:py-20 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <TribalDivider />
            <h2 className="text-3xl sm:text-4xl text-zinc-50 mt-2" style={{ fontFamily: "'Anton', sans-serif" }}>THE WORK</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="row-span-2 overflow-hidden rounded-xl bg-zinc-800">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80" alt="Fresh fade" onError={imgError} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-xl bg-zinc-800 aspect-square">
              <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80" alt="Beard trim" onError={imgError} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-xl bg-zinc-800 aspect-square">
              <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80" alt="Razor line up" onError={imgError} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-xl bg-zinc-800 aspect-square">
              <img src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=600&q=80" alt="Clean bald razor finish" onError={imgError} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-xl bg-zinc-800 aspect-square">
              <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80" alt="Inside the shop" onError={imgError} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="py-14 sm:py-20 bg-[#0d0f12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <TribalDivider />
            <h2 className="text-3xl sm:text-4xl text-zinc-50 mt-2" style={{ fontFamily: "'Anton', sans-serif" }}>BOOK YOUR SEAT</h2>
            <p className="text-zinc-400 mt-3 max-w-md mx-auto">Pick a service, choose a time, lock it in. We'll be ready.</p>
          </div>
          <div data-kizuri-shop="booking"></div>
        </div>
      </section>

      {/* VISIT / FOOTER */}
      <footer id="visit" className="bg-zinc-950 border-t border-zinc-800 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={LOGO} alt="BANTU CLTR" onError={imgError} className="w-11 h-11 rounded-full object-cover" />
                <span className="text-xl tracking-widest text-zinc-100" style={{ fontFamily: "'Anton', sans-serif" }}>BANTU CLTR</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">Sharp cuts rooted in culture. Serving Durban from Florida Road since 1997.</p>
            </div>
            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#c87a3f] mb-4">Find Us</h3>
              <div className="flex items-start gap-2.5 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" />
                <span>233 Florida Road, Durban</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#c87a3f] mb-4">Reach Us</h3>
              <a href="https://wa.me/27783562462" className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-[#c87a3f] transition-colors mb-3">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp: +27 78 356 2462
              </a>
              <a href="mailto:jordy@cltr.co.za" className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-[#c87a3f] transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> jordy@cltr.co.za
              </a>
              <p className="text-xs text-zinc-600 mt-3">WhatsApp only — no calls, please.</p>
            </div>
          </div>
          <TribalDivider />
          <p className="text-center text-xs text-zinc-600 mt-4">© {new Date().getFullYear()} BANTU CLTR · 233 Florida Road, Durban</p>
        </div>
      </footer>
    </div>
  )
}