const addTaskButton = document.querySelector(".add-task-button");
const taskForm = document.forms['adding-new-task'];

const newTaskInput = taskForm.elements['new-task-name'];

console.dir(newTaskInput)

const addTask = function(event) {
    event.preventDefault();
    const taskName = newTaskInput.value;
    console.log(taskName)
}

taskForm.addEventListener('submit', addTask);
