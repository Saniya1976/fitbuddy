"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Play, Clock, Flame, Plus, ChevronDown, Info, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Custom icons
const HeartPulse = ({ className }: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.06"></path>
  </svg>
)

const Yoga = ({ className }: { className?: string }) => (
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
    <path d="M12 2a5 5 0 0 0-5 5c0 2 2 3 3 4.5 1 1.5 1 3 1 4.5h2c0-1.5 0-3 1-4.5 1-1.5 3-2.5 3-4.5a5 5 0 0 0-5-5Z"></path>
    <path d="m9 20 3-6 3 6"></path>
    <path d="m6 12 6 6 6-6"></path>
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
)

const UserStanding = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="5" r="3"></circle>
    <path d="m9 18 3-2.25 3 2.25"></path>
    <path d="M12 12v6"></path>
    <path d="M6 16.5a9 9 0 0 1 12 0"></path>
  </svg>
)

// Mock exercise categories
const exerciseCategories = [
  {
    id: "strength",
    name: "Strength Training",
    icon: <Dumbbell className="h-5 w-5" />,
    color: "#00BFFF",
  },
  {
    id: "cardio",
    name: "Cardio",
    icon: <HeartPulse className="h-5 w-5" />,
    color: "#FF4500",
  },
  {
    id: "flexibility",
    name: "Flexibility",
    icon: <Yoga className="h-5 w-5" />,
    color: "#9370DB",
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: <Zap className="h-5 w-5" />,
    color: "#FFD700",
  },
  {
    id: "calisthenics",
    name: "Calisthenics",
    icon: <UserStanding className="h-5 w-5" />,
    color: "#32CD32",
  },
]

