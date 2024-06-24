
function formatTask(task) {
  return task.length > 14 ? task.slice(0, 14) + "..." : task;
}

function formatDueDate(dueDate) {
  return dueDate || "No due date";
}

function formatStatus(Done) {
  return Done ? "Done" : "Pending";
}


function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function addTodo(task, dueDate) {
  const todos = getTodos();
  const newTodo = {
    id: getRandomId(),
    task: formatTask(task),
    dueDate: formatDueDate(dueDate),
    Done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
}

function editTodo(id, updatedTask) {
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.task = updatedTask;
    saveTodos(todos);
  }
  return todo;
}

function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
}

function toggleTodoStatus(id) {
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.Done = !todo.Done;
    saveTodos(todos);
  }
}

function clearTodos() {
  saveTodos([]);
}


function handleAddTodo() {
  const taskInput = document.querySelector("input");
  const dateInput = document.querySelector(".schedule-date");
  const task = taskInput.value;
  const dueDate = dateInput.value;

  addTodo(task, dueDate);
  showAllTodos();
  taskInput.value = "";
  dateInput.value = "";
}

function handleClear() {
  clearTodos();
  showAllTodos();
}

function showAllTodos() {
  const todos = getTodos();
  displayTodos(todos);
}

function displayTodos(todos) {
  const todosListBody = document.querySelector(".todos-list-body");
  todosListBody.innerHTML = "";

  if (todos.length === 0) {
    todosListBody.innerHTML =
      '<tr><td colspan="5" class="text-center">Empty</td></tr>';
    return;
  }

  todos.forEach((todo) => {
    todosListBody.innerHTML += `
      <tr class="todo-item" data-id="${todo.id}">
        <td>${formatTask(todo.task)}</td>
        <td>${formatDueDate(todo.dueDate)}</td>
        <td>${formatStatus(todo.Done)}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="handleEditTodo('${todo.id}')">
            <i class="bx bx-edit-alt bx-xs"></i>
          </button>
          <button class="btn btn-success btn-sm" onclick="handleToggleStatus('${todo.id}')">
            <i class="bx bx-check bx-xs"></i>
          </button>
          <button class="btn btn-error btn-sm" onclick="handleDeleteTodo('${todo.id}')">
            <i class="bx bx-trash bx-xs"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

function handleEditTodo(id) {
  const taskInput = document.querySelector("input");
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    taskInput.value = todo.task;
    deleteTodo(id);

    const addBtn = document.querySelector(".add-task-button");
    const handleUpdate = () => {
      addBtn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
      showAllTodos();
      addBtn.removeEventListener("click", handleUpdate);
    };

    addBtn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    addBtn.addEventListener("click", handleUpdate);
  }
}

function handleToggleStatus(id) {
  toggleTodoStatus(id);
  showAllTodos();
}

function handleDeleteTodo(id) {
  deleteTodo(id);
  showAllTodos();
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".add-task-button");
  const deleteAllBtn = document.querySelector(".delete-all-btn");

  addBtn.addEventListener("click", handleAddTodo);
  deleteAllBtn.addEventListener("click", handleClear);

  showAllTodos();
});
