"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import { FlaskConical, X } from "lucide-react"

const PRODUCTS = [
  {
    title: "X-Taze Chemistry Set",
    price: 390,
    image: "/images/chemistry-set.png",
    description: "Kit complet pour une expérience pure et puissante.",
    fullDescription: "Ce kit de chimie X-Taze contient tout le nécessaire pour une expérience haut de gamme. Flacons, béchers et réactifs de qualité premium.",
    symbol: "XT",
    number: "35",
  },
  {
    title: "Heisenberg Signature T-Shirt",
    price: 49,
    image: "/images/desert-flowers.png",
    description: "Le tee-shirt officiel du roi du désert.",
    fullDescription: "T-shirt premium inspiré du désert. Design signature Heisenberg avec finitions haut de gamme.",
    symbol: "HS",
    number: "42",
  },
  {
    title: "RV Model Kit",
    price: 125,
    image: "/images/rv-pair.png",
    description: "Le laboratoire mobile légendaire en modèle réduit.",
    fullDescription: "Modèle réduit 1/16 du célèbre RV. Détails exceptionnels et finition collector.",
    symbol: "RV",
    number: "16",
  },
]

export function FeaturedProducts() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const openModal = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    setIsAnimating(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedProduct(null)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isModalOpen && isAnimating) {
      timer = setTimeout(() => {
        setIsAnimating(false)
      }, 4000)
    }
    return () => clearTimeout(timer)
  }, [isModalOpen, isAnimating])

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-4 py-10" id="featured">
        <div className="flex items-center gap-4 mb-8">
          <FlaskConical className="w-8 h-8 text-[#3e6757]" />
          <div>
            <p className="text-xs tracking-[3px] text-[#3e6757] uppercase">LABORATOIRE CLANDESTIN</p>
            <h2 className="text-3xl font-bold tracking-tight">Éléments Essentiels</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <div
              key={index}
              onClick={() => openModal(product)}
              className="group relative bg-[#111111] border border-[#3e6757]/30 rounded-2xl overflow-hidden hover:border-[#3e6757] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start p-5 pb-3 border-b border-[#3e6757]/20">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#3e6757] text-white border border-[#2f5246] text-sm font-bold">
                    {product.symbol}
                  </div>
                  <div className="text-xs text-[#3e6757] font-mono">{product.number}</div>
                </div>
                <span className="text-2xl font-bold text-[#3e6757]">{product.price}€</span>
              </div>

              <div className="relative h-[185px] bg-black flex items-center justify-center p-5">
                <Image src={product.image} alt={product.title} fill className="object-contain group-hover:scale-105 transition-transform" />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-base mb-1.5 line-clamp-1">{product.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product.title) }}
                  className="w-full bg-[#f97316] hover:bg-orange-600 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  Ajouter au Laboratoire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
          <div 
            className="relative w-full max-w-md rounded-3xl bg-[#0a0a0a] border border-[#3e6757]/40 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 z-50 text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>

            {/* Video Smoke Effect from local path */}
            <div className={`absolute inset-0 pointer-events-none overflow-hidden bg-black transition-all duration-1000 ${isAnimating ? 'opacity-100 z-40' : 'opacity-20 z-0'}`}>
              <video 
                src="/images/smoke-effect/smoke.mp4"
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover mix-blend-screen"
              />
            </div>

            {/* Product Details Content */}
            <div className={`relative p-8 transition-opacity duration-1000 ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#3e6757] text-white text-sm font-bold">
                      {selectedProduct.symbol}
                    </div>
                    <span className="text-[#3e6757] font-mono text-sm">{selectedProduct.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mix-blend-overlay">{selectedProduct.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#3e6757]">{selectedProduct.price}€</div>
                </div>
              </div>

              <div className="relative h-56 w-full mb-6 rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                <Image src={selectedProduct.image} alt={selectedProduct.title} fill className="object-contain" />
              </div>

              <p className="text-zinc-300 leading-relaxed mb-8 relative z-10">
                {selectedProduct.fullDescription}
              </p>

              <button 
                onClick={() => {
                  addToCart(selectedProduct.title)
                  closeModal()
                }}
                className="w-full bg-[#f97316] hover:bg-orange-600 py-3.5 rounded-2xl text-sm font-bold tracking-wider transition-all relative z-10"
              >
                AJOUTER AU LABORATOIRE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}