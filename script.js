let tasks = [];

// add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskName = input.value.trim();

  if (taskName !== "") {
    const newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    };
    tasks.push(newTask);
    input.value = "";
    renderTasks();
  }
}

// toggle task completion
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  renderTasks();
}

// delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// render task list to DOM
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? 'completed' : ''}">${task.name}</span>
      <div class="btn-group">
        <button onclick="toggleTask(${task.id})">Toggle</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Periodic check: All tasks done?
setInterval(() => {
  const hasTasks = tasks.length > 0;
  const allDone = hasTasks && tasks.every(task => task.done);

  if (allDone) {
    console.log("🎉 All tasks done!");
  }
}, 10000);
