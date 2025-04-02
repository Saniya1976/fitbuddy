"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FitnessStats from "@/components/fitness-stats"
import NftAchievements from "@/components/nft-achievements"
import DataMonetization from "@/components/data-monetization"
import SmartCoach from "@/components/smart-coach"
import ExerciseTracker from "@/components/exercise-tracker"
import DietPlanner from "@/components/diet-planner"

interface DashboardProps {
  walletAddress: string
  walletBalance: string
}

const Dashboard = ({ walletAddress, walletBalance }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("stats")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dashboard-container"
    >
      <header className="dashboard-header">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
            <span className="text-electric-blue">Cyber</span>Fit
          </h1>
          <p className="text-sm text-gray-400">
            Connected: {walletAddress} | Balance: {walletBalance} ETH
          </p>
        </div>
      </header>

      <Tabs defaultValue="stats" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="custom-tabs-list">
          <TabsTrigger value="stats" className="custom-tab">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="exercise" className="custom-tab">
            Exercise
          </TabsTrigger>
          <TabsTrigger value="diet" className="custom-tab">
            Diet & Nutrition
          </TabsTrigger>
          <TabsTrigger value="nfts" className="custom-tab">
            NFT Achievements
          </TabsTrigger>
          <TabsTrigger value="data" className="custom-tab">
            Data Monetization
          </TabsTrigger>
          <TabsTrigger value="coach" className="custom-tab">
            AI Smart Coach
          </TabsTrigger>
        </TabsList>

        <div className="tab-content-wrapper">
          <TabsContent value="stats" className="custom-tab-content">
            <FitnessStats />
          </TabsContent>

          <TabsContent value="exercise" className="custom-tab-content">
            <ExerciseTracker />
          </TabsContent>

          <TabsContent value="diet" className="custom-tab-content">
            <DietPlanner />
          </TabsContent>

          <TabsContent value="nfts" className="custom-tab-content">
            <NftAchievements />
          </TabsContent>

          <TabsContent value="data" className="custom-tab-content">
            <DataMonetization />
          </TabsContent>

          <TabsContent value="coach" className="custom-tab-content">
            <SmartCoach />
          </TabsContent>
        </div>
      </Tabs>

      <style jsx>{`
        .dashboard-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 191, 255, 0.2);
        }
        
        .tab-content-wrapper {
          margin-top: 1.5rem;
        }
        
        :global(.custom-tabs-list) {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 8px;
          padding: 4px;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        :global(.custom-tabs-list::-webkit-scrollbar) {
          display: none;
        }
        
        :global(.custom-tab) {
          color: white;
          border-radius: 6px;
          font-weight: 500;
        }
        
        :global(.custom-tab[data-state="active"]) {
          background: rgba(0, 191, 255, 0.2);
          box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
          color: var(--electric-blue);
        }
        
        :global(.custom-tab-content) {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.1);
        }
      `}</style>
    </motion.div>
  )
}

export default Dashboard

