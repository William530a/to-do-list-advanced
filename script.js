window.onload = function () {
    loadTasks();
  };
  
  document.getElementById('add-task').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    const descInput = document.getElementById('task-desc');
    const priority = document.getElementById('task-priority').value;
  
    const taskText = taskInput.value.trim();
    const description = descInput.value.trim();
  
    if (taskText !== '') {
      addTaskToList(taskText, priority, description, false);
      saveTasks();
      taskInput.value = '';
      descInput.value = '';
    }
  });
  
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
  
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
      addTaskToList(task.text, task.priority, task.description, task.completed);
    });
  }
  
  function updateTaskCount() {
    const pendingTasks = document.querySelectorAll('li:not(.completed)').length;
    document.getElementById('task-count').textContent = `Tareas Pendientes: ${pendingTasks}`;
  }
  
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
  