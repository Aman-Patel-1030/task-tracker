import { useState, useEffect, useMemo } from "react"
import Login from "./components/Login"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import TaskFilter from "./components/TaskFilter"
import {
  getUser,
  removeUser,
  getTasks,
  saveTasks,
  getCategories,
  getSettings,
  saveSettings,
  generateId,
  getSampleTasks,
  PRIORITY_LEVELS,
} from "./utils/localStorage"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [editingTask, setEditingTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")

  // Load data on component mount
  useEffect(() => {
    const savedUser = getUser()
    const savedTasks = getTasks()
    const savedCategories = getCategories()
    const savedSettings = getSettings()

    if (savedUser) {
      setUser(savedUser.username)
    }

    // Load sample tasks if no tasks exist
    if (savedTasks.length === 0) {
      const sampleTasks = getSampleTasks()
      setTasks(sampleTasks)
      saveTasks(sampleTasks)
    } else {
      setTasks(savedTasks)
    }

    setCategories(savedCategories)
    setDarkMode(savedSettings.darkMode)
    setIsLoading(false)
  }, [])

  // Save settings when dark mode changes
  useEffect(() => {
    const settings = { darkMode }
    saveSettings(settings)
  }, [darkMode])

  const handleLogin = (username) => {
    setUser(username)
  }

  const handleLogout = () => {
    removeUser()
    setUser(null)
    setTasks([])
    setEditingTask(null)
    setActiveFilter("all")
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedPriority("")
  }

  const handleAddTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleEditTask = (taskData) => {
    if (!editingTask) return

    const updatedTasks = tasks.map((task) => (task.id === editingTask.id ? { ...task, ...taskData } : task))

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
    setEditingTask(null)
  }

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Enhanced filtering logic
  const filteredTasks = useMemo(() => {
    let filtered = tasks

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((task) => task.category === Number.parseInt(selectedCategory))
    }

    // Priority filter
    if (selectedPriority) {
      filtered = filtered.filter((task) => task.priority === selectedPriority)
    }

    // Status filter
    const now = new Date()
    switch (activeFilter) {
      case "completed":
        return filtered.filter((task) => task.completed)
      case "pending":
        return filtered.filter((task) => !task.completed)
      case "overdue":
        return filtered.filter((task) => !task.completed && task.dueDate && new Date(task.dueDate) < now)
      case "due-today":
        return filtered.filter((task) => {
          if (!task.dueDate || task.completed) return false
          const dueDate = new Date(task.dueDate)
          return dueDate.toDateString() === now.toDateString()
        })
      default:
        return filtered
    }
  }, [tasks, searchTerm, selectedCategory, selectedPriority, activeFilter])

  // Sort tasks by priority and due date
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      // Sort by priority
      const aPriority = PRIORITY_LEVELS[a.priority?.toUpperCase()]?.order || 2
      const bPriority = PRIORITY_LEVELS[b.priority?.toUpperCase()]?.order || 2

      if (aPriority !== bPriority) {
        return bPriority - aPriority // Higher priority first
      }

      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1

      // Sort by creation date
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [filteredTasks])

  // Calculate task counts
  const taskCounts = useMemo(() => {
    const now = new Date()
    return {
      all: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
      overdue: tasks.filter((task) => !task.completed && task.dueDate && new Date(task.dueDate) < now).length,
      dueToday: tasks.filter((task) => {
        if (!task.dueDate || task.completed) return false
        const dueDate = new Date(task.dueDate)
        return dueDate.toDateString() === now.toDateString()
      }).length,
    }
  }, [tasks])

  if (isLoading) {
    return (
      <div className={`loading-screen ${darkMode ? "dark" : ""}`}>
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} darkMode={darkMode} />
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content backgr">
          <div className="header-left">
            <h1>Task Tracker</h1>
            <p>Welcome back, {user}!</p>
          </div>
          <div className="header-right">
            <button
              onClick={toggleDarkMode}
              className="btn btn-icon"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onCancel={editingTask ? handleCancelEdit : undefined}
          editingTask={editingTask}
          isEditing={!!editingTask}
          categories={categories}
          darkMode={darkMode}
        />

        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          categories={categories}
          darkMode={darkMode}
        />

        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          categories={categories}
          darkMode={darkMode}
        />
      </main>
    </div>
  )
}

export default App
