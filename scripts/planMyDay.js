let btnAddTask = document.querySelector(".addTask"),
	btnClear = document.querySelector(".clearButton"),
	newTasksField = document.querySelector(".newTasks");

function Task (name, duration){
	name = this.name,
	duration = this.duration;
}

btnAddTask.addEventListener('click', function(){
	let name = document.getElementById('newTaskName').textContent;
}, false);

btnClear.addEventListener('click', function(){
	document.getElementById('newTaskName').textContent = "";
}, false);

//getting new user's task
$addNewTask.on('click', function(event){
	let newTaskValue = document.getElementById('newTaskName').value;
	let newTaskHour = document.getElementById('taskTimeHours').value;
	let newTimeMinutes = document.getElementById('taskTimeMinutes').value;
	let newTaskObject = new Task (newTaskValue,newTaskHour,newTimeMinutes);
	dayTasks.push(newTaskObject);
	clearNewTask();
	if (newTaskValue) {
		$('#userTasksList').fadeIn(1500);
		$('#userTasksList ul').append(`<li>${newTaskObject.name} 
			(${newTaskObject.hours} h ${newTaskObject.minutes} min)</li>`);
	};

	console.log(dayTasks);
});

//addin class .done when user click on the task
$('#userTasksList').on('click', function(event){
	target = event.target;
	$(target).addClass('done');
});

//Calculation NONsleeping time in the day
 $('#sleepingTimeHours, #userSleepingTimeMinutes').on('change', function(){
 	console.log('Change');
 });
 //draw free time in the day
 function drawFreeTime(){
 	
 };

