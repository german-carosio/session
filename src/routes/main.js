const express = require("express");//llamar express
const router = express.Router();//llamar al router de express
const MainController = require('../controllers/MainController');
const guestMiddleware = require('../middlewares/guestMiddleware')

//crear las rutas para "/..."  (app.get)
router.get("/", guestMiddleware, MainController.index);


//exportar el router
module.exports = router;