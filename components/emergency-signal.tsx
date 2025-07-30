import type React from "react"

const EmergencySignal: React.FC = () => {
  const emergencyContact = "Aziza Okoro: (205) 390-7506"
  const crisisSupportNumber = "(205) 390-7506"

  return (
    <div>
      <h1>Emergency Signal</h1>
      <p>Contact: {emergencyContact}</p>
      <p>Crisis Support: {crisisSupportNumber}</p>
      {/* rest of code here */}
    </div>
  )
}

export default EmergencySignal
