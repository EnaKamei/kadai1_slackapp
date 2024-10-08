// Todo項目を格納する配列
let todos = [];

// DOMの要素を取得
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Todoを追加する関数
function addTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    todos.push(todo);
    renderTodos();
    todoInput.value = '';
  }
}

// Todoを削除する関数
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// Todoの完了状態を切り替える関数
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  renderTodos();
}

// Todoを表示する関数
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add(todo.completed ? 'completed' : '');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    const span = document.createElement('span');
    span.textContent = todo.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// フォームのイベントリスナーを設定
todoForm.addEventListener('submit', addTodo);

// ページ読み込み時にローカルストレージからTodoを復元
window.addEventListener('load', () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = storedTodos;
  renderTodos();
});

// ページ終了時にTodoをローカルストレージに保存
window.addEventListener('beforeunload', () => {
  localStorage.setItem('todos', JSON.stringify(todos));
});