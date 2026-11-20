import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "BANTU CLTR",
  description: 'UI component generated with Kizuri AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: "body{visibility:hidden}" }} />
        <script dangerouslySetInnerHTML={{ __html: "(function(){var revealed=false;function reveal(){if(revealed)return;revealed=true;document.body.style.visibility=\"visible\";var o=document.getElementById(\"kz-cloak-spinner\");if(o&&o.parentNode)o.parentNode.removeChild(o);clearTimeout(spinnerTimer);clearTimeout(hardTimer);}var spinnerTimer=setTimeout(function(){if(revealed)return;var o=document.createElement(\"div\");o.id=\"kz-cloak-spinner\";o.style.cssText=\"position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#fff;z-index:2147483647;\";o.innerHTML='<div style=\"width:32px;height:32px;border-radius:50%;border:3px solid #e5e7eb;border-top-color:#19468B;animation:kzspin 0.8s linear infinite;\"></div><style>@keyframes kzspin{to{transform:rotate(360deg)}}</style>';document.body.appendChild(o);},150);var hardTimer=setTimeout(reveal,3000);window.__kizuriRevealPage=reveal;})();" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
