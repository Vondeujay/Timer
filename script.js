/* ---------------------------
   FOCUS TIMER LOGIC
----------------------------*/
let timerTime = 25 * 60;
let timerInterval;

function updateTimer(){
  let minutes = Math.floor(timerTime / 60);
  let seconds = timerTime % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

// Start Timer
document.getElementById("startBtn").onclick = () => {
  if(!timerInterval){
    timerInterval = setInterval(() => {
      if(timerTime > 0){
        timerTime--;
        updateTimer();
      }
    }, 1000);
  }
};

// Pause Timer
document.getElementById("pauseBtn").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

// Reset Timer
document.getElementById("resetBtn").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerTime = 25 * 60;
  updateTimer();
};

updateTimer();

/* ---------------------------
   TO-DO LIST LOGIC
----------------------------*/
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load Saved Tasks
window.onload = () => {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => addTaskElement(task.text, task.completed));
};

// Add Task
document.getElementById("addTaskBtn").onclick = () => {
  if(taskInput.value.trim() !== ""){
    addTaskElement(taskInput.value.trim(), false);
    saveTasks();
    taskInput.value = "";
  }
};

function addTaskElement(text, completed){
  let li = document.createElement("li");
  li.className = "task";

  let span = document.createElement("span");
  span.textContent = text;
  if(completed) span.classList.add("completed");

  let delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  // Mark Completed
  span.onclick = () => {
    span.classList.toggle("completed");
    saveTasks();
  };

  // Delete Task
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save Tasks to LocalStorage
function saveTasks(){
  let tasks = [];
  document.querySelectorAll(".task").forEach(task => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completed: task.querySelector("span").classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
