const LS_KEY = "taskList"
const taskCnt = document.getElementById("task-cnt")
let taskArray = JSON.parse(localStorage.getItem(LS_KEY)) || []

const renderFullTaskCard = (task) => {
    return `<section class="popup_wrapper">
                <form action="#" class="todo_card col-gap" id="${task.UUID}">
                    <input name="taskTitle" class="task-title" type="text" placeholder="Title" value="${task.title}"/>
                    <textarea name="taskContent" class="task-text">${task.content}</textarea>
                    <div class="row row-gap">
                        <button class="btn" id="delete-task-btn">Delete</button>
                        <button class="btn" id="pin-task-btn">Pin</button>
                        <button type="submit" class="btn" id="save-task-btn">Save</button>
                    </div>
                </form>
            </section>`
}

const renderTaskList = () => {
    taskCnt.innerHTML = taskArray.length > 0 ? taskArray.map(task => {
        return ` <div class="todo_card row row-gap" id="${task.UUID}">
                        <h4 class="todo_card--title-s">${task.title}</h4>
                        <p class="todo_card--text-s">${task.content}</p>
                     </div>`
    }).join("") : `<p class="row empty-list ">You didn't create any task yet`
}

const removeNewTaskCard = () => document.getElementById("popup-new-task").remove()

const renderNewTaskCard = () => {
    const card = `<section class="popup_wrapper" id="popup-new-task">
                <form aria-label="Form to create new task" action="#" class="popup col col-gap">
                    <div class="row">
                        <input aria-label="Task title" name="taskTitle" class="task-title" type="text" placeholder="Title">
                        <button class="cancel" id="btn-close-popup">X</button>
                    </div>
                    <textarea aria-label="Task text content" name="taskContent" class="task-text"
                              placeholder="Enter your task here"></textarea>
                    <button type="submit" class="btn" id="btn-save-new-task">Save</button>
                </form>
            </section>`
    document.body.insertAdjacentHTML("afterbegin", card)
}

const saveTasks = () => {
    setTimeout(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(taskArray))
        renderTaskList()
    }, 0)
}
const createTask = (taskForm) => {
    //todo: add form validation
    if (!taskForm.taskTitle.value && !taskForm.taskContent.value) return
    let newTask = {
        UUID: UUID(),
        title: taskForm.taskTitle.value,
        content: taskForm.taskContent.value,
        isPined: false,
        timeStamp: Date.now()
    }
    taskArray.push(newTask)
    saveTasks()
    removeNewTaskCard()
}

const getTaskList = () => JSON.parse(localStorage.getItem(LS_KEY)) || []

const getTask = (uuid) => {
    let lsData = JSON.parse(localStorage.getItem(LS_KEY)) || []
    return lsData.filter(task => task.UUID === uuid)[0]
}

const editTask = (taskForm) => {
    const editedTask = {
        title: taskForm.taskTitle.value,
        content: taskForm.taskContent.value,
        timeStamp: Date.now()
    }
    taskArray = taskArray.map(task => {
        if (task.UUID === taskForm.id) {
            return {...task, ...editedTask}
        }
        return task
    })
    console.table(taskArray)
    saveTasks()
    taskForm.parentElement.remove()

}

const deleteTask = (taskUUID) => {

}

const deleteAllTasks = () => {
    taskArray.length = 0
    localStorage.clear()
    renderTaskList()
}

function UUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    switch (e.submitter.id) {
        case "save-task-btn":
            e.preventDefault()
            editTask(e.target)
            break
        case"btn-save-new-task":
            e.preventDefault()
            createTask(e.target)
            break
    }
})

document.addEventListener("click", (e) => {
    const targetId = e.target.id

    switch (targetId) {
        case "add-btn":
            renderNewTaskCard()
            break
        case "btn-close-popup":
            removeNewTaskCard()
            break
        case "delete-all-task-btn" :
            confirm("Clear all tasks?") ? deleteAllTasks() : null
            break
    }

    if (e.target.closest(".todo_card.row.row-gap")) {
        document.body.insertAdjacentHTML(
            "afterbegin",
            renderFullTaskCard(getTask(e.target.closest(".todo_card.row.row-gap").id)))
    }
})

renderTaskList(getTaskList())

