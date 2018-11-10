let btnAddTask = document.querySelector(".addTask"),
	btnClear = document.querySelector(".clearButton"),
	newTasksField = document.querySelector(".newTasks"),
	day = [];

function Task (name, hours, minutes){
	this.name = name,
	this.duration = [hours, minutes];
}

btnAddTask.addEventListener('click', function(){
	let name = document.getElementById('newTaskName').value,
		hours = document.getElementById("hours").value,
		minutes = document.querySelector(".minutes").value;
	let newTaskObj = new Task(name, hours, minutes);
	day.push(newTaskObj);
	console.log(day);
}, false);

btnClear.addEventListener('click', function(){
	document.getElementById('newTaskName').value = "";
}, false);



