"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Flame, Footprints, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Mock data
const mockWeeklyData = [
  { day: "Mon", steps: 8432, calories: 420, workouts: 1 },
  { day: "Tue", steps: 10253, calories: 510, workouts: 2 },
  { day: "Wed", steps: 7845, calories: 380, workouts: 1 },
  { day: "Thu", steps: 9632, calories: 480, workouts: 1 },
  { day: "Fri", steps: 12458, calories: 620, workouts: 2 },
  { day: "Sat", steps: 6523, calories: 320, workouts: 0 },
  { day: "Sun", steps: 5421, calories: 270, workouts: 0 },
]

const FitnessStats = () => {
  const [stats, setStats] = useState({
    totalSteps: 0,
    totalCalories: 0,
    totalWorkouts: 0,
    weeklyAvgSteps: 0,
  })

  useEffect(() => {
    // Calculate stats from mock data
    const totalSteps = mockWeeklyData.reduce((sum, day) => sum + day.steps, 0)
    const totalCalories = mockWeeklyData.reduce((sum, day) => sum + day.calories, 0)
    const totalWorkouts = mockWeeklyData.reduce((sum, day) => sum + day.workouts, 0)
    const weeklyAvgSteps = Math.round(totalSteps / mockWeeklyData.length)

    setStats({
      totalSteps,
      totalCalories,
      totalWorkouts,
      weeklyAvgSteps,
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Footprints className="h-5 w-5" />}
          title="Total Steps"
          value={stats.totalSteps.toLocaleString()}
          trend="+12.5%"
          trendUp={true}
        />

        <StatCard
          icon={<Flame className="h-5 w-5" />}
          title="Calories Burned"
          value={stats.totalCalories.toLocaleString()}
          trend="+8.3%"
          trendUp={true}
        />

        <StatCard
          icon={<Activity className="h-5 w-5" />}
          title="Workouts"
          value={stats.totalWorkouts.toString()}
          trend="-5.2%"
          trendUp={false}
        />

        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          title="Avg. Daily Steps"
          value={stats.weeklyAvgSteps.toLocaleString()}
          trend="+3.7%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <Chart>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8" }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="border-electric-blue bg-space"
                      labelClassName="text-electric-blue"
                    />
                  }
                />
                <LineChart data={mockWeeklyData}>
                  <Line
                    dataKey="steps"
                    stroke="#00BFFF"
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: "#00BFFF" }}
                    dot={{ r: 4, fill: "#0A0E17", strokeWidth: 2 }}
                  />
                </LineChart>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">Calories Burned</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <Chart>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="border-electric-blue bg-space"
                      labelClassName="text-electric-blue"
                    />
                  }
                />
                <LineChart data={mockWeeklyData}>
                  <Line
                    dataKey="calories"
                    stroke="#FF4500"
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: "#FF4500" }}
                    dot={{ r: 4, fill: "#0A0E17", strokeWidth: 2 }}
                  />
                </LineChart>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        .cyber-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
  trendUp: boolean
}

const StatCard = ({ icon, title, value, trend, trendUp }: StatCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="cyber-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-electric-blue/10 p-2">{icon}</div>
            <div className={`flex items-center text-sm ${trendUp ? "text-green-400" : "text-red-400"}`}>
              {trend}
              <TrendingUp className={`ml-1 h-4 w-4 ${!trendUp && "rotate-180"}`} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FitnessStats

