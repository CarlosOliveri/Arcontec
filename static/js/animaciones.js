window.addEventListener('load', () => {

    // Espera un pequeño tiempo (opcional) para un efecto más suave
    setTimeout(() => {
        try{
            document.querySelector('.texto-banner').classList.add('text-banner-visible');
            document.querySelector('.contacto-fijo').classList.add('contacto-fijo-visible');
        } catch(e){
            console.debug("Elementos de animación no encontrados en esta página.");
        }
        document.querySelector('.logo-enlace').classList.add('animacion-logo');
    }, 50);
});

window.addEventListener('scroll', () => {
    const btnSubir = document.getElementById('btnSubir');
    
    if (window.scrollY > 300) {
        btnSubir.style.display = 'block';
    } else {
        btnSubir.style.display = 'none';
    }
});

// Acción al hacer clic
try{
    document.getElementById('btnSubir').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} catch(e){
    console.debug("Botón de subir no encontrado en esta página.");
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY; // Cuánto has bajado
    const windowHeight = window.innerHeight; // Altura visible de la ventana
    const docHeight = document.documentElement.scrollHeight; // Altura total del documento

    // Si el scroll llegó al final (o muy cerca)
    if (scrollTop + windowHeight >= docHeight - 10) {
        document.querySelector('.contacto-fijo').classList.remove('contacto-fijo-visible');
    }else{
        document.querySelector('.contacto-fijo').classList.add('contacto-fijo-visible');
    }
});