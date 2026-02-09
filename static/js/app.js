import initMenuHamburguesa from "./menuHamburguesa.js";
import Proyecto from "./clases/Proyecto.js";
import Servicio from "./clases/Servicio.js";
import "./animaciones.js";

initMenuHamburguesa();//viene de menuHamburguesa.js

const path = window.location.pathname;

Proyecto.get_proyectos().then(data => {
    const proyectosContainer = document.querySelector(".contenido-proyectos"); 
    let limit = Infinity;
    if (path == "/") {
        limit = 3;
    }
    data.forEach((element,index) => {
        if(index >= limit) return; // Limitar a 3 proyectos

        const proyectoDiv = document.createElement("div");
        proyectoDiv.classList.add("proyecto");

        const imgProyecto = document.createElement("div");
        imgProyecto.classList.add("imagen-proyecto");
        proyectoDiv.appendChild(imgProyecto);

        const proyectoImg = document.createElement("img");
        proyectoImg.src = `../../assets/proyectos/${element["imagenes"][0]}`;
        proyectoImg.alt = "Imagen del proyecto";
        imgProyecto.appendChild(proyectoImg);

        const proyectoText = document.createElement("div");
        proyectoText.classList.add("texto-proyecto"); 
        const titulo = document.createElement("h3");
        titulo.textContent = element["titulo"];
        proyectoText.appendChild(titulo);

        const descripcion = document.createElement("p");
        const palabras = element["descripcion"].split(' ');
        const limite = 30; // máximo de palabras permitidas
        if (palabras.length > limite) {
            descripcion.textContent = palabras.slice(0, limite).join(' ') + ' ...';
        }else{
            descripcion.textContent = element["descripcion"];
        }
        proyectoText.appendChild(descripcion);

        const boton = document.createElement("a");
        boton.classList.add("boton-blanco");
        boton.textContent = "Ver Proyecto";
        boton.href = `proyecto.html?id=${element["id"]}`
        proyectoText.appendChild(boton);

        proyectoDiv.appendChild(proyectoText);

        if(path == "/" | path == "/proyectos.html")
        proyectosContainer.appendChild(proyectoDiv);
    });
});

if(path == "/"){
    Servicio.get_servicios().then(data => {
        const productosContenedor = document.querySelector(".contenido-productos");
        data.forEach(element => {
            const servicio = document.createElement("a");
            servicio.href = "";

            const producto = document.createElement("div");
            producto.classList.add("producto");

            const productoImgDiv = document.createElement("div");
            productoImgDiv.classList.add("producto__img");

            const productoImg = document.createElement("img");
            productoImg.src = `../../assets/proyectos/${element["imagen"]}`;
            productoImg.alt = "Imagen del servicio";
            const blurImg = document.createElement("div");
            blurImg.classList.add("producto-blur");

            productoImgDiv.appendChild(productoImg);
            productoImgDiv.appendChild(blurImg);

            producto.appendChild(productoImgDiv);

            const productoText = document.createElement("div");
            productoText.classList.add("producto__texto");

            const titulo = document.createElement("h3");
            titulo.textContent = element["servicio"];
            const subraya = document.createElement("div");
            subraya.classList.add("subrayar");

            productoText.appendChild(titulo);
            productoText.appendChild(subraya);

            producto.appendChild(productoText);

            servicio.appendChild(producto);

            productosContenedor.appendChild(servicio);
    
        });
    });
}

