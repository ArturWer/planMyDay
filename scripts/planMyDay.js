let $addNewTask = $('#addNewTask'),
	$clearButton = $('#clearButton');

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
	clearNewTask();
	if ($('[class="empty"]')) {
		$('#userHistoryTask').html(`<option>${newTaskValue}</option>`);
	}

	console.log(newTaskValue);
});

//clear newTask text element
function clearNewTask(){
	document.getElementById('newTaskName').value="";
};
