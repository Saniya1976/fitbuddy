"use client"

import { useState, useEffect } from "react"
import ParticleBackground from "@/components/particle-background"
import ConnectWallet from "@/components/connect-wallet"
import Dashboard from "@/components/dashboard"

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

export default function HomeContent() {
  const [connected, setConnected] = useState(false)
  const [wallet, setWallet] = useState("")
  const [balance, setBalance] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if MetaMask is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            // Get balance using the ethereum object directly
            const balanceHex = await window.ethereum.request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            })

            // Convert hex balance to decimal and then to ETH
            const balanceWei = Number.parseInt(balanceHex, 16)
            const balanceEth = balanceWei / 1e18

            setWallet(accounts[0])
            setBalance(balanceEth.toFixed(4))
            setConnected(true)
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async (type: string) => {
    setLoading(true)

    try {
      if (type === "metamask") {
        if (typeof window !== "undefined" && window.ethereum) {
          // Request accounts access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

          // Get balance using the ethereum object directly
          const balanceHex = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })

          // Convert hex balance to decimal and then to ETH
          const balanceWei = Number.parseInt(balanceHex, 16)
          const balanceEth = balanceWei / 1e18

          setWallet(accounts[0])
          setBalance(balanceEth.toFixed(4))
          setConnected(true)
        } else {
          alert("MetaMask is not installed. Please install MetaMask to connect.")
        }
      } else {
        // Mock connection for other wallet types
        const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
        setWallet(mockAddress)
        setBalance("0.0425")
        setConnected(true)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-space">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-4 py-8">
        {!connected ? (
          <div className="flex min-h-[80vh] flex-col items-center justify-center">
            <h1 className="mb-8 text-center font-heading text-5xl font-bold text-white md:text-7xl">
              <span className="text-electric-blue">Cyber</span>Fit
            </h1>
            <p className="mb-12 max-w-2xl text-center text-lg text-gray-300">
              The future of fitness is here. Connect your wallet to access your on-chain fitness data, earn NFT
              achievements, and monetize your health journey.
            </p>
            <ConnectWallet onConnect={handleConnect} isLoading={loading} />
          </div>
        ) : (
          <Dashboard walletAddress={wallet} walletBalance={balance} />
        )}
      </div>

      <style jsx global>{`
        :root {
          --electric-blue: #00BFFF;
          --space-bg: #0A0E17;
        }
        
        .bg-space {
          background-color: var(--space-bg);
        }
        
        .text-electric-blue {
          color: var(--electric-blue);
        }
        
        .font-heading {
          font-family: 'Orbitron', 'Inter', sans-serif;
        }
        
        @font-face {
          font-family: 'Orbitron';
          src: url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          font-display: swap;
        }
      `}</style>
    </main>
  )
}

