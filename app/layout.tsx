import type { Metadata } from 'next'
import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Container from './components/Container'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'

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
          <LoginModal isOpen title='Login Or Register'
            body={
              <div
                className='text-sm'
              >
                Hello
              </div>
            }
            actionLabel='Login'
          
          />
          <Navbar />
        </ClientOnly>
          {/* {children} */}
      </body>
    </html>
  )
}
