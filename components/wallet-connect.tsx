"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Wallet, WalletIcon as WalletConnectIcon, CreditCard, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

export default function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            // If wallet is already connected, store in localStorage
            localStorage.setItem("walletConnected", "true")
            localStorage.setItem("walletAddress", accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async (type: string) => {
    setIsConnecting(true)

    try {
      // Quick mock connection for demo purposes
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      const mockBalance = (Math.random() * 10).toFixed(4)

      // Store wallet info in localStorage
      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletAddress", mockAddress)
      localStorage.setItem("walletBalance", mockBalance)

      // Show success state
      setIsSuccess(true)

      // Redirect to dashboard immediately
      router.push("/dashboard")
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
      setIsConnecting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => handleConnect("metamask")}
        className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-teal-500 text-white font-medium text-lg"
      >
        <span className="flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          Connect Wallet
        </span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Connect Your Wallet</DialogTitle>
            <DialogDescription className="text-center text-gray-400">Choose a wallet to connect</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <WalletOption
              name="MetaMask (Fast)"
              icon={<Wallet className="h-6 w-6 text-orange-400" />}
              onClick={() => handleConnect("metamask")}
              isLoading={isConnecting}
            />

            <WalletOption
              name="WalletConnect"
              icon={<WalletConnectIcon className="h-6 w-6 text-blue-400" />}
              onClick={() => handleConnect("walletconnect")}
              isLoading={isConnecting}
            />

            <WalletOption
              name="Coinbase Wallet"
              icon={<CreditCard className="h-6 w-6 text-blue-500" />}
              onClick={() => handleConnect("coinbase")}
              isLoading={isConnecting}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function WalletOption({
  name,
  icon,
  onClick,
  isLoading,
}: {
  name: string
  icon: React.ReactNode
  onClick: () => void
  isLoading: boolean
}) {
  return (
    <button
      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-purple-500/50 transition-all"
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3 font-medium">{name}</span>
      </div>
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
      ) : (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

