"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dumbbell, Heart, Footprints, Zap, Search, ChevronRight, Clock, Flame } from "lucide-react"

// Exercise data by body part
const exercisesByBodyPart = {
  chest: [
    {
      id: 1,
      name: "Bench Press",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscles: ["Chest", "Triceps", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.5, // per minute
    },
    {
      id: 2,
      name: "Push-Ups",
      equipment: "Bodyweight",
      difficulty: "Beginner",
      muscles: ["Chest", "Triceps", "Core"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.0,
    },
    {
      id: 3,
      name: "Dumbbell Flyes",
      equipment: "Dumbbells",
      difficulty: "Beginner",
      muscles: ["Chest", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.5,
    },
    {
      id: 4,
      name: "Cable Crossover",
      equipment: "Cable Machine",
      difficulty: "Intermediate",
      muscles: ["Chest", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.5,
    },
  ],
  back: [
    {
      id: 5,
      name: "Pull-Ups",
      equipment: "Pull-Up Bar",
      difficulty: "Intermediate",
      muscles: ["Back", "Biceps", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.0,
    },
    {
      id: 6,
      name: "Bent-Over Rows",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscles: ["Back", "Biceps", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.0,
    },
    {
      id: 7,
      name: "Lat Pulldowns",
      equipment: "Cable Machine",
      difficulty: "Beginner",
      muscles: ["Back", "Biceps"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.0,
    },
    {
      id: 8,
      name: "Deadlift",
      equipment: "Barbell",
      difficulty: "Advanced",
      muscles: ["Back", "Hamstrings", "Glutes", "Core"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 9.5,
    },
  ],
  legs: [
    {
      id: 9,
      name: "Squats",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 9.0,
    },
    {
      id: 10,
      name: "Lunges",
      equipment: "Bodyweight/Dumbbells",
      difficulty: "Beginner",
      muscles: ["Quadriceps", "Glutes", "Hamstrings"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.5,
    },
    {
      id: 11,
      name: "Leg Press",
      equipment: "Machine",
      difficulty: "Beginner",
      muscles: ["Quadriceps", "Glutes", "Hamstrings"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.0,
    },
    {
      id: 12,
      name: "Romanian Deadlift",
      equipment: "Barbell",
      difficulty: "Intermediate",
      muscles: ["Hamstrings", "Glutes", "Lower Back"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.5,
    },
  ],
  arms: [
    {
      id: 13,
      name: "Bicep Curls",
      equipment: "Dumbbells",
      difficulty: "Beginner",
      muscles: ["Biceps"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.0,
    },
    {
      id: 14,
      name: "Tricep Dips",
      equipment: "Parallel Bars/Bench",
      difficulty: "Intermediate",
      muscles: ["Triceps", "Chest", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.0,
    },
    {
      id: 15,
      name: "Hammer Curls",
      equipment: "Dumbbells",
      difficulty: "Beginner",
      muscles: ["Biceps", "Forearms"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.0,
    },
    {
      id: 16,
      name: "Skull Crushers",
      equipment: "Barbell/EZ Bar",
      difficulty: "Intermediate",
      muscles: ["Triceps"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.5,
    },
  ],
  shoulders: [
    {
      id: 17,
      name: "Overhead Press",
      equipment: "Barbell/Dumbbells",
      difficulty: "Intermediate",
      muscles: ["Shoulders", "Triceps"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.5,
    },
    {
      id: 18,
      name: "Lateral Raises",
      equipment: "Dumbbells",
      difficulty: "Beginner",
      muscles: ["Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.0,
    },
    {
      id: 19,
      name: "Face Pulls",
      equipment: "Cable Machine",
      difficulty: "Beginner",
      muscles: ["Rear Deltoids", "Upper Back"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.0,
    },
    {
      id: 20,
      name: "Upright Rows",
      equipment: "Barbell/Dumbbells",
      difficulty: "Intermediate",
      muscles: ["Shoulders", "Traps"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.0,
    },
  ],
  core: [
    {
      id: 21,
      name: "Plank",
      equipment: "Bodyweight",
      difficulty: "Beginner",
      muscles: ["Core", "Shoulders"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 5.0,
    },
    {
      id: 22,
      name: "Russian Twists",
      equipment: "Bodyweight/Medicine Ball",
      difficulty: "Beginner",
      muscles: ["Obliques", "Core"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 6.0,
    },
    {
      id: 23,
      name: "Hanging Leg Raises",
      equipment: "Pull-Up Bar",
      difficulty: "Intermediate",
      muscles: ["Lower Abs", "Hip Flexors"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 7.0,
    },
    {
      id: 24,
      name: "Ab Rollout",
      equipment: "Ab Wheel",
      difficulty: "Advanced",
      muscles: ["Core", "Shoulders", "Lats"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.0,
    },
  ],
  cardio: [
    {
      id: 25,
      name: "Running",
      equipment: "None/Treadmill",
      difficulty: "Beginner to Advanced",
      muscles: ["Full Body", "Legs", "Cardiovascular System"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 10.0,
    },
    {
      id: 26,
      name: "Cycling",
      equipment: "Bicycle/Stationary Bike",
      difficulty: "Beginner to Advanced",
      muscles: ["Legs", "Cardiovascular System"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 8.0,
    },
    {
      id: 27,
      name: "Jump Rope",
      equipment: "Jump Rope",
      difficulty: "Beginner to Advanced",
      muscles: ["Full Body", "Calves", "Cardiovascular System"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 12.0,
    },
    {
      id: 28,
      name: "HIIT Circuit",
      equipment: "Varies",
      difficulty: "Intermediate to Advanced",
      muscles: ["Full Body", "Cardiovascular System"],
      image: "/placeholder.svg?height=200&width=300",
      calories: 12.0,
    },
  ],
}

export default function ExerciseSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBodyPart, setSelectedBodyPart] = useState("chest")

  // Filter exercises based on search query
  const filteredExercises = exercisesByBodyPart[selectedBodyPart as keyof typeof exercisesByBodyPart].filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscles.some((muscle) => muscle.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <Card className="bg-blue-950/30 backdrop-blur-sm border-blue-900/40">
        <CardHeader>
          <CardTitle className="text-white">Exercise Library</CardTitle>
          <CardDescription className="text-blue-300">
            Browse exercises by body part and find the perfect workout for your goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <Input
                  placeholder="Search exercises..."
                  className="pl-9 bg-blue-900/20 border-blue-800/40 text-white placeholder:text-blue-400/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Create Workout</Button>
            </div>

            <Tabs defaultValue="chest" value={selectedBodyPart} onValueChange={setSelectedBodyPart}>
              <TabsList className="w-full flex overflow-x-auto pb-2 bg-transparent h-auto">
                <TabsTrigger
                  value="chest"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Chest
                </TabsTrigger>
                <TabsTrigger
                  value="back"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Back
                </TabsTrigger>
                <TabsTrigger
                  value="legs"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Footprints className="h-4 w-4 mr-2" />
                  Legs
                </TabsTrigger>
                <TabsTrigger
                  value="arms"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Arms
                </TabsTrigger>
                <TabsTrigger
                  value="shoulders"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Shoulders
                </TabsTrigger>
                <TabsTrigger
                  value="core"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Core
                </TabsTrigger>
                <TabsTrigger
                  value="cardio"
                  className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Cardio
                </TabsTrigger>
              </TabsList>

              {/* Exercise grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="group relative overflow-hidden rounded-lg bg-blue-900/20 border border-blue-800/40 hover:border-blue-600/60 transition-colors"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={exercise.image || "/placeholder.svg"}
                        alt={exercise.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent" />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white">{exercise.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-blue-300">
                        <Dumbbell className="mr-1 h-3.5 w-3.5" />
                        {exercise.equipment}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {exercise.muscles.slice(0, 3).map((muscle, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-blue-800/30 px-2 py-0.5 text-xs text-blue-300"
                          >
                            {muscle}
                          </span>
                        ))}
                        {exercise.muscles.length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-blue-800/30 px-2 py-0.5 text-xs text-blue-300">
                            +{exercise.muscles.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-sm text-blue-300">
                          <Flame className="mr-1 h-3.5 w-3.5 text-orange-400" />
                          {exercise.calories} cal/min
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-400">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-950/30 backdrop-blur-sm border-blue-900/40">
        <CardHeader>
          <CardTitle className="text-white">Recommended Workouts</CardTitle>
          <CardDescription className="text-blue-300">
            Personalized workout plans based on your goals and fitness level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-800/40">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Upper Body Power</h3>
                <p className="mt-1 text-sm text-blue-300">Build strength in your chest, back, and arms</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center text-sm text-blue-300">
                    <Clock className="mr-1 h-4 w-4" />
                    45 min
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Flame className="mr-1 h-4 w-4 text-orange-400" />
                    420 cal
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Dumbbell className="mr-1 h-4 w-4" />
                    Intermediate
                  </div>
                </div>

                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Start Workout</Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-blue-800/40">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">HIIT Cardio Blast</h3>
                <p className="mt-1 text-sm text-blue-300">Intense intervals to maximize calorie burn</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center text-sm text-blue-300">
                    <Clock className="mr-1 h-4 w-4" />
                    30 min
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Flame className="mr-1 h-4 w-4 text-orange-400" />
                    380 cal
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Zap className="mr-1 h-4 w-4" />
                    Advanced
                  </div>
                </div>

                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Start Workout</Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-blue-800/40">
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">Lower Body Focus</h3>
                <p className="mt-1 text-sm text-blue-300">Build strength and power in your legs</p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center text-sm text-blue-300">
                    <Clock className="mr-1 h-4 w-4" />
                    50 min
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Flame className="mr-1 h-4 w-4 text-orange-400" />
                    450 cal
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Dumbbell className="mr-1 h-4 w-4" />
                    Intermediate
                  </div>
                </div>

                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Start Workout</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

