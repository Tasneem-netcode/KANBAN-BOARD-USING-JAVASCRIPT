let tasksData = {}
const todo = document.getElementById("todo");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done"); 
const columns = [todo, inProgress, done];
let draggedTask = null;

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[ col ].forEach(t => {
            const task = document.createElement("div");
            task.draggable = true;
            task.classList.add("task");
            task.innerHTML = `
                <h2>${t.title}</h2>
                <p>${t.description}</p>
                <button>Delete</button>
            `;
            column.appendChild(task);
        })
        console.log(col, data[col]) //
        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;

        const deleteButtons = column.querySelectorAll("button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const task = e.target.parentElement;
                task.remove();
                const tasks = column.querySelectorAll(".task");
                const count = column.querySelector(".right");
                count.innerText = tasks.length;
            })
        })
    }
    
}

console.log(todo, inProgress, done);
const tasks = document.querySelectorAll(".task");

tasks.forEach((task) => {
    task.addEventListener("dragstart", (e) => {   //change 1
        // console.log("drag", e);
        draggedTask = task;
        
    })
})

function addDrageEvents(column){
    column.addEventListener("dragenter",(e)=>{
        // console.log("dragenter", e);
        e.preventDefault(); //
        column.classList.add("hover-over")
        
    })
    column.addEventListener("dragleave",(e)=>{
        // console.log("dragleave", e);
        e.preventDefault();
        column.classList.remove("hover-over")
        
    })
    column.addEventListener("dragover", (e)=>{
        e.preventDefault(); // to allow drop
    })
    column.addEventListener("drop", (e)=>{
        e.preventDefault();
        columns.forEach(col =>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");





        // nEED TO FIX THIS PART 
        tasksData[ col.id] =Array.from(tasks).map(t =>{
            return{
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText,
            }
        })

        console.log(tasksData);
         // TILL HERE
         localStorage.setItem("tasks", JSON.stringify(tasksData));
         count.innerText = tasks.length;
        
    })
        column.appendChild(draggedTask);
        column.classList.remove("hover-over");

        columns.forEach(col =>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            

            count.textContent = tasks.length;

        })

    })
}


addDrageEvents(todo)
addDrageEvents(inProgress)
addDrageEvents(done)

// ADD NEW TASK BUTTON LOGIC
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modal_bg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active"); // to add and remove the active class
})

modal_bg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", (e) =>{
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDescription = document.querySelector("#task-description-input").value;
    const task = document.createElement("div");
    task.draggable = true;
    task.classList.add("task");
    task.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDescription}</p>
    <button>Delete</button>
    `;
    todo.appendChild(task);
    modal.classList.remove("active");
    
    // Clear the inputs for the next task
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description-input").value = "";
    
    
    columns.forEach(col =>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");





        // nEED TO FIX THIS PART 
        tasksData[ col.id] =Array.from(tasks).map(t =>{
            return{
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText,
            }
        })

        console.log(tasksData);
         // TILL HERE
         localStorage.setItem("tasks", JSON.stringify(tasksData));






        count.innerText = tasks.length;
        
    })
    task.addEventListener("drag", (e) =>{
        // console.log("drag", e);
        draggedTask = task; // to store the dragged task
    })
})