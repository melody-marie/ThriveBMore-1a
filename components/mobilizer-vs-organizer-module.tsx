"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Target,
  Clock,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Heart,
  Zap,
  Building,
  Vote,
  Megaphone,
  Shield,
  Star,
  Award,
  Play,
  RotateCcw,
} from "lucide-react"

interface LessonProgress {
  completed: boolean
  score?: number
  timeSpent: number
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "mobilizing" | "organizing"
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is the primary goal of mobilizing according to Kwame Ture?",
    options: [
      "To build long-term institutional power",
      "To respond quickly to immediate crises and injustices",
      "To create sustainable community organizations",
      "To develop leadership within the community",
    ],
    correctAnswer: 1,
    explanation:
      "Mobilizing is about rapid response to immediate issues and crises, getting people to act quickly on urgent matters.",
    category: "mobilizing",
  },
  {
    id: "2",
    question: "What distinguishes organizing from mobilizing in terms of timeline?",
    options: [
      "Organizing is faster than mobilizing",
      "Both take the same amount of time",
      "Organizing takes longer but builds lasting change",
      "Timeline doesn't matter in either approach",
    ],
    correctAnswer: 2,
    explanation:
      "Organizing is a long-term process that builds sustainable power structures, while mobilizing is about immediate action.",
    category: "organizing",
  },
  {
    id: "3",
    question: "In the context of LGBTQ+ liberation, which scenario represents organizing?",
    options: [
      "Protesting a discriminatory law passed yesterday",
      "Building a 5-year plan to elect LGBTQ+ candidates to city council",
      "Responding to a hate crime with a vigil",
      "Organizing a one-time pride march",
    ],
    correctAnswer: 1,
    explanation:
      "Building long-term electoral strategy represents organizing - creating sustainable political power over time.",
    category: "organizing",
  },
  {
    id: "4",
    question: "What role does leadership development play in organizing vs mobilizing?",
    options: [
      "Leadership development is only important in mobilizing",
      "Neither approach requires leadership development",
      "Organizing emphasizes developing many leaders; mobilizing often relies on existing leaders",
      "Both approaches develop leaders equally",
    ],
    correctAnswer: 2,
    explanation:
      "Organizing focuses on developing broad-based leadership to sustain long-term change, while mobilizing often relies on existing leadership for quick action.",
    category: "organizing",
  },
  {
    id: "5",
    question: "How do organizing and mobilizing complement each other in liberation movements?",
    options: [
      "They are competing strategies that cannot work together",
      "Organizing provides the foundation while mobilizing responds to immediate needs",
      "Only one approach should be used at a time",
      "They serve identical purposes",
    ],
    correctAnswer: 1,
    explanation:
      "Both are necessary: organizing builds the long-term power base while mobilizing allows for rapid response to urgent issues.",
    category: "organizing",
  },
]

