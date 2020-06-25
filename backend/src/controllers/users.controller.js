const userCtrlr= {};
const User = require('../models/User');

//creo el objeto notesCtrlr y creo las funciones getNotes, createNotes, etc. luego las uso en note.js
userCtrlr.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrlr.createUser = async (req, res) => {
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json('User created')
}

userCtrlr.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('User deleted');
}

module.exports = userCtrlr;
