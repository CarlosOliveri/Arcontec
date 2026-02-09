class Servicio{
    

    static async get_servicios(){
        return fetch("../../db.json").then(response =>{
            return response.json()
        }).then(data => data["servicios"])
    }
}

export default Servicio