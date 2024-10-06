const taskForm = document.forms['adding-new-task'];
const newTaskInput = taskForm.elements['new-task-name'];
const tasksList = document.querySelector('.task-list');

tasks = [];

const addTask = function(event) {
    event.preventDefault();
    const newTaskName = newTaskInput.value;
    tasks.push(newTaskName);
    console.log(tasks)
    renderTasksList();
}

taskForm.addEventListener('submit', addTask);

const renderTasksList = function() {
    tasksList.innerHTML = '';
    for(task of tasks) {
        const newTaskElement = document.createElement('li');
        newTaskElement.innerText = task;
        tasksList.appendChild(newTaskElement);
    }
}