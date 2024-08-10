const btnAddTask = document.getElementById("addTask");

// Load added tasks
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.name}</strong> <em>${task.deadline}</em>`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTask(task);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDeadline = document.getElementById("taskDeadline");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "" || taskDeadline.value === "") {
    alert("Please enter both a task name and a deadline");
    return;
  }

  const task = {
    name: taskInput.value,
    deadline: taskDeadline.value,
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.name}</strong> <em>${task.deadline}</em>`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTask(task);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
  });

  taskInput.value = "";
  taskDeadline.value = "";
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (task) =>
      task.name !== taskToRemove.name || task.deadline !== taskToRemove.deadline
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

btnAddTask.addEventListener("click", addTask);
