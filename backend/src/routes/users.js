const {Router} = require('express');
const router = Router();

const {getUsers, createUser, deleteUser} = require('../controllers/users.controller');


//enruta la peticion a una pagina /api/users que esta en app.js y muestra el mensaje Users routes
router.route('/')
    .get(getUsers)
    .post(createUser);

//put es actualizar un objeto por eso debo pasarle el id al igual que en delete
router.route('/:id')
    .delete(deleteUser);


module.exports = router;