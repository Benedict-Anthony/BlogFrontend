import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My blog',
  description: 'Come and get the latest news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-400}`}>
        <ToastContainer />
        <Header />
        <main className="container mx-auto mt-2">
          {children}
        </main>
      </body>
    </html>
  )
}
