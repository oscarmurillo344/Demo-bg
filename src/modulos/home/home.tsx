import { useEffect } from "react";
import { Line } from "react-chartjs-2"
import { Link } from "react-router-dom";
import './home.css'
interface HomeProps{
    onReady? :any;
}

const Home = (props:HomeProps)=>{
    const meses:any[] = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"]
    const dataSimuladaGrafico:any[] = [65, 59, 80, 81, 56, 55, 40, 52, 48, 12,11, 80];
    const data  = {
        labels: meses,
        datasets: [{
          label: 'Mensual',
          data: dataSimuladaGrafico,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
      
            },            
        ]
      }
    
    useEffect(()=>{
        if(props.onReady)
        {
            props.onReady();
        }
    }, [])
    const getGrafico = (width:string, heigth:string, titulo:string="titulo", ruta:string="/nofoundit")=>{
       return <div className="item-dashboard"  style={{width: width, justifyContent:"center", height:heigth}}> 
        <Link to={ruta} style={{color:'black'}} > 
            <p style={{margin:"0px", padding:"0px", fontSize:"12px", fontWeight:600}} >{titulo}</p>
                    <Line data={data}  />   
            </Link>               
      </div>
    }
    return (
        <> 
        <div className="flex colum" >
        <div className="flex" style={{justifyContent:"center", alignItems:"start"}} >
        <div className="flex colum"  >
            <div  style={{justifyContent:"start", alignItems:"center"}} className="flex colum contenedor" >
                <p className="titulo"  > ACTIVOS Y PASIVOS</p>
                <div className="flex row" style={{alignItems:"start"}} >
                    {
                        getGrafico("280px", "100px", "Ahorros", "/activopasivo/ahorros/resumen")
                    }
                    {
                        getGrafico("280px", "100px", "Corrientes")
                    }
                    {
                        getGrafico("280px", "100px", "Dep Plazo")
                    }
                </div>
                <div className="flex row" style={{justifyContent:"center"}} >
                    {
                        getGrafico("280px", "100px", "Pasivos")
                    }
                    {
                        getGrafico("280px", "100px", "Portafolio")
                    }
                    {
                        getGrafico("280px", "100px", "Cobertura")
                    }
                </div>
            </div>
            <div className="contenedor flex colum" style={{marginTop:"1px", justifyContent:"center", alignItems:"center"}} >
            <p className="titulo" > INFORMES DE CARTERA</p>
            <div className="flex row" style={{justifyContent:"center"}} >
                     
                    {
                        getGrafico("280px", "100px", "Diarias")
                    }
                    {
                        getGrafico("280px", "100px", "Oficinas")
                    }
                    {
                        getGrafico("280px", "100px", "Productos")
                    }
                </div>
            </div>
        </div>
        
            <div style={{justifyContent:"center", alignItems:"center"}} >
                
                <div className="flex contenedor colum"  style={{justifyContent:"center", alignItems:"center"}} >
                <p className="titulo" > COBERTURA</p>
                    {
                        getGrafico("280px", "200px", "")

                    }
                   
                    
                </div>
                <div className="flex contenedor colum"  style={{justifyContent:"center", alignItems:"center"}} >
                <p className="titulo" > INFORMES DE PASIVOS</p>
                    {
                        getGrafico("280px", "200px", "")

                    }
                   
                    
                </div>
                    
                    
            </div>
        </div>
        
        </div>
                     
        </>
    )
}

export default Home