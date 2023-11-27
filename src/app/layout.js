import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Resource Scanner',
  description: 'Scan a list of URLs to check their status.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="16x16" href="/static/assets/favicon16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/assets/favicon.png" />
      {/* Bootstrap */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
      {/* cross-fetch polyfill */}
      <script src="https://unpkg.com/cross-fetch/dist/browser-polyfill.js"></script>
      <link rel="stylesheet" href="/static/style.css" />
      {/* Adobe Fonts */}
	  <link rel="stylesheet" href="https://use.typekit.net/cmn5cya.css" />
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
