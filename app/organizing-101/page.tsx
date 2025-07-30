"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BookOpen,
  Users,
  Target,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  Building,
  Megaphone,
  Play,
  Download,
  Share,
} from "lucide-react"
import MobilizerVsOrganizerModule from "@/components/mobilizer-vs-organizer-module"
import Link from "next/link"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  locked: boolean
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const modules: Module[] = [
  {
    id: "mobilizer-vs-organizer",
    title: "Mobilizer vs. Organizer",
    description: "Learn Kwame Ture's foundational distinction between mobilizing and organizing",
    duration: "45 min",
    difficulty: "beginner",
    completed: false,
    locked: false,
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "power-analysis",
    title: "Power Mapping & Analysis",
    description: "Understand how power works and how to map it in your community",
    duration: "60 min",
    difficulty: "intermediate",
    completed: false,
    locked: true,
    icon: Target,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "relationship-building",
    title: "Building Relationships",
    description: "The foundation of all organizing: creating authentic connections",
    duration: "40 min",
    difficulty: "beginner",
    completed: false,
    locked: true,
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "leadership-development",
    title: "Leadership Development",
    description: "How to identify, recruit, and develop leaders in your community",
    duration: "55 min",
    difficulty: "intermediate",
    completed: false,
    locked: true,
    icon: Star,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "campaign-strategy",
    title: "Campaign Strategy",
    description: "Planning and executing successful organizing campaigns",
    duration: "75 min",
    difficulty: "advanced",
    completed: false,
    locked: true,
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "coalition-building",
    title: "Coalition Building",
    description: "Working with other organizations and movements for greater impact",
    duration: "50 min",
    difficulty: "intermediate",
    completed: false,
    locked: true,
    icon: Building,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "digital-organizing",
    title: "Digital Organizing",
    description: "Using technology and social media for liberation organizing",
    duration: "65 min",
    difficulty: "intermediate",
    completed: false,
    locked: true,
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "lgbtq-organizing",
    title: "LGBTQ+ Organizing Specifics",
    description: "Unique considerations for LGBTQ+ liberation organizing",
    duration: "70 min",
    difficulty: "advanced",
    completed: false,
    locked: true,
    icon: Shield,
    color: "from-rainbow-500 to-pride-500",
  },
]

export default function Organizing101Page() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState({
    completedModules: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    achievements: [] as string[],
  })

  const completedCount = modules.filter((m) => m.completed).length
  const progressPercentage = (completedCount / modules.length) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (selectedModule === "mobilizer-vs-organizer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              onClick={() => setSelectedModule(null)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
            >
              ← Back to Organizing 101
            </Button>
          </div>
          <MobilizerVsOrganizerModule />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Organizing 101</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
            Learn the fundamentals of community organizing for LGBTQ+ liberation. Based on the teachings of Kwame Ture
            and adapted for modern digital organizing.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>8 modules • ~7 hours total</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>1,247+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificate available</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {completedCount}/{modules.length}
                </div>
                <div className="text-white/70 text-sm">Modules Complete</div>
                <Progress value={progressPercentage} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{userProgress.totalTimeSpent}h</div>
                <div className="text-white/70 text-sm">Time Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{userProgress.currentStreak}</div>
                <div className="text-white/70 text-sm">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{userProgress.achievements.length}</div>
                <div className="text-white/70 text-sm">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="bg-white/95 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Start with "Mobilizer vs. Organizer"</strong> - This foundational module teaches Kwame Ture's
                core distinction that underlies all effective organizing work. Complete modules in order to unlock
                advanced content.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => {
                const IconComponent = module.icon
                const isLocked = module.locked && !module.completed

                return (
                  <Card
                    key={module.id}
                    className={`transition-all cursor-pointer hover:shadow-lg ${
                      isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
                    } ${module.completed ? "ring-2 ring-green-500 bg-green-50" : ""}`}
                    onClick={() => !isLocked && setSelectedModule(module.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {module.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{module.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </div>
                        {!isLocked && (
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                            {module.completed ? "Review" : "Start"}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>

                      {isLocked && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Complete previous modules to unlock
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Quick Start Guide */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-green-600" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                New to organizing? Start here for a quick overview of key concepts and your learning path.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Watch Introduction Video</div>
                    <div className="text-sm text-gray-600">5-minute overview of organizing principles</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Complete First Module</div>
                    <div className="text-sm text-gray-600">Mobilizer vs. Organizer fundamentals</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Join Study Group</div>
                    <div className="text-sm text-gray-600">Connect with other learners</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                <Play className="w-4 h-4 mr-2" />
                Start Learning Journey
              </Button>
            </CardContent>
          </Card>

          {/* Community & Support */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Community & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Connect with fellow organizers and get support on your liberation journey.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Join Study Groups
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Peer Mentorship Program
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Share Your Progress
                </Button>
              </div>
              <Alert className="border-purple-200 bg-purple-50">
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  <strong>Weekly Office Hours:</strong> Join our community organizers every Thursday at 7PM EST for Q&A
                  and discussion about the modules.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm border-white/20 text-white mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Organizing for Liberation?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of LGBTQ+ organizers learning the skills needed to create lasting change in our
              communities. Start with Kwame Ture's foundational teachings and build your organizing toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setSelectedModule("mobilizer-vs-organizer")}
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start First Module
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 bg-transparent"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Back to Platform
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
