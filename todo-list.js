const taskForm = document.forms['adding-new-task'];
const newTaskInput = taskForm.elements['new-task-name'];

tasks = [];

const addTask = function(event) {
    event.preventDefault();
    const newTaskName = newTaskInput.value;
    tasks.push(newTaskName);
    console.log(tasks)
}

taskForm.addEventListener('submit', addTask);
