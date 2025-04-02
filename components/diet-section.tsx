"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Apple,
  Utensils,
  Flame,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Coffee,
  Salad,
  Heart,
  Dumbbell,
  Info,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Diet plans data
const dietPlans = {
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
            name: "Mass Gainer Smoothie",
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
  therapeutic: {
    name: "Therapeutic Diet Plans",
    description: "Specialized meal plans designed to support specific health conditions and dietary needs.",
    plans: [
      {
        name: "Diabetes Management",
        description: "Low glycemic index foods to help manage blood sugar levels",
        dailyCalories: 2000,
        keyFeatures: [
          "Low glycemic index carbohydrates",
          "High fiber content",
          "Balanced macronutrients",
          "Regular meal timing",
          "Portion control",
        ],
        sampleMeals: [
          "Steel-cut oatmeal with cinnamon and berries",
          "Grilled chicken with quinoa and vegetables",
          "Greek yogurt with nuts and seeds",
          "Lentil soup with leafy greens",
        ],
        backgroundColor: "from-blue-600/20 to-cyan-600/20",
        borderColor: "border-blue-500/30",
      },
      {
        name: "Heart Health",
        description: "Low sodium, heart-healthy fats to support cardiovascular health",
        dailyCalories: 1800,
        keyFeatures: [
          "Low sodium content",
          "Omega-3 rich foods",
          "Reduced saturated fats",
          "High fiber content",
          "Antioxidant-rich fruits and vegetables",
        ],
        sampleMeals: [
          "Overnight oats with flaxseeds and berries",
          "Baked salmon with steamed vegetables",
          "Avocado and vegetable wrap",
          "Mediterranean salad with olive oil dressing",
        ],
        backgroundColor: "from-red-600/20 to-pink-600/20",
        borderColor: "border-red-500/30",
      },
      {
        name: "Anti-Inflammatory",
        description: "Foods that help reduce inflammation and support immune function",
        dailyCalories: 2200,
        keyFeatures: [
          "Rich in antioxidants",
          "Omega-3 fatty acids",
          "Turmeric and ginger inclusion",
          "Limited processed foods",
          "Reduced refined sugars",
        ],
        sampleMeals: [
          "Turmeric smoothie with berries and ginger",
          "Salmon with sweet potato and broccoli",
          "Chia seed pudding with mixed berries",
          "Lentil and vegetable soup with turmeric",
        ],
        backgroundColor: "from-amber-600/20 to-yellow-600/20",
        borderColor: "border-amber-500/30",
      },
      {
        name: "Gluten-Free",
        description: "Meal plan free from gluten for those with celiac disease or gluten sensitivity",
        dailyCalories: 2100,
        keyFeatures: [
          "No wheat, barley, or rye",
          "Focus on naturally gluten-free grains",
          "Balanced nutrition",
          "Variety of fruits and vegetables",
          "Careful label reading",
        ],
        sampleMeals: [
          "Quinoa breakfast bowl with fruits and nuts",
          "Grilled chicken with rice and vegetables",
          "Rice cakes with almond butter",
          "Gluten-free pasta with tomato sauce and vegetables",
        ],
        backgroundColor: "from-green-600/20 to-emerald-600/20",
        borderColor: "border-green-500/30",
      },
    ],
  },
}

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

