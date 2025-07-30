import type React from "react"

const LittleSpace: React.FC = () => {
  const crisisSupportContact = {
    name: "Aziza Okoro",
    phone: "(205) 390-7506",
  }

  const emergencyContacts = [
    { name: "John Doe", phone: "(205) 390-7506" },
    { name: "Jane Smith", phone: "(205) 390-7506" },
  ]

  return (
    <div>
      <h1>Crisis Support Contact</h1>
      <p>
        {crisisSupportContact.name}: {crisisSupportContact.phone}
      </p>

      <h1>Emergency Contacts</h1>
      <ul>
        {emergencyContacts.map((contact, index) => (
          <li key={index}>
            {contact.name}: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LittleSpace
