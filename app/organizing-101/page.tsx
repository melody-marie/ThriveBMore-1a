"use client"

import { ExternalLink, Download, Play } from "lucide-react"
import MobilizerVsOrganizerModule from "@/components/mobilizer-vs-organizer-module"

const screens = [
  {
    title: "🔥 The Spark",
    heading: "A Mobilizer Awakens the Crowd",
    content: `Mobilizers are fire-starters. They rally folks around an issue—protests, social media surges, marches. Think: the Million Man March, George Floyd uprisings, or #TransLivesMatter trending. 

🔥 Energy is real—but it's temporary unless rooted.`,
  },
  {
    title: "🛠️ The Architect",
    heading: "An Organizer Builds What Lasts",
    content: `Organizers create the systems behind the scenes. They hold people *after* the protests. They build safe housing, digital platforms, community care pods, legal teams, healing spaces. 

🏗️ No glamour—just survival and sovereignty.`,
  },
  {
    title: "🪞 What Role Do You Play?",
    heading: "Find Yourself in the Work",
    content: `Are you the voice on the mic, the one who gets folks moving? Or are you the steady hand keeping systems flowing long after the noise dies down? 

Both are needed. But if you want the system to fall, you must build one stronger.`,
    choices: ["I Mobilize First", "I Build From the Ground Up", "I Do Both"],
  },
  {
    title: "📦 Download the Blueprint",
    heading: "Kwame Ture's Words Still Build Us",
    content: `Kwame Ture taught us: "An organizer must be a mobilizer. But a mobilizer is not always an organizer." 

Watch his original speech, download the workbook, and start building.`,
    links: [
      { label: "📺 Watch the Speech", url: "https://www.youtube.com/watch?v=example", icon: Play },
      { label: "📘 Download the Organizer Workbook", url: "/resources/organizer-workbook.pdf", icon: Download },
      { label: "🔧 Start a Project", url: "/community/projects", icon: ExternalLink },
    ],
  },
]

export default function Organizing101Page() {
  return <MobilizerVsOrganizerModule />
}
