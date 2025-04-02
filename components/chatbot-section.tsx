"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Dumbbell, Activity, Apple } from "lucide-react"

// Mock AI responses
const mockResponses: Record<string, string> = {
  default: "Hi there! I'm your AI fitness coach. How can I help with your fitness journey today?",
  workout:
    "Based on your recent activity data, I recommend focusing on strength training today. Your step count has been high, but you haven't done resistance training in 5 days. Here's a quick 30-minute workout:\n\n1. Warm-up: 5 min light cardio\n2. Circuit (3 rounds):\n   - Push-ups: 12 reps\n   - Bodyweight squats: 15 reps\n   - Plank: 30 seconds\n   - Lunges: 10 each leg\n3. Cool down: 5 min stretching\n\nThis will help maintain muscle balance with your cardio activity.",
  nutrition:
    "Looking at your recent workout intensity and goals, I recommend increasing your protein intake slightly. Aim for 1.6-1.8g per kg of bodyweight to support muscle recovery. Your current average is around 1.4g/kg.\n\nAlso, your hydration data shows you're consistently under your target. Try to add an extra 500ml of water, especially on days you're doing HIIT workouts.",
  progress:
    "You're making excellent progress! In the last 30 days:\n\n- Step count up 12% (avg 9,450/day)\n- Workout consistency improved to 4.2 days/week (from 3.5)\n- Resting heart rate decreased by 3 bpm\n\nYour consistency is paying off. If you maintain this trajectory, you'll reach your Q2 fitness goals ahead of schedule.",
  motivation:
    "Remember why you started this journey. Every workout, every healthy meal is an investment in your future self. On days when motivation is low, focus on just showing up - even a 10-minute workout is better than nothing. Your body is capable of amazing things, and you've already proven your dedication by making it this far. Keep pushing your limits!",
  sleep:
    "Your sleep data shows an average of 6.4 hours per night, which is below the recommended 7-9 hours for optimal recovery. Poor sleep can impact your workout performance, hormone balance, and hunger signals. Try these tips:\n\n1. Establish a consistent sleep schedule\n2. Create a bedtime routine\n3. Limit screen time 1 hour before bed\n4. Keep your bedroom cool and dark\n\nImproving sleep quality could significantly boost your fitness results.",
}

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: mockResponses.default,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseText = mockResponses.default

      // Simple keyword matching for demo purposes
      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("workout") || lowerInput.includes("exercise") || lowerInput.includes("training")) {
        responseText = mockResponses.workout
      } else if (
        lowerInput.includes("eat") ||
        lowerInput.includes("food") ||
        lowerInput.includes("nutrition") ||
        lowerInput.includes("diet")
      ) {
        responseText = mockResponses.nutrition
      } else if (
        lowerInput.includes("progress") ||
        lowerInput.includes("improve") ||
        lowerInput.includes("better") ||
        lowerInput.includes("goal")
      ) {
        responseText = mockResponses.progress
      } else if (
        lowerInput.includes("motivate") ||
        lowerInput.includes("motivation") ||
        lowerInput.includes("inspire") ||
        lowerInput.includes("tired")
      ) {
        responseText = mockResponses.motivation
      } else if (
        lowerInput.includes("sleep") ||
        lowerInput.includes("rest") ||
        lowerInput.includes("tired") ||
        lowerInput.includes("recovery")
      ) {
        responseText = mockResponses.sleep
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="bg-blue-950/30 backdrop-blur-sm border-blue-900/40 h-[calc(100vh-220px)] flex flex-col">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Bot className="mr-2 h-5 w-5 text-blue-400" />
          AI Fitness Coach
        </CardTitle>
        <CardDescription className="text-blue-300">
          Get personalized fitness advice, workout plans, and nutrition guidance
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pr-4 mb-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-900/40 border border-blue-800/40 text-blue-100"
                }`}
              >
                <div className="mb-1 flex items-center">
                  {message.sender === "ai" ? (
                    <Bot className="mr-2 h-4 w-4 text-blue-400" />
                  ) : (
                    <User className="mr-2 h-4 w-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.sender === "ai" ? "AI Coach" : "You"} •{" "}
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="whitespace-pre-line">{message.text}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-blue-900/40 border border-blue-800/40 px-4 py-2 text-blue-100">
                <div className="flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-blue-400" />
                  <span className="text-xs opacity-70">AI Coach is typing...</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div
                    className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-blue-800/40 pt-4">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI coach a question..."
              className="bg-blue-900/20 border-blue-800/40 text-white placeholder:text-blue-400/70"
            />
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <SuggestionButton
              icon={<Dumbbell className="mr-1 h-3 w-3" />}
              text="Suggest a workout"
              onClick={() => setInput("Suggest a workout for today")}
            />
            <SuggestionButton
              icon={<Activity className="mr-1 h-3 w-3" />}
              text="Check progress"
              onClick={() => setInput("How is my progress so far?")}
            />
            <SuggestionButton
              icon={<Apple className="mr-1 h-3 w-3" />}
              text="Nutrition tips"
              onClick={() => setInput("Any nutrition tips based on my workouts?")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface SuggestionButtonProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

const SuggestionButton = ({ icon, text, onClick }: SuggestionButtonProps) => {
  return (
    <button
      className="flex items-center rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300 transition-colors hover:bg-blue-900/50"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  )
}

