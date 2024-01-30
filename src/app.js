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
        // Assuming you have an input field with id 'taskInput'
        const taskInput = document.getElementById('taskInput');

        // Get the value from the input field
        const taskName = taskInput.value.trim();

        // Check if the input is not empty before creating the widget
        if (taskName !== "") {
            createWidget(todoColumn, taskName);

            // Clear the input field after creating the widget (optional)
            taskInput.value = "";
        }
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
    /*widget.draggable = true;

    widget.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', taskName);
        widget.classList.add('widget-being-dragged');
    });
    
    widget.addEventListener('dragend', function () {
        widget.classList.remove('widget-being-dragged');
    });*/


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
                    <a class="dropdown-item" href="#" onclick="moveWidget(this, 'To Do')">To Do</a>
                    <a class="dropdown-item" href="#" onclick="moveWidget(this, 'Doing')">Doing</a>
                    <a class="dropdown-item" href="#" onclick="moveWidget(this, 'Done')">Done</a>
                </div>
            </div>

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

    // Create an input field for editing
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = widget.querySelector('p').innerText;
    editInput.classList.add('form-control', 'edit-input');

    // Replace the paragraph with the input field
    widget.querySelector('p').replaceWith(editInput);

    // Create a save button for the editing
    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-success', 'btn-sm', 'ms-2');
    saveButton.innerText = 'Save';
    saveButton.onclick = function () {
        saveEdit(widget, editInput);
    };

    // Append the save button
    widget.querySelector('.btn-group').appendChild(saveButton);

    // Remove the edit button
    button.remove();
}

function saveEdit(widget, editInput) {
    const updatedTaskName = editInput.value.trim();

    // Check if the edited task name is not empty
    if (updatedTaskName !== "") {
        // Replace the input field with a new paragraph containing the updated task name
        const newParagraph = document.createElement('p');
        newParagraph.innerText = updatedTaskName;
        editInput.replaceWith(newParagraph);

        // Create a new edit button
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        editButton.innerText = 'Edit';
        editButton.onclick = function () {
            editWidget(this);
        };

        // Insert the new edit button before the save button
        widget.querySelector('.btn-group').insertBefore(editButton, widget.querySelector('.btn-success'));

        // Remove the save button
        widget.querySelector('.btn-success').remove();
    }
}


function editWidgetOld(button) {
    const widget = button.parentNode.parentNode;
    const taskName = prompt('Edit task:', widget.querySelector('p').innerText);
    widget.querySelector('p').innerText = taskName;
}

function moveWidget(link, newColumn) {
    const widget = link.closest('.widget');
    const targetColumn = document.getElementById(newColumn.toLowerCase() + '-column');

    // Check if the widget is not already a child of the target column
    if (widget && targetColumn && widget.parentNode !== targetColumn) {
        targetColumn.appendChild(widget);
    }
}



function moveWidgetOld(button) {
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

/*function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const taskName = event.dataTransfer.getData('text/plain');
    const draggedWidget = document.querySelector('.widget-being-dragged');

    if (draggedWidget) {
        const targetColumn = event.target.closest('.task-column');
        moveWidgetToColumn(draggedWidget, targetColumn);
    } else {
        const targetColumn = event.target.closest('.task-column');
        createWidget(targetColumn, taskName);
    }
}*/


/*function drop(event) {
    event.preventDefault();
    const taskName = event.dataTransfer.getData('text/plain');
    const targetColumn = event.target.closest('.task-column');
    createWidget(targetColumn, taskName);
}*/
