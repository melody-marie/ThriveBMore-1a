"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Lightbulb, ArrowRight, BookOpen, MessageCircle } from "lucide-react"

export default function MobilizerVsOrganizerModule() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-6xl mx-auto shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                Liberation Education
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mobilizers vs Organizers
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Understanding the difference between mobilization and organization through the revolutionary teachings
                of
                <span className="font-semibold text-purple-700"> Kwame Ture (Stokely Carmichael)</span>
              </p>
            </div>

            {/* Key Quote */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-l-4 border-purple-500">
              <blockquote className="text-lg italic text-gray-800">
                "The difference between the mobilizer and the organizer is that the mobilizer gets people to move for
                their immediate interest, but the organizer gets people to move for their ultimate interest."
              </blockquote>
              <cite className="text-purple-700 font-semibold mt-2 block">— Kwame Ture</cite>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="difference" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100">
                <TabsTrigger value="difference" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Core Difference
                </TabsTrigger>
                <TabsTrigger value="impact" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Long-term Impact
                </TabsTrigger>
                <TabsTrigger value="examples" className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Historical Examples
                </TabsTrigger>
                <TabsTrigger value="application" className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Modern Application
                </TabsTrigger>
              </TabsList>

              <TabsContent value="difference" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-red-800">Mobilizers</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          Rally people around <strong>specific issues or moments</strong> — protests, rallies, campaigns
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          Focus on <strong>immediate reactions</strong> to current problems
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          Create <strong>temporary energy</strong> that often fades quickly
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          Vulnerable to <strong>disruption and co-option</strong> by opposing forces
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Organizers</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          Build <strong>sustainable structures and institutions</strong> that outlast moments
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          Focus on <strong>systemic change</strong> and long-term power building
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          Create <strong>lasting foundations</strong> for continued struggle
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          Harder to <strong>dismantle or co-opt</strong> — holds power long-term
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">Key Insight</h4>
                  <p className="text-blue-700">
                    Every organizer must be a good mobilizer — but not all mobilizers can organize sustainably. The goal
                    is to channel mobilization energy into lasting organizational structures.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-yellow-800 mb-4">Mobilization Impact</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">⚡</span>
                          Can bring <strong>reform</strong> but often fades quickly
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">🔄</span>
                          Vulnerable to <strong>disruption</strong> when leadership changes
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">📈</span>
                          Creates <strong>awareness</strong> but may lack follow-through
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600">⏰</span>
                          <strong>Temporary solutions</strong> to systemic problems
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-purple-800 mb-4">Organization Impact</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">🏗️</span>
                          Rooted in <strong>revolutionary, systemic change</strong>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">🛡️</span>
                          <strong>Harder to dismantle</strong> — survives leadership changes
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">⚖️</span>
                          Builds <strong>lasting power</strong> in communities
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">🌱</span>
                          Creates <strong>generational change</strong> and legacy
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="font-bold text-red-800 mb-2">Revolutionary Truth</h4>
                  <p className="text-red-700 text-lg">
                    "Our enemies prefer us mobilized and unorganized. Organization is the real threat to oppressive
                    systems."
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <div className="grid gap-6">
                  <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Million Man March (1995)</h3>
                        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                          Mobilization
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">
                        A powerful mobilization event that brought together hundreds of thousands of Black men in
                        Washington, D.C.
                      </p>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-red-800 text-sm">
                          <strong>Impact:</strong> Created massive awareness and unity, but lacked lasting
                          organizational structures to channel that energy into sustained political power and systemic
                          change.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Malcolm X</h3>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                          Both
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Exemplified both powerful mobilization through speeches and systematic organization through
                        institution building.
                      </p>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 text-sm">
                          <strong>Impact:</strong> Built the Organization of Afro-American Unity, created educational
                          programs, and established international connections that outlasted his individual presence.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-800">Dr. Martin Luther King Jr.</h3>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                          Primarily Mobilizer
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">
                        Legendary mobilizer who could move masses, but organizational follow-through was limited
                        compared to sustained movements.
                      </p>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                          <strong>Analysis:</strong> While SCLC existed, much of the movement's energy was tied to
                          King's individual charisma rather than sustainable institutional structures that could
                          continue without him.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="application" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-pink-800 mb-4">For LGBTQ+ Liberation</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-pink-700 mb-2">Mobilization Examples:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Pride marches and protests</li>
                            <li>• Response to anti-trans legislation</li>
                            <li>• Vigils after hate crimes</li>
                            <li>• Social media campaigns</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-pink-700 mb-2">Organization Examples:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Building LGBTQ+ community centers</li>
                            <li>• Creating mutual aid networks</li>
                            <li>• Establishing legal advocacy orgs</li>
                            <li>• Developing leadership pipelines</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-indigo-800 mb-4">Building ThriveBMore</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-indigo-700 mb-2">Mobilization Elements:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Crisis response and emergency support</li>
                            <li>• Community events and gatherings</li>
                            <li>• Awareness campaigns and outreach</li>
                            <li>• Rapid response to community needs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-indigo-700 mb-2">Organization Elements:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Digital infrastructure and platforms</li>
                            <li>• Sustainable funding and resources</li>
                            <li>• Leadership development programs</li>
                            <li>• Long-term strategic planning</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-3">The ThriveBMore Approach</h4>
                  <p className="text-purple-700 mb-4">
                    We combine the energy of mobilization with the sustainability of organization. Our platform serves
                    as both a rapid response tool for community crises AND a long-term infrastructure for building
                    lasting power.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join Community Discussion
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
