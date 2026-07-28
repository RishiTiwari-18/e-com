import Logo from '@/features/system/components/Logo'
import React from 'react'

export default function Footer() {
  return (
        <div className="py-10 flex justify-between items-center  px-8">
          <div className="w-40">
            <Logo />
          </div>
          <div className="text-primary flex gap-10">
            <p className="cursor-pointer hover:underline duration-300">
              Instagram
            </p>
            <p className="cursor-pointer hover:underline duration-300">
              LinkedIn
            </p>
            <p className="cursor-pointer hover:underline duration-300">
              Twitter
            </p>
            <p className="cursor-pointer hover:underline duration-300">
              Private Policy
            </p>
          </div>
          <div className="">
            <p>
              © {new Date().getFullYear()} OUTFIT. Created by the Rishi Tiwari.
            </p>
          </div>
        </div>
  )
}
