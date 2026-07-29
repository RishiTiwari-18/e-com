import Logo from '@/features/system/components/Logo'
import React from 'react'

export default function Footer() {
  return (
    <footer className="py-8">
      <div className=" px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
          <div className="w-36 shrink-0">
            <Logo />
          </div>

          <nav className="text-primary flex flex-wrap gap-4 md:gap-10 justify-center md:justify-start">
            <button className="cursor-pointer hover:underline duration-300 text-sm">Instagram</button>
            <button className="cursor-pointer hover:underline duration-300 text-sm">LinkedIn</button>
            <button className="cursor-pointer hover:underline duration-300 text-sm">Twitter</button>
            <button className="cursor-pointer hover:underline duration-300 text-sm">Privacy Policy</button>
          </nav>

          <div className="text-center md:text-right text-sm">
            <p>© {new Date().getFullYear()} OUTFIT. Created by Rishi Tiwari.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
