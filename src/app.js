const express = require ("express");
const exphbs = require ("express-handlebars");
const cookieParser = require ("cookie-parser");
const passport = require('./config/passport.config.js');
const productRoutes = require('./routes/products.router.js');
const cartRoutes = require('./routes/carts.router.js');
const viewsRouter = require("./routes/views.router.js");
const  usersRouter  = require("./routes/user.routes.js");
const sessionsRouter = require('./routes/sessions.routes.js');


const app = express(); 
const PUERTO = 8080;
const connectDB = require('./db');

connectDB();

//MIDDLEWARE: 
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

//EXPRESS-HANDLERBARS
app.engine("handlebars", exphbs.engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views");

//RUTAS:
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use("/", viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
});