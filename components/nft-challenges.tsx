"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Star, Award, Info, Lock, CheckCircle2, Flame, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface NftChallengesProps {
  walletAddress: string
}

export default function NftChallenges({ walletAddress }: NftChallengesProps) {
  const [selectedNft, setSelectedNft] = useState<any | null>(null)
  const [claimingNft, setClaimingNft] = useState(false)

  // Mock NFT challenges data
  const challenges = [
    {
      id: 1,
      name: "Marathon Master",
      description: "Complete a virtual marathon (26.2 miles) within 30 days",
      image: <Trophy className="h-12 w-12 text-yellow-400" />,
      rarity: "Legendary",
      completed: true,
      dateCompleted: "2025-03-15",
      tokenId: "0x1a2b3c4d5e",
      progress: 100,
      reward: "Exclusive Marathon Master NFT + 500 FIT tokens",
      backgroundColor: "from-yellow-600/20 to-amber-600/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 2,
      name: "30-Day Streak",
      description: "Complete at least one workout every day for 30 consecutive days",
      image: <Flame className="h-12 w-12 text-orange-400" />,
      rarity: "Epic",
      completed: true,
      dateCompleted: "2025-02-28",
      tokenId: "0x2b3c4d5e6f",
      progress: 100,
      reward: "30-Day Streak NFT + 300 FIT tokens",
      backgroundColor: "from-orange-600/20 to-red-600/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: 3,
      name: "Strength Sovereign",
      description: "Lift a total of 10,000 kg in a single month",
      image: <Award className="h-12 w-12 text-purple-400" />,
      rarity: "Rare",
      completed: false,
      progress: 75,
      reward: "Strength Sovereign NFT + 200 FIT tokens",
      backgroundColor: "from-purple-600/20 to-indigo-600/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: 4,
      name: "Nutrition Ninja",
      description: "Log your meals consistently for 21 days and maintain your macros",
      image: <Star className="h-12 w-12 text-teal-400" />,
      rarity: "Uncommon",
      completed: false,
      progress: 60,
      reward: "Nutrition Ninja NFT + 150 FIT tokens",
      backgroundColor: "from-teal-600/20 to-green-600/20",
      borderColor: "border-teal-500/30",
    },
    {
      id: 5,
      name: "Early Riser",
      description: "Complete 15 workouts before 7 AM",
      image: <Medal className="h-12 w-12 text-blue-400" />,
      rarity: "Rare",
      completed: false,
      progress: 40,
      reward: "Early Riser NFT + 200 FIT tokens",
      backgroundColor: "from-blue-600/20 to-cyan-600/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: 6,
      name: "HIIT Hero",
      description: "Complete 20 HIIT workouts in a month",
      image: <Zap className="h-12 w-12 text-pink-400" />,
      rarity: "Epic",
      completed: false,
      progress: 25,
      reward: "HIIT Hero NFT + 300 FIT tokens",
      backgroundColor: "from-pink-600/20 to-rose-600/20",
      borderColor: "border-pink-500/30",
    },
  ]

  const handleClaimNft = (challenge: any) => {
    setSelectedNft(challenge)
    setClaimingNft(true)

    // Simulate blockchain transaction
    setTimeout(() => {
      setClaimingNft(false)

      toast({
        title: "NFT Claimed Successfully!",
        description: `You've claimed the ${challenge.name} NFT. It has been added to your wallet.`,
        variant: "default",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                NFT Challenges
              </CardTitle>
              <CardDescription className="text-gray-300">
                Complete fitness challenges to earn exclusive NFTs
              </CardDescription>
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
              Browse Marketplace
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`rounded-lg bg-gradient-to-br ${challenge.backgroundColor} border ${challenge.borderColor} p-6 transition-transform hover:scale-[1.02] relative overflow-hidden`}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-teal-600/10 blur-xl rounded-lg"></div>

                <div className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-16 w-16 rounded-full bg-gray-900/60 flex items-center justify-center">
                      {challenge.image}
                    </div>

                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        challenge.rarity === "Legendary"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : challenge.rarity === "Epic"
                            ? "bg-purple-500/20 text-purple-300"
                            : challenge.rarity === "Rare"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {challenge.rarity}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{challenge.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">{challenge.description}</p>

                  {challenge.completed ? (
                    <div className="flex items-center text-green-400 text-sm mb-4">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Completed on {new Date(challenge.dateCompleted).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-gray-300">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-1.5 bg-gray-800">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full"
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </Progress>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-300 mb-4">
                    <Info className="h-4 w-4 mr-1" />
                    Reward: {challenge.reward}
                  </div>

                  {challenge.completed ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                          View NFT
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/20 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center">{challenge.name} NFT</DialogTitle>
                          <DialogDescription className="text-center text-gray-400">
                            This NFT is stored on the blockchain and owned by your wallet
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center py-6">
                          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 flex items-center justify-center mb-4 border border-white/10">
                            {challenge.image}
                          </div>

                          <div className="text-center mb-4">
                            <h3 className="text-xl font-semibold text-white">{challenge.name}</h3>
                            <p className="text-sm text-gray-300">{challenge.rarity} Rarity</p>
                          </div>

                          <div className="w-full bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-400">Token ID:</span>
                              <span className="text-white">{challenge.tokenId}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-400">Owner:</span>
                              <span className="text-white">
                                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Minted:</span>
                              <span className="text-white">
                                {new Date(challenge.dateCompleted).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button
                      className="w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                      disabled
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Complete Challenge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-400" />
            Leaderboard
          </CardTitle>
          <CardDescription className="text-gray-300">
            See how you rank against other fitness enthusiasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">NFTs Earned</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">FIT Tokens</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Last Challenge</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 bg-purple-500/10">
                  <td className="px-4 py-3 text-sm text-white">1</td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center mr-2">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      CryptoFitness
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">12</td>
                  <td className="px-4 py-3 text-sm text-white">4,250</td>
                  <td className="px-4 py-3 text-sm text-white">Ultra Marathon</td>
                </tr>
                <tr className="border-b border-gray-800 bg-teal-500/10">
                  <td className="px-4 py-3 text-sm text-white">2</td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-400 flex items-center justify-center mr-2">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                      FitnessFanatic
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">10</td>
                  <td className="px-4 py-3 text-sm text-white">3,780</td>
                  <td className="px-4 py-3 text-sm text-white">Strength Sovereign</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3 text-sm text-white">3</td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 flex items-center justify-center mr-2">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      BlockchainRunner
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">8</td>
                  <td className="px-4 py-3 text-sm text-white">2,950</td>
                  <td className="px-4 py-3 text-sm text-white">Marathon Master</td>
                </tr>
                <tr className="border-b border-gray-800 bg-purple-500/10">
                  <td className="px-4 py-3 text-sm text-white">4</td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      You
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">5</td>
                  <td className="px-4 py-3 text-sm text-white">1,850</td>
                  <td className="px-4 py-3 text-sm text-white">30-Day Streak</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3 text-sm text-white">5</td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      FitChampion
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">4</td>
                  <td className="px-4 py-3 text-sm text-white">1,620</td>
                  <td className="px-4 py-3 text-sm text-white">HIIT Hero</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing component
const User = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

