const taskForm = document.forms['adding-new-task'];
const newTaskInput = taskForm.elements['new-task-name'];
const tasksList = document.querySelector('.task-list');

tasks = [];

const addTask = function(event) {
    event.preventDefault();
    const newTaskName = newTaskInput.value;
    if(!newTaskName) {
        window.alert('Nazwa zadania nie może być pusta.');
    } else {
        tasks.push(newTaskName);
        renderTasksList();
        taskForm.reset();
    }
}

taskForm.addEventListener('submit', addTask);

const deleteTask = function(event) {
    const taskToBeDeleted = event.currentTarget.parentNode;
    const span = taskToBeDeleted.querySelector('span');
    const taskNameToDelete = span.innerText;
    const indexOfDeletedTask = tasks.indexOf(taskNameToDelete);
    tasks.splice(indexOfDeletedTask, 1);
    renderTasksList();
}

const editTask = function(event) {
    const listItemToChange = event.currentTarget.parentNode;
    renderEditTaskView(listItemToChange);
}

const saveEditedTask = function(event) {
    event.preventDefault();

    const editingInput = document.forms['editing-task'].elements['changed-task-name'];
    const newTaskName = editingInput.value;

    if(!newTaskName) {
        window.alert("Nazwa zadania nie może być pusta.");
    } else {
        const listItemEdited = event.currentTarget.parentNode.parentNode;
        const span = listItemEdited.querySelector('span');
        const oldTaskName = span.dataset.taskName;        
        updateTasksArray(oldTaskName, newTaskName);
    }
}

const updateTasksArray = function(oldTaskName, newTaskName) {
    const indexOfReplacedTask = tasks.indexOf(oldTaskName);
    tasks.splice(indexOfReplacedTask, 1, newTaskName);
    renderTasksList(false);
}

const renderTasksList = function() {
    tasksList.innerHTML = '';

    for(task of tasks) {       
        const newTaskElement = document.createElement('li');

        const taskName = document.createElement('span');
        newTaskElement.appendChild(taskName)
        taskName.dataset.taskName = task;
        taskName.innerHTML = task;       

        const editButton = document.createElement('button');
        newTaskElement.appendChild(editButton);
        editButton.classList.add('edit-button');
        editButton.innerText = "Edytuj";
        editButton.addEventListener('click', editTask);
        
        const deleteButton = document.createElement('button');
        newTaskElement.appendChild(deleteButton);
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = "Usuń";        
        deleteButton.addEventListener('click', deleteTask);

        tasksList.appendChild(newTaskElement);        
    }
}

const renderEditTaskView = function(listItemToChange) {
    const span = listItemToChange.querySelector('span');
    const editButton = listItemToChange.querySelector('.edit-button');
    const deleteButton = listItemToChange.querySelector('.delete-button');
    const oldTaskName = span.dataset.taskName;

    span.innerHTML = '';
    editButton.remove();    

    const editingForm = document.createElement('form');
    listItemToChange.insertBefore(editingForm, deleteButton);
    editingForm.setAttribute("name", "editing-task");
    editingForm.setAttribute("novalidate", "");

    const editingInput = document.createElement('input');
    editingForm.appendChild(editingInput);
    editingInput.setAttribute('type', 'text');
    editingInput.setAttribute('name', 'changed-task-name');
    editingInput.value = oldTaskName;
    editingInput.focus();

    const confirmChangesButton = document.createElement('input');
    editingForm.appendChild(confirmChangesButton);
    confirmChangesButton.setAttribute('type', 'submit');
    confirmChangesButton.setAttribute('value', 'Zatwierdź zmiany')
    confirmChangesButton.addEventListener('click', saveEditedTask);
}