document.addEventListener('DOMContentLoaded', function() {
  const todoList = document.getElementById('todo-list');
  const addButton = document.getElementById('add-button');
  const input = document.getElementById('todo-input');

  // Sayfa yüklendiğinde kayıtlı görevleri yükle
  loadTodoItems();


  addButton.addEventListener('click', function() {
    const todoText = input.value;
    if (todoText.length < 3) {
      alert("Görev en az 3 harf içermelidir!");
      return;
    }

    addTodoItem(todoText);
    input.value = '';
  });

  input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Formun gönderilmesini engelle
      const todoText = input.value;
      if (todoText.length < 3) {
        alert("Görev en az 3 harf içermelidir!");
        return;
      }
      addTodoItem(input.value);
      input.value = '';
    }
  });

  todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
      const todoItem = event.target.parentNode;
      deleteTodoItem(todoItem);
    } else if (event.target.classList.contains('check-button')) {
      const todoItem = event.target.parentNode;
      todoItem.classList.toggle('completed');
    }
  });

  function addTodoItem(text) {
    const todoItem = createTodoItem(text);
    todoList.appendChild(todoItem);
    saveTodoItems(); // Görevlerin güncel halini kaydet
  }

  function deleteTodoItem(todoItem) {
    todoList.removeChild(todoItem);
    saveTodoItems(); // Görevlerin güncel halini kaydet
  }

  function createTodoItem(text) {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <span>${text}</span>
      <button class="delete-button">Sil</button>
      <button class="check-button">&#10003;</button>
    `;
    const span = todoItem.querySelector('span');
    span.innerText = text;
    return todoItem;
  }

  

  function saveTodoItems() {
    const todoItems = Array.from(todoList.children).map(function(todoItem) {
      return todoItem.querySelector('span').innerText;
    });
    localStorage.setItem('todos', JSON.stringify(todoItems));
  }

  function loadTodoItems() {
    const todoItems = JSON.parse(localStorage.getItem('todos')) || [];
    todoItems.forEach(function(todoText) {
      addTodoItem(todoText);
    });
  }
});
