"use client"

import { useState } from "react"

interface VouchRequest {
  id: string
  requesterName: string
  requestDate: string
  vouchersNeeded: number
  vouchersReceived: number
  status: "pending" | "approved" | "rejected"
  urgencyLevel: "normal" | "urgent" | "emergency"
  communityConnections: string[]
}

export default function CommunityVouchDashboard() {
  const [vouchRequests, setVouchRequests] = useState<VouchRequest[]>([
    {
      id: "req_001",
      requesterName: "Alex (they/them)",
      requestDate: "2025-01-26T20:15:00Z",
      vouchersNeeded: 3,
      vouchersReceived: 1,
      status: "pending",
      urgencyLevel: "urgent",
      communityConnections: ["Trans Maryland", "Baltimore Mutual Aid"],
    },
    {
      id: "req_002",
      requesterName: "Jordan (she/her)",
      requestDate: "2025-01-26T19:30:00Z",
      vouchersNeeded: 3,
      vouchersReceived: 3,
      status: "approved",
      urgencyLevel: "normal",
      communityConnections: ["Chase Brexton Community", "Hearts & Homes"],
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<VouchRequest | null>(null)

  const handleVouch = (requestId: string, approve: boolean) => {
    setVouchRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const newVouchersReceived = approve ? req.vouchersReceived + 1 : req.vouchersReceived
          const newStatus = newVouchersReceived >= req.vouchersNeeded ? "approved" : req.status
          return {
            ...req,
            vouchersReceived: newVouchersReceived,
            status: newStatus,
          }
        }
        return req
      }),
    )
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "emergency":
        return "#dc3545"
      case "urgent":
        return "#fd7e14"
      default:
        return "#28a745"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "var(--emerald)"
      case "rejected":
        return "var(--sunset-orange)"
      default:
        return "var(--gold)"
    }
  }

  return (
    <div
      style={{
        background: "rgba(11, 26, 61, 0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        border: "2px solid var(--emerald)",
        boxShadow: "0 0 15px var(--emerald)",
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            color: "var(--emerald)",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            textShadow: "0 0 10px var(--emerald)",
          }}
        >
          🤝 Community Vouch Dashboard
        </h2>
        <p style={{ color: "var(--text-light)", opacity: "0.9" }}>
          Help community members gain verified access through collective validation
        </p>
      </div>

      {/* Stats Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(2, 138, 15, 0.2)",
            border: "2px solid var(--emerald)",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
          <div style={{ color: "var(--emerald)", fontWeight: "600", fontSize: "1.2rem" }}>12</div>
          <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Verified This Week</div>
        </div>

        <div
          style={{
            background: "rgba(244, 196, 48, 0.2)",
            border: "2px solid var(--gold)",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
          <div style={{ color: "var(--gold)", fontWeight: "600", fontSize: "1.2rem" }}>5</div>
          <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Pending Review</div>
        </div>

        <div
          style={{
            background: "rgba(255, 111, 60, 0.2)",
            border: "2px solid var(--sunset-orange)",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚨</div>
          <div style={{ color: "var(--sunset-orange)", fontWeight: "600", fontSize: "1.2rem" }}>2</div>
          <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Urgent Requests</div>
        </div>
      </div>

      {/* Vouch Requests */}
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            color: "var(--gold)",
            fontSize: "1.3rem",
            marginBottom: "1rem",
            textShadow: "0 0 6px var(--gold)",
          }}
        >
          Active Vouch Requests
        </h3>

        <div style={{ display: "grid", gap: "1rem" }}>
          {vouchRequests.map((request) => (
            <div
              key={request.id}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: `2px solid ${getStatusColor(request.status)}`,
                borderRadius: "15px",
                padding: "1.5rem",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h4
                    style={{
                      color: "var(--text-light)",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {request.requesterName}
                  </h4>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-light)",
                      opacity: "0.8",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Requested: {new Date(request.requestDate).toLocaleDateString()}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      background: getUrgencyColor(request.urgencyLevel),
                      color: "white",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {request.urgencyLevel}
                  </span>

                  <span
                    style={{
                      background: getStatusColor(request.status),
                      color: "var(--midnight-blue)",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    color: "var(--gold)",
                    fontWeight: "600",
                  }}
                >
                  Vouchers: {request.vouchersReceived}/{request.vouchersNeeded}
                </div>

                <div
                  style={{
                    background: "rgba(244, 196, 48, 0.2)",
                    borderRadius: "10px",
                    padding: "0.3rem 0.8rem",
                    fontSize: "0.8rem",
                    color: "var(--text-light)",
                  }}
                >
                  Progress: {Math.round((request.vouchersReceived / request.vouchersNeeded) * 100)}%
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-light)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Community Connections:
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {request.communityConnections.map((connection, index) => (
                    <span
                      key={index}
                      style={{
                        background: "var(--emerald)",
                        color: "var(--text-light)",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                      }}
                    >
                      {connection}
                    </span>
                  ))}
                </div>
              </div>

              {request.status === "pending" && (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => handleVouch(request.id, false)}
                    style={{
                      background: "transparent",
                      border: "2px solid var(--sunset-orange)",
                      color: "var(--sunset-orange)",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    ❌ Cannot Vouch
                  </button>

                  <button
                    onClick={() => handleVouch(request.id, true)}
                    style={{
                      background: "var(--emerald)",
                      border: "2px solid var(--emerald)",
                      color: "var(--text-light)",
                      padding: "0.8rem 1.5rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    ✅ Vouch for Member
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div
        style={{
          background: "rgba(2, 138, 15, 0.1)",
          border: "2px solid var(--emerald)",
          borderRadius: "15px",
          padding: "1.5rem",
        }}
      >
        <h4
          style={{
            color: "var(--emerald)",
            fontSize: "1.1rem",
            marginBottom: "1rem",
            textShadow: "0 0 6px var(--emerald)",
          }}
        >
          🌟 Community Vouch Guidelines
        </h4>

        <ul
          style={{
            paddingLeft: "1.5rem",
            lineHeight: "1.6",
            color: "var(--text-light)",
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Only vouch for people you know personally</strong> through community connections, shared spaces, or
            mutual organizing
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Consider their history of community engagement</strong> - have they participated in mutual aid,
            activism, or support networks?
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Prioritize urgent/emergency requests</strong> - crisis situations require faster community response
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>When in doubt, don't vouch</strong> - it's better to be cautious than compromise community safety
          </li>
          <li>
            <strong>Report suspicious requests</strong> to community moderators immediately
          </li>
        </ul>
      </div>
    </div>
  )
}
