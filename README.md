# Personal Task Tracker 📝

A modern, feature-rich personal task management application built with React.js. This project includes all core requirements plus advanced bonus features like search, priority levels, due dates, dark mode, and more!

![Task Tracker Preview](https://task-tracker-9o7l.vercel.app/)

## 🌟 Features

### Core Features ✅
- **Simple Login**: Username-based authentication with localStorage persistence
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Task Display**: Shows title, description, completion status, and creation date
- **Task Filtering**: Filter by All, Completed, Pending, Overdue, and Due Today
- **Data Persistence**: All data automatically saved to localStorage
- **Responsive Design**: Optimized for both mobile and desktop devices

### Bonus Features 🎉
- **🔍 Search Functionality**: Real-time search through task titles, descriptions, and tags
- **🎯 Task Priority Levels**: High, Medium, Low priorities with color coding and smart sorting
- **📅 Due Dates**: Set due dates with visual indicators for overdue and due-today tasks
- **🎨 Smooth Animations**: Fade-in effects, hover transitions, and smooth UI interactions
- **🌙 Dark Mode Toggle**: Complete dark theme with persistent preference
- **🏷️ Task Categories & Tags**: Organize tasks with categories and custom tags

### Advanced Features 🚀
- **Smart Sorting**: Automatic sorting by completion, priority, due date, and creation time
- **Advanced Filtering**: Combine multiple filters (status + category + priority + search)
- **Visual Indicators**: Color-coded priorities, categories, and due date warnings
- **Sample Data**: Pre-loaded sample tasks to demonstrate all features
- **Confirmation Dialogs**: Prevent accidental task deletions
- **Keyboard Shortcuts**: Enhanced accessibility and user experience

## 🛠️ Technologies Used

- **React.js** - Frontend framework with hooks and functional components
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Custom styling with animations and responsive design
- **localStorage API** - Client-side data persistence
- **HTML5** - Semantic markup

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Alternative Setup (Create React App)

1. **Create a new React app**
   ```bash
   npx create-react-app task-tracker
   cd task-tracker
   ```

2. **Replace the default files** with the provided source code

3. **Start the application**
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js              # User authentication component
│   │   ├── TaskForm.js           # Add/Edit task form with all features
│   │   ├── TaskItem.js           # Individual task display with actions
│   │   ├── TaskList.js           # Task list container
│   │   └── TaskFilter.js         # Search and filtering component
│   ├── utils/
│   │   └── localStorage.js       # Data persistence utilities
│   ├── styles/
│   │   └── App.css              # Complete styling with dark mode
│   ├── App.js                   # Main application component
│   └── index.js                 # Application entry point
├── README.md
└── package.json
```

## 🎮 Usage Guide

### Getting Started
1. **Login**: Enter any username to access the application
2. **Add Tasks**: Use the form to create new tasks with all available options
3. **Manage Tasks**: Edit, delete, or mark tasks as complete
4. **Filter & Search**: Use the powerful filtering system to find specific tasks
5. **Customize**: Toggle dark mode and organize with categories and tags

### Task Management
- **Create**: Fill out the task form with title, description, due date, priority, category, and tags
- **Edit**: Click the edit button (✏️) on any task to modify it
- **Complete**: Check the checkbox to mark tasks as done
- **Delete**: Click the delete button (🗑️) and confirm to remove tasks

### Advanced Features
- **Search**: Type in the search bar to find tasks by title, description, or tags
- **Filter**: Use status tabs (All, Pending, Completed, Overdue, Due Today)
- **Advanced Filters**: Click "More Filters" to filter by category and priority
- **Dark Mode**: Click the moon/sun icon in the header to toggle themes

## 📊 Sample Data

The application comes with sample tasks that demonstrate all features:

```javascript
{
  id: 1,
  title: "Complete React assignment",
  description: "Build a task tracker application with all bonus features",
  completed: false,
  createdAt: "2024-01-15T10:00:00Z",
  dueDate: "2024-01-20T23:59:00Z",
  priority: "high",
  category: 1, // Work
  tags: ["react", "assignment", "coding"]
}
```

## 🎨 Customization

### Adding New Categories
Edit the `getCategories()` function in `src/utils/localStorage.js`:

```javascript
return [
  { id: 1, name: "Work", color: "#3B82F6" },
  { id: 2, name: "Personal", color: "#10B981" },
  { id: 3, name: "Shopping", color: "#F59E0B" },
  { id: 4, name: "Health", color: "#EF4444" },
  { id: 5, name: "Your Category", color: "#8B5CF6" }, // Add new category
]
```

### Modifying Priority Levels
Update the `PRIORITY_LEVELS` object in `src/utils/localStorage.js`:

```javascript
export const PRIORITY_LEVELS = {
  LOW: { value: "low", label: "Low", color: "#10B981", order: 1 },
  MEDIUM: { value: "medium", label: "Medium", color: "#F59E0B", order: 2 },
  HIGH: { value: "high", label: "High", color: "#EF4444", order: 3 },
  URGENT: { value: "urgent", label: "Urgent", color: "#DC2626", order: 4 }, // Add new priority
}
```

## 📱 Responsive Design

The application is fully responsive and includes:

- **Mobile-First Design**: Optimized for mobile devices
- **Flexible Layouts**: Adapts to different screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Readable Typography**: Proper font scaling across devices

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🌙 Dark Mode

The dark mode feature includes:
- **Complete Theme**: All components styled for dark mode
- **Persistent Preference**: Your choice is saved and remembered
- **Smooth Transitions**: Animated theme switching
- **Accessibility**: Proper contrast ratios maintained

## 🔧 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

### Code Quality
- **ES6+ Features**: Modern JavaScript syntax
- **Component Organization**: Logical file structure
- **Reusable Components**: Modular and maintainable code
- **Consistent Naming**: Clear and descriptive variable names

## 🚀 Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/task-tracker",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## 🧪 Testing

### Manual Testing Checklist
- [ ] User can login with any username
- [ ] Tasks can be created with all fields
- [ ] Tasks can be edited and updated
- [ ] Tasks can be deleted with confirmation
- [ ] Task completion can be toggled
- [ ] Search works across title, description, and tags
- [ ] All filters work correctly
- [ ] Dark mode toggles properly
- [ ] Data persists after page refresh
- [ ] Responsive design works on mobile

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Create React App** - For the quick setup and build tools
- **MDN Web Docs** - For comprehensive web development documentation
- **Inspiration** - Various task management applications and UI patterns

## 📞 Support

If you have any questions or need help with the project:

- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/task-tracker/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/task-tracker/discussions)

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Task statistics and analytics dashboard
- [ ] Export tasks to CSV/JSON
- [ ] Browser notifications for due tasks
- [ ] Task templates for recurring tasks
- [ ] Collaborative features and task sharing
- [ ] Calendar integration
- [ ] Subtasks and task dependencies
- [ ] Time tracking functionality
- [ ] Offline support with service workers

---

**Made with ❤️ using React.js**

*This project was created as part of a pre-hire assignment to demonstrate React skills, component organization, and modern web development practices.*
```

This comprehensive README file includes:

1. **Complete feature overview** with checkmarks for implemented features
2. **Detailed installation instructions** with multiple setup options
3. **Project structure** showing the file organization
4. **Usage guide** explaining how to use all features
5. **Customization examples** for extending the application
6. **Deployment instructions** for multiple platforms
7. **Testing checklist** for quality assurance
8. **Contributing guidelines** for open source collaboration
9. **Future enhancement ideas** for continued development

The README is professional, well-structured, and provides all the information needed for users, developers, and evaluators to understand and work with your task tracker application! 📝✨

