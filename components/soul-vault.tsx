"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Lock,
  Shield,
  User,
  Heart,
  FileText,
  Key,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useSoulVault } from "@/components/soul-vault-provider"

interface SoulVaultProps {
  isVisible: boolean
  onClose: () => void
}

interface IdentityAnchor {
  id: string
  type: "name" | "pronouns" | "identity" | "custom"
  label: string
  value: string
  isPrivate: boolean
  lastUpdated: Date
}

interface Document {
  id: string
  name: string
  type: "id" | "medical" | "legal" | "personal"
  size: string
  uploadDate: Date
  isEncrypted: boolean
  tags: string[]
}

interface CarePlan {
  id: string
  title: string
  description: string
  type: "medical" | "mental_health" | "emergency" | "transition"
  priority: "low" | "medium" | "high"
  dueDate?: Date
  isCompleted: boolean
  notes: string
}

export function SoulVault({ isVisible, onClose }: SoulVaultProps) {
  const [activeTab, setActiveTab] = useState("identity")
  const [isEditing, setIsEditing] = useState(false)
  const [vaultPassword, setVaultPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { user, updateUser, isAuthenticated } = useSoulVault()

  const [identityAnchors, setIdentityAnchors] = useState<IdentityAnchor[]>([
    {
      id: "1",
      type: "name",
      label: "Chosen Name",
      value: "Alex",
      isPrivate: false,
      lastUpdated: new Date(),
    },
    {
      id: "2",
      type: "pronouns",
      label: "Pronouns",
      value: "they/them",
      isPrivate: false,
      lastUpdated: new Date(),
    },
    {
      id: "3",
      type: "identity",
      label: "Gender Identity",
      value: "Non-binary",
      isPrivate: true,
      lastUpdated: new Date(),
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Updated ID.pdf",
      type: "id",
      size: "2.4 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      isEncrypted: true,
      tags: ["identity", "legal"],
    },
    {
      id: "2",
      name: "Medical Records.pdf",
      type: "medical",
      size: "1.8 MB",
      uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      isEncrypted: true,
      tags: ["healthcare", "transition"],
    },
  ])

  const [carePlans, setCarePlans] = useState<CarePlan[]>([
    {
      id: "1",
      title: "Hormone Therapy Check-up",
      description: "3-month follow-up appointment with endocrinologist",
      type: "medical",
      priority: "high",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      isCompleted: false,
      notes: "Bring recent lab results",
    },
    {
      id: "2",
      title: "Therapy Session",
      description: "Weekly session with gender-affirming therapist",
      type: "mental_health",
      priority: "medium",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      isCompleted: false,
      notes: "Discuss family dynamics",
    },
  ])

  const handleUnlockVault = () => {
    // In a real implementation, this would verify against encrypted storage
    if (vaultPassword === "demo123" || vaultPassword.length >= 8) {
      setIsUnlocked(true)
      setVaultPassword("")
    }
  }

  const handleAddIdentityAnchor = () => {
    const newAnchor: IdentityAnchor = {
      id: Date.now().toString(),
      type: "custom",
      label: "New Field",
      value: "",
      isPrivate: true,
      lastUpdated: new Date(),
    }
    setIdentityAnchors([...identityAnchors, newAnchor])
    setIsEditing(true)
  }

  const handleUpdateAnchor = (id: string, updates: Partial<IdentityAnchor>) => {
    setIdentityAnchors((anchors) =>
      anchors.map((anchor) => (anchor.id === id ? { ...anchor, ...updates, lastUpdated: new Date() } : anchor)),
    )
  }

  const handleDeleteAnchor = (id: string) => {
    setIdentityAnchors((anchors) => anchors.filter((anchor) => anchor.id !== id))
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "id":
        return "🆔"
      case "medical":
        return "🏥"
      case "legal":
        return "⚖️"
      case "personal":
        return "📄"
      default:
        return "📄"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-red-600"
      case "medium":
        return "from-yellow-500 to-orange-500"
      case "low":
        return "from-green-500 to-green-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  if (!isVisible) return null

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-purple-300 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">SoulVault</CardTitle>
            <p className="text-purple-100 text-sm">Your encrypted personal sanctuary</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Vault Password</h3>
              <p className="text-sm text-gray-600 mb-4">Your personal data is protected with end-to-end encryption</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={vaultPassword}
                  onChange={(e) => setVaultPassword(e.target.value)}
                  placeholder="Enter your vault password"
                  className="pr-10"
                  onKeyPress={(e) => e.key === "Enter" && handleUnlockVault()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              <Button
                onClick={handleUnlockVault}
                disabled={!vaultPassword}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
                size="lg"
              >
                <Key className="w-5 h-5 mr-2" />
                Unlock SoulVault
              </Button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-xs text-gray-600">
                  <p className="font-medium mb-1">Security Features:</p>
                  <ul className="space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Zero-knowledge architecture</li>
                    <li>• Local data storage</li>
                    <li>• Auto-lock after inactivity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">Demo password: "demo123" or any 8+ character password</p>
              <Button variant="ghost" size="sm" onClick={onClose} className="mt-2">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden border-4 border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">SoulVault</h2>
              <p className="text-purple-100 text-sm">Your encrypted personal sanctuary</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="encrypted-badge">
              <Shield className="w-3 h-3 mr-1" />
              E2E Encrypted
            </Badge>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/50">
              <TabsTrigger value="identity" className="text-sm">
                <User className="w-4 h-4 mr-1" />
                Identity
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-sm">
                <FileText className="w-4 h-4 mr-1" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="care-plans" className="text-sm">
                <Heart className="w-4 h-4 mr-1" />
                Care Plans
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">
                <Shield className="w-4 h-4 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Identity Tab */}
            <TabsContent value="identity" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Identity Anchors</h3>
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? "Save Changes" : "Edit"}
                  </Button>
                  <Button
                    onClick={handleAddIdentityAnchor}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {identityAnchors.map((anchor) => (
                  <Card key={anchor.id} className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {isEditing ? (
                            <Input
                              value={anchor.label}
                              onChange={(e) => handleUpdateAnchor(anchor.id, { label: e.target.value })}
                              className="mb-2"
                              placeholder="Field label"
                            />
                          ) : (
                            <h4 className="font-semibold text-gray-800">{anchor.label}</h4>
                          )}

                          {isEditing ? (
                            <Input
                              value={anchor.value}
                              onChange={(e) => handleUpdateAnchor(anchor.id, { value: e.target.value })}
                              placeholder="Field value"
                            />
                          ) : (
                            <p className="text-gray-600">{anchor.value || "Not set"}</p>
                          )}
                        </div>

                        {isEditing && (
                          <Button
                            onClick={() => handleDeleteAnchor(anchor.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={anchor.isPrivate}
                            onCheckedChange={(checked) => handleUpdateAnchor(anchor.id, { isPrivate: checked })}
                            disabled={!isEditing}
                          />
                          <span className="text-sm text-gray-600">{anchor.isPrivate ? "Private" : "Shared"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {anchor.isPrivate ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-xs text-gray-500">
                            Updated {anchor.lastUpdated.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Encrypted Documents</h3>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-500">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getDocumentIcon(doc.type)}</div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{doc.name}</h4>
                            <p className="text-xs text-gray-600">{doc.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Uploaded {doc.uploadDate.toLocaleDateString()}</span>
                          {doc.isEncrypted && (
                            <Badge className="encrypted-badge text-xs">
                              <Lock className="w-2 h-2 mr-1" />
                              Encrypted
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Upload Area */}
                <Card className="liberation-card border-dashed border-2 border-gray-300">
                  <CardContent className="p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-500">All files are automatically encrypted</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Care Plans Tab */}
            <TabsContent value="care-plans" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Care Plans & Goals</h3>
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-500">
                  <Plus className="w-4 h-4 mr-2" />
                  New Care Plan
                </Button>
              </div>

              <div className="space-y-4">
                {carePlans.map((plan) => (
                  <Card key={plan.id} className="liberation-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-800">{plan.title}</h4>
                            <div
                              className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(plan.priority)}`}
                            />
                            <Badge variant="outline" className="text-xs capitalize">
                              {plan.type.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                          {plan.notes && <p className="text-xs text-gray-500 italic">Note: {plan.notes}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          {plan.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {plan.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due {plan.dueDate.toLocaleDateString()}
                            </span>
                          )}
                          <Badge
                            variant={plan.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs capitalize"
                          >
                            {plan.priority} priority
                          </Badge>
                        </div>

                        {!plan.isCompleted && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Vault Settings</h3>

              <div className="space-y-6">
                {/* Security Settings */}
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Security & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-lock vault</h4>
                        <p className="text-sm text-gray-600">Lock vault after 15 minutes of inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Biometric unlock</h4>
                        <p className="text-sm text-gray-600">Use fingerprint or face ID when available</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Anonymous mode</h4>
                        <p className="text-sm text-gray-600">Hide identifying information in shared contexts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Backup & Sync */}
                <Card className="liberation-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-500" />
                      Backup & Recovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Encrypted backup</h4>
                        <p className="text-sm text-gray-600">Create encrypted backup of your vault</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Create Backup
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Recovery phrase</h4>
                        <p className="text-sm text-gray-600">Generate recovery phrase for vault access</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate Phrase
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="liberation-card border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-600">Clear all data</h4>
                        <p className="text-sm text-gray-600">Permanently delete all vault data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Clear Vault
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
