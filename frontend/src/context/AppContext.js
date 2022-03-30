import React from "react"
import axios from "axios"
import { useState } from "react"

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [notes, setNotes] = useState([])

  const API_URL = "/api/users/"
  const API_URL_NOTE = "/api/notes/"

  // Register user
  const register = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData)

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      setMessage(
        error.response && error.response.data && error.response.data.message
      ) ||
        error.message ||
        error.toString()
    }
  }

  // Login user
  const login = async (userData) => {
    try {
      const response = await axios.post(API_URL + "login", userData)

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      setMessage(
        error.response && error.response.data && error.response.data.message
      ) ||
        error.message ||
        error.toString()
    }
  }

  // Logout user
  const logout = async () => {
    await localStorage.removeItem("user")
  }

  // Create new note
  const createNote = async (noteData) => {
    const token = JSON.parse(localStorage.getItem("user")).token

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.post(API_URL_NOTE, noteData, config)

      getNotes()
    } catch (error) {
      setMessage(
        error.response && error.response.data && error.response.data.message
      ) ||
        error.message ||
        error.toString()
    }
  }

  // Get user notes
  const getNotes = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token
    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(API_URL_NOTE, config)

      setLoading(false)
      return setNotes(response.data)
    } catch (error) {
      setLoading(false)
      setMessage(
        error.response && error.response.data && error.response.data.message
      ) ||
        error.message ||
        error.toString()
    }
  }

  // Delete a note
  const deleteNote = async (noteId) => {
    const token = JSON.parse(localStorage.getItem("user")).token
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.delete(API_URL_NOTE + noteId, config)

      getNotes()
    } catch (error) {
      setMessage(
        error.response && error.response.data && error.response.data.message
      ) ||
        error.message ||
        error.toString()
    }
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        register,
        message,
        login,
        logout,
        createNote,
        getNotes,
        deleteNote,
        notes,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContext
