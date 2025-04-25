document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage on page load
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
            saveTasks(); // Save tasks to localStorage
            taskInput.value = '';
        }
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const listItem = e.target.parentElement.parentElement;
            taskList.removeChild(listItem);
            saveTasks(); // Save tasks to localStorage after deletion
        }
        if (e.target.classList.contains('done-button')) {
            const listItem = e.target.parentElement.parentElement;
            const taskText = listItem.querySelector('span');
            taskText.style.textDecoration =
                taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            listItem.classList.toggle('list-group-item-success');

            saveTasks(); // Save tasks to localStorage after marking as done
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((listItem) => {
            tasks.push({
                text: listItem.querySelector('span').textContent,
                done: listItem.classList.contains('list-group-item-success'),
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            if (task.done) {
                listItem.classList.add('list-group-item-success');
            }
            listItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }
});