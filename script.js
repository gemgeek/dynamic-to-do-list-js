// Description: This script adds functionality to a simple task list application.
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');

    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasksArray = [];

    function saveTasks() {
        
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    function addTask(taskTextParam, saveToLocalStorage = true) {
        // Ensure taskText is trimmed, even if it comes from loading.
        const taskText = taskTextParam.trim();

        if (taskText === "" && saveToLocalStorage) {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText; 

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; 
        removeButton.classList.add('remove-btn'); 

        removeButton.onclick = function() {
            removeTask(listItem, taskText);
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);

        // Append the new task li to the task list (<ul>).
        taskList.appendChild(listItem);

        if (saveToLocalStorage) {
            tasksArray.push(taskText); 
            saveTasks(); 
            taskInput.value = ""; 
        }
    }

    function removeTask(listItemToRemove, taskTextToRemove) {

        taskList.removeChild(listItemToRemove);

        tasksArray = tasksArray.filter(task => task !== taskTextToRemove);

    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        tasksArray = storedTasks;

        tasksArray.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    loadTasks();
});
