document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.imagen-contenedor');

    imagenes.forEach(imagenContenedor => {
        imagenContenedor.addEventListener('click', function() {
            const imagen = this.querySelector('img');
            const rutaImagen = imagen.getAttribute('src');
            alert(`Has hecho clic en la imagen: ${rutaImagen}`);
            // Aquí puedes agregar más interactividad, como abrir un modal con la imagen más grande
        });
    });
});