document.addEventListener('DOMContentLoaded', function() {
    // Cargar el menú
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-placeholder').innerHTML = data;

            // Obtener referencias a los elementos del menú
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');

            // Añadir evento de clic al menú de hamburguesa después de cargar el menú
            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('open');
                    hamburger.classList.toggle('open');
                });
            }
        })
        .catch(error => console.error('Error al cargar el menú:', error));

    // Cargar el footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el footer:', error));

    // Modal de la galería
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const images = document.querySelectorAll('.gallery-image');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    let currentIndex;

    // Asegurarse de que el modal esté oculto inicialmente
    modal.style.display = 'none';

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex'; // Cambiar a 'flex' para centrar con flexbox
            modalImage.src = image.src;
            captionText.innerHTML = image.alt;
            currentIndex = index;
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        modalImage.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        modalImage.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    });

    // Navegación con el teclado
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                prev.click();
            } else if (event.key === 'ArrowRight') {
                next.click();
            } else if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Navegación con el tacto
    let touchStartX = 0;
    let touchEndX = 0;

    modalImage.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    modalImage.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndX < touchStartX) {
            next.click();
        }
        if (touchEndX > touchStartX) {
            prev.click();
        }
    }
});
