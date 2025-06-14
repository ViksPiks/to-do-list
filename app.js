const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body: "Rent a bike for the upcoming weekend.\r\n",
    title: "Contact bike hire",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body: "Buy those red shoes fom mom birthday. Or maybe the perfume from Chloe that she likes\r\n",
    title: "Gift for mom",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body: "Go through the boxes and check there. If don't find, order a new copy online.\r\n",
    title: "Find the book you bought in Amsterdam a year ago",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body: "Find cheap flights to Italy or Croatia. Book the restaurants for lunch and dinners. Check if you have all the summer essentials (swimsuit, sunglasses, Birkenstocks)  \r\n",
    title: "Plan summer holidays! URGENT!",
  },
];

const objOfTasks = tasks.reduce((acc, task) => {
  acc[task._id] = task;
  return acc;
}, {});

/* begin of READ */
function createTaskElement({ _id, title, body }) {
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "flex-wrap",
    "mt-2"
  );
  li.setAttribute("data-task-id", _id);

  const span = document.createElement("span");
  span.textContent = title;
  span.style.fontWeight = "bold";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete task";
  deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

  const paragraph = document.createElement("p");
  paragraph.textContent = body;
  paragraph.classList.add("mt-2", "w-100");

  li.append(span, deleteBtn, paragraph);

  return li;
}

const listContainer = document.querySelector(".tasks-list-section .list-group");

function renderAllTasks(tasksObj) {
  if (!tasksObj) {
    console.error("add task list");
    return;
  }

  const fragment = document.createDocumentFragment();

  Object.values(tasksObj).forEach((task) => {
    const li = createTaskElement(task);
    fragment.appendChild(li);
  });

  listContainer.appendChild(fragment);
}

renderAllTasks(objOfTasks);
/* end of READ */

/* begin of CREATE */
const form = document.forms["addTask"];
const inputTitle = form.elements["title"];
const inputBody = form.elements["body"];

form.addEventListener("submit", onFormsSubmitHandler);

function onFormsSubmitHandler(e) {
  e.preventDefault();

  const titleValue = inputTitle.value;
  const bodyValue = inputBody.value;

  if (!titleValue || !bodyValue) {
    alert("Please enter the titile and body");
    return;
  }

  const newTask = createNewTask(titleValue, bodyValue);
  const taskElement = createTaskElement(newTask);

  listContainer.insertAdjacentElement("afterbegin", taskElement);

  form.reset();
}

function createNewTask(title, body) {
  const newTask = {
    title,
    body,
    completed: false,
    _id: `task-${Math.random()}`,
  };

  objOfTasks[newTask._id] = newTask;

  return { ...newTask };
}
/* end of CREATE */

/* begin of DELETE */
listContainer.addEventListener("click", onDeleteHandler);

function deleteTask(id) {
  const { title } = objOfTasks[id];
  const isConfirmed = confirm(`Want to delete task: ${title}?`);
  if (!isConfirmed) return;
  const taskElement = document.querySelector(`[data-task-id="${id}"]`);
  taskElement.remove();
  delete objOfTasks[id];
}

function onDeleteHandler({ target }) {
  if (target.classList.contains("delete-btn")) {
    const btnParent = target.closest("[data-task-id]");
    const id = btnParent.dataset.taskId;
    deleteTask(id);
  }
}
/* end of DELETE */
