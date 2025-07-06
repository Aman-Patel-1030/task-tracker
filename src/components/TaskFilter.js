"use client"

import { useState } from "react"
import { PRIORITY_LEVELS } from "../utils/localStorage"

const TaskFilter = ({
  activeFilter,
  onFilterChange,
  taskCounts,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  categories,
  darkMode,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const filters = [
    { key: "all", label: "All", count: taskCounts.all },
    { key: "pending", label: "Pending", count: taskCounts.pending },
    { key: "completed", label: "Completed", count: taskCounts.completed },
    { key: "overdue", label: "Overdue", count: taskCounts.overdue },
    { key: "due-today", label: "Due Today", count: taskCounts.dueToday },
  ]

  return (
    <div className={`task-filter ${darkMode ? "dark" : ""}`}>
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="btn btn-secondary" onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? "Hide Filters" : "More Filters"}
        </button>
      </div>

      {/* Basic Filters */}
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-tab ${activeFilter === filter.key ? "active" : ""}`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Priority:</label>
              <select
                value={selectedPriority}
                onChange={(e) => onPriorityChange(e.target.value)}
                className="form-select"
              >
                <option value="">All Priorities</option>
                {Object.values(PRIORITY_LEVELS).map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => {
                onSearchChange("")
                onCategoryChange("")
                onPriorityChange("")
                onFilterChange("all")
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskFilter
