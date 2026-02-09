export default function initMenuHamburguesa(){
    const menuHamburContainer = document.querySelector(".menu-hamburguesa");
    const menuHambur = menuHamburContainer.querySelector("a");
    const nav = document.querySelector(".navegacion");
    menuHambur.addEventListener("click", (e) =>{
        e.preventDefault();

        /* if(nav.classList.contains("navegacion-activo") && nav.classList.contains("navegacion-activo")){
            nav.classList.remove("navegacion-activo");
        }else{
            nav.classList.add("navegacion-activo");
        } */
        nav.classList.toggle("navegacion-activo");
        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
        //e.preventDefault();
        if (!nav.contains(e.target) && !menuHambur.contains(e.target)) {
            nav.classList.remove('navegacion-activo');
        }
    })

    // Cerrar el menú al hacer clic en cualquier enlace del menú
    nav.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', () => {
            nav.classList.remove('navegacion-activo');
        });
    });
}