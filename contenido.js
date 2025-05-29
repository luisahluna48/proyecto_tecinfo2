document.addEventListener('DOMContentLoaded', () => {
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Eliminar la clase 'active' de todos los enlaces
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            // Añadir la clase 'active' al enlace clickeado
            this.classList.add('active');
        });
    });

    // Intersection Observer para secciones que aparecen con fade-in
    const sections = document.querySelectorAll('.section.fade-in');
    const observerOptions = {
        root: null, // relativo al viewport
        rootMargin: '0px',
        threshold: 0.2 // Se activa cuando el 20% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que esté activo
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Contador de Números Dinámico para la Sección de Impacto
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Se activa cuando el 50% del elemento es visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 100); // Ajusta la velocidad según el objetivo

                const timer = setInterval(() => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = current.toLocaleString('es-MX');
                    } else {
                        entry.target.textContent = target.toLocaleString('es-MX');
                        clearInterval(timer);
                    }
                }, 20); // Velocidad del conteo

                observer.unobserve(entry.target);
            }
        });
    }, counterObserverOptions);

    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });

    // Funcionalidad del Modal
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalFormContent = document.getElementById('modal-form-content');

    const donateFoodBtn = document.getElementById('donateFoodBtn');
    const donateMoneyBtn = document.getElementById('donateMoneyBtn');
    const findFoodCentersBtn = document.getElementById('findFoodCentersBtn');
    const proceedToDonateMoneyBtn = document.getElementById('proceedToDonateMoney');

    function openModal(title, message, formHtml = '') {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalFormContent.innerHTML = formHtml;
        modal.style.display = 'flex'; // Usar flex para centrar
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Event Listeners para los Botones de Llamada a la Acción
    donateFoodBtn.addEventListener('click', () => {
        openModal(
            '¡Gracias por tu interés en Donar Alimentos!',
            'Por favor, selecciona tu ubicación para encontrar el centro de acopio más cercano o contáctanos para coordinar una entrega.',
            `
            <form class="modal-form">
                <input type="text" placeholder="Tu Código Postal" id="zipCodeInput">
                <button type="submit" class="cta-button small-button">Buscar Centros</button>
            </form>
            `
        );
        // Agrega más lógica aquí para manejar el envío del formulario y mostrar resultados
    });

    findFoodCentersBtn.addEventListener('click', () => {
        openModal(
            'Encuentra Centros de Acopio de Alimentos',
            'Ingresa tu ubicación o código postal para ver los puntos de entrega de alimentos más cercanos y sus horarios.',
            `
            <form class="modal-form">
                <input type="text" placeholder="Tu Código Postal" id="zipCodeInput">
                <button type="submit" class="cta-button small-button">Buscar</button>
            </form>
            `
        );
    });

    donateMoneyBtn.addEventListener('click', () => {
        openModal(
            '¡Tu Donación Monetaria es Fundamental!',
            'Elige un monto y forma de pago. Cada aporte nos permite seguir ayudando a más personas.',
            `
            <form class="modal-form">
                <div class="amount-buttons modal-amount-buttons">
                    <button type="button" class="amount-btn" data-amount="50">$50</button>
                    <button type="button" class="amount-btn" data-amount="100">$100</button>
                    <button type="button" class="amount-btn" data-amount="250">$250</button>
                    <button type="button" class="amount-btn" data-amount="500">$500</button>
                    <input type="number" placeholder="Otro monto" class="custom-amount" min="10" id="modalCustomAmount">
                </div>
                <p style="text-align: center; margin-top: 15px;">Monto seleccionado: <span id="selectedAmount">$0</span></p>
                <button type="submit" class="cta-button small-button">Proceder al Pago</button>
            </form>
            `
        );
        setupModalAmountSelection(); // Llama a la función para manejar los clics de los botones de cantidad dentro del modal
    });

    proceedToDonateMoneyBtn.addEventListener('click', () => {
        // Este botón en el contenido principal también abrirá el modal de donación monetaria
        donateMoneyBtn.click();
    });

    // Función para manejar la selección de cantidad en el modal de donación monetaria
    function setupModalAmountSelection() {
        const modalAmountButtons = document.querySelectorAll('.modal-amount-buttons .amount-btn');
        const modalCustomAmountInput = document.getElementById('modalCustomAmount');
        const selectedAmountSpan = document.getElementById('selectedAmount');
        let currentSelectedAmount = 0;

        modalAmountButtons.forEach(button => {
            button.addEventListener('click', function() {
                modalAmountButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                currentSelectedAmount = parseInt(this.dataset.amount);
                selectedAmountSpan.textContent = `$${currentSelectedAmount}`;
                modalCustomAmountInput.value = ''; // Limpiar la entrada personalizada
            });
        });

        modalCustomAmountInput.addEventListener('input', function() {
            modalAmountButtons.forEach(btn => btn.classList.remove('selected'));
            currentSelectedAmount = parseInt(this.value) || 0;
            selectedAmountSpan.textContent = `$${currentSelectedAmount}`;
        });

        // Manejar el envío del formulario del modal (ejemplo)
        modalFormContent.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const finalAmount = currentSelectedAmount || parseInt(modalCustomAmountInput.value) || 0;
            if (finalAmount > 0) {
                alert(`¡Gracias por tu donación de $${finalAmount.toLocaleString('es-MX')}! Redirigiendo a la pasarela de pago...`);
                modal.style.display = 'none';
                // Aquí normalmente redirigirías a una pasarela de pago
                // window.location.href = `your-payment-gateway-url?amount=${finalAmount}`;
            } else {
                alert('Por favor, selecciona o ingresa un monto para donar.');
            }
        });
    }

    // Resaltar el enlace de navegación activo según la posición de desplazamiento
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionsForNavHighlight = document.querySelectorAll('main section'); // Dirige las secciones principales

    function highlightNavLink() {
        let current = '';
        sectionsForNavHighlight.forEach(section => {
            const sectionTop = section.offsetTop - (document.querySelector('.navbar').offsetHeight + 50); // Ajustar por la altura de la nav fija y un buffer
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Llama al cargar para establecer el enlace activo inicial

});
