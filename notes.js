const chalk = require("chalk")
const fs = require("fs")
const { clearScreenDown } = require("readline")

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find ((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green("New note added"))
    }else {
        console.log(chalk.inverse.red("Note title taken!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    remainingNotes = notes.filter ((note) => note.title !== title)

    saveNotes(remainingNotes)

    if (remainingNotes.length < notes.length) {
        console.log(chalk.inverse.green("Note removed!"))
    }else {
        console.log(chalk.inverse.red("No note found!"))
    }
    
}

const listNotes = () => {
    console.log(chalk.inverse.blue("Your notes: "))
    const notes = loadNotes()

     notes.forEach (note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteToDisplay = notes.find ((note) => note.title === title)

    if (noteToDisplay === undefined) {
        console.log(chalk.inverse.red("No note found!"))
    }else {
        console.log(chalk.inverse.blue(noteToDisplay.title))
        console.log(noteToDisplay.body)
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}