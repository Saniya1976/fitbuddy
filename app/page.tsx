"use client"

import type React from "react"
import { SparklesCore } from "@/components/ui/sparkles"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
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

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-1/3 h-1/3 bg-purple-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-1/3 h-1/3 bg-teal-500/20 blur-[120px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
        <div className="animate-pulse-slow mb-2 inline-block rounded-full bg-gradient-to-r from-purple-500/30 to-teal-500/30 px-3 py-1 text-sm text-white">
          Next-Gen Fitness Platform
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-300">Fit</span> Buddy
        </h1>

        <p className="mb-8 max-w-lg mx-auto text-center text-lg text-blue-100/80">
          Your AI-powered fitness companion. Track workouts, optimize nutrition, and achieve your goals faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              // Quick mock connection
              const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
              const mockBalance = (Math.random() * 10).toFixed(4)

              // Store wallet info
              localStorage.setItem("walletConnected", "true")
              localStorage.setItem("walletAddress", mockAddress)
              localStorage.setItem("walletBalance", mockBalance)

              // Redirect immediately
              window.location.href = "/dashboard"
            }}
            className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-teal-500 text-white font-medium text-lg"
          >
            <span className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Quick Connect
            </span>
          </Button>

          <Link
            href="/wallet"
            className="group relative inline-flex h-12 overflow-hidden rounded-lg bg-transparent border border-purple-500 px-8 py-3 hover:bg-purple-500/10 transition-colors"
          >
            <span className="relative flex items-center justify-center text-purple-300 font-medium">
              Advanced Connect
            </span>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          <FeatureCard
            icon={<ChartIcon />}
            title="Track Progress"
            description="Monitor your fitness journey with advanced analytics and insights."
            gradient="from-purple-600/20 to-fuchsia-600/20"
          />

          <FeatureCard
            icon={<ClockIcon />}
            title="Optimize Time"
            description="AI-generated workouts and meal plans tailored to your schedule."
            gradient="from-teal-600/20 to-blue-600/20"
          />

          <FeatureCard
            icon={<BoltIcon />}
            title="Earn NFT Rewards"
            description="Complete challenges and earn exclusive NFT achievements."
            gradient="from-amber-600/20 to-orange-600/20"
          />
        </div>
      </div>
    </div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${gradient} backdrop-blur-sm p-6 border border-white/10 transition-transform hover:scale-105`}
    >
      <div className="mb-3 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-blue-200/70">{description}</p>
    </div>
  )
}

// Icons
function ChartIcon() {
  return (
    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

