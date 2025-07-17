"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: "Alex Rodriguez",
    bio: "Passionate motorcycle rider exploring scenic routes across California. Love canyon runs and weekend adventures.",
    location: "Los Angeles, CA",
    profilePic: "/placeholder.svg?height=120&width=120",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/alexrides", username: "@alexrides" },
      { platform: "YouTube", url: "https://youtube.com/alexmotovlogs", username: "Alex Moto Vlogs" },
      { platform: "Strava", url: "https://strava.com/athletes/alexr", username: "Alex R." },
    ],
  })

  // Temporary state for editing
  const [editData, setEditData] = useState(profileData)
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "", username: "" })

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url && newSocialLink.username) {
      setEditData({
        ...editData,
        socialLinks: [...editData.socialLinks, newSocialLink],
      })
      setNewSocialLink({ platform: "", url: "", username: "" })
    }
  }

  const removeSocialLink = (index) => {
    setEditData({
      ...editData,
      socialLinks: editData.socialLinks.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button onClick={() => router.back()} className="geist-button geist-button-secondary">
          ← Back
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="geist-card">
          <div className="flex justify-between items-start mb-6">
            <h1 className="font-medium" style={{ color: "var(--geist-foreground)" }}>
              My Profile
            </h1>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="geist-button geist-button-primary">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="geist-button geist-button-primary">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="geist-button geist-button-secondary">
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Picture Section */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={isEditing ? editData.profilePic : profileData.profilePic}
                alt="Profile"
                className="w-24 h-24 object-cover"
                style={{ border: `2px solid var(--geist-accents-2)` }}
              />
              {isEditing && (
                <button
                  className="absolute -bottom-2 -right-2 w-8 h-8 flex items-center justify-center"
                  style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
                >
                  ✎
                </button>
              )}
            </div>
            <div className="flex-1">
              {!isEditing ? (
                <h2 className="font-medium mb-1" style={{ color: "var(--geist-foreground)" }}>
                  {profileData.name}
                </h2>
              ) : (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="geist-input mb-2"
                  placeholder="Your name"
                />
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-8">
            <h3 className="font-medium mb-3" style={{ color: "var(--geist-foreground)" }}>
              Bio
            </h3>
            {!isEditing ? (
              <p style={{ color: "var(--geist-accents-5)" }}>{profileData.bio}</p>
            ) : (
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                className="geist-input min-h-[80px] resize-none"
                placeholder="Tell us about yourself and your riding style..."
                style={{ height: "80px", padding: "12px" }}
              />
            )}
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <h3 className="font-medium mb-3" style={{ color: "var(--geist-foreground)" }}>
              Location
            </h3>
            {!isEditing ? (
              <p style={{ color: "var(--geist-accents-5)" }}>{profileData.location}</p>
            ) : (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="geist-input"
                placeholder="City, State/Country"
              />
            )}
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="font-medium mb-3" style={{ color: "var(--geist-foreground)" }}>
              Social Links
            </h3>

            <div className="space-y-3 mb-4">
              {(isEditing ? editData.socialLinks : profileData.socialLinks).map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3"
                  style={{ background: "var(--geist-accents-1)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ background: "var(--geist-foreground)", color: "var(--geist-background)" }}
                    >
                      {link.platform.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--geist-foreground)" }}>
                        {link.platform}
                      </p>
                      <p style={{ color: "var(--geist-accents-5)" }}>{link.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isEditing ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="geist-button geist-button-secondary"
                      >
                        Visit
                      </a>
                    ) : (
                      <button
                        onClick={() => removeSocialLink(index)}
                        className="geist-button geist-button-secondary"
                        style={{ color: "var(--geist-error)" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Social Link */}
            {isEditing && (
              <div
                className="p-4"
                style={{ background: "var(--geist-accents-1)", border: `1px dashed var(--geist-accents-3)` }}
              >
                <h4 className="font-medium mb-3" style={{ color: "var(--geist-foreground)" }}>
                  Add Social Link
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Instagram)"
                    value={newSocialLink.platform}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                    className="geist-input"
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={newSocialLink.username}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, username: e.target.value })}
                    className="geist-input"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={newSocialLink.url}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                    className="geist-input"
                  />
                </div>
                <button onClick={addSocialLink} className="geist-button geist-button-primary">
                  Add Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
