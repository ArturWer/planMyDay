let $addNewTask = $('#addNewTask');

//Stop sending form
$('button').on('click', function(event){
	event.preventDefault();
});
//getting new user's task
$addNewTask.on('click', function(event){
	let newTaskValue = document.getElementById('newTaskName').value;
	if ($('[class="empty"]')) {
		$('#userHistoryTask').html(`<option>${newTaskValue}</option>`);
	}

	console.log(newTaskValue);
});