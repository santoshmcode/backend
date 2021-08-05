const EventEmiter = require("events");
const Readline = require("readline");

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const eventEmitter = new EventEmiter();
const books = ["Samaantar", "The Blue Umbrella"];
function options() {
    console.log("Enter a Number");
    console.log("1 - Show all books");
    console.log("2 - Add a new book");
    console.log("3 - Quit");
}
let a = eventEmitter.on("options", () => {
    options();

    readline.question("", (i) => {
        if (i == 1) {
            for (let el of books) {
                console.log(el);
            }
            console.log("--------------------------------");
            eventEmitter.emit("options");
        } else if (i == 2) {
            readline.question("Enter Book Name: ", (name) => {
                books.push(name);
                eventEmitter.emit("options");
            });
        } else if (i == 3) {
            readline.question(
                "Are you sure you want to quit - press Y to quit: ",
                (responce) => {
                    if (responce === "Y" || responce === "y") {
                        readline.close();
                    }
                }
            );
        }
    });
});
eventEmitter.emit("options");

readline.on("close", () => {
    console.log("bye bye");
});
