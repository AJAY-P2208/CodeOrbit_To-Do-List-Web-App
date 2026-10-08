 const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Completed" : "Complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";


        completeBtn.addEventListener("click", function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });


        deleteBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });


        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonContainer);

        taskList.appendChild(li);
    });
}


// Add task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Show saved tasks when page opens
displayTasks();