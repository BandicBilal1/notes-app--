const chalk = require("chalk")
const notes = require("./notes")
const yargs = require("yargs")
const { removeNote, listNotes } = require("./notes")
const { string, demandOption } = require("yargs")

//Customize yargs version
yargs.version("1.1.0")

//Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Enter note",
            demandOption: true,
            type: "string"
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            desccribe: "Note title!",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: "list",
    description: "Listing a notes",
    handler(argv) {
        notes.listNotes()
    }
})

//Create read command
yargs.command ({
    command: "read",
    description: "Reading a notes",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()

