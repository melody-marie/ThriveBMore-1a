import { ChatWindow } from "./ChatWindow"
import { EmergencyContact } from "./EmergencyContact"

const OmniBotChat = () => {
  const contacts = [
    { name: "Aziza Okoro", phone: "(205) 390-7506" },
    { name: "John Doe", phone: "(205) 390-7506" },
    { name: "Jane Smith", phone: "(205) 390-7506" },
  ]

  return (
    <div>
      <ChatWindow />
      <EmergencyContact contacts={contacts} />
    </div>
  )
}

export default OmniBotChat
