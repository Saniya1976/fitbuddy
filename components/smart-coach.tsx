"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Dumbbell, MonitorIcon as Running, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock AI responses
const mockResponses: Record<string, string> = {
  default: "Hello! I'm your AI Smart Coach. How can I help with your fitness journey today?",
  workout:
    "Based on your recent activity data, I recommend focusing on strength training today. Your step count has been high, but you haven't done resistance training in 5 days. Here's a quick 30-minute workout:\n\n1. Warm-up: 5 min light cardio\n2. Circuit (3 rounds):\n   - Push-ups: 12 reps\n   - Bodyweight squats: 15 reps\n   - Plank: 30 seconds\n   - Lunges: 10 each leg\n3. Cool down: 5 min stretching\n\nThis will help maintain muscle balance with your cardio activity.",
  nutrition:
    "Looking at your recent workout intensity and goals, I recommend increasing your protein intake slightly. Aim for 1.6-1.8g per kg of bodyweight to support muscle recovery. Your current average is around 1.4g/kg.\n\nAlso, your hydration data shows you're consistently under your target. Try to add an extra 500ml of water, especially on days you're doing HIIT workouts.",
  progress:
    "You're making excellent progress! In the last 30 days:\n\n- Step count up 12% (avg 9,450/day)\n- Workout consistency improved to 4.2 days/week (from 3.5)\n- Resting heart rate decreased by 3 bpm\n\nYour consistency is paying off. If you maintain this trajectory, you'll reach your Q2 fitness goals ahead of schedule.",
}

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const SmartCoach = () => {
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
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[calc(70vh-2rem)] flex-col">
      <Card className="cyber-card flex flex-1 flex-col overflow-hidden">
        <CardHeader className="border-b border-gray-800 pb-3">
          <CardTitle className="flex items-center text-lg font-medium text-white">
            <Bot className="mr-2 h-5 w-5 text-electric-blue" />
            AI Smart Coach
            <span className="ml-2 rounded-full bg-electric-blue/20 px-2 py-0.5 text-xs text-electric-blue">
              <Sparkles className="mr-1 inline-block h-3 w-3" />
              Powered by on-chain data
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="flex h-full flex-col p-4">
            <div className="flex-1 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-electric-blue text-white" : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    <div className="mb-1 flex items-center">
                      {message.sender === "ai" ? <Bot className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
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
                  <div className="max-w-[80%] rounded-lg bg-gray-800 px-4 py-2 text-gray-200">
                    <div className="flex items-center">
                      <Bot className="mr-2 h-4 w-4" />
                      <span className="text-xs opacity-70">AI Coach is typing...</span>
                    </div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-gray-800 px-3 py-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI coach a question..."
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-electric-blue/10 p-0 text-electric-blue hover:bg-electric-blue/20 hover:text-electric-blue"
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <SuggestionButton
              icon={<Dumbbell className="mr-1 h-3 w-3" />}
              text="Suggest a workout"
              onClick={() => setInput("Suggest a workout for today")}
            />
            <SuggestionButton
              icon={<Running className="mr-1 h-3 w-3" />}
              text="Check progress"
              onClick={() => setInput("How is my progress so far?")}
            />
            <SuggestionButton
              icon={<Zap className="mr-1 h-3 w-3" />}
              text="Nutrition tips"
              onClick={() => setInput("Any nutrition tips based on my workouts?")}
            />
          </div>
        </div>
      </Card>

      <style jsx global>{`
        .cyber-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.1);
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          column-gap: 6px;
          margin-top: 8px;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #00BFFF;
          border-radius: 50%;
          display: block;
          opacity: 0.4;
        }
        
        .typing-indicator span:nth-child(1) {
          animation: pulse 1s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(2) {
          animation: pulse 1s infinite ease-in-out 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation: pulse 1s infinite ease-in-out 0.4s;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
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
      className="flex items-center rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  )
}

export default SmartCoach

