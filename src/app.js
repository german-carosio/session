const express = require('express');//importar express
const methodOverride = require('method-override');//importo method override para put y delete
const mainRouter = require ('./routes/main');//importar el router main
const usersRouter = require ('./routes/users');//importar el router users
const session = require('express-session');//importar express-session
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');// en header ver o no links segun logueo

const app = express();//declaro express
const port = 3000;//declaro el puerto

app.use(session({
  secret: 'shh',
  resave: false,
  saveUninitialized: false
}));

app.use(userLoggedMiddleware);

app.set('views', 'src/views');//determinando la carpeta de vistas
app.set('view engine','ejs')//template engine - motor de plantillas (en este caso ejs)

app.use(express.urlencoded({ extended : false}));//usando metodo post (viene con paquete node)
app.use(express.json());//para usar json con metodo post
app.use(methodOverride('_method'));//usando metodo put y delete
app.use(express.static("public"));//archivos estaticos

//usar los get del router
app.use("/", mainRouter);
app.use("/users", usersRouter);

//error 404
/*
app.use((req, res, next) => {
  res.status(404).render('not-found')
})*/

//levantar servidor 
app.listen(process.env.PORT || port, () => {
    console.log("Levantando un servidor con Express")
  });

