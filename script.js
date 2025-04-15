document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
      addTaskToList(taskText);
      taskInput.value = ''; // Limpiar el input después de agregar la tarea
    }
  });
  
  function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.textContent = task;
    
    // Crear un botón de eliminar para cada tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(li);
    });
    
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  // Cargar tareas guardadas al iniciar
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToList(task));
  };
  
  // Agregar tarea y guardar en localStorage
  document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
      addTaskToList(taskText);
      taskInput.value = '';
      saveTasks(); // Guardar las tareas después de agregar una nueva
    }
  });
  
  // Agregar tarea a la lista en el HTML
  function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.textContent = task;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(li);
      saveTasks(); // Guardar las tareas después de eliminar una
    });
    
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
  
  // Guardar tareas en localStorage
  function saveTasks() {
    const taskList = document.querySelectorAll('#task-list li');
    const tasks = [];
    taskList.forEach(task => tasks.push(task.textContent.replace('Eliminar', '').trim()));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
