let btnAddTask = document.querySelector(".addTask"),
	btnClear = document.querySelector(".clearButton"),
	newTasksField = document.querySelector(".newTasks"),
	dayShow = document.querySelector(".dayShow"),
	taskList = document.querySelector(".taskList"),
	sleepingHours = document.getElementById("sleepingHours"),
	sleepingMinutes = document.querySelector(".sleepingMinutes"),
	day = [];
const minInDay = 24 * 60;

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
		taskList.appendChild(el);
	}
}
function countTime(){
	let sleepingTimeHours = document.getElementById("sleepingHours").value;
	let sleepingMinutes = document.querySelector(".sleepingMinutes").value;
	sleepingTimeHours = Number(sleepingTimeHours);
	sleepingMinutes = Number(sleepingMinutes);
	let minutes = convertToMinutes(sleepingTimeHours, sleepingMinutes);
	if (sleepingMinutes === 60 || sleepingMinutes === -5) 
		correctMinutesChanging (sleepingMinutes);
	if (minutes) {
		let freeTime = minInDay - minutes;
		let percentSleepTime = Math.floor((minutes/minInDay)*100);
		console.log(`percentSleepTime ${percentSleepTime}`);
		if (day.length>0) {//if is user's tasks
			let minutesDaySum = 0;
			for (var i = day.length - 1; i >= 0; i--) {
				minutesDaySum += convertToMinutes(day[i].duration[0], day[i].duration[1]);
			}
			freeTime -= minutesDaySum;
		}
		let freeTimeArray = converToHoursAndMinutes(freeTime);
		let msg = `${freeTimeArray[0]} h ${freeTimeArray[1]} m`
		document.querySelector(".dayShow h2 span").textContent = msg;
		drawInCanvas(percentSleepTime);
	}	
}
function correctMinutesChanging (sleepingMinutes){
	let hours = Number(sleepingHours.value);
	let max = sleepingHours.getAttribute("max");
	let min = sleepingHours.getAttribute("min");
	max = Number(max);
	min = Number(min);

	if (sleepingMinutes === 60) {
		document.querySelector(".sleepingMinutes").value = 0;
		if (hours < max) {
			hours++;
			sleepingHours.value = hours;
		}
	} else if (sleepingMinutes === -5) {
		document.querySelector(".sleepingMinutes").value = 55;
		if (hours > min) {
			hours--;
			sleepingHours.value = hours;
		}
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
function drawCircle (ctx, x, y, color, size, fill){
	ctx.arc(x,y, size, 0, Math.PI*2);
	(fill) ? ctx.fill() : ctx.stroke();
}
function drawInCanvas(percentSleepTime){
	let canvas = document.querySelector("canvas");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
		let minSide,
		width = canvas.width,
		height = canvas.height;
		(width < height) ? minSide = width : minSide = height;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "rgba(255, 255, 255, 1)";
		ctx.fillRect(width*2/3, 0, width, height);
		ctx.fill();
		/* draw sleep time rect*/
		ctx.fillStyle = "gold";
		ctx.fillRect(width*2/3, (height-height*percentSleepTime/100), width, height);
		ctx.fill();
		ctx.moveTo (0, 0);
		drawCircle (ctx, 40, 60, null, 60, true);
	}
	else canvas.textContent = "Use modern browser's version";
}
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
function Ball(x, y, color, size) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
}
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
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

sleepingHours.oninput = countTime;
sleepingMinutes.oninput = countTime;

countTime();


