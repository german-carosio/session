const {body} = require("express-validator")


const validacionesContacto = [
    body('nombre').notEmpty().withMessage('Debe completar el campo Nombre correctamente'),
    body('email').isEmail().withMessage('Debe completar el campo Email correctamente'),
    body('password').notEmpty().withMessage('Debe completar el campo password correctamente'),
];

module.exports = validacionesContacto;