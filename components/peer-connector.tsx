import type React from "react"

const PeerConnector: React.FC = () => {
  const peerSupportContact = "Aziza Okoro: (205) 390-7506"
  const crisisSupportPhone = "(205) 390-7506"

  return (
    <div>
      <h1>Peer Support Contact</h1>
      <p>{peerSupportContact}</p>
      <h1>Crisis Support</h1>
      <p>Call {crisisSupportPhone} for immediate assistance.</p>
    </div>
  )
}

export default PeerConnector
