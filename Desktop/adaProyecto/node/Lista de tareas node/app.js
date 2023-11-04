import('chalk').then((chalk) => {
    const readline = require('readline');
  
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    const tasks = [];
  
    function displayTasks() {
      if (tasks.length === 0) {
        console.log('No hay tareas.');
      } else {
        console.log('Tareas:');
        tasks.forEach((task, index) => {
          const status = task.completed ? chalk.green('Completada') : chalk.red('Pendiente');
          console.log(`${index + 1}. [${status}] ${task.description}`);
        });
      }
    }
  
    function addTask(description) {
      tasks.push({ description, completed: false });
      console.log('Tarea añadida.');
    }
  
    function completeTask(index) {
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log('Tarea marcada como completada.');
      } else {
        console.log('Índice de tarea no válido.');
      }
    }
  
    function deleteTask(index) {
      if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        console.log('Tarea eliminada.');
      } else {
        console.log('Índice de tarea no válido.');
      }
    }
  
    function executeAction(action, input) {
      switch (action) {
        case 'list':
          displayTasks();
          break;
        case 'add':
          addTask(input);
          break;
        case 'complete':
          completeTask(input);
          break;
        case 'delete':
          deleteTask(input);
          break;
        default:
          console.log('Comando no válido.');
      }
    }
  
    rl.question('Escribe un comando (list, add, complete, delete): ', (action) => {
      if (action === 'list') {
        displayTasks();
      } else if (['add', 'complete', 'delete'].includes(action)) {
        rl.question('Escribe una descripción o un índice de tarea: ', (input) => {
          executeAction(action, input);
          rl.close();
        });
      } else {
        console.log('Comando no válido.');
        rl.close();
      }
    });
  });
  