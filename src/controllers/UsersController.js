const User = require ('../models/User');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');//requiero el encriptador para el password

let usuarios;

//Funcion para leer JSON
function leerJson() {
    const usuariosRead = fs.readFileSync(path.join(__dirname, '../database/users.json'),{encoding:'utf-8'});
    if (usuariosRead === "") {
    usuarios = [];
    }else {
    usuarios = JSON.parse(usuariosRead);
    }
    return usuarios;
}

//Función para escribir JSON 

function escribirJson() {
    const usuariosWrite = JSON.stringify(usuarios, null, "\t");
    fs.writeFileSync(path.join(__dirname, '../database/users.json'), usuariosWrite);
}

let MainController = {

    register: (req,res) => {
        res.render('register');
    },

    processRegister: (req,res) => {

        //validaciones

        const resultValidations = validationResult(req);

        
        if (resultValidations.errors.length > 0) {

            return res.render('register', {
                errors: resultValidations.mapped(),
                oldData: req.body
            })
        } 

        //verificando que no haya otro usuario con el mismo email registrado 
        
        let userInDb = User.findByField('email', req.body.email);

        if (userInDb) {

            return res.render('register', {

                errors: {
                    email:{msg: 'este email ya esta registrado'}
                },
                oldData: req.body
            })
        }

        //pasadas las validaciones creamos el usuario

        let newUser = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10) //encriptando password
        }

        User.create(newUser);
        
        res.render('login');
    },

    login: (req,res) => {
        res.render('login');
    },

    processLogin: (req,res)=>{

        //validando si mail y contraseña son correctos

        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {

            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);

            if (passwordOk) {
                delete userToLogin.password;//elimino el password por seguridad
                req.session.userLogged = userToLogin;
                res.redirect('profile');
            };

        } else {

            return res.render('login', {
                errors: {
                    email: {
                        msg: 'las credenciales son invalidas'
                    }
                }
            });

        };

        
        
    },

    profile: (req, res)=>{
        
        res.render('profile', {user: req.session.userLogged});
    },

    logout: (req,res)=>{
        req.session.destroy();
        res.redirect('/')
    }

    //administrador edit
    /*
    userEdit: (req,res)=>{

        User.update(req.body);

        res.send('Usuario actualizado')
    }*/
}

module.exports = MainController;