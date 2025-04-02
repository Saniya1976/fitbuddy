"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Medal, Trophy, Star, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Flame = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>
)

const Activity = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
)

// Mock NFT achievement data
const mockAchievements = [
  {
    id: 1,
    name: "Marathon Master",
    description: "Completed your first virtual marathon",
    image: <Trophy className="h-12 w-12 text-yellow-400" />,
    rarity: "Rare",
    earned: true,
    date: "2023-12-15",
  },
  {
    id: 2,
    name: "Early Riser",
    description: "Completed 10 workouts before 7 AM",
    image: <Star className="h-12 w-12 text-purple-400" />,
    rarity: "Uncommon",
    earned: true,
    date: "2024-01-22",
  },
  {
    id: 3,
    name: "Consistency King",
    description: "Worked out for 30 consecutive days",
    image: <Award className="h-12 w-12 text-electric-blue" />,
    rarity: "Epic",
    earned: true,
    date: "2024-02-10",
  },
  {
    id: 4,
    name: "Strength Sovereign",
    description: "Lifted 1000kg total in a single workout",
    image: <Medal className="h-12 w-12 text-orange-400" />,
    rarity: "Legendary",
    earned: false,
    progress: 75,
  },
  {
    id: 5,
    name: "Cardio Champion",
    description: "Burned 10,000 calories in a week",
    image: <Flame className="h-12 w-12 text-red-400" />,
    rarity: "Rare",
    earned: false,
    progress: 60,
  },
  {
    id: 6,
    name: "Flexibility Fanatic",
    description: "Completed 20 yoga sessions",
    image: <Activity className="h-12 w-12 text-green-400" />,
    rarity: "Uncommon",
    earned: false,
    progress: 40,
  },
]

const NftAchievements = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  const handleFlip = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">NFT Achievements</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-electric-blue/10 p-2 text-electric-blue hover:bg-electric-blue/20">
                <Info className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-space border-electric-blue">
              <p>
                Complete fitness challenges to earn unique NFT achievements. Each NFT is stored on-chain and can be
                viewed in your wallet.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockAchievements.map((achievement) => (
          <motion.div key={achievement.id} whileHover={{ scale: 1.02 }} className="perspective-500">
            <div
              className={`card-container ${flippedCard === achievement.id ? "flipped" : ""}`}
              onClick={() => handleFlip(achievement.id)}
            >
              <div className="card-face card-front">
                <Card className={`nft-card ${achievement.rarity.toLowerCase()}`}>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-space p-4">
                      {achievement.image}
                    </div>
                    <h3 className="mb-1 text-center text-lg font-semibold text-white">{achievement.name}</h3>
                    <p className="mb-3 text-center text-sm text-gray-400">{achievement.description}</p>
                    <div className={`rarity-badge ${achievement.rarity.toLowerCase()}`}>{achievement.rarity}</div>

                    {achievement.earned ? (
                      <div className="mt-3 text-sm text-green-400">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="mt-3 w-full">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-electric-blue">{achievement.progress}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                          <div className="h-full bg-electric-blue" style={{ width: `${achievement.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="card-face card-back">
                <Card className={`nft-card ${achievement.rarity.toLowerCase()}`}>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <h3 className="mb-4 text-center text-lg font-semibold text-white">{achievement.name}</h3>
                    <div className="mb-4 text-center text-sm text-gray-300">
                      <p className="mb-2">Token ID: #{achievement.id.toString().padStart(4, "0")}</p>
                      <p className="mb-2">Rarity: {achievement.rarity}</p>
                      {achievement.earned && <p>Minted: {new Date(achievement.date).toLocaleDateString()}</p>}
                    </div>
                    <div className="mt-2 text-center text-xs text-gray-400">
                      <p>Click to flip card</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .perspective-500 {
          perspective: 1000px;
        }
        
        .card-container {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .card-container.flipped {
          transform: rotateY(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        
        .card-back {
          transform: rotateY(180deg);
        }
        
        .nft-card {
          height: 100%;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .nft-card.rare {
          border-color: rgba(255, 215, 0, 0.5);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }
        
        .nft-card.uncommon {
          border-color: rgba(147, 112, 219, 0.5);
          box-shadow: 0 0 15px rgba(147, 112, 219, 0.2);
        }
        
        .nft-card.epic {
          border-color: rgba(0, 191, 255, 0.5);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
        }
        
        .nft-card.legendary {
          border-color: rgba(255, 140, 0, 0.5);
          box-shadow: 0 0 15px rgba(255, 140, 0, 0.3);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%);
        }
        
        .rarity-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .rarity-badge.rare {
          background-color: rgba(255, 215, 0, 0.2);
          color: #FFD700;
        }
        
        .rarity-badge.uncommon {
          background-color: rgba(147, 112, 219, 0.2);
          color: #9370DB;
        }
        
        .rarity-badge.epic {
          background-color: rgba(0, 191, 255, 0.2);
          color: #00BFFF;
        }
        
        .rarity-badge.legendary {
          background-color: rgba(255, 140, 0, 0.2);
          color: #FF8C00;
        }
      `}</style>
    </div>
  )
}

export default NftAchievements

