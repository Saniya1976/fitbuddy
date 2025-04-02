"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Utensils, Apple, Salad, Coffee, Plus, ChevronDown, Info, Search, ArrowRight, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock meal plans
const mealPlans = {
  weightLoss: {
    name: "Weight Loss Plan",
    description:
      "A calorie-deficit meal plan designed to promote healthy weight loss while maintaining muscle mass and energy levels.",
    dailyCalories: 1800,
    macros: {
      protein: 40, // percentage
      carbs: 30,
      fat: 30,
    },
    meals: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 400,
        foods: [
          {
            name: "Greek Yogurt Bowl",
            portion: "1 bowl",
            calories: 300,
            protein: 20,
            carbs: 30,
            fat: 10,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "1 cup Greek yogurt (0% fat)",
              "1/2 cup mixed berries",
              "1 tbsp honey",
              "1 tbsp chia seeds",
              "1/4 cup low-sugar granola",
            ],
            instructions: "Mix all ingredients in a bowl and enjoy.",
          },
          {
            name: "Black Coffee",
            portion: "1 cup",
            calories: 5,
            protein: 0,
            carbs: 0,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Water",
            portion: "16 oz",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
        ],
      },
      {
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 150,
        foods: [
          {
            name: "Apple with Almond Butter",
            portion: "1 medium apple, 1 tbsp almond butter",
            calories: 150,
            protein: 4,
            carbs: 21,
            fat: 8,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 500,
        foods: [
          {
            name: "Grilled Chicken Salad",
            portion: "1 bowl",
            calories: 400,
            protein: 35,
            carbs: 20,
            fat: 15,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "4 oz grilled chicken breast",
              "2 cups mixed greens",
              "1/4 cup cherry tomatoes",
              "1/4 cucumber, sliced",
              "1/4 avocado",
              "2 tbsp balsamic vinaigrette",
            ],
            instructions: "Grill chicken, chop vegetables, and toss with dressing.",
          },
          {
            name: "Sparkling Water",
            portion: "12 oz",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
        ],
      },
      {
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 200,
        foods: [
          {
            name: "Protein Shake",
            portion: "1 shake",
            calories: 200,
            protein: 25,
            carbs: 10,
            fat: 5,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: ["1 scoop whey protein powder", "1 cup unsweetened almond milk", "1/2 banana", "Ice cubes"],
            instructions: "Blend all ingredients until smooth.",
          },
        ],
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 550,
        foods: [
          {
            name: "Baked Salmon with Roasted Vegetables",
            portion: "1 serving",
            calories: 450,
            protein: 35,
            carbs: 25,
            fat: 20,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "5 oz salmon fillet",
              "1 cup broccoli",
              "1 cup bell peppers",
              "1/2 cup cherry tomatoes",
              "1 tbsp olive oil",
              "Herbs and spices to taste",
            ],
            instructions:
              "Preheat oven to 400°F. Season salmon and vegetables with olive oil, herbs, and spices. Bake for 15-20 minutes until salmon is cooked through.",
          },
          {
            name: "Quinoa",
            portion: "1/2 cup cooked",
            calories: 100,
            protein: 4,
            carbs: 20,
            fat: 2,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
    ],
  },
  weightGain: {
    name: "Weight Gain Plan",
    description: "A calorie-surplus meal plan designed to promote muscle growth and healthy weight gain.",
    dailyCalories: 3000,
    macros: {
      protein: 30, // percentage
      carbs: 50,
      fat: 20,
    },
    meals: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 700,
        foods: [
          {
            name: "Protein Oatmeal",
            portion: "1 bowl",
            calories: 500,
            protein: 30,
            carbs: 60,
            fat: 15,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "1 cup rolled oats",
              "1 scoop protein powder",
              "1 banana, sliced",
              "2 tbsp peanut butter",
              "1 tbsp honey",
              "1 cup whole milk",
            ],
            instructions: "Cook oats with milk, stir in protein powder, top with banana, peanut butter, and honey.",
          },
          {
            name: "Orange Juice",
            portion: "8 oz",
            calories: 110,
            protein: 0,
            carbs: 26,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Hard-Boiled Eggs",
            portion: "2 eggs",
            calories: 140,
            protein: 12,
            carbs: 0,
            fat: 10,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        calories: 400,
        foods: [
          {
            name: "Trail Mix",
            portion: "1/2 cup",
            calories: 300,
            protein: 10,
            carbs: 30,
            fat: 20,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Greek Yogurt",
            portion: "1 cup",
            calories: 100,
            protein: 15,
            carbs: 5,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 800,
        foods: [
          {
            name: "Chicken and Rice Bowl",
            portion: "1 bowl",
            calories: 700,
            protein: 40,
            carbs: 80,
            fat: 20,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "6 oz grilled chicken breast",
              "1.5 cups cooked brown rice",
              "1 cup mixed vegetables (broccoli, carrots, bell peppers)",
              "1/2 avocado",
              "2 tbsp olive oil",
              "Seasonings to taste",
            ],
            instructions:
              "Cook rice according to package instructions. Grill chicken and sauté vegetables. Combine in a bowl with sliced avocado and drizzle with olive oil.",
          },
          {
            name: "Whole Milk",
            portion: "12 oz",
            calories: 220,
            protein: 8,
            carbs: 12,
            fat: 8,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 400,
        foods: [
          {
            name: "Protein Smoothie",
            portion: "16 oz",
            calories: 400,
            protein: 30,
            carbs: 45,
            fat: 10,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "2 scoops protein powder",
              "1 banana",
              "1 cup frozen berries",
              "1 tbsp peanut butter",
              "1 cup whole milk",
              "1/2 cup oats",
            ],
            instructions: "Blend all ingredients until smooth.",
          },
        ],
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 700,
        foods: [
          {
            name: "Steak with Sweet Potato and Vegetables",
            portion: "1 serving",
            calories: 600,
            protein: 40,
            carbs: 50,
            fat: 25,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "8 oz sirloin steak",
              "1 large sweet potato",
              "1 cup asparagus",
              "1 tbsp butter",
              "2 tbsp olive oil",
              "Herbs and spices to taste",
            ],
            instructions:
              "Season steak and cook to desired doneness. Bake sweet potato until soft. Sauté asparagus in butter. Serve together.",
          },
          {
            name: "Mixed Green Salad",
            portion: "1 cup",
            calories: 100,
            protein: 2,
            carbs: 10,
            fat: 6,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
    ],
  },
  maintenance: {
    name: "Maintenance Plan",
    description:
      "A balanced meal plan designed to maintain current weight while supporting overall health and fitness goals.",
    dailyCalories: 2200,
    macros: {
      protein: 30, // percentage
      carbs: 40,
      fat: 30,
    },
    meals: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        calories: 500,
        foods: [
          {
            name: "Avocado Toast with Eggs",
            portion: "1 serving",
            calories: 400,
            protein: 20,
            carbs: 30,
            fat: 20,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "2 slices whole grain bread",
              "1/2 avocado, mashed",
              "2 eggs, poached or fried",
              "Cherry tomatoes, sliced",
              "Salt, pepper, and red pepper flakes to taste",
            ],
            instructions: "Toast bread, spread mashed avocado, top with eggs and tomatoes. Season to taste.",
          },
          {
            name: "Coffee with Milk",
            portion: "1 cup",
            calories: 50,
            protein: 2,
            carbs: 3,
            fat: 2,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Orange",
            portion: "1 medium",
            calories: 60,
            protein: 1,
            carbs: 15,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Mid-Morning Snack",
        time: "10:30 AM",
        calories: 200,
        foods: [
          {
            name: "Greek Yogurt with Berries",
            portion: "1 cup yogurt, 1/2 cup berries",
            calories: 200,
            protein: 15,
            carbs: 20,
            fat: 5,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        calories: 600,
        foods: [
          {
            name: "Turkey and Vegetable Wrap",
            portion: "1 wrap",
            calories: 450,
            protein: 30,
            carbs: 40,
            fat: 15,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "1 whole wheat tortilla",
              "4 oz sliced turkey breast",
              "1/4 avocado, sliced",
              "1/2 cup mixed greens",
              "1/4 cup grated carrots",
              "2 tbsp hummus",
              "1 tbsp balsamic glaze",
            ],
            instructions:
              "Spread hummus on tortilla, layer with turkey and vegetables, drizzle with balsamic glaze, and wrap tightly.",
          },
          {
            name: "Apple",
            portion: "1 medium",
            calories: 80,
            protein: 0,
            carbs: 20,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Sparkling Water",
            portion: "12 oz",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          },
        ],
      },
      {
        name: "Afternoon Snack",
        time: "4:00 PM",
        calories: 250,
        foods: [
          {
            name: "Protein Bar",
            portion: "1 bar",
            calories: 200,
            protein: 15,
            carbs: 20,
            fat: 8,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Green Tea",
            portion: "1 cup",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
      {
        name: "Dinner",
        time: "7:00 PM",
        calories: 650,
        foods: [
          {
            name: "Grilled Salmon with Quinoa and Roasted Vegetables",
            portion: "1 serving",
            calories: 550,
            protein: 35,
            carbs: 40,
            fat: 25,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: [
              "5 oz salmon fillet",
              "3/4 cup cooked quinoa",
              "1 cup mixed roasted vegetables (zucchini, bell peppers, onions)",
              "1 tbsp olive oil",
              "Lemon juice, herbs, and spices to taste",
            ],
            instructions:
              "Season salmon and grill or bake until cooked through. Roast vegetables with olive oil. Serve with cooked quinoa.",
          },
          {
            name: "Mixed Berry Dessert",
            portion: "1/2 cup",
            calories: 100,
            protein: 1,
            carbs: 20,
            fat: 2,
            image: "/placeholder.svg?height=100&width=100",
            ingredients: ["1/2 cup mixed berries", "1 tbsp honey", "1 tbsp chopped nuts"],
            instructions: "Mix berries with honey and top with chopped nuts.",
          },
        ],
      },
    ],
  },
}

// Food database for search
const foodDatabase = [
  {
    name: "Chicken Breast",
    category: "protein",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Salmon",
    category: "protein",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Brown Rice",
    category: "carbs",
    calories: 112,
    protein: 2.6,
    carbs: 23.5,
    fat: 0.9,
    portion: "100g cooked",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sweet Potato",
    category: "carbs",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Avocado",
    category: "fat",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Olive Oil",
    category: "fat",
    calories: 119,
    protein: 0,
    carbs: 0,
    fat: 13.5,
    portion: "1 tbsp",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Broccoli",
    category: "vegetable",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Spinach",
    category: "vegetable",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Apple",
    category: "fruit",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Banana",
    category: "fruit",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    portion: "100g",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Daily nutrition tracking
const dailyNutrition = {
  calories: {
    goal: 2200,
    current: 1650,
  },
  protein: {
    goal: 165, // in grams
    current: 120,
  },
  carbs: {
    goal: 220, // in grams
    current: 180,
  },
  fat: {
    goal: 73, // in grams
    current: 50,
  },
  water: {
    goal: 2500, // in ml
    current: 1800,
  },
}

const DietPlanner = () => {
  const [selectedPlan, setSelectedPlan] = useState("maintenance")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFood, setSelectedFood] = useState<any | null>(null)
  const [openFoodDialog, setOpenFoodDialog] = useState(false)

  const filteredFoods = foodDatabase.filter((food) => {
    return searchQuery
      ? food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  })

  const handleFoodClick = (food: any) => {
    setSelectedFood(food)
    setOpenFoodDialog(true)
  }

  const currentPlan = mealPlans[selectedPlan as keyof typeof mealPlans]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Diet & Nutrition</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="rounded-full bg-electric-blue/10 p-2 text-electric-blue hover:bg-electric-blue/20">
                <Info className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-space border-electric-blue">
              <p>Track your nutrition, explore meal plans, and find foods to support your fitness goals.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-medium text-white">
              <Utensils className="mr-2 h-5 w-5 text-electric-blue" />
              Daily Nutrition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Calories</span>
                  <span className="text-sm text-white">
                    {dailyNutrition.calories.current} / {dailyNutrition.calories.goal} kcal
                  </span>
                </div>
                <Progress
                  value={(dailyNutrition.calories.current / dailyNutrition.calories.goal) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-electric-blue"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Protein</span>
                  <span className="text-sm text-white">
                    {dailyNutrition.protein.current} / {dailyNutrition.protein.goal} g
                  </span>
                </div>
                <Progress
                  value={(dailyNutrition.protein.current / dailyNutrition.protein.goal) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-green-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Carbs</span>
                  <span className="text-sm text-white">
                    {dailyNutrition.carbs.current} / {dailyNutrition.carbs.goal} g
                  </span>
                </div>
                <Progress
                  value={(dailyNutrition.carbs.current / dailyNutrition.carbs.goal) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-orange-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Fat</span>
                  <span className="text-sm text-white">
                    {dailyNutrition.fat.current} / {dailyNutrition.fat.goal} g
                  </span>
                </div>
                <Progress
                  value={(dailyNutrition.fat.current / dailyNutrition.fat.goal) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Water</span>
                  <span className="text-sm text-white">
                    {dailyNutrition.water.current} / {dailyNutrition.water.goal} ml
                  </span>
                </div>
                <Progress
                  value={(dailyNutrition.water.current / dailyNutrition.water.goal) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-blue-500"
                />
              </div>

              <Button className="mt-2 w-full bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30">
                <Plus className="mr-2 h-4 w-4" /> Log Food or Water
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-medium text-white">
              <Apple className="mr-2 h-5 w-5 text-electric-blue" />
              Macro Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-center justify-center">
              <div className="flex w-40 flex-col items-center justify-center rounded-full border-8 border-gray-800 bg-gray-900 p-4">
                <div className="text-3xl font-bold text-white">{dailyNutrition.calories.current}</div>
                <div className="text-sm text-gray-400">calories</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-gray-800/50 p-2">
                <div className="text-sm font-medium text-green-500">Protein</div>
                <div className="text-lg font-semibold text-white">
                  {Math.round(((dailyNutrition.protein.current * 4) / dailyNutrition.calories.current) * 100)}%
                </div>
                <div className="text-xs text-gray-400">{dailyNutrition.protein.current}g</div>
              </div>

              <div className="rounded-lg bg-gray-800/50 p-2">
                <div className="text-sm font-medium text-orange-500">Carbs</div>
                <div className="text-lg font-semibold text-white">
                  {Math.round(((dailyNutrition.carbs.current * 4) / dailyNutrition.calories.current) * 100)}%
                </div>
                <div className="text-xs text-gray-400">{dailyNutrition.carbs.current}g</div>
              </div>

              <div className="rounded-lg bg-gray-800/50 p-2">
                <div className="text-sm font-medium text-yellow-500">Fat</div>
                <div className="text-lg font-semibold text-white">
                  {Math.round(((dailyNutrition.fat.current * 9) / dailyNutrition.calories.current) * 100)}%
                </div>
                <div className="text-xs text-gray-400">{dailyNutrition.fat.current}g</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Meal Plans</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 ${selectedPlan === "weightLoss" ? "border-electric-blue text-electric-blue" : ""}`}
              onClick={() => setSelectedPlan("weightLoss")}
            >
              Weight Loss
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 ${selectedPlan === "maintenance" ? "border-electric-blue text-electric-blue" : ""}`}
              onClick={() => setSelectedPlan("maintenance")}
            >
              Maintenance
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`rounded-full border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 ${selectedPlan === "weightGain" ? "border-electric-blue text-electric-blue" : ""}`}
              onClick={() => setSelectedPlan("weightGain")}
            >
              Weight Gain
            </Button>
          </div>
        </div>

        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg font-medium text-white">
              <div className="flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-electric-blue" />
                {currentPlan.name}
              </div>
              <div className="text-base font-normal text-electric-blue">{currentPlan.dailyCalories} kcal/day</div>
            </CardTitle>
            <p className="text-sm text-gray-400">{currentPlan.description}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                  <span className="text-sm font-medium text-green-500">{currentPlan.macros.protein}%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Protein</p>
                  <p className="text-xs text-gray-400">
                    {Math.round((currentPlan.dailyCalories * (currentPlan.macros.protein / 100)) / 4)}g per day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">
                  <span className="text-sm font-medium text-orange-500">{currentPlan.macros.carbs}%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Carbs</p>
                  <p className="text-xs text-gray-400">
                    {Math.round((currentPlan.dailyCalories * (currentPlan.macros.carbs / 100)) / 4)}g per day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                  <span className="text-sm font-medium text-yellow-500">{currentPlan.macros.fat}%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Fat</p>
                  <p className="text-xs text-gray-400">
                    {Math.round((currentPlan.dailyCalories * (currentPlan.macros.fat / 100)) / 9)}g per day
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {currentPlan.meals.map((meal, index) => (
                <Collapsible key={index} className="rounded-lg border border-gray-700 bg-gray-800/30">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-electric-blue/20">
                        {meal.name.includes("Breakfast") ? (
                          <Coffee className="h-4 w-4 text-electric-blue" />
                        ) : meal.name.includes("Lunch") ? (
                          <Salad className="h-4 w-4 text-electric-blue" />
                        ) : meal.name.includes("Dinner") ? (
                          <Utensils className="h-4 w-4 text-electric-blue" />
                        ) : meal.name.includes("Snack") ? (
                          <Apple className="h-4 w-4 text-electric-blue" />
                        ) : (
                          <Utensils className="h-4 w-4 text-electric-blue" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{meal.name}</h4>
                        <p className="text-xs text-gray-400">
                          {meal.time} • {meal.calories} kcal
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t border-gray-700 p-3">
                    <div className="space-y-3">
                      {meal.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="flex items-center gap-3">
                          {food.image ? (
                            <img
                              src={food.image || "/placeholder.svg"}
                              alt={food.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-800">
                              <Utensils className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-white">{food.name}</h5>
                            <p className="text-xs text-gray-400">{food.portion}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{food.calories} kcal</p>
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-green-500">P: {food.protein}g</span>
                              <span className="text-orange-500">C: {food.carbs}g</span>
                              <span className="text-yellow-500">F: {food.fat}g</span>
                            </div>
                          </div>

                          {food.ingredients && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <Info className="h-4 w-4 text-gray-400" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="cyber-dialog max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold text-white">{food.name}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <h4 className="mb-2 text-sm font-medium text-electric-blue">Ingredients</h4>
                                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                                      {food.ingredients.map((ingredient, idx) => (
                                        <li key={idx}>{ingredient}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="mb-2 text-sm font-medium text-electric-blue">Instructions</h4>
                                    <p className="text-sm text-gray-300">{food.instructions}</p>
                                  </div>

                                  <div className="rounded-lg bg-gray-800 p-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-gray-400">Calories</span>
                                      <span className="text-sm font-medium text-white">{food.calories} kcal</span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
                                      <div>
                                        <span className="text-green-500">Protein</span>
                                        <p className="font-medium text-white">{food.protein}g</p>
                                      </div>
                                      <div>
                                        <span className="text-orange-500">Carbs</span>
                                        <p className="font-medium text-white">{food.carbs}g</p>
                                      </div>
                                      <div>
                                        <span className="text-yellow-500">Fat</span>
                                        <p className="font-medium text-white">{food.fat}g</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button className="bg-electric-blue text-white hover:bg-electric-blue/80">
                Apply This Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Food Database</h3>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search foods..."
            className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleFoodClick(food)}
            >
              <Card className="cyber-card cursor-pointer overflow-hidden">
                <div className="relative h-32 w-full bg-gray-800">
                  <img src={food.image || "/placeholder.svg"} alt={food.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-base font-semibold text-white">{food.name}</h3>
                    <p className="text-xs text-gray-300 capitalize">{food.category}</p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Flame className="mr-1 h-4 w-4 text-orange-400" />
                      {food.calories} kcal/{food.portion}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-green-500">P: {food.protein}g</span>
                      <span className="text-orange-500">C: {food.carbs}g</span>
                      <span className="text-yellow-500">F: {food.fat}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={openFoodDialog} onOpenChange={setOpenFoodDialog}>
        <DialogContent className="cyber-dialog max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">{selectedFood?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Nutritional information per {selectedFood?.portion}
            </DialogDescription>
          </DialogHeader>

          {selectedFood && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedFood.image || "/placeholder.svg"}
                  alt={selectedFood.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedFood.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{selectedFood.category}</p>
                  <p className="text-sm text-gray-400">Portion: {selectedFood.portion}</p>
                </div>
              </div>

              <div className="rounded-lg bg-gray-800 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Calories</span>
                  <span className="text-lg font-medium text-white">{selectedFood.calories} kcal</span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Protein</span>
                      <span className="text-white">{selectedFood.protein}g</span>
                    </div>
                    <Progress
                      value={((selectedFood.protein * 4) / selectedFood.calories) * 100}
                      className="h-1.5 bg-gray-700"
                      indicatorClassName="bg-green-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Carbs</span>
                      <span className="text-white">{selectedFood.carbs}g</span>
                    </div>
                    <Progress
                      value={((selectedFood.carbs * 4) / selectedFood.calories) * 100}
                      className="h-1.5 bg-gray-700"
                      indicatorClassName="bg-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Fat</span>
                      <span className="text-white">{selectedFood.fat}g</span>
                    </div>
                    <Progress
                      value={((selectedFood.fat * 9) / selectedFood.calories) * 100}
                      className="h-1.5 bg-gray-700"
                      indicatorClassName="bg-yellow-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                  Add to Favorites
                </Button>
                <Button className="bg-electric-blue text-white hover:bg-electric-blue/80">Add to Meal</Button>
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

export default DietPlanner

