import type { Metadata } from 'next'
import './globals.css'

const title = 'BANTU CLTR | Barbershop on Florida Road, Durban'
const description =
  'Sharp cuts rooted in culture. BANTU CLTR has been cutting on 233 Florida Road, Durban since 1997. See our prices and book your cut online.'

export const metadata: Metadata = {
  metadataBase: new URL('https://cltr.co.za'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://cltr.co.za',
    siteName: 'BANTU CLTR',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/media/hero-desktop-poster.jpg', alt: 'BANTU CLTR barbershop, Durban' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/media/hero-desktop-poster.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: "body{visibility:hidden}" }} />
        <script dangerouslySetInnerHTML={{ __html: "(function(){var revealed=false;function reveal(){if(revealed)return;revealed=true;document.body.style.visibility=\"visible\";var o=document.getElementById(\"kz-cloak-spinner\");if(o&&o.parentNode)o.parentNode.removeChild(o);clearTimeout(spinnerTimer);clearTimeout(hardTimer);}var spinnerTimer=setTimeout(function(){if(revealed)return;var o=document.createElement(\"div\");o.id=\"kz-cloak-spinner\";o.style.cssText=\"position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#fff;z-index:2147483647;\";o.innerHTML='<div style=\"width:32px;height:32px;border-radius:50%;border:3px solid #e5e7eb;border-top-color:#19468B;animation:kzspin 0.8s linear infinite;\"></div><style>@keyframes kzspin{to{transform:rotate(360deg)}}</style>';document.body.appendChild(o);},150);var hardTimer=setTimeout(reveal,3000);window.__kizuriRevealPage=reveal;})();" }} />
      </head>
      <body>{children}
        <script src="/kizuri-leads.js" defer></script>
        <script src="/kizuri-editor.js" defer></script>
        <script src="/kizuri-shop.js" defer></script>
        <script src="/kizuri-booking.js" defer></script>
        <script src="/kizuri-events.js" defer></script>
        <script src="/kizuri-settings.js" defer></script>
        <script src="/kizuri-tutor-platform.js" defer></script></body>
    </html>
  )
}
