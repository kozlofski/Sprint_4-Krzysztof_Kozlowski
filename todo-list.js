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
    event.preventDefault();
    const taskToBeDeleted = event.currentTarget.parentNode.firstElementChild.innerText;
    const indexOfDelTask = tasks.indexOf(taskToBeDeleted);
    console.log(indexOfDelTask);
    tasks.splice(indexOfDelTask, 1);
    renderTasksList(false);
}

const saveEditedTask = function(event) {
    event.preventDefault();
    const listItemEdited = event.currentTarget.parentNode.parentNode;
    const span = listItemEdited.querySelector('span');
    const oldTaskName = span.dataset.taskName;

    const editingInput = document.forms['editing-task'].elements['changed-task-name'];
    const newTaskName = editingInput.value;

    updateTasksArray(oldTaskName, newTaskName);
}

const updateTasksArray = function(oldTaskName, newTaskName) {
    console.log(`old: ${oldTaskName}, new: ${newTaskName}`);
    const indexOfReplacedTask = tasks.indexOf(oldTaskName);
    console.log(indexOfReplacedTask);
    tasks.splice(indexOfReplacedTask, 1, newTaskName);
    renderTasksList(false);
}

const editTask = function(event) {
    event.preventDefault();
    const listItemToChange = event.currentTarget.parentNode;
    renderEditTaskView(listItemToChange);
}

taskForm.addEventListener('submit', addTask);

const renderTasksList = function() {
    tasksList.innerHTML = '';
    for(task of tasks) {       
        const newTaskElement = document.createElement('li');

        const taskName = document.createElement('span');
        taskName.dataset.taskName = task;
        taskName.innerHTML = task;       
        newTaskElement.appendChild(taskName)

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerText = "Edytuj";
        editButton.addEventListener('click', editTask);
        newTaskElement.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = "Usuń";        
        deleteButton.addEventListener('click', deleteTask);
        newTaskElement.appendChild(deleteButton);

        tasksList.appendChild(newTaskElement);        
    }
}

const renderEditTaskView = function(listItemToChange) {
    const span = listItemToChange.querySelector('span');
    const editButton = listItemToChange.querySelector('.edit-button');
    const deleteButton = listItemToChange.querySelector('.delete-button');

    span.innerHTML = '';
    editButton.remove();    

    const editingForm = document.createElement('form');
    editingForm.setAttribute("name", "editing-task");
    editingForm.setAttribute("novalidate", "");
    listItemToChange.insertBefore(editingForm, deleteButton);

    const editingInput = document.createElement('input');
    editingForm.appendChild(editingInput);
    editingInput.setAttribute('type', 'text');
    editingInput.setAttribute('name', 'changed-task-name');

    const confirmChangesButton = document.createElement('input');
    confirmChangesButton.setAttribute('type', 'submit');
    confirmChangesButton.setAttribute('value', 'Zatwierdź zmiany')
    confirmChangesButton.addEventListener('click', saveEditedTask);
    editingForm.appendChild(confirmChangesButton);
}