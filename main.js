let tasks = [];
let points = 0;
let level = 1;
let exp = 0;

function addTask() {
  const input = document.getElementById('taskInput');
  if(input.value === "") return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  renderTasks();
}

function toggleDone(index) {
  const task = tasks[index];
  task.done = !task.done;

  if(task.done) {
    points += 10; // タスク完了でポイント追加
    exp += 10;    // 経験値も追加
  } else {
    points -= 10;
    exp -= 10;
  }

  // レベルアップ判定（例：50EXPでレベルアップ）
  while(exp >= 50) {
    level++;
    exp -= 50;
    alert("レベルアップ！🎉 レベル: " + level);
  }

  updateSidebar();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = "task" + (task.done ? " done" : "");
    div.innerText = task.text;
    div.onclick = () => toggleDone(i);
    taskList.appendChild(div);
  });
}

function updateSidebar() {
  document.getElementById('points').innerText = points;
  document.getElementById('level').innerText = level;
  document.getElementById('exp').innerText = exp + "/50";
}
