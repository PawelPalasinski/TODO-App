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

let data = {};

let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;
  createTasks();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML += `
          <div>
          <span class="fw-bold">${data.text}</span>
          <span class="small text-secondary">${data.date}</span>
          <p>${data.description}</p>
          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this)" class="fas fa-trash"></i>
          </span>
        </div>
    `;
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Delete

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
};

// Edit

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  selectedTask.remove();
};
