"use client"

import { useState } from "react"
import { saveUser } from "../utils/localStorage"

const Login = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Username is required")
      return
    }

    const user = { username: username.trim() }
    saveUser(user)
    onLogin(username.trim())
  }

  return (
    <div className={`login-container ${darkMode ? "dark" : ""}`}>
      <div className="login-card">
        <div className="login-header">
          <h1>Task Tracker</h1>
          <p>Welcome! Please enter your username to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className = "c" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              placeholder="Enter your username"
              className="form-input"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