export default function MobilizerVsOrganizerModule() {
  const [currentTab, setCurrentTab] = useState("overview")
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonProgress>>({})
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const markLessonComplete = (lessonId: string, score?: number) => {
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: {
        completed: true,
        score,
        timeSpent: (prev[lessonId]?.timeSpent || 0) + 1,
      },
    }))
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setQuizScore(0)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }))
  }

  const nextQuestion = () => {
    if (showExplanation) {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setShowExplanation(false)
      } else {
        completeQuiz()
      }
    } else {
      setShowExplanation(true)
    }
  }

  const completeQuiz = () => {
    let correct = 0
    quizQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })

    const score = Math.round((correct / quizQuestions.length) * 100)
    setQuizScore(score)
    setQuizCompleted(true)
    markLessonComplete("quiz", score)
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setQuizScore(0)
    setShowExplanation(false)
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const selectedAnswer = selectedAnswers[currentQuestion?.id]
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer

  const overallProgress = (Object.keys(lessonProgress).length / 6) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                Mobilizer vs. Organizer
              </CardTitle>
              <p className="text-white/80">
                Learn Kwame Ture's foundational teachings on the difference between mobilizing and organizing for
                liberation
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{Math.round(overallProgress)}%</div>
              <div className="text-white/70 text-sm">Complete</div>
              <Progress value={overallProgress} className="w-32 mt-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
            Overview
          </TabsTrigger>
          <TabsTrigger value="mobilizing" className="text-white data-[state=active]:bg-white/20">
            Mobilizing
          </TabsTrigger>
          <TabsTrigger value="organizing" className="text-white data-[state=active]:bg-white/20">
            Organizing
          </TabsTrigger>
          <TabsTrigger value="comparison" className="text-white data-[state=active]:bg-white/20">
            Comparison
          </TabsTrigger>
          <TabsTrigger value="quiz" className="text-white data-[state=active]:bg-white/20">
            Quiz
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Kwame Ture's Revolutionary Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  <strong>Kwame Ture (Stokely Carmichael)</strong> was a revolutionary organizer who distinguished
                  between two essential but different approaches to social change: <strong>mobilizing</strong> and{" "}
                  <strong>organizing</strong>. Understanding this difference is crucial for effective LGBTQ+ liberation
                  work.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      Mobilizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      <strong>Mobilizing</strong> is about getting people to respond quickly to immediate crises and
                      injustices.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Rapid response to urgent issues
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Emotional appeal and urgency
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Short-term focused actions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Reactive to external events
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="w-5 h-5 text-green-600" />
                      Organizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      <strong>Organizing</strong> is about building long-term power structures and sustainable change.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Long-term power building
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Systematic approach to change
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Leadership development focus
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Proactive strategy creation
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Both are necessary!</strong> Effective liberation movements need both mobilizing (to respond
                  to immediate threats) and organizing (to build lasting power). The key is knowing when to use each
                  approach.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => markLessonComplete("overview")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Overview Complete
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mobilizing Tab */}
        <TabsContent value="mobilizing" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-purple-600" />
                Understanding Mobilizing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">What is Mobilizing?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Mobilizing is the art of getting people to act quickly in response to immediate crises, injustices, or
                  opportunities. It's about creating urgency and moving people to action <em>now</em>. Think of it as
                  the emergency response system of social movements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    Key Characteristics
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Speed & Urgency:</strong> Mobilizing happens fast, often within hours or days of an
                        incident
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Emotional Appeal:</strong> Uses moral outrage, fear, or hope to motivate immediate
                        action
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Broad Participation:</strong> Aims to get as many people as possible involved quickly
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Reactive Nature:</strong> Responds to external events, crises, or opportunities
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-600" />
                    LGBTQ+ Mobilizing Examples
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Stonewall Riots (1969):</strong> Immediate response to police raid, sparked by anger and
                      urgency
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Pulse Nightclub Response (2016):</strong> Vigils and protests organized within hours of
                      the tragedy
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Anti-Trans Legislation Protests:</strong> Rapid response to discriminatory bills being
                      passed
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Pride Month Celebrations:</strong> Annual mobilization around LGBTQ+ visibility and rights
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Mobilizing Strengths:</strong> Creates immediate pressure, raises awareness quickly,
                  demonstrates community solidarity, and can stop immediate harm or capitalize on opportunities.
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Mobilizing Limitations:</strong> Energy can fade quickly, may not create lasting change, can
                  burn out participants, and doesn't necessarily build ongoing power structures.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => markLessonComplete("mobilizing")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Mobilizing Lesson
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organizing Tab */}
        <TabsContent value="organizing" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                Understanding Organizing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold mb-3 text-green-800">What is Organizing?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Organizing is the systematic process of building power over time to create lasting social change. It's
                  about developing people, relationships, and institutions that can sustain long-term liberation work.
                  Think of it as building the foundation and infrastructure for lasting change.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-600" />
                    Key Characteristics
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Long-term Vision:</strong> Focuses on sustainable change over months, years, or decades
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Leadership Development:</strong> Builds capacity and skills within the community
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Institution Building:</strong> Creates lasting organizations and power structures
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Vote className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Strategic Planning:</strong> Proactive approach with clear goals and tactics
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-600" />
                    LGBTQ+ Organizing Examples
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Human Rights Campaign:</strong> Decades-long work building political power and lobbying
                      infrastructure
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Marriage Equality Campaign:</strong> 20+ year strategic effort involving legal, political,
                      and cultural work
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>Trans Rights Organizations:</strong> Building institutions like NCTE to advance
                      transgender equality
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <strong>LGBTQ+ Community Centers:</strong> Creating lasting institutions that serve community
                      needs
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  The Organizing Process
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <h5 className="font-semibold mb-1">Research & Analysis</h5>
                    <p className="text-sm text-gray-600">
                      Understand the problem, power structures, and community needs
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h5 className="font-semibold mb-1">Build Relationships</h5>
                    <p className="text-sm text-gray-600">Develop trust and connections within the community</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <h5 className="font-semibold mb-1">Develop Leaders</h5>
                    <p className="text-sm text-gray-600">Train and empower community members to take action</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <ArrowRight className="w-6 h-6 text-green-500" />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    <h5 className="font-semibold mb-1">Create Strategy</h5>
                    <p className="text-sm text-gray-600">Develop long-term plans with clear goals and tactics</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">5</span>
                    </div>
                    <h5 className="font-semibold mb-1">Take Action</h5>
                    <p className="text-sm text-gray-600">Implement campaigns and build power systematically</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">6</span>
                    </div>
                    <h5 className="font-semibold mb-1">Evaluate & Adapt</h5>
                    <p className="text-sm text-gray-600">Learn from results and adjust strategy for continued growth</p>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Organizing Strengths:</strong> Creates lasting change, builds sustainable power, develops
                  community capacity, and addresses root causes of problems.
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Organizing Limitations:</strong> Takes time to see results, requires sustained commitment, may
                  not address immediate crises quickly, and can be resource-intensive.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => markLessonComplete("organizing")}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Organizing Lesson
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Mobilizing vs. Organizing: Side by Side
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-4 font-semibold">Aspect</th>
                      <th className="text-left p-4 font-semibold text-purple-600">Mobilizing</th>
                      <th className="text-left p-4 font-semibold text-green-600">Organizing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-medium">Timeline</td>
                      <td className="p-4">Hours to weeks</td>
                      <td className="p-4">Months to years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium">Primary Goal</td>
                      <td className="p-4">Immediate response to crisis</td>
                      <td className="p-4">Long-term power building</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Approach</td>
                      <td className="p-4">Reactive to events</td>
                      <td className="p-4">Proactive strategy</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium">Leadership</td>
                      <td className="p-4">Often relies on existing leaders</td>
                      <td className="p-4">Develops new leaders</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Participation</td>
                      <td className="p-4">Broad, temporary engagement</td>
                      <td className="p-4">Deep, sustained commitment</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium">Motivation</td>
                      <td className="p-4">Emotional urgency</td>
                      <td className="p-4">Strategic vision</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Structure</td>
                      <td className="p-4">Informal, flexible</td>
                      <td className="p-4">Formal institutions</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium">Success Measure</td>
                      <td className="p-4">Immediate impact/response</td>
                      <td className="p-4">Systemic change over time</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800">When to Mobilize</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Immediate crisis or threat
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Time-sensitive opportunity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Need to demonstrate solidarity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Raising awareness quickly
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        Stopping immediate harm
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">When to Organize</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Systemic problems requiring long-term solutions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Building political or economic power
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Creating lasting institutions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Developing community leadership
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Addressing root causes
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-6 border-blue-200 bg-blue-50">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>The Liberation Formula:</strong> Effective movements use both approaches strategically.
                  Organizing provides the foundation and long-term vision, while mobilizing allows for rapid response to
                  immediate threats and opportunities. They work together to create comprehensive social change.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => markLessonComplete("comparison")}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Comparison Lesson
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Test Your Understanding</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Take this quiz to test your understanding of the difference between mobilizing and organizing.
                    You'll need to score 80% or higher to pass.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg max-w-sm mx-auto">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📝 {quizQuestions.length} questions</div>
                      <div>⏱️ No time limit</div>
                      <div>🎯 80% to pass</div>
                      <div>🔄 Can retake if needed</div>
                    </div>
                  </div>
                  <Button
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </Button>
                </div>
              ) : quizCompleted ? (
                <div className="text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                      quizScore >= 80 ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {quizScore >= 80 ? (
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{quizScore >= 80 ? "Congratulations!" : "Keep Learning!"}</h3>
                  <div className="text-3xl font-bold">{quizScore}%</div>
                  <p className="text-gray-600">
                    {quizScore >= 80
                      ? "You have a solid understanding of mobilizing vs. organizing!"
                      : "Review the lessons and try again. You need 80% to pass."}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={resetQuiz} variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                    {quizScore >= 80 && (
                      <Button
                        onClick={() => setCurrentTab("overview")}
                        className="bg-gradient-to-r from-green-600 to-emerald-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} className="w-32" />
                  </div>

                  {/* Question */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4">{currentQuestion.question}</h4>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showExplanation}
                            className={`w-full p-3 text-left rounded-lg border transition-all ${
                              selectedAnswer === index
                                ? showExplanation
                                  ? index === currentQuestion.correctAnswer
                                    ? "bg-green-100 border-green-300 text-green-800"
                                    : "bg-red-100 border-red-300 text-red-800"
                                  : "bg-blue-100 border-blue-300"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                            } ${showExplanation && index === currentQuestion.correctAnswer ? "bg-green-100 border-green-300" : ""}`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                }`}
                              >
                                {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              {option}
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation */}
                  {showExplanation && (
                    <Alert className={`${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div>
                          <div className="font-semibold mb-1">{isCorrect ? "Correct!" : "Incorrect"}</div>
                          <AlertDescription>{currentQuestion.explanation}</AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0 || showExplanation}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={selectedAnswer === undefined}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {showExplanation
                        ? currentQuestionIndex === quizQuestions.length - 1
                          ? "Finish Quiz"
                          : "Next Question"
                        : "Submit Answer"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
