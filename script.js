document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const addTaskBtn = document.getElementById('add-task');
const toggleTableBtn = document.getElementById('toggle-table');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);
toggleTableBtn.addEventListener('click', toggleTaskList);

function addTask() {
    const description = taskInput.value.trim();
    if (description === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        description,
        completed: false
    };

    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();

    taskInput.value = '';
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.description}
            <div>
                <button class="toggle" onclick="toggleTask(${task.id})">Toggle</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasksToLocalStorage();
    renderTasks();
}

// Delete
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
    renderTasks();
}

// Edit
function editTask(id) {
    const newDescription = prompt('Enter new task description:');
    if (newDescription) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.description = newDescription;
            }
            return task;
        });
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Search
function searchTasks() {
    const keyword = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(keyword));
    renderTasks(filteredTasks);
}

// Save to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load from local storage
function loadTasksFromLocalStorage() {
    renderTasks();
}

// Visibility
function toggleTaskList() {
    if (taskList.classList.contains('hidden')) {
        taskList.classList.remove('hidden');
        toggleTableBtn.textContent = 'Hide Tasks';
    } else {
        taskList.classList.add('hidden');
        toggleTableBtn.textContent = 'Show Tasks';
    }
}
