const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

// Ruta para el registro de usuario
router.post('/register', async (req, res) => {
  console.log("regsitrandoooo")
    const { username, password } = req.body;
    try{
      const [existingUser] = await pool.query('SELECT * FROM base WHERE username = ?', [username])
      console.log(existingUser)
      

    }catch(error){
      console.log("Algo fallo")
      console.log(error)
    }

  //   // Verificar si el usuario ya existe en la base de datos
  //   const [existingUser] = await pool.query('SELECT * FROM base WHERE username = ?', [username]);
  //   if (existingUser.length > 0) {
  //     req.flash('error', 'El usuario ya existe. Intenta con otro.');
  //     return res.redirect('/');
  //   }

  //   // Hashear la password antes de guardarla
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Insertar el nuevo usuario en la base de datos
  //   await pool.query('INSERT INTO base (username, password) VALUES (?, ?)', [username, hashedPassword]);

  //   req.flash('success', 'Registro exitoso. Ahora puedes iniciar sesión.');
  //   res.redirect('/');
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error en el servidor.');
  // }
});

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const [user] = await pool.query('SELECT * FROM base WHERE username = ?', [username]);
    if (user.length === 0) {
      req.flash('error', 'Usuario o password incorrectos.');
      return res.redirect('/');
    }

    // Verificar la password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      req.flash('error', 'Usuario o password incorrectos.');
      return res.redirect('/');
    }

    // Iniciar sesión
    req.session.isLoggedIn = true;
    req.session.userId = user[0].id;
    req.flash('success', 'Inicio de sesión exitoso.');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor.');
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