export default function DietSection() {
  const [selectedPlan, setSelectedPlan] = useState("weightLoss")
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("plans")

  const currentPlan = dietPlans[selectedPlan as keyof typeof dietPlans]

  const toggleMeal = (mealName: string) => {
    if (expandedMeal === mealName) {
      setExpandedMeal(null)
    } else {
      setExpandedMeal(mealName)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6 bg-gray-900/30 backdrop-blur-sm border border-purple-900/40 rounded-lg">
          <TabsTrigger
            value="plans"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
          >
            <Utensils className="h-4 w-4 mr-2" />
            Meal Plans
          </TabsTrigger>
          <TabsTrigger
            value="therapeutic"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
          >
            <Heart className="h-4 w-4 mr-2" />
            Therapeutic Diets
          </TabsTrigger>
          <TabsTrigger
            value="tracking"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-teal-600"
          >
            <Apple className="h-4 w-4 mr-2" />
            Nutrition Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card
              className="bg-gradient-to-br from-red-600/10 to-orange-600/10 backdrop-blur-sm border border-red-900/40 hover:border-red-500/40 transition-colors cursor-pointer"
              onClick={() => setSelectedPlan("weightLoss")}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Flame className="mr-2 h-5 w-5 text-red-400" />
                  Weight Loss Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  1,800 calories per day with high protein to preserve muscle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-red-400">40%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Protein</p>
                      <p className="text-xs text-gray-300">180g per day</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-orange-400">30%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Carbs</p>
                      <p className="text-xs text-gray-300">135g per day</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-yellow-400">30%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Fat</p>
                      <p className="text-xs text-gray-300">60g per day</p>
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full ${selectedPlan === "weightLoss" ? "bg-gradient-to-r from-purple-600 to-teal-600" : "bg-gray-800/50 hover:bg-gray-700/50"}`}
                >
                  {selectedPlan === "weightLoss" ? "Currently Selected" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>

            <Card
              className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-900/40 hover:border-blue-500/40 transition-colors cursor-pointer"
              onClick={() => setSelectedPlan("weightGain")}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-blue-400" />
                  Weight Gain Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  3,000 calories per day with balanced macros for muscle growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-400">30%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Protein</p>
                      <p className="text-xs text-gray-300">225g per day</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-400">50%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Carbs</p>
                      <p className="text-xs text-gray-300">375g per day</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-pink-400">20%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Fat</p>
                      <p className="text-xs text-gray-300">67g per day</p>
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full ${selectedPlan === "weightGain" ? "bg-gradient-to-r from-purple-600 to-teal-600" : "bg-gray-800/50 hover:bg-gray-700/50"}`}
                >
                  {selectedPlan === "weightGain" ? "Currently Selected" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-purple-400" />
                  {currentPlan.name}
                </div>
                <div className="text-base font-normal text-teal-400">{(currentPlan as any).dailyCalories} kcal/day</div>
              </CardTitle>
              <CardDescription className="text-gray-300">{currentPlan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(currentPlan as any).meals?.map((meal: any, index: number) => (
                  <Collapsible
                    key={index}
                    open={expandedMeal === meal.name}
                    onOpenChange={() => toggleMeal(meal.name)}
                    className="rounded-lg border border-purple-800/40 bg-gray-900/20"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                          {meal.name.includes("Breakfast") ? (
                            <Coffee className="h-4 w-4 text-purple-400" />
                          ) : meal.name.includes("Lunch") ? (
                            <Salad className="h-4 w-4 text-teal-400" />
                          ) : meal.name.includes("Dinner") ? (
                            <Utensils className="h-4 w-4 text-blue-400" />
                          ) : meal.name.includes("Snack") ? (
                            <Apple className="h-4 w-4 text-red-400" />
                          ) : (
                            <Utensils className="h-4 w-4 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{meal.name}</h4>
                          <p className="text-xs text-gray-300">
                            {meal.time} • {meal.calories} kcal
                          </p>
                        </div>
                      </div>
                      {expandedMeal === meal.name ? (
                        <ChevronUp className="h-5 w-5 text-purple-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-purple-400" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-purple-800/40 p-4">
                      <div className="space-y-3">
                        {meal.foods.map((food: any, foodIndex: number) => (
                          <div key={foodIndex} className="flex items-center gap-3">
                            {food.image ? (
                              <img
                                src={food.image || "/placeholder.svg"}
                                alt={food.name}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-900/40">
                                <Utensils className="h-6 w-6 text-purple-500" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-white">{food.name}</h5>
                              <p className="text-xs text-gray-300">{food.portion}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-white">{food.calories} kcal</p>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-green-400">P: {food.protein}g</span>
                                <span className="text-orange-400">C: {food.carbs}g</span>
                                <span className="text-yellow-400">F: {food.fat}g</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                Apply This Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="therapeutic">
          <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-400" />
                Therapeutic Diet Plans
              </CardTitle>
              <CardDescription className="text-gray-300">
                Specialized meal plans designed to support specific health conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dietPlans.therapeutic.plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`rounded-lg bg-gradient-to-br ${plan.backgroundColor} border ${plan.borderColor} p-6 transition-transform hover:scale-[1.02]`}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-300 mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">Daily Calories</span>
                        <span className="text-sm font-medium text-white">{plan.dailyCalories} kcal</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {plan.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start">
                            <span className="text-teal-400 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Sample Meals:</h4>
                      <ul className="space-y-1">
                        {plan.sampleMeals.map((meal, idx) => (
                          <li key={idx} className="text-xs text-gray-300 flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {meal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                      View Full Plan
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800/40">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-white font-medium">Important Note</h3>
                </div>
                <p className="text-sm text-gray-300">
                  These therapeutic diet plans are designed as general guidelines. Please consult with a healthcare
                  professional or registered dietitian before starting any specialized diet plan, especially if you have
                  existing health conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-purple-400" />
                  Daily Nutrition
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Track your daily macronutrient and calorie intake
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Calories</span>
                      <span className="text-sm text-white">
                        {dailyNutrition.calories.current} / {dailyNutrition.calories.goal} kcal
                      </span>
                    </div>
                    <Progress
                      value={(dailyNutrition.calories.current / dailyNutrition.calories.goal) * 100}
                      className="h-2 bg-gray-800"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full"
                        style={{ width: `${(dailyNutrition.calories.current / dailyNutrition.calories.goal) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Protein</span>
                      <span className="text-sm text-white">
                        {dailyNutrition.protein.current} / {dailyNutrition.protein.goal} g
                      </span>
                    </div>
                    <Progress
                      value={(dailyNutrition.protein.current / dailyNutrition.protein.goal) * 100}
                      className="h-2 bg-gray-800"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                        style={{ width: `${(dailyNutrition.protein.current / dailyNutrition.protein.goal) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Carbs</span>
                      <span className="text-sm text-white">
                        {dailyNutrition.carbs.current} / {dailyNutrition.carbs.goal} g
                      </span>
                    </div>
                    <Progress
                      value={(dailyNutrition.carbs.current / dailyNutrition.carbs.goal) * 100}
                      className="h-2 bg-gray-800"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                        style={{ width: `${(dailyNutrition.carbs.current / dailyNutrition.carbs.goal) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Fat</span>
                      <span className="text-sm text-white">
                        {dailyNutrition.fat.current} / {dailyNutrition.fat.goal} g
                      </span>
                    </div>
                    <Progress
                      value={(dailyNutrition.fat.current / dailyNutrition.fat.goal) * 100}
                      className="h-2 bg-gray-800"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                        style={{ width: `${(dailyNutrition.fat.current / dailyNutrition.fat.goal) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Water</span>
                      <span className="text-sm text-white">
                        {dailyNutrition.water.current} / {dailyNutrition.water.goal} ml
                      </span>
                    </div>
                    <Progress
                      value={(dailyNutrition.water.current / dailyNutrition.water.goal) * 100}
                      className="h-2 bg-gray-800"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                        style={{ width: `${(dailyNutrition.water.current / dailyNutrition.water.goal) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700">
                    Log Food or Water
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 backdrop-blur-sm border border-purple-900/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Apple className="mr-2 h-5 w-5 text-purple-400" />
                  Macro Distribution
                </CardTitle>
                <CardDescription className="text-gray-300">Your current macronutrient breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Protein slice */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#protein-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Carbs slice */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#carbs-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - 251.2 * 0.4}
                        transform="rotate(-90 50 50)"
                      />
                      {/* Fat slice */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#fat-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - 251.2 * 0.7}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="protein-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient id="carbs-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                        <linearGradient id="fat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#eab308" />
                          <stop offset="100%" stopColor="#facc15" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-white">{dailyNutrition.calories.current}</div>
                      <div className="text-sm text-gray-300">calories</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="text-sm font-medium text-green-400">Protein</div>
                    <div className="text-lg font-semibold text-white">
                      {Math.round(((dailyNutrition.protein.current * 4) / dailyNutrition.calories.current) * 100)}%
                    </div>
                    <div className="text-xs text-gray-300">{dailyNutrition.protein.current}g</div>
                  </div>

                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="text-sm font-medium text-orange-400">Carbs</div>
                    <div className="text-lg font-semibold text-white">
                      {Math.round(((dailyNutrition.carbs.current * 4) / dailyNutrition.calories.current) * 100)}%
                    </div>
                    <div className="text-xs text-gray-300">{dailyNutrition.carbs.current}g</div>
                  </div>

                  <div className="rounded-lg bg-gray-800/30 p-2">
                    <div className="text-sm font-medium text-yellow-400">Fat</div>
                    <div className="text-lg font-semibold text-white">
                      {Math.round(((dailyNutrition.fat.current * 9) / dailyNutrition.calories.current) * 100)}%
                    </div>
                    <div className="text-xs text-gray-300">{dailyNutrition.fat.current}g</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white mb-2">Recent Food Entries</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                          <Coffee className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white">Breakfast</p>
                          <p className="text-xs text-gray-400">7:30 AM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">450 kcal</p>
                        <p className="text-xs text-gray-400">P: 25g • C: 40g • F: 15g</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                          <Apple className="h-4 w-4 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white">Morning Snack</p>
                          <p className="text-xs text-gray-400">10:15 AM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">180 kcal</p>
                        <p className="text-xs text-gray-400">P: 5g • C: 30g • F: 5g</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <Salad className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white">Lunch</p>
                          <p className="text-xs text-gray-400">1:00 PM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">620 kcal</p>
                        <p className="text-xs text-gray-400">P: 40g • C: 60g • F: 20g</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

