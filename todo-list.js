const taskForm = document.forms['adding-new-task'];
const taskInput = taskForm.elements['new-task-name'];
const taskList = document.querySelector('.task-list');
console.log(taskList);

console.log(taskInput);

const showAlert = () => {
    window.alert('Nazwa zadania nie może być pusta.');
};

const createBtn = (value, callback) => {
    const newBtn = document.createElement('button');
    newBtn.innerText = value;
    newBtn.addEventListener('click', callback);

    return newBtn;
};

const editTask = () => {

};

const deleteTask = (e) => {
    const liToBeDeleted = e.currentTarget.parentNode;
    liToBeDeleted.remove();
};

const createListElement = () => {
    const li = document.createElement('li');
    const liValue = document.createElement('span');
    const editBtn = createBtn('Edytuj', editTask);
    const deleteBtn = createBtn('Usuń', deleteTask);

    liValue.textContent = taskInput.value;

    li.append(liValue, editBtn, deleteBtn);
    taskList.appendChild(li);
};

const addTask = (e) => {
    e.preventDefault();
    if(taskInput.value) {
        createListElement();
        taskForm.reset();
    } else {
        showAlert();
    }

};

taskForm.addEventListener('submit', addTask);
