let tasks=[];

document.addEventListener("DOMContentLoaded",()=>{

const storedTasks=
JSON.parse(localStorage.getItem("tasks"));

if(storedTasks){
tasks=storedTasks;
updateTasksList();
updateStats();
}

document.getElementById("newTask")
.addEventListener("click",(e)=>{
e.preventDefault();
addTask();
});

setupVoice();

});

function saveTasks(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function addTask(){

const input=
document.getElementById("taskInput");

const text=input.value.trim();

if(text){
tasks.push({text,completed:false});
input.value="";
updateTasksList();
updateStats();
saveTasks();
}
}

function toggleTaskComplete(index){
tasks[index].completed=
!tasks[index].completed;

updateTasksList();
updateStats();
saveTasks();
}

function deleteTask(index){
tasks.splice(index,1);
updateTasksList();
updateStats();
saveTasks();
}

function updateStats(){

const completed=
tasks.filter(t=>t.completed).length;

const total=tasks.length;

const progress=
total?(completed/total)*100:0;

document.getElementById("progress")
.style.width=`${progress}%`;

document.getElementById("numbers")
.innerText=`${completed}/${total}`;
}

function updateTasksList(){

const list=
document.getElementById("task-list");

list.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");
li.className="taskItem";

li.innerHTML=`
<div class="task ${task.completed?'completed':''}">
<input type="checkbox"
${task.completed?'checked':''}
onchange="toggleTaskComplete(${index})">
<p>${task.text}</p>
</div>

<button onclick="deleteTask(${index})">
<i class="fa-solid fa-trash"></i>
</button>
`;

list.appendChild(li);
});
}



/* ========= VOICE RECOGNITION ========= */

function setupVoice(){

const voiceBtn=
document.getElementById("voiceBtn");

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Voice not supported");
return;
}

const recognition=
new SpeechRecognition();

recognition.lang="en-US";

voiceBtn.addEventListener("click",()=>{

recognition.start();

voiceBtn.innerHTML=
'<i class="fa-solid fa-microphone-lines"></i>';

});

recognition.onresult=function(event){

const speechText=
event.results[0][0].transcript;

addVoiceTask(speechText);
};

recognition.onend=function(){

voiceBtn.innerHTML=
'<i class="fa-solid fa-microphone"></i>';
};
}

function addVoiceTask(text){

if(text.trim()!==""){

tasks.push({
text:text,
completed:false
});

updateTasksList();
updateStats();
saveTasks();
}
}
// Voice button functionality
const voiceBtn = document.getElementById('voiceBtn');
const taskInput = document.getElementById('taskInput');

voiceBtn.addEventListener('click', () => {
    const text = taskInput.value; // get text from input
    if(text){
        const msg = new SpeechSynthesisUtterance(text); // create voice
        window.speechSynthesis.speak(msg); // speak it
    } else {
        alert("Please write a task first!"); // optional
    }
});
