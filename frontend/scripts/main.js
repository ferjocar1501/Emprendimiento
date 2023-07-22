document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // Funciones para mostrar y cerrar los modales
  function mostrarModalRegistro() {
    const modalRegistro = document.getElementById('modalRegistro');
    modalRegistro.style.display = 'block';
  }

  function mostrarModalInicioSesion() {
    const modalInicioSesion = document.getElementById('modalInicioSesion');
    modalInicioSesion.style.display = 'block';
  }

  function cerrarModal(target) {
    const modal = document.getElementById(target);
    modal.style.display = 'none';
  }

  // Asignar eventos a los botones para abrir y cerrar los modales
  const btnRegistro = document.getElementById('btnRegistro');
  const btnInicioSesion = document.getElementById('btnInicioSesion');
  const cerrarModalRegistroBtn = document.getElementById('cerrarModalRegistro');
  const cerrarModalInicioSesionBtn = document.getElementById('cerrarModalInicioSesion');

  btnRegistro.addEventListener('click', () => {
    mostrarModalRegistro();
    cerrarModal('modalInicioSesion'); // Cerrar el modal de inicio de sesión si está abierto
  });

  btnInicioSesion.addEventListener('click', () => {
    mostrarModalInicioSesion();
    cerrarModal('modalRegistro'); // Cerrar el modal de registro si está abierto
  });

  cerrarModalRegistroBtn.addEventListener('click', () => {
    cerrarModal('modalRegistro');
  });

  cerrarModalInicioSesionBtn.addEventListener('click', () => {
    cerrarModal('modalInicioSesion');
  });

  // Manejador para el formulario de Registro
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const password = formData.get('password');
    const fullname = formData.get('fullname');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, fullname })
      });

      const data = await response.json();
      console.log(data); // Respuesta del servidor después del registro
      cerrarModal('modalRegistro'); // Cerrar el modal de registro después de enviar el formulario
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });

  // Manejador para el formulario de Inicio de Sesión
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log(data); // Respuesta del servidor después del inicio de sesión
      cerrarModal('modalInicioSesion'); // Cerrar el modal de inicio de sesión después de enviar el formulario
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });
});










