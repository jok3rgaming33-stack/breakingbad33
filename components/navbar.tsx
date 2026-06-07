"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Menu, ShoppingCart, X } from "lucide-react"
import Image from "next/image"

const NAV_ITEMS = [
  { label: "Engagement qualité" },
  { label: "Livraison/Meet-up" },
  { label: "Espace fidélité" },
  { label: "Conditions de vente" },
]

export function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* === Groupe Logo + Menu Burger === */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button (Menu Burger) */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-white/10 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo Heisenberg */}
          <a href="#" className="flex items-center" aria-label="BreakingBad33">
            <Image 
              src="/images/face.png" 
              alt="BreakingBad33" 
              width={55} 
              height={55} 
              className="h-11 w-auto object-contain" 
            />
          </a>
        </div>

        {/* Desktop Navigation (Reste visible uniquement sur grands écrans) */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Panier */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => console.log("Ouverture du panier")}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <span className="hidden sm:inline">MON PANIER</span>
            <div className="relative flex h-8 w-8 items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#22ffaa] px-1 text-[10px] font-bold text-black">
                  {count}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Corrigé pour forcer l'affichage par-dessus le contenu) */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-black/95 border-b border-white/10 z-[100] lg:hidden animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col p-4 gap-2">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href="#" 
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-4 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}