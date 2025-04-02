"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { SparklesCore } from "@/components/ui/sparkles"
import { Button } from "@/components/ui/button"
import { Wallet, WalletIcon, CreditCard } from "lucide-react"

export default function WalletPage() {
  const router = useRouter()

  const handleQuickConnect = () => {
    // Quick mock connection
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
    const mockBalance = (Math.random() * 10).toFixed(4)

    // Store wallet info
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem("walletAddress", mockAddress)
    localStorage.setItem("walletBalance", mockBalance)

    // Redirect immediately
    router.push("/dashboard")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#9d4edd"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center max-w-md">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-white">Connect Your Wallet</h1>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-purple-500/20 p-6">
          <div className="space-y-4">
            <WalletButton
              name="MetaMask (Instant)"
              icon={<Wallet className="h-6 w-6 text-orange-400" />}
              onClick={handleQuickConnect}
            />

            <WalletButton
              name="WalletConnect"
              icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
              onClick={handleQuickConnect}
            />

            <WalletButton
              name="Coinbase Wallet"
              icon={<CreditCard className="h-6 w-6 text-blue-500" />}
              onClick={handleQuickConnect}
            />
          </div>

          <p className="mt-6 text-sm text-gray-400">All connections are simulated for demo purposes</p>

          <Button variant="outline" className="mt-6 border-gray-700 text-gray-300" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

function WalletButton({
  name,
  icon,
  onClick,
}: {
  name: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-purple-500/50 transition-all"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3 font-medium text-white">{name}</span>
      </div>
      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

