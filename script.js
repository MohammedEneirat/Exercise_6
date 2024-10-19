let tasks = [];
let taskIdCounter = 1;
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the page loads
window.onload = function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        taskIdCounter = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; // Set ID counter based on loaded tasks
    }
    renderTasks();
};

function addTask() {
    const taskName = document.getElementById('taskName').value;
    if (taskName.trim()) {
        const task = { id: taskIdCounter++, name: taskName, status: 'Pending', description: '' };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to local storage
        renderTasks();
        document.getElementById('taskName').value = ''; 
    }
}

function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.status === 'Completed' ? 'completed' : '';

        li.innerHTML = `
            <div class="task-info">
                <div><strong>ID:</strong> ${task.id}</div>
                <div><strong>Name:</strong> ${task.name}</div>
                <div><strong>Status:</strong> ${task.status}</div>
                <div><strong>Description:</strong> ${task.description || 'No description'}</div>
            </div>
            <div class="task-actions">
                <button class="toggle" onclick="toggleTaskStatus(${task.id})">Toggle Status</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                <button class="add-description" onclick="addDescription(${task.id})">Add Description</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
    renderTasks();
}

function editTask(id) {
    const newTaskName = prompt('Enter new task name:');
    if (newTaskName) {
        const task = tasks.find(task => task.id === id);
        task.name = newTaskName;
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
        renderTasks();
    }
}

function addDescription(id) {
    const newDescription = prompt('Enter task description:');
    if (newDescription) {
        const task = tasks.find(task => task.id === id);
        task.description = newDescription;
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage
        renderTasks();
    }
}

function searchTasks() {
    const searchTerm = document.getElementById('taskSearch').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));
    renderTasks(filteredTasks);
}

function toggleTable() {
    const taskList = document.getElementById('taskList');
    const toggleButton = document.getElementById('toggleTable');
    if (taskList.style.display === 'none') {
        taskList.style.display = 'block';
        toggleButton.textContent = 'Hide Table';
    } else {
        taskList.style.display = 'none';
        toggleButton.textContent = 'Show Table';
    }
}
