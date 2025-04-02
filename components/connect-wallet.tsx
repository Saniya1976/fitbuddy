"use client"

import { useState } from "react"
import { Wallet, WalletIcon as WalletConnect, CreditCard, Loader2 } from "lucide-react"

interface ConnectWalletProps {
  onConnect: (type: string) => void
  isLoading: boolean
}

const ConnectWallet = ({ onConnect, isLoading }: ConnectWalletProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = (type: string) => {
    onConnect(type)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {!isOpen ? (
        <button className="connect-button" onClick={() => setIsOpen(true)} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Wallet"
          )}
        </button>
      ) : (
        <div className="wallet-options">
          <h3 className="mb-4 text-center text-xl font-semibold text-white">Select Wallet</h3>

          <button className="wallet-option" onClick={() => handleConnect("metamask")}>
            <Wallet className="h-6 w-6" />
            <span>MetaMask</span>
          </button>

          <button className="wallet-option" onClick={() => handleConnect("walletconnect")}>
            <WalletConnect className="h-6 w-6" />
            <span>WalletConnect</span>
          </button>

          <button className="wallet-option" onClick={() => handleConnect("coinbase")}>
            <CreditCard className="h-6 w-6" />
            <span>Coinbase Wallet</span>
          </button>

          <button className="mt-4 text-sm text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      )}

      <style jsx>{`
        .connect-button {
          background: transparent;
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          padding: 0.75rem 2.5rem;
          border-radius: 8px;
          border: 2px solid var(--electric-blue);
          position: relative;
          overflow: hidden;
          z-index: 1;
          transition: all 0.3s;
          box-shadow: 0 0 10px var(--electric-blue), 
                      0 0 20px rgba(0, 191, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .connect-button:hover {
          background: var(--electric-blue);
          color: #0A0E17;
        }
        
        .connect-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .wallet-options {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          min-width: 300px;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
        }
        
        .wallet-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 0.75rem;
          color: white;
          transition: all 0.2s;
        }
        
        .wallet-option:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: var(--electric-blue);
          box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default ConnectWallet

