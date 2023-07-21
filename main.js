let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    alert(`"${nombre}" se ha agregado al carrito.`);
}

function mostrarModalCarrito() {
    const modal = document.getElementById('modalCarrito');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    // Limpiar el contenido actual del carrito
    listaCarrito.innerHTML = '';

    // Agregar elementos al carrito dinámicamente
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        listaCarrito.appendChild(li);
        total += item.precio;
    });

    totalCarrito.textContent = `Total: $${total}`;

    modal.style.display = 'block';
}

function cerrarModalCarrito() {
    const modal = document.getElementById('modalCarrito');
    modal.style.display = 'none';
}
