// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const themeBtn = document.getElementById('theme-btn');

// User Preferences
let userPreferences = {
    darkMode: false
};

// Check if user preferences are stored in localStorage
function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('todoAppPreferences');
    if (savedPreferences) {
        userPreferences = JSON.parse(savedPreferences);
        applyTheme();
    }
}

// Save user preferences to localStorage
function saveUserPreferences() {
    localStorage.setItem('todoAppPreferences', JSON.stringify(userPreferences));
}

// Apply theme based on user preferences
function applyTheme() {
    if (userPreferences.darkMode) {
        document.body.classList.add('dark-theme');
        themeBtn.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.textContent = 'Dark Mode';
    }
}

// Toggle theme
function toggleTheme() {
    // Add button animation
    themeBtn.classList.add('button-click');
    setTimeout(() => {
        themeBtn.classList.remove('button-click');
    }, 300);
    
    userPreferences.darkMode = !userPreferences.darkMode;
    saveUserPreferences();
    applyTheme();
}

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }
}

// Save todos to localStorage
function saveTodos() {
    const todoItems = document.querySelectorAll('.todo-item');
    const todos = [];
    
    todoItems.forEach(item => {
        todos.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a new todo element
function createTodoElement(text, completed = false) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    if (completed) {
        todoItem.classList.add('completed');
    }
    
    const todoText = document.createElement('span');
    todoText.textContent = text;
    
    const buttonsContainer = document.createElement('div');
    
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = completed ? 'Undo' : 'Complete';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.addEventListener('click', toggleTodoStatus);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', removeTodo);
    
    buttonsContainer.appendChild(toggleBtn);
    buttonsContainer.appendChild(deleteBtn);
    
    todoItem.appendChild(todoText);
    todoItem.appendChild(buttonsContainer);
    
    todoList.appendChild(todoItem);
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        createTodoElement(text);
        todoInput.value = '';
        saveTodos();
        
        // Add button animation
        addBtn.classList.add('button-click');
        setTimeout(() => {
            addBtn.classList.remove('button-click');
        }, 300);
    }
}

// Toggle todo status (completed/not completed)
function toggleTodoStatus(e) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
    
    const toggleBtn = todoItem.querySelector('.toggle-btn');
    toggleBtn.textContent = todoItem.classList.contains('completed') ? 'Undo' : 'Complete';
    
    saveTodos();
    
    // Add button animation
    e.target.classList.add('button-click');
    setTimeout(() => {
        e.target.classList.remove('button-click');
    }, 300);
}

// Remove a todo
function removeTodo(e) {
    const todoItem = e.target.closest('.todo-item');
    
    // Add removal animation
    todoItem.classList.add('removing');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        todoItem.remove();
        saveTodos();
    }, 300);
    
    // Add button animation
    e.target.classList.add('button-click');
    setTimeout(() => {
        e.target.classList.remove('button-click');
    }, 300);
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
themeBtn.addEventListener('click', toggleTheme);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadUserPreferences();
    loadTodos();
});
