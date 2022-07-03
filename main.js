//HTML elements

const form = document.querySelector("#form");
const textInput = document.querySelector("#textInput");
const dateInput = document.querySelector("#dateInput");
const textarea = document.querySelector("#textarea");
const add = document.querySelector("#add");
const msg = document.querySelector("#msg");

const tasks = document.querySelector("#tasks");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("great!");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal"); // the same as close button
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", ""); // return to the previous state
    })(); // IIFE
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
          <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTasks()" class="fas fa-trash"></i>
          </span>
        </div>
    `);
  });
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Delete

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

// Edit

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

// get tasks list from local storage

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
})();
