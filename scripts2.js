



// Seleccionamos todos los items del acordeón
const items = document.querySelectorAll('.acordeon-item');

        // Recorremos cada item para agregarle un evento de 'click'
        items.forEach(item => {
            const cabecera = item.querySelector('.acordeon-cabecera');

            cabecera.addEventListener('click', () => {
                // Primero, cerramos todos los demás items
                items.forEach(otroItem => {
                    if (otroItem !== item && otroItem.classList.contains('activo')) {
                        otroItem.classList.remove('activo');
                    }
                });

                // Luego, abrimos o cerramos el item actual
                item.classList.toggle('activo');
            });
        });

















// Definimos los datos de nuestras páginas
const paginas = [
// paginas
    { titulo: 'Inicio', url: 'index.html' },
    { titulo: 'Sobre Nosotros', url: 'Sobre Nosotros.html' },
    { titulo: 'Ofertas', url: 'Ofertas.html' },
    { titulo: 'Productos', url: 'Productos.html' },
// Celulares
    { titulo: 'Celulares', url: 'productos/Celulares/Todo_Celulares.html' },
    { titulo: 'Samsung A', url: 'productos/Celulares/A.html' },
    { titulo: 'Samsung S', url: 'productos/Celulares/S.html' },
    { titulo: 'Samsung Z', url: 'productos/Celulares/Z.html' },
    { titulo: 'Samsung M', url: 'productos/Celulares/M.html' },
// Tablets
    { titulo: 'Tablets', url: 'productos/Tablets/S.html' },
    { titulo: 'Samsung Tab S', url: 'productos/Tablets/S.html' },
    { titulo: 'Samsung Tab A', url: 'productos/Tablets/A.html' },
// Relojes
    { titulo: 'Relojes', url: 'productos/Relojes/Reloj.html' },
];

// Obtenemos las referencias a los elementos del HTML
const buscadorInput = document.getElementById('buscador');
const resultadosDiv = document.getElementById('resultados');
const searchIconBtn = document.getElementById('search-icon-btn'); // NUEVO: referencia al icono
const searchWrapper = document.getElementById('search-wrapper');   // NUEVO: referencia al contenedor

// NUEVO: Event listener para el icono de búsqueda
searchIconBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague al 'document' y cierre el menú inmediatamente
    // Alterna la clase 'active' para mostrar/ocultar el buscador
    searchWrapper.classList.toggle('active');
    
    // Si el buscador se acaba de activar, ponemos el foco en el input para que el usuario pueda escribir
    if (searchWrapper.classList.contains('active')) {
        buscadorInput.focus();
    }
});

// Event listener para cuando el usuario escribe en el buscador
buscadorInput.addEventListener('input', () => {
    const terminoBusqueda = buscadorInput.value.toLowerCase();
    resultadosDiv.innerHTML = '';

    if (terminoBusqueda.length > 0) {
        const paginasFiltradas = paginas.filter(pagina => 
            pagina.titulo.toLowerCase().includes(terminoBusqueda)
        );
        mostrarResultados(paginasFiltradas);
    }
});

// Función para mostrar los resultados en el HTML
function mostrarResultados(paginas) {
    if (paginas.length > 0) {
        paginas.forEach(pagina => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = pagina.titulo;
            itemDiv.classList.add('resultado-item');

            itemDiv.addEventListener('click', () => {
                window.location.href = pagina.url;
            });

            resultadosDiv.appendChild(itemDiv);
        });
    } else {
        const sinResultados = document.createElement('div');
        sinResultados.textContent = 'No se encontraron resultados';
        sinResultados.classList.add('resultado-item');
        resultadosDiv.appendChild(sinResultados);
    }
}

// MEJORADO: Cerrar resultados o el buscador al hacer clic fuera
document.addEventListener('click', (event) => {
    // Si el clic fue FUERA del contenedor del buscador...
    if (!searchWrapper.contains(event.target)) {
        // ...ocultamos la lista de resultados
        resultadosDiv.innerHTML = '';
        
        // ...y si el buscador móvil está activo, lo cerramos
        if (searchWrapper.classList.contains('active')) {
            searchWrapper.classList.remove('active');
        }
    }
});