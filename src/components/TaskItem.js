"use client"

import { useState } from "react"
import { PRIORITY_LEVELS } from "../utils/localStorage"

const TaskItem = ({ task, onToggle, onEdit, onDelete, categories, darkMode }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

  const formatDueDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `Due in ${diffDays} days`
  }

  const isDueToday = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const now = new Date()
    return date.toDateString() === now.toDateString()
  }

  const isOverdue = (dateString) => {
    if (!dateString) return false
    return new Date(dateString) < new Date()
  }

  const handleDelete = () => {
    onDelete(task.id)
    setShowDeleteConfirm(false)
  }

  const priority = PRIORITY_LEVELS[task.priority?.toUpperCase()] || PRIORITY_LEVELS.MEDIUM
  const category = categories.find((cat) => cat.id === task.category)

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} ${darkMode ? "dark" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox">
            <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="checkbox" />
          </div>

          <div className="task-main">
            <div className="task-title-row">
              <h3 className={`task-title ${task.completed ? "completed" : ""}`}>{task.title}</h3>
              <div className="task-badges">
                <span className="priority-badge" style={{ backgroundColor: priority.color }}>
                  {priority.label}
                </span>
                {category && (
                  <span className="category-badge" style={{ backgroundColor: category.color }}>
                    {category.name}
                  </span>
                )}
              </div>
            </div>

            {task.description && (
              <p className={`task-description ${task.completed ? "completed" : ""}`}>{task.description}</p>
            )}

            <div className="task-meta">
              <span className="created-date">Created: {formatDate(task.createdAt)}</span>
              {task.dueDate && (
                <span
                  className={`due-date ${isOverdue(task.dueDate) ? "overdue" : ""} ${isDueToday(task.dueDate) ? "due-today" : ""}`}
                >
                  {formatDueDate(task.dueDate)}
                </span>
              )}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div className="task-tags">
                {task.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn-icon edit" title="Edit task">
            ✏️
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} className="btn-icon delete" title="Delete task">
            🗑️
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this task?</p>
          <div className="confirm-actions">
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
            <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
