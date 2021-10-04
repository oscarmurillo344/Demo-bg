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
    
    const getGrafico = (titulo:string="titulo", ruta:string="/nofoundit")=>{
       return <> 
        <Link to={ruta} style={{color:'black'}} > 
            <p className="text-center" style={{fontSize:"12px", fontWeight:600}} >{titulo}</p>
                    <Line className="anchura" data={data}  />   
            </Link>               
      </>
    }
    return (
        <> 
        <div className="container-fluid">
        <div className="row align-items-center">
            <div className="col-md-12 col-lg-8 contenedor">
                <div className="row">
                    <div className="col-12"> <p className="text-center titulo"> Activos y Pasivos</p></div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Ahorros", "/activopasivo/ahorros/resumen")
                        }
                    </div>
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Corrientes")
                        }
                    </div>
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Dep Plazo")
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Pasivos")
                        }
                    </div>
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Portafolio")
                        }
                    </div>
                    <div className="col-md-12 col-lg-4">
                        {
                            getGrafico("Cobertura")
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-lg-3 contenedor">
                <p className="titulo text-center" > COBERTURA</p>
                    {
                        getGrafico("")

                    }
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 col-lg-8 contenedor">
                <div className="row">
                    <div className="col-12"> <p className="text-center titulo">INFORMES DE CARTERA</p></div>
                </div>
                
            <div className="row">
                <div className="col-md-12 col-lg-4">
                    {
                        getGrafico("Diarias")
                    }
                </div>
                <div className="col-md-12 col-lg-4">
                    {
                        getGrafico("Oficinas")
                    }
                </div>
                <div className="col-md-12 col-lg-4">
                    {
                        getGrafico("Productos")
                    }
                </div>
            </div>
        </div>
        <div className="col-md-12 col-lg-3 contenedor">
                <p className="titulo text-center" > INFORMES DE PASIVOS</p>
                    {
                        getGrafico("")

                    }
        </div>
    </div>     
</div>                  
        </>
    )
}

export default Home