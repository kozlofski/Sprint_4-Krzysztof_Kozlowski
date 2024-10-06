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
    const itemToChange = event.currentTarget.parentNode;
    const span = itemToChange.querySelector('span');
    const taskToBeEdited = span.innerText;
    span.innerText = ''
    const editButton = itemToChange.querySelector('.edit-button');
    editButton.remove();    
    const deleteButton = itemToChange.querySelector('.delete-button');

    const confirmChangesButton = document.createElement('input');
    confirmChangesButton.setAttribute('type', 'submit');
    confirmChangesButton.setAttribute('value', 'Zatwierdź zmiany')
    confirmChangesButton.addEventListener('click', confirmChanges);
    
    const editingInput = document.createElement('input');
    editingInput.setAttribute('type', 'text');

    itemToChange.insertBefore(editingInput, deleteButton);
    itemToChange.insertBefore(confirmChangesButton, deleteButton);

    console.log(itemToChange);
}

taskForm.addEventListener('submit', addTask);

const renderTasksList = function() {
    tasksList.innerHTML = '';
    for(task of tasks) {
       
        const newTaskElement = document.createElement('li');
        const taskName = document.createElement('span');
        taskName.innerHTML = task;
        

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerText = "Edytuj";
        editButton.addEventListener('click', editTask);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = "Usuń";        
        deleteButton.addEventListener('click', deleteTask);

        newTaskElement.appendChild(taskName)
        newTaskElement.appendChild(editButton);
        newTaskElement.appendChild(deleteButton);
        tasksList.appendChild(newTaskElement);        
    }
}