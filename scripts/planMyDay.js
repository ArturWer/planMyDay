let $addNewTask = $('#addNewTask'),
	$clearButton = $('#clearButton')
	dayTasks = [];//day task array for canvas etc.


//Stop sending form
$('button').on('click', function(event){
	event.preventDefault();
});

$clearButton.on('click', function(event){
	clearNewTask();
});
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

//clear newTask text element
function clearNewTask(){
	document.getElementById('newTaskName').value="";
};
//making new task object constructor
function Task(name, hours, minutes){
	this.name = name;
	this.hours = hours;
	this.minutes = minutes;
}
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