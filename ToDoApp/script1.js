const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");

const loadTasks = () => {
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
addTaskToList(task.name, task.completed);
});
};

const addTaskToLocalStorage = (name, completed) => {
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push({ name, completed });
localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTaskFromLocalStorage = (name) => {
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const filteredTasks = tasks.filter((task) => task.name !== name);
localStorage.setItem("tasks", JSON.stringify(filteredTasks));
34
};

const updateTaskInLocalStorage = (oldName, newName) => {
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const updatedTasks = tasks.map((task) => {
if (task.name === oldName) {
return { name: newName, completed: task.completed };
} else {
return task;
}
});
localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};
let taskCounter = 1;

const addTaskToList = (name, completed) => {
const taskLi = document.createElement("li");
const taskCheckbox = document.createElement("input");
taskCheckbox.type = "checkbox";
taskCheckbox.width="15px";
taskCheckbox.checked = completed;
taskCheckbox.addEventListener("change", () => {
if (taskCheckbox.checked) {
taskSpan.classList.add("checked-task");
} else {
taskSpan.classList.remove("checked-task");
}
updateTaskInLocalStorage(name, name);
});

const taskSpan = document.createElement("span");
taskSpan.innerText = name;

if (completed) {
taskSpan.classList.add("checked-task");
}
taskLi.appendChild(taskSpan);
taskLi.appendChild(taskCheckbox);
const taskEditButton = document.createElement("button");
taskEditButton.classList.add("edit");
const editIcon = document.createElement("img");
editIcon.src = "pen.png"; // Replace "pencil.png" with the path to your pencil image
editIcon.alt = "Edit";
editIcon.width-"20";
editIcon.height="20";
taskEditButton.appendChild(editIcon);
taskEditButton.addEventListener("click", () => {
const newTaskName = prompt("Enter new task name:", name);
if (newTaskName !== null && newTaskName !== "") {
taskSpan.innerText = newTaskName;
//taskSpan.innerText = ${taskCounter}.${newTaskName};
updateTaskInLocalStorage(name, newTaskName);
}
});
taskLi.appendChild(taskEditButton);
const taskDeleteButton = document.createElement("button");
taskDeleteButton.innerHTML = "&times;";
taskDeleteButton.addEventListener("click", () => {
taskList.removeChild(taskLi);
removeTaskFromLocalStorage(name);
});
taskLi.appendChild(taskDeleteButton);
taskList.appendChild(taskLi);
taskCounter++;
};
// Add task when ENTER key is pressed
taskInput.addEventListener("keyup", (event) => {
if (event.key === "Enter") {
const taskName = taskInput.value.trim(); // Remove leading/trailing spaces
if (taskName !== "") {
addTaskToList(taskName, false);
addTaskToLocalStorage(taskName, false);
taskInput.value = "";
} else {
alert("Task name cannot be empty."); // Display error message
}
}
});
// Load tasks when page is loaded
window.addEventListener("load", () => {
loadTasks();
});
