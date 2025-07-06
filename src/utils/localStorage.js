// Enhanced localStorage utilities with new features

// User management
export const saveUser = (user) => {
  localStorage.setItem("taskTracker_user", JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem("taskTracker_user")
  return user ? JSON.parse(user) : null
}

export const removeUser = () => {
  localStorage.removeItem("taskTracker_user")
}

// Settings management (for dark mode, etc.)
export const saveSettings = (settings) => {
  localStorage.setItem("taskTracker_settings", JSON.stringify(settings))
}

export const getSettings = () => {
  const settings = localStorage.getItem("taskTracker_settings")
  return settings ? JSON.parse(settings) : { darkMode: false }
}

// Task management with enhanced features
export const saveTasks = (tasks) => {
  localStorage.setItem("taskTracker_tasks", JSON.stringify(tasks))
}

export const getTasks = () => {
  const tasks = localStorage.getItem("taskTracker_tasks")
  return tasks ? JSON.parse(tasks) : []
}

// Categories management
export const saveCategories = (categories) => {
  localStorage.setItem("taskTracker_categories", JSON.stringify(categories))
}

export const getCategories = () => {
  const categories = localStorage.getItem("taskTracker_categories")
  return categories
    ? JSON.parse(categories)
    : [
        { id: 1, name: "Work", color: "#3B82F6" },
        { id: 2, name: "Personal", color: "#10B981" },
        { id: 3, name: "Shopping", color: "#F59E0B" },
        { id: 4, name: "Health", color: "#EF4444" },
      ]
}

export const generateId = () => {
  return Date.now() + Math.random()
}

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: { value: "low", label: "Low", color: "#10B981", order: 1 },
  MEDIUM: { value: "medium", label: "Medium", color: "#F59E0B", order: 2 },
  HIGH: { value: "high", label: "High", color: "#EF4444", order: 3 },
}

// Sample tasks with new features
export const getSampleTasks = () => [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application with all bonus features",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    dueDate: "2024-01-20T23:59:00Z",
    priority: "high",
    category: 1,
    tags: ["react", "assignment", "coding"],
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features and modern JavaScript",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
    dueDate: null,
    priority: "medium",
    category: 1,
    tags: ["javascript", "learning"],
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Milk, bread, eggs, and vegetables",
    completed: false,
    createdAt: "2024-01-16T09:00:00Z",
    dueDate: "2024-01-17T18:00:00Z",
    priority: "low",
    category: 3,
    tags: ["shopping", "food"],
  },
]
