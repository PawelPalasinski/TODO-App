//Modatl - HTML elements

const form = document.querySelector("#form");
const textInput = document.querySelector("#textInput");
const dateInput = document.querySelector("#dateInput");
const textarea = document.querySelector("#textarea");
const msg = document.querySelector("#msg");

// Main page - HTML elements

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
  }
};

let data = {};

let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML += `
          <div>
          <span class="fw-bold">${data.text}</span>
          <span class="small text-secondary">${data.date}</span>
          <p>${data.description}</p>
          <span class="options">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash"></i>
          </span>
        </div>
    `;
};
