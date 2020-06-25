const {Router} = require('express');
const router = Router();
const {getNotes, createNotes, getNote, updateNotes, deleteNotes} = require('../controllers/notes.controller');

//el '/' se refiere a la ruta raiz que pongo en app.js que es /api/notes
router.route('/')
    .get(getNotes)
    .post(createNotes);

router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNotes);

module.exports = router;