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
    renderTasksList(false);
}

const confirmChanges = function() {
    
}

const editTask = function(event) {
    const listItemToChange = event.currentTarget.parentNode;

    renderEditTaskView(listItemToChange);

}


taskForm.addEventListener('submit', addTask);

const renderTasksList = function() {
    tasksList.innerHTML = '';
    for(task of tasks) {       
        const newTaskElement = document.createElement('li');

        const taskName = document.createElement('span');
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

    span.innerText = ''
    editButton.remove();    

    const editingInput = document.createElement('input');
    editingInput.setAttribute('type', 'text');
    listItemToChange.insertBefore(editingInput, deleteButton);

    const confirmChangesButton = document.createElement('input');
    confirmChangesButton.setAttribute('type', 'submit');
    confirmChangesButton.setAttribute('value', 'Zatwierdź zmiany')
    confirmChangesButton.addEventListener('click', confirmChanges);
    listItemToChange.insertBefore(confirmChangesButton, deleteButton);
}