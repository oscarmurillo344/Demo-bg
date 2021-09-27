export default class DataServices
{
    constructor()
    {

    }
    consultarTotal(fechaAnterior:Date, fechaActual:Date) : Promise<any[]>
    {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return new Promise((resolve, reject)=>{
            fetch("https://localhost:44345/total", {
                method: "POST", 
                headers : headers,
                body: JSON.stringify({fechaAnterior:fechaAnterior, fechaActual: fechaActual, jsonFiltros:""})
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