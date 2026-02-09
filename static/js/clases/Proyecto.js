class Proyecto{
    constructor(id,titulo,imagen,video,cliente,descripcion,fecha){
        this.id = id || "";
        this.titulo = titulo || "";
        this.imagen = imagen || "";
        this.video = video || "";
        this.cliente = cliente || "";
        this.descripcion = descripcion || "";
        this.fecha = fecha || "";
    }

    static async get_proyectos(){
        return fetch("../../db.json").then(response =>{
            return response.json()
        }).then(data => data["proyectos"])
    }

    static async find_proyecto(id) {
  return fetch("../../db.json")
    .then(response => response.json())
    .then(data => {
      const proyecto = data["proyectos"].find(element => element["id"] == id);
      return proyecto; 
    })
    }

}

export default Proyecto;