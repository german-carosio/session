const fs = require('fs');//importo fs
const path = require('path');//importo path

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

const User = {

    //busca todos los usuarios
    findAll: function () {
        leerJson();
        return usuarios;
    },

    //busca por pk (id)
    findByPk: function (id) {

        leerJson();
        
        let userFound = usuarios.find(oneUser => oneUser.id === id)

        return userFound;
    },

    //busco por field (puede ser email)
    findByField: function (field, text) {

        leerJson();

        let userFound = usuarios.find(oneUser => oneUser[field] === text)
        return userFound;
    },

    create: function (userData) {
        
        leerJson();

        //generador ID
        let ultimoContacto = usuarios.length-1; 
        let nuevoId;
        usuarios.length === 0 ? nuevoId = 1 : nuevoId =usuarios[ultimoContacto].id + 1; 
        
        newUser = {
            id: nuevoId,
            ...userData
        };
        
        usuarios.push(newUser);

        escribirJson();

        return newUser;

    },


    update: function (dato) {

        leerJson();

        usuarios.forEach(element => {

            if (element.id === parseInt(req.params.id)) {
                element.nombre = dato.nombre;
                element.apellido = dato.apellido;
                element.telefono = dato.telefono;
                element.direccion = dato.direccion;
                element.fechaNacimiento = dato.fechaNacimiento,
                element.email = dato.email;
            }
             
        });

        escribirJson();
        
    },

    delete: function (id) {
        leerJson();

        let finalUsers = usuarios.filter(oneUser => oneUser.id !== id);

        usuarios = finalUsers;

        escribirJson();

        return true;

    }
}

module.exports = User;