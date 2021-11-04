import { AiOutlineCalculator, AiOutlineCarryOut, AiOutlineHome, AiOutlineSetting, AiOutlineShop, AiOutlineSnippets, AiOutlineSolution, AiOutlineTool, AiOutlineUngroup, AiOutlineUnlock, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai'
import MenuListBg from '../../AplicacionWeb/Modelos/menu'

const menu:MenuListBg[] = [
    {
        default:true,
        nombre:"Home", 
        icon: <AiOutlineHome></AiOutlineHome>,
        ruta: "/home"        
    },
    {
        
        nombre:"Activos y Pasivos", 
        icon: <AiOutlineUser></AiOutlineUser>,
        ruta:"/activopasivo",
        items: [
            {
                icon: <AiOutlineTool></AiOutlineTool>,
                nombre:"Total Pasivos",
                items: [
                    { 
                        icon: <AiOutlineTool></AiOutlineTool>,
                        nombre: "cualquier "
                    }
                ]
            }, 
            {
                icon: <AiOutlineUngroup></AiOutlineUngroup>,

                nombre:"Corrientes"
            },
            {
                icon: <AiOutlineUpload></AiOutlineUpload>,

                nombre:"Ahorros",
                ruta: "/activopasivo/ahorros",
                items: [
                    {
                        nombre: "Detalle",
                        icon: <AiOutlineCarryOut></AiOutlineCarryOut>,
                        ruta : "/activopasivo/ahorros/detalles"
                        
                    },
                    {
                        nombre: "Resumen",
                        icon: <AiOutlineCalculator></AiOutlineCalculator>,
                        ruta:"/activopasivo/ahorros/resumen"
                        
                    }
                ]
            },
            {
                icon: <AiOutlineSnippets></AiOutlineSnippets>,

                nombre:"Depositos A Plazo"
            },
            {
                icon: <AiOutlineSolution></AiOutlineSolution>,
                nombre:"Cartera y Conrigente"
            }
     ] 
   },
   {
        nombre:"Cobertura", 
        icon: <AiOutlineShop></AiOutlineShop>,
        items: [
            {
                nombre:"Total Cobertura"
            }     
        ]
   },
    {
        nombre:"Informes", 
        icon: <AiOutlineSolution></AiOutlineSolution>,
        items: [
            {
                nombre:"opcion1"
            }, 
            {
                nombre:"opcion2"
            }]
   },
   {
       nombre:"Seguridad", 
       icon: <AiOutlineUnlock></AiOutlineUnlock>,
       items: [
           {
               nombre:"Usuarios"}, 
           {
               nombre:"Roles"}
        ] 
   },
   {
       nombre:"Configuraciones", 
       icon: <AiOutlineSetting></AiOutlineSetting>,
       items: [{nombre:"opcion1"}, {nombre:"opcion2"}]
   }
]

export default menu 