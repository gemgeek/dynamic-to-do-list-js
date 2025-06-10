// Description: This script adds functionality to a simple task list application.
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');

    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty (""). If it is empty, use alert to prompt the user to enter a task.
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        const listItem = document.createElement('li');

        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');

        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";

        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Removes the list item from the task list
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);

        // Then append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});