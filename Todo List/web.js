const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const imageInput = document.getElementById("image");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// show saved tasks
for (let i = 0; i < tasks.length; i++) {
  showTask(tasks[i]);
}

addBtn.onclick = function () {
  let title = titleInput.value;
  let description = descriptionInput.value;
  let priority = priorityInput.value;
  let imageFile = imageInput.files[0];

  if (title === "" || description === "") {
    alert("Fill all fields");
    return;
  }

  if (imageFile) {
    let reader = new FileReader();
    reader.onload = function () {
      addTask(title, description, priority, reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    addTask(title, description, priority, "");
  }

  titleInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
};

function addTask(title, description, priority, image) {
  let task = {
    title: title,
    description: description,
    priority: priority,
    image: image,
    completed: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTask(task);
}

function showTask(task) {
  let div = document.createElement("div");
  div.className = "task " + task.priority;

  if (task.completed) {
    div.classList.add("completed");
  }

  let imgHTML = "";
  if (task.image !== "") {
    imgHTML = `<img src="${task.image}">`;
  }

  div.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <small>Priority: ${task.priority}</small><br>
    ${imgHTML}
    <br><br>
    <button class="completeBtn">Complete</button>
    <button class="deleteBtn">Delete</button>
  `;

  taskList.appendChild(div);

  div.querySelector(".completeBtn").onclick = function () {
    div.classList.toggle("completed");
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  div.querySelector(".deleteBtn").onclick = function () {
    div.remove();
    tasks = tasks.filter(function (t) {
      return t !== task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
}
