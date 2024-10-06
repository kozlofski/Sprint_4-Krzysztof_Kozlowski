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

const deleteTask = function(event) {
    const taskToBeDeleted = event.currentTarget.parentNode.firstElementChild.innerText;
    const indexOfDelTask = tasks.indexOf(taskToBeDeleted);
    console.log(indexOfDelTask);
    tasks.splice(indexOfDelTask, 1);
    renderTasksList();
}

taskForm.addEventListener('submit', addTask);

const renderTasksList = function() {
    tasksList.innerHTML = '';
    for(task of tasks) {
        const newTaskElement = document.createElement('li');
        const taskName = document.createElement('span');
        taskName.innerHTML = task;

        const editButton = document.createElement('button');
        editButton.innerText = "Edytuj";

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Usuń";        
        deleteButton.addEventListener('click', deleteTask);

        newTaskElement.appendChild(taskName)
        newTaskElement.appendChild(editButton);
        newTaskElement.appendChild(deleteButton);
        tasksList.appendChild(newTaskElement);        
    }
}