// Mock exercises
const mockExercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    category: "strength",
    difficulty: "intermediate",
    muscles: ["chest", "triceps", "shoulders"],
    equipment: ["barbell", "bench"],
    calories: 8.5, // per minute
    description:
      "The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps.",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Unrack the barbell and lower it to your mid-chest.",
      "Press the barbell back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    tips: [
      "Keep your wrists straight and elbows at a 45-degree angle.",
      "Maintain a slight arch in your lower back.",
      "Keep your feet flat on the floor for stability.",
    ],
    variations: ["Incline Bench Press", "Decline Bench Press", "Close-Grip Bench Press"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Squat",
    category: "strength",
    difficulty: "intermediate",
    muscles: ["quadriceps", "hamstrings", "glutes", "core"],
    equipment: ["barbell", "squat rack"],
    calories: 9.0, // per minute
    description: "The squat is a compound exercise that builds strength and muscle in the lower body and core.",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Place the barbell on your upper back, resting on your trapezius muscles.",
      "Bend your knees and hips to lower your body.",
      "Lower until your thighs are parallel to the ground or slightly below.",
      "Push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    tips: [
      "Keep your chest up and back straight.",
      "Push your knees outward as you descend.",
      "Keep your weight on your heels and mid-foot.",
    ],
    variations: ["Front Squat", "Goblet Squat", "Bulgarian Split Squat"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Deadlift",
    category: "strength",
    difficulty: "advanced",
    muscles: ["hamstrings", "glutes", "lower back", "traps"],
    equipment: ["barbell"],
    calories: 9.5, // per minute
    description:
      "The deadlift is a compound exercise that builds strength and muscle throughout the entire body, with emphasis on the posterior chain.",
    instructions: [
      "Stand with your feet hip-width apart, with the barbell over your mid-foot.",
      "Bend at the hips and knees to grip the barbell with hands shoulder-width apart.",
      "Keep your back straight and chest up.",
      "Lift the barbell by extending your hips and knees.",
      "Stand up straight with the barbell against your thighs.",
      "Lower the barbell back to the ground with control.",
      "Repeat for the desired number of repetitions.",
    ],
    tips: [
      "Keep the barbell close to your body throughout the movement.",
      "Engage your lats before lifting.",
      "Push through your heels.",
    ],
    variations: ["Sumo Deadlift", "Romanian Deadlift", "Trap Bar Deadlift"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Pull-Up",
    category: "strength",
    difficulty: "intermediate",
    muscles: ["lats", "biceps", "upper back"],
    equipment: ["pull-up bar"],
    calories: 8.0, // per minute
    description: "The pull-up is a compound exercise that builds strength and muscle in the back and arms.",
    instructions: [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width apart.",
      "Pull your body up until your chin is over the bar.",
      "Lower your body back to the starting position with control.",
      "Repeat for the desired number of repetitions.",
    ],
    tips: [
      "Engage your core throughout the movement.",
      "Avoid swinging or kipping.",
      "Focus on pulling with your back muscles, not just your arms.",
    ],
    variations: ["Chin-Up", "Wide-Grip Pull-Up", "Commando Pull-Up"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    name: "Running",
    category: "cardio",
    difficulty: "beginner",
    muscles: ["quadriceps", "hamstrings", "calves", "core"],
    equipment: ["running shoes"],
    calories: 10.0, // per minute
    description:
      "Running is a cardiovascular exercise that improves endurance, burns calories, and strengthens the lower body.",
    instructions: [
      "Start with a 5-minute walking warm-up.",
      "Gradually increase your pace to a comfortable running speed.",
      "Maintain good posture with a slight forward lean.",
      "Land midfoot with each step, directly under your body.",
      "Swing your arms naturally at your sides.",
      "Cool down with a 5-minute walk at the end.",
    ],
    tips: [
      "Breathe rhythmically, matching your breathing to your steps.",
      "Start with intervals of running and walking if you're a beginner.",
      "Increase distance or intensity gradually to avoid injury.",
    ],
    variations: ["Interval Running", "Hill Running", "Trail Running"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    name: "Cycling",
    category: "cardio",
    difficulty: "beginner",
    muscles: ["quadriceps", "hamstrings", "calves", "glutes"],
    equipment: ["bicycle", "stationary bike"],
    calories: 8.0, // per minute
    description:
      "Cycling is a low-impact cardiovascular exercise that improves endurance and strengthens the lower body.",
    instructions: [
      "Adjust the seat height so your leg is slightly bent at the bottom of the pedal stroke.",
      "Start pedaling at a comfortable pace.",
      "Maintain good posture with a slight forward lean.",
      "Keep a light grip on the handlebars.",
      "Pedal in smooth, circular motions.",
      "Cool down with 5 minutes of easy pedaling at the end.",
    ],
    tips: [
      "Focus on pushing and pulling through the entire pedal stroke.",
      "Keep your knees aligned with your feet.",
      "Vary your intensity with intervals for a more effective workout.",
    ],
    variations: ["Road Cycling", "Mountain Biking", "Indoor Cycling"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    name: "Yoga Flow",
    category: "flexibility",
    difficulty: "beginner",
    muscles: ["full body"],
    equipment: ["yoga mat"],
    calories: 5.0, // per minute
    description: "Yoga flow is a sequence of poses that improves flexibility, balance, and mental focus.",
    instructions: [
      "Start in a comfortable seated position with eyes closed.",
      "Focus on your breath for a few minutes.",
      "Move through a sequence of poses, flowing with your breath.",
      "Hold each pose for 3-5 breaths.",
      "End in Savasana (corpse pose) for 5-10 minutes of relaxation.",
    ],
    tips: [
      "Focus on your breath throughout the practice.",
      "Move at your own pace and modify poses as needed.",
      "Use props like blocks or straps if needed.",
    ],
    variations: ["Vinyasa Yoga", "Hatha Yoga", "Power Yoga"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    name: "HIIT Circuit",
    category: "hiit",
    difficulty: "advanced",
    muscles: ["full body"],
    equipment: ["bodyweight", "timer"],
    calories: 12.0, // per minute
    description:
      "High-Intensity Interval Training (HIIT) alternates between intense exercise and rest periods for an efficient, effective workout.",
    instructions: [
      "Warm up for 5 minutes with light cardio and dynamic stretching.",
      "Perform each exercise at maximum effort for 30-45 seconds.",
      "Rest for 15-30 seconds between exercises.",
      "Complete 3-4 rounds of the circuit.",
      "Cool down with 5 minutes of light cardio and static stretching.",
    ],
    tips: [
      "Focus on form even when fatigued.",
      "Adjust the work-to-rest ratio based on your fitness level.",
      "Modify exercises as needed to match your ability.",
    ],
    variations: [
      "Tabata (20 seconds on, 10 seconds off)",
      "EMOM (Every Minute On the Minute)",
      "AMRAP (As Many Rounds As Possible)",
    ],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 9,
    name: "Push-Up",
    category: "calisthenics",
    difficulty: "beginner",
    muscles: ["chest", "triceps", "shoulders", "core"],
    equipment: ["bodyweight"],
    calories: 7.0, // per minute
    description: "The push-up is a bodyweight exercise that builds strength and muscle in the upper body and core.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart.",
      "Lower your body until your chest nearly touches the floor.",
      "Keep your elbows at a 45-degree angle to your body.",
      "Push back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    tips: [
      "Keep your body in a straight line from head to heels.",
      "Engage your core throughout the movement.",
      "Breathe in as you lower, out as you push up.",
    ],
    variations: ["Incline Push-Up", "Decline Push-Up", "Diamond Push-Up"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 10,
    name: "Plank",
    category: "calisthenics",
    difficulty: "beginner",
    muscles: ["core", "shoulders", "back"],
    equipment: ["bodyweight"],
    calories: 5.0, // per minute
    description: "The plank is an isometric core exercise that improves stability, posture, and overall strength.",
    instructions: [
      "Start in a push-up position, then lower onto your forearms.",
      "Keep your elbows directly beneath your shoulders.",
      "Maintain a straight line from head to heels.",
      "Engage your core and hold the position.",
      "Hold for the desired amount of time.",
    ],
    tips: [
      "Don't let your hips sag or pike up.",
      "Keep your neck neutral by looking at the floor.",
      "Breathe normally throughout the hold.",
    ],
    variations: ["Side Plank", "Plank with Shoulder Taps", "Plank with Leg Lifts"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

// Recent workouts
const recentWorkouts = [
  {
    id: 1,
    date: "2025-04-01",
    name: "Upper Body Strength",
    duration: 45,
    calories: 320,
    exercises: ["Bench Press", "Pull-Up", "Shoulder Press", "Tricep Extension"],
  },
  {
    id: 2,
    date: "2025-03-30",
    name: "HIIT Cardio",
    duration: 30,
    calories: 380,
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
  },
  {
    id: 3,
    date: "2025-03-28",
    name: "Lower Body Strength",
    duration: 50,
    calories: 410,
    exercises: ["Squat", "Deadlift", "Lunges", "Calf Raises"],
  },
]

const ExerciseTracker = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null)
  const [openExerciseDialog, setOpenExerciseDialog] = useState(false)

  const filteredExercises = mockExercises.filter((exercise) => {
    const matchesCategory = selectedCategory ? exercise.category === selectedCategory : true
    const matchesSearch = searchQuery
      ? exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscles.some((muscle) => muscle.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    return matchesCategory && matchesSearch
  })

  const handleExerciseClick = (exercise: any) => {
    setSelectedExercise(exercise)
    setOpenExerciseDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Exercise Library</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-electric-blue/10 p-2 text-electric-blue hover:bg-electric-blue/20">
                <Info className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-space border-electric-blue">
              <p>
                Browse exercises, learn proper form, and track your workouts. All data is stored on-chain for your
                fitness journey.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-medium text-white">
              <Clock className="mr-2 h-5 w-5 text-electric-blue" />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3 hover:bg-gray-800/80"
                >
                  <div>
                    <h3 className="font-medium text-white">{workout.name}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(workout.date).toLocaleDateString()} • {workout.duration} min
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-electric-blue">
                      <Flame className="mr-1 h-4 w-4" />
                      <span>{workout.calories} kcal</span>
                    </div>
                    <p className="text-xs text-gray-400">{workout.exercises.length} exercises</p>
                  </div>
                </div>
              ))}

              <Button className="mt-2 w-full bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30">
                <Plus className="mr-2 h-4 w-4" /> Log New Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-medium text-white">
              <Dumbbell className="mr-2 h-5 w-5 text-electric-blue" />
              Weekly Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-800/50 p-3">
                <p className="text-sm text-gray-400">Workouts</p>
                <h3 className="text-2xl font-semibold text-white">5</h3>
                <p className="text-xs text-green-400">+2 from last week</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-3">
                <p className="text-sm text-gray-400">Total Time</p>
                <h3 className="text-2xl font-semibold text-white">3h 45m</h3>
                <p className="text-xs text-green-400">+30m from last week</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-3">
                <p className="text-sm text-gray-400">Calories</p>
                <h3 className="text-2xl font-semibold text-white">2,450</h3>
                <p className="text-xs text-green-400">+320 from last week</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-3">
                <p className="text-sm text-gray-400">Strength Score</p>
                <h3 className="text-2xl font-semibold text-white">785</h3>
                <p className="text-xs text-green-400">+45 from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search exercises..."
              className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 ${!selectedCategory ? "border-electric-blue text-electric-blue" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>

            {exerciseCategories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={`rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 ${selectedCategory === category.id ? "border-electric-blue text-electric-blue" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-1" style={{ color: category.color }}>
                  {category.icon}
                </span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleExerciseClick(exercise)}
            >
              <Card className="cyber-card cursor-pointer overflow-hidden">
                <div className="relative h-40 w-full bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={exercise.image || "/placeholder.svg"}
                      alt={exercise.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
                      <div className="flex items-center text-sm text-gray-300">
                        <span
                          className="mr-2 h-2 w-2 rounded-full"
                          style={{ backgroundColor: exerciseCategories.find((c) => c.id === exercise.category)?.color }}
                        />
                        {exerciseCategories.find((c) => c.id === exercise.category)?.name}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-electric-blue/20 p-1.5">
                      <Play className="h-4 w-4 text-electric-blue" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Flame className="mr-1 h-4 w-4 text-orange-400" />
                      {exercise.calories} cal/min
                    </div>
                    <div className="flex items-center gap-1">
                      {exercise.muscles.slice(0, 2).map((muscle, idx) => (
                        <span key={idx} className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                          {muscle}
                        </span>
                      ))}
                      {exercise.muscles.length > 2 && (
                        <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                          +{exercise.muscles.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={openExerciseDialog} onOpenChange={setOpenExerciseDialog}>
        <DialogContent className="cyber-dialog max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{selectedExercise?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">{selectedExercise?.description}</DialogDescription>
          </DialogHeader>

          {selectedExercise && (
            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <img
                    src={selectedExercise.image || "/placeholder.svg"}
                    alt={selectedExercise.name}
                    className="h-64 w-full rounded-lg object-cover"
                  />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-800/50 p-3">
                      <p className="text-sm text-gray-400">Category</p>
                      <div className="flex items-center text-white">
                        <span
                          className="mr-2 h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: exerciseCategories.find((c) => c.id === selectedExercise.category)?.color,
                          }}
                        />
                        {exerciseCategories.find((c) => c.id === selectedExercise.category)?.name}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-800/50 p-3">
                      <p className="text-sm text-gray-400">Difficulty</p>
                      <p className="text-white capitalize">{selectedExercise.difficulty}</p>
                    </div>
                    <div className="rounded-lg bg-gray-800/50 p-3">
                      <p className="text-sm text-gray-400">Equipment</p>
                      <p className="text-white capitalize">{selectedExercise.equipment.join(", ")}</p>
                    </div>
                    <div className="rounded-lg bg-gray-800/50 p-3">
                      <p className="text-sm text-gray-400">Calories</p>
                      <p className="text-white">{selectedExercise.calories} cal/min</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Collapsible defaultOpen className="rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Instructions</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2">
                      <ol className="list-inside list-decimal space-y-2 text-gray-300">
                        {selectedExercise.instructions.map((instruction: string, idx: number) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ol>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Tips</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2">
                      <ul className="list-inside list-disc space-y-2 text-gray-300">
                        {selectedExercise.tips.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Variations</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2">
                      <ul className="list-inside list-disc space-y-2 text-gray-300">
                        {selectedExercise.variations.map((variation: string, idx: number) => (
                          <li key={idx}>{variation}</li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="rounded-lg border border-gray-700 bg-gray-800/30 p-3">
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Muscles Worked</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {selectedExercise.muscles.map((muscle: string, idx: number) => (
                          <span
                            key={idx}
                            className="rounded-full bg-electric-blue/10 px-3 py-1 text-sm text-electric-blue"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                  Add to Favorites
                </Button>
                <Button className="bg-electric-blue text-white hover:bg-electric-blue/80">Start Exercise</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .cyber-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .cyber-dialog {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 30px rgba(0, 191, 255, 0.2);
        }
      `}</style>
    </div>
  )
}

export default ExerciseTracker

