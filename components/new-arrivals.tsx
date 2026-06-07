"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import { Sparkles, X } from "lucide-react"
import Image from "next/image"

type Arrival = {
  title: string
  price: number
  image: string
  alt: string
  symbol: string
  number: string
  starred?: boolean
}

const ARRIVALS: Arrival[] = [
  { title: "Blue Crystal Candle", price: 29, image: "/images/blue-candle.png", alt: "Blue crystalline candle", symbol: "BC", number: "07" },
  { title: "Los Pollos Hermanos Mug", price: 19, image: "/images/pollos-mug.png", alt: "Los Pollos mug", symbol: "LP", number: "19" },
  { title: "Heisenberg Black Mug", price: 19, image: "/images/black-mug.png", alt: "Matte black mug", symbol: "HM", number: "23" },
  { title: "RV Keychain", price: 12, image: "/images/rv-keychain.png", alt: "RV keychain", symbol: "RV", number: "16", starred: true },
]

export function NewArrivals() {
  const { addToCart } = useCart()
  const [selectedArrival, setSelectedArrival] = useState<Arrival | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const openModal = (arrival: Arrival) => {
    setSelectedArrival(arrival)
    setIsModalOpen(true)
    setIsAnimating(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedArrival(null)
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
      <section className="mx-auto max-w-[1200px] px-4 pb-14">
        <div className="flex items-center gap-3 mb-7">
          <Sparkles className="w-6 h-6 text-[#3e6757]" />
          <div>
            <p className="text-xs tracking-[3px] text-[#3e6757] uppercase">JUST DROPPED</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">New Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4">
          {ARRIVALS.map((a) => (
            <ArrivalCard key={a.title} arrival={a} onOpenModal={() => openModal(a)} />
          ))}
        </div>
      </section>

      {isModalOpen && selectedArrival && (
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
                      {selectedArrival.symbol}
                    </div>
                    <span className="text-[#3e6757] font-mono text-sm">{selectedArrival.number}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mix-blend-overlay">{selectedArrival.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-[#3e6757]">${selectedArrival.price}</div>
                </div>
              </div>

              <div className="relative h-48 sm:h-56 w-full mb-6 rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                <Image src={selectedArrival.image} alt={selectedArrival.alt} fill className="object-contain" />
              </div>

              <p className="text-zinc-300 leading-relaxed mb-8 relative z-10 text-sm sm:text-base">
                Un nouvel arrivage exclusif directement du laboratoire. Conçu avec la précision et la pureté exigées par les professionnels.
              </p>

              <button 
                onClick={() => {
                  addToCart(selectedArrival.title)
                  closeModal()
                }}
                className="w-full bg-[#f97316] hover:bg-orange-600 py-3.5 rounded-2xl text-sm font-bold tracking-wider transition-all relative z-10"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ArrivalCard({ arrival, onOpenModal }: { arrival: Arrival, onOpenModal: () => void }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(arrival.title)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div 
      onClick={onOpenModal}
      className="group bg-[#111111] border border-[#3e6757]/30 rounded-2xl overflow-hidden hover:border-[#3e6757] transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start p-4 pb-2 border-b border-[#3e6757]/20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#3e6757] text-white text-xs font-bold border border-[#2f5246]">
            {arrival.symbol}
          </div>
          <div className="text-[10px] text-[#3e6757] font-mono">{arrival.number}</div>
        </div>
        {arrival.starred && <Sparkles className="w-4 h-4 text-[#3e6757]" />}
      </div>

      <div className="relative h-[200px] sm:h-[155px] bg-black flex items-center justify-center p-4">
        <Image src={arrival.image} alt={arrival.alt} fill className="object-contain group-hover:scale-105 transition-transform" />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold tracking-tight line-clamp-2 mb-3">{arrival.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${arrival.price}</span>
          <button onClick={handleAdd} className="rounded-full bg-[#f97316] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#fb923c] transition-colors">
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}