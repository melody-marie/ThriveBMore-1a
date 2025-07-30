"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DollarSign,
  PiggyBank,
  TrendingUp,
  Users,
  Heart,
  Shield,
  BookOpen,
  Target,
  CreditCard,
  Wallet,
  Building,
  Coins,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  X,
  Lock,
  Eye,
  EyeOff,
  Calculator,
  FileText,
  Share2,
  Settings,
  HelpCircle,
  Star,
  Zap,
  Globe,
  MapPin,
  Phone,
} from "lucide-react"

interface FinancialPortalProps {
  isVisible: boolean
  onClose: () => void
}

interface Transaction {
  id: string
  type: "income" | "expense" | "mutual_aid_sent" | "mutual_aid_received" | "investment" | "savings"
  amount: number
  description: string
  category: string
  date: string
  encrypted: boolean
  anonymous?: boolean
}

interface MutualAidRequest {
  id: string
  requester: string
  amount: number
  purpose: string
  urgency: "low" | "medium" | "high" | "critical"
  description: string
  goal: number
  raised: number
  contributors: number
  deadline: string
  verified: boolean
  anonymous: boolean
  tags: string[]
}

interface FinancialGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  category: "emergency" | "transition" | "education" | "housing" | "healthcare" | "other"
  priority: "low" | "medium" | "high"
}

interface CommunityInvestment {
  id: string
  name: string
  description: string
  type: "cooperative" | "mutual_aid_fund" | "community_business" | "education_fund"
  minimumInvestment: number
  expectedReturn: string
  riskLevel: "low" | "medium" | "high"
  socialImpact: string
  participants: number
  totalRaised: number
  goal: number
}

