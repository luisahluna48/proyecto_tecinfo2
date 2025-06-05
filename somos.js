document.addEventListener('DOMContentLoaded', () => {
    // Aquí puedes añadir interactividad si lo deseas.
    // Por ejemplo, podrías añadir un efecto de "fade-in" al contenido.

    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = 0;
        setTimeout(() => {
            mainContent.style.transition = 'opacity 1s ease-in-out';
            mainContent.style.opacity = 1;
        }, 100); // Pequeño retraso para asegurar que el CSS se ha cargado
    }

    // Ejemplo de interactividad para el botón (aunque el CSS ya maneja el hover/active)
    const canvaButton = document.querySelector('.canva-button');
    if (canvaButton) {
        canvaButton.addEventListener('click', () => {
            console.log('Botón de Canva clickeado. ¡Redirigiendo!');
            // Puedes añadir más lógica aquí si necesitas hacer algo antes de la redirección
            // Por ejemplo, una pequeña animación o un mensaje
        });
    }
});
