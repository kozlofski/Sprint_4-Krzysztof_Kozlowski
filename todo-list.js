const taskForm = document.forms['adding-new-task'];
const taskInput = taskForm.elements['new-task-name'];
const taskList = document.querySelector('.task-list');

// === ADD TASK ===

const addTask = (e) => {
    e.preventDefault();
    if(taskInput.value) {
        createListElement(taskInput.value);
        taskForm.reset();
    } else {
        showAlert();
    }
};

taskForm.addEventListener('submit', addTask);

const createListElement = (textValue) => {
    const li = document.createElement('li');
    appendTaskContent(li, textValue);
    taskList.appendChild(li);
};

const appendTaskContent = (li, textValue) => {
    const liValue = createTaskName(textValue);
    const editBtn = createBtn('Edytuj', editTask, 'edit-btn');
    const deleteBtn = createBtn('Usuń', deleteTask, 'delete-btn');
    
    li.append(liValue, editBtn, deleteBtn);
};

const createTaskName = (textValue) => {
    const liValue = document.createElement('span');
    liValue.textContent = textValue;
    return liValue;
};

const createBtn = (value, callback, className) => {
    const newBtn = document.createElement('button');
    newBtn.innerText = value;
    newBtn.addEventListener('click', callback);
    newBtn.classList.add(className);
    return newBtn;
};

const showAlert = () => {
    window.alert('Nazwa zadania nie może być pusta.');
};

// === EDIT TASK ===

const editTask = (e) => {
    const editedLi = e.currentTarget.parentNode;
    renderEditTaskView(editedLi);
};

const renderEditTaskView = (editedLi) => {
    const oldTaskName = editedLi.querySelector('span').innerText;
    editedLi.innerHTML = '';

    const editInput = createTextInput();
    const confirmChangesBtn = createBtn('Zatwierdź zmiany', confirmChanges, 'confirm-btn');
    const deleteBtn = createBtn('Usuń', deleteTask, 'delete-btn');

    editedLi.append(editInput, confirmChangesBtn, deleteBtn);
    editInput.value = oldTaskName; 
};

const createTextInput = () => {
    const textInput = document.createElement('input');
    textInput.type = 'text';
    return textInput;
};

const confirmChanges = (e) => {
    const editedLi = e.currentTarget.parentNode;
    const editInput = editedLi.querySelector('input');
    const newTaskName = editInput.value;

    if(newTaskName) {
        editedLi.innerHTML = '';
        appendTaskContent(editedLi, newTaskName);
    } else {
        showAlert();
    }
};

/// === DELETE TASK ===

const deleteTask = (e) => {
    const liToBeDeleted = e.currentTarget.parentNode;
    liToBeDeleted.remove();
};