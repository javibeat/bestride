document.addEventListener('DOMContentLoaded', () => {
    const imageUrls = [
        'https://javibeat.com/attiko.jpg', // Sustituye estas URLs por las reales de tus imágenes
        'https://javibeat.com/yula.jpg',
        'https://javibeat.com/flyer.jpg',
        'https://javibeat.com/drifte.jpg',
    ];

    const mainImage = document.querySelector('.gallery-main-image');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');

    // Establecer la imagen principal como la primera de la lista
    mainImage.src = imageUrls[0];

    // Función para cambiar la imagen principal
    function changeMainImage(src) {
        mainImage.src = src;
        document.querySelectorAll('.gallery-thumbnail-image').forEach(thumbnail => {
            thumbnail.classList.remove('active');
            if (thumbnail.src === src) {
                thumbnail.classList.add('active');
            }
        });
    }

    // Cargar miniaturas
    imageUrls.forEach(url => {
        const thumbnail = document.createElement('img');
        thumbnail.src = url;
        thumbnail.classList.add('gallery-thumbnail-image');
        thumbnail.addEventListener('click', () => changeMainImage(url));
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Establecer la miniatura activa inicial
    changeMainImage(imageUrls[0]);
});
