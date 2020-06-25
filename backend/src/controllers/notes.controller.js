const notesCtrlr= {};
const Note = require('../models/Note');

//creo el objeto notesCtrlr y creo las funciones getNotes, createNotes, etc. luego las uso en note.js
//await , async lo uso porque el metodo find() es asincrono, todas las consultas a bd son asincronas
notesCtrlr.getNotes = async (req, res) => {
    const notes = await Note.find(); //retorna un arreglo de notas
    res.json(notes);
}

//el params.id es el id de la nota que quiero traer de la bd, busca por id en la bd
notesCtrlr.getNote= async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

notesCtrlr.createNotes = async (req, res) => {
    const {title, content, date, author} = req.body;
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author

    });
    await newNote.save();
    res.json('Note saved');
}

notesCtrlr.updateNotes = async (req, res) => {
    const {title, content, date, author} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{
        title: title,
        content: content,
        author: author
    });
    res.json('Note updated');
}

notesCtrlr.deleteNotes = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json('Note deleted');
}

module.exports = notesCtrlr;