export function FinancialPortal({ isVisible, onClose }: FinancialPortalProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showBalance, setShowBalance] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [mutualAidRequests, setMutualAidRequests] = useState<MutualAidRequest[]>([])
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([])
  const [communityInvestments, setCommunityInvestments] = useState<CommunityInvestment[]>([])
  const [newTransactionDialog, setNewTransactionDialog] = useState(false)
  const [newGoalDialog, setNewGoalDialog] = useState(false)
  const [newMutualAidDialog, setNewMutualAidDialog] = useState(false)

  // Sample data
  useEffect(() => {
    setTransactions([
      {
        id: "1",
        type: "income",
        amount: 2400,
        description: "Monthly Salary",
        category: "Employment",
        date: "2024-01-15",
        encrypted: true,
      },
      {
        id: "2",
        type: "expense",
        amount: 800,
        description: "Rent Payment",
        category: "Housing",
        date: "2024-01-01",
        encrypted: true,
      },
      {
        id: "3",
        type: "mutual_aid_sent",
        amount: 50,
        description: "Emergency fund for Alex",
        category: "Mutual Aid",
        date: "2024-01-10",
        encrypted: true,
        anonymous: true,
      },
      {
        id: "4",
        type: "mutual_aid_received",
        amount: 100,
        description: "Transition fund support",
        category: "Mutual Aid",
        date: "2024-01-05",
        encrypted: true,
      },
    ])

    setMutualAidRequests([
      {
        id: "1",
        requester: "Jordan (they/them)",
        amount: 500,
        purpose: "Emergency Medical Bills",
        urgency: "critical",
        description: "Need help covering unexpected ER visit costs after insurance. Any amount helps.",
        goal: 500,
        raised: 320,
        contributors: 12,
        deadline: "2024-02-01",
        verified: true,
        anonymous: false,
        tags: ["healthcare", "emergency", "trans"],
      },
      {
        id: "2",
        requester: "Anonymous",
        amount: 200,
        purpose: "Transition Fund",
        urgency: "medium",
        description: "Saving for gender-affirming care. Every dollar brings me closer to being myself.",
        goal: 2000,
        raised: 450,
        contributors: 8,
        deadline: "2024-06-01",
        verified: true,
        anonymous: true,
        tags: ["transition", "healthcare", "long-term"],
      },
      {
        id: "3",
        requester: "Sam (he/him)",
        amount: 150,
        purpose: "Job Interview Clothes",
        urgency: "high",
        description: "Need professional attire for upcoming job interviews. Starting fresh after coming out.",
        goal: 300,
        raised: 75,
        contributors: 3,
        deadline: "2024-01-25",
        verified: true,
        anonymous: false,
        tags: ["employment", "clothing", "career"],
      },
    ])

    setFinancialGoals([
      {
        id: "1",
        name: "Emergency Fund",
        target: 3000,
        current: 1200,
        deadline: "2024-12-31",
        category: "emergency",
        priority: "high",
      },
      {
        id: "2",
        name: "Transition Savings",
        target: 5000,
        current: 2100,
        deadline: "2024-08-01",
        category: "transition",
        priority: "high",
      },
      {
        id: "3",
        name: "Education Fund",
        target: 2000,
        current: 500,
        deadline: "2024-09-01",
        category: "education",
        priority: "medium",
      },
    ])

    setCommunityInvestments([
      {
        id: "1",
        name: "Trans Housing Cooperative",
        description: "Community-owned housing for LGBTQ+ individuals in Baltimore",
        type: "cooperative",
        minimumInvestment: 100,
        expectedReturn: "3-5% annually + housing security",
        riskLevel: "low",
        socialImpact: "Provides affordable, safe housing for 20+ community members",
        participants: 45,
        totalRaised: 125000,
        goal: 200000,
      },
      {
        id: "2",
        name: "Liberation Business Fund",
        description: "Supporting LGBTQ+ owned businesses in Baltimore",
        type: "community_business",
        minimumInvestment: 50,
        expectedReturn: "5-8% annually",
        riskLevel: "medium",
        socialImpact: "Creates jobs and economic opportunities in our community",
        participants: 78,
        totalRaised: 85000,
        goal: 150000,
      },
      {
        id: "3",
        name: "Emergency Mutual Aid Pool",
        description: "Rapid response fund for community crises",
        type: "mutual_aid_fund",
        minimumInvestment: 25,
        expectedReturn: "Social impact only",
        riskLevel: "low",
        socialImpact: "Provides immediate support for 100+ emergency requests monthly",
        participants: 156,
        totalRaised: 45000,
        goal: 75000,
      },
    ])
  }, [])

  const totalBalance = 3250
  const monthlyIncome = 2400
  const monthlyExpenses = 1850
  const mutualAidContributed = 150
  const mutualAidReceived = 200

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return AlertCircle
      case "transition":
        return Heart
      case "education":
        return BookOpen
      case "housing":
        return Building
      case "healthcare":
        return Shield
      default:
        return Target
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden liberation-card mystical-glow">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Liberation Financial Portal</h2>
                <p className="text-green-100">Community-Centered Financial Empowerment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white">
                <Lock className="w-3 h-3 mr-1" />
                Bank-Level Encryption
              </Badge>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-muted/30 p-4 border-r">
            <nav className="space-y-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "transactions" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("transactions")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Transactions
              </Button>
              <Button
                variant={activeTab === "mutual-aid" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("mutual-aid")}
              >
                <Heart className="w-4 h-4 mr-2" />
                Mutual Aid
              </Button>
              <Button
                variant={activeTab === "goals" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("goals")}
              >
                <Target className="w-4 h-4 mr-2" />
                Financial Goals
              </Button>
              <Button
                variant={activeTab === "investments" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("investments")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Community Investments
              </Button>
              <Button
                variant={activeTab === "education" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("education")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Financial Education
              </Button>
              <Button
                variant={activeTab === "resources" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("resources")}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Resources
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "dashboard" && (
              <div className="p-6 space-y-6">
                {/* Balance Overview */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Balance</p>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">
                              {showBalance ? `$${totalBalance.toLocaleString()}` : "••••••"}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setShowBalance(!showBalance)}
                            >
                              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <Wallet className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Income</p>
                          <p className="text-2xl font-bold text-green-600">+${monthlyIncome.toLocaleString()}</p>
                        </div>
                        <ArrowUpRight className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                          <p className="text-2xl font-bold text-red-600">-${monthlyExpenses.toLocaleString()}</p>
                        </div>
                        <ArrowDownRight className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Net Savings</p>
                          <p className="text-2xl font-bold text-blue-600">
                            +${(monthlyIncome - monthlyExpenses).toLocaleString()}
                          </p>
                        </div>
                        <PiggyBank className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mutual Aid Summary */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        Mutual Aid Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Contributed This Month</span>
                        <span className="font-semibold text-pink-600">${mutualAidContributed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Received This Month</span>
                        <span className="font-semibold text-green-600">${mutualAidReceived}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Community Members Helped</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <Badge className="w-full justify-center bg-pink-100 text-pink-800">
                        <Heart className="w-3 h-3 mr-1" />
                        Community Care Champion
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        Goal Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {financialGoals.slice(0, 2).map((goal) => {
                        const progress = (goal.current / goal.target) * 100
                        const IconComponent = getCategoryIcon(goal.category)
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                <span className="text-sm font-medium">{goal.name}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "income"
                                  ? "bg-green-100 text-green-600"
                                  : transaction.type === "expense"
                                    ? "bg-red-100 text-red-600"
                                    : transaction.type.includes("mutual_aid")
                                      ? "bg-pink-100 text-pink-600"
                                      : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpRight className="w-5 h-5" />
                              ) : transaction.type === "expense" ? (
                                <ArrowDownRight className="w-5 h-5" />
                              ) : transaction.type.includes("mutual_aid") ? (
                                <Heart className="w-5 h-5" />
                              ) : (
                                <Coins className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.category} • {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                transaction.type === "income" || transaction.type === "mutual_aid_received"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.type === "income" || transaction.type === "mutual_aid_received" ? "+" : "-"}$
                              {transaction.amount.toLocaleString()}
                            </p>
                            {transaction.encrypted && (
                              <Badge variant="secondary" className="text-xs">
                                <Lock className="w-2 h-2 mr-1" />
                                Encrypted
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "mutual-aid" && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Community Mutual Aid</h3>
                    <p className="text-muted-foreground">Supporting each other through financial solidarity</p>
                  </div>
                  <Dialog open={newMutualAidDialog} onOpenChange={setNewMutualAidDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                        <Plus className="w-4 h-4 mr-2" />
                        Request Support
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Request Mutual Aid</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Amount Needed</Label>
                          <Input id="amount" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="purpose">Purpose</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="emergency">Emergency</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="transition">Transition Fund</SelectItem>
                              <SelectItem value="housing">Housing</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Tell your story..." />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="anonymous" />
                          <Label htmlFor="anonymous">Request anonymously</Label>
                        </div>
                        <Button className="w-full">Submit Request</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {mutualAidRequests.map((request) => (
                    <Card key={request.id} className="liberation-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {request.anonymous ? "?" : request.requester.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{request.requester}</h4>
                              <p className="text-sm text-muted-foreground">{request.purpose}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getUrgencyColor(request.urgency)} text-white`}>
                              {request.urgency}
                            </Badge>
                            {request.verified && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{request.description}</p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              ${request.raised.toLocaleString()} / ${request.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(request.raised / request.goal) * 100} className="h-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{request.contributors} contributors</span>
                            <span>Deadline: {request.deadline}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {request.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">
                            <Heart className="w-4 h-4 mr-2" />
                            Contribute
                          </Button>
                          <Button variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "goals" && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Financial Goals</h3>
                    <p className="text-muted-foreground">Track your progress toward financial liberation</p>
                  </div>
                  <Dialog open={newGoalDialog} onOpenChange={setNewGoalDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create Financial Goal</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="goalName">Goal Name</Label>
                          <Input id="goalName" placeholder="Emergency Fund" />
                        </div>
                        <div>
                          <Label htmlFor="targetAmount">Target Amount</Label>
                          <Input id="targetAmount" type="number" placeholder="3000" />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="emergency">Emergency Fund</SelectItem>
                              <SelectItem value="transition">Transition Fund</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="housing">Housing</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="deadline">Target Date</Label>
                          <Input id="deadline" type="date" />
                        </div>
                        <Button className="w-full">Create Goal</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {financialGoals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100
                    const IconComponent = getCategoryIcon(goal.category)
                    return (
                      <Card key={goal.id} className="liberation-card">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  goal.priority === "high"
                                    ? "bg-red-100 text-red-600"
                                    : goal.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-green-100 text-green-600"
                                }`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{goal.name}</CardTitle>
                                <p className="text-sm text-muted-foreground capitalize">{goal.category}</p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                goal.priority === "high"
                                  ? "destructive"
                                  : goal.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {goal.priority}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>
                                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={progress} className="h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{progress.toFixed(1)}% complete</span>
                              <span>Due: {goal.deadline}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Funds
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "investments" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Community Investments</h3>
                  <p className="text-muted-foreground">Invest in community-owned projects and liberation economics</p>
                </div>

                <div className="grid gap-6">
                  {communityInvestments.map((investment) => (
                    <Card key={investment.id} className="liberation-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold mb-2">{investment.name}</h4>
                            <p className="text-gray-700 mb-3">{investment.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline" className="capitalize">
                                {investment.type.replace("_", " ")}
                              </Badge>
                              <span>Min: ${investment.minimumInvestment}</span>
                              <Badge
                                className={`${
                                  investment.riskLevel === "low"
                                    ? "bg-green-100 text-green-800"
                                    : investment.riskLevel === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {investment.riskLevel} risk
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">{investment.expectedReturn}</p>
                            <p className="text-sm text-muted-foreground">Expected Return</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Funding Progress</span>
                            <span>
                              ${investment.totalRaised.toLocaleString()} / ${investment.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={(investment.totalRaised / investment.goal) * 100} className="h-2" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{investment.participants} participants</span>
                            <span>{((investment.totalRaised / investment.goal) * 100).toFixed(1)}% funded</span>
                          </div>
                        </div>

                        <Alert className="mb-4">
                          <Star className="w-4 h-4" />
                          <AlertDescription>
                            <strong>Social Impact:</strong> {investment.socialImpact}
                          </AlertDescription>
                        </Alert>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                            <Coins className="w-4 h-4 mr-2" />
                            Invest Now
                          </Button>
                          <Button variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Financial Education</h3>
                  <p className="text-muted-foreground">Build financial literacy for liberation and empowerment</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PiggyBank className="w-5 h-5 text-blue-500" />
                        Budgeting Basics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn to create and maintain a budget that works for your lifestyle and goals.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>3/5 lessons</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        Emergency Funds
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Build financial security with emergency savings strategies.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>1/4 lessons</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        Investment Basics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Understand investing fundamentals and community investment options.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>0/6 lessons</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        Mutual Aid Economics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn about community care and mutual aid financial strategies.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>2/3 lessons</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-orange-500" />
                        Credit & Debt
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Navigate credit building and debt management strategies.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>0/5 lessons</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Start Course
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-cyan-500" />
                        Financial Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Master financial calculators and planning tools.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>4/4 lessons</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <Button size="sm" className="w-full bg-green-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Financial Calculators */}
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Financial Calculators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center bg-transparent"
                      >
                        <PiggyBank className="w-6 h-6 mb-2" />
                        <span className="text-sm">Savings Calculator</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center bg-transparent"
                      >
                        <Building className="w-6 h-6 mb-2" />
                        <span className="text-sm">Debt Payoff</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center bg-transparent"
                      >
                        <TrendingUp className="w-6 h-6 mb-2" />
                        <span className="text-sm">Investment Growth</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Financial Resources</h3>
                  <p className="text-muted-foreground">LGBTQ+ friendly financial services and support</p>
                </div>

                <div className="grid gap-6">
                  {/* Emergency Financial Assistance */}
                  <Card className="liberation-card border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <AlertCircle className="w-5 h-5" />
                        Emergency Financial Assistance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-semibold">Trans Lifeline Microgrants</h5>
                          <p className="text-sm text-muted-foreground">Emergency funds for trans individuals</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4" />
                            <span>(877) 565-8860</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold">Point of Pride</h5>
                          <p className="text-sm text-muted-foreground">Chest binder and transition fund assistance</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4" />
                            <span>pointofpride.org</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* LGBTQ+ Friendly Financial Services */}
                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-500" />
                        LGBTQ+ Friendly Financial Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="font-semibold">Aspiration Bank</h5>
                          <p className="text-sm text-muted-foreground">
                            Socially conscious banking with LGBTQ+ support
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>No fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Ethical investing</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>LGBTQ+ affirming</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-semibold">Daylight</h5>
                          <p className="text-sm text-muted-foreground">Digital banking designed for LGBTQ+ community</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Name change support</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Community features</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Financial education</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Local Baltimore Resources */}
                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-500" />
                        Baltimore Financial Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                          <Building className="w-8 h-8 text-blue-500 mt-1" />
                          <div className="flex-1">
                            <h5 className="font-semibold">Baltimore Community Lending</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Community development financial institution serving Baltimore
                            </p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>2201 N Charles St, Baltimore, MD 21218</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>(410) 837-9000</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                          <Users className="w-8 h-8 text-green-500 mt-1" />
                          <div className="flex-1">
                            <h5 className="font-semibold">CASH Campaign of Maryland</h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Free tax preparation and financial counseling
                            </p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Multiple locations in Baltimore</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>(410) 234-8008</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Wellness Resources */}
                  <Card className="liberation-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-orange-500" />
                        Financial Wellness Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h5 className="font-semibold">Books & Guides</h5>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>"Your Money or Your Life" by Vicki Robin</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>"The Index Card" by Helaine Olen</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>"Broke Millennial" by Erin Lowry</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-semibold">Apps & Tools</h5>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              <span>Mint - Budget tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              <span>YNAB - Zero-based budgeting</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              <span>Acorns - Micro-investing</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
