let btnAddTask = document.querySelector(".addTask"),
	btnClear = document.querySelector(".clearButton"),
	newTasksField = document.querySelector(".newTasks"),
	dayShow = document.querySelector(".dayShow"),
	taskList = document.querySelector(".taskList"),
	sleepingHours = document.getElementById("sleepingHours"),
	sleepingMinutes = document.querySelector(".sleepingMinutes"),
	canvas = document.querySelector("canvas"),
	ctx = canvas.getContext("2d"),
	day = [];
const minInDay = 24 * 60;

function Task (name, hours, minutes){
	this.name = name,
	this.hours = hours, 
	this.minutes = minutes,
	this.color = `rgb(${random(100,255)}, ${random(100,145)}, ${random(100,255)})`;
}
function clearTask (){
	document.getElementById('newTaskName').value = "";
	document.getElementById("hoursNewTask").value = 0;
	document.querySelector(".minutes").value = 0;
}
function countTime(){
	let sleepingTimeHours = document.getElementById("sleepingHours").value;
	let sleepingMinutes = document.querySelector(".sleepingMinutes").value;
	sleepingTimeHours = Number(sleepingTimeHours);
	sleepingMinutes = Number(sleepingMinutes);
	let minutesSleep = convertToMinutes(sleepingTimeHours, sleepingMinutes);
	if (sleepingMinutes === 60 || sleepingMinutes === -5) 
		correctMinutesChanging (sleepingMinutes);
	if (minutesSleep) {
		let minutesFree = minInDay - minutesSleep;
		setAvailableTime(minutesFree);
		if (day.length>0) {//if is user's tasks
			let minutesDaySum = 0;
			for (var i = day.length - 1; i >= 0; i--) {
				minutesDaySum += convertToMinutes(day[i].hours, day[i].minutes);
				drawTasks(i);
			}
			minutesFree -= minutesDaySum;
		}
		let minutesFreeArray = converToHoursAndMinutes(minutesFree);
		let msg = `${minutesFreeArray[0]} h ${minutesFreeArray[1]} m`;
		document.querySelector(".dayShow h2 span").textContent = msg;
		drawInCanvas(minutesSleep, ctx);
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
function setAvailableTime(minutesFree){
	console.log(`MinutesFree ${minutesFree} minutes`);
	let minutesFreeArray = converToHoursAndMinutes(minutesFree);
	let h = minutesFreeArray[0];
	let m = minutesFreeArray[1];
	document.getElementById("hoursNewTask").setAttribute("max", h);
}
function drawCircle (x, y, color, size, fill, ctx){
	ctx.beginPath();
	ctx.arc(x,y, size, 0, Math.PI*2);
	(fill) ? ctx.fill() : ctx.stroke();
}
function drawInCanvas(minutesSleep, ctx){
	let width = canvas.width,
		height = canvas.height,
		totalRectXstart = width*4/5,
		widthTotal = width - totalRectXstart,
		sleepRectYstart,
		y,
		heightSleep;

	let sleepTimePart = minutesSleep/minInDay;
	console.log(`sleepTimePart ${sleepTimePart}`);

	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = "purple";
	ctx.strokeRect(totalRectXstart, 0, widthTotal, height);
	/* draw sleep time rect */
	ctx.fillStyle = "gold";
	sleepRectYstart = height-height*sleepTimePart;
	heightSleep = height - sleepRectYstart;
	y = sleepRectYstart;
	ctx.fillRect(totalRectXstart, y, widthTotal, heightSleep);
	ctx.font = "2rem sans-serif";
	ctx.fillStyle = "black";
	ctx.fillText("Sleeping", totalRectXstart + 9, y + heightSleep/2 + 9);
	/* draw task's rect */
	if (day.length>0) {
		for (var i = day.length - 1; i >= 0; i--) {
			let taskMinutes = convertToMinutes(day[i].hours, day[i].minutes),
				taskPart = taskMinutes / minInDay,
				startTaskRectY,
				taskHeight = height * taskPart;
			ctx.fillStyle = day[i].color;
			y -= taskHeight;
			ctx.fillRect (totalRectXstart, y, widthTotal, taskHeight);
			drawCircle (100+i*taskHeight, y+i, day[i].color, taskHeight, false, ctx);
		}
	}
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
function drawTasks (i){
	console.log(`day[${i}]: ${day[i]}`);
}
btnAddTask.addEventListener('click', function(){
	let name = document.getElementById('newTaskName').value,
		hours = document.getElementById("hoursNewTask").value,
		minutes = document.querySelector(".minutes").value;
	if (name) {
		let newTaskObj = new Task(name, hours, minutes);
		day.unshift(newTaskObj);
		console.log(`NAME: ${name} HOURS: ${hours} MINUTES ${minutes}`);
		clearTask();
		countTime();
	}
}, false);

btnClear.addEventListener('click', clearTask, false);

sleepingHours.oninput = countTime;
sleepingMinutes.oninput = countTime;

countTime();


