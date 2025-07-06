"use client"
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onToggle, onEdit, onDelete, categories, darkMode }) => {
  if (tasks.length === 0) {
    return (
      <div className={`empty-state ${darkMode ? "dark" : ""}`}>
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add your first task or adjust your filters to see tasks here!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          categories={categories}
          darkMode={darkMode}
        />
      ))}
    </div>
  )
}

export default TaskList
