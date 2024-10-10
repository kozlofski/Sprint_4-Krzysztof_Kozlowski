const taskForm = document.forms['adding-new-task'];
const taskInput = taskForm.elements['new-task-name'];
const taskList = document.querySelector('task-list');

console.log(taskInput);

const addTask = (e) => {
    e.preventDefault();
    if(taskInput) {
        createListElement();
    } else {
        showAlert();
    }

};

taskForm.addEventListener('click', addTask);
