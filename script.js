const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const taskCount=document.getElementById("taskCount");
const emptyMessage=document.getElementById("emptyMessage");
const clearCompleted=document.getElementById("clearCompleted");

let tasks=JSON.parse(localStorage.getItem("todoTasks"))||[];

function saveTasks(){localStorage.setItem("todoTasks",JSON.stringify(tasks));}

function renderTasks(){
  taskList.innerHTML="";
  tasks.forEach(task=>{
    const li=document.createElement("li");
    li.className=`task-item ${task.completed?"completed":""}`;
    const text=document.createElement("span");
    text.className="task-text";
    text.textContent=task.text;
    const complete=document.createElement("button");
    complete.className="complete-btn";
    complete.textContent=task.completed?"Undo":"Complete";
    complete.addEventListener("click",()=>toggleTask(task.id));
    const del=document.createElement("button");
    del.className="delete-btn";
    del.textContent="Delete";
    del.addEventListener("click",()=>deleteTask(task.id));
    li.append(text,complete,del);
    taskList.appendChild(li);
  });
  const remaining=tasks.filter(t=>!t.completed).length;
  taskCount.textContent=`${remaining} ${remaining===1?"task":"tasks"} remaining`;
  emptyMessage.style.display=tasks.length?"none":"block";
}

function addTask(){
  const text=taskInput.value.trim();
  if(!text){taskInput.focus();return;}
  tasks.push({id:Date.now(),text,completed:false});
  taskInput.value="";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

function toggleTask(id){
  tasks=tasks.map(t=>t.id===id?{...t,completed:!t.completed}:t);
  saveTasks();renderTasks();
}

function deleteTask(id){
  tasks=tasks.filter(t=>t.id!==id);
  saveTasks();renderTasks();
}

clearCompleted.addEventListener("click",()=>{
  tasks=tasks.filter(t=>!t.completed);
  saveTasks();renderTasks();
});
addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",e=>{if(e.key==="Enter")addTask();});
renderTasks();