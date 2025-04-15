window.onload = function () {
  loadTasks();
};

document.getElementById('add-task').addEventListener('click', function () {
  const taskInput = document.getElementById('task-input').value;
  const taskPriority = document.getElementById('task-priority').value;  // Agregar prioridad seleccionada
  const taskDesc = document.getElementById('task-desc').value;

  if (taskInput === '') return; // No agregar tarea vacía

  const task = {
      name: taskInput,
      priority: taskPriority,  // Guardar prioridad
      description: taskDesc,
      completed: false
  };

  // Guardar la tarea en el almacenamiento local
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  clearInputs();
});

// Función para renderizar las tareas
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';  // Limpiar lista de tareas

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function (task, index) {
      const li = document.createElement('li');
      li.classList.add(task.priority); // Agregar clase según prioridad
      if (task.completed) {
          li.classList.add('completed'); // Si la tarea está completada, añadir clase 'completed'
      }

      li.innerHTML = `
          <span>${task.name}</span>
          <button onclick="toggleTask(${index})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
          <button onclick="editTask(${index})">Editar</button>
          <button onclick="deleteTask(${index})">Eliminar</button>
      `;
      taskList.appendChild(li);
  });

  // Actualizar el contador de tareas pendientes
  document.getElementById('task-count').innerText = `Tareas Pendientes: ${tasks.filter(task => !task.completed).length}`;
}

function clearInputs() {
  document.getElementById('task-input').value = '';
  document.getElementById('task-desc').value = '';
}

function toggleTask(index) {
  // Cargar las tareas del almacenamiento local
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Cambiar el estado de completado de la tarea
  tasks[index].completed = !tasks[index].completed;

  // Guardar las tareas actualizadas de nuevo en el almacenamiento local
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Volver a renderizar las tareas
  renderTasks();
}

// Función para editar una tarea
function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks[index];

  const newTaskName = prompt("Edita la tarea:", task.name);
  const newTaskDesc = prompt("Edita la descripción:", task.description);

  if (newTaskName && newTaskDesc !== null) {
      task.name = newTaskName;
      task.description = newTaskDesc;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
  }
}

// Función para eliminar una tarea
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1); // Eliminar tarea por índice
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Filtro de tareas
document.getElementById('filter-all').addEventListener('click', () => filterTasks('all'));
document.getElementById('filter-completed').addEventListener('click', () => filterTasks('completed'));
document.getElementById('filter-pending').addEventListener('click', () => filterTasks('pending'));

function filterTasks(filter) {
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
      const isCompleted = task.classList.contains('completed');
      if (
          filter === 'all' ||
          (filter === 'completed' && isCompleted) ||
          (filter === 'pending' && !isCompleted)
      ) {
          task.style.display = 'block';
      } else {
          task.style.display = 'none';
      }
  });
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTaskToList(task.name, task.priority, task.description, task.completed);
  });
}

function addTaskToList(text, priority, description, completed) {
  const taskList = document.getElementById('task-list');
  const li = document.createElement('li');

  li.classList.add(priority);
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = `${text} - ${description}`;
  li.appendChild(span);

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Completar';
  completeButton.addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks();
      updateTaskCount();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', function () {
      const newTask = prompt("Edita la tarea:", text);
      const newDesc = prompt("Edita la descripción:", description);
      if (newTask && newDesc !== null) {
          span.textContent = `${newTask} - ${newDesc}`;
          saveTasks();
      }
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.addEventListener('click', function () {
      taskList.removeChild(li);
      saveTasks();
      updateTaskCount();
  });

  li.appendChild(completeButton);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  updateTaskCount();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
      const span = li.querySelector('span').textContent;
      const [text, description] = span.split(' - ');
      tasks.push({
          text,
          description,
          priority: li.classList.contains('high') ? 'high' :
                    li.classList.contains('medium') ? 'medium' : 'low',
          completed: li.classList.contains('completed')
      });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCount() {
  const pendingTasks = document.querySelectorAll('li:not(.completed)').length;
  document.getElementById('task-count').textContent = `Tareas Pendientes: ${pendingTasks}`;
}
