const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const authRoutes = require("./routes/auth"); // Aquí se corrige la ruta

const app = express();

// Configuración de Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Rutas para el registro, inicio de sesión y otras operaciones de usuarios
app.use("/api/auth", authRoutes); // Aquí se utiliza el prefijo /api/auth

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

// Middleware para verificar si el usuario ha iniciado sesión
const requireLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ejemplo de uso para proteger una ruta
app.get("/dashboard", requireLogin, (req, res) => {
  res.send("Bienvenido al dashboard.");
});
