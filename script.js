const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTodo();
});

let todos = loadLocalStorage();

const savelocalStorage = (obj) => {
	localStorage.setItem('todos', JSON.stringify(obj));
};

function addTodo() {
	let todoText = input.value;

	if (todoText) {
		const todoObject = {
			text: todoText,
			completed: false,
			id: Date.now(),
		};

		const li = document.createElement('li');
		li.innerText = todoObject.text;
		li.id = todoObject.id;

		todosUL.insertBefore(li, todosUL.firstChild);

		todos.push(todoObject);
		savelocalStorage(todos);

		input.value = '';
	}
}

todosUL.addEventListener('click', (e) => {
	if (e.button === 0) {
		e.target.classList.toggle('completed');
		// the +e.targest.id changes the string value to int
		toggleCompletedLocalStorage(+e.target.id);
	}
});

todosUL.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	const selected = document.getElementById(`${e.target.id}`);
	if (selected.nodeName === 'LI') {
		removeLocalStorage(+selected.id);
		selected.remove();
	}
});

function removeLocalStorage(id) {
	let filteredList = todos.filter(function (todo) {
		return todo.id !== id;
	});
	todos = filteredList;
	savelocalStorage(todos);
}

function toggleCompletedLocalStorage(id) {
	todos.forEach((todo) => {
		if (todo.id === id) {
			todo.completed = !todo.completed;
		}
	});
	savelocalStorage(todos);
}

function loadLocalStorage(key = 'todos') {
	todoList = JSON.parse(localStorage.getItem(key));

	if (todoList) {
		todoList.forEach((todo) => {
			const li = document.createElement('li');
			li.innerText = todo.text;
			li.id = todo.id;
			if (todo.completed) {
				li.classList.add('completed');
			}
			todosUL.insertBefore(li, todosUL.firstChild);
		});
	} else {
		todoList = [];
	}

	return todoList;
}
// localStorage.setItem('name', JSON.stringify(obj));
// JSON.parse(localStorage.getItem(obj));
