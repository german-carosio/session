const express = require("express");//llamar express
const router = express.Router();//llamar al router de express
const UsersController = require('../controllers/UsersController');//llamar al controlador
const validaciones = require('../middlewares/validaciones');//llamo a las validaciones
const guestMiddleware = require('../middlewares/guestMiddleware');//si esta logueado no puede ir a index, register o login
const authMiddleware = require('../middlewares/authMiddleware');// si no esta logueado no puede ir a profile

//crear las rutas para "/..."  (app.get)

router.get("/register", guestMiddleware, UsersController.register);
router.post("/register", validaciones, UsersController.processRegister);
router.get("/login", guestMiddleware, UsersController.login);
router.post("/login", UsersController.processLogin);

router.get("/profile",authMiddleware, UsersController.profile);
router.get("/logout", UsersController.logout);


//exportar el router
module.exports = router;