const tasks = [];
let pending = null;
let buffer = "";

function ask(prompt, callback) {
  process.stdout.write(prompt);
  pending = callback;
}

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let i;
  while ((i = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, i).replace(/\r$/, "");
    buffer = buffer.slice(i + 1);
    if (pending) {
      const callback = pending;
      pending = null;
      callback(line);
    }
  }
});

function showMenu() {
  console.log("1: Add Task");
  console.log("2: View Task");
  console.log("3: Delete Task");
  console.log("4: Search Task");
  console.log("5: Exit");
  ask("Choose an option: ", handleInput);
}

function handleInput(input) {
  const option = input.trim();

  if (option === "1") {
    ask("Enter Note: ", (note) => {
      tasks.push(note.trim());
      console.log("Note added.");
      showMenu();
    });
  } else if (option === "2") {
    if (tasks.length === 0) console.log("No tasks yet.");
    tasks.forEach((note, i) => console.log(`${i + 1}: ${note}`));
    showMenu();
  } else if (option === "3") {
    ask("Enter Task ID: ", (line) => {
      const id = Number(line.trim());
      if (Number.isInteger(id) && id >= 1 && id <= tasks.length) {
        console.log("Deleted:", tasks.splice(id - 1, 1)[0]);
      } else {
        console.log("Invalid ID.");
      }
      showMenu();
    });
  } else if (option === "4") {
    ask("Search tasks: ", (term) => {
      const query = term.trim().toLowerCase();
      const matches = tasks
        .map((note, i) => ({ id: i + 1, note }))
        .filter(({ note }) => note.toLowerCase().includes(query));
      if (matches.length === 0) console.log("No matches.");
      matches.forEach(({ id, note }) => console.log(`${id}: ${note}`));
      showMenu();
    });
  } else if (option === "5") {
    console.log("Thanks for using tasks App");
    process.exit(0);
  } else {
    console.log("Invalid option.");
    showMenu();
  }
}

showMenu();