const inputValue = document.getElementById("input-text");
const addBtn = document.querySelector(".btn");
const taskList = document.querySelector(".task-list");
const todo = JSON.parse(localStorage.getItem("todo")) || [];

// delete a todo from todo list
function deleteTodo(index) {
  todo.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo));
  displayTodo();
}

// when we refresh the page then it loading the todo list
window.addEventListener("load", () => {
  displayTodo();
});
// function displayTodo() {
//     taskList.innerHTML =
//         todo.map(( ele, index) => {
//            return ` <div class="task">
//                 <p class="text">${ele}</p>
//                 <button class="del" onclick="deleteTodo(${index})">&#128465;</button>
//             </div>`

//         }).join('')
// }

// display the todo 
function displayTodo() {
  let fragment = document.createDocumentFragment(); // Create a document fragment
  todo.forEach((ele, index) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let taskText = document.createElement("p");
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = ele.completed;
    check.addEventListener("click", (e) => {
      todo[index].completed = check.checked;
      taskText.style.color = check.checked ? "red" : "#6B7280";
      taskText.style.textDecoration = check.checked
        ? "line-through"
        : "none";
      localStorage.setItem("todo", JSON.stringify(todo));
    });

    taskText.classList.add("text");
    taskText.textContent = ele.text;
    taskText.style.color = ele.completed ? "red" : "#6B7280";
    taskText.style.textDecoration = ele.completed
      ? "line-through"
      : "none";

    let delButton = document.createElement("button");
    delButton.classList.add("del");
    delButton.innerHTML = "&#128465;"; // Trash icon
    delButton.addEventListener("click", () => deleteTodo(index, check));

    taskDiv.appendChild(check);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(delButton);
    fragment.appendChild(taskDiv);
  });

  taskList.innerHTML = ""; // Clear the previous tasks
  taskList.appendChild(fragment); // Append all tasks at once
}

// Create a To Do Object
function createTodo() {
  if (inputValue.value.trim() === "") {
    alert("Kindly add a todo");
  } else {
    if (todo.some((item) => item.text === inputValue.value.trim())) {
      alert("This todo is already exist");
    } else {
      todo.push({ text: inputValue.value.trim(), completed: false });
      localStorage.setItem("todo", JSON.stringify(todo));
      inputValue.value = "";
      console.log(todo);
      displayTodo();
    }
  }
}
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createTodo();
});