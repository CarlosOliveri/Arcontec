import Producto from "./clases/Proyecto.js";

const url = new URLSearchParams(window.location.search);
const id = url.get("id");

Producto.find_proyecto(id).then(proyecto =>{
    const main = document.querySelector(".contenido-centrado");
    const contenedor = document.createElement("div");

    const titulo = document.createElement("h3");
    titulo.textContent = proyecto["titulo"];
    contenedor.appendChild(titulo);

    const imgContenedor = document.createElement("div");
    imgContenedor.classList.add("imagen-principal-proyecto");
    const img = document.createElement("img");
    img.src = `../../assets/proyectos/${proyecto['imagenes'][0]}`
    img.alt = "Imagen principal del proyecto";
    imgContenedor.appendChild(img);
    contenedor.appendChild(imgContenedor);

    const cliente = document.createElement("h4");
    cliente.textContent = proyecto["cliente"];
    contenedor.appendChild(cliente);

    const descripcion = document.createElement("p");
    descripcion.textContent = proyecto["descripcion"];
    contenedor.appendChild(descripcion);
    
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imagenes-proyecto");

    proyecto["imagenes"].forEach(element => {
        const img = document.createElement("img");
        img.src = `../../assets/proyectos/${element}`;
        img.alt = "Imagenes de proyectos";
        imgContainer.appendChild(img); 
    });

    contenedor.appendChild(imgContainer);

    main.appendChild(contenedor);
});

