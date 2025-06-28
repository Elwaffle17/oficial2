const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

	// Agregamos los listener de los enlaces para filtrar por categoria.
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
	});

	// Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});

















const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Counter to track current image
let counter = 0;
const slideWidth = carouselImages[0].clientWidth; // Width of a single image

// Set the initial position (optional, good for ensuring start)
carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';

// Function to move to the next slide
const nextSlide = () => {
    if (counter >= carouselImages.length - 1) {
        // If at the last slide, reset to the first to loop
        counter = 0;
    } else {
        counter++;
    }
    carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
};

// Function to move to the previous slide
const prevSlide = () => {
    if (counter <= 0) {
        // If at the first slide, go to the last to loop
        counter = carouselImages.length - 1;
    } else {
        counter--;
    }
    carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
};

// Event Listeners for buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Automatic slide functionality
let autoSlide = setInterval(nextSlide, 3000); // Change image every 3 seconds (3000ms)

// Pause automatic slide on hover
carouselSlide.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

// Resume automatic slide on mouse leave
carouselSlide.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3000);
});

// Optional: Adjust slideWidth on window resize for responsiveness
window.addEventListener('resize', () => {
    const newSlideWidth = carouselImages[0].clientWidth;
    carouselSlide.style.transform = 'translateX(' + (-newSlideWidth * counter) + 'px)';
});















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