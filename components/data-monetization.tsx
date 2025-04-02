"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Shield, Lock, Unlock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data partners
const dataPartners = [
  {
    id: 1,
    name: "FitResearch Labs",
    description: "Academic research on fitness patterns",
    paymentPerMonth: 15,
    dataTypes: ["Steps", "Heart Rate", "Sleep"],
  },
  {
    id: 2,
    name: "HealthInsure Co.",
    description: "Insurance premium discounts for active users",
    paymentPerMonth: 25,
    dataTypes: ["Workouts", "Steps", "Heart Rate"],
  },
  {
    id: 3,
    name: "NutriTech Inc.",
    description: "Personalized nutrition recommendations",
    paymentPerMonth: 10,
    dataTypes: ["Weight", "Body Metrics", "Activity Level"],
  },
  {
    id: 4,
    name: "SportGear Brand",
    description: "Product development and recommendations",
    paymentPerMonth: 20,
    dataTypes: ["Workout Types", "Performance", "Goals"],
  },
]

const DataMonetization = () => {
  const [dataSharing, setDataSharing] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: true,
    4: false,
  })

  const handleToggleSharing = (id: number) => {
    setDataSharing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const totalEarnings = Object.entries(dataSharing).reduce((total, [id, isSharing]) => {
    if (isSharing) {
      const partner = dataPartners.find((p) => p.id === Number.parseInt(id))
      return total + (partner?.paymentPerMonth || 0)
    }
    return total
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Data Monetization</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-electric-blue/10 p-2 text-electric-blue hover:bg-electric-blue/20">
                <Info className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-space border-electric-blue">
              <p>
                Control which partners can access your fitness data. You earn tokens for each partner you allow to use
                your data.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="cyber-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-medium text-white">
            <DollarSign className="mr-2 h-5 w-5 text-green-400" />
            Current Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Monthly earnings</p>
              <h3 className="text-3xl font-bold text-white">${totalEarnings.toFixed(2)}</h3>
              <p className="mt-1 text-xs text-gray-400">Next payout: April 30, 2025</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-400/10">
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {dataPartners.map((partner) => (
          <motion.div key={partner.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className={`cyber-card ${dataSharing[partner.id] ? "border-green-400/50" : "border-red-400/30"}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{partner.name}</h3>
                  <div className="flex items-center">
                    <Switch
                      id={`partner-${partner.id}`}
                      checked={dataSharing[partner.id]}
                      onCheckedChange={() => handleToggleSharing(partner.id)}
                      className="data-switch"
                    />
                    <Label htmlFor={`partner-${partner.id}`} className="ml-2 text-sm font-medium">
                      {dataSharing[partner.id] ? (
                        <span className="flex items-center text-green-400">
                          <Unlock className="mr-1 h-3 w-3" /> Sharing
                        </span>
                      ) : (
                        <span className="flex items-center text-red-400">
                          <Lock className="mr-1 h-3 w-3" /> Not Sharing
                        </span>
                      )}
                    </Label>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-400">{partner.description}</p>

                <div className="mb-3 flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-electric-blue" />
                  <span className="text-xs text-gray-400">Data types requested:</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {partner.dataTypes.map((type) => (
                    <span key={type} className="rounded-full bg-electric-blue/10 px-2 py-1 text-xs text-electric-blue">
                      {type}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
                  <span className="text-sm text-gray-400">Monthly payment:</span>
                  <span className="text-lg font-semibold text-white">${partner.paymentPerMonth.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .cyber-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        :global(.data-switch[data-state="checked"]) {
          background-color: rgba(74, 222, 128, 0.9) !important;
        }
        
        :global(.data-switch[data-state="unchecked"]) {
          background-color: rgba(248, 113, 113, 0.5) !important;
        }
      `}</style>
    </div>
  )
}

export default DataMonetization

