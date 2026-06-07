"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Fonction pour adapter le canvas à l'écran (surtout sur mobile)
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', resize)
    resize() // Appel initial

    const particles: any[] = []
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: '#ffffff'
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        
        // Rebond sur les bords
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }
    animate()

    // Nettoyage de l'événement lors de la fermeture de la page
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <section className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden">
      
      {/* Fond */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/blobby.png" alt="Background" fill className="object-contain" priority />
      </div>

      {/* Images décoratives (uniquement E5 à gauche et E à droite) */}
      <div className="absolute inset-0 z-[5] pointer-events-none p-4 sm:p-10 flex justify-between">
        {/* Côté gauche - E5 */}
        <div className="flex flex-col gap-8 justify-center">
          <Image src="/images/E5.png" alt="E5" width={60} height={60} className="opacity-70 hidden sm:block" />
        </div>

        {/* Côté droit - E */}
        <div className="flex flex-col gap-8 justify-center">
          <Image src="/images/E.png" alt="E" width={60} height={60} className="opacity-70 hidden sm:block" />
        </div>
      </div>

      {/* Canvas Atomes - Ajout de w-full h-full pour forcer l'affichage */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[10] w-full h-full pointer-events-none" />

      {/* Contenu central */}
      <div className="relative z-[30] w-full max-w-[450px] px-4 sm:px-8 mt-10 sm:mt-20 mx-auto">
        <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          
          <div className="mb-6">
            <Image 
              src="/images/pins.png" 
              alt="User" 
              width={150} 
              height={150} 
              className="rounded-full border-4 border-[#3e6757] shadow-[0_0_25px_rgba(62,103,87,0.6)] w-28 h-28 sm:w-[150px] sm:h-[150px]" 
              priority 
            />
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              // .toLowerCase().trim() permet d'accepter "Test ", "test", "TEST" sans erreur
              if (password.toLowerCase().trim() === "test") onSuccess() 
            }} 
            className="w-full space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoCapitalize="none" 
              autoCorrect="off"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            />
            <button 
              type="submit" 
              className="w-full bg-[#3e6757] hover:bg-[#2f5246] transition-colors text-white py-3 rounded-xl font-bold uppercase tracking-widest text-sm sm:text-base"
            >
              Déverrouiller
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}