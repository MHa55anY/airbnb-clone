import type { Metadata } from 'next'
import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/Modal'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          {/* fill the props... TBD */}
          <RegisterModal />
          <Navbar />
        </ClientOnly>
          {/* {children} */}
      </body>
    </html>
  )
}
