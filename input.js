const inputValue = document.getElementById('input-text');
const addBtn = document.querySelector('.btn');
const taskList = document.querySelector('.task-list');
const todo = []
console.log(inputValue, addBtn, taskList);

function deleteTodo(index){
    todo.splice(index , 1);
    displayTodo()
}
// function displayTodo() {
//     taskList.innerHTML =
//         todo.map(( ele, index) => {
//            return ` <div class="task">
//                 <p class="text">${ele}</p>
//                 <button class="del" onclick="deleteTodo(${index})">&#128465;</button>
//             </div>`

//         }).join('')
// }

function displayTodo() {
    let fragment = document.createDocumentFragment(); // Create a document fragment
    todo.forEach((ele, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        let taskText = document.createElement("p");
        taskText.classList.add("text");
        taskText.textContent = ele;

        let delButton = document.createElement("button");
        delButton.classList.add("del");
        delButton.innerHTML = "&#128465;"; // Trash icon
        delButton.addEventListener('click' ,() => deleteTodo(index));

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(delButton);
        fragment.appendChild(taskDiv);
    });

    taskList.innerHTML = ""; // Clear the previous tasks
    taskList.appendChild(fragment); // Append all tasks at once
}

function createTodo() {
    // console.log("hello");
    if (inputValue.value.trim() === '') {
        alert('Kindly add a todo')
    }
    else {
        if (todo.includes(inputValue.value.trim())) {
            alert("This todo is already exist")
        }
        else {
            todo.push(inputValue.value.trim())
            inputValue.value=''
            console.log(todo);
            displayTodo()
        }


    }
}
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createTodo()
})