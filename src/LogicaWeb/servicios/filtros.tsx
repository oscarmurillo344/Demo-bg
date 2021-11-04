export default class FiltrosServices
{
    constructor()
    {

    }
    consultarCampos() : Promise<any>
    {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return new Promise((resolve, reject)=>{
            fetch("https://localhost:44345/campos", {
                method: "GET", 
                headers : headers
            }).then(response => response.json())
        .then(data =>{
            console.log(data)
            resolve(data)
        }).catch(error =>{
            reject(error)
        });
        })
        
    }

    consultarCatalogos(): Promise<any>
    {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return new Promise((resolve, reject)=>{
            fetch("https://localhost:44345/catalogos", {
                method: "GET", 
                headers : headers
            }).then(response => response.json())
        .then(data =>{
            console.log(data)
            resolve(data)
        }).catch(error =>{
            reject(error)
        });
        })
    }
}