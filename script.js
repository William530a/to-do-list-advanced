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
  
  function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.textContent = task;
    
    // Crear un botón de completar
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.addEventListener('click', function() {
      li.classList.toggle('completed');
      saveTasks(); // Guardar las tareas después de marcar una como completada
    });
    
    // Crear un botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(li);
      saveTasks(); // Guardar las tareas después de eliminar una
    });
    
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  document.getElementById('filter-all').addEventListener('click', function() {
    filterTasks('all');
  });
  
  document.getElementById('filter-completed').addEventListener('click', function() {
    filterTasks('completed');
  });
  
  document.getElementById('filter-pending').addEventListener('click', function() {
    filterTasks('pending');
  });
  
  function filterTasks(filter) {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.querySelectorAll('li');
    
    tasks.forEach(function(task) {
      if (filter === 'all') {
        task.style.display = 'block';
      } else if (filter === 'completed' && task.classList.contains('completed')) {
        task.style.display = 'block';
      } else if (filter === 'pending' && !task.classList.contains('completed')) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }

  function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    const currentDate = new Date().toLocaleString();  // Fecha de creación
    li.textContent = `${task} (Creada: ${currentDate})`;
    
    // Crear un botón de completar
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.addEventListener('click', function() {
      li.classList.toggle('completed');
      saveTasks();
    });
    
    // Crear un botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(li);
      saveTasks();
    });
    
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Ordenar las tareas por fecha (las tareas más recientes arriba)
    savedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    savedTasks.forEach(task => addTaskToList(task.text));
  }

  function updateTaskCount() {
    const pendingTasks = document.querySelectorAll('li:not(.completed)').length;
    document.getElementById('task-count').textContent = `Tareas Pendientes: ${pendingTasks}`;
  }
  
  function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.textContent = task;
    
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.addEventListener('click', function() {
      li.classList.toggle('completed');
      updateTaskCount();
      saveTasks();
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(li);
      updateTaskCount();
      saveTasks();
    });
    
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    
    updateTaskCount();  // Actualizar el contador cada vez que se agregue una tarea
  }
  
  
