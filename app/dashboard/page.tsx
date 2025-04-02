"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SparklesCore } from "@/components/ui/sparkles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Dumbbell,
  Apple,
  MessageSquare,
  User,
  BarChart3,
  Flame,
  Footprints,
  Trophy,
  LogOut,
} from "lucide-react"
import ExerciseSection from "@/components/exercise-section"
import DietSection from "@/components/diet-section"
import ChatbotSection from "@/components/chatbot-section"
import NftChallenges from "@/components/nft-challenges"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [walletAddress, setWalletAddress] = useState("")
  const [walletBalance, setWalletBalance] = useState("")
  const router = useRouter()

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    streak: 12,
    calories: {
      burned: 2450,
      goal: 3000,
      percentage: 82,
    },
    steps: {
      count: 8745,
      goal: 10000,
      percentage: 87,
    },
    workouts: {
      completed: 4,
      goal: 5,
      percentage: 80,
    },
    water: {
      consumed: 1.8,
      goal: 2.5,
      percentage: 72,
    },
  }

  // Check if wallet is connected on mount
  useEffect(() => {
    setMounted(true)

    // For demo purposes, create a wallet connection if none exists
    if (!localStorage.getItem("walletConnected")) {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      const mockBalance = (Math.random() * 10).toFixed(4)

      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletAddress", mockAddress)
      localStorage.setItem("walletBalance", mockBalance)
    }

    const address = localStorage.getItem("walletAddress") || "0x0000000000000000000000000000000000000000"
    const balance = localStorage.getItem("walletBalance") || "0.0000"

    setWalletAddress(address)
    setWalletBalance(balance)
  }, [])

  const handleDisconnect = () => {
    // Clear wallet info from localStorage
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletBalance")

    // Show toast notification
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully.",
      variant: "default",
    })

    // Redirect to home
    router.push("/")
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#9d4edd"
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-teal-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-900/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-300">Fit</span>{" "}
                Buddy
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-gray-800/30 rounded-full px-3 py-1 border border-purple-500/20">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-300 font-mono">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </span>
                <span className="text-xs text-purple-300 font-mono ml-1">({walletBalance} ETH)</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={handleDisconnect}
              >
                <LogOut className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">{userData.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-6 mb-8 bg-gray-900/30 backdrop-blur-sm border border-purple-900/40 rounded-lg">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="exercise"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
              >
                <Dumbbell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">Exercise</span>
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
              >
                <Apple className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">Nutrition</span>
              </TabsTrigger>
              <TabsTrigger
                value="challenges"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
              >
                <Trophy className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">NFT Challenges</span>
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">AI Coach</span>
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600 hidden lg:flex"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<Flame className="h-5 w-5" />}
                  title="Calories Burned"
                  value={userData.calories.burned.toLocaleString()}
                  target={userData.calories.goal.toLocaleString()}
                  percentage={userData.calories.percentage}
                  color="from-orange-500 to-red-500"
                />

                <StatCard
                  icon={<Footprints className="h-5 w-5" />}
                  title="Daily Steps"
                  value={userData.steps.count.toLocaleString()}
                  target={userData.steps.goal.toLocaleString()}
                  percentage={userData.steps.percentage}
                  color="from-teal-500 to-cyan-400"
                />

                <StatCard
                  icon={<Activity className="h-5 w-5" />}
                  title="Workouts"
                  value={`${userData.workouts.completed}/${userData.workouts.goal}`}
                  target="Weekly Goal"
                  percentage={userData.workouts.percentage}
                  color="from-purple-500 to-indigo-500"
                />

                <StatCard
                  icon={<Droplet className="h-5 w-5" />}
                  title="Water Intake"
                  value={`${userData.water.consumed}L`}
                  target={`${userData.water.goal}L Goal`}
                  percentage={userData.water.percentage}
                  color="from-cyan-500 to-blue-500"
                />
              </div>

              {/* Activity and Streak */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
                  <CardHeader>
                    <CardTitle className="text-white">Weekly Activity</CardTitle>
                    <CardDescription className="text-gray-300">
                      Your fitness activity for the past 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-between gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                        const heights = [60, 85, 40, 70, 95, 50, 75]
                        return (
                          <div key={day} className="flex flex-col items-center gap-2">
                            <div
                              className="w-8 bg-gradient-to-t from-purple-600 to-teal-400 rounded-t-md"
                              style={{ height: `${heights[i]}%` }}
                            ></div>
                            <span className="text-xs text-gray-300">{day}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
                  <CardHeader>
                    <CardTitle className="text-white">Streak</CardTitle>
                    <CardDescription className="text-gray-300">Your current workout streak</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e3a8a" strokeWidth="10" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * userData.streak) / 30}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9d4edd" />
                            <stop offset="100%" stopColor="#20dbd8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{userData.streak}</span>
                        <span className="text-sm text-gray-300">days</span>
                      </div>
                    </div>
                    <p className="mt-4 text-center text-gray-200">
                      {userData.streak >= 10 ? "Amazing streak! Keep it up!" : "You're building momentum!"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming workouts */}
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Workouts</CardTitle>
                  <CardDescription className="text-gray-300">Your scheduled sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-purple-800/40">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Dumbbell className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Upper Body Strength</h4>
                          <p className="text-sm text-gray-300">Today • 6:00 PM</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
                      >
                        Start
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-purple-800/40">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">HIIT Cardio</h4>
                          <p className="text-sm text-gray-300">Tomorrow • 7:30 AM</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-400 hover:bg-purple-900/50"
                      >
                        Reschedule
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-purple-800/40">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Dumbbell className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Lower Body Focus</h4>
                          <p className="text-sm text-gray-300">Wed, Apr 5 • 6:30 PM</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-400 hover:bg-purple-900/50"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercise">
              <ExerciseSection />
            </TabsContent>

            <TabsContent value="nutrition">
              <DietSection />
            </TabsContent>

            <TabsContent value="challenges">
              <NftChallenges walletAddress={walletAddress} />
            </TabsContent>

            <TabsContent value="chat">
              <ChatbotSection />
            </TabsContent>

            <TabsContent value="profile">
              <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
                <CardHeader>
                  <CardTitle className="text-white">Profile</CardTitle>
                  <CardDescription className="text-gray-300">Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                        Change Avatar
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                          <input
                            type="text"
                            value="Alex Johnson"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Email</label>
                          <input
                            type="email"
                            value="alex.johnson@example.com"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Wallet Address</label>
                          <input
                            type="text"
                            value={walletAddress}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white font-mono text-sm"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Wallet Balance</label>
                          <input
                            type="text"
                            value={`${walletBalance} ETH`}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Fitness Goals</label>
                        <textarea
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white h-24"
                          defaultValue="Lose 10 pounds, increase strength, and improve overall fitness."
                        ></textarea>
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Missing components
const Droplet = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
)

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  target: string
  percentage: number
  color: string
}

const StatCard = ({ icon, title, value, target, percentage, color }: StatCardProps) => {
  return (
    <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`h-8 w-8 rounded-full bg-gradient-to-r ${color} bg-opacity-20 flex items-center justify-center`}
          >
            {icon}
          </div>
          <span className="text-xs text-gray-300">{target}</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{value}</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-300">Progress</span>
            <span className="text-xs text-gray-300">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-1.5 bg-gray-800">
            <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${percentage}%` }} />
          </Progress>
        </div>
      </CardContent>
    </Card>
  )
}

