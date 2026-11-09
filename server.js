import readline from "node:readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function showMenu() {
  console.log("1: Add Task");
  console.log("2: View Task");
  console.log("3: Delete Task");
  console.log("4: Search Task");
  console.log("5: Exit");
  rl.question("Choose an option:", handleInput);
}

function findTasks(term) {
  const query = term.trim().toLowerCase();
  if (!query) return [];
  return tasks
    .map((note, index) => ({ id: index + 1, note }))
    .filter(({ note }) => note.toLowerCase().includes(query));
}

function handleInput(input) {
  const option = input.trim();

  if (option === "1") {
    rl.question("\nEnter Note:", (note) => {
      tasks.push(note);
      console.log("Note", note);
      showMenu();
    });
  } else if (option === "2") {
    console.log("\n Created tasks:");
    if (tasks.length <= 0) {
      console.log("\n No tasks Yet,Add tasks.");
      return showMenu();
    }
    tasks.forEach((note, index) => {
      console.log(`${index + 1}:${note}`);
    });
    showMenu();
  } else if (option === "3") {
    rl.question("Enter Note ID: ", (note) => {
      const id = note.trim();
      if (!id || tasks.length <= 0 || id > tasks.length) {
        console.log("\n Invaild id");
        return showMenu();
      }
      const deleted = tasks.splice(Number(id) - 1, 1);
      console.log("Deleted ", deleted);

      showMenu();
    });
  } else if (option === "4") {
    rl.question("\nSearch tasks: ", (term) => {
      if (!term.trim()) {
        console.log("\n Enter something to search for.");
        return showMenu();
      }
      const matches = findTasks(term);
      if (matches.length <= 0) {
        console.log(`\n No tasks found for "${term.trim()}".`);
        return showMenu();
      }
      console.log(`\n Found ${matches.length} matching note(s):`);
      matches.forEach(({ id, note }) => {
        console.log(`${id}:${note}`);
      });
      showMenu();
    });
  } else if (option === "5") {
    console.log("Thanks for using tasks App");
    rl.close();
  } else {
    console.log("Incorrect Input");
    showMenu();
  }
}

showMenu();