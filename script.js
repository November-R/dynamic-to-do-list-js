
/*
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded successfully!");

    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask(){

        let taskText = taskInput.value;

        if(taskText = ""){
            alert("Please enter a task");
        }

            let listElement = document.createElement('li');
            listElement.textContent = taskText;
            taskList.appendChild(listElement);

            addButton.addEventListener("click", addTask);


            let newButton = document.createElement('button');
            newButton.classList.add("remove-btn");
            newButton.textContent = "Remove";

            newButton.addEventListener("click", function() {
                listElement.remove();
            });
            listElement.appendChild(newButton);
            
            taskInput.value="";


            taskInput.addEventListener("keypress", addTask);

            if (event.key == "Enter") {
                alert("You have added a new task")
            }
            
        
    }

    addTask();
})
*/

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM loaded successfully.");

    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    let tasks = [];

    loadTasks();
    

    function loadTasks(){

        const storedTasks = localStorage.getItem("tasks");
        //const jsonStoredTask = JSON.stringify(storedTasks);
        console.log(storedTasks);

        

        if(storedTasks == null){
            console.log("No tasks stored");
        }
        else {
            const parsedStoredTask = JSON.parse(storedTasks);
            tasks = parsedStoredTask;//populating the tasks array
            //console.log(parsedStoredTask);

            parsedStoredTask.forEach(taskText => {
            addTask(taskText);
        });
        }


    }

    //loadTasks();
    
    
    function saveTask(){

        const jsonArray = JSON.stringify(tasks);
        localStorage.setItem("tasks", jsonArray);

    }

    // saveTask();


    function addTask(taskText) {

        const fromStorage = (taskText !== undefined);

        if (!fromStorage){
            taskText = taskInput.value.trim();

        }

        if(taskText === ""){
            alert("Please enter a task!")
        }else {

            const listElement = document.createElement("li");
            listElement.textContent = taskText;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-btn");

            removeButton.addEventListener("click", function() {
            listElement.remove();
            });

            listElement.appendChild(removeButton);
            taskList.appendChild(listElement);
            tasks.push(taskText);

            if(!fromStorage){
                saveTask();
            }

            if (!fromStorage) {
                taskInput.value = "";
            }
        }    
    }

    
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function(event) {
        //console.log("key pressed:", event.key);

            if(event.key == "Enter") {
                addTask();
            
            }
    });




})