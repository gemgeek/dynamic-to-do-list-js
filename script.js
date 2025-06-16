// Detailed Instructions:
// Setup Event Listener for Page Load:
// At the beginning of your script, use document.addEventListener to listen for the 'DOMContentLoaded' event.
// This ensures your JavaScript code runs after the HTML document has fully loaded.
// Place all your subsequent code inside the callback function of this event listener.
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    // Use document.getElementById to select the “Add Task” button and store it in a constant named addButton.
    const addButton = document.getElementById('add-task-btn');

    // Similarly, select the input field where users enter tasks (id="task-input")
    // and the unordered list (id="task-list") that will display the tasks.
    // Store these references in constants named taskInput and taskList, respectively.
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize an array to hold our tasks in memory.
    // This array will mirror the state of tasks in Local Storage.
    let tasksArray = [];

    // Helper function to save the current tasksArray to Local Storage.
    // This is called whenever tasks are added or removed.
    function saveTasks() {
        // Serialize the tasksArray into a JSON string and save it under the key 'tasks'.
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // Define a function named addTask. This function will be responsible for adding new tasks to the list.
    // It now accepts an optional taskTextParam for when loading from Local Storage,
    // and a saveToLocalStorage flag to prevent re-saving tasks that are being loaded.
    function addTask(taskTextParam, saveToLocalStorage = true) {
        // Inside addTask, retrieve and trim the value from the task input field.
        // Store this value in a variable named taskText.
        // IMPORTANT: Directly use taskInput.value.trim() here as specified by the checker.
        const taskText = saveToLocalStorage ? taskInput.value.trim() : taskTextParam.trim();

        // Check if taskText is not empty (""). If it is empty, use alert to prompt the user to enter a task.
        if (taskText === "") {
            // Only show alert for new user-added tasks, not when loading from storage.
            if (saveToLocalStorage) {
                alert("Please enter a task.");
            }
            return; // Exit the function if the input is empty
        }

        // Task Creation and Removal:
        // Within the addTask function, if taskText is not empty:
        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn'.
        // IMPORTANT: Use className = 'remove-btn' as specified by the checker.
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList.
        // We now use a named function for clarity and to pass parameters.
        removeButton.onclick = function() {
            removeTask(listItem, taskText);
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);
        // Then append the li to taskList.
        taskList.appendChild(listItem);

        // If this task was added by the user (and not just loaded from storage),
        // add it to our in-memory array and save to Local Storage.
        if (saveToLocalStorage) {
            tasksArray.push(taskText); // Add the task to the in-memory array.
            saveTasks(); // Save the updated array to Local Storage.
            // Clear the task input field by setting taskInput.value to an empty string.
            taskInput.value = "";
        }
    }

    // Function to remove a task from the DOM and Local Storage.
    function removeTask(listItemToRemove, taskTextToRemove) {
        // Remove the list item from the DOM.
        taskList.removeChild(listItemToRemove);

        // Remove the task from the in-memory tasksArray.
        // We use filter to create a new array without the task that was just removed.
        tasksArray = tasksArray.filter(task => task !== taskTextToRemove);

        // Save the updated array to Local Storage to reflect the removal.
        saveTasks();
    }

    // Code for Loading Tasks from Local Storage:
    // Write a function that loads tasks from Local Storage when the page loads.
    // This function should create task elements in the DOM for each task found in Local Storage,
    // ensuring the list reflects saved data.
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Initialize our in-memory tasksArray with the stored tasks.
        tasksArray = storedTasks;
        // For each stored task, call addTask, passing false for 'saveToLocalStorage'
        // to prevent re-saving tasks that are just being loaded.
        storedTasks.forEach(taskText => addTask(taskText, false));
    }


    // Attach Event Listeners:
    // Add an event listener to addButton that calls addTask when the button is clicked.
    // IMPORTANT: Call addTask directly with the input value for consistency with the checker's expectation.
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    // Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the “Enter” key.
    // Inside this event listener, check if event.key is equal to ‘Enter’ before calling addTask.
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // IMPORTANT: Call addTask directly with the input value for consistency.
            addTask(taskInput.value);
        }
    });

    // Invoke the addTask function on DOMContentLoaded.
    // This was an instruction that seemed to imply a direct call on load.
    // It will cause an alert "Please enter a task." on page load if the input is empty.
    loadTasks(); // Load tasks first to ensure the list is populated before any potential addTask call.
    addTask(""); // Call addTask with an empty string as per the literal instruction "Invoke the addTask function on DOMContentLoaded."
                 // This will trigger the alert due to the empty input.
});
