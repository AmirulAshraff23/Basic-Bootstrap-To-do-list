// Update clock every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').innerText = formattedTime;
}

// Update greeting message based on time
function updateGreetingMessage() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours}:${minutes}`;

    let greeting;

    if (hours < 12) {
        greeting = 'Good Morning';
    } else if (hours < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    document.getElementById('greeting-message').innerText = `${greeting}! It is now ${formattedTime}. What will you do today?`;
}

// Update clock and greeting message every second
setInterval(() => {
    updateClock();
    updateGreetingMessage();
}, 1000);

// Initial update
updateClock();
updateGreetingMessage();

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the columns
    const todoColumn = document.getElementById('todo-column');
    const doingColumn = document.getElementById('doing-column');
    const doneColumn = document.getElementById('done-column');

    // Add a sample widget to the "To Do" column
    createWidget(todoColumn, 'Insert Your Task with the Edit Button');

    // Set up event listeners for buttons
    document.getElementById('addTaskButton').addEventListener('click', function () {
        const taskName = prompt('Enter task:');
        createWidget(todoColumn, taskName);
    });

    document.getElementById('clearButton').addEventListener('click', function () {
        clearDoneColumn();
    });

    document.getElementById('archiveButton').addEventListener('click', function () {
        archiveTasks();
    });
});

function createWidget(column, taskName) {
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.draggable = true;

    widget.innerHTML = `
        <p>${taskName}</p>
        <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" onclick="editWidget(this)">Edit</button>

            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Move To
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" href="#">To Do</a>
                    <a class="dropdown-item" href="#">Doing</a>
                    <a class="dropdown-item" href="#">Done</a>
                </div>
            </div>

            <button class="btn btn-outline-primary btn-sm" onclick="moveWidget(this)">Move To</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="deleteWidget(this)">Delete</button>
        </div>
    `;

    widget.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', taskName);
    });
    column.appendChild(widget);

    /*document.addEventListener('DOMContentLoaded', function () {
        const dropdownTrigger = widget.querySelector('.dropdown-toggle');
        new bootstrap.Dropdown(dropdownTrigger);
    });*/
}


function toggleDropdown(button) {
    new bootstrap.Dropdown(button);
}


function editWidget(button) {
    const widget = button.parentNode.parentNode;
    const taskName = prompt('Edit task:', widget.querySelector('p').innerText);
    widget.querySelector('p').innerText = taskName;
}

function moveWidget(button) {
    const widget = button.parentNode.parentNode;
    const newColumn = prompt('Move to column (To Do, Doing, Done):');
    const targetColumn = document.getElementById(newColumn.toLowerCase() + '-column');
    if (targetColumn) {
        targetColumn.appendChild(widget);
    }
}

function deleteWidget(button) {
    const widget = button.parentNode.parentNode;
    widget.remove();
}

function clearDoneColumn() {
    const doneColumn = document.getElementById('done-column');
    doneColumn.innerHTML = '';
}

function archiveTasks() {
    // Implement your logic to archive tasks
    alert('Archiving tasks...');
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskName = event.dataTransfer.getData('text/plain');
    const targetColumn = event.target.closest('.task-column');
    createWidget(targetColumn, taskName);
}
