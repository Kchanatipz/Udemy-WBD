let cmd = prompt("Enter a command");
const toDoList = [];

while (cmd !== "quit" && cmd !== "q") {
    if (cmd === "new") {
        const newToDo = prompt("Enter new todo");
        toDoList.push(newToDo);
        console.log(`${newToDo} is added to the list.`);
        cmd = prompt("Enter new command");
    } else if (cmd === "list") {
        console.log("*****************");
        for (let i=0; i<toDoList.length; i++) {
            console.log(`${i} : ${toDoList[i]}`);
        }
        console.log("*****************");
        cmd = prompt("Enter new command");
    } else if (cmd === "delete") {
        let index = parseInt(prompt("Enter an index you want to delete"));
        while (Number.isNaN(index)) {
            console.warn("Please enter valid index.")
            index = parseInt(prompt("Enter index you want to delete"));
        }
        let deleted = toDoList.splice(index,1);
        console.log("---------------------");
        console.log(`${deleted} has been deleted.`)
        if (toDoList.lenght !== 0) {
            console.log("The remain lists are");
            for (let i=0; i<toDoList.length; i++) {
                console.log(`${i} : ${toDoList[i]}`);
            }
            console.log("---------------------");
        }
        cmd = prompt("Enter new command");
    } else {
        console.warn("Please enter valid commands.")
        cmd = prompt("Enter valid command");
    }
}

console.log("Quitting the app...");