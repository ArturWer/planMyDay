let btnAddTask = document.querySelector(".addTask"),
	btnClear = document.querySelector(".clearButton"),
	newTasksField = document.querySelector(".newTasks"),
	dayShow = document.querySelector(".dayShow"),
	taskList = document.querySelector(".taskList"),
	sleepingHours = document.getElementById("sleepingHours"),
	sleepingMinutes = document.querySelector(".sleepingMinutes"),
	day = [];
const minInDay = 24 * 60;
let canvas = document.querySelector("canvas"),
	ctx = canvas.getContext("2d");

function Task (name, hours, minutes){
	this.name = name,
	this.duration = [hours, minutes];
}
function clearTask (){
	document.getElementById('newTaskName').value = "";
	document.getElementById("hours").value = 0;
	document.querySelector(".minutes").value = 0;
}
function showTasks(){
	taskList.innerHTML = "";
	for (let i = day.length - 1; i >= 0; i--) {
		let el = document.createElement("p");
		let text = document.createTextNode(`${day[i].name} ${day[i].duration[0]}h ${day[i].duration[1]} m`);
		el.appendChild(text);
		let padding = countPaddingInTasks (day[i].duration[0], day[i].duration[1]);
		el.style.padding = padding;
		console.log(typeof(padding));
		taskList.appendChild(el);
	}
}
function countTime(){
	let sleepingTimeHours = document.getElementById("sleepingHours").value;
	let sleepingMinutes = document.querySelector(".sleepingMinutes").value;
	let minutes = convertToMinutes(sleepingTimeHours, sleepingMinutes);
	if (minutes) {
		let freeTime = minInDay - minutes;
		if (day.length>0) {//if is user's tasks
			let minutesDaySum = 0;
			for (var i = day.length - 1; i >= 0; i--) {
				minutesDaySum += convertToMinutes(day[i].duration[0], day[i].duration[1]);
			}
			freeTime -= minutesDaySum;
			console.log(`Всего в задачах минут: ${minutesDaySum}`);
		}
		let freeTimeArray = converToHoursAndMinutes(freeTime);
		let msg = `${freeTimeArray[0]} h ${freeTimeArray[1]} m`
		document.querySelector(".dayShow h2 span").textContent = msg;
	}	
}
function convertToMinutes(hours, minutes){
	if (!isNaN(hours) && !isNaN(minutes)) {
		return Number(hours) * 60 + Number(minutes);
	}
	return false;
}
function converToHoursAndMinutes (minutes){
	if(!isNaN(minutes)){
		let t = [];
		t[0] = Math.floor(minutes/60);
		t[1] = Math.floor(minutes%60);
		return t;
	}
	return false;
}
function countPaddingInTasks(hours, minutes){
	return `${Math.floor(hours * 10 + minutes/10)}px`;
}
function drawInCanvas(){
	let minSide;
	(canvas.width < canvas.height) ? minSide = canvas.width : minSide = canvas.height;
	console.log(`minSide of canvas is: ${minSide}`);
}

btnAddTask.addEventListener('click', function(){
	let name = document.getElementById('newTaskName').value,
		hours = document.getElementById("hours").value,
		minutes = document.querySelector(".minutes").value;
	let newTaskObj = new Task(name, hours, minutes);
	day.push(newTaskObj);
	clearTask();
	countTime();
	showTasks();
}, false);

btnClear.addEventListener('click', clearTask, false);

sleepingHours.onchange = countTime;
sleepingMinutes.onchange = countTime;

countTime();


drawInCanvas();