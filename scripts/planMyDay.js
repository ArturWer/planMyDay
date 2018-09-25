let $addNewTask = $('#addNewTask');
//getting new user's task
$addNewTask.on('click', function(event){
	event.preventDefault();
	let newTaskValue = document.getElementById('newTaskName').value;


	console.log(newTaskValue);
});