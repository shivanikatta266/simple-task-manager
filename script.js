document.addEventListener("DOMContentLoaded", () => {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  /* NAVIGATION */
  document.querySelectorAll(".nav").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".nav").forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
      document.getElementById(item.dataset.page).classList.remove("hidden");
    });
  });

  /* ADD TASK WITH STATUS CHOICE (OPTION 2) */
  document.getElementById("addTaskBtn").addEventListener("click", () => {
    const title = prompt("Task title?");
    if (!title) return;

    const description = prompt("Task description?") || "";

    let status = prompt(
      "Enter status: todo / progress / done",
      "todo"
    ).toLowerCase();

    if (!["todo", "progress", "done"].includes(status)) {
      alert("Invalid status. Defaulting to 'todo'");
      status = "todo";
    }

    tasks.push({ title, description, status });
    save();
    render();
  });

  /* SEARCH */
  document.getElementById("searchInput").addEventListener("keyup", () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll(".task").forEach(t =>
      t.innerText.toLowerCase().includes(q)
        ? t.style.display = "block"
        : t.style.display = "none"
    );
  });

  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function render() {
    ["todo","progress","done"].forEach(id =>
      document.getElementById(id).innerHTML = ""
    );

    tasks.forEach((task, i) => {
      const div = document.createElement("div");
      div.className = "task";

      div.innerHTML = `
        <div class="task-top">
          <div class="task-left">
            <div class="avatar"></div>
            <div>
              <div class="task-title">${task.title}</div>
              <div class="task-desc">${task.description}</div>
            </div>
          </div>
          <div>
            <button onclick="editTask(${i})">✏</button>
            <button onclick="deleteTask(${i})">🗑</button>
          </div>
        </div>
      `;

      document.getElementById(task.status).appendChild(div);
    });

    document.getElementById("totalTasks").innerText = tasks.length;
  }

  /* EDIT & DELETE */
  window.editTask = function (i) {
    tasks[i].title = prompt("Edit title", tasks[i].title);
    tasks[i].description = prompt("Edit description", tasks[i].description);
    save();
    render();
  };

  window.deleteTask = function (i) {
    tasks.splice(i, 1);
    save();
    render();
  };

  render();
});
