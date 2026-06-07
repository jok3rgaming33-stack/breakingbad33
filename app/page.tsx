"use client"

import { useState } from "react"
import { CartProvider } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { NewArrivals } from "@/components/new-arrivals"
import { LoginPage } from "@/components/login-page"
import Image from "next/image"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginPage onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <CartProvider>
      <Navbar />
      
      {/* Personnages réintégrés ici, visibles uniquement si authentifié */}
      <div className="pointer-events-none fixed bottom-0 left-0 z-[60] hidden h-[78vh] w-[200px] lg:block xl:w-[260px]">
        <Image src="/images/jp.png" alt="Jesse" fill className="object-contain object-left-bottom" priority />
      </div>
      <div className="pointer-events-none fixed bottom-0 right-0 z-[60] hidden h-[78vh] w-[200px] lg:block xl:w-[260px]">
        <Image src="/images/ww.png" alt="Walter" fill className="object-contain object-right-bottom" priority />
      </div>

      <main className="pt-16 bg-black/10">
        <Hero />
        <FeaturedProducts />
        <NewArrivals />
      </main>
    </CartProvider>
  )
}