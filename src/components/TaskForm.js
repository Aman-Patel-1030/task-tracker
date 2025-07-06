import { useState, useEffect } from "react"
import { PRIORITY_LEVELS } from "../utils/localStorage"

const TaskForm = ({ onSubmit, onCancel, editingTask, isEditing = false, categories, darkMode }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("medium")
  const [category, setCategory] = useState(1)
  const [tags, setTags] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0, 16) : "")
      setPriority(editingTask.priority)
      setCategory(editingTask.category)
      setTags(editingTask.tags ? editingTask.tags.join(", ") : "")
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Task title is required")
      return
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      completed: editingTask?.completed || false,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      category: Number.parseInt(category),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }

    onSubmit(taskData)

    if (!isEditing) {
      setTitle("")
      setDescription("")
      setDueDate("")
      setPriority("medium")
      setCategory(1)
      setTags("")
    }
    setError("")
  }

  return (
    <div className={`task-form-container ${darkMode ? "dark" : ""}`}>
      <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError("")
              }}
              placeholder="Enter task title"
              className="form-input"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-select"
            >
              {Object.values(PRIORITY_LEVELS).map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Enter task description (optional)"
            className="form-textarea"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="datetime-local"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
            className="form-input"
          />
          <small className="form-help">Separate multiple tags with commas</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          {isEditing && onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